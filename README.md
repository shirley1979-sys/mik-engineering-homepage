# MIK Engineering 홈페이지

(주)엠아이케이엔지니어링 회사소개 홈페이지. Next.js 14 + Tailwind CSS 기반 단일 페이지 구성입니다.

## 개발

```bash
npm install
npm run dev
```

## 구성

- `src/app/page.tsx` — 전체 섹션 (Hero, About, Business Scope, Government Support, Solutions, Partners, History, Contact)
- `src/components/Nav.tsx` — 상단 네비게이션
- `src/components/SolutionsTabs.tsx` — 솔루션 탭/카드
- `src/components/ContactForm.tsx` — 문의 폼 (메일 클라이언트로 전송)
- `src/components/FadeIn.tsx` — 스크롤 진입 시 페이드인 효과

## 배포

Vercel에 새 프로젝트로 연결 후 배포합니다.
