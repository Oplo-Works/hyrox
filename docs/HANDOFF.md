# Handoff

## Current Owner
Ready for next agent

## Start Here (Next Agent)
1. `git pull origin main` 후 `npm install` 실행
2. 작업 전 반드시 다음 문서를 순서대로 읽기: `docs/HANDOFF.md` → `docs/AGENT_WORKFLOW.md` → `docs/DEV_LOG.md`의 Current Status → `docs/nynj-hybrid-race-club-build-brief.md`
3. 기본 검증: `npm run lint` → `npm run build`
4. 화면 확인이 필요하면 `npm run dev -- -p 3011` 후 320px, 375px, 390px에서 가로 overflow·CTA·Sticky CTA·스크롤 모션을 확인
5. 작업 종료 전 `docs/DEV_LOG.md`, `docs/HANDOFF.md`를 갱신하고 관련 변경을 커밋·푸시

## Completed Work
- 모바일 스크롤 에너지 디자인 적용: `ScrollEnergy`가 스크롤 방향/속도에 따라 진행선, 양측 레인, 스피드 라인을 갱신하고 섹션 진입 reveal을 처리
- 참고 이미지의 네온 옐로 포인트를 CTA, 섹션 구분, Hero 레이스 라인에 적용. 공식 HYROX 로고/이미지/레이아웃은 사용하지 않음
- CTA 키보드 포커스 링을 네온 옐로로 보강
- 390px 모바일 스크롤 검증: down/up 반응, 가로 overflow 없음, 콘솔 warnings/errors 0
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
/build Slice 1~7 완료 → /test (빌드 통과) → /review (Codex 완료) → 모바일 에너지 디자인 적용 및 검증 완료 → polish/보안 패치 대기 → Netlify 배포 확인 필요

## Deployment
- Platform: Netlify (GitHub repo 자동 연결)
- Repo: github.com:Oplo-Works/hyrox.git
- Branch: main (자동 배포 트리거)
- Config: netlify.toml (빌드 명령 npm run build, publish .next, Node 20)
- Latest Feature Commit: `41ec5a5` (`feat: add mobile scroll energy`)
- 상태: `main` 푸시가 Netlify 자동 배포를 트리거함. Netlify 대시보드에서 해당 커밋의 배포 완료 여부 확인 필요

## Next Owner
Codex 또는 GLM — 리뷰에서 발견된 polish/보안/자산 이슈 수정

## Next Task
권장 작업 순서:
1. Next.js 보안 패치 버전 업그레이드 및 재빌드 검증
2. `/images/og-placeholder.png` 실제 파일 추가 또는 metadata 이미지 경로 제거
3. 모바일 Sticky CTA 숨김 상태에서 focusable link가 tab order에 남지 않도록 수정
4. 320px Hero CTA 문구/간격 polish
5. Netlify 배포 결과 및 OG 이미지 404 재확인

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
- `components/ScrollEnergy.tsx` — 스크롤 방향/속도, IntersectionObserver 기반 section reveal. React state를 갱신하지 않아 스크롤 성능을 보존함
- `app/globals.css` — `--scroll-progress`, `--scroll-intensity`, 네온 옐로 토큰, 레인/스피드 라인/reveal 스타일. reduced motion 규칙을 유지할 것
- `components/StickyCTA.tsx`, `components/CTAButton.tsx` — 다음 접근성 polish 대상
- `app/layout.tsx` — 실제 OG 이미지 추가 또는 경로 제거 시 수정
- `data/site.ts` — 운영자가 TODO 모임 정보와 이벤트 정보를 채우는 단일 데이터 소스
- (운영자) data/site.ts — TODO 값 채우기
- (운영자) public/images/ — QR, hero, OG 이미지 추가

## Context Summary
NY/NJ Hybrid Race Club 모바일 우선 이중언어 랜딩 페이지 MVP 완성. Next.js 14 App Router + TypeScript + Tailwind + Framer Motion(최소). 모바일 스크롤에 반응하는 진행선/레인/섹션 reveal과 네온 옐로 포인트가 추가됨. 주요 전환 = Kakao OpenChat (CTA 7곳). HYROX는 훈련 카테고리로만 사용하며 공식 로고·이미지·레이아웃은 사용하지 않음. 미확정값은 전부 TODO placeholder. 빌드/lint 통과 및 390px 스크롤 검증 완료.

## Known Issues
- Kakao OpenChat URL은 적용됨 (`https://open.kakao.com/o/gjuedrvi`)
- 정확한 모임 요일/시간/장소/참가비 미확정 (TODO 표시)
- QR 이미지 미확정 (kakaoQrAvailable=false로 숨김 처리)
- OG 이미지 미제작 (og-placeholder.png 경로, 실제 파일 없음 — 배포 전 제작 필요)
- metadataBase URL placeholder (실제 도메인 확정 시 교체)
- next 14.2.15 보안 취약점 (`npm audit --omit=dev`: next critical + bundled postcss moderate)
- 320px/375px/390px 모바일 확인 완료: 가로 overflow/콘솔 오류 없음, Hero CTA wrapping polish 필요
- 숨겨진 모바일 Sticky CTA 내부 링크가 focusable 상태로 남음
- CTA 버튼 focus ring은 네온 옐로로 개선 완료

## Verification Snapshot
- `npm run lint`: 통과, warnings/errors 0
- `npm run build`: 통과, 정적 4페이지, `/` First Load JS 134kB
- 390px 모바일: 스크롤 down/up 시 진행선·레인·섹션 reveal 동작, 가로 overflow 없음, 콘솔 warnings/errors 0
- 320px/375px: 이전 점검에서 가로 overflow/콘솔 오류 없음. Hero CTA의 문구 wrapping은 다음 polish 대상으로 유지
- 개발 서버는 실행 중이지 않음

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
