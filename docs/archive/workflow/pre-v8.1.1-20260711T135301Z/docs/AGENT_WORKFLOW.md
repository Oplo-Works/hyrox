# Agent Workflow — NY/NJ Hybrid Race Club Website

이 문서는 본 프로젝트의 AI coding agent 작업 규칙 원본(source of truth)입니다. 모든 모델은 작업 전에 반드시 이 문서를 읽어야 합니다. 상세한 워크플로우 매뉴얼은 `docs/AI_Coding_Agent_Workflow_v7.md`(Claude × Codex × GLM 3-모델 에디션)를 참고하세요.

## 3-모델 역할 분담 (요약 — 상세는 v7 매뉴얼 0장)

| 모델 | 핵심 역할 | 비고 |
|---|---|---|
| **GLM** (z.ai) | 생산 · 대량 구현 · 테스트 · 문서 | 기본 1차 시도. 저가 정액 + 넉넉한 쿼터 |
| **Codex** | 실행 정확성 · 라이브러리/프레임워크 관용구 · 버그 | 코드가 안 돌면 Claude가 아니라 여기로 승격 |
| **Claude** | 판단 · 설계 · 보안 · 일관성 · 최종 리뷰 | Pro 한도가 빡빡한 **희소 자원**. 깊은 판단에만 |

에스컬레이션 사다리: **GLM(자가수정 1~2회) → Codex(실행/관용구) → Claude(설계/로직/보안)**. 안 도는 코드는 Codex로, 설계·아키텍처·보안 문제만 Claude로 올립니다.

## Workflow

```text
/blueprint → /spec → /plan → /build → /test → /review → /log
```

- `/blueprint`, `/spec` — `docs/nynj-hybrid-race-club-build-brief.md` 및 `docs/PRODUCT_BLUEPRINT.md`에서 이미 정의됨
- `/plan` — 본 문서의 "Build Plan" 섹션 참고
- `/build` — slice 단위로 진행
- `/test` — `npm run build` 및 수동 체크리스트
- `/review` — scope, 보안, 일관성 점검
- `/log` — `docs/DEV_LOG.md` 갱신

## Project Name

NY/NJ Hybrid Race Club Website (MVP v0.1)

## Current MVP Goal

모바일 우선, 이중언어(영어/한국어), 고에너지 랜딩 페이지 구축. 주요 전환 = Kakao OpenChat 참여.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (최소한의 애니메이션)
- Vercel 배포
- 정적 데이터 설정 파일 (`data/site.ts`)

## Build / Test Commands

```bash
npm run build
npm run lint
npm run dev
```

## Build Plan (Vertical Slices)

### Slice 1 — 프로젝트 초기화 + 데이터 설정
- Next.js + TypeScript + Tailwind 초기화
- `data/site.ts` 생성 (모든 TODO 포함)
- `app/globals.css` 컬러 토큰 + 기본 스타일
- 파일: `package.json`, `tailwind.config.ts`, `app/globals.css`, `data/site.ts`

### Slice 2 — 재사용 컴포넌트
- `CTAButton`, `SectionHeader`, `EventCard`, `TrainingCard`
- 파일: `components/CTAButton.tsx`, `components/SectionHeader.tsx`, `components/EventCard.tsx`, `components/TrainingCard.tsx`

### Slice 3 — Header + Hero
- `Header.tsx`, `Hero.tsx`
- 파일: `components/Header.tsx`, `components/Hero.tsx`

### Slice 4 — Next Meetup + What We Train
- `NextMeetup.tsx`, `TrainingTypes.tsx`
- 파일: `components/NextMeetup.tsx`, `components/TrainingTypes.tsx`

### Slice 5 — Upcoming Events + All Levels Welcome
- `UpcomingEvents.tsx`, `AllLevelsWelcome.tsx`
- 파일: `components/UpcomingEvents.tsx`, `components/AllLevelsWelcome.tsx`

### Slice 6 — Join + FAQ + Footer + StickyCTA
- `JoinOpenChat.tsx`, `FAQ.tsx`, `Footer.tsx`, `StickyCTA.tsx`
- 파일: `components/JoinOpenChat.tsx`, `components/FAQ.tsx`, `components/Footer.tsx`, `components/StickyCTA.tsx`

### Slice 7 — 페이지 조립 + 메타데이터 + 빌드 테스트
- `app/page.tsx`, `app/layout.tsx` 메타데이터/OG
- `npm run build` 통과
- 파일: `app/page.tsx`, `app/layout.tsx`

## Rules

1. 코딩 전에 spec/plan 확인 — 빌드 브리프가 이미 spec 역할
2. 한 번에 하나의 slice만 구현
3. 한 slice에서 3~5개 파일 이하 수정
4. 기존 working demo flow 유지
5. broad rewrite 금지
6. 프로젝트 범위 밖 기능 추가 금지
7. TODO는 명확히 표시, 미완성을 완성처럼 하지 않기
8. 실제 사용자/고객 데이터 추가 금지
9. 결제/보안/개인정보 기능은 추가 review 전 자동화 금지
10. 빌드 종료 전 `npm run build` 실행
11. 의미 있는 변경 후 `docs/DEV_LOG.md` 갱신
12. 세션 종료 전 `docs/HANDOFF.md` 갱신 (마지막 커밋 해시 포함)
13. **세션 종료 전 반드시 커밋** — build/test 통과 후 커밋(가능하면 push), dirty working tree로 인계 금지 (v7 규칙 28)
14. **시크릿/API 키/토큰 커밋 금지** — `.gitignore`된 `.env` + `.env.example` placeholder 사용 (v7 규칙 29)

## HYROX Usage Rules (Critical)

- HYROX는 훈련/이벤트 카테고리로만 사용
- 공식 HYROX 사이트처럼 보이게 하지 않기
- HYROX 공식 로고/이미지 사용 금지
- "Official HYROX", "HYROX Partner Gym" 등 표현 금지
- Footer에 비공식 안내 문구 필수 포함

## Prohibited Content (MVP)

- HYROX logo / official images
- Don Clinic name / logo / address / profile / photo / bio
- Medical / PT claims
- Injury / liability waiver
- Payment / checkout
- User login / member directory
- Official race registration function

## Bilingual Strategy

- 영어와 한국어를 각 섹션에 함께 표시
- 영어는 짧고 강렬한 헤드라인용
- 한국어는 설명/따뜻함용
- 복잡한 언어 전환기 없이 함께 노출

## Mobile-First Requirements

- 320px / 375px / 390px 최적화
- CTA 버튼 최소 44px 높이
- Sticky CTA iPhone safe-area 대응
- 가로 overflow 금지 (의도된 캐러셀 제외)
- 빠른 모바일 로딩

## Accessibility

- 시맨틱 HTML 섹션
- `h1` 하나만
- 논리적 heading 순서
- 키보드 접근 가능 버튼/링크
- 충분한 대비
- 아이콘 전용 버튼에 `aria-label`
- 모든 이미지에 유용한 alt
- reduced motion 지원