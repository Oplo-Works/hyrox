# Development Log

## Project

NY/NJ Hybrid Race Club Website (MVP v0.1)

## Current Status

- Current Feature: MVP 랜딩 페이지 완성 + Codex 리뷰 완료
- Current Phase: MVP
- Current Slice: Slice 7 완료 — 모든 slice 완료
- Completed Slices: Slice 1~7 전체
- Remaining Work: 운영자 TODO 값 채우기, 실제 이미지/QR/OG 이미지 추가, 접근성/모바일 polish 수정, Next 보안 패치, Netlify 배포 확인
- Active Branch: main
- Build Status: Passing (경고/에러 0)
- Test Status: Build/lint 통과, 320px/375px/390px 모바일 렌더링 점검 완료, Netlify 자동 배포 확인 필요
- Git Remote: github.com:Oplo-Works/hyrox.git
- Latest Commit: 2da7cb5 (netlify.toml 추가)
- Deployment: Netlify (GitHub repo 연결, 자동 배포)

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
| #012 | CTA 버튼 포커스 outline이 투명/약하게 계산되어 키보드 focus 표시가 충분하지 않음 | Medium | Open |
| #013 | 320px 모바일 첫 화면에서 Hero CTA가 아래로 밀리고, CTA 문구가 2줄로 갈라져 보임 | Low | Open |

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
5. Dev: Sticky CTA 숨김 상태 focus 처리 및 CTA focus ring 수정
6. Dev: 320px Hero CTA 문구/간격 polish
7. Claude: 필요 시 `/review` 실행 (브랜드/법적 판단 중심)
8. Netlify 배포 확인
