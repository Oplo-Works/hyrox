# Handoff

## Current Owner
GLM (방금까지 작업) → Ready for next agent

## Start Here (Next Agent)
1. `git pull origin main` 후 `npm install` 실행
2. 작업 전 반드시 다음 순서로 읽기: `docs/HANDOFF.md` → `docs/AGENT_WORKFLOW.md` → `docs/DEV_LOG.md`의 Current Status → `docs/nynj-hybrid-race-club-build-brief.md`
3. 3-모델 워크플로우 상세는 `docs/AI_Coding_Agent_Workflow_v7.md` (GLM 생산 · Codex 실행 · Claude 판단)
4. 기본 검증: `npm run build` (필요 시 `npm run lint`)
5. 화면 확인이 필요하면 `npm run dev` 후 320/375/390px에서 컬러·가로 overflow·CTA·Sticky CTA·스크롤 모션 확인
6. 작업 종료 전 build/test → 커밋(+push) → `docs/DEV_LOG.md`·`docs/HANDOFF.md` 갱신(커밋 해시 포함), 이전 HANDOFF는 `docs/handoff_history/`로 이동

## Completed Work (이번 세션)
- **Manager 개별 edit/delete/add 기능 추가**:
  - (1) **개별 edit 수정**: 기존에 edit 버튼 하나 누르면 4개 스케줄이 한번에 edit 되던 문제 수정. 전역 `isEditing: boolean` → per-target `editingId: string | null`('meetup' / 'event-{i}')로 교체. 각 EventCard는 자기 `editId`(`event-{index}`)와 일치할 때만 edit mode 진입. NextMeetup은 'meetup' ID 사용. ManagerEditButton이 `editId` prop 받아 자기 타겟만 토글.
  - (2) **삭제 기능 + 확인 모달**: EventCard edit mode 우측 상단에 삭제(X) 버튼 추가. 삭제 클릭 시 `ConfirmModal` 노출 → "정말 이 스케줄을 삭제하시겠습니까?" 경고 → Confirm 버튼 눌러야만 실제 삭제(`deleteUpcomingEvent`). Cancel 시 모달 닫기.
  - (3) **추가 기능**: UpcomingEvents 섹션 우측 상단에 "+" 버튼 추가. Manager 비밀번호 인증(이미 인증된 경우 바로) 후 새 스케줄(TODO placeholder) 추가하고 해당 카드 edit mode로 진입.
  - `EditableDataProvider`에 `addUpcomingEvent` / `deleteUpcomingEvent` 추가, `editingId`/`setEditingId`로 전환.
  - 신규 컴포넌트: `ConfirmModal.tsx` (삭제 확인 경고 모달).
  - `ManagerEditButton.tsx`: `editId` prop 추가, per-target editing.
  - `EventCard.tsx`: per-card edit mode + 삭제 버튼 + ConfirmModal.
  - `NextMeetup.tsx`: `editingId === 'meetup'` 사용.
  - `UpcomingEvents.tsx`: "+" 추가 버튼 + PasswordModal.
  - 검증: `npm run build` 통과 (52.9kB/140kB, 경고 0, 에러 0)

## Current Stage
/build Slice 1~7 완료 → 컬러 리테마 적용 → Manager 인라인 수정 기능 → Manager 개별 edit/delete/add 기능 → polish/보안 패치 대기

## Next Owner
GLM 또는 Codex — 아래 polish/보안 이슈. 컬러/브랜드/법적 판단이 필요하면 Claude.

## Next Task
권장 순서:
1. 배포 결과 확인 (Netlify 대시보드에서 `main` 최신 커밋 배포 완료 여부)
2. Next.js 보안 패치 버전 업그레이드 및 재빌드 검증 (#009)
3. `/images/og-placeholder.png` 실제 파일 추가 또는 metadata 이미지 경로 제거 (#007, #010)
4. 모바일 Sticky CTA 숨김 상태에서 내부 link가 tab order에 남지 않도록 수정 (#011)
5. 320px Hero CTA 문구/간격 polish (#013)
6. Manager 개별 edit/delete/add 기능 모바일 테스트 (320/375/390px에서 PIN 입력, 개별 edit, 삭제 확인 모달, + 추가 동작 확인)
7. (선택) Manager edit 데이터를 서버에 영구 저장하는 기능 (현재는 localStorage로 브라우저별 저장)

## Reason For Handoff
Manager 개별 edit/delete/add 기능 구현 완료. 남은 작업은 보안 패치·이미지 자산·접근성 polish로 GLM/Codex가 담당.

## Priority
Medium (MVP 기능·컬러·Manager edit·개별 edit/delete/add 완료, 남은 것은 polish·보안·자산)

## Files Changed (이번 세션)
- components/EditableDataProvider.tsx (editingId 전환 + addUpcomingEvent/deleteUpcomingEvent)
- components/ManagerEditButton.tsx (editId prop, per-target editing)
- components/EventCard.tsx (per-card edit + 삭제 버튼 + ConfirmModal)
- components/NextMeetup.tsx (editingId === 'meetup')
- components/UpcomingEvents.tsx (+ 추가 버튼 + PasswordModal)
- components/ConfirmModal.tsx (신규 — 삭제 확인 경고 모달)
- docs/DEV_LOG.md, docs/HANDOFF.md

## Last Commit
- (이번 세션 커밋 예정)
- 이전: `ac6cd6d` — fix: EventCard status text overlap with manager edit button
- 이전: `e3c06b0` — feat: add manager inline edit feature with 6-digit password gate. 브랜치: `main`

## Files To Touch Next
- `data/site.ts` — `managerPassword` 값을 운영자가 자신의 6자리 코드로 변경
- `app/layout.tsx` — 실제 OG 이미지 추가 또는 경로 제거 시
- `components/StickyCTA.tsx` — 숨김 상태 focus 처리
- `package.json` — Next.js 보안 패치 업그레이드
- `app/globals.css` / `tailwind.config.ts` — 컬러 톁칰 조정 시

## Context Summary
NY/NJ Hybrid Race Club 모바일 우선 이중언어 랜딩 MVP. Next.js 14 App Router + TypeScript + Tailwind + Framer Motion(최소). Manager 인라인 수정 기능: homepage의 NextMeetup/UpcomingEvents 카드 우측 상단 연필 아이콘 → 6자리 비밀번호 모달 → 인라인 edit → 저장(localStorage). 이번 세션에 개별 edit/delete/add 기능 추가: (1) edit 버튼이 해당 스케줄만 edit(전역 토글 문제 수정), (2) edit mode에서 삭제 버튼 + 확인 모달, (3) 섹션 우측 상단 "+" 버튼으로 새 스케줄 추추(비밀번호 필요). 비밀번호는 `data/site.ts`의 `managerPassword`에서 관리(기본값 "450815"). 컬러는 Nitro 팔레트(오렌지→마젠타→퍼플). 주요 전환 = Kakao OpenChat. HYROX는 훈련 카테고리로만 사용. 미확정값은 전부 TODO.

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
- EventCard list key가 index 기반이라 중간 삭제 시 React key 재매핑 발생 (MVP 허용 범위, editData는 edit 진입 시 useEffect로 초기화되므로 실질적 문제 없음)

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