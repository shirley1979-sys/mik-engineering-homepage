import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { getAdminSession } from '@/lib/adminAuth'
import { IMAGE_FIELDS } from '@/lib/content'

const ALLOWED_KEYS = new Set(IMAGE_FIELDS.map((f) => f.key))
const ALLOWED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'])
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  const form = await request.formData().catch(() => null)
  const file = form?.get('file')
  const key = form?.get('key')

  if (!(file instanceof File) || typeof key !== 'string' || !ALLOWED_KEYS.has(key as never)) {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: 'PNG, JPEG, WEBP, SVG 파일만 업로드할 수 있습니다.' }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: '파일 크기는 5MB 이하여야 합니다.' }, { status: 400 })
  }

  const ext = file.name.split('.').pop() || 'jpg'
  const blob = await put(`${key}-${Date.now()}.${ext}`, file, {
    access: 'public',
    addRandomSuffix: true,
  })

  return NextResponse.json({ url: blob.url })
}
