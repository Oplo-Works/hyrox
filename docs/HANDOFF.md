# Handoff

## Identity

- Status: NEEDS_APPROVAL
- Task ID: scroll-workout-silhouettes (rev 9 — 기능 철회)
- Stage: WF:CLOSE (push/deploy 승인 대기)
- Risk: Standard
- Updated At: 2026-07-27

## Context Summary

배경 인물 실루엣 레이어를 사이트에서 **완전히 제거**했다.

rev 1~8에 걸쳐 렌더링 방식을 여섯 번 교체했으나(스틱 → 근육 실루엣 → 통합 인체 →
라인 픽토그램 → 채움 픽토그램 → FK 리그 정지 픽토그램) Human 시각 승인에 도달하지 못했다.
rev 8 후반부에는 헤드리스 Chrome 렌더링으로 결과를 직접 확인하며 8종목을 다시 그리고
기구(SkiErg 플라이휠·썰매 원판·로워 레일/체인·케틀벨·샌드백·월볼 타깃)까지 넣었지만
사용자 판단은 여전히 미달이었고, 2026-07-27 "그냥 background 에 이미지를 빼자"로 철회 지시가 내려왔다.

제거 후에도 `ScrollEnergy`의 추상 장식(진행 바·레인·플래시)과 나머지 페이지는 그대로다.

## Ownership

- Outgoing Role / Runtime: Main Driver / Claude Code (observed claude-opus-5)
- Next Role: Human Approver
- Next Action: `main` 반영 여부 결정 — 라이브 사이트에서 rev 6 실루엣이 사라지는 변경이다
- Reason: build/lint/browser 검증 완료. push 자체와 Netlify 프로덕션 배포는 별도 승인 사항

## Git and Worktree

- Branch / Worktree: `codex/scroll-pictograms-r7`
- Base HEAD: `b245d02`
- Implementation Base: `b245d02`
- Implementation Head: SELF — resolve with `git log -1`
- Verified Target: implementation head
- Review Range: `b245d02..HEAD`
- Handoff Metadata State: SELF
- Worktree State: REPO_CLEAN after this commit
- Preserved User Changes: none

## Publish

- Push Intent: NEEDS_APPROVAL
- Approved Target: none
- Expected Remote Head: N/A
- Last Reconciled Remote Head: `origin/main@abe1fa5`
- Push Result: NOT_ATTEMPTED
- Note: 이 브랜치에는 rev 7 커밋(`313e853`, `b245d02`)도 포함되어 있다. `main`에 반영하면
  실루엣 레이어가 라이브에서 사라지고 Netlify 프로덕션 배포가 트리거된다 — 별도 승인 필요.

## Scope, Validation, and Decisions

- Approved Inputs: SPEC rev 9 + PLAN rev 9 (CANCELLED — 제거 슬라이스 S10만 실행)
- AC State: AC-1~AC-21 전부 N/A (검증 대상 기능 제거됨)
- Build: PASS (`npm run build`, Next.js 14.2.15)
- Lint: PASS (`npm run lint`, 0 warnings/errors)
- Browser: PASS (390px — 잔존 실루엣 마크업 0, `data-station`/`data-bridge` 제거 확인,
  가로 overflow 없음 `scrollWidth 390 == innerWidth 390`)
- 페이지 SSR HTML: 172KB → 62KB (실루엣 SVG 마크업 제거분)
- Human Decision: 제거 자체는 사용자 지시로 확정. push/deploy는 미승인

## Files

- `app/page.tsx` — 레이어 마운트 해제
- `app/globals.css` — `.workout-silhouettes` / `.ws-*` 블록 전체 삭제 (549 → 344줄)
- `components/ScrollEnergy.tsx` — 스테이션 매핑 제거
- `components/WorkoutSilhouettes.tsx` — **삭제**
- `docs/features/scroll-workout-silhouettes/SPEC.md`, `PLAN.md`
- `docs/HANDOFF.md`, `docs/DEV_LOG.md`

## Risks and Blockers

- Open Findings: 없음
- Known Risk: `main` 반영 시 라이브 사이트에서 배경 실루엣이 사라진다 (의도된 변경이나 프로덕션 영향)
- Blocker: 없음
- Approval Needed: push 및 `main` merge/push(= Netlify 프로덕션 배포)
- Do NOT: HYROX official assets/wording, magenta standalone, Don/Clinic/PT/medical content,
  payment/login/RSVP, secrets
