# Test Evidence: scroll-workout-silhouettes

- Overall Result: PASS (rev 1~6 기계 검증 전 항목 PASS; rev 6 최종 미관 판단은 데모 아티팩트로 Human 수행)

## rev 6 (2026-07-11) — 근육 실루엣 → 라인 픽토그램 (AC-14)

- 사용자 레퍼런스 이미지(주간 트레이닝 플랜 그래픽의 머티리얼 심볼 스타일 운동 아이콘)에 맞춰
  렌더러 교체: 균일 두께 라운드 스트로크 폴리라인(팔 2, 다리 2, 몸통 1) + 분리된 점 머리.
  포즈·씬·성별 색 교대·기어·블렌드·0.9s 교차 유지. 포니테일·주먹·운동화·근육 생성기 제거.

| Timestamp UTC | Target | Command | Result | AC IDs | Notes |
|---|---|---|---|---|---|
| 2026-07-12T00:xxZ | working tree | `npm run build` | PASS | AC-7 | 경고/에러 0 (수정 전·후 2회) |
| 2026-07-12T00:xxZ | working tree | `npm run lint` | PASS | AC-7 | warnings/errors 0 |
| 2026-07-12T00:xxZ | dev server(:3000) | browser JS: computed style 검사 (stroke/fill/cap/두께/색) | PASS | AC-14, AC-8 | 남 오렌지 5.4px·여 퍼플 4.8px round cap, 머리 fill, ws-hair 0개, 씬 10/프레임 20/사지 80 |
| 2026-07-12T00:xxZ | dev server(:3000) | browser JS: 씬 셀렉터 매핑 전수 (station 0~7 + bridge 짝/홀) | PASS | AC-1, AC-2, AC-9 회귀 | 각 상태에서 정확히 해당 씬 1개만 매칭, 브릿지 run-m/run-f 교대 정상 |
| 2026-07-12T00:xxZ | dev server(:3000) | browser JS: 20프레임 head-torso gap 검증 | PASS | AC-14 | 초기 1건 겹침(SkiErg B, -1.29) → HEAD_GAP 로직 추가 후 전 프레임 최소 gap 1.15 |
| 2026-07-12T00:xxZ | 데모 아티팩트 | rev6-pictogram-demo 발행 (10씬 애니메이션) | PASS | AC-14 | Human 미관 검토용 — 사이트 렌더 SVG 그대로 추출 |
| 2026-07-12T00:xxZ | dev server(:3000) | 스크린샷/rAF 기반 검증 | NOT_RUN | — | Browser pane visibilityState=hidden으로 렌더러 프레임 정지(rAF·스크린샷 불가) — 환경 제약. 대체: 위 JS 기하·셀렉터 검증 + 데모 아티팩트 |

### rev 6 구현 노트

- 선 두께 원본을 컴포넌트 `LINE_W`(SVG 속성) 한 곳으로 통일 — CSS는 색·캡만 담당.
  머리-몸통 분리는 `HEAD_GAP` 상수로 보장(머리가 목에 가까운 포즈에서만 몸통 시작점을
  골반 쪽으로 필요한 만큼 inset).
- AC-3~5(가독성 블렌드·reduced-motion)·AC-10(크기/배치)은 CSS 미변경으로 회귀 영향 없음.
- 레퍼런스 아이콘(구글 머티리얼 심볼)은 스타일 문법만 참조 — path 복제 없음, 자산 전부 오리지널.

## rev 5 (2026-07-11) — 통합 인체 실루엣 (조립형 → 실제 사람 형태)

- 사용자 피드백 "figure가 너무 엉성해 → 실제 사람 모양의 실루엣". 근본 원인: 사지가 얇은 몸통에
  점(point)으로 pin-join되어 "조립형"으로 읽힘. 재구축: 어깨 flare+허리+골반 토르소, 삼각근/골반
  덩어리에서 사지 기원, headNeckPath 재작성(목<어깨 폭, 승모근 flare로 노치 제거).

| Timestamp UTC | Target | Command | Result | AC IDs | Notes |
|---|---|---|---|---|---|
| 2026-07-11T23:xxZ | working tree | `npm run build` | PASS | AC-7 | 경고/에러 0 |
| 2026-07-11T23:xxZ | dev server(:3000) | browser JS: 20프레임 bbox + NaN + console error | PASS | AC-13 | 20/20 viewBox 내, NaN 0, console error 0 |
| 2026-07-11T23:xxZ | node | 엄격 SVG path 파서 195개 | PASS | AC-13 | invalid 0 |
| 2026-07-11T23:xxZ | headless Chrome | 10씬×2프레임 그리드(review8/9) + 4씬 확대(zoom5/6) | PASS | AC-13 | 통합 몸통·어깨·골반, 목-승모근 접합 확인 |
| 2026-07-11T23:xxZ | 데모 아티팩트 | rev5-real-human-form 갱신 | PASS | AC-13 | Human 미관 검토용 |

