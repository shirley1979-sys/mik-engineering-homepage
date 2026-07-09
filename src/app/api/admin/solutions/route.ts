import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/adminAuth'
import { getSolutionCards, replaceSolutionCards, SOLUTION_CATEGORIES, type SolutionCardInput } from '@/lib/solutions'

const VALID_CATEGORIES = new Set(SOLUTION_CATEGORIES.map((c) => c.id))

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }
  return NextResponse.json(await getSolutionCards())
}

export async function PUT(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const cards: SolutionCardInput[] = []
  for (const item of body) {
    if (
      typeof item !== 'object' ||
      item === null ||
      typeof item.category !== 'string' ||
      !VALID_CATEGORIES.has(item.category) ||
      typeof item.client !== 'string' ||
      typeof item.title !== 'string' ||
      typeof item.desc !== 'string' ||
      typeof item.imageUrl !== 'string' ||
      !Array.isArray(item.tags) ||
      !item.tags.every((t: unknown) => typeof t === 'string')
    ) {
      return NextResponse.json({ error: '솔루션 카드 형식이 올바르지 않습니다.' }, { status: 400 })
    }
    cards.push({
      category: item.category,
      client: item.client,
      title: item.title,
      desc: item.desc,
      imageUrl: item.imageUrl,
      tags: item.tags.filter((t: string) => t.trim() !== ''),
    })
  }

  await replaceSolutionCards(cards)
  return NextResponse.json({ ok: true })
}
