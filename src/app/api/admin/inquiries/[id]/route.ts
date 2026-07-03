import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/adminAuth'
import { prisma } from '@/lib/prisma'

const VALID_STATUSES = ['NEW', 'CONTACTED', 'CLOSED']

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const status = body?.status
  if (typeof status !== 'string' || !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: '유효하지 않은 상태값입니다.' }, { status: 400 })
  }

  const inquiry = await prisma.inquiry.update({ where: { id: params.id }, data: { status } })
  return NextResponse.json(inquiry)
}
