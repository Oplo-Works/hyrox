# Test Evidence: scroll-workout-silhouettes

- Overall Result: PASS (rev 1·rev 2 기계 검증 전 항목 PASS; 시각적 미관 확인은 데모 아티팩트로 Human 수행)
- Implementation Base: bdaae284e5ae75a4679baf07e5a7c7f9164a9ccd (rev 1) / 13ba737 (rev 2)
- Implementation Head: f3b01ca (rev 1) / 4a62808 (rev 2)
- Verified Target: 각 rev의 implementation commit (commit 직전 working tree 검증, 이후 파일 무변경)
- Environment: Windows 11 Pro, Node v24.18.0, Next.js 14.2.15 (dev server + production build), Claude Code Browser pane (headless)

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
