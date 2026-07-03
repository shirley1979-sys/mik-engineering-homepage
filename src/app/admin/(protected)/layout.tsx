import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/adminAuth'
import LogoutButton from './LogoutButton'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-navy">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-white font-black">MIK 관리자</span>
            <nav className="flex gap-1">
              <a href="/admin" className="text-white/70 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/10">
                대시보드
              </a>
              <a
                href="/admin/inquiries"
                className="text-white/70 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/10"
              >
                문의 관리
              </a>
              <a
                href="/admin/content"
                className="text-white/70 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/10"
              >
                콘텐츠 편집
              </a>
              <a
                href="/admin/history"
                className="text-white/70 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/10"
              >
                연혁 편집
              </a>
            </nav>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  )
}