### rev 5 시각 QA 워크플로우 (5 에이전트, PNG 판독)

- realism verdict: 재구축 후 "몸통이 실제 solid 인체로 읽힘" — 남은 유일한 조립형 tell = **목·어깨
  접합부**(nape/throat 노치, 직립 포즈에서 목이 승모근에 삼켜짐). findings 13건 반영:
  headNeckPath 재작성으로 노치 제거 + 목 taper 보장; 포즈별 목 길이 조정(SkiErg A 머리를 팔
  밖으로, Rowing B 목 길이 확보, Sled Pull B 머리 기울기 완화, Lunge 목 단축).
- 재검증: build PASS, 195 path invalid 0, 20프레임 bbox/NaN/console 0.
- Implementation Base: bdaae284e5ae75a4679baf07e5a7c7f9164a9ccd (rev 1) / 13ba737 (rev 2) / ea331e0 (rev 4)
- Implementation Head: f3b01ca (rev 1) / 4a62808 (rev 2) / 72e546a (rev 3) / rev 4는 커밋 예정 working tree
- Verified Target: 각 rev의 implementation commit (commit 직전 working tree 검증, 이후 파일 무변경)
- Environment: Windows 11 Pro, Node v24.18.0, Next.js 14.2.15 (dev server + production build), Claude Code Browser pane (headless) + headless Chrome 스크린샷

## rev 4 (2026-07-11) — 스틱 피겨 → 근육질 필드 실루엣 (AC-13)

| Timestamp UTC | Target | Command | CWD | Exit | Duration | Result | AC IDs | Notes |
|---|---|---|---|---:|---:|---|---|---|
| 2026-07-11T20:1xZ | working tree | `npm run build` | repo root | 0 | ~40s | PASS | AC-7 | 경고 0, 에러 0 |
| 2026-07-11T20:1xZ | working tree | `npm run lint` | repo root | 0 | ~10s | PASS | AC-7 | warnings/errors 0 |
| 2026-07-11T20:0xZ | dev server (:50171) | browser JS: 20프레임 전수 getBBox + NaN 검사 | localhost | — | — | PASS | AC-13 | 20/20 프레임 viewBox 내, path NaN 0건, path 195개 |
| 2026-07-11T20:1xZ | headless Chrome | 10씬×2프레임 정지 렌더 스크린샷(review4.png) + 4씬 확대(zoom2.png) | scratchpad | 0 | — | PASS | AC-13 | 근육 실루엣 시각 확인 — 러너 팔각도/무릎/발, 런지 샌드백-머리 분리, 월볼 아웃라인 볼. 굽힘 자기교차·스파이크 결함 수정 확인 |
| 2026-07-11T20:2xZ | 데모 아티팩트 | 10씬 애니메이션 데모 발행 (rev4-muscular-athletes) | claude.ai | — | — | PASS | AC-13 | Human 시각 리뷰용 — 0.9s 교차 + bob 포함 |

### rev 4 구현·검증 노트

- 렌더러: 스켈레톤(기존 포즈 데이터 유지) → 파라메트릭 근육 아웃라인. 사지 = 캡슐 세그먼트 2개 +
  관절 원(굽힘 자기교차 원천 차단), 토르소 = 측면 폭 프로필 샘플링(가슴/등/둔근), 목 캡슐, 주먹 원,
  정강이-수직 발 캡슐, 여성 포니테일 필드 쉐입. 체형은 ARM_W/LEG_W/TORSO_W 상수로만 조정.
- 반복 시각 검증 4회 왕복 (headless Chrome 정지-프레임): ① 필드 전환 확인 → ② 폭 슬리밍 →
  ③ 굽힘 자기교차/발끝 스파이크 제거(캡슐 분리 방식 전환) + 런지 머리-백 분리 →
  ④ 런지 팔 하어핀 스파이크 제거 + 주먹 확대. 포즈 조정: RUN 앞팔, LUNGE 팔/머리, WALLBALL 볼 위치.
- AC-1~12 회귀: 씬 라벨/가시성 셀렉터/색 위계/블렌드(screen+0.6)/0.9s 교차 미변경 — 별도 3-렌즈
  검증 워크플로우로 확인 (code / css-contract / regression).
