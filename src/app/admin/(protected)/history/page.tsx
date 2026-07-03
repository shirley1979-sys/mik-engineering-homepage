'use client'

import { useEffect, useState } from 'react'
import type { HistoryEntryInput } from '@/lib/history'

type Status = 'idle' | 'saving' | 'saved' | 'error'

export default function HistoryEditPage() {
  const [entries, setEntries] = useState<HistoryEntryInput[] | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/history')
      .then(async (res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(setEntries)
      .catch(() => setError('연혁을 불러오지 못했습니다. DATABASE_URL 연결 상태를 확인해주세요.'))
  }, [])

  function updateEntry(index: number, patch: Partial<HistoryEntryInput>) {
    if (!entries) return
    const next = [...entries]
    next[index] = { ...next[index], ...patch }
    setEntries(next)
  }

  function addEntry() {
    setEntries([...(entries ?? []), { year: '', title: '', items: [''] }])
  }

  function removeEntry(index: number) {
    if (!entries) return
    setEntries(entries.filter((_, i) => i !== index))
  }

  async function handleSave() {
    if (!entries) return
    setStatus('saving')
    try {
      const res = await fetch('/api/admin/history', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entries),
      })
      if (!res.ok) throw new Error()
      setStatus('saved')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-black text-navy mb-6">연혁 편집</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {!entries && !error && <p className="text-gray-400 text-sm">불러오는 중...</p>}

      <div className="space-y-4 mb-6">
        {entries?.map((entry, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="grid grid-cols-2 gap-3 flex-1">
                <div>
                  <label className="text-xs font-semibold text-gray-500 tracking-wide block mb-1.5">연도</label>
                  <input
                    type="text"
                    value={entry.year}
                    onChange={(e) => updateEntry(index, { year: e.target.value })}
                    placeholder="2025"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-navy transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 tracking-wide block mb-1.5">제목</label>
                  <input
                    type="text"
                    value={entry.title}
                    onChange={(e) => updateEntry(index, { title: e.target.value })}
                    placeholder="예: 신규 사업 진출"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-navy transition-all"
                  />
                </div>
              </div>
              <button
                onClick={() => removeEntry(index)}
                className="text-red-500 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-red-50 transition-all shrink-0 mt-6"
              >
                삭제
              </button>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 tracking-wide block mb-1.5">
                세부 내용 (한 줄에 하나씩)
              </label>
              <textarea
                rows={3}
                value={entry.items.join('\n')}
                onChange={(e) => updateEntry(index, { items: e.target.value.split('\n') })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-navy transition-all resize-none"
              />
            </div>
          </div>
        ))}
      </div>

      {entries && (
        <div className="flex items-center gap-3">
          <button
            onClick={addEntry}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-navy transition-all"
          >
            + 연혁 추가
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
