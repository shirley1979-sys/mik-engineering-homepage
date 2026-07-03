'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form = new FormData(e.currentTarget)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.get('username'),
          password: form.get('password'),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(data?.error ?? '로그인에 실패했습니다.')
        return
      }
      router.push('/admin')
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white/6 border border-white/10 rounded-2xl p-8">
        <h1 className="text-white font-black text-xl mb-6">관리자 로그인</h1>
        <div className="space-y-4">
          <div>
            <label className="text-white/50 text-xs font-semibold tracking-wider block mb-2">아이디</label>
            <input
              name="username"
              type="text"
              required
              autoFocus
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/50 focus:bg-white/15 transition-all"
            />
          </div>
          <div>
            <label className="text-white/50 text-xs font-semibold tracking-wider block mb-2">비밀번호</label>
            <input
              name="password"
              type="password"
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/50 focus:bg-white/15 transition-all"
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm bg-brand hover:bg-red-700 text-white transition-all disabled:opacity-60"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </div>
      </form>
    </div>
  )
}
