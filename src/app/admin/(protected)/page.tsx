import { prisma } from '@/lib/prisma'

export default async function AdminDashboardPage() {
  let total = 0
  let newCount = 0
  try {
    total = await prisma.inquiry.count()
    newCount = await prisma.inquiry.count({ where: { status: 'NEW' } })
  } catch {
    // DATABASE_URL 미설정 등으로 DB 연결이 안 되어 있으면 0으로 표시
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-navy mb-6">대시보드</h1>
      <div className="grid grid-cols-2 gap-4 max-w-md">
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">전체 문의</div>
          <div className="text-3xl font-black text-navy">{total}</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">신규 문의</div>
          <div className="text-3xl font-black text-brand">{newCount}</div>
        </div>
      </div>
    </div>
  )
}
