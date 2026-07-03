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

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`[프로젝트 문의] ${form.get('company')} - ${form.get('category')}`)
    const body = encodeURIComponent(
      `담당자: ${form.get('name')}\n연락처: ${form.get('phone')}\n이메일: ${form.get('email')}\n문의 분야: ${form.get('category')}\n\n문의 내용:\n${form.get('message')}`
    )
    window.location.href = `mailto:onetwo34@hanmail.net?subject=${subject}&body=${body}`
    setSent(true)
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
          className="w-full py-4 rounded-xl font-bold text-[15px] transition-all hover:-translate-y-0.5 bg-brand hover:bg-red-700 text-white hover:shadow-xl hover:shadow-brand/30"
        >
          {sent ? '메일 앱이 열렸습니다 ✓' : '문의 보내기 →'}
        </button>
      </form>
    </div>
  )
}
