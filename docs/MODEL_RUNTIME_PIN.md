# Model & Runtime Pin (v8.1.1-solo)

- Status: `DRAFT` → 사용자가 실제 계정·runner·모델·권한·예산을 확인한 뒤 `APPROVED`.
- 이 파일이 역할↔Runtime↔모델 매핑의 **유일한 원본**이다.
- 전략: 승인된 Claude, OpenAI, z.ai 구독을 모두 강점대로 사용해 품질과 총 사용량을 극대화한다.
- 외부 사실은 `docs/MODEL_RUNTIME_SNAPSHOT.md`를 참고하되, observed account state와 smoke test가 우선한다.

## 1. Approved Role Routing

| Role | Primary Runtime ID | Fallback Runtime ID | Notes |
|---|---|---|---|
| Main Driver | `claude-main-opus` | `codex-sol-deep` | 일반 설계·명세·구현 중심 |
| Deep Reasoning | `claude-deep-fable` | `claude-main-opus` 또는 `codex-sol-deep` | 최고 난도; data/credit gate 적용 |
| Runtime Specialist | `codex-terra-runtime` | `codex-sol-deep` | SDK·framework·compile/runtime |
| Volume Builder — routine | `glm-routine` | `codex-luna-volume` | 명확한 반복·문서·boilerplate |
| Volume Builder — complex/long context | `glm-complex` | `codex-terra-runtime` | 큰 저장소·복잡한 구현 |
| Independent Reviewer — artifact | `codex-sol-review-artifact` | `claude-fable-review-artifact` | source는 read-only, REVIEW/HANDOFF routing만 제한 쓰기 |
| Independent Reviewer — chat-only | `codex-sol-review-ro` | `claude-fable-review-ro` | 저장소 전체 read-only |

## 2. Runtime Registry

> 아래 값은 template이다. Exact Model, runner version, active model, subscription tier,
> billing meter, permission을 실제 UI/CLI로 관찰해 채운다.

| Runtime ID | Allowed Roles | Provider | Runner / Version | Exact Model | Subscription Tier | Billing Meter | Reasoning / Effort | Permission | Data / Retention | Status | Last Verified |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `claude-main-opus` | Main Driver, Builder | Anthropic | Claude Code [ver] | `claude-opus-4-8` [observe] | Claude Max [5x/20x observe] | plan quota; overage credits per policy | [effort] | workspace-write | project policy | CANDIDATE | [date] |
| `claude-deep-fable` | Deep Reasoning, critical implementation | Anthropic | Claude Code [ver] | `claude-fable-5` [observe] | Claude Max [observe] | **usage credits unless observed inclusion** | [effort] | workspace-write | Covered Model; min 30-day retention; no ZDR | CANDIDATE | [date] |
| `claude-fable-review-ro` | Independent Reviewer — chat-only | Anthropic | Claude Code [ver] | `claude-fable-5` [observe] | Claude Max [observe] | **usage credits unless observed inclusion** | [effort] | read-only | Covered Model; min 30-day retention; no ZDR | CANDIDATE | [date] |
| `claude-fable-review-artifact` | Independent Reviewer — artifact | Anthropic | Claude Code [ver] | `claude-fable-5` [observe] | Claude Max [observe] | **usage credits unless observed inclusion** | [effort] | artifact-write-limited | Covered Model; min 30-day retention; no ZDR | CANDIDATE | [date] |
| `codex-sol-deep` | Deep alternative, difficult implementation | OpenAI | Codex [surface/ver] | `gpt-5.6-sol` [observe] | ChatGPT Pro [$100/$200 observe] | agentic credits | [surface-observed, e.g. Medium/High/Extra High/Max/Ultra] | workspace-write | project policy | CANDIDATE | [date] |
| `codex-sol-review-ro` | Independent Reviewer — chat-only | OpenAI | Codex [surface/ver] | `gpt-5.6-sol` [observe] | ChatGPT Pro [$100/$200 observe] | agentic credits | [surface-observed] | read-only | project policy | CANDIDATE | [date] |
| `codex-sol-review-artifact` | Independent Reviewer — artifact | OpenAI | Codex [surface/ver] | `gpt-5.6-sol` [observe] | ChatGPT Pro [$100/$200 observe] | agentic credits | [surface-observed] | artifact-write-limited | project policy | CANDIDATE | [date] |
| `codex-terra-runtime` | Runtime Specialist, general builder | OpenAI | Codex [surface/ver] | `gpt-5.6-terra` [observe] | ChatGPT Pro [$100/$200 observe] | agentic credits | [surface-observed] | workspace-write | project policy | CANDIDATE | [date] |
| `codex-luna-volume` | Volume Builder | OpenAI | Codex [surface/ver] | `gpt-5.6-luna` [observe] | ChatGPT Pro [$100/$200 observe] | agentic credits | [surface-observed] | workspace-write | project policy | CANDIDATE | [date] |
| `glm-routine` | Volume Builder — routine | z.ai | [supported runner/ver] | `glm-4.7` [observe] | z.ai Lite [observe] | standard quota | [setting] | workspace-write | project policy | CANDIDATE | [date] |
| `glm-complex` | Volume Builder — complex/long context | z.ai | [supported runner/ver] | `glm-5.2` or `glm-5.2[1m]` [observe] | z.ai Lite [observe] | advanced-model quota multiplier | [setting] | workspace-write | project policy | CANDIDATE | [date] |

