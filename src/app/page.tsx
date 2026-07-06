import Image from 'next/image'
import FadeIn from '@/components/FadeIn'
import Nav from '@/components/Nav'
import SolutionsTabs from '@/components/SolutionsTabs'
import ContactForm from '@/components/ContactForm'
import { getSiteContent } from '@/lib/content'
import { getHistoryEntries } from '@/lib/history'

export const dynamic = 'force-dynamic'

function buildStats(content: Awaited<ReturnType<typeof getSiteContent>>) {
  return [
    { label: 'YEAR', value: content.statYear, title: '창립', sub: '법인전환 2016년' },
    { label: 'PROJECTS', value: content.statProjects, title: '납품 프로젝트', sub: '설계부터 설치 턴키' },
    { label: 'CLIENTS', value: content.statClients, title: '주요 고객사', sub: '대기업 협력사 다수' },
    { label: 'DOMAINS', value: content.statDomains, title: '전문 사업분야', sub: 'AMR · 2차전지 · 디스플레이 · 기타' },
  ]
}

const SCOPE_STEPS = [
  {
    no: '01',
    key: 'scopeStep1ImageUrl',
    title: '기구설계',
    en: 'Mechanical Design',
    desc: 'System Layout · Machine Concept · 3D Modeling',
  },
  {
    no: '02',
    key: 'scopeStep2ImageUrl',
    title: '검증',
    en: 'Verification',
    desc: 'Strength Calculation · Structural Analysis · Simulation',
  },
  {
    no: '03',
    key: 'scopeStep3ImageUrl',
    title: '제작',
    en: 'Manufacturing',
    desc: 'Production · Quality Control · Testing',
  },
  {
    no: '04',
    key: 'scopeStep4ImageUrl',
    title: '설치',
    en: 'Installation',
    desc: 'On-site Setup · Commissioning · A/S',
  },
]

