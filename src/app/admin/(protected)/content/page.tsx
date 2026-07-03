'use client'

import { useEffect, useState } from 'react'
import { CONTENT_FIELDS, DEFAULT_CONTENT, type SiteContent } from '@/lib/content'

type Status = 'idle' | 'saving' | 'saved' | 'error'

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
