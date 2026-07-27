# PLAN: Scroll-Driven Workout Silhouette Background

- Feature ID: scroll-workout-silhouettes
- Risk: Standard
- Bundle ID: scroll-workout-silhouettes-R9
- PLAN Revision: 9
- SPEC: docs/features/scroll-workout-silhouettes/SPEC.md (rev 9, CANCELLED)
- Status: CANCELLED — 기능 철회, 제거 슬라이스 S10만 실행
- Base Branch/Commit: codex/scroll-pictograms-r7 @ b245d02 (rev 1~6는 main 반영·배포 완료; rev 7은 이 브랜치에 local commit만)

## Baseline

- Existing behavior: `ScrollEnergy.tsx`가 rAF 스로틀로 `--scroll-progress`(0~1),
  `--scroll-intensity`, `data-scrolling`, `data-scroll-direction`을 갱신. 장식은 라인·플래시뿐.
  `.scroll-energy`는 `position: fixed; z-index: 35; pointer-events: none` 오버레이.
- Existing failures: 없음 (main 기준 build PASS 이력, 작업 트리 clean).
- Commands: `npm run build` (required), `npm run lint` (권장), secret scan = staged diff 수동 확인.

## Design Notes (구현 방향)

- **레이어 방식**: rev 1의 정지 ≤0.06/스크롤 ≤0.12 상태 구분은 rev 3에서 superseded.
  rev 7 현재값은 채움 면적을 보정한 fixed screen overlay opacity 0.32이며, 최대 높이는 54vh다.
- **스테이션 산출**: `ScrollEnergy`의 기존 rAF 핸들러에서
  `station = clamp(floor(progress * 8), 0, 7)`을 계산해 `body[data-station]`으로 노출.
  구간 내 위치(0~1)도 `--station-progress`로 노출해 러닝 브릿지(구간 앞 ~18%)와
  종목 크로스페이드를 CSS만으로 처리.
- **실루엣**: 종목별 남/여 각 1포즈(총 16) + 러닝 남/여(2) = 18개의 오리지널 SVG path.
  각 피겨는 2~3개 서브그룹(팔/몸통/기구 등)으로 나눠 CSS transform keyframes로
  종목 특유의 동작(스키에르그 풀다운, 슬레드 푸시 왕복, 로잉 슬라이드, 월볼 스쿼트+볼 상승 등)을 반복.
- **상태 연동**: rev 1의 스크롤/정지 속도 차등은 rev 3에서 superseded. 현재는 상태와 무관하게
  0.9s 2-frame 교차를 유지한다.
- **색**: 남 실루엣 오렌지 틴트(주도), 여 실루엣 퍼플 틴트(보조). 마젠타는 사용하지 않거나
  그라데이션 내부에서만. 초록 미사용.
- **접근성/성능**: `aria-hidden="true"`, `prefers-reduced-motion`에서 레이어 숨김.
  비활성 스테이션 그룹은 `visibility: hidden`; 별도 animation pause 규칙은 현재 없음.

## Design Notes — rev 8 (FK 리그 + 연속 보간 + 코너 앵커)

### 1. 데이터 모델: 절대 좌표 → FK(고정 뼈 길이 + 관절 각도)

현재 `Pose`는 관절의 **절대 좌표**를 손으로 찍은 값이라 프레임 간 뼈 길이가 보존되지 않는다
(SPEC rev 8 revision note의 실측치 참조). rev 8은 다음으로 교체한다.

```text
Skeleton (종목·프레임 무관 상수):
  torso, upperArm, foreArm, thigh, shin, foot, headR   — 길이 상수 1벌

Pose (프레임별 값 = 각도만):
  root: Pt                     — 골반 위치 (유일한 좌표 값)
  torsoA, headA                — 몸통·머리 각도
  armF/armB: [shoulderA, elbowA]
  legF/legB: [hipA, kneeA, ankleA]

solve(skeleton, pose) → 렌더용 관절 좌표
```

