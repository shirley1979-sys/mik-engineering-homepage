import { prisma } from '@/lib/prisma'

export type SolutionCardInput = {
  category: string
  client: string
  title: string
  desc: string
  tags: string[]
  imageUrl: string
}

export const SOLUTION_CATEGORIES = [
  { id: 'smart', icon: '🤖', label: '스마트팩토리 · AMR' },
  { id: 'battery', icon: '⚡', label: '2차전지' },
  { id: 'display', icon: '🖥', label: '디스플레이' },
  { id: 'etc', icon: '⚙️', label: '기타 산업' },
]

export const DEFAULT_SOLUTIONS: SolutionCardInput[] = [
  {
    category: 'smart',
    client: '에실로코리아 / Lenz',
    title: 'AMR + Sliding Fork 주변장치',
    desc: '유진로봇 GoCart 기반 매거진 자율 이송 시스템. 컨셉·설계·조립·설치 전 과정 수행.',
    tags: ['GoCart', 'Sliding Fork', '자율주행'],
    imageUrl: 'https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?w=800&q=80&fm=jpg&fit=crop',
  },
  {
    category: 'smart',
    client: '셰플러코리아',
    title: 'AMR + Trolley 이송 시스템',
    desc: 'GoCart + Trolley 조합으로 공장 내 자율 이송 완전 자동화.',
    tags: ['GoCart', 'Trolley', 'AMR'],
    imageUrl: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=800&q=80&fm=jpg&fit=crop',
  },
  {
    category: 'smart',
    client: '시너스텍',
    title: 'AGV — 반도체 FOUB 이송',
    desc: '반도체 클린룸 환경 최적화 FOUB 이송 AGV. 조립·설치 수행.',
    tags: ['AGV', '반도체', '클린룸'],
    imageUrl: 'https://images.unsplash.com/photo-1752614671052-92e18f534db1?w=800&q=80&fm=jpg&fit=crop',
  },
  {
    category: 'battery',
    client: '2차전지 공정',
    title: 'Jelley Roll Stocker System',
    desc: '전,후 공정 장비 Down 시 JR을 적재 or 공급하는 시스템.',
    tags: ['Shuttle', 'P&P', 'Transfer', 'Shelf Stacker Crane', 'Cleaner', 'Cassette'],
    imageUrl: '',
  },
  {
    category: 'battery',
    client: '2차전지 공정',
    title: 'Cell Tracking System',
    desc: 'Cell에 2D 바코드를 프린팅하고 검사하는 시스템.',
    tags: ['Shuttle', 'P&P', 'Marking', 'BCR', 'Conveyor', 'NG Eject'],
    imageUrl: '',
  },
  {
    category: 'battery',
    client: '2차전지 공정',
    title: '공정 연결물류 System',
    desc: 'Stacking과 Tab Welding 공정 사이를 연결해주는 이송 시스템.',
    tags: ['Lift', 'P&P', 'Conveyor', 'Magazine'],
    imageUrl: '',
  },
]

export async function getSolutionCards(): Promise<SolutionCardInput[]> {
  try {
    const rows = await prisma.solutionCard.findMany({ orderBy: { order: 'asc' } })
    if (rows.length === 0) return DEFAULT_SOLUTIONS
    return rows.map((row) => ({
      category: row.category,
      client: row.client,
      title: row.title,
      desc: row.desc,
      tags: row.tags,
      imageUrl: row.imageUrl,
    }))
  } catch {
    return DEFAULT_SOLUTIONS
  }
}

export async function replaceSolutionCards(cards: SolutionCardInput[]) {
  await prisma.$transaction([
    prisma.solutionCard.deleteMany({}),
    prisma.solutionCard.createMany({
      data: cards.map((card, index) => ({
        category: card.category,
        client: card.client,
        title: card.title,
        desc: card.desc,
        tags: card.tags,
        imageUrl: card.imageUrl,
        order: index,
      })),
    }),
  ])
}
