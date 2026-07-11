# Handoff

## Identity

- Status: READY_FOR_REVIEW
- Task ID: scroll-workout-silhouettes (rev 2)
- Stage: WF:TEST → WF:REVIEW boundary
- Risk: Standard
- Updated At: 2026-07-11T19:05Z

## Context Summary

rev 1(남녀 한 쌍, 하단 배치)은 2026-07-11 main 반영·배포 완료(13ba737). 직후 사용자가 rev 2를
요청·승인(Bundle R2): ① 씬당 실루엣 **한 명**, ② 인물 크기 모바일 뷰포트의 **약 40–55%**,
③ 화면 세로 **중앙** 배치, ④ 종목이 바뀔 때마다 **성별 교대**(짝수 스테이션=남/오렌지,
홀수=여/퍼플; 러닝 브릿지는 다음 종목과 동일 성별 — run-m/run-f 씬을 data-station 짝홀로 선택).
구현 4a62808: viewBox "10 2 120 126"로 재구성, 레이어 svg를 top 50% 중앙에 min(58vh,104vw,520px).
검증 PASS(TEST_EVIDENCE rev 2 섹션), 데모 아티팩트 같은 URL로 갱신. ScrollEnergy는 무변경.

## Ownership

- Outgoing Role / Runtime: Main Driver / claude-deep-fable (observed `claude-fable-5`, CANDIDATE)
- Next Role: Human (리뷰어 Runtime 미승인 상태 지속 — rev 1과 동일하게 Human이 데모로 직접 검토)
- Next Runtime ID: Unassigned
- Next Action: 갱신된 데모 아티팩트 확인 → 승인 시 WF:CLOSE (close metadata commit,
  브랜치 push) + main merge/push는 배포 유발이므로 별도 승인.
- Reason: Standard 리뷰 경계. 미관·크기 체감 판단은 Human 몫.

## Git and Worktree

- Branch / Worktree: `feat/scroll-workout-silhouettes` (rev 1은 main에 반영 완료; rev 2는 그 위에 진행)
- Implementation Base: 13ba737 (rev 2)
- Implementation Head: 4a62808 (rev 2)
- Implementation Commits: 4a62808 (rev 1: f3b01ca — 배포됨)
- Verified Target: 4a62808 (commit 직전 working tree 검증, 이후 코드 무변경)
- Review Range: 13ba737..4a62808
- Review Packet Metadata State: SELF — resolve via Git history (rev 1 packet: 16eae24)
- Review Artifact Metadata State: N/A (Human 직접 검토 예정)
- Close Metadata State: rev 1 close는 13ba737에 포함; rev 2 close는 미생성
- Worktree State: REPO_CLEAN (리뷰 패킷 커밋 후)
- Preserved User Changes: none

## Publish

- Push Intent: AUTO_AT_CLOSE (rev 2 — 아직 CLOSE 미도달, push 안 함)
- Approved Target: `origin/feat/scroll-workout-silhouettes` (standing policy).
  `origin/main`은 배포 유발 — rev 1 승인은 그 push에 한정, rev 2는 **재승인 필요**.
- Expected Remote Head: SELF — resolve close metadata commit (CLOSE 시)
- Last Reconciled Remote Head: origin/main@13ba737 = rev 1 close (2026-07-11 push VERIFIED)
- Push Result: NOT_ATTEMPTED (rev 2)

## Scope, Validation, and Decisions

- Approved Inputs: SPEC rev 2 + PLAN rev 2 (Bundle `scroll-workout-silhouettes-R2`, 2026-07-11 승인)
- AC State: AC-1~AC-8 PASS (rev 1) + rev 2 회귀/신규(AC-9, AC-10) 기계 검증 PASS — 시각 확인 Human 대기
- Evidence: docs/features/scroll-workout-silhouettes/TEST_EVIDENCE.md (rev 2 섹션)
- Review: 미시작 (rev 2) — rev 1은 Human APPROVED
- Human Decision: rev 2 PENDING

## Risks and Blockers

- Open Findings: none
- Known Risks:
  - 인물이 커지고 중앙에 오면서 텍스트와 겹치는 면적 증가 — 불투명도 12%/5.5% 유지라
    산술상 가독성 여유는 크지만, 체감 판단은 Human 몫 (데모/실기기).
  - Browser pane 환경 제약으로 모션 시각 확인은 데모 아티팩트/실기기 기반.
  - 체감 속도·진하기·크기는 CSS 변수/한 줄 조정으로 즉시 대응 가능.
- Blocker: None
- Approval Needed: rev 2 리뷰 승인; main merge/push(=Netlify 배포)는 별도 재승인
- Do NOT: HYROX 공식 로고/이미지·"Official HYROX" 워딩 금지; 마젠타 단독 사용 금지(그라데이션
  내부만); Don/Clinic/PT/의료 콘텐츠 금지; 결제/로그인/RSVP 금지(MVP 범위 밖); 시크릿 커밋 금지.