각도만 보간하고 길이는 상수이므로 **비율 붕괴가 수학적으로 불가능**하다 (AC-16).
`root` 하나만 좌표로 두어 전신 이동(전진·상하 바운스)을 표현한다.

### 2. 재생 모델: 2프레임 크로스페이드 → 연속 보간

- 종목당 키프레임 4~6개를 **각도**로 작성하고, 사이클 시작=끝으로 닫아 루프 이음매를 없앤다.
- 빌드 타임(서버 컴포넌트 렌더 시점)에 **N=16 샘플**로 FK를 풀어 좌표를 확정한다.
  샘플 시점은 균등이 아니라 **비대칭 이징**으로 배치한다 — 수축(당김/점프)은 촘촘하게(빠르게),
  신장(복귀)은 성기게(느리게). 체중 이동이 이징에서 나온다.
- 확정된 샘플을 SVG **SMIL `<animate>`** 의 `values`로 방출한다
  (`attributeName="d"` / `cx` / `cy`, `calcMode="linear"`, `repeatCount="indefinite"`).
  - 모든 포즈가 같은 path 커맨드 구조(`M L L`, `M Q L Q L Q Q Z`)를 생성하므로 `d` 보간이 안전하다.
  - N=16 선형 보간의 스텝당 각도 변화가 작아 뼈 길이 오차는 1% 미만으로 억제된다(AC-16 검증 대상).
  - **JS·hydration 0** — `WorkoutSilhouettes`는 서버 컴포넌트로 유지된다.
- 기존 `.ws-frame--a/b` opacity 크로스페이드와 `ws-bob` CSS 바운스는 제거한다
  (바운스는 FK `root`가 담당 — 이중 적용 방지).
- **Fallback**: SMIL 동작에 문제가 있으면 같은 샘플을 프레임 `<g>` N개로 방출하고
  `animation-delay: -k·(cycle/N)` + `steps` 방식으로 CSS 전환한다. 새 dependency는 어느 쪽도 없음.

### 3. 장비 거동 (보간과 결합 — 분리 불가)

크로스페이드에서는 안 보이던 A/B 좌표 차가 보간에서는 진동으로 드러난다. 같은 슬라이스에서 처리한다.

| 종목 | 현재 문제 | rev 8 처리 |
|---|---|---|
| Sled Push | 썰매 `x` 96→101→96 왕복 = 진동 | 사이클당 일정량 단조 전진, 사이클 경계에서 리셋하지 않음(또는 고정) |
| Sled Pull | 썰매 2px 왕복 | 로프 장력에 맞춘 단조 이동 |
| Wall Ball | 공이 가슴→머리 위 순간이동, 타깃에 안 닿음 | 손에서 타깃까지 포물선 궤적 + 낙하 복귀 |
| SkiErg | 케이블이 손 위치만 따라감 | 손 궤적을 따르는 연속 케이블 + 풀리 고정점 유지 |
| Row | 핸들·시트 개별 이동 | 시트·핸들·체인 동기 이동 |

### 4. 레이어 A — 코너 앵커

```text
현재:  fixed inset:0, 화면 중앙, height min(54vh,104vw,520px),
       opacity 0.32, mix-blend-mode: screen
rev 8: fixed 코너 앵커(하단 우측 기준, safe-area 고려),
       height ~30vh 상당, opacity 0.7~0.85, mix-blend-mode 제거
```

`mix-blend-mode` 제거로 실루엣 윤곽이 살아나므로 렌더 품질이 실제로 보이게 된다.
본문 텍스트와 겹치는 영역의 대비는 AC-19에서 산술 검증한다.

### 5. 렌더 문법 정리 (레퍼런스 일치)

- `.ws-limb--back { opacity: 0.72 }` **제거** — 레퍼런스는 단일 불투명 실루엣이다.
- 사지를 균일 stroke → **테이퍼드 채움 폴리곤**으로 (대퇴>하퇴, 상완>전완).
- 지면 접촉 타원 추가 — 지지발 착지 시 눌림. 무게감의 핵심.
- 색은 Nitro 위계 유지: 남=오렌지 주도, 여=퍼플 보조, 마젠타는 그라데이션 내부만.

