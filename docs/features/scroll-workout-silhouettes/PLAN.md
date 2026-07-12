# PLAN: Scroll-Driven Workout Silhouette Background

- Feature ID: scroll-workout-silhouettes
- Risk: Standard
- Bundle ID: scroll-workout-silhouettes-R6
- PLAN Revision: 6
- SPEC: docs/features/scroll-workout-silhouettes/SPEC.md (rev 6, APPROVED)
- Status: DONE
- Base Branch/Commit: feat/scroll-workout-silhouettes-rev6 @ 6dd91ff (rev 1~5는 main 반영·배포 완료)

## Baseline

- Existing behavior: `ScrollEnergy.tsx`가 rAF 스로틀로 `--scroll-progress`(0~1),
  `--scroll-intensity`, `data-scrolling`, `data-scroll-direction`을 갱신. 장식은 라인·플래시뿐.
  `.scroll-energy`는 `position: fixed; z-index: 35; pointer-events: none` 오버레이.
- Existing failures: 없음 (main 기준 build PASS 이력, 작업 트리 clean).
- Commands: `npm run build` (required), `npm run lint` (권장), secret scan = staged diff 수동 확인.

## Design Notes (구현 방향)

- **레이어 방식**: 섹션 배경(`hero-bg` 등)이 불투명하므로 "콘텐츠 뒤" 배치는 보이지 않는다.
  기존 `.scroll-energy`와 동일하게 초저투명 fixed 오버레이(pointer-events: none)로 구현하되,
  불투명도를 매우 낮게(정지 ≤0.06 / 스크롤 ≤0.12) 유지해 가독성을 보장한다.
- **스테이션 산출**: `ScrollEnergy`의 기존 rAF 핸들러에서
  `station = clamp(floor(progress * 8), 0, 7)`을 계산해 `body[data-station]`으로 노출.
  구간 내 위치(0~1)도 `--station-progress`로 노출해 러닝 브릿지(구간 앞 ~18%)와
  종목 크로스페이드를 CSS만으로 처리.
- **실루엣**: 종목별 남/여 각 1포즈(총 16) + 러닝 남/여(2) = 18개의 오리지널 SVG path.
  각 피겨는 2~3개 서브그룹(팔/몸통/기구 등)으로 나눠 CSS transform keyframes로
  종목 특유의 동작(스키에르그 풀다운, 슬레드 푸시 왕복, 로잉 슬라이드, 월볼 스쿼트+볼 상승 등)을 반복.
- **상태 연동**: `body[data-scrolling="true"]`에서 불투명도·재생속도 상승,
  정지 시 느린 루프 + 저불투명(사용자 선택: "은은하게 계속").
- **색**: 남 실루엣 오렌지 틴트(주도), 여 실루엣 퍼플 틴트(보조). 마젠타는 사용하지 않거나
  그라데이션 내부에서만. 초록 미사용.
- **접근성/성능**: `aria-hidden="true"`, `prefers-reduced-motion`에서 레이어 숨김,
  비활성 스테이션 그룹은 `visibility: hidden` + `animation-play-state: paused`로 GPU 부하 제한.

## Slices

