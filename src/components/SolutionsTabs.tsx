'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { SolutionCardInput } from '@/lib/solutions'

const TABS = [
  { id: 'smart', icon: '🤖', label: '스마트팩토리 · AMR' },
  { id: 'battery', icon: '⚡', label: '2차전지' },
  { id: 'display', icon: '🖥', label: '디스플레이' },
  { id: 'etc', icon: '⚙️', label: '기타 산업' },
]

export default function SolutionsTabs({ cards }: { cards: SolutionCardInput[] }) {
  const [active, setActive] = useState('smart')
  const filtered = cards.filter((c) => c.category === active)

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
        {filtered.map((card, i) => (
          <div
            key={`${card.title}-${i}`}
            className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 w-full md:w-[360px]"
            style={{ background: 'rgba(14,30,51,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-[#0a1626] flex items-center justify-center">
              {card.imageUrl ? (
                <Image src={card.imageUrl} alt={card.title} fill sizes="400px" className="object-cover" />
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
        ))}
      </div>
    </div>
  )
}
