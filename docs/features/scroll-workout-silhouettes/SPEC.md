# SPEC: Scroll-Driven Workout Silhouette Background

- Feature ID: scroll-workout-silhouettes
- Risk: Standard
- Bundle ID: scroll-workout-silhouettes-R6
- SPEC Revision: 6
- Status: APPROVED
- Last Updated: 2026-07-11
- Revision note (rev 6, 사용자 요청 "background 에 운동하는 figure 를 여기 첨부한 image 에 있는
  figure 와 똑같은 디자인으로 바꿔줘" — 첨부: 주간 트레이닝 플랜 그래픽, 머티리얼 심볼 운동
  아이콘 스타일 오렌지 라인 픽토그램): rev 5의 필드 근육 실루엣 렌더링을 **라인 픽토그램**으로
  교체 — ① 사지·몸통 = 균일 두께 라운드 스트로크(cap/join round, 남 5.4/여 4.8, 컴포넌트
  LINE_W가 SVG 속성으로 지정), ② 머리 = 몸통에서 분리된 채워진 점(HEAD_GAP 로직으로 전
  프레임 간격 보장), ③ 손·발·근육·포니테일 디테일 제거(레퍼런스는 유니섹스 — 성별 교대는
  색 + 미세 선 두께로만 표현). 스켈레톤 포즈 데이터·씬 구성·성별 색 교대·기어·블렌드·0.9s
  교차는 전부 유지. 레퍼런스 이미지의 아이콘 자체(구글 머티리얼 심볼)는 복제하지 않고 스타일
  문법만 적용 — 자산은 전부 오리지널. 신규 AC-14.
