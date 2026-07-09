'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { SiteContent } from '@/lib/content'

const TABS = [
  { id: 'smart', icon: '🤖', label: '스마트팩토리 · AMR' },
  { id: 'battery', icon: '⚡', label: '2차전지' },
  { id: 'display', icon: '🖥', label: '디스플레이' },
  { id: 'etc', icon: '⚙️', label: '기타 산업' },
]

const CARDS: {
  tab: string
  client: string
  title: string
  desc: string
  tags: string[]
  image: string
  imageKey?: keyof SiteContent
  alt: string
}[] = [
  {
    tab: 'smart',
    client: '에실로코리아 / Lenz',
    title: 'AMR + Sliding Fork 주변장치',
    desc: '유진로봇 GoCart 기반 매거진 자율 이송 시스템. 컨셉·설계·조립·설치 전 과정 수행.',
    tags: ['GoCart', 'Sliding Fork', '자율주행'],
    image: 'https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?w=800&q=80&fm=jpg&fit=crop',
    alt: 'AMR + Sliding Fork 주변장치',
  },
  {
    tab: 'smart',
    client: '셰플러코리아',
    title: 'AMR + Trolley 이송 시스템',
    desc: 'GoCart + Trolley 조합으로 공장 내 자율 이송 완전 자동화.',
    tags: ['GoCart', 'Trolley', 'AMR'],
    image: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=800&q=80&fm=jpg&fit=crop',
    alt: 'AMR + Trolley 이송 시스템',
  },
  {
    tab: 'smart',
    client: '시너스텍',
    title: 'AGV — 반도체 FOUB 이송',
    desc: '반도체 클린룸 환경 최적화 FOUB 이송 AGV. 조립·설치 수행.',
    tags: ['AGV', '반도체', '클린룸'],
    image: 'https://images.unsplash.com/photo-1752614671052-92e18f534db1?w=800&q=80&fm=jpg&fit=crop',
    alt: 'AGV — 반도체 FOUB 이송',
  },
  {
    tab: 'battery',
    client: '2차전지 공정',
    title: 'Jelley Roll Stocker System',
    desc: '전,후 공정 장비 Down 시 JR을 적재 or 공급하는 시스템.',
    tags: ['Shuttle', 'P&P', 'Transfer', 'Shelf Stacker Crane', 'Cleaner', 'Cassette'],
    image: '',
    imageKey: 'batteryCard1ImageUrl',
    alt: 'Jelley Roll Stocker System',
  },
  {
    tab: 'battery',
    client: '2차전지 공정',
    title: 'Cell Tracking System',
    desc: 'Cell에 2D 바코드를 프린팅하고 검사하는 시스템.',
    tags: ['Shuttle', 'P&P', 'Marking', 'BCR', 'Conveyor', 'NG Eject'],
    image: '',
    imageKey: 'batteryCard2ImageUrl',
    alt: 'Cell Tracking System',
  },
  {
    tab: 'battery',
    client: '2차전지 공정',
    title: '공정 연결물류 System',
    desc: 'Stacking과 Tab Welding 공정 사이를 연결해주는 이송 시스템.',
    tags: ['Lift', 'P&P', 'Conveyor', 'Magazine'],
    image: '',
    imageKey: 'batteryCard3ImageUrl',
    alt: '공정 연결물류 System',
  },
]

export default function SolutionsTabs({ content }: { content: SiteContent }) {
  const [active, setActive] = useState('smart')
  const filtered = CARDS.filter((c) => c.tab === active)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
            style={
              active === tab.id
                ? {
                    background: 'linear-gradient(135deg, #0e1e33, #1a3557)',
                    border: '1px solid rgba(196,30,30,0.4)',
                    color: '#f87171',
                  }
                : {
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.5)',
                  }
            }
          >
            <span className="mr-1.5">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {filtered.length === 0 && (
          <p className="text-white/40 text-sm py-10">해당 분야 실적을 준비 중입니다.</p>
        )}
        {filtered.map((card) => {
          const imageUrl = (card.imageKey ? content[card.imageKey] : '') || card.image
          return (
            <div
              key={card.title}
              className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 w-full md:w-[360px]"
              style={{ background: 'rgba(14,30,51,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#0a1626] flex items-center justify-center">
                {imageUrl ? (
                  <Image src={imageUrl} alt={card.alt} fill sizes="400px" className="object-cover" />
                ) : (
                  <span className="text-white/25 text-xs">이미지 준비 중</span>
                )}
              </div>
              <div className="p-5">
                <div className="text-[10px] font-black tracking-[2px] uppercase mb-2.5" style={{ color: '#f87171' }}>
                  {card.client}
                </div>
                <h3 className="text-white font-bold text-base mb-2 leading-snug">{card.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {card.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.55)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
