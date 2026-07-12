# Development Log

> **v8.1.1-solo adoption note (2026-07-11):** Current project state is now owned by
> `docs/HANDOFF.md`. This log is append-only history. Everything below this note is
> **preserved v7-era history (byte-for-byte)** — the "Current Status" section below is
> historical and superseded by HANDOFF. New events are appended at the bottom using the
> v8.1.1 CLOSE event structure (`docs/workflow/CLOSE.md`). Do not rewrite old entries.

## Project

NY/NJ Hybrid Race Club Website (MVP v0.1)

## Current Status

- Current Feature: Manager 개별 스케줄 edit/delete/add 기능 (per-card edit, delete with confirm, add with password)
- Current Phase: MVP (feature addition + polish)
- Current Slice: Slice 7 완료 — Manager edit 기능 + 개별 edit/delete/add + EventCard edit button 겹침 수정
- Completed Slices: Slice 1~7 전체 + Manager edit 기능 + 개별 edit/delete/add + UI polish
- Remaining Work: 운영자 TODO 값 채우기, 실제 이미지/QR/OG 이미지 추가, Sticky CTA 접근성 polish, Next 보안 패치, 배포 결과 확인
- Active Branch: main
- Build Status: Passing (경고/에러 0)
- Test Status: Build 통과 (52.9kB/140kB)
- Git Remote: github.com/Oplo-Works/hyrox.git
- Latest Feature Commit: 297f35a (`feat: per-card edit/delete/add for upcoming goals`)
- Deployment: Netlify (GitHub repo 연결, main push 시 자동 배포)

## Current MVP Scope

- 모바일 우선 이중언어 랜딩 페이지 ✓
- Hero / Next Meetup / What We Train / Upcoming Events / All Levels / Join / FAQ / Footer / Sticky CTA ✓
- Kakao OpenChat 전환 (CTA 5곳: header, hero, meetup, events, final, footer, sticky) ✓
- 정적 데이터 설정 파일 ✓
- 메타데이터 + OG 태그 ✓
- 접근성 (시맨틱 HTML, h1 하나, reduced motion, aria-label) ✓

## Important Decisions

| Date | Decision | Reason |
|---|---|---|
| 2026-07-09 | Next.js App Router + TypeScript + Tailwind 채택 | 빌드 브리프 추천 스택, Vercel 배포 용이 |
| 2026-07-09 | Framer Motion 최소 사용 (Hero만) | 모바일 성능 우선 |
| 2026-07-09 | 영어/한국어 함께 노출 (전환기 없음) | MVP 단순성, 빌드 브리프 15장 |
| 2026-07-09 | TODO placeholder로 미확정값 처리 | 빌드 차단 방지, 빌드 브리프 23장 |
| 2026-07-09 | 수동 프로젝트 초기화 (create-next-app 대신) | 디렉토리명 "Hyrox Club"이 npm naming 규칙 위반 |
| 2026-07-09 | package name = nynj-hybrid-race-club | URL-friendly, 소문자, 하이픈 |
| 2026-07-09 | CTAButton에서 TODO 링크는 비활성 span 처리 | 깨진 링크 클릭 방지 |
| 2026-07-09 | metadataBase placeholder URL 설정 | OG 이미지 경로 해석 경고 제거 |
| 2026-07-09 | 네온 옐로 레이스 포인트 적용 | 참고 이미지의 블랙/화이트/옐로 대비를 사용하되, 공식 HYROX 로고·이미지·레이아웃은 사용하지 않음 |
| 2026-07-09 | 스크롤 기반 모션을 CSS + DOM 관찰로 구현 | React 재렌더링 없이 모바일 스크롤 방향·속도에 반응하도록 구성 |
| 2026-07-09 | 네온 옐로/라임 → Nitro 컬러웨이(오렌지→마젠타→퍼플)로 교체 | 운영자가 제시한 러닝화 미드솔 컬러 믹스 반영. magenta는 그라데이션 내부 전용, green은 희소 악센트로 위계 고정 |
| 2026-07-09 | 워크플로우 매뉴얼 v6 → v7 (Claude×Codex×GLM) 정렬 | z.ai→GLM 명칭 통일, Model Pin 개념, 커밋/시크릿 규칙(28·29) 반영 |
| 2026-07-10 | Manager 인라인 수정 기능: 6-digit client-side password gate + localStorage | admin 페이지 없이 homepage에서 바로 수정. 비밀번호는 client-side gate(보안 목적 아님), 데이터는 localStorage에 저장(브라우저별). 영구 반영은 data/site.ts 직접 수정 필요 |

