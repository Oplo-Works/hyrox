# Legacy Workflow Archive Manifest — pre-v8.1.1

- Archive created (UTC): 2026-07-11T13:53:01Z
- Adoption task: workflow-adoption-v8.1.1
- Detected source workflow: LEGACY_V7 (Claude × Codex × GLM edition)
- Adoption base HEAD: 2663a83e3096e4a67c798793858216780b0097ed
- Reason: snapshot of the active v7 workflow/state files immediately before the
  v8.1.1-solo adoption replaced or structurally transformed them. Git history
  remains the primary history; this archive is an adoption-time snapshot.
- Note: application source, tests, dependencies, and build config were NOT
  archived and were NOT changed by this task.

| Original path | Archive path | SHA256 (pre-adoption) | Git status before | Detected version | Transformation reason |
|---|---|---|---|---|---|
| CLAUDE.md | ./CLAUDE.md | 5189453f852666fdb66b5c4660a24b6821a177742212f1cd0d8ff9043aad724b | tracked, clean | v7 bootstrap | Replaced by v8.1.1 bootstrap + Project-Specific section (merge) |
| AGENTS.md | ./AGENTS.md | ee81b036f43d5feef69cd2b08cdc41a4edd4d2e2a1efb5680a5d0f7a64dffb6a | tracked, clean | v7 bootstrap | Replaced by v8.1.1 bootstrap + Project-Specific section (merge) |
| docs/AGENT_WORKFLOW.md | ./docs/AGENT_WORKFLOW.md | bf92ec11d81c7dd0f680a766279e97b24c0800ad6774de92a4c47bc7cbb0c12a | tracked, clean | v7 source-of-truth | Converted to SUPERSEDED compatibility pointer; facts migrated to SCOPE/PIN |
| docs/AI_Coding_Agent_Workflow_v7.md | ./docs/AI_Coding_Agent_Workflow_v7.md | 71a9dc0dfb363c8c2ddbcc95233abc3a7c2e5f794c64aa36f114f7796967fe25 | tracked, clean | v7 full manual | Removed as active authority; retained only as archived history |
| docs/PROJECT_SCOPE.md | ./docs/PROJECT_SCOPE.md | d295fdbf565b12e424a6d9184d726e4ecff331329a2e2970d24dd12ecaa72045 | tracked, clean | v7 scope | Reconciled into v8.1.1 PROJECT_SCOPE schema (facts preserved) |
| docs/HANDOFF.md | ./docs/HANDOFF.md | cd3c5b88170c390a11bb45d1ab7124260e21ed9f0fd1c49b7b49965a19c919c0 | tracked, clean | v7 handoff | Rebuilt in v8.1.1 HANDOFF schema from actual repo state |
| docs/DEV_LOG.md | ./docs/DEV_LOG.md | cf91c32cb9c100dffeb19c06c76e8e1ff859da354e9e5eed2ac1001b9f773bc9 | tracked, clean | v7 dev log | Preserved in place (append-only); snapshot kept for safety |
| README.md | ./README.md | c2afc1c317f299769084414952e7373de1d7cc3bec67177a6a59bf0992d65a5e | tracked, clean | project readme | Workflow-link repair only (stale v6 reference → v8.1.1); project content unchanged |

## Restore note

These files are an exact byte snapshot at adoption time. To inspect the previous
active workflow, read them here or use `git show 2663a83:<path>`. Do not treat
this archive as an active instruction source — only v8.1.1-solo
(`docs/AGENT_WORKFLOW_CORE.md` + `docs/workflow/`) is active.
