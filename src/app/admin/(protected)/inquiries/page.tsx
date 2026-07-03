'use client'

import { useEffect, useState } from 'react'

type Inquiry = {
  id: string
  company: string
  name: string
  phone: string
  email: string | null
  category: string
  message: string
  status: string
  createdAt: string
}

const STATUS_LABEL: Record<string, string> = {
  NEW: '신규',
  CONTACTED: '연락완료',
  CLOSED: '종료',
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[] | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/inquiries')
      .then(async (res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(setInquiries)
      .catch(() => setError('문의 목록을 불러오지 못했습니다. DATABASE_URL 연결 상태를 확인해주세요.'))
  }, [])

  async function updateStatus(id: string, status: string) {
    setInquiries((prev) => prev?.map((item) => (item.id === id ? { ...item, status } : item)) ?? null)
    await fetch(`/api/admin/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-navy mb-6">문의 관리</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {!inquiries && !error && <p className="text-gray-400 text-sm">불러오는 중...</p>}
      {inquiries && inquiries.length === 0 && <p className="text-gray-400 text-sm">아직 접수된 문의가 없습니다.</p>}

      <div className="space-y-4">
        {inquiries?.map((inquiry) => (
          <div key={inquiry.id} className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="font-bold text-navy">
                  {inquiry.company} · {inquiry.name}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {inquiry.phone}
                  {inquiry.email ? ` · ${inquiry.email}` : ''} · {inquiry.category}
                </div>
              </div>
              <select
                value={inquiry.status}
                onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                className="text-xs font-semibold border border-gray-200 rounded-lg px-2 py-1.5 cursor-pointer"
              >
                {Object.entries(STATUS_LABEL).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{inquiry.message}</p>
            <div className="text-xs text-gray-300 mt-3">{new Date(inquiry.createdAt).toLocaleString('ko-KR')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