## Completed Work

| Date | Work | Notes |
|---|---|---|
| 2026-07-09 | PRODUCT_BLUEPRINT.md 작성 | 빌드 브리프 기반 |
| 2026-07-09 | PROJECT_SCOPE.md 작성 | MVP 범위 정의 |
| 2026-07-09 | AGENT_WORKFLOW.md 작성 | 작업 규칙 + slice 계획 |
| 2026-07-09 | HANDOFF.md / README.md / CLAUDE.md / AGENTS.md 작성 | 워크플로우 문서화 |
| 2026-07-09 | Slice 1: 프로젝트 초기화 + data/site.ts + globals.css | package.json, tsconfig, tailwind, postcss, eslint configs |
| 2026-07-09 | Slice 2: 재사용 컴포넌트 4개 | CTAButton, SectionHeader, EventCard, TrainingCard |
| 2026-07-09 | Slice 3: Header + Hero | 스크롤 헤더, framer-motion 히어로 |
| 2026-07-09 | Slice 4: NextMeetup + TrainingTypes | 모임 정보 카드, 6개 훈련 카드 |
| 2026-07-09 | Slice 5: UpcomingEvents + AllLevelsWelcome | 4개 이벤트 카드, 3단계 레벨 카드 |
| 2026-07-09 | Slice 6: JoinOpenChat + FAQ + Footer + StickyCTA | 최종 전환, 아코디언 FAQ, 비공식 안내, 모바일 sticky |
| 2026-07-09 | Slice 7: 페이지 조립 + 메타데이터 + 빌드 테스트 | app/page.tsx, layout.tsx (폰트, OG, metadataBase) |
| 2026-07-09 | 빌드 경고 2개 수정 | img eslint-disable, metadataBase 추가 |
| 2026-07-09 | 최종 빌드 통과 | 경고 0, 에러 0, 정적 4페이지 생성 |
| 2026-07-09 | git init + commit cd34c0b + push to github.com:Oplo-Works/hyrox.git | main 브랜치, 36 files, 11584 insertions |
| 2026-07-09 | netlify.toml 추가 + commit 2da7cb5 + push | Netlify 자동 배포 트리거 |
| 2026-07-09 | Header 클럽명 폰트 크기 2배 확대 | text-base→text-2xl, text-lg→text-3xl (EN); text-[10px]→text-sm, text-xs→text-base (KO); 헤더 높이 h-16→h-20, h-20→h-24; Hero pt-16→pt-20, pt-20→pt-24 |
| 2026-07-09 | Codex 리뷰 수행 | build/lint 통과, npm audit 취약점 확인, OG 이미지 404 확인, 모바일 320/375/390 렌더링 및 접근성 이슈 확인 |
| 2026-07-09 | 모바일 스크롤 에너지 디자인 | `ScrollEnergy` 진행선/레인/스피드 라인, 섹션 reveal, Hero 대각선 레이스 라인, 옐로 CTA 및 포커스 링 추가 |
| 2026-07-09 | 인수인계 문서 정리 | 다른 PC/에이전트가 `main`에서 재개할 수 있도록 재현 절차, 파일 맵, 우선 작업을 `HANDOFF.md`에 갱신 |
| 2026-07-09 | Nitro 컬러웨이 리테마 (commit fc05aeb) | globals.css/tailwind.config 팔레트 교체, --gradient-nitro 도입, 9개 컴포넌트 갱신, FAQ 포커스 블로커 수정, WCAG AA 대비 보정. 4-렌즈 검증 워크플로우로 leftover 색상·대비·일관성·기술 회귀 점검 |
| 2026-07-09 | v7 워크플로우 문서 정렬 | v6→v7 매뉴얼 교체, CLAUDE.md/AGENTS.md/AGENT_WORKFLOW.md에 GLM 명칭·커밋·시크릿 규칙 반영, docs/handoff_history/ 생성 |
| 2026-07-10 | Manager 인라인 수정 기능 추가 | homepage에서 NextMeetup/UpcomingEvents 카드 우측 상단 연필 아이콘 → 6자리 비밀번호 모달 → 인라인 edit → 저장/취소. localStorage 기반 클라이언트 사이드 저장. EditableDataProvider/PasswordModal/ManagerEditButton 신규 컴포넌트, NextMeetup/EventCard/UpcomingEvents 클라이언트 컴포넌트로 전환 |
| 2026-07-10 | EventCard edit button 겹침 수정 | Upcoming Goals(EventCard) view mode에서 우측 상단 status 텍스트가 ManagerEditButton(연필 아이콘)과 겹치는 문제 수정. type/status 행에 `pr-11` 추가하여 edit button 영역 확보 |
| 2026-07-10 | Manager 개별 edit/delete/add 기능 추가 | (1) edit 버튼 하나 누르면 4개 스케줄이 한번에 edit 되던 문제 수정: 전역 `isEditing` boolean → per-target `editingId`('meetup'/'event-{i}')로 교체, 각 카드는 자기 editId만 edit. (2) EventCard edit mode에 삭제(X) 버튼 추가, 삭제 시 ConfirmModal로 한번 더 확인 후 삭제. (3) UpcomingEvents 섹션 우측 상단에 "+" 추가 버튼 추가, Manager 비밀번호 인증 후 새 스케줄 추가 및 edit mode 진입. EditableDataProvider에 addUpcomingEvent/deleteUpcomingEvent 추가. 신규 컴포넌트 ConfirmModal. ManagerEditButton/EventCard/NextMeetup/UpcomingEvents editingId 기반으로 리팩터 |