### 6. 프로토타입 게이트

S8은 **SkiErg 1종목만** 최종 품질로 완성한다. 나머지 7종목과 러닝 브릿지는 S8 동안
레거시 `Pose` 렌더러로 임시 병존한다(신·구 렌더러 어댑터 분기). 시각적으로 일관되지 않은
중간 상태이며 이는 의도된 것이다 — S9에서 해소한다. S8 Human 승인 전에는 S9를 시작하지 않는다.

## Slices

| Slice | User-visible goal | AC IDs | Expected paths | Data/API impact | Validation | Rollback | Status |
|---|---|---|---|---|---|---|---|
| S1 | 스크롤 진행에 따라 남녀 실루엣 쌍이 8종목을 레이스 순서로 수행하는 오버레이 표시 (크로스페이드 + 종목 모션 포함) | AC-1, AC-2, AC-6, AC-7, AC-8 | components/WorkoutSilhouettes.tsx (신규), components/ScrollEnergy.tsx, app/globals.css, app/page.tsx | 없음 | npm run build + browser(375px) 확인 | 신규 파일 삭제 + 3개 파일 diff revert | DONE |
| S2 | 스크롤 중/정지 상태 연출(역동↔은은), reduced-motion 숨김, 320/375/390/768/desktop 가독성·성능 QA | AC-3, AC-4, AC-5 | app/globals.css (미세 조정), components/WorkoutSilhouettes.tsx | 없음 | browser 5개 폭 + reduced-motion 에뮬레이션 + console 확인 | CSS 조정 revert | DONE (시각 확인 항목은 TEST_EVIDENCE의 환경 제약 참고) |
| S3 | (rev 2) 단독 실루엣으로 전환: 씬당 1명 + 종목별 성별 교대(브릿지 포함), viewBox 재구성으로 인물 확대(~50% 목표), 화면 세로 중앙 배치, 데모 아티팩트 갱신 | AC-9, AC-10 (+AC-1~8 회귀 유지) | components/WorkoutSilhouettes.tsx, app/globals.css | 없음 | npm run build + browser 기하/씬 매핑 검사 + 데모 재생성 | rev 1 커밋(f3b01ca 상태)으로 두 파일 revert | DONE |
| S4 | (rev 3) 선명 모드: screen 블렌드 + opacity 0.6, 항상 역동(0.9s 고정, 상태 구분 제거), 데모 갱신 후 main 배포 | AC-11, AC-12 | app/globals.css | 없음 | npm run build + browser CSS 검사 + 대비 산술 | globals.css 해당 블록 revert | DONE |
| S5 | (rev 4) 스틱 피겨 → 근육질 필드 실루엣: 파라메트릭 근육 아웃라인 생성기(스켈레톤 재사용, 테이퍼드 사지/토르소/주먹/발/포니테일), CSS를 stroke→fill로 전환, 데모 갱신 | AC-13 (+AC-1~12 회귀 유지) | components/WorkoutSilhouettes.tsx, app/globals.css | 없음 | npm run build + browser 기하 검증(씬별 bbox·접지) + 검증 워크플로우 + 데모 갱신 | 두 파일을 ea331e0 상태로 revert | DONE (rev 5 통합 인체 재구축 포함, 98442ef로 main 반영 — HANDOFF rev 5 참조) |
| S6 | (rev 6) 근육 실루엣 → 라인 픽토그램(레퍼런스 이미지 스타일): 렌더러를 라운드 스트로크 폴리라인 + 점 머리로 교체(HEAD_GAP 분리 보장, LINE_W SVG 속성 단일 원본), 근육 생성기·포니테일 제거, CSS fill→stroke 전환, 데모 아티팩트 신규 발행 | AC-14 (+AC-1~12 회귀 유지) | components/WorkoutSilhouettes.tsx, app/globals.css | 없음 | npm run build + npm run lint + browser 기하 검증(20프레임 head-gap·씬 셀렉터 매핑·computed style) + 데모 아티팩트 | 두 파일을 6dd91ff 상태로 revert | DONE |
| S7 | (rev 7) 참고 이미지 8종 동작 구도 기반 채움형 오리지널 SVG: 면 몸통+굵은 사지+발, 대형 장비 뒤/휴대 장비 앞 레이어, Burpee/Sled Pull/Row/Lunge/Wall Ball 포즈 재작성, opacity 0.32·최대 54vh 가독성 보정 | AC-15 (+AC-1/2/6~10/12 회귀 유지; AC-5 실제 에뮬레이션 NOT_RUN) | components/WorkoutSilhouettes.tsx, app/globals.css | 없음 | npm run build + npm run lint + browser 320/390px + console/overflow 검사 | 두 파일을 abe1fa5 상태로 revert | DONE (기계 검증 PASS, 2026-07-27 Human 시각 거부 → rev 8로 대체) |
| S8 | (rev 8, **프로토타입 게이트**) FK 스켈레톤 리그 도입 + **SkiErg 1종목**을 최종 품질로 완성(각도 키프레임 4~6개, N=16 샘플 SMIL 연속 보간, 케이블 거동, 테이퍼드 사지, 접지 그림자) + 레이어 A 코너 앵커 전환. 나머지 7종목·러닝 브릿지는 레거시 렌더러로 임시 병존 | AC-16, AC-17, AC-18, AC-19, AC-20, AC-21 | components/WorkoutSilhouettes.tsx, app/globals.css | 없음 | npm run build + npm run lint + 기하 검증 스크립트(뼈 길이·연속성·장비 단조성) + browser 320/390px(overflow·console·computed style) + Human 시각 승인 | 두 파일을 b245d02 상태로 revert | DRAFT |
| S9 | (rev 8) S8 Human 승인 후: 나머지 7종목 + 러닝 브릿지를 같은 FK 공식으로 전환 | AC-16~AC-20 전 종목 | components/WorkoutSilhouettes.tsx, app/globals.css | 없음 | S8과 동일 검증 8종목 전수 | S8 상태로 revert | CANCELLED (rev 9 철회) |
| S10 | (rev 9) **배경 실루엣 레이어 제거.** `WorkoutSilhouettes` 컴포넌트 삭제, `app/page.tsx` 마운트 해제, `globals.css`의 `.workout-silhouettes`/`.ws-*` 블록 전체 삭제, `ScrollEnergy`의 스테이션 매핑(`data-station`/`data-bridge`, `STATION_COUNT`, `RUN_BRIDGE_RATIO`) 제거. 진행 바·레인·플래시는 유지 | N/A (기능 철회) | app/page.tsx, app/globals.css, components/ScrollEnergy.tsx, components/WorkoutSilhouettes.tsx(삭제) | 없음 | npm run build + npm run lint + browser(390px) 잔존 참조·가로 overflow·console 검사 | 해당 4개 파일을 b245d02 상태로 revert | DONE |

