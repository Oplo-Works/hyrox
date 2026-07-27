# Handoff

## Identity

- Status: NEEDS_APPROVAL
- Task ID: scroll-workout-silhouettes (rev 7)
- Stage: WF:REVIEW
- Risk: Standard
- Updated At: 2026-07-27

## Context Summary

사용자 제공 8-station 참고 이미지의 동작 구도를 바탕으로 rev 6 라인 피겨를 채움형 오리지널
SVG 픽토그램으로 교체했다. SkiErg, Sled Push, Sled Pull, Burpee Broad Jump, Row,
Farmer's Carry, Sandbag Lunge, Wall Ball 8종 모두 넓은 어깨/좁은 허리의 면 몸통, 굵은
라운드 사지, 짧은 발, 장비 구도로 재작성했다. 장비는 인체 뒤 레이어로 이동했고 채움 면적
증가에 맞춰 screen opacity를 0.60에서 0.32로 낮추고 높이를 최대 54vh로 제한했다.

참고 이미지는 포즈 확인에만 사용했다. 원본 비트맵, 텍스트, 로고, 외부 SVG path는 저장소나
사이트에 포함하지 않았다.

## Ownership

- Outgoing Role / Runtime: Main Driver / Codex (user requested `gpt-5.6-sol`; exact active model not independently observable)
- Next Role: Human visual reviewer
- Next Runtime ID: Unassigned
- Next Action: `http://127.0.0.1:3012/`의 390px 미리보기에서 8종 스크롤 피규어 체감 확인
- Reason: build/lint/browser 검증은 완료됐고 production push 전 미관 승인만 남음

## Git and Worktree

- Branch / Worktree: `codex/scroll-pictograms-r7`
- Base HEAD: `abe1fa5`
- Implementation Base: `abe1fa5`
- Implementation Head: `313e853`
- Implementation Commits: `313e853` (`feat: refine workout station pictograms`)
- Verified Target: `313e853`
- Review Range: `abe1fa5..313e853`
- Handoff Metadata State: SELF — resolve with `git log -1`
- Worktree State: REPO_CLEAN after this metadata commit
- Preserved User Changes: none

## Publish

- Push Intent: NEEDS_APPROVAL
- Approved Target: none
- Expected Remote Head: N/A
- Last Reconciled Remote Head: `origin/main@abe1fa5`
- Push Result: NOT_ATTEMPTED
- Note: `main` push triggers Netlify production deploy and requires separate explicit approval

## Scope, Validation, and Decisions

- Approved Inputs: SPEC rev 7 + PLAN rev 7
- AC State: AC-15 PASS; AC-1/2/6~10/12 regression PASS; AC-5 actual emulation NOT_RUN (CSS unchanged)
- Evidence: `docs/features/scroll-workout-silhouettes/TEST_EVIDENCE.md` rev 7
- Build: PASS (`npm run build`, Next.js 14.2.15)
- Lint: PASS (`npm run lint`, warnings/errors 0)
- Browser: PASS (320/390px, overflow false, console warn/error 0, 10 scenes/20 frames, max 54vh)
- Image generation decision: imagegen skill routed this as an existing repo-native SVG/vector task, so direct
  SVG editing was used instead of generating or embedding raster assets
- Review: Independent read-only reviewer PASS after contrast/size/equipment/docs findings were addressed
- Human Decision: mobile visual acceptance pending

## Files

- `components/WorkoutSilhouettes.tsx`
- `app/globals.css`
- `docs/features/scroll-workout-silhouettes/SPEC.md`
- `docs/features/scroll-workout-silhouettes/PLAN.md`
- `docs/features/scroll-workout-silhouettes/TEST_EVIDENCE.md`
- `docs/HANDOFF.md`

## Risks and Blockers

- Open Findings: none from build/lint/browser checks
- Known Risk: filled pictogram aesthetics are subjective; Human should review all 8 scroll stations before push
- Blocker: none
- Approval Needed: visual acceptance and any push/main/deploy instruction
- Do NOT: HYROX official assets/wording, magenta standalone, Don/Clinic/PT/medical content,
  payment/login/RSVP, secrets
