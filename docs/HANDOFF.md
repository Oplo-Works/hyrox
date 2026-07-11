# Handoff

## Identity

- Status: DONE
- Task ID: workflow-adoption-v8.1.1
- Stage: WF:CLOSE
- Risk: Standard
- Updated At: 2026-07-11T13:53Z

## Context Summary

이 저장소는 LEGACY_V7 → **v8.1.1-solo** 워크플로우 채택을 완료했다. 독립 리뷰 결과 **PASS**
(P0/P1/P2 = 0, P3 1건은 MANIFEST 주석으로 보완). 애플리케이션 소스·테스트·의존성·배포 설정은
변경하지 않았다. 활성 워크플로우 권위는 v8.1.1-solo 하나뿐(`docs/AGENT_WORKFLOW_CORE.md` +
`docs/workflow/`)이며, v6/v7은 `docs/archive/workflow/`에 스냅숏으로만 존재한다. 채택 커밋은
task 브랜치 `chore/adopt-workflow-v8.1.1`에 있고, protected `main`에는 push하지 않았다(= Netlify
배포 미유발). 다음은 사람의 결정 사항이다(아래 Approval Needed).

## Ownership

- Outgoing Role / Runtime: Main Driver / claude-main-opus (observed `claude-opus-4-8`, CANDIDATE)
- Next Role: Human
- Next Runtime ID: Unassigned
- Next Action: (1) `docs/MODEL_RUNTIME_PIN.md` 행을 실제 계정 관찰로 확인 후 APPROVED, (2) 유료-use cap 설정, (3) `docs/PROJECT_SCOPE.md`를 APPROVED로, (4) `chore/adopt-workflow-v8.1.1`를 `main`에 merge할지 결정(= 배포 트리거, 별도 승인 필요).
- Reason: 남은 항목은 계정·구독·배포 권한이 필요한 Human 결정이며 agent가 대신 승인할 수 없다.

## Git and Worktree

- Branch / Worktree: `chore/adopt-workflow-v8.1.1` (main은 protected → 직접 push 금지)
- Base HEAD: 2663a83e3096e4a67c798793858216780b0097ed
- Implementation Base: 2663a83e3096e4a67c798793858216780b0097ed
- Implementation Head: 95e92538c180ca67cfd936824943ae44de7b7201 (adoption artifact commit)
- Implementation Commits: `95e9253` chore(workflow): adopt v8.1.1 solo workflow
- Verified Target: 95e9253
- Review Range: 2663a83..95e9253
- Review Packet Metadata State: SELF — resolve via Git history
- Review Artifact Metadata State: SELF — resolve via Git history (V8.1.1_ADOPTION_REVIEW.md in close commit)
- Close Metadata State: SELF — resolve via Git history
- Worktree State: REPO_CLEAN (after close commit)
- Preserved User Changes: none (채택 시작 시 dirty/staged 사용자 변경 없음)

## Publish

- Push Intent: AUTO_AT_CLOSE
- Approved Target: `origin/chore/adopt-workflow-v8.1.1` (non-protected task branch)
- Expected Remote Head: SELF — resolve close metadata commit
- Last Reconciled Remote Head: N/A (task 브랜치 최초 push)
- Push Result: NOT_ATTEMPTED (CLOSE 커밋 직후 1회 push; 실제 SHA는 Output Block 참조)

## Scope, Validation, and Decisions

- Approved Inputs: v8.1.1 adoption prompt (Prompt_01 Legacy→v8.1.1) + 첨부 ZIP/master (Human Approver 승인)
- AC State: 모든 채택 deliverable 존재 (adoption report Validation 표 전부 PASS)
- Evidence: `docs/migration/V8.1.1_ADOPTION_REPORT.md` (build/lint/regression/package/git 검증)
- Review: `docs/migration/V8.1.1_ADOPTION_REVIEW.md` — Decision **PASS** (P0/P1/P2=0, P3=1 addressed)
- Human Decision: N/A (Standard; Reviewer PASS로 충분)

## Risks and Blockers

- Open Findings: none (P3는 MANIFEST 주석으로 해소)
- Known Risks: MODEL_RUNTIME_PIN 전 항목 CANDIDATE, PROJECT_SCOPE READY_FOR_APPROVAL. 승인 전에는 라우팅 대상 Runtime이 없다.
- Blocker: None
- Approval Needed: MODEL_RUNTIME_PIN 승인 · 유료-use cap · repo classification=Public · `main` merge(배포) 여부 — PROJECT_SCOPE §7
- Do NOT: `main` 등 protected 브랜치로 직접 push/merge를 승인 없이 하지 말 것(= Netlify prod 배포); 애플리케이션 소스/의존성/배포 설정 변경 금지; 아카이브된 v6/v7 문서를 활성 지침으로 사용 금지; magenta를 그라데이션 밖 단독 색으로 사용 금지.
