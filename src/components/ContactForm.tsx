'use client'

import { useState, type FormEvent } from 'react'

const INQUIRY_TYPES = [
  '스마트팩토리 · AMR',
  '2차전지 자동화',
  '협동로봇 (UR)',
  '정부지원사업 연계',
  '디스플레이 장비',
  '기타 산업 자동화',
]

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: data.get('company'),
          name: data.get('name'),
          phone: data.get('phone'),
          email: data.get('email'),
          category: data.get('category'),
          message: data.get('message'),
        }),
      })

      if (!res.ok) throw new Error('submit failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/35 outline-none focus:border-white/50 focus:bg-white/15 transition-all'

  return (
    <div className="bg-white/6 border border-white/10 rounded-2xl p-8">
      <div className="font-bold text-white text-xl mb-7">프로젝트 문의</div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-white/50 text-xs font-semibold tracking-wider block mb-2">회사명</label>
            <input name="company" type="text" required placeholder="회사명" className={inputClass} />
          </div>
          <div>
            <label className="text-white/50 text-xs font-semibold tracking-wider block mb-2">담당자</label>
            <input name="name" type="text" required placeholder="이름" className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-white/50 text-xs font-semibold tracking-wider block mb-2">연락처</label>
            <input name="phone" type="tel" required placeholder="010-0000-0000" className={inputClass} />
          </div>
          <div>
            <label className="text-white/50 text-xs font-semibold tracking-wider block mb-2">이메일</label>
            <input name="email" type="email" placeholder="email@company.com" className={inputClass} />
          </div>
        </div>
        <div>
          <label className="text-white/50 text-xs font-semibold tracking-wider block mb-2">문의 분야</label>
          <select
            name="category"
            required
            defaultValue=""
            className={`${inputClass} cursor-pointer [&>option]:bg-navy`}
          >
            <option value="" disabled>
              선택해주세요
            </option>
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-white/50 text-xs font-semibold tracking-wider block mb-2">문의 내용</label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="프로젝트 내용이나 문의사항을 자유롭게 작성해주세요."
            className={`${inputClass} resize-none`}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-4 rounded-xl font-bold text-[15px] transition-all hover:-translate-y-0.5 bg-brand hover:bg-red-700 text-white hover:shadow-xl hover:shadow-brand/30 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === 'submitting' ? '전송 중...' : status === 'success' ? '문의가 접수되었습니다 ✓' : '문의 보내기 →'}
        </button>
        {status === 'error' && (
          <p className="text-red-400 text-xs text-center">
            전송에 실패했습니다. 잠시 후 다시 시도하시거나 onetwo34@hanmail.net으로 메일 부탁드립니다.
          </p>
        )}
      </form>
    </div>
  )
}
