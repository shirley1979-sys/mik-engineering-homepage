import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/adminAuth'
import { getHistoryEntries, replaceHistoryEntries, type HistoryEntryInput } from '@/lib/history'

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }
  return NextResponse.json(await getHistoryEntries())
}

export async function PUT(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const entries: HistoryEntryInput[] = []
  for (const item of body) {
    if (
      typeof item !== 'object' ||
      item === null ||
      typeof item.year !== 'string' ||
      typeof item.title !== 'string' ||
      !Array.isArray(item.items) ||
      !item.items.every((i: unknown) => typeof i === 'string')
    ) {
      return NextResponse.json({ error: '연혁 항목 형식이 올바르지 않습니다.' }, { status: 400 })
    }
    entries.push({
      year: item.year,
      title: item.title,
      items: item.items.filter((i: string) => i.trim() !== ''),
    })
  }

  await replaceHistoryEntries(entries)
  return NextResponse.json({ ok: true })
}
