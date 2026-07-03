import { prisma } from '@/lib/prisma'

export type HistoryEntryInput = {
  year: string
  title: string
  items: string[]
}

export const DEFAULT_HISTORY: HistoryEntryInput[] = [
  { year: '2014', title: '창립', items: ['MIK Engineering 설립', '자동차 / 모터 조립 라인'] },
  { year: '2016', title: '법인전환', items: ['제조공장 등록 (양감)', '법인사업자 전환'] },
  { year: '2017', title: '2차전지 진출', items: ['디스플레이 / Encap 라인', '2차전지 / X-Ray 검사기'] },
  {
    year: '2018',
    title: '물류 확장',
    items: ['2차전지 / Tap Welding · Stacking Conveyor 라인', '2차전지 / 셀추적 장비'],
  },
  { year: '2019', title: '자동화 확대', items: ['2차전지 / JR Buffer 장비', '일반 / 용접자동화 장비'] },
  {
    year: '2020–21',
    title: '디스플레이',
    items: ['2차전지 / JR Buffer · PP Box 틸팅기', '디스플레이 / 형광 UV 노광기'],
  },
  { year: '2022', title: 'AMR 진출', items: ['일반 / AMR 주변장치 (스마트팩토리 본격 진출)'] },
  { year: '2023', title: '대량 납품', items: ['2차전지 / JR Buffer 24대 납품'] },
  { year: '2024', title: '검사 고도화', items: ['2차전지 / CT 검사기', '2차전지 / Notching 물류'] },
]

export async function getHistoryEntries(): Promise<HistoryEntryInput[]> {
  try {
    const rows = await prisma.historyEntry.findMany({ orderBy: { order: 'asc' } })
    if (rows.length === 0) return DEFAULT_HISTORY
    return rows.map((row) => ({ year: row.year, title: row.title, items: row.items }))
  } catch {
    return DEFAULT_HISTORY
  }
}

export async function replaceHistoryEntries(entries: HistoryEntryInput[]) {
  await prisma.$transaction([
    prisma.historyEntry.deleteMany({}),
    prisma.historyEntry.createMany({
      data: entries.map((entry, index) => ({
        year: entry.year,
        title: entry.title,
        items: entry.items,
        order: index,
      })),
    }),
  ])
}