| Slice | User-visible goal | AC IDs | Expected paths | Data/API impact | Validation | Rollback | Status |
|---|---|---|---|---|---|---|---|
| S1 | 스크롤 진행에 따라 남녀 실루엣 쌍이 8종목을 레이스 순서로 수행하는 오버레이 표시 (크로스페이드 + 종목 모션 포함) | AC-1, AC-2, AC-6, AC-7, AC-8 | components/WorkoutSilhouettes.tsx (신규), components/ScrollEnergy.tsx, app/globals.css, app/page.tsx | 없음 | npm run build + browser(375px) 확인 | 신규 파일 삭제 + 3개 파일 diff revert | DONE |
| S2 | 스크롤 중/정지 상태 연출(역동↔은은), reduced-motion 숨김, 320/375/390/768/desktop 가독성·성능 QA | AC-3, AC-4, AC-5 | app/globals.css (미세 조정), components/WorkoutSilhouettes.tsx | 없음 | browser 5개 폭 + reduced-motion 에뮬레이션 + console 확인 | CSS 조정 revert | DONE (시각 확인 항목은 TEST_EVIDENCE의 환경 제약 참고) |
| S3 | (rev 2) 단독 실루엣으로 전환: 씬당 1명 + 종목별 성별 교대(브릿지 포함), viewBox 재구성으로 인물 확대(~50% 목표), 화면 세로 중앙 배치, 데모 아티팩트 갱신 | AC-9, AC-10 (+AC-1~8 회귀 유지) | components/WorkoutSilhouettes.tsx, app/globals.css | 없음 | npm run build + browser 기하/씬 매핑 검사 + 데모 재생성 | rev 1 커밋(f3b01ca 상태)으로 두 파일 revert | DONE |
| S4 | (rev 3) 선명 모드: screen 블렌드 + opacity 0.6, 항상 역동(0.9s 고정, 상태 구분 제거), 데모 갱신 후 main 배포 | AC-11, AC-12 | app/globals.css | 없음 | npm run build + browser CSS 검사 + 대비 산술 | globals.css 해당 블록 revert | DONE |
| S5 | (rev 4) 스틱 피겨 → 근육질 필드 실루엣: 파라메트릭 근육 아웃라인 생성기(스켈레톤 재사용, 테이퍼드 사지/토르소/주먹/발/포니테일), CSS를 stroke→fill로 전환, 데모 갱신 | AC-13 (+AC-1~12 회귀 유지) | components/WorkoutSilhouettes.tsx, app/globals.css | 없음 | npm run build + browser 기하 검증(씬별 bbox·접지) + 검증 워크플로우 + 데모 갱신 | 두 파일을 ea331e0 상태로 revert | DONE (rev 5 통합 인체 재구축 포함, 98442ef로 main 반영 — HANDOFF rev 5 참조) |
| S6 | (rev 6) 근육 실루엣 → 라인 픽토그램(레퍼런스 이미지 스타일): 렌더러를 라운드 스트로크 폴리라인 + 점 머리로 교체(HEAD_GAP 분리 보장, LINE_W SVG 속성 단일 원본), 근육 생성기·포니테일 제거, CSS fill→stroke 전환, 데모 아티팩트 신규 발행 | AC-14 (+AC-1~12 회귀 유지) | components/WorkoutSilhouettes.tsx, app/globals.css | 없음 | npm run build + npm run lint + browser 기하 검증(20프레임 head-gap·씬 셀렉터 매핑·computed style) + 데모 아티팩트 | 두 파일을 6dd91ff 상태로 revert | DONE |

## Dependencies / Assumptions

- 새 dependency 없음. CSS keyframes + 기존 rAF 패턴만 사용.
- `ScrollEnergy`가 이미 페이지에 마운트되어 있으므로 스크롤 추적 로직을 재사용/확장한다.
- 실루엣은 전부 이 작업에서 직접 작성하는 오리지널 SVG — 외부 asset 불사용.

## Non-Goals

- 섹션별 콘텐츠·레이아웃 변경, 새 인터랙션 요소, 데스크톱 전용 연출 분기.
- 공식 HYROX 브랜딩 모사. 종목 명칭 텍스트 표시(레이어는 순수 그래픽).
- Framer Motion 등 JS 애니메이션 라이브러리 도입.

## Approval Bundle

- Mode: STANDARD_BUNDLE
- Bundle ID: scroll-workout-silhouettes-R6
- SPEC Revision approved: 6
- PLAN Revision approved: 6
- Decision: APPROVED
- User message: 2026-07-11, "background 에 운동하는 figure 를 여기 첨부한 image 에 있는 figure 와
  똑같은 디자인으로 바꿔줘" + 레퍼런스 이미지 첨부 — rev 6 요구+승인 (배포는 데모 확인 후 별도 지시).
  (R4/R5: 2026-07-11 "실루엣이 너무 화장실 사인 figure 같아…" / "figure가 너무 엉성해…" — main 반영·배포 완료)
  (R3: 2026-07-11 "좋아. 스크롤중 역동 + 선명하게 배포해줘"; R2: 2026-07-11 "승인 — 구현 진행")
- Prior bundle R1: SPEC rev 1 + PLAN rev 1 — 2026-07-11 "승인 — 구현 진행"으로 승인,
  Human 리뷰 APPROVED 후 main 반영·배포 완료 (13ba737)
- Constraints / expiry: push는 `origin/feat/scroll-workout-silhouettes`까지만 (AUTO_AT_CLOSE).
  `main` merge/push는 Netlify prod deploy를 유발하므로 별도 승인 필요.