## Open Issues

| ID | Issue | Priority | Status |
|---|---|---|---|
| #001 | Kakao OpenChat URL 적용 완료 (https://open.kakao.com/o/gjuedrvi) | High | Resolved |
| #002 | Kakao QR 이미지 미확정 (kakaoQrAvailable=false) | Medium | Open |
| #003 | 정확한 모임 요일/시간/장소 미확정 (TODO) | High | Open |
| #004 | 참가비 미확정 (TODO) | Medium | Open |
| #005 | 실제 이벤트 날짜/링크 미확정 (TBD) | Medium | Open |
| #006 | Hero 이미지/비디오 미확정 (abstract background 사용 중) | Low | Open |
| #007 | OG 이미지 1200x630 미제작 (og-placeholder.png) | Medium | Open |
| #008 | metadataBase URL placeholder (실제 도메인 확정 시 교체) | Low | Open |
| #009 | next 14.2.15 보안 취약점 (patched 버전 업그레이드 권장) | Medium | Open |
| #010 | `/images/og-placeholder.png`가 실제 파일 없음 (로컬 요청 404) | Medium | Open |
| #011 | 숨겨진 모바일 Sticky CTA 안의 링크가 tab order에 남음 (`aria-hidden=true` 내부 focusable link) | Medium | Open |
| #012 | CTA 버튼 포커스 outline이 투명/약하게 계산되어 키보드 focus 표시가 충분하지 않음 | Medium | Resolved (옐로 focus ring) |
| #013 | 320px 모바일 첫 화면에서 Hero CTA가 아래로 밀리고, CTA 문구가 2줄로 갈라져 보임 | Low | Open |
| #014 | FAQ 아코디언 버튼 `focus:outline-none`이 전역 포커스 아웃라인을 덮어 키보드 포커스 표시 0 (WCAG 2.4.7) | High | Resolved (green ring-inset, commit fc05aeb) |
| #015 | 컬러 리테마 후 도메인 미확정 상태 유지, OG/QR 이미지 여전히 미제작 | Medium | Open |

## Build / Test Log

