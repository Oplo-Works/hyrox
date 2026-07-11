# Handoff

## Identity

- Status: DONE
- Task ID: workflow-adoption-v8.1.1
- Stage: WF:CLOSE
- Risk: Standard
- Updated At: 2026-07-11T14:20Z

## Context Summary

이 저장소는 LEGACY_V7 → **v8.1.1-solo** 워크플로우 채택을 완료했다(독립 리뷰 **PASS**, P0/P1/P2=0).
채택과 별개로 `origin/main`에는 다른 세션이 이미 완성·빌드·푸시한 **Manager 인라인 edit/delete/add
기능**(6자리 client-side password gate, localStorage 저장, `EditableDataProvider`/`PasswordModal`/
`ManagerEditButton`/`ConfirmModal` 신규 컴포넌트)이 10개 커밋으로 들어와 있었다. 이 커밋으로 그
기능을 v8.1.1 워크플로우 브랜치에 merge하여 `main`에 반영한다 — **워크플로우 문서(governance)와
애플리케이션 기능(manager edit) 양쪽 모두 이미 완료·검증된 작업을 하나로 합치는 것**이며, 새 기능을
새로 구현하는 것이 아니다. 활성 워크플로우 권위는 v8.1.1-solo 하나뿐(`docs/AGENT_WORKFLOW_CORE.md` +
`docs/workflow/`)이며, v6/v7은 `docs/archive/workflow/`에 스냅숏으로만 존재한다.

## Ownership

- Outgoing Role / Runtime: Main Driver / claude-main-opus (observed `claude-opus-4-8`, CANDIDATE)
- Next Role: Human
- Next Runtime ID: Unassigned
- Next Action: (1) `docs/MODEL_RUNTIME_PIN.md` 승인, (2) 유료-use cap 설정, (3) `docs/PROJECT_SCOPE.md`를 APPROVED로, (4) `managerPassword`를 실제 코드로 변경(`data/site.ts`), (5) Manager edit 기능 모바일 테스트(320/375/390px).
- Reason: 남은 항목은 계정·구독 권한 및 운영자 데이터 결정으로 agent가 대신 결정할 수 없다.

## Git and Worktree

- Branch / Worktree: `chore/adopt-workflow-v8.1.1` → merge target `main` (사용자가 이 세션에서 merge+push 승인)
- Base HEAD (workflow adoption): 2663a83e3096e4a67c798793858216780b0097ed
- Merged-in tip (manager-edit feature, already on origin/main): 9660225a48aa0496d246a1749689caef9c38e9b8
- Implementation Head: SELF — resolve via Git history (merge commit reconciling both branches)
- Implementation Commits: `95e9253`, `45a1a2c`, `2c8f64e` (workflow adoption) + merge commit + `main` fast-forward
- Verified Target: merge commit (post build/lint re-verification)
- Review Range: 2663a83..95e9253 (workflow adoption only; already reviewed PASS — see below)
- Review Packet Metadata State: SELF — resolve via Git history
- Review Artifact Metadata State: SELF — resolve via Git history (V8.1.1_ADOPTION_REVIEW.md, prior commit)
- Close Metadata State: SELF — resolve via Git history
- Worktree State: TASK_DIRTY_ONLY → REPO_CLEAN after merge commit
- Preserved User Changes: none

## Publish

- Push Intent: AUTO_AT_CLOSE (user explicitly approved merge-to-main + push in this session)
- Approved Target: `origin/main` (protected; deploy-triggering — approved this turn) and `origin/chore/adopt-workflow-v8.1.1`
- Expected Remote Head: SELF — resolve merge/fast-forward commit on main
- Last Reconciled Remote Head: 9660225 (origin/main tip prior to this merge)
- Push Result: NOT_ATTEMPTED (recorded after push; see chat Output Block)

## Scope, Validation, and Decisions

- Approved Inputs: v8.1.1 adoption prompt (workflow governance); manager-edit feature was independently completed/pushed by a prior session (not part of this task's SPEC)
- AC State: workflow-adoption deliverables all PASS (see `docs/migration/V8.1.1_ADOPTION_REPORT.md`); manager-edit feature build previously PASS per DEV_LOG (52.9kB/140kB)
- Evidence: `docs/migration/V8.1.1_ADOPTION_REPORT.md`; post-merge `npm run build` re-verified before push
- Review: `docs/migration/V8.1.1_ADOPTION_REVIEW.md` — Decision **PASS** (workflow adoption only; manager-edit feature was not independently reviewed by this task — see Known Risks)
- Human Decision: N/A (Standard)

## Risks and Blockers

- Open Findings: none
- Known Risks:
  - MODEL_RUNTIME_PIN 전 항목 CANDIDATE, PROJECT_SCOPE READY_FOR_APPROVAL — 승인 전에는 라우팅 대상 Runtime이 없다.
  - Manager edit 비밀번호(`data/site.ts` `managerPassword`, 기본값 `450815`)가 client-side에 평문 노출됨 — casual gate일 뿐 보안 목적 아님. 실제 보안이 필요하면 서버사이드 검증으로 교체 필요. (별도 검토 task로 flag됨)
  - Manager edit 데이터는 localStorage 저장 — 브라우저별로만 적용, 영구 반영은 `data/site.ts` 직접 수정 필요.
  - 이 workflow-adoption task는 manager-edit 기능 자체를 독립적으로 리뷰하지 않았다(이미 완료된 상태로 merge만 수행) — 필요 시 별도 WF:REVIEW 권장.
- Blocker: None
- Approval Needed: MODEL_RUNTIME_PIN 승인 · 유료-use cap · repo classification=Public 확인 — PROJECT_SCOPE §7
- Do NOT: 애플리케이션 소스/의존성/배포 설정을 이 워크플로우 문서 자체에서 변경하지 말 것(이미 완료된 코드를 merge하는 것은 예외로 승인됨); 아카이브된 v6/v7 문서를 활성 지침으로 사용 금지; magenta를 그라데이션 밖 단독 색으로 사용 금지; HYROX 공식 로고/이미지·"Official HYROX" 표현 금지; Don/Clinic/PT/의료 콘텐츠 금지; 결제/로그인/RSVP 시스템 금지(MVP 범위 밖); 실제 사용자 데이터 추가 금지; 시크릿/키/토큰 커밋 금지.