- **검증 워크플로우 findings 및 수정 (전부 해결)**:
  - Blocker ①: segOutline capB 조인이 끝점을 중복 출력 → 모든 하단 캡슐/목/발의 d 문자열이
    SVG 문법 오류 (브라우저가 오류 지점에서 파싱 중단 — 이전 스크린샷은 오류-복구 렌더였음).
    수정: 조인은 제어점까지만 출력. Blocker ②: torsoPath 크로치 조인 동일 결함 — 동일 수정.
  - Should-fix ①: circleSub(관절 원)의 sweep 방향이 캡슐과 반대 → nonzero fill에서 관절 구멍.
    수정: sweep 1→0. Should-fix ②: 로잉 frame b 발 방향 후방 플립(프레임 간 148° 회전).
    수정: +x 강제(수직 경계 -y 우선) — row b 발이 풋플레이트 위 toes-up으로 정상화.
  - 수정 후 재검증: 엄격 문법 파서로 195개 path 전수 검사 invalid 0건, 20프레임 bbox 재확인
    이슈 0건, 정지-프레임 스크린샷(review5.png)으로 관절/둔근/발 렌더 확인, build 재통과.
    데모 아티팩트 동일 URL로 갱신 (label: rev4-fixed-geometry).

### rev 4b (같은 날) — 포토-트레이스 스타일 상향 + 씬별 시각 QA 워크플로우

- 사용자 레퍼런스 이미지(사진 트레이싱 스타일 피트니스 실루엣) 반영: 렌더러를 비대칭 근육
  프로필(LimbSpec: 종아리 후면/정강이 직선, quad 전면, 이두/삼두), 두상 유닛(이마/턱/후두/
  목덜미/승모근), 운동화 발(힐컵/밑창/토박스)로 상향. 레퍼런스 스톡 자산은 미사용(라이선스) —
  스타일 목표로만 참조, 전부 오리지널 기하 생성.
- **씬별 시각 QA 워크플로우** (5 에이전트 × 2씬, 각자 headless Chrome 렌더 + PNG 판독):
  verdict = 10/10 씬 "reads-as-athlete YES". findings 15건 (should-fix 7, nice 8) 전부 반영:
  RUN 대측 보행 스왑+뒷팔 굽힘 / SkiErg A 머리 가림 해소 / Sled Pull B 손-로프 가시화+슬레드
  용접 / Burpee B 무릎 회수 / Row A 캐치 압축 재포즈 + **씬 전체 +20y 지면 정렬** + B 핸들
  몸쪽 / Lunge A 딥 런지 재포즈 / Wall Ball B 팔-얼굴 분리+볼 궤적 / 포니테일 루트 겹침.
- 재검증: build PASS, 엄격 path 파서 195개 invalid 0건, 20프레임 bbox 이슈 0건,
  최종 그리드 스크린샷(review7.png)으로 전 씬 시각 확인. 데모 아티팩트 갱신
  (label: rev4b-photo-traced).

## rev 3 (2026-07-11) — 선명 모드 (screen 블렌드) · 항상 역동