| Date | Command | Result | Notes |
|---|---|---|---|
| 2026-07-09 | npm install | Passed | 394 packages, 5 vulnerabilities (next 보안 업데이트 권장) |
| 2026-07-09 | npm run build (1차) | Passed | 경고 2개: img 요소, metadataBase 미설정 |
| 2026-07-09 | npm run build (2차) | Passed | 경고 0, 에러 0, 정적 4페이지, 46.6kB/134kB |
| 2026-07-09 | npm run build (Codex review) | Passed | 경고 0, 에러 0, 정적 4페이지, 46.6kB/134kB |
| 2026-07-09 | npm run lint | Passed | ESLint warnings/errors 0 |
| 2026-07-09 | npm audit --omit=dev | Failed | next critical + bundled postcss moderate 취약점 |
| 2026-07-09 | Mobile render check 320/375/390 | Passed with notes | 가로 overflow 없음, 콘솔 오류 없음, CTA wrapping/accessibility polish 필요 |
| 2026-07-09 | npm run lint | Passed | 모바일 스크롤 에너지 디자인 적용 후 ESLint warnings/errors 0 |
| 2026-07-09 | npm run build | Passed | 정적 4페이지, `/` First Load JS 134kB |
| 2026-07-09 | 390px scroll interaction check | Passed | down/up 방향 반응, 가로 overflow 없음, 콘솔 warnings/errors 0 |
| 2026-07-09 | npm run build (Nitro 리테마 후) | Passed | 경고 0, 에러 0, 정적 4페이지, `/` 47.3kB/134kB |
| 2026-07-09 | 라이브 DOM 컬러 검증 (dev server) | Passed | CTA 그라데이션·포커스 링·글로우·본문 색상 computed style 확인 |
| 2026-07-10 | npm run build (Manager edit 기능 추가 후) | Passed | 경고 0, 에러 0, 정적 4페이지, `/` 52.2kB/139kB |
| 2026-07-10 | npm run build (EventCard 겹침 수정 후) | Passed | 경고 0, 에러 0, 정적 4페이지, `/` 52.2kB/139kB |
| 2026-07-10 | npm run build (개별 edit/delete/add 기능 추가 후) | Passed | 경고 0, 에러 0, 정적 4페이지, `/` 52.9kB/140kB |

## Risks / Follow-Ups

| Date | Risk or Follow-Up | Owner | Status |
|---|---|---|---|
| 2026-07-09 | TODO 값들을 운영자가 채워야 함 | Owner | Open |
| 2026-07-09 | 실제 트레이닝/그룹 사진 확보 필요 | Owner | Open |
| 2026-07-09 | OG 이미지 1200x630 제작 필요 | Owner | Open |
| 2026-07-09 | next.js 보안 패치 버전으로 업그레이드 | Dev | Open |
| 2026-07-09 | 320px/375px/390px 모바일 수동 테스트 필요 | Dev | Reviewed by Codex; visual polish remains |
| 2026-07-09 | Claude /review 권장 (정확성·보안·일관성 검증) | Claude | Codex review completed; Claude optional for design/legal judgment |

## Next Steps

1. 운영자: `data/site.ts`의 TODO 값 채우기 (Kakao URL, 모임 정보, 참가비)
2. 운영자: 실제 QR 이미지, hero 이미지, OG 이미지 1200x630 제작
3. Dev: Next.js 보안 패치 버전으로 업그레이드 (`npm audit fix --force`는 breaking upgrade라 수동 검증 필요)
4. Dev: OG 이미지 파일 추가 또는 metadata 이미지 경로 제거
5. Dev: Sticky CTA 숨김 상태 focus 처리
6. Dev: 320px Hero CTA 문구/간격 polish
7. Claude: 필요 시 `/review` 실행 (브랜드/법적 판단 중심)
8. Netlify 배포 확인

---
<!-- Below this line: v8.1.1-solo CLOSE events (append-only). Above is preserved v7-era history. -->

## 2026-07-11T13:53:00Z — workflow-adoption-v8.1.1
- Stage: WF:CLOSE  - Role/Runtime: Main Driver / claude-main-opus (observed claude-opus-4-8)  - Risk: Standard
- Implementation: 2663a83..95e9253 (adoption artifact commit) + close metadata commit
- Review: docs/migration/V8.1.1_ADOPTION_REVIEW.md + PASS (independent subagent, ARTIFACT_READ_ONLY; P0/P1/P2=0, P3=1 addressed)
- Human Decision: N/A
- Summary: Adopted AI Coding Agent Workflow v8.1.1-solo from detected LEGACY_V7. Verified 25-file bundle; installed 19 workflow-owned files verbatim; reconciled CLAUDE.md/AGENTS.md/PROJECT_SCOPE/MODEL_RUNTIME_PIN/HANDOFF and preserved DEV_LOG; archived v6/v7 byte-for-byte; removed active v7 manual; SUPERSEDED pointer for docs/AGENT_WORKFLOW.md. No application source/test/dependency/deploy file changed.
- Validation: build PASS, lint PASS, package/markdown/regression/git-ownership/secret-scan all PASS (adoption report Validation table)
- Publish Intent/Target: AUTO_AT_CLOSE → origin/chore/adopt-workflow-v8.1.1 (protected main NOT pushed)
- Decisions / Risks / Follow-ups: MODEL_RUNTIME_PIN all CANDIDATE; PROJECT_SCOPE READY_FOR_APPROVAL. Human to approve PIN/SCOPE, set paid-use caps, confirm repo=Public, and decide on main-merge (deploy). P3 MANIFEST CRLF-hash note added.
- Next: DONE (adoption task) + Human owns approvals

