import type { Metadata } from 'next'
import './globals.css'

const title = '엠아이케이엔지니어링 | MIK Engineering'
const description =
  '2차전지·스마트팩토리 자동화 전문기업. AMR·협동로봇·물류자동화 턴키 솔루션으로 고객의 생산 수율을 높입니다.'

export const metadata: Metadata = {
  metadataBase: new URL('https://mik-engineering-homepage.vercel.app'),
  title,
  description,
  keywords: ['스마트팩토리', '자동화', '2차전지', 'AMR', '협동로봇', 'MIK', '엠아이케이'],
  openGraph: {
    title,
    description,
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased bg-white text-gray-900">{children}</body>
    </html>
  )
}
