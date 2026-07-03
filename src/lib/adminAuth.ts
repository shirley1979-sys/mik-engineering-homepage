import crypto from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_SESSION_COOKIE = 'admin_session'
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7일

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error('ADMIN_SESSION_SECRET 환경변수가 설정되지 않았습니다.')
  return secret
}

function sign(value: string): string {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('base64url')
}

export function createSessionToken(username: string): string {
  const payload = `${username}.${Date.now() + SESSION_TTL_MS}`
  return `${payload}.${sign(payload)}`
}

export function verifySessionToken(token: string | undefined): string | null {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [username, expiresAt, signature] = parts
  const payload = `${username}.${expiresAt}`
  const expected = sign(payload)

  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null
  if (Date.now() > Number(expiresAt)) return null

  return username
}

export function verifyCredentials(username: string, password: string): boolean {
  const validUsername = process.env.ADMIN_USERNAME
  const validPassword = process.env.ADMIN_PASSWORD
  if (!validUsername || !validPassword) return false

  const userBuf = Buffer.from(username)
  const validUserBuf = Buffer.from(validUsername)
  const passBuf = Buffer.from(password)
  const validPassBuf = Buffer.from(validPassword)

  const userMatch =
    userBuf.length === validUserBuf.length && crypto.timingSafeEqual(userBuf, validUserBuf)
  const passMatch =
    passBuf.length === validPassBuf.length && crypto.timingSafeEqual(passBuf, validPassBuf)

  return userMatch && passMatch
}

export async function getAdminSession(): Promise<string | null> {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value
  return verifySessionToken(token)
}
