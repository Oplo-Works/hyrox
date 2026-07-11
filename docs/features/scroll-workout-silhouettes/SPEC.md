# SPEC: Scroll-Driven Workout Silhouette Background

- Feature ID: scroll-workout-silhouettes
- Risk: Standard
- Bundle ID: scroll-workout-silhouettes-R1
- SPEC Revision: 1
- Status: APPROVED
- Last Updated: 2026-07-11

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
| AC-1 | 스크롤 진행도 0→1에 따라 남녀 실루엣 한 쌍이 HYROX 레이스 순서 8종목을 차례로 수행하며, 위로 스크롤하면 역순으로 되돌아간다 | manual (browser, 375px) | Pending |
| AC-2 | 종목 구간 전환부에 러닝 실루엣 브릿지가 잠깐 표시된다 | manual (browser) | Pending |
| AC-3 | 실루엣 유효 불투명도는 스크롤 중 ≤ 0.12, 정지 시 ≤ 0.06 수준으로 본문 텍스트 가독성을 해치지 않는다 (320/375/768/desktop에서 확인) | manual (browser + CSS 검사) | Pending |
| AC-4 | 스크롤 중에는 종목 동작 애니메이션이 역동적으로 재생되고, 멈추면 옅어진 채 느린 루프를 유지한다 | manual (browser) | Pending |
| AC-5 | `prefers-reduced-motion: reduce`에서 실루엣 레이어가 표시되지 않는다 | manual (emulation) | Pending |
| AC-6 | 레이어는 `aria-hidden`·`pointer-events: none`이며 layout shift, 스크롤 성능 저하(jank), 콘솔 에러가 없다 | manual (browser + console) | Pending |
| AC-7 | HYROX 공식 로고/이미지/워딩 미사용, 신규 dependency 없음, `npm run build` PASS | build + diff review | Pending |
| AC-8 | 색상은 Nitro 위계 준수: 오렌지 주도 + 퍼플 보조 틴트, 마젠타는 그라데이션 내부에서만 사용 | diff review + browser | Pending |

## Approval

- Mode: STANDARD_BUNDLE_IN_PLAN
- Standard ledger: docs/features/scroll-workout-silhouettes/PLAN.md#approval-bundle
- High decision: N/A
- User message: 2026-07-11, "승인 — 구현 진행" (SPEC rev 1 + PLAN rev 1 번들 승인, AskUserQuestion 응답)
