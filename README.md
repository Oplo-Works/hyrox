# NY/NJ Hybrid Race Club Website

모바일 우선, 이중언어(영어/한국어) 고에너지 랜딩 페이지 — NY/NJ 지역 HYROX, Mini HYROX, 5K, Half Marathon 훈련 커뮤니티.

## Overview

- **Club Name (EN):** NY/NJ Hybrid Race Club
- **Club Name (KO):** 뉴욕/뉴저지 하이브리드 레이스 클럽
- **Descriptor:** HYROX · Mini HYROX · 5K · Half Marathon
- **Primary Conversion:** Kakao OpenChat 참여
- **Primary Device:** 모바일 브라우저

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (최소한의 애니메이션)
- Vercel 배포

## Getting Started

```bash
npm install
npm run dev
```

개발 서버가 http://localhost:3000 에서 실행됩니다.

## Build

```bash
npm run build
npm run start
```

## Project Structure

```text
app/
  layout.tsx          # 루트 레이아웃 + 메타데이터
  page.tsx            # 메인 랜딩 페이지
  globals.css         # 글로벌 스타일 + 컬러 토큰
components/
  Header.tsx          # 모바일 헤더
  Hero.tsx            # 히어로 섹션
  NextMeetup.tsx      # 다음 모임 정보
  TrainingTypes.tsx   # 훈련 종류 카드
  UpcomingEvents.tsx  # 예정된 목표/이벤트
  AllLevelsWelcome.tsx # 초보자 환영 섹션
  JoinOpenChat.tsx    # 카카오 오픈채팅 참여
  FAQ.tsx             # 자주 묻는 질문
  Footer.tsx          # 푸터
  StickyCTA.tsx       # 모바일 하단 고정 CTA
  SectionHeader.tsx   # 섹션 헤더 재사용 컴포넌트
  EventCard.tsx       # 이벤트 카드
  TrainingCard.tsx    # 훈련 카드
  CTAButton.tsx       # CTA 버튼
data/
  site.ts             # 모임/이벤트 정보 (편집 가능)
docs/
  PRODUCT_BLUEPRINT.md
  PROJECT_SCOPE.md
  AGENT_WORKFLOW.md
  DEV_LOG.md
  HANDOFF.md
  AI_Coding_Agent_Workflow_v6.md
  nynj-hybrid-race-club-build-brief.md
```

## Editing Content

모임 정보와 이벤트 일정은 `data/site.ts`에서 편집합니다. `TODO_`로 시작하는 값들은 운영자가 실제 값으로 채워야 합니다.

### TODO Values to Update

- `kakaoOpenChatUrl` — 카카오 오픈채팅 링크
- `kakaoQrImage` — QR 코드 이미지 경로
- `nextMeetup.day` / `time` / `locationAreaEn` / `locationAreaKo` — 모임 정보
- `nextMeetup.feeEn` / `feeKo` — 참가비
- `upcomingEvents` — 이벤트 날짜/링크

## Important Notes

- 본 사이트는 **공식 HYROX 웹사이트가 아닙니다**. HYROX는 훈련 카테고리로만 사용됩니다.
- 의료/PT/클리닉 관련 콘텐츠는 포함되어 있지 않습니다.
- 결제/로그인/RSVP 시스템은 MVP에 포함되지 않습니다.

## Documentation

- [Product Blueprint](docs/PRODUCT_BLUEPRINT.md)
- [Project Scope](docs/PROJECT_SCOPE.md)
- [Agent Workflow](docs/AGENT_WORKFLOW.md)
- [Dev Log](docs/DEV_LOG.md)
- [Handoff](docs/HANDOFF.md)
- [Build Brief](docs/nynj-hybrid-race-club-build-brief.md)

## Deployment

Vercel에 배포:

```bash
vercel