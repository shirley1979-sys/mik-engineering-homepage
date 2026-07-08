import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, createSessionToken, verifyCredentials } from '@/lib/adminAuth'
import { getClientIp, rateLimit } from '@/lib/rateLimit'

export async function POST(request: Request) {
  const ip = getClientIp(request)
  if (!rateLimit(`login:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const username = typeof body?.username === 'string' ? body.username : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!verifyCredentials(username, password)) {
    return NextResponse.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 })
  }

  const token = createSessionToken(username)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}