| Timestamp UTC | Target | Command | CWD | Exit | Duration | Result | AC IDs | Notes |
|---|---|---|---|---:|---:|---|---|---|
| 2026-07-11T19:2xZ | working tree | `npm run build` | repo root | 0 | ~40s | PASS | AC-7 | 53.2kB 유지 |
| 2026-07-11T19:2xZ | dev server | browser JS: computed CSS 검사 | localhost:3000 | — | — | PASS | AC-11, AC-12 | mix-blend-mode:screen, opacity 0.6 고정(정지/스크롤 동일), --ws-swap 0.9s 고정 |
| 2026-07-11T19:2xZ | dev server | console error 검사 | localhost:3000 | — | — | PASS | AC-6 | 에러 0건 |
| 2026-07-11T19:2xZ | 산술 | 본문 텍스트 대비 계산 | — | — | — | PASS | AC-11 | 0.6×오렌지 screen 블렌드 위 밝은 텍스트(#f2f1ec) 대비 ≈ 4.9:1 (AA 4.5:1 충족); 퍼플은 더 여유 |

## rev 2 (2026-07-11) — 단독 실루엣 · 중앙 확대 · 성별 교대

| Timestamp UTC | Target | Command | CWD | Exit | Duration | Result | AC IDs | Notes |
|---|---|---|---|---:|---:|---|---|---|
| 2026-07-11T18:5xZ | working tree | `npm run build` | repo root | 0 | ~40s | PASS | AC-7 | 53.2kB 유지 (SVG가 쌍→단독으로 절반) |
| 2026-07-11T19:0xZ | dev server | browser JS: 씬 전수 검사 (station 0–7 × bridge on/off) | localhost:3000 | — | — | PASS | AC-1, AC-2, AC-9 | 항상 1씬·1명만 표시; s0~s7 = M,F,M,F,M,F,M,F; 브릿지 run-m/run-f가 다음 종목 성별과 일치 |
| 2026-07-11T19:0xZ | dev server | browser JS: 기하 검사 (375×812) | localhost:3000 | — | — | PASS | AC-10 | svg 중심 오프셋 x=0/y=0 (정중앙), 인물 높이 350px = 뷰포트 43% (667px 폰 기준 ~52%) |
| 2026-07-11T19:0xZ | dev server | console error + overflow 검사 | localhost:3000 | — | — | PASS | AC-6 | 에러 0건, scrollWidth==vw, layer opacity 0.055 유지 |

## rev 1 (2026-07-11) — 최초 구현 (남녀 한 쌍, 하단 배치; rev 2로 대체됨)

| Timestamp UTC | Target | Command | CWD | Exit | Duration | Result | AC IDs | Notes |
|---|---|---|---|---:|---:|---|---|---|
| 2026-07-11T17:2xZ | working tree | `npm run build` | repo root | 0 | ~40s | PASS | AC-7 | 타입체크+린트 포함, / 53.2kB (기존 52.9kB) |
| 2026-07-11T17:5xZ | dev server | browser JS: 스테이션 0–7 + bridge 전환 검사 | localhost:3000 | — | — | PASS | AC-1, AC-2 | body[data-station]/[data-bridge] 조합별로 정확히 해당 씬 1개만 visible |
| 2026-07-11T17:5xZ | dev server | browser JS: rAF 동기 패치 후 실제 스크롤 핸들러 구동 | localhost:3000 | — | — | PASS | AC-1, AC-2 | ↓0.13→s1(bridge) 0.27→s2 … 0.93/1.0→s7; ↑0.62→s4 0.51→s4(bridge) 0.02→s0(bridge); 방향 감지 정상 |
| 2026-07-11T17:5xZ | dev server | browser JS: computed style 검사 | localhost:3000 | — | — | PASS | AC-3, AC-4, AC-8 | layer opacity 0.055(정지)/0.12(스크롤 중), --ws-swap 3s/0.9s, 남 rgb(255,139,30)/여 rgb(164,92,235) |
| 2026-07-11T18:0xZ | dev server | browser JS: 320/375/768/native 폭 기하 검사 | localhost:3000 | — | — | PASS | AC-3, AC-6 | 가로 오버플로 없음(scrollWidth==vw), svg 하단 배치, 640px 캡 중앙 정렬 |
| 2026-07-11T17:5xZ | dev server | console error 검사 | localhost:3000 | — | — | PASS | AC-6 | 콘솔 에러 0건 |

## Manual Checks

- Result: PASS (기계 검증 범위)
- Steps/evidence:
  - AC-5 (reduced motion): `@media (prefers-reduced-motion: reduce) { .workout-silhouettes { display:none } }` 규칙이 CSSOM에 존재함을 확인. OS 레벨 미디어 에뮬레이션은 이 브라우저 pane에서 불가 → 규칙 검사로 갈음.
  - AC-3 (가독성): 최악 케이스 산술 — 본문 #f2f1ec 위에 오렌지 12% 오버레이 시에도 배경 대비 ≈ 12:1 이상 유지 (WCAG AA 4.5:1 여유 충족).
  - AC-6: aria-hidden="true", pointer-events:none, z-index 30 (scroll-energy 35 / StickyCTA 40 / Header 50 아래) 확인.
  - AC-7/AC-8: diff 검토 — 신규 dependency 없음, HYROX 공식 자산/워딩 없음, 마젠타는 svg 그라데이션(defs) 내부에만 존재.
- Missing tool/environment: **Browser pane의 컴포지터/애니메이션 타임라인 정지** (document.timeline 미진행, rAF 미발화, 스크린샷 timeout). 이 때문에 "움직이는 모습"의 시각적 미관(실루엣 아트 품질, 크로스페이드 체감)은 여기서 눈으로 확인 불가. CSS/DOM 상태 기반으로 전 메커니즘을 검증했고, 시각 확인용 데모 아티팩트를 Human에게 제공.

## Skipped / Flaky / Blocked

- 시각적 미관 확인(스크린샷): BLOCKED — pane 컴포지터 정지. 대체 증거: computed-style 전수 검사 + Human용 데모 아티팩트. 재개 조건: 실기기/일반 브라우저에서 확인.
- `npm run lint` 단독 실행: SKIPPED_WITH_REASON — `next build`가 lint+typecheck를 포함하며 PASS (PROJECT_SCOPE상 build만 필수).

## Residual Risk

- 실루엣 포즈의 미적 완성도는 기계 검증 불가 — Human 리뷰에서 데모 아티팩트로 판단 필요.
- 프레임 교차(0.9s) 속도감은 실기기 체감에 따라 CSS 변수(`--ws-swap`) 한 줄로 조정 가능.
