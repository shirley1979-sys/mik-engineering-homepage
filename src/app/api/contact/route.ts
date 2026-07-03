import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const REQUIRED_FIELDS = ['company', 'name', 'phone', 'category', 'message'] as const

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body) {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const missing = REQUIRED_FIELDS.filter((field) => !body[field] || typeof body[field] !== 'string')
  if (missing.length > 0) {
    return NextResponse.json({ error: `필수 항목이 누락되었습니다: ${missing.join(', ')}` }, { status: 400 })
  }

  const inquiry = await prisma.inquiry.create({
    data: {
      company: body.company,
      name: body.name,
      phone: body.phone,
      email: typeof body.email === 'string' && body.email ? body.email : null,
      category: body.category,
      message: body.message,
    },
  })

  return NextResponse.json({ id: inquiry.id }, { status: 201 })
}
