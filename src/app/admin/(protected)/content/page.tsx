'use client'

import Image from 'next/image'
import { useEffect, useState, type ChangeEvent } from 'react'
import { CONTENT_FIELDS, DEFAULT_CONTENT, IMAGE_FIELDS, type ContentKey, type SiteContent } from '@/lib/content'

type Status = 'idle' | 'saving' | 'saved' | 'error'

function ImageUploadField({
  fieldKey,
  label,
  url,
  onUploaded,
}: {
  fieldKey: ContentKey
  label: string
  url: string
  onUploaded: (url: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')

    try {
      const form = new FormData()
      form.append('file', file)
      form.append('key', fieldKey)

      const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: form })
      const uploadData = await uploadRes.json()
      if (!uploadRes.ok) throw new Error(uploadData.error ?? '업로드 실패')

      const saveRes = await fetch('/api/admin/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [fieldKey]: uploadData.url }),
      })
      if (!saveRes.ok) throw new Error('저장 실패')

      onUploaded(uploadData.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드에 실패했습니다.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 tracking-wide block mb-2">{label}</label>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
          {url ? (
            <Image src={url} alt={label} width={80} height={80} className="object-cover w-full h-full" />
          ) : (
            <span className="text-gray-300 text-[10px]">없음</span>
          )}
        </div>
        <div>
          <label className="inline-block px-4 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 cursor-pointer hover:border-navy transition-all">
            {uploading ? '업로드 중...' : '이미지 선택'}
            <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden" onChange={handleChange} disabled={uploading} />
          </label>
          {error && <p className="text-red-500 text-[11px] mt-1.5">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default function ContentEditPage() {
  const [content, setContent] = useState<SiteContent | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/content')
      .then(async (res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(setContent)
      .catch(() => setError('콘텐츠를 불러오지 못했습니다. DATABASE_URL 연결 상태를 확인해주세요.'))
  }, [])

  async function handleSave() {
    if (!content) return
    setStatus('saving')
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      if (!res.ok) throw new Error()
      setStatus('saved')
    } catch {
      setStatus('error')
    }
  }

  const display = content ?? DEFAULT_CONTENT

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-black text-navy mb-6">콘텐츠 편집</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="space-y-5 bg-white rounded-2xl p-6 border border-gray-200 mb-6">
        {IMAGE_FIELDS.map((field) => (
          <ImageUploadField
            key={field.key}
            fieldKey={field.key}
            label={field.label}
            url={display[field.key]}
            onUploaded={(url) => setContent({ ...display, [field.key]: url })}
          />
        ))}
      </div>

      <div className="space-y-5 bg-white rounded-2xl p-6 border border-gray-200">
        {CONTENT_FIELDS.map((field) => (
          <div key={field.key}>
            <label className="text-xs font-semibold text-gray-500 tracking-wide block mb-1.5">{field.label}</label>
            {field.multiline ? (
              <textarea
                rows={3}
                value={display[field.key]}
                onChange={(e) => setContent({ ...display, [field.key]: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-navy transition-all resize-none"
              />
            ) : (
              <input
                type="text"
                value={display[field.key]}
                onChange={(e) => setContent({ ...display, [field.key]: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-navy transition-all"
              />
            )}
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={status === 'saving' || !content}
          className="px-6 py-3 rounded-xl font-bold text-sm bg-brand hover:bg-red-700 text-white transition-all disabled:opacity-60"
        >
          {status === 'saving' ? '저장 중...' : status === 'saved' ? '저장됨 ✓' : '저장하기'}
        </button>
        {status === 'error' && <p className="text-red-500 text-xs">저장에 실패했습니다.</p>}
      </div>
    </div>
  )
}