## 2026-07-11T18:31:24Z — scroll-workout-silhouettes
- Stage: WF:CLOSE  - Role/Runtime: Main Driver / claude-deep-fable (observed claude-fable-5)  - Risk: Standard
- Implementation: bdaae28..f3b01ca (WorkoutSilhouettes.tsx 신규, ScrollEnergy.tsx 확장, globals.css, page.tsx)
- Review: Independent Reviewer Runtime 미승인(PIN 전항목 CANDIDATE) → Human이 데모 아티팩트로 직접 검토
- Human Decision: APPROVED (2026-07-11, "좋아. git push origin main" — 리뷰 승인 + main 반영/배포 승인)
- Summary: 스크롤 진행도(0-1)를 8구간으로 나눠 HYROX 레이스 순서대로 남(오렌지)/여(퍼플) 오리지널 픽토그램 SVG 실루엣이 종목을 수행하는 초저투명 배경 레이어 추가. 구간 앞 16%는 1km Run 브릿지. 2프레임 CSS 크로스페이드, 스크롤 중 0.9s/12% ↔ 정지 3s/5.5%, prefers-reduced-motion 숨김. 새 dependency 없음.
- Validation: docs/features/scroll-workout-silhouettes/TEST_EVIDENCE.md — build PASS(53.2kB/140kB), 스크롤 핸들러 전구간, 씬 매핑 9종, computed-style, 320/375/768/native 기하, console 0 error. Browser pane 컴포지터 정지로 모션 시각 확인만 데모 아티팩트로 Human이 수행.
- Publish Intent/Target: AUTO_AT_CLOSE + Human 명시 승인 → origin/main (ff-merge, Netlify prod deploy 유발) + origin/feat/scroll-workout-silhouettes
- Decisions / Risks / Follow-ups: 체감 속도/진하기는 --ws-swap·opacity CSS 변수로 조정 가능. Netlify 배포 결과 확인 필요.
- Next: DONE + Human (배포 확인)

## 2026-07-11T19:29:27Z — scroll-workout-silhouettes (rev 2 + rev 3)
- Stage: WF:CLOSE  - Role/Runtime: Main Driver / claude-deep-fable (observed claude-fable-5)  - Risk: Standard
- Implementation: 13ba737..72e546a (rev 2: 4a62808 단독 실루엣·중앙·확대·성별 교대 / rev 3: 72e546a 선명 모드)
- Review: Human 직접 검토 — 데모 아티팩트 rev별 갱신 (리뷰어 Runtime 미승인 지속)
- Human Decision: APPROVED (2026-07-11 "좋아. 스크롤중 역동 + 선명하게 배포해줘" — rev 2 리뷰 승인 + rev 3 요구·승인·배포 지시)
- Summary: rev 2 — 씬당 1명, viewBox "10 2 120 126" 재구성으로 인물이 모바일 뷰포트 ~43–52% 크기로 세로 중앙에 표시, 종목마다 성별 교대(짝수=남/오렌지, 홀수=여/퍼플, 브릿지는 다음 종목 성별). rev 3 — 정지/스크롤 구분 제거(항상 0.9s 역동), screen 블렌드 + opacity 0.6 선명 모드(100% 불투명은 가독성 요구와 충돌해 블렌드 채택; 밝은 텍스트 대비 ≥4.9:1 유지).
- Validation: TEST_EVIDENCE rev 2·rev 3 섹션 — build PASS(53.2kB), 씬 전수(1씬·1명, M/F 교대, 브릿지 성별 일치), 중심 오프셋 0/0, blend/opacity/swap computed 검사, console 0 error, 대비 산술 AA 충족
- Publish Intent/Target: AUTO_AT_CLOSE + Human 명시 승인 → origin/main (ff-merge, Netlify prod deploy 유발) + origin/feat/scroll-workout-silhouettes
- Decisions / Risks / Follow-ups: 어두운 글자 요소(CTA 버튼 라벨) 위 국소 대비 저하 가능 — 체감 확인 후 필요 시 opacity 조정. Netlify 배포 결과 확인 필요.
- Next: DONE + Human (배포·체감 확인)

