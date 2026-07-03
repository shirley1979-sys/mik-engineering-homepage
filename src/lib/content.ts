import { prisma } from '@/lib/prisma'

export const DEFAULT_CONTENT = {
  heroBadge: 'AI · Smart Factory · Automation',
  heroDescription:
    '2차 전지부터 스마트 팩토리까지, 세상을 움직이는 턴키 솔루션. 단순한 장비 공급을 넘어, 고객의 생산 수율을 극대화하는 최적의 시스템 레이아웃을 제공합니다.',
  statYear: '10+',
  statProjects: '50+',
  statClients: '20+',
  statDomains: '4개',
  aboutDescription:
    'MIK는 Mobility Industry Korea의 약자입니다. 2014년 설립 이래 2차전지·디스플레이 등 산업분야에서 자동화 장비 및 물류 시스템 턴키 공급을 비즈니스 모델로 운영하고 있습니다. AI 기술이 필수가 되는 시대에, 협동로봇·AMR 등 최신 솔루션으로 고객의 제조 및 물류 환경을 최적화하기 위해 끊임없이 노력합니다.',
  contactEmailSales: 'onetwo34@hanmail.net',
  contactEmailDesign: 'smk70@hanmail.net',
  contactAddress1: '경기도 화성시 향남읍 만년로 151번길 44-30 나동',
  contactAddress2: '향남IC → MIK : 4.4km (10분)',
  footerCeo: '석승호',
  logoUrl: '',
  aboutImageUrl: '',
  scopeStep1ImageUrl: '',
  scopeStep2ImageUrl: '',
  scopeStep3ImageUrl: '',
  scopeStep4ImageUrl: '',
  scopeCtaLabel: '무료 견적 문의',
} as const

export type SiteContent = typeof DEFAULT_CONTENT
export type ContentKey = keyof SiteContent

export const IMAGE_FIELDS: { key: ContentKey; label: string }[] = [
  { key: 'logoUrl', label: '로고 이미지' },
  { key: 'aboutImageUrl', label: '회사소개 이미지' },
  { key: 'scopeStep1ImageUrl', label: '사업영역 01. 기구설계 이미지' },
  { key: 'scopeStep2ImageUrl', label: '사업영역 02. 검증 이미지' },
  { key: 'scopeStep3ImageUrl', label: '사업영역 03. 제작 이미지' },
  { key: 'scopeStep4ImageUrl', label: '사업영역 04. 설치 이미지' },
]

export const CONTENT_FIELDS: { key: ContentKey; label: string; multiline?: boolean }[] = [
  { key: 'heroBadge', label: '히어로 상단 배지 문구' },
  { key: 'heroDescription', label: '히어로 설명 문구', multiline: true },
  { key: 'statYear', label: '통계 - 창립 연차' },
  { key: 'statProjects', label: '통계 - 납품 프로젝트 수' },
  { key: 'statClients', label: '통계 - 주요 고객사 수' },
  { key: 'statDomains', label: '통계 - 전문 사업분야 수' },
  { key: 'aboutDescription', label: '회사소개 본문', multiline: true },
  { key: 'scopeCtaLabel', label: '사업영역 CTA 버튼 문구' },
  { key: 'contactEmailSales', label: '영업 이메일' },
  { key: 'contactEmailDesign', label: '설계 이메일' },
  { key: 'contactAddress1', label: '주소' },
  { key: 'contactAddress2', label: '오시는 길 안내' },
  { key: 'footerCeo', label: '대표이사 이름' },
]

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const rows = await prisma.siteSetting.findMany()
    const overrides = Object.fromEntries(rows.map((row) => [row.key, row.value]))
    return { ...DEFAULT_CONTENT, ...overrides }
  } catch {
    return DEFAULT_CONTENT
  }
}

export async function updateSiteContent(partial: Partial<Record<ContentKey, string>>) {
  const entries = Object.entries(partial) as [ContentKey, string][]
  await prisma.$transaction(
    entries.map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      })
    )
  )
}
