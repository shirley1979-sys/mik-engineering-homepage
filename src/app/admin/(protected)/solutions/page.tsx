'use client'

import Image from 'next/image'
import { useEffect, useState, type ChangeEvent } from 'react'
import { SOLUTION_CATEGORIES, type SolutionCardInput } from '@/lib/solutions'

type Status = 'idle' | 'saving' | 'saved' | 'error'

export default function SolutionsEditPage() {
  const [cards, setCards] = useState<SolutionCardInput[] | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/admin/solutions')
      .then(async (res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(setCards)
      .catch(() => setError('솔루션을 불러오지 못했습니다. DATABASE_URL 연결 상태를 확인해주세요.'))
  }, [])

  function updateCard(index: number, patch: Partial<SolutionCardInput>) {
    if (!cards) return
    const next = [...cards]
    next[index] = { ...next[index], ...patch }
    setCards(next)
  }

  function addCard() {
    setCards([
      ...(cards ?? []),
      { category: 'smart', client: '', title: '', desc: '', tags: [], imageUrl: '' },
    ])
  }

  function removeCard(index: number) {
    if (!cards) return
    setCards(cards.filter((_, i) => i !== index))
  }

  async function handleImageChange(index: number, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingIndex(index)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('key', `solution-${index}`)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? '업로드 실패')
      updateCard(index, { imageUrl: data.url })
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드에 실패했습니다.')
    } finally {
      setUploadingIndex(null)
      e.target.value = ''
    }
  }

  async function handleSave() {
    if (!cards) return
    setStatus('saving')
    try {
      const res = await fetch('/api/admin/solutions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cards),
      })
      if (!res.ok) throw new Error()
      setStatus('saved')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-black text-navy mb-6">솔루션 편집</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {!cards && !error && <p className="text-gray-400 text-sm">불러오는 중...</p>}

      <div className="space-y-4 mb-6">
        {cards?.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="w-20 h-20 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 relative">
                {card.imageUrl ? (
                  <Image src={card.imageUrl} alt={card.title} fill sizes="80px" className="object-cover" />
                ) : (
                  <span className="text-gray-300 text-[10px]">없음</span>
                )}
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 tracking-wide block mb-1.5">분야</label>
                <select
                  value={card.category}
                  onChange={(e) => updateCard(index, { category: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-navy transition-all cursor-pointer"
                >
                  {SOLUTION_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="shrink-0 mt-6">
                <label className="inline-block px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 cursor-pointer hover:border-navy transition-all whitespace-nowrap">
                  {uploadingIndex === index ? '업로드 중...' : '이미지 선택'}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    className="hidden"
                    onChange={(e) => handleImageChange(index, e)}
                    disabled={uploadingIndex === index}
                  />
                </label>
              </div>
              <button
                onClick={() => removeCard(index)}
                className="text-red-500 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-red-50 transition-all shrink-0 mt-6"
              >
                삭제
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 tracking-wide block mb-1.5">고객사 / 라벨</label>
                <input
                  type="text"
                  value={card.client}
                  onChange={(e) => updateCard(index, { client: e.target.value })}
                  placeholder="예: 에실로코리아 / Lenz"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-navy transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 tracking-wide block mb-1.5">제목</label>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => updateCard(index, { title: e.target.value })}
                  placeholder="예: AMR + Sliding Fork 주변장치"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-navy transition-all"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-xs font-semibold text-gray-500 tracking-wide block mb-1.5">설명</label>
              <textarea
                rows={2}
                value={card.desc}
                onChange={(e) => updateCard(index, { desc: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-navy transition-all resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 tracking-wide block mb-1.5">태그 (쉼표로 구분)</label>
              <input
                type="text"
                value={card.tags.join(', ')}
                onChange={(e) => updateCard(index, { tags: e.target.value.split(',').map((t) => t.trim()) })}
                placeholder="예: GoCart, Sliding Fork, 자율주행"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-navy transition-all"
              />
            </div>
          </div>
        ))}
      </div>

      {cards && (
        <div className="flex items-center gap-3">
          <button
            onClick={addCard}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-navy transition-all"
          >
            + 솔루션 추가
          </button>
          <button
            onClick={handleSave}
            disabled={status === 'saving'}
            className="px-6 py-2.5 rounded-xl font-bold text-sm bg-brand hover:bg-red-700 text-white transition-all disabled:opacity-60"
          >
            {status === 'saving' ? '저장 중...' : status === 'saved' ? '저장됨 ✓' : '저장하기'}
          </button>
          {status === 'error' && <p className="text-red-500 text-xs">저장에 실패했습니다.</p>}
        </div>
      )}
    </div>
  )
}