## 2026-07-11T22:55:00Z — scroll-workout-silhouettes (rev 4)
- Stage: WF:CLOSE  - Role/Runtime: Main Driver / claude-main (observed claude-sonnet-5)  - Risk: Standard
- Implementation: ea331e0..6efd9ab (+ review packet c707d9a)
- Review: 2단 멀티에이전트 검증 + Human 데모 아티팩트 검토 — ① 3-렌즈 코드 검증(blocker 2: SVG path 캡-조인 문법 오류로 인한 조용한 절단 렌더, 관절 원 winding; should-fix 2 — 전부 수정) ② 씬별 시각 QA 워크플로우(5 에이전트 PNG 판독, 10/10 reads-as-athlete, findings 15건 전부 반영)
- Human Decision: APPROVED (2026-07-11 "main 에 push 해줘" — 데모 확인 후 배포 지시; rev 4 요구는 같은 날 "진짜 fit한 운동선수 같은 실루엣" + 레퍼런스 이미지 2장)
- Summary: 스틱 피겨 → 포토-트레이스 스타일 파라메트릭 근육 실루엣. 비대칭 근육(종아리 후면/quad 전면/이두·삼두), 두상 유닛(턱/후두/승모근), 운동화 발, 측면 토르소(가슴/등/둔근), 포니테일. QA 반영: RUN 대측 보행, Row 캐치 재포즈+지면 정렬(+20y), Lunge 딥 런지, SkiErg 머리 가림 해소, Sled Pull 손-로프 가시화, Wall Ball 볼 궤적, Burpee 무릎 회수. 씬/가시성/성별 교대/블렌드(rev 3)는 유지.
- Validation: TEST_EVIDENCE rev 4·4b 섹션 — build/lint PASS, 엄격 path 파서 195개 invalid 0, 20프레임 bbox PASS, 최종 그리드 스크린샷 확인, 데모 아티팩트 갱신(rev4b-photo-traced)
- Publish Intent/Target: AUTO_AT_CLOSE + Human 명시 승인 → origin/main (ff-merge, Netlify prod deploy 유발); feature 브랜치는 선행 push 완료
- Decisions / Risks / Follow-ups: 레퍼런스 스톡 이미지는 라이선스상 미사용(스타일 참조만, 전부 오리지널 기하). 체형·속도 조정은 LimbSpec/TORSO 상수·--ws-swap 한 줄. Netlify 배포 결과 확인 필요.
- Next: DONE + Human (배포·실기기 체감 확인)

## 2026-07-11T23:30:00Z — scroll-workout-silhouettes (rev 5)
- Stage: WF:CLOSE  - Role/Runtime: Main Driver / claude-main (observed claude-opus-4-8)  - Risk: Standard
- Implementation: 9657f91..98442ef (+ review packet bbcdf5e)
- Review: 5-에이전트 시각 QA(realism) + Human 데모 아티팩트 검토 — QA verdict "몸통이 실제 solid 인체로 읽힘", findings(목-어깨 접합) 13건 반영
- Human Decision: APPROVED (2026-07-11 "다좋아. git push origin main")
- Summary: rev 4 조립형(사지가 얇은 몸통에 점으로 pin-join) 느낌 제거 → 통합 인체 실루엣. 어깨 flare+허리+골반 토르소, 삼각근/골반 mass에서 사지 기원, headNeckPath 재작성(목<어깨 폭 + 승모근 flare로 "머리 꽂힌" 노치 제거). 포즈별 목 조정(SkiErg/Rowing/Sled Pull/Lunge). 씬/성별 교대/블렌드 유지.
- Validation: TEST_EVIDENCE rev 5 섹션 — build/lint PASS, 195 path 엄격 파서 invalid 0, 20프레임 bbox/NaN/console 0
- Publish Intent/Target: AUTO_AT_CLOSE + Human 명시 승인 → origin/main (ff-merge, Netlify prod deploy 유발); feature 브랜치 선행 push 완료
- Decisions / Risks / Follow-ups: 체형·목두께·머리크기·속도는 TORSO/LimbSpec/deltR/pelvR/headR/--ws-swap 상수로 즉시 조정. 포니테일은 화면 고정 방향(nice-to-have).
- Next: DONE + Human (배포·실기기 체감 확인)
