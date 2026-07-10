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
- **Manager 인라인 수정 기능 추가**: admin 페이지 없이 homepage에서 바로 스케쥴 수정 가능
  - NextMeetup 카드와 UpcomingEvents 각 EventCard 우측 상단에 연필 아이콘 버튼 추가
  - 버튼 클릭 시 6자리 비밀번호 모달(PIN 입력 UI) 오픈
  - 비밀번호 인증 성공 시 인라인 edit mode 진입 (모든 필드 EN/KO 편집 가능: when, where, format, level, fee, 준비물, event type/name/date/location/status/link/note)
  - 저장 시 localStorage에 저장, 취소 시 원복
  - `EditableDataProvider` (React Context)로 데이터 관리, `sessionStorage`로 인증 상태 유지
  - 신규 컴포넌트: `EditableDataProvider.tsx`, `PasswordModal.tsx`, `ManagerEditButton.tsx`
  - 기존 컴포넌트 클라이언트 전환: `NextMeetup.tsx`, `EventCard.tsx`, `UpcomingEvents.tsx`
  - `app/page.tsx`에 `EditableDataProvider` 래핑
  - `data/site.ts`에 `managerPassword` 필드 추가 (기본값 "258080", 배포 전 변경 권장)
  - 검증: `npm run build` 통과 (52.2kB/139kB, 경고 0, 에러 0)

## Current Stage
/build Slice 1~7 완료 → 컬러 리테마 적용 → Manager 인라인 수정 기능 추가 → polish/보안 패치 대기

## Next Owner
GLM 또는 Codex — 아래 polish/보안 이슈. 컬러/브랜드/법적 판단이 필요하면 Claude.

## Next Task
권장 순서:
1. 배포 결과 확인 (Netlify 대시보드에서 `main` 최신 커밋 배포 완료 여부)
2. Next.js 보안 패치 버전 업그레이드 및 재빌드 검증 (#009)
3. `/images/og-placeholder.png` 실제 파일 추가 또는 metadata 이미지 경로 제거 (#007, #010)
4. 모바일 Sticky CTA 숨김 상태에서 내부 link가 tab order에 남지 않도록 수정 (#011)
5. 320px Hero CTA 문구/간격 polish (#013)
6. Manager edit 기능 모바일 테스트 (320/375/390px에서 PIN 입력 및 edit mode 동작 확인)
7. (선택) Manager edit 데이터를 서버에 영구 저장하는 기능 (현재는 localStorage로 브라우저별 저장)

## Reason For Handoff
Manager edit 기능 구현 완료. 남은 작업은 보안 패치·이미지 자산·접근성 polish로 GLM/Codex가 담당.

## Priority
Medium (MVP 기능·컬러·Manager edit 완료, 남은 것은 polish·보안·자산)

## Files Changed (이번 세션)
- data/site.ts (managerPassword 필드 추가)
- components/EditableDataProvider.tsx (신규)
- components/PasswordModal.tsx (신규)
- components/ManagerEditButton.tsx (신규)
- components/NextMeetup.tsx (클라이언트 전환 + edit mode)
- components/EventCard.tsx (클라이언트 전환 + edit mode)
- components/UpcomingEvents.tsx (클라이언트 전환 + editable data 사용)
- app/page.tsx (EditableDataProvider 래핑)
- docs/DEV_LOG.md, docs/HANDOFF.md

## Last Commit
- `e3c06b0` — feat: add manager inline edit feature with 6-digit password gate
- 이전: `fc05aeb` — feat: apply Nitro shoe colorway. 브랜치: `main`

## Files To Touch Next
- `data/site.ts` — `managerPassword` 값을 운영자가 자신의 6자리 코드로 변경
- `app/layout.tsx` — 실제 OG 이미지 추가 또는 경로 제거 시
- `components/StickyCTA.tsx` — 숨김 상태 focus 처리
- `package.json` — Next.js 보안 패치 업그레이드
- `app/globals.css` / `tailwind.config.ts` — 컬러 토큰 조정 시

## Context Summary
NY/NJ Hybrid Race Club 모바일 우선 이중언어 랜딩 MVP. Next.js 14 App Router + TypeScript + Tailwind + Framer Motion(최소). 이번 세션에 Manager 인라인 수정 기능을 추가: homepage의 NextMeetup/UpcomingEvents 카드 우측 상단 연필 아이콘 → 6자리 비밀번호 모달 → 인라인 edit → 저장(localStorage). 비밀번호는 `data/site.ts`의 `managerPassword`에서 관리(기본값 "258080"). 컬러는 Nitro 팔레트(오렌지→마젠타→퍼플). 주요 전환 = Kakao OpenChat. HYROX는 훈련 카테고리로만 사용. 미확정값은 전부 TODO.

## Known Issues
- Manager edit 비밀번호가 client-side에 노출됨 (보안 목적 아님, casual gate only)
- Manager edit 데이터가 localStorage에 저장되어 브라우저별로만 적용됨 (영구 반영은 data/site.ts 직접 수정 필요)
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