Routing table의 Runtime은 해당 row가 `APPROVED`일 때만 실제 작업에 사용한다.
`CANDIDATE`는 smoke test와 사용자 확인 전용이며 production/data authority를 갖지 않는다.

## 3. Subscription and Reasoning Are Separate

```text
OpenAI Subscription Tier:
- ChatGPT Pro $100 or ChatGPT Pro $200 — exact account label observed

Codex Reasoning Level:
- Low | Medium | High | Extra High | Max | Ultra

“Max reasoning”은 subscription 이름이 아니다.
```

## 4. Paid-Use and Data Gates

```text
Fable usage credits:
- Policy: [ASK_EACH_TIME | ALLOWED_WITH_MONTHLY_CAP]
- Monthly cap: [$ amount]
- Auto-reload: [OFF | ON with cap]
- If unset: ASK_EACH_TIME

OpenAI extra credits / auto-reload:
- Policy: [ASK_EACH_TIME | ALLOWED_WITH_MONTHLY_CAP]
- Monthly cap: [$ amount]

z.ai plan upgrade:
- Current: Lite
- Upgrade to Pro/Max: ASK_EACH_TIME unless standing approval exists
```

Fable Runtime은 Public/Internal만 기본 허용한다. Confidential은 PROJECT_SCOPE의 구체적 허용이
있을 때만, Restricted/secret/PII/production payload는 금지한다. Fable safeguard가 요청을
Opus 4.8로 switch할 수 있으므로 Observed Active Model을 결과와 함께 기록한다.

`artifact-write-limited`는 source/config/test를 수정할 권한이 아니다. 해당 review task의
ALLOWED_PATHS를 `REVIEW.md`와 최소 HANDOFF routing fields로 제한하고, 그 밖의 write는 금지한다.
CHAT_ONLY mode는 반드시 `*-review-ro` Runtime을 사용한다.

## 5. Runtime Detail Block — 각 행마다 채움

```text
Runtime ID:
Configured Model ID:
Observed Active Model ID:
Runner / Version / Surface:
Authentication Type: [secret 금지]
Subscription Tier:
Billing Meter:
Reasoning / Effort:
Instruction Discovery:
Headless Command: [verified command | N/A — manual only]
Permission Profile:
Allowed Data Classes:
Retention / Training Setting:
Official Sources:
Smoke Test Result:
Fallback Runtime ID:
Approved By / Date:
Status: CANDIDATE | APPROVED | SUSPENDED | RETIRED
```

## 6. Model Change Checklist

1. 같은 작은 benchmark 2~3개 실행.
2. instruction loading, tool use, patch 정확성, build/test 확인.
3. 품질·속도·credit/quota·data policy 비교.
4. exact observed model과 날짜 기록.
5. 회귀면 이전 Runtime으로 rollback.

## 7. Adoption Observations (2026-07-11) — all rows remain CANDIDATE

이 파일은 v8.1.1 채택 시점에 template로 생성되었다. 아래는 **채택 세션에서 실제로 관찰된
사실만** 기록한 것이며, 어떤 row도 아직 `APPROVED`가 아니다. 구독 tier, billing meter, quota,
권한, retention 설정은 **관찰되지 않았으므로** 사용자가 실제 계정 UI/CLI로 확인해야 한다.

Observed this session (Claude Code runner):
- Active model id `claude-opus-4-8` — 이 채택 작업을 수행한 실제 모델. (`claude-main-opus` 후보와 일치)
- `claude-fable-5` — 같은 세션에서 `/model`로 전환 가능함을 관찰. (`claude-deep-fable` / `*-review-*` 후보와 일치)
- 위 관찰은 **model id 수준**일 뿐이다. Subscription tier(Max 5x/20x 등), billing(plan quota vs usage credits), permission profile, retention은 확인되지 않았다.

NOT observed (반드시 사용자 확인 필요):
- OpenAI Codex runner/모델(`gpt-5.6-*`), ChatGPT Pro tier, agentic credit — 이 세션에서 전혀 실행/관찰되지 않음.
- z.ai GLM runner/모델(`glm-4.7`/`glm-5.2`), z.ai plan — 이 세션에서 전혀 실행/관찰되지 않음.
- 모든 billing meter, monthly cap, quota multiplier.

Legacy note (증거 아님): 이전 v7 `Model Pin` 표는 Claude=Opus 4.8(Pro $20), Codex=GPT-5.5,
GLM=5.2로 **주장**했으나, 이는 관찰된 사실이 아니라 문서상의 claim이므로 승인 근거로 쓰지 않는다.
GPT 버전 표기(5.5 vs snapshot의 5.6)도 불일치하므로 현재 `MODEL_RUNTIME_SNAPSHOT.md`와
실제 계정 관찰을 기준으로 재확인한다.

Paid-use / data gates: 현재 전부 기본 `ASK_EACH_TIME` (PROJECT_SCOPE §5·§7 참조). Fable은
Covered Model(최소 30일 retention, ZDR 불가)이며 Public/Internal 데이터에만 기본 허용된다.

To approve a runtime: §5 Runtime Detail Block을 실제 관찰값으로 채우고 smoke test를 거친 뒤
Status를 `APPROVED`로 바꾸고, 그 Runtime ID를 `PROJECT_SCOPE.md` §5 "Approved Runtime IDs"에 추가한다.
