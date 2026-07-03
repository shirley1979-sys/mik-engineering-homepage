'use client'

import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  { href: '#about', label: '회사소개' },
  { href: '#scope', label: '사업영역' },
  { href: '#solutions', label: '솔루션' },
  { href: '#government', label: '정부과제' },
  { href: '#partners', label: '파트너' },
  { href: '#history', label: '연혁' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy-dark/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-3 group">
          <div
            className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg"
            style={{
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(14,30,51,0.9)',
            }}
          >
            <span className="text-white font-black text-lg">M</span>
          </div>
          <div className="leading-none">
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-white text-xl tracking-tight">MIK</span>
              <span
                className="text-[11px] font-bold tracking-[1.5px] uppercase px-1.5 py-0.5 rounded"
                style={{ color: '#f87171', background: 'rgba(196,30,30,0.12)', border: '1px solid rgba(196,30,30,0.25)' }}
              >
                Engineering
              </span>
            </div>
            <span className="block text-white/35 text-[9px] font-medium tracking-[2.5px] uppercase mt-0.5">
              Mobility Industry Korea
            </span>
          </div>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-white/70 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="ml-2 bg-brand hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-brand/30"
            >
              문의하기
            </a>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1.5"
          aria-label="메뉴"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="block w-5 h-0.5 bg-white transition-all" />
          <span className="block w-5 h-0.5 bg-white transition-all" />
          <span className="block w-5 h-0.5 bg-white transition-all" />
        </button>
      </div>

      {menuOpen && (
        <ul className="md:hidden bg-navy-dark/95 backdrop-blur-md px-6 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block text-white/80 hover:text-white text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-white/10 transition-all"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block bg-brand text-white text-sm font-bold px-3 py-2.5 rounded-lg mt-1 text-center"
            >
              문의하기
            </a>
          </li>
        </ul>
      )}
    </nav>
  )
}
