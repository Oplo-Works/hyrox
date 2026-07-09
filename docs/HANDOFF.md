# Handoff

## Current Owner
Codex

## Completed Work
- Codex 리뷰 수행: `npm run build`, `npm run lint`, `npm audit --omit=dev`, 320px/375px/390px 모바일 렌더링, 콘솔 오류, 가로 overflow, OG 이미지 404, 접근성 포커스 상태 확인
- Header 클럽명 폰트 크기 2배 확대 (EN: text-base→text-2xl / text-lg→text-3xl, KO: text-[10px]→text-sm / text-xs→text-base), 헤더 높이 및 Hero pt 동기화
- 프로젝트 문서 파일 8개 생성 (BLUEPRINT, SCOPE, WORKFLOW, DEV_LOG, HANDOFF, README, CLAUDE.md, AGENTS.md)
- Next.js 프로젝트 수동 초기화 (package.json, tsconfig, next.config, tailwind.config, postcss, eslint, gitignore)
- `data/site.ts` 데이터 설정 파일 (모든 TODO 포함)
- `app/globals.css` 컬러 토큰 + reduced motion + 모션 라인 스타일
- 재사용 컴포넌트 4개: CTAButton, SectionHeader, EventCard, TrainingCard
- 섹션 컴포넌트 10개: Header, Hero, NextMeetup, TrainingTypes, UpcomingEvents, AllLevelsWelcome, JoinOpenChat, FAQ, Footer, StickyCTA
- `app/layout.tsx` 폰트 로딩 (Bebas Neue, Inter, Noto Sans KR) + 메타데이터 + OG + metadataBase
- `app/page.tsx` 모든 섹션 조립
- `npm install` 성공 (394 packages)
- `npm run build` 2회 통과 (최종: 경고 0, 에러 0, 정적 4페이지, 46.6kB/134kB)

## Current Stage
/build Slice 1~7 완료 → /test (빌드 통과) → /review (Codex 완료) → polish/보안 패치 대기 → Netlify 배포 확인 필요

## Deployment
- Platform: Netlify (GitHub repo 자동 연결)
- Repo: github.com:Oplo-Works/hyrox.git
- Branch: main (자동 배포 트리거)
- Config: netlify.toml (빌드 명령 npm run build, publish .next, Node 20)
- Latest Commit: 2da7cb5
- 상태: Netlify 대시보드에서 배포 진행 상황 확인 필요

## Next Owner
Codex 또는 GLM — 리뷰에서 발견된 polish/보안/자산 이슈 수정

## Next Task
리뷰 후 수정 권장:
- Next.js 보안 패치 버전 업그레이드 및 재빌드 검증
- `/images/og-placeholder.png` 실제 파일 추가 또는 metadata 이미지 경로 제거
- 모바일 Sticky CTA 숨김 상태에서 focusable link가 tab order에 남지 않도록 수정
- CTA 버튼 focus ring이 키보드 사용자에게 명확히 보이도록 수정
- 320px Hero CTA 문구/간격 polish

## Reason For Handoff
GLM 구현 후 Codex가 런타임/프레임워크/접근성 중심 리뷰를 수행함. 남은 작업은 작은 수정과 보안 패치 검증.

## Priority
High

## Files Changed
- docs/PRODUCT_BLUEPRINT.md, PROJECT_SCOPE.md, AGENT_WORKFLOW.md, DEV_LOG.md, HANDOFF.md
- README.md, CLAUDE.md, AGENTS.md
- package.json, tsconfig.json, next.config.mjs, next-env.d.ts, postcss.config.mjs, tailwind.config.ts, .eslintrc.json, .gitignore
- data/site.ts
- app/globals.css, app/layout.tsx, app/page.tsx
- components/CTAButton.tsx, SectionHeader.tsx, EventCard.tsx, TrainingCard.tsx
- components/Header.tsx, Hero.tsx, NextMeetup.tsx, TrainingTypes.tsx, UpcomingEvents.tsx, AllLevelsWelcome.tsx, JoinOpenChat.tsx, FAQ.tsx, Footer.tsx, StickyCTA.tsx

## Files To Touch Next
- (리뷰 후 수정 필요 시) components/*.tsx, data/site.ts
- (운영자) data/site.ts — TODO 값 채우기
- (운영자) public/images/ — QR, hero, OG 이미지 추가

## Context Summary
NY/NJ Hybrid Race Club 모바일 우선 이중언어 랜딩 페이지 MVP 완성. Next.js 14 App Router + TypeScript + Tailwind + Framer Motion(최소). 주요 전환 = Kakao OpenChat (CTA 7곳). HYROX는 훈련 카테고리로만 사용, 공식 사이트처럼 보이지 않음. 미확정값은 전부 TODO placeholder. 빌드 통과(경고 0). 남은 작업 = 운영자 TODO 채우기 + 이미지 제작 + Claude 리뷰 + 수동 모바일 테스트 + Vercel 배포.

## Known Issues
- Kakao OpenChat URL은 적용됨 (`https://open.kakao.com/o/gjuedrvi`)
- 정확한 모임 요일/시간/장소/참가비 미확정 (TODO 표시)
- QR 이미지 미확정 (kakaoQrAvailable=false로 숨김 처리)
- OG 이미지 미제작 (og-placeholder.png 경로, 실제 파일 없음 — 배포 전 제작 필요)
- metadataBase URL placeholder (실제 도메인 확정 시 교체)
- next 14.2.15 보안 취약점 (`npm audit --omit=dev`: next critical + bundled postcss moderate)
- 320px/375px/390px 모바일 확인 완료: 가로 overflow/콘솔 오류 없음, Hero CTA wrapping polish 필요
- 숨겨진 모바일 Sticky CTA 내부 링크가 focusable 상태로 남음
- CTA 버튼 focus outline이 투명/약하게 계산되어 키보드 focus 표시 개선 필요

## Escalation Rules
- 리뷰 중 아키텍처/보안/HYROX 규칙 문제 발견 → Claude가 직접 수정 판단
- 코드가 안 돌면 → Codex 승격 (현재 빌드 통과 상태이므로 해당 없음)
- 운영자 TODO 값 채우기는 사람(운영자) 작업

## Do NOT
- HYROX 공식 로고/이미지 사용
- "Official HYROX" 표현 사용
- Don/Clinic/PT/의료 콘텐츠 포함
- 결제/로그인/RSVP 시스템 구현
- 실제 사용자 데이터 추가
- 미확정값을 임의로 채우지 말고 TODO 유지
- 리뷰 없이 결제/보안/개인정보 기능 추가 (MVP 범위 밖)