function renderScopeIcon(index: number) {
  if (index === 0) {
    return (
      <div className="text-white/80 group-hover:text-white transition-colors animate-[spin_9s_linear_infinite]" style={{ transformOrigin: '50% 50%' }}>
        <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L3 6.5v11L12 22l9-4.5v-11L12 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.5L12 11m0 0l9-4.5M12 11v11" opacity={0.6} />
          <circle cx="12" cy="11" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      </div>
    )
  }
  if (index === 1) {
    return (
      <div className="relative flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
        <span
          className="absolute w-14 h-14 rounded-full border-2 animate-ping"
          style={{ borderColor: 'rgba(196,30,30,0.4)', animationDuration: '2.2s' }}
        />
        <svg className="w-9 h-9 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.618 4.016A11.955 11.955 0 0012 1.944a11.955 11.955 0 006.382 2.072A12.02 12.02 0 0121 6c0 5.591-3.824 10.29-9 11.622C6.824 16.29 3 11.591 3 6c0-.69.076-1.362.218-2.016z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5l2 2 4-4.5" />
        </svg>
      </div>
    )
  }
  if (index === 2) {
    return (
      <div className="relative w-9 h-9 text-white/80 group-hover:text-white transition-colors">
        <svg
          className="w-9 h-9 absolute inset-0 animate-[spin_7s_linear_infinite]"
          style={{ transformOrigin: '50% 50%' }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.4}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <svg
          className="w-4 h-4 absolute -bottom-1 -right-1 animate-[spin_4s_linear_infinite_reverse]"
          style={{ transformOrigin: '50% 50%' }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
    )
  }
  return (
    <div className="relative text-white/80 group-hover:text-white transition-colors">
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 21V9l6-4 6 4v12M4 21h16M4 21v-8h4M16 21v-8h4v8M10 13h4M10 17h4"
        />
      </svg>
      <span
        className="absolute -bottom-1 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center animate-pulse"
        style={{ background: '#c41e1e' }}
      >
        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    </div>
  )
}

const GOV_CARDS = [
  {
    title: '스마트공장 공급기업 등록',
    desc: '중소벤처기업부 스마트공장 보급·확산사업 공급기업으로 등록되어 정부지원을 받는 스마트팩토리 구축이 가능합니다.',
    path: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  {
    title: '정부과제 참여 이력',
    desc: '다수의 정부 R&D 및 자동화 지원과제에 참여한 실적을 보유하고 있습니다. 정부지원사업 연계 도입 상담이 가능합니다.',
    path: 'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z',
  },
  {
    title: '지원금 활용 도입 가능',
    desc: '스마트제조혁신 지원금을 활용한 AMR·협동로봇·자동화 장비 도입이 가능합니다. 전담 컨설팅을 제공합니다.',
    path: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]

const PARTNER_CLIENTS = [
  'mPLUS', 'AP Systems', 'YUJIN ROBOT', '한화테크엠', 'SFA', '시너스텍',
  '갑진', '소프트센', '우신시스템', '휴비스', 'DIT', '유도로보틱스',
  '셰플러코리아', '에실로코리아', '정식품',
]

export default async function Home() {
  const content = await getSiteContent()
  const STATS = buildStats(content)
  const HISTORY = await getHistoryEntries()

  return (
    <>
      <Nav logoUrl={content.logoUrl} />
      <main>
        {/* Hero */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center overflow-hidden"
          style={{ background: '#050d1a' }}
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=1920&q=80&fm=jpg&fit=crop"
              alt="스마트 팩토리 자동화 생산라인"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(5,13,26,0.92) 0%, rgba(5,13,26,0.8) 45%, rgba(5,13,26,0.62) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(5,13,26,0.9) 0%, transparent 35%)' }}
          />

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 md:py-40 w-full">
            <FadeIn>
              <div
                className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full border"
                style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.16)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#c41e1e' }} />
                <span className="text-[11px] font-bold tracking-[3px] uppercase" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {content.heroBadge}
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-[76px] font-black text-white leading-[1.12] tracking-tight mb-6">
                기술의 <span style={{ color: '#e53e3e' }}>초격차</span>를<br />
                설계하다
              </h1>
            </FadeIn>
            <FadeIn delay={150}>
              <p
                className="text-sm font-semibold tracking-widest mb-8 uppercase"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                Designing the Technological Edge
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-lg leading-relaxed mb-12 max-w-2xl" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {content.heroDescription}
              </p>
            </FadeIn>
            <FadeIn delay={250}>
              <div className="flex flex-wrap gap-4 mb-16">
                <a
                  href="#solutions"
                  className="inline-flex items-center gap-2.5 text-white font-bold px-9 py-4 rounded-xl transition-all hover:-translate-y-0.5 text-base"
                  style={{ background: '#c41e1e', boxShadow: '0 8px 32px rgba(196,30,30,0.45)' }}
                >
                  솔루션 보기
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 font-semibold px-9 py-4 rounded-xl transition-all text-base text-white"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  프로젝트 문의
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="flex flex-wrap gap-2">
                {['AMR 자율이송', '협동로봇 UR', '2차전지 자동화', '디스플레이 장비', '정부지원 연계', '스마트공장 구축'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium rounded-full px-3 py-1 tracking-wide"
                      style={{
                        color: 'rgba(255,255,255,0.35)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        background: 'rgba(255,255,255,0.04)',
                      }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Stats */}
        <section style={{ background: '#070f1a', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="relative py-10 px-6 text-center"
                  style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div
                    className="text-[10px] font-bold tracking-[3px] uppercase mb-3"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    {stat.label}
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 leading-none">
                    <span className="font-mono">{stat.value}</span>
                  </div>
                  <div className="text-sm font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {stat.title}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
              <FadeIn>
                <div className="relative">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src={
                        content.aboutImageUrl ||
                        'https://images.unsplash.com/photo-1752614671052-92e18f534db1?w=1200&q=80&fm=jpg&fit=crop'
                      }
                      alt="MIK 엔지니어링 공장 자동화"
                      fill
                      sizes="500px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div
                    className="absolute -bottom-5 -right-5 text-white text-sm font-black px-5 py-3 rounded-2xl leading-tight"
                    style={{ background: 'linear-gradient(135deg, #c41e1e, #991b1b)', boxShadow: '0 8px 32px rgba(196,30,30,0.35)' }}
                  >
                    SINCE 2014
                    <br />
                    <span className="font-normal text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      경기도 화성시 향남읍
                    </span>
                  </div>
                  <div
                    className="absolute -top-5 -left-5 text-white text-xs font-semibold px-4 py-2.5 rounded-xl"
                    style={{ background: '#0e1e33', boxShadow: '0 4px 20px rgba(14,30,51,0.3)' }}
                  >
                    본사 320평 + 2공장 150평
                  </div>
                </div>
              </FadeIn>

              <div>
                <FadeIn>
                  <span className="text-[11px] font-bold tracking-[3px] text-brand uppercase block mb-4">About Us</span>
                  <div className="w-10 h-0.5 bg-brand mb-6 rounded-full" />
                  <h2 className="text-4xl md:text-[42px] font-black text-navy leading-tight mb-2 tracking-tight">
                    고객의 수율이 곧<br />
                    <span className="text-brand">우리의 자부심</span>입니다
                  </h2>
                  <p className="text-sm font-semibold tracking-wider mb-6" style={{ color: 'rgba(14,30,51,0.35)' }}>
                    Your Yield Rate Is Our Pride
                  </p>
                  <p className="text-gray-500 leading-relaxed text-[15px] mb-8">{content.aboutDescription}</p>
                </FadeIn>

                <FadeIn delay={100}>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label: '설립', value: '2014' },
                      { label: '임직원', value: '15+명' },
                      { label: '공장면적', value: '470평' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl px-4 py-3 text-center"
                        style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                      >
                        <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">
                          {item.label}
                        </div>
                        <div className="font-black text-navy text-lg">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </FadeIn>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      title: '최적의 수율 구현',
                      en: 'Maximum Yield',
                      desc: 'AI 기술과 로봇 솔루션을 결합하여 제조·물류 환경을 최적화합니다.',
                      path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                    },
                    {
                      title: '진정한 파트너십',
                      en: 'True Partnership',
                      desc: '유진로봇·Universal Robots와의 전략적 파트너십으로 최신 솔루션을 제공합니다.',
                      path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0',
                    },
                    {
                      title: '안전 위에 세우는 혁신',
                      en: 'Safety-First Innovation',
                      desc: '안전은 타협할 수 없는 원칙이며, 행복은 기술을 움직이는 원동력입니다.',
                      path: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                    },
                  ].map((card, i) => (
                    <FadeIn key={card.title} delay={150 + i * 50}>
                      <div
                        className="rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300"
                        style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                          style={{ background: 'linear-gradient(135deg, #0e1e33, #1a3557)' }}
                        >
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={card.path} />
                          </svg>
                        </div>
                        <div className="font-black text-navy text-sm mb-0.5">{card.title}</div>
                        <div className="text-[10px] font-semibold tracking-wider mb-2" style={{ color: 'rgba(196,30,30,0.6)' }}>
                          {card.en}
                        </div>
                        <div className="text-gray-400 text-xs leading-relaxed">{card.desc}</div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Scope */}
        <section id="scope" className="py-24 md:py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="mb-16">
              <span className="text-[11px] font-bold tracking-[3px] text-brand uppercase block mb-3">Business Scope</span>
              <h2 className="text-4xl md:text-5xl font-black text-navy tracking-tight mb-4">
                설계부터 설치까지<br />
                <span className="text-brand">전 공정 턴키</span>
              </h2>
              <p className="text-gray-500 text-base max-w-md">기구설계·검증·제작·설치의 모든 과정을 자체 역량으로 수행합니다.</p>
            </FadeIn>

            <div className="relative">
              <div
                className="hidden md:block absolute top-14 left-[12.5%] right-[12.5%] h-px"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(196,30,30,0.0) 0%, rgba(196,30,30,0.3) 50%, rgba(196,30,30,0.0) 100%)',
                }}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                {SCOPE_STEPS.map((step, i) => (
                  <FadeIn key={step.no} delay={i * 100}>
                    <div className="group flex flex-col items-center text-center">
                      <div
                        className="relative w-28 h-28 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:-translate-y-2 overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #0e1e33, #1a3557)', boxShadow: '0 8px 32px rgba(14,30,51,0.2)' }}
                      >
                        <div
                          className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white z-10"
                          style={{ background: '#c41e1e', boxShadow: '0 4px 12px rgba(196,30,30,0.4)' }}
                        >
                          {step.no.replace('0', '')}
                        </div>
                        {content[step.key as keyof typeof content] ? (
                          <Image
                            src={content[step.key as keyof typeof content]}
                            alt={step.title}
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        ) : (
                          renderScopeIcon(i)
                        )}
                      </div>
                      <div className="text-[10px] font-bold tracking-[2px] text-brand/60 uppercase mb-2">{step.no}</div>
                      <h3 className="text-navy font-black text-xl mb-1">{step.title}</h3>
                      <div className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-3">{step.en}</div>
                      <p className="text-gray-400 text-xs leading-relaxed max-w-[160px]">{step.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            <FadeIn delay={400}>
              <div
                className="mt-16 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4"
                style={{ background: 'linear-gradient(135deg, #0e1e33, #1a3557)', boxShadow: '0 16px 48px rgba(14,30,51,0.2)' }}
              >
                <div>
                  <div className="text-white font-bold text-lg mb-1">설계부터 설치까지 일괄 발주 가능</div>
                  <div className="text-white/40 text-sm">개념 설계, 도면 작성, 제작, 현장 설치까지 단일 계약으로 진행합니다.</div>
                </div>
                <a
                  href="#contact"
                  className="shrink-0 font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 whitespace-nowrap text-white"
                  style={{ background: '#c41e1e', boxShadow: '0 4px 20px rgba(196,30,30,0.4)' }}
                >
                  {content.scopeCtaLabel} →
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Government Support */}
        <section id="government" className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#0a1628' }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <FadeIn className="mb-16">
              <span className="text-[11px] font-bold tracking-[3px] uppercase block mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Government Support
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">정부과제 공급기업</h2>
              <p className="text-base max-w-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
                정부 스마트공장 지원사업 공급기업으로 등록되어<br />
                보조금을 활용한 자동화 도입을 지원합니다.
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-5">
              {GOV_CARDS.map((card, i) => (
                <FadeIn key={card.title} delay={i * 100}>
                  <div
                    className="rounded-2xl p-7 transition-all duration-300 relative overflow-hidden h-full"
                    style={{ background: 'rgba(14,30,51,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="text-[11px] font-bold tracking-[2px] mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: 'rgba(196,30,30,0.15)', border: '1px solid rgba(196,30,30,0.2)', color: '#f87171' }}
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={card.path} />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3 leading-snug">{card.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {card.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={300}>
              <div
                className="mt-10 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
                style={{ background: 'rgba(196,30,30,0.12)', border: '1px solid rgba(196,30,30,0.2)' }}
              >
                <div>
                  <div className="text-white font-bold text-lg mb-1">정부지원 활용 상담이 필요하신가요?</div>
                  <div className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    스마트공장 보급확산 지원금 연계 도입 절차를 안내해 드립니다.
                  </div>
                </div>
                <a
                  href="#contact"
                  className="shrink-0 text-white font-bold px-7 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 whitespace-nowrap"
                  style={{ background: '#c41e1e', boxShadow: '0 4px 20px rgba(196,30,30,0.4)' }}
                >
                  지원금 상담 신청 →
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Solutions */}
        <section id="solutions" className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#070f1a' }}>
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <FadeIn className="mb-10">
              <span className="text-[11px] font-bold tracking-[3px] text-brand/80 uppercase block mb-3">Solutions</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">산업별 자동화 솔루션</h2>
              <p className="mt-3 text-base max-w-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>
                다양한 산업군에서 검증된 MIK의 납품 실적입니다.
              </p>
            </FadeIn>
            <FadeIn delay={100}>
              <SolutionsTabs />
            </FadeIn>
          </div>
        </section>

        {/* Partners */}
        <section id="partners" className="py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="mb-16">
              <span className="text-[11px] font-bold tracking-[3px] text-brand uppercase block mb-3">Partnership</span>
              <h2 className="text-4xl md:text-5xl font-black text-navy tracking-tight mb-4">공인 파트너십</h2>
              <p className="text-gray-500 text-base max-w-lg">공식 대리점 및 SI 파트너 자격으로 최신 로봇 솔루션을 제공합니다.</p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: 'YUJIN ROBOT',
                  badge: '공식 대리점 · AMR',
                  desc: '유진로봇 자율주행로봇(AMR) 공식 대리점. GoCart 전 제품군 판매 및 주변장치 설계·납품.',
                  tags: ['GoCart 180', 'GoCart 250', 'GoCart 500/1000', 'GoCart 200 Omni'],
                  accent: '#0e1e33',
                  image: 'https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?w=800&q=80&fm=jpg&fit=crop',
                },
                {
                  name: 'UNIVERSAL ROBOTS',
                  badge: '공식 SI 파트너 · 협동로봇',
                  desc: 'Universal Robots 공식 System Integrator. 협동로봇 도입·통합 자동화 시스템 구축.',
                  tags: ['UR3e', 'UR5e', 'UR10e', 'UR16e', 'UR20', 'UR30'],
                  accent: '#c41e1e',
                  image: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=800&q=80&fm=jpg&fit=crop',
                },
              ].map((partner, i) => (
                <FadeIn key={partner.name} delay={i * 100}>
                  <div
                    className="rounded-2xl p-8 relative overflow-hidden hover:-translate-y-2 transition-all duration-300"
                    style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, ${partner.accent}, #0e1e33)` }}
                    />
                    <div className="font-black text-2xl text-navy mb-2 leading-tight tracking-tight">{partner.name}</div>
                    <span
                      className="inline-block text-[11px] font-bold px-4 py-1.5 rounded-full tracking-wider mb-5"
                      style={{ background: '#0e1e33', color: 'white' }}
                    >
                      {partner.badge}
                    </span>
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-5">
                      <Image src={partner.image} alt={partner.name} fill sizes="500px" className="object-cover object-center" />
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{partner.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {partner.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full font-medium"
                          style={{ border: `1px solid ${partner.accent}30`, color: partner.accent, background: `${partner.accent}08` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Clients marquee */}
        <section className="py-16 bg-white overflow-hidden">
          <FadeIn>
            <p className="text-center text-xs font-bold tracking-[3px] text-gray-300 uppercase mb-10">주요 납품처 · 등록 고객사</p>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex animate-marquee gap-12 w-max">
              {[...PARTNER_CLIENTS, ...PARTNER_CLIENTS].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-gray-200 font-black text-lg whitespace-nowrap select-none hover:text-navy transition-colors cursor-default"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* History */}
        <section id="history" className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <FadeIn className="text-center mb-16">
              <span className="text-[11px] font-bold tracking-[3px] text-brand uppercase block mb-3">History</span>
              <h2 className="text-4xl md:text-5xl font-black text-navy tracking-tight">
                10년의 성장 <span className="text-brand">연혁</span>
              </h2>
            </FadeIn>

            <div className="relative">
              <div className="absolute left-[72px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-navy via-navy-light to-gray-200" />
              <div className="space-y-8">
                {HISTORY.map((entry, i) => (
                  <FadeIn key={entry.year} delay={i * 40}>
                    <div className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <div
                        className={`flex-1 pl-20 md:pl-0 ${
                          i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                        }`}
                      >
                        <span className="text-[10px] font-black tracking-widest text-brand uppercase block mb-1">{entry.title}</span>
                        <ul className="space-y-1">
                          {entry.items.map((item) => (
                            <li key={item} className="text-gray-600 text-sm leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="absolute left-[62px] md:left-1/2 md:-translate-x-1/2 top-0 flex flex-col items-center">
                        <div className="w-[22px] h-[22px] rounded-full bg-navy border-4 border-white shadow-md" />
                      </div>
                      <div
                        className={`hidden md:block flex-1 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}
                      >
                        <span className="font-black text-3xl text-navy/20 tabular-nums">{entry.year}</span>
                      </div>
                      <div className="absolute left-0 top-0 w-14 md:hidden">
                        <span className="font-black text-base text-navy/40 tabular-nums">{entry.year}</span>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 md:py-32 bg-navy relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
              <FadeIn>
                <span className="text-[11px] font-bold tracking-[3px] text-brand/80 uppercase block mb-3">Contact Us</span>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                  프로젝트 문의<br />
                  <span className="text-brand">언제든지</span> 연락주세요
                </h2>
                <p className="text-white/45 text-base leading-relaxed mb-10">
                  자동화 장비, AMR, 협동로봇 도입에 대해 궁금한 점이 있으시면 편하게 문의해주세요.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 shrink-0 bg-white/8 border border-white/10 rounded-xl flex items-center justify-center text-white/60">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white/40 text-[11px] font-bold tracking-widest uppercase mb-1">이메일</div>
                      <div className="text-white text-sm font-medium leading-relaxed">{content.contactEmail}</div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 shrink-0 bg-white/8 border border-white/10 rounded-xl flex items-center justify-center text-white/60">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white/40 text-[11px] font-bold tracking-widest uppercase mb-1">주소</div>
                      <div className="text-white text-sm font-medium leading-relaxed">
                        {content.contactAddress1}
                        <br />
                        {content.contactAddress2}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={100}>
                <ContactForm />
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#070f1a] border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-black text-white text-lg tracking-tight mb-1">
              MIK<span className="text-brand">.</span>
            </div>
            <div className="text-white/30 text-xs leading-relaxed">
              (주)엠아이케이엔지니어링&nbsp;&nbsp;|&nbsp;&nbsp;대표이사 {content.footerCeo}
              <br />
              {content.contactAddress1}
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex gap-2">
              {['YUJIN ROBOT 대리점', 'UR SI 파트너', '스마트공장 공급기업'].map((badge) => (
                <span key={badge} className="text-[10px] font-semibold text-white/30 border border-white/10 px-2.5 py-1 rounded">
                  {badge}
                </span>
              ))}
            </div>
            <div className="text-white/20 text-xs">© 2026 MIK Engineering. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </>
  )
}
