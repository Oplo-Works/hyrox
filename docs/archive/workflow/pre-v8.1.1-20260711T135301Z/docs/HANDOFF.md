# Handoff

## Current Owner
Claude (방금까지 작업) → Ready for next agent

## Start Here (Next Agent)
1. `git pull origin main` 후 `npm install` 실행
2. 작업 전 반드시 다음 순서로 읽기: `docs/HANDOFF.md` → `docs/AGENT_WORKFLOW.md` → `docs/DEV_LOG.md`의 Current Status → `docs/nynj-hybrid-race-club-build-brief.md`
3. 3-모델 워크플로우 상세는 `docs/AI_Coding_Agent_Workflow_v7.md` (GLM 생산 · Codex 실행 · Claude 판단)
4. 기본 검증: `npm run build` (필요 시 `npm run lint`)
5. 화면 확인이 필요하면 `npm run dev` 후 320/375/390px에서 컬러·가로 overflow·CTA·Sticky CTA·스크롤 모션 확인
6. 작업 종료 전 build/test → 커밋(+push) → `docs/DEV_LOG.md`·`docs/HANDOFF.md` 갱신(커밋 해시 포함), 이전 HANDOFF는 `docs/handoff_history/`로 이동

## Completed Work (이번 세션)
- **Nitro 컬러웨이 리테마** (commit `fc05aeb`): 운영자 제시 러닝화 미드솔 컬러 믹스(블랙 어퍼 + 본화이트 + 오렌지→마젠타→퍼플 그라데이션 + 이리데슨트 그린)를 사이트 전체에 적용
  - 팔레트 교체: race-yellow/lime 완전 제거 → orange `#FF8B1E`(리드), magenta `#ED5FA4`(그라데이션 전용), purple `#A45CEB`(세컨더리), green `#35B586`(희소 악센트), 바이올렛톤 블랙
  - `--gradient-nitro` 도입: CTA 배경, Hero "Race Club" 텍스트, AllLevels "You are welcome here.", 섹션 헤더 바, 스크롤 진행선, 모션 라인
  - 히어로 글로우/레인 마커로 미드솔 앞(오렌지)→뒤(퍼플) 공간 배치 재현
  - **접근성**: FAQ 아코디언 키보드 포커스 블로커 수정(#014), WCAG AA 대비 보정(footer/event-card 텍스트, secondary CTA 테두리, 포커스 링 → green)
  - 검증: `npm run build` 통과, 라이브 DOM computed-style 확인, 4-렌즈 검증 워크플로우(leftover 색상·대비·일관성·기술 회귀) 통과
- **v7 워크플로우 문서 정렬**: 매뉴얼 v6 → `docs/AI_Coding_Agent_Workflow_v7.md`(Claude×Codex×GLM), CLAUDE.md/AGENTS.md/AGENT_WORKFLOW.md에 z.ai→GLM 명칭·커밋 규칙(28)·시크릿 규칙(29) 반영, `docs/handoff_history/` 생성

## Current Stage
/build Slice 1~7 완료 → 컬러 리테마 적용·검증 완료 → 배포(Netlify auto-deploy) → polish/보안 패치 대기

## Next Owner
GLM 또는 Codex — 아래 polish/보안 이슈. 컬러/브랜드/법적 판단이 필요하면 Claude.

## Next Task
권장 순서:
1. 배포 결과 확인 (Netlify 대시보드에서 `main` 최신 커밋 배포 완료 여부)
2. Next.js 보안 패치 버전 업그레이드 및 재빌드 검증 (#009)
3. `/images/og-placeholder.png` 실제 파일 추가 또는 metadata 이미지 경로 제거 (#007, #010)
4. 모바일 Sticky CTA 숨김 상태에서 내부 link가 tab order에 남지 않도록 수정 (#011)
5. 320px Hero CTA 문구/간격 polish (#013)

## Reason For Handoff
컬러 리테마·검증·문서 정렬은 판단/검증 작업이라 Claude가 수행함. 남은 작업은 대부분 표준 구현·보안 패치라 GLM/Codex가 담당 (v7 0장 역할 분담).

## Priority
Medium (MVP 기능·컬러 완료, 남은 것은 polish·보안·자산)

## Files Changed (이번 세션)
- app/globals.css, app/layout.tsx, tailwind.config.ts
- components/CTAButton, Hero, SectionHeader, EventCard, TrainingCard, AllLevelsWelcome, NextMeetup, FAQ, Footer (.tsx)
- docs/nynj-hybrid-race-club-build-brief.md (팔레트 섹션)
- CLAUDE.md, AGENTS.md, docs/AGENT_WORKFLOW.md
- docs/AI_Coding_Agent_Workflow_v7.md (신규), docs/AI_Coding_Agent_Workflow_v6.md (삭제)
- docs/DEV_LOG.md, docs/HANDOFF.md, docs/handoff_history/ (신규)
- .claude/launch.json (dev server 설정)

## Last Commit
- `fc05aeb` — feat: apply Nitro shoe colorway (컬러 리테마, 이번 세션의 기능 커밋)
- 뒤이어 v7 문서 정렬 커밋이 따름 (아래 Context 참고). 브랜치: `main`

## Files To Touch Next
- `app/layout.tsx` — 실제 OG 이미지 추가 또는 경로 제거 시
- `components/StickyCTA.tsx` — 숨김 상태 focus 처리
- `data/site.ts` — 운영자가 TODO 모임/이벤트 값을 채우는 단일 데이터 소스
- `package.json` — Next.js 보안 패치 업그레이드
- `app/globals.css` / `tailwind.config.ts` — 컬러 토큰 조정 시 (팔레트는 `--gradient-nitro` 및 orange/magenta/purple/green 토큰으로 중앙 관리)

## Context Summary
NY/NJ Hybrid Race Club 모바일 우선 이중언어 랜딩 MVP. Next.js 14 App Router + TypeScript + Tailwind + Framer Motion(최소). 이번 세션에 팔레트를 운영자 제시 러닝화 컬러웨이(오렌지→마젠타→퍼플 Nitro 그라데이션 + 그린 악센트, 바이올렛톤 블랙)로 리테마했고, 위계는 **오렌지=리드 · 퍼플=세컨더리 · 마젠타=그라데이션 전용 · 그린=희소 악센트**로 고정. 컬러 토큰은 `app/globals.css`(:root)와 `tailwind.config.ts`에서 중앙 관리. 워크플로우 문서는 v7(Claude×Codex×GLM)로 정렬됨 — 규칙 원본은 `docs/AGENT_WORKFLOW.md`, 상세 매뉴얼은 `docs/AI_Coding_Agent_Workflow_v7.md`. 주요 전환 = Kakao OpenChat. HYROX는 훈련 카테고리로만 사용. 미확정값은 전부 TODO.

## Known Issues
- 정확한 모임 요일/시간/장소/참가비 미확정 (TODO 표시)
- Kakao QR 이미지 미확정 (kakaoQrAvailable=false로 숨김)
- OG 이미지 미제작 (og-placeholder.png 경로, 실제 파일 없음 — 배포 전 제작 필요)
- metadataBase URL placeholder (실제 도메인 확정 시 교체)
- next 14.2.15 보안 취약점 (patched 버전 업그레이드 권장)
- 숨겨진 모바일 Sticky CTA 내부 link가 focusable 상태로 남음
- 320px Hero CTA 문구 wrapping polish 필요

## Escalation Rules (v7 0장 3단 사다리)
- 코드가 안 돌면 → GLM 자가수정 1~2회 → 안 되면 **Codex** (Claude 아님)
- 설계/아키텍처/보안/HYROX 규칙/컬러 위계 판단 → **Claude**
- 운영자 TODO 값·이미지 자산은 사람(운영자) 작업

## Do NOT
- HYROX 공식 로고/이미지 사용, "Official HYROX" 표현
- Don/Clinic/PT/의료 콘텐츠 포함
- 결제/로그인/RSVP 시스템 구현 (MVP 범위 밖)
- 실제 사용자 데이터 추가, 미확정값 임의로 채우기 (TODO 유지)
- magenta를 그라데이션 밖 단독 색상으로 사용 (위계 규칙)
- 시크릿/키/토큰 커밋 (v7 규칙 29)