## Dependencies / Assumptions

- 새 dependency 없음. SMIL(`<animate>`)은 SVG 표준 기능으로 런타임/라이브러리 추가가 없다.
  Framer Motion은 이미 설치돼 있으나 이 기능에서는 사용하지 않는다(서버 컴포넌트 유지).
- `ScrollEnergy`가 이미 페이지에 마운트되어 있으므로 스크롤 추적 로직을 재사용/확장한다.
- 실루엣은 전부 이 작업에서 직접 작성하는 오리지널 SVG — 외부 asset 불사용.
- (rev 8) SMIL은 Chrome/Safari/Firefox 현행 버전에서 지원된다고 가정한다. S8 browser 검증에서
  실제 재생을 확인하고, 이상이 있으면 Design Notes §2의 CSS `steps` fallback으로 전환한다
  (같은 샘플 데이터를 재사용하므로 리그·키프레임 작업은 버려지지 않는다).
- (rev 8) 비활성 씬의 SMIL 타임라인은 계속 진행된다. S8에서 스크롤 성능·CPU를 측정하고
  문제가 있으면 fallback 경로(`animation-play-state: paused`)를 선택한다.

## Non-Goals

- 섹션별 콘텐츠·레이아웃 변경, 새 인터랙션 요소, 데스크톱 전용 연출 분기.
- 공식 HYROX 브랜딩 모사. 종목 명칭 텍스트 표시(레이어는 순수 그래픽).
- Framer Motion 등 JS 애니메이션 라이브러리 도입.
- (rev 8) 영상(MP4/WebM) 자산, 3D/모션캡처, Rive 등 외부 런타임 도입 — 32% 배경에서
  전체화면 8루프는 비용 대비 효과가 역전되며, 코너 앵커 전환 후에도 현재 요구에는 불필요하다.
  히어로 단일 영상 루프는 별도 feature로 분리 검토한다.
