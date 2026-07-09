# Handoff

## Current Owner
z.ai 모델 (Cline)

## Completed Work
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
/build Slice 1~7 완료 → /test (빌드 통과) → Netlify 배포 진행 중 → /review 대기

## Deployment
- Platform: Netlify (GitHub repo 자동 연결)
- Repo: github.com:Oplo-Works/hyrox.git
- Branch: main (자동 배포 트리거)
- Config: netlify.toml (빌드 명령 npm run build, publish .next, Node 20)
- Latest Commit: 2da7cb5
- 상태: Netlify 대시보드에서 배포 진행 상황 확인 필요

## Next Owner
Claude — `/review` 실행 권장 (또는 운영자가 Netlify 배포 완료 확인 후)

## Next Task
`/review` 수행:
- scope creep 확인 (빌드 브리프 범위 내 구현 여부)
- HYROX 사용 규칙 위반 여부 (공식 사이트처럼 보이는지, "Official" 표현 있는지)
- 금지 콘텐츠 포함 여부 (Don/Clinic/PT/의료/면책/결제/로그인)
- 보안/접근성 일관성 점검
- TODO placeholder가 fake data로 채워지지 않았는지 확인
- 모바일 반응형 코드 검토 (320px/375px/390px)

## Reason For Handoff
정확성·보안·일관성 검증은 Claude의 역할(0장 표). z.ai가 구현을 완료했으므로, Claude가 품질 안전망 2차(정확성)를 담당.

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
- Kakao OpenChat URL 미확정 (TODO_ADD_KAKAO_OPENCHAT_URL) — CTAButton이 비활성 span으로 처리
- 정확한 모임 요일/시간/장소/참가비 미확정 (TODO 표시)
- QR 이미지 미확정 (kakaoQrAvailable=false로 숨김 처리)
- OG 이미지 미제작 (og-placeholder.png 경로, 실제 파일 없음 — 배포 전 제작 필요)
- metadataBase URL placeholder (실제 도메인 확정 시 교체)
- next 14.2.15 보안 취약점 (patched 버전 업그레이드 권장)
- 320px/375px/390px 수동 반응형 테스트 미수행

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