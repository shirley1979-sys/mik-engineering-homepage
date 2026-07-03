'use client'

import Image from 'next/image'
import { useState } from 'react'

const TABS = [
  { id: 'smart', icon: '🤖', label: '스마트팩토리 · AMR' },
  { id: 'battery', icon: '⚡', label: '2차전지' },
  { id: 'display', icon: '🖥', label: '디스플레이' },
  { id: 'etc', icon: '⚙️', label: '기타 산업' },
]

const CARDS = [
  {
    tab: 'smart',
    client: '에실로코리아 / Lenz',
    title: 'AMR + Sliding Fork 주변장치',
    desc: '유진로봇 GoCart 기반 매거진 자율 이송 시스템. 컨셉·설계·조립·설치 전 과정 수행.',
    tags: ['GoCart', 'Sliding Fork', '자율주행'],
    image:
      'https://cdn.prod.website-files.com/658e2a8b1ee35e8b177f94b3/6652e2bfbe84e1595c93f2ed_664ddaba7aca1dbf00216354_AMR.webp',
    alt: 'AMR + Sliding Fork 주변장치',
  },
  {
    tab: 'etc',
    client: '셰플러코리아',
    title: 'AMR + Trolley 이송 시스템',
    desc: 'GoCart + Trolley 조합으로 공장 내 자율 이송 완전 자동화.',
    tags: ['GoCart', 'Trolley', 'AMR'],
    image:
      'https://image.made-in-china.com/202f0j00SIuMWcAsiwoZ/New-Design-High-Performance-Under-Drive-Lifting-AMR-Robot-with-1500kg-Payload.webp',
    alt: 'AMR + Trolley 이송 시스템',
  },
  {
    tab: 'etc',
    client: '시너스텍',
    title: 'AGV — 반도체 FOUB 이송',
    desc: '반도체 클린룸 환경 최적화 FOUB 이송 AGV. 조립·설치 수행.',
    tags: ['AGV', '반도체', '클린룸'],
    image: 'https://rozitek.com/wp-content/uploads/2023/05/collaborative-robot-rozitek-knight-robot.webp',
    alt: 'AGV — 반도체 FOUB 이송',
  },
]

export default function SolutionsTabs() {
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
                    border: '1px solid rgba(34,211,238,0.3)',
                    color: '#22d3ee',
                    boxShadow: '0 0 20px rgba(34,211,238,0.1)',
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

      <div className="grid md:grid-cols-3 gap-5">
        {filtered.length === 0 && (
          <p className="text-white/40 text-sm col-span-3">해당 분야 실적을 준비 중입니다.</p>
        )}
        {filtered.map((card) => (
          <div
            key={card.title}
            className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
            style={{ background: 'rgba(14,30,51,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image src={card.image} alt={card.alt} fill sizes="400px" className="object-cover" />
            </div>
            <div className="p-5">
              <div className="text-[10px] font-black tracking-[2px] uppercase mb-2.5" style={{ color: '#22d3ee' }}>
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
                      background: 'rgba(34,211,238,0.07)',
                      border: '1px solid rgba(34,211,238,0.15)',
                      color: 'rgba(34,211,238,0.7)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
