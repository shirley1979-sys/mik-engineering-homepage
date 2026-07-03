import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/adminAuth'
import { CONTENT_FIELDS, getSiteContent, updateSiteContent, type ContentKey } from '@/lib/content'

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }
  return NextResponse.json(await getSiteContent())
}

export async function PATCH(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const allowedKeys = new Set(CONTENT_FIELDS.map((f) => f.key))
  const partial: Partial<Record<ContentKey, string>> = {}
  for (const [key, value] of Object.entries(body)) {
    if (allowedKeys.has(key as ContentKey) && typeof value === 'string') {
      partial[key as ContentKey] = value
    }
  }

  await updateSiteContent(partial)
  return NextResponse.json({ ok: true })
}