- Revision note (rev 4, 사용자 요청 "실루엣이 너무 화장실 사인 figure 같아. 진짜 fit한 운동선수
  같은 figure 실루엣으로"): 스틱 피겨(선 스트로크 + 원 머리) 렌더링을 **필드(filled) 근육질
  애슬리트 실루엣**으로 교체 — 올림픽 픽토그램 스타일. 2프레임 교차·씬 전환·성별 교대·색
  위계·블렌드 모드(rev 3)는 전부 유지. 렌더링 레이어를 파라메트릭 근육 아웃라인 생성기
  (테이퍼드 사지: 삼각근/이두/전완, 대퇴/종아리; 측면 토르소: 가슴/등/둔근; 주먹·발·포니테일)로
  교체하고, 스켈레톤 포즈 데이터는 유지하되 **두꺼워진 체형에 맞춰 3개 씬 미세 좌표 조정**
  (RUN 앞팔, LUNGE 머리/팔/샌드백 y, WALLBALL 팔/볼 — 볼은 ws-fill→ws-gear 아웃라인).
  신규 AC-13.
- Revision note (rev 4b, 사용자 레퍼런스 이미지 2장 제공 — 사진 트레이싱 스타일 피트니스 실루엣):
  픽토그램 수준을 넘어 **포토-트레이스 스타일**로 상향: ① 사지 근육을 **비대칭 프로필**로
  (종아리=후면 볼록/정강이 직선, 대퇴=전면 quad, 이두/삼두 구분), ② 원형 머리 →
  **두상 유닛**(이마/턱/후두/목덜미/승모근 라인), ③ 발 캡슐 → **운동화 형태**(힐컵/밑창/토박스).
  레퍼런스 스톡 이미지 자체는 라이선스상 사용 불가 — 스타일 목표로만 참조, 자산은 전부 오리지널.
- Revision note (rev 5, 사용자 "figure가 너무 엉성해. 실제 사람 모양의 실루엣으로"): 조립형
  느낌을 제거하기 위해 **통합 인체 실루엣**으로 재구축. ① 토르소에 **어깨 flare + 허리 + 골반**
  윤곽 추가(옆모습 실제 상체), ② 사지가 목/골반 점이 아니라 **삼각근·골반 덩어리**에서 뻗도록
  (어깨/골반 mass union), ③ `headNeckPath` 재작성 — 목을 어깨보다 가늘게(throat/nape 노치
  보장) + 승모근이 어깨 폭까지 오목하게 flare해 "머리가 꽂힌" 노치 제거. 5-에이전트 시각 QA로
  접합부 검증. 좌표계·씬·성별 교대·블렌드는 유지. AC-13은 rev 5 기준으로 재평가.
- Revision note (rev 2, 사용자 요청 4건): ① 남녀 한 쌍 → **한 명**으로, ② 크기를 모바일 화면의
  **약 50%** 로 확대, ③ 하단 → **화면 세로 중앙** 배치, ④ 종목이 바뀔 때마다 **성별도 교대**
  (SkiErg=남 시작, 이후 남↔여 교대; 러닝 브릿지는 다음 종목의 선수와 동일 성별).
  색 유지: 남=오렌지, 여=퍼플.
- Revision note (rev 3, 사용자 요청 "스크롤중 역동 + 선명하게 배포"): 정지/스크롤 상태 구분을
  없애고 **항상 역동**(0.9s 교차), 표시를 **선명 모드**로 — 단 100% 불투명 오버레이는 본문
  가독성 요구와 충돌하므로 **screen 블렌드 + 60% 불투명**으로 구현 (어두운 배경에선 선명,
  밝은 텍스트는 유지, 대비 ≥ 4.9:1). AC-3·AC-4는 rev 3에서 SUPERSEDED → AC-11·AC-12로 대체.

## Context / User / Goal

- Context: 랜딩 페이지의 에너지를 높이기 위해, 스크롤할 때 배경에서 남/여 그림자 실루엣이
  HYROX 8개 스테이션을 역동적으로 수행하는 장식 레이어를 추가한다. 사용자가 2026-07-11 채팅에서
  직접 요청했고, 연출 3항목(레이스 순서 진행 / 남녀 한 쌍 / 정지 시 은은하게 지속)을 선택했다.
- User: 모바일 중심의 사이트 방문자 (전체 방문자에게 보이지만 모바일 UX 우선).
- Goal: 스크롤 진행에 따라 페이지 전체가 "한 편의 레이스"처럼 느껴지게 하되,
  본문 가독성과 성능을 절대 해치지 않는다.
- Current behavior: `ScrollEnergy`가 진행 바·레인·플래시 등 추상적 라인 장식만 표시.
  실루엣/인물 요소 없음.
- Desired behavior: 스크롤 진행도(0→1)를 8구간으로 나눠, 실제 HYROX 레이스 순서
  (SkiErg → Sled Push → Sled Pull → Burpee Broad Jumps → Rowing → Farmer's Carry →
  Sandbag Lunges → Wall Balls)대로 남녀 실루엣 한 쌍이 해당 종목을 수행하는 모습이
  초저투명 오버레이로 표시된다. 구간 전환부에는 러닝 실루엣(1 km Run 브릿지)이 잠깐 나타난다.
  스크롤 중에는 더 뚜렷하고 역동적으로, 멈추면 아주 옅어지며 느린 루프 모션을 유지한다.

## In Scope / Out of Scope

- In:
  - 신규 클라이언트 컴포넌트 `components/WorkoutSilhouettes.tsx` (직접 그린 오리지널 SVG 실루엣 16종 + 러닝 브릿지)
  - `components/ScrollEnergy.tsx` 확장: 스크롤 진행도 → 활성 스테이션 인덱스(`data-station`) 산출
  - `app/globals.css`: 실루엣 레이어 스타일, 크로스페이드, 종목별 모션 keyframes, 상태(스크롤 중/정지) 연동
  - `app/page.tsx`: 레이어 마운트
- Out:
  - 새 dependency (Framer Motion 추가 사용 포함 — CSS 애니메이션만 사용)
  - 이미지/래스터 asset 추가, 외부 아이콘/실루엣 라이브러리
  - `data/site.ts` 콘텐츠 변경, 섹션 구조/레이아웃 변경
  - 데스크톱 전용 별도 연출 (동일 레이어가 반응형으로 동작)

## Affected Areas

- Screens/flows: 랜딩 페이지 전체 배경(장식 레이어). 기존 6대 must-preserve flow 불변.
- Data/models: 없음.
- APIs/integrations: 없음.
- Roles/permissions: 없음.

## Security · Privacy · Data

- Data class: Public (장식용 SVG 코드만).
- Retention/provider constraints: 해당 없음.
- Risks and required approvals: HYROX 공식 로고/이미지 사용 금지(PROJECT_SCOPE §8) —
  모든 실루엣은 직접 그린 제네릭 애슬리트 오리지널 SVG. 공식 브랜드 자산 미사용.

## Edge Cases / Failure Behavior

- `prefers-reduced-motion: reduce` → 실루엣 레이어 완전 숨김(장식이므로 손실 없음).
- JS 미실행/실패 → `data-station` 미설정 → 레이어가 표시되지 않거나 첫 스테이션만
  정적 표시. 콘텐츠에는 영향 없음.
- 320px 초소형 화면 → 실루엣이 본문 중앙 텍스트를 가리지 않도록 하단/가장자리 배치 유지.
- 빠른 연속 스크롤 → rAF 스로틀(기존 ScrollEnergy 패턴) 유지, 프레임당 1회만 갱신.
- 매우 긴/짧은 페이지 → 진행도 기반 8등분이므로 콘텐츠 양과 무관하게 동작.

## Acceptance Criteria

| ID | Observable criterion | Verification | Status |
|---|---|---|---|
| AC-1 | 스크롤 진행도 0→1에 따라 남녀 실루엣 한 쌍이 HYROX 레이스 순서 8종목을 차례로 수행하며, 위로 스크롤하면 역순으로 되돌아간다 | manual (browser, 375px) | PASS |
| AC-2 | 종목 구간 전환부에 러닝 실루엣 브릿지가 잠깐 표시된다 | manual (browser) | PASS |
| AC-3 | 실루엣 유효 불투명도는 스크롤 중 ≤ 0.12, 정지 시 ≤ 0.06 수준으로 본문 텍스트 가독성을 해치지 않는다 (320/375/768/desktop에서 확인) | manual (browser + CSS 검사) | PASS |
| AC-4 | 스크롤 중에는 종목 동작 애니메이션이 역동적으로 재생되고, 멈추면 옅어진 채 느린 루프를 유지한다 | manual (browser) | PASS |
| AC-5 | `prefers-reduced-motion: reduce`에서 실루엣 레이어가 표시되지 않는다 | manual (emulation) | PASS |
| AC-6 | 레이어는 `aria-hidden`·`pointer-events: none`이며 layout shift, 스크롤 성능 저하(jank), 콘솔 에러가 없다 | manual (browser + console) | PASS |
| AC-7 | HYROX 공식 로고/이미지/워딩 미사용, 신규 dependency 없음, `npm run build` PASS | build + diff review | PASS |
| AC-8 | 색상은 Nitro 위계 준수: 오렌지 주도 + 퍼플 보조 틴트, 마젠타는 그라데이션 내부에서만 사용 | diff review + browser | PASS |
| AC-9 | (rev 2) 씬마다 실루엣은 **한 명**이며, 종목이 바뀔 때마다 성별이 남↔여 교대한다 (SkiErg=남 시작; 브릿지는 다음 종목과 동일 성별) | manual (browser) | PASS |
| AC-10 | (rev 2) 실루엣이 모바일 화면 세로 **중앙**에 위치하고, 인물 높이가 뷰포트의 **약 40–55%** (목표 ~50%)를 차지한다 | manual (browser, 375px) | PASS |
| AC-11 | (rev 3, AC-3 대체) 레이어는 `mix-blend-mode: screen` + opacity 0.6 — 어두운 배경에서 선명하게 보이되 밝은 본문 텍스트 대비 ≥ 4.5:1 유지 | CSS 검사 + 대비 산술 | Pending |
| AC-12 | (rev 3, AC-4 대체) 정지/스크롤 구분 없이 항상 역동적으로 재생 (`--ws-swap` 0.9s 고정) | CSS 검사 | Pending |
| AC-13 | (rev 4) 실루엣이 스틱 피겨가 아닌 **근육질 필드 실루엣**으로 렌더링된다: 테이퍼드 사지(어깨/이두·대퇴/종아리 볼륨), 측면 토르소(가슴·등·둔근 윤곽), 주먹·발 형상 포함. 씬 구성·성별 교대·색·블렌드는 rev 2~3과 동일 유지 | manual (demo + browser) + 기하 검증 | SUPERSEDED (rev 6, AC-14로 대체) |
| AC-14 | (rev 6) 피겨가 레퍼런스 이미지의 **라인 픽토그램 스타일**로 렌더링된다: 균일 두께 라운드 스트로크 사지·몸통 + 몸통과 분리된 점 머리(전 20프레임 gap > 0), 손·발·근육·머리카락 디테일 없음. 씬 구성·성별 색 교대·기어·블렌드·0.9s 교차는 유지 | 기하 검증(JS) + CSS 검사 + 데모 아티팩트 Human 검토 | Pending |

## Approval

- Mode: STANDARD_BUNDLE_IN_PLAN
- Standard ledger: docs/features/scroll-workout-silhouettes/PLAN.md#approval-bundle
- High decision: N/A
- User message: 2026-07-11, "승인 — 구현 진행" (rev 1 번들); 2026-07-11, "승인 — 구현 진행" (rev 2 번들, AskUserQuestion 응답); 2026-07-11, "좋아. 스크롤중 역동 + 선명하게 배포해줘" (rev 3 — 요구+승인+배포 지시 동시); 2026-07-11, "실루엣이 너무 화장실 사인 figure 같아. 진짜 fit한 운동선수와 같은 figure 실루엣으로 만들어줘" (rev 4 — 요구+승인; 배포는 데모 확인 후 별도); 2026-07-11, "background 에 운동하는 figure 를 여기 첨부한 image 에 있는 figure 와 똑같은 디자인으로 바꿔줘" + 레퍼런스 이미지 첨부 (rev 6 — 요구+승인; 배포는 데모 확인 후 별도)