- (rev 8) `data/site.ts` 콘텐츠 변경, 섹션 구조 변경, 픽토그램의 섹션 콘텐츠 승격(C안).

## Approval Bundle

- Mode: STANDARD_BUNDLE
- Bundle ID: scroll-workout-silhouettes-R8
- SPEC Revision approved: 9 (철회 지시)
- PLAN Revision approved: 9 (철회 지시)
- Decision: CANCELLED
- Cancellation message: 2026-07-27, 사용자 "아직도 이상해. 그냥 background 에 이미지를 빼자"
  — 기능 철회 지시. CORE §2에 따라 task request는 작업을 좁히거나 취소할 수 있으므로
  별도 권한 확장 없이 제거를 수행했다. **단, `main` 반영은 라이브 사이트에서 rev 6
  실루엣이 사라지는 변경이고 Netlify 프로덕션 배포를 유발하므로 별도 승인이 필요하다.**
- Prior approval (rev 8, 실행 중 철회됨): 2026-07-27, 사용자 "승인" — SPEC rev 8 + PLAN rev 8 번들 승인, S8 착수.
- Constraints / expiry: local feature branch까지만. push 및 `main` merge/push는 Netlify
  production deploy를 유발하므로 별도 승인 필요. S9는 S8 Human 시각 승인 후에만 착수.
- User message (rev 8 요구 확정): 2026-07-27, "graphic 의 완성도가 너무 떨어져"
  + 8-station cheat sheet 이미지 재첨부 + "첨부한 이미지의 픽토그램과 같은 걸로 만들면 좋겠어.
  단 움직일때 그래픽이 깨지거나 불규칙하게 변하면 안되" + AskUserQuestion 응답
  ("A — 코너 앵커, 작고 선명" / "1종목 프로토타입 먼저").
- Prior bundle R7: SPEC rev 7 + PLAN rev 7 — APPROVED, 구현 완료(`313e853`),
  2026-07-27 Human 시각 검토 **거부** → SUPERSEDED by R8.
- User message (R7): 2026-07-27, "스크롤시 운동 라인이 있는데,
  첨부한 이미지의 8가지 운동 픽토그램을 따서 써줘봐" + 참고 이미지 첨부 — rev 7 요구+승인
  (push/배포는 별도 승인).
  2026-07-11, "background 에 운동하는 figure 를 여기 첨부한 image 에 있는 figure 와
  똑같은 디자인으로 바꿔줘" + 레퍼런스 이미지 첨부 — rev 6 요구+승인 (배포는 데모 확인 후 별도 지시).
  (R4/R5: 2026-07-11 "실루엣이 너무 화장실 사인 figure 같아…" / "figure가 너무 엉성해…" — main 반영·배포 완료)
  (R3: 2026-07-11 "좋아. 스크롤중 역동 + 선명하게 배포해줘"; R2: 2026-07-11 "승인 — 구현 진행")
- Prior bundle R1: SPEC rev 1 + PLAN rev 1 — 2026-07-11 "승인 — 구현 진행"으로 승인,
  Human 리뷰 APPROVED 후 main 반영·배포 완료 (13ba737)
- Constraints / expiry: rev 7은 local feature branch까지. push 및 `main` merge/push는 Netlify
  production deploy를 유발하므로 별도 승인 필요.
