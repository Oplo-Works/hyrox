# AI Coding Agent Workflow Manual — Claude × Codex × GLM (z.ai) Edition

이 문서는 범용 워크플로우 매뉴얼을 **세 모델 — Claude Code 최신 모델, Codex 최신 모델, z.ai의 최신 GLM 모델 — 을 함께** 쓰는 환경에 맞게 정리한 버전입니다. **항상 각 제공사의 최신 모델을 쓰는 것이 기본값(default)입니다** — 더 최신 모델이 나오면 당연히 그쪽을 씁니다. 그래서 본문에는 특정 버전 숫자를 박지 않고, 역할 호칭만 사용합니다.

- **Claude** = Claude Code의 최신 모델 (Pro 플랜 = 사용량 한도가 빡빡한 **희소 자원**)
- **Codex** = OpenAI Codex의 최신 모델 (실제로 도는 코드·라이브러리 관용구 전문)
- **GLM 모델** = z.ai의 최신 GLM 모델, z.ai에서 직접 구독해 사용 (저가 정액 + 넉넉한 쿼터)

지금 이 호칭들이 구체적으로 어떤 모델을 가리키는지는 바로 아래 [모델 핀] 표 한 곳에만 적어 둡니다.

목표는 세 모델이 무작정 코딩하지 않고 **제품 정의 → 기획 → 설계 → 구현 → 테스트 → 리뷰 → 기록** 순서로, 그리고 **각 단계에서 어느 모델이 무엇을 맡을지**가 분명한 상태로 일하게 만드는 것입니다. 핵심 역할 분담은 **GLM = 생산, Codex = 실행 정확성, Claude = 판단·검증**이며, 자세한 원칙은 아래 0장에 있습니다.

이 문서는 프로젝트마다 복사해서 사용할 수 있습니다.

---

## 모델 핀 (Model Pin) — 모델이 바뀌면 여기만 고치세요

문서 본문은 버전 숫자 대신 **역할 호칭("Claude" / "Codex" / "GLM 모델")**으로만 쓰여 있습니다. 새 모델이 나오면 아래 표의 "현재 사용 모델" 칸만 갱신하면, 본문 전체가 자동으로 최신 모델을 가리킵니다. 본문은 손댈 필요가 없습니다.

| 역할 호칭 | 의미 (고정) | 요금제 | 현재 사용 모델 (갱신 대상) |
|---|---|---|---|
| **Claude** | Claude Code의 **최신** 모델 | Pro $20 (한도 빡빡) | Opus 4.8 |
| **Codex** | OpenAI Codex의 **최신** 모델 | $20 | Codex GPT-5.5 |
| **GLM 모델** | z.ai의 **최신** GLM 모델, z.ai 직접 구독으로 사용 | z.ai 정액 구독 (저가 + 넉넉한 쿼터) | GLM 5.2 |

> **운영 원칙:** 새 프로젝트를 시작할 때마다(장기 프로젝트라면 월 1회 점검도 권장) 세 제공사의 최신 모델을 확인하고, 위 표의 오른쪽 칸을 그날의 최신 모델로 갱신한다. 역할·요금제(왼쪽 칸)와 단계별 배정은 그대로 둔다.

---

## 0. 모델 역할 분담 (Claude × Codex × GLM)

세 모델을 쓰되, **요금제 구조가 배분을 결정**합니다.

| 모델 | 요금 | 성격 | 핵심 역할 |
|---|---|---|---|
| **Claude** (Pro) | $20 고정 · **사용량 한도 빡빡** | 가장 비싼 판단력, **희소 자원** | 판단 · 설계 · 검증 |
| **Codex** | $20 고정 · 한도 중간 | 실제로 도는 코드 · 라이브러리 관용구 | 실행 정확성 · 프레임워크 |
| **GLM 모델** | z.ai 직접 구독 · **저가 정액 + 넉넉한 쿼터** | 고정비, 양으로 밀어붙이기 | 생산 · 대량 구현 |

(각 호칭이 가리키는 실제 모델은 맨 위 [모델 핀] 표 참고. 셋 다 항상 최신 모델.)

### 가장 중요한 변화: Claude가 '희소 자원'이 됨

예전 $100 Max 플랜과 달리 **Claude Pro($20)는 사용량 한도가 빡빡**합니다. 그래서 이 워크플로우의 제1원칙은 **"Claude를 아껴 쓴다"**입니다. 어떤 작업을 Claude에 맡기기 전에 항상 이렇게 묻습니다.

> 이걸 GLM 모델(대량·저렴)이나 Codex(실행·관용구)가 할 수 있나? 그들이 못 하는, 깊은 판단이 필요한 일만 Claude로.

### 3단 에스컬레이션 사다리 (Claude 절약형)

1. **기본 = GLM 모델.** 대량 구현, 보일러플레이트, 표준 CRUD/API, 테스트·문서. z.ai 직접 구독으로 정액에 넉넉한 쿼터를 쓰니, 양으로 밀어붙여도 부담이 적어 1차 시도는 항상 여기서 합니다.
2. **안 도는 코드·라이브러리 관용구·프레임워크 버그 = Codex.** "논리는 맞는데 실제로 안 도는 코드"와 특정 라이브러리/프레임워크의 실사례 지식은 Codex의 강점입니다. GLM이 막히면 **Claude가 아니라 Codex로** 먼저 올립니다 — 이게 Claude 예산을 지키는 핵심입니다.
3. **깊은 판단 = Claude.** 비즈니스 규칙 충돌, 아키텍처 결정, 권한·보안 설계, 코드베이스 전체 일관성, 재현 어려운 로직 버그. Codex·z.ai가 해결 못 하는 일에만 Claude를 씁니다.

### 각 모델의 강점을 살리는 법

- **GLM (생산):** 볼륨으로 승부합니다. 같은 패턴 반복(CRUD, 엔드포인트, 마이그레이션, 테스트 케이스, 문서)은 전부 여기로. 비용이 거의 안 드므로 초안을 넉넉히 뽑게 합니다.
- **Codex (실행 정확성):** GLM 초안이 안 돌 때, 또는 처음부터 "이 라이브러리 최신 사용법으로 즉시 도는 스니펫"이 필요할 때 씁니다. 프레임워크 특화 버그도 Codex. 실제 에러를 그대로 붙여넣어 고치게 하는 방식이 빠릅니다.
- **Claude (판단·검증):** 무엇을 만들지(설계)와 잘 만들었는지(리뷰)를 책임집니다. 장기 컨텍스트로 전체를 보는 일, 한 번의 실수가 비싼 보안·권한·데이터 모델 결정에 집중합니다. 양으로 하는 일은 절대 Claude에 주지 않습니다.

### 품질 안전망: 두 겹

2-모델 때와 달리 안전망이 두 겹입니다.

- **실행 안전망 = Codex / 테스트:** "도느냐"는 Codex와 GLM 테스트가 잡습니다.
- **정확성 안전망 = Claude 리뷰:** "돌긴 도는데 비즈니스 규칙·보안·일관성이 틀렸는가"는 Claude `/review`가 잡습니다.

Codex가 실행 검증을 분담하므로, Claude는 더더욱 '깊은 정확성'에만 집중할 수 있습니다.

### 워크플로우 단계별 담당 모델

| 단계 | 담당 | 비고 |
|---|---|---|
| `/blueprint` | **Claude** | 제품 방향·리스크. 한도 아껴 한 번에 |
| `/spec` | **Claude**(복잡) · GLM(단순) | 권한·보안 얽히면 Claude |
| `/prd` | **Claude** | 한 번의 집중 패스 |
| `/ux` | **Claude**(흐름) · GLM(문서화) | |
| `/backend` | **Claude**(설계·보안) · GLM(DDL) · Codex(연동 코드) | |
| `/design-system` | **GLM** · Claude 검토 | |
| `/plan` | **Claude** | slice 분해 판단 |
| `/build` | **GLM**(대량) · Codex(도는 코드·관용구) | Claude는 깊은 로직만 |
| 디버깅 | **증상별** | 로직난해 = Claude, 스택트레이스/핫픽스 = GLM, 프레임워크 버그 = Codex |
| `/test` | **GLM**(대량) · Codex(관용구) | 통합 시나리오 설계 = Claude |
| `/review` | **Claude** | 정확성·보안·일관성 (실행은 Codex가 분담) |
| `/log` | **GLM** | 저비용 문서화 |

> **한 줄 원칙: GLM으로 만들고, Codex로 돌게 만들고, Claude로 판단·검증한다. Claude(Pro)는 희소 자원이니 깊은 판단에만 쓰고, 안 도는 코드는 Codex로 올린다.**

---

## 1. 핵심 목적

AI coding agent는 빠르게 코드를 만들 수 있지만, 아무 규칙 없이 사용하면 다음 문제가 생길 수 있습니다.

- 기능 범위가 갑자기 커짐
- 기존 동작하던 기능을 깨뜨림
- 너무 많은 파일을 한 번에 수정함
- 설계 없이 UI/DB/API를 동시에 바꿈
- 테스트 없이 “될 것 같다”고 끝냄
- 실제 사용자 데이터나 민감 정보를 demo 코드에 넣음
- 프로젝트 목적과 다른 방향으로 코드를 확장함
- 나중에 유지보수하기 어려운 구조가 됨
- AI가 만든 starter code를 완성품처럼 착각함

이 매뉴얼의 목적은 AI coding agent가 다음 원칙으로 일하게 만드는 것입니다.

```text
먼저 생각하고, 작게 만들고, 반드시 테스트하고, 기록한다.
```

기본 workflow는 다음과 같습니다.

```text
/blueprint → /spec → /plan → /build → /test → /review → /log
```

기존의 핵심 workflow는 유지합니다.

```text
/spec → /plan → /build → /test → /review
```

`/blueprint`와 `/log`는 새 프로젝트 시작과 작업 기록을 더 안정적으로 만들기 위해 추가된 보강 단계입니다.

---

## 2. AI 앱 개발에 대한 현실적 원칙

AI는 앱 개발의 초반 속도를 크게 높일 수 있습니다. 하지만 AI가 “전체 앱을 몇 분 만에 완성”한다고 가정하면 안 됩니다.

AI에게 기대해도 좋은 것:

- 제품 아이디어 정리
- 사용자 페르소나와 pain point 정리
- MVP/v1/v2 범위 분리
- PRD 초안 작성
- 화면별 UX flow 작성
- backend requirement 초안 작성
- UI design system 초안 작성
- folder structure 제안
- starter code 생성
- 테스트 체크리스트 작성
- 코드 리뷰 보조

AI에게 그대로 맡기면 위험한 것:

- 결제, 세금, 회계, 보안, 개인정보 관련 자동화
- 실제 고객 데이터 처리
- 권한/역할 기반 데이터 노출 제어
- production DB migration
- 앱스토어/플레이스토어 출시 판단
- 법적/규제 판단
- 대규모 리팩토링
- 여러 기능을 한 번에 만드는 broad rewrite

핵심 규칙:

```text
AI output is a draft until it is reviewed, built, tested, and logged.
```

한국어로는:

```text
AI가 만든 결과물은 검토, 빌드, 테스트, 기록 전까지 초안이다.
```

---

## 3. 새 프로젝트 시작 시 기본 파일 구조

새 프로젝트를 시작하면 먼저 아래 파일들을 만드는 것을 추천합니다.

```text
README.md
CLAUDE.md
AGENTS.md
docs/PRODUCT_BLUEPRINT.md
docs/PROJECT_SCOPE.md
docs/AGENT_WORKFLOW.md
docs/DEV_LOG.md
docs/HANDOFF.md
docs/handoff_history/
```

### README.md

프로젝트 개요, 실행 방법, 주요 기능, 배포 주소를 정리합니다.

### CLAUDE.md (프로젝트 루트)

Claude Code가 세션 시작 시 자동으로 읽는 표준 파일입니다. 규칙을 새로 쓰지 말고 "docs/AGENT_WORKFLOW.md와 docs/HANDOFF.md를 먼저 읽고 시작하라"는 포인터와 Claude의 역할(판단·설계·리뷰, 대량 반복 구현 금지)만 짧게 적습니다. 템플릿은 19장 참고.

### AGENTS.md (프로젝트 루트)

Codex를 비롯해 여러 코딩 에이전트 도구가 자동으로 읽는 표준 컨벤션 파일입니다. GLM을 돌리는 도구가 AGENTS.md를 자동으로 읽으면 그대로 적용되고, 자동으로 읽지 않는 도구라면 세션 시작 시 이 파일부터 읽게 하는 공용 포인터로 씁니다. 마찬가지로 docs/AGENT_WORKFLOW.md와 docs/HANDOFF.md로 연결하고, Codex/GLM 각각의 역할만 짧게 적습니다. 템플릿은 19장 참고.

### docs/PRODUCT_BLUEPRINT.md

앱의 사용자, 문제, 가치제안, MVP/v1/v2 기능, 수익화, 리스크를 정리합니다.

### docs/PROJECT_SCOPE.md

현재 MVP 범위, 나중 phase, 하지 말아야 할 기능을 정리합니다.

### docs/AGENT_WORKFLOW.md

AI coding agent가 지켜야 할 작업 규칙입니다. 이 매뉴얼의 핵심 내용을 프로젝트에 맞게 넣습니다. 모든 모델이 작업 전에 반드시 읽는 단일 규칙 원본(source of truth)입니다.

### docs/DEV_LOG.md

개발 진행 기록입니다. 현재 상태(Current Status), 완료 작업, 미해결 이슈, build/test 로그를 포함합니다. AI agent가 의미 있는 작업을 끝낼 때마다 업데이트하도록 합니다.

### docs/HANDOFF.md

지금 누가 무엇을 했고, 다음에 어느 모델이 무엇을 해야 하는지를 담은 "인계 쪽지"입니다. 다음 모델은 세션 시작 시 이 파일을 가장 먼저 읽습니다. 작업이 끝나면 이 파일을 새로 덮어쓰고, 이전 버전은 docs/handoff_history/에 보관합니다. 템플릿은 17~18장 참고.

---

## 4. 전체 Workflow

큰 기능 또는 새 프로젝트는 아래 순서로 진행합니다.

```text
/blueprint → /spec → /plan → /build → /test → /review → /log
```

큰 프로젝트라면 /blueprint 뒤에 필요에 따라 /prd → /ux → /backend → /design-system을 끼워 넣고, 그다음 기능별로 /spec부터 진행합니다(/prd는 /spec보다 먼저 또는 함께 — /prd 장 참고).

간단한 기능 수정은 아래 핵심 흐름만 적용해도 됩니다.

```text
/spec → /plan → /build → /test → /review
```

---

# /blueprint

> **담당 모델: Claude 주도.** 제품 방향·페르소나·리스크 판단은 장기 추론이 필요하므로 Claude가 맡습니다. 단 Claude(Pro)는 한도가 빡빡하니, 왔다 갔다 반복하지 말고 한 번의 집중 세션으로 끝냅니다. 코드는 아직 작성하지 않습니다.

## 목적

코딩 전에 앱 또는 기능의 제품 방향을 먼저 정의합니다.

이 단계는 특히 새 프로젝트, MVP, 큰 기능, 유료 기능, 사용자 flow가 바뀌는 기능에서 유용합니다.

## /blueprint에서 정의할 것

- App name: 앱 또는 기능 이름
- Target users: 핵심 사용자
- User personas: 주요 사용자 유형
- Pain points: 해결할 문제
- Value proposition: 왜 이 제품을 써야 하는가
- MVP features: 지금 꼭 필요한 기능
- v1 features: MVP 이후 가까운 기능
- v2/later features: 나중 기능
- Core user flow: 핵심 사용자 흐름
- Monetization: 수익화 가능성
- UX risks: 사용자 경험 리스크
- Tech risks: 기술 리스크
- Business risks: 사업/운영 리스크
- Out of scope: 지금 하지 않을 것

## /blueprint 요청 예시

```text
Act as a principal product architect.

Create a mobile-first product blueprint for [APP NAME].

Target users:
[TARGET USERS]

Problem:
[PROBLEM]

Output:
- user personas
- pain points
- value proposition
- MVP features
- v1 features
- v2/later features
- core user flow
- monetization options
- UX risks
- technical risks
- business risks
- out of scope

Do not write code yet.
```

---

# /spec

> **담당 모델: Claude 주도.** 단, 단순하고 표준적인 기능의 명세는 GLM 모델로도 충분합니다. 비즈니스 규칙이 얽히거나 권한·보안 이슈가 있으면 Claude가 맡습니다.

## 목적

코딩하기 전에 기능 명세를 먼저 작성합니다.

AI agent에게 바로 “만들어줘”라고 하지 말고, 먼저 아래 내용을 정리하게 합니다.

## /spec에서 정의할 것

- User: 누가 쓰는 기능인가?
- Goal: 이 기능의 목적은 무엇인가?
- Problem: 어떤 문제를 해결하는가?
- Screens affected: 어떤 화면이 바뀌는가?
- Data affected: 어떤 데이터 모델이 바뀌는가?
- External services: API, DB, email, calendar, payment 등 외부 서비스가 필요한가?
- Edge cases: 예외 상황은 무엇인가?
- Security/privacy: 민감 데이터나 권한 이슈가 있는가?
- Acceptance criteria: 완료 기준은 무엇인가?
- Out of scope: 이번 작업에서 하지 않을 것은 무엇인가?

## /spec 요청 예시

```text
Before coding, follow docs/AGENT_WORKFLOW.md.

Start with /spec only.
Do not implement yet.

Feature:
[FEATURE NAME]

The spec must include:
- user
- goal
- affected screens
- affected data
- external services
- edge cases
- security/privacy risks
- acceptance criteria
- out of scope
```

---

# /prd

> **담당 모델: Claude 주도.** 제품 전체의 목표·비목표·요구사항 정의는 Claude가 맡습니다.

## 목적

기능이 크거나 MVP 전체를 정의할 때는 `/spec` 전에 또는 `/spec`과 함께 PRD를 작성합니다.

PRD는 개발자, 디자이너, 창업자, 운영자가 같은 기준을 보게 만드는 문서입니다.

## /prd에서 정의할 것

- Product overview
- User problem
- Goals
- Non-goals
- Target audience
- Core features
- Functional requirements
- Non-functional requirements
- Edge cases
- Technical considerations
- Success metrics
- Launch scope
- Roadmap

## /prd 요청 예시

```text
Act as a startup CTO and product manager.

Write a concise PRD for [APP NAME / FEATURE].

Include:
- product overview
- user problem
- goals
- non-goals
- target audience
- core features
- requirements
- edge cases
- technical considerations
- success metrics
- launch scope
- roadmap

Do not write code yet.
```

---

# /ux

> **담당 모델: Claude 주도 · GLM 모델 보조.** 사용자 흐름의 논리·일관성은 Claude가 잡고, 화면별 항목(상태·CTA·microcopy 등)을 문서로 정리하는 반복 작업은 GLM 모델에 넘깁니다.

## 목적

화면을 만들기 전에 screen-by-screen UX flow를 정의합니다.

AI가 UI를 바로 만들면 기능은 있어도 사용 흐름이 어색할 수 있습니다. `/ux`는 이 문제를 줄입니다.

## /ux에서 정의할 것

각 화면마다 다음을 정리합니다.

- Screen name
- User goal
- Main action
- UI elements
- Empty state
- Loading state
- Error state
- CTA
- Microcopy
- Retention opportunity
- Accessibility note

## /ux 요청 예시

```text
Act as a senior mobile UX designer.

Create a screen-by-screen UX plan for [APP NAME / FEATURE].

For each screen include:
- goal
- main action
- UI elements
- empty state
- loading state
- error state
- CTA
- microcopy
- retention opportunity
- accessibility note

Do not write code yet.
```

---

# /backend

> **담당 모델: Claude 주도 · GLM 모델 · Codex 보조.** 서비스 경계·인증/권한·보안 리스크 등 고수준 결정은 Claude가, 확정된 스키마의 DDL·마이그레이션 초안은 GLM 모델이 변환하고, 특정 SDK/외부 API를 실제로 붙이는 연동 코드는 Codex가 맡습니다.

## 목적

UI만 만들고 실제 데이터 흐름이 없는 앱이 되지 않도록, 백엔드 요구사항을 먼저 정리합니다.

특히 인증, 권한, 결제, 회계, 데이터베이스, 외부 API가 들어가면 반드시 필요합니다.

## /backend에서 정의할 것

- Entities/data models
- DB schema draft
- Auth/roles
- API endpoints
- External integrations
- Notifications
- File/storage requirements
- Payment/accounting requirements
- Admin panel needs
- Rate limits
- Security risks
- Privacy risks
- Audit log needs
- MVP vs later phase split

## /backend 요청 예시

```text
Act as a senior backend architect.

For [APP NAME / FEATURE], generate MVP-friendly backend requirements.

Include:
- data models
- DB schema draft
- auth and roles
- API endpoints
- external integrations
- notifications
- storage
- payments/accounting if relevant
- admin panel needs
- rate limits
- security risks
- privacy risks
- audit log needs
- MVP vs later phase split

Do not implement yet.
```

---

# /design-system

> **담당 모델: GLM 모델 주도 · Claude 검토.** 색·타이포·간격·컴포넌트 같은 반복적 토큰 정의는 GLM 모델이 비용 효율적입니다. 전체 일관성과 접근성 규칙은 Claude가 검토합니다.

## 목적

화면마다 디자인이 달라지는 문제를 막기 위해 UI design system 초안을 먼저 만듭니다.

## /design-system에서 정의할 것

- Brand personality
- Color palette
- Typography
- Spacing scale
- Buttons
- Inputs
- Cards
- Navigation patterns
- Icons
- Onboarding style
- Empty/loading/error states
- Premium UI direction
- Accessibility rules

## /design-system 요청 예시

```text
Act as a senior mobile UI designer.

Create a practical UI design system for [APP NAME].

Target users:
[TARGET USERS]

Brand style:
[BRAND STYLE]

Include:
- colors
- typography
- spacing
- buttons
- inputs
- cards
- navigation patterns
- icons
- onboarding style
- empty/loading/error states
- premium UI direction
- accessibility rules

Do not write code yet.
```

---

# /plan

> **담당 모델: Claude 주도.** 기능을 어떻게 vertical slice로 쪼갤지, 무엇을 먼저 할지의 판단은 Claude가 맡습니다. 잘 쪼갠 plan이 이후 GLM 모델 구현의 품질을 좌우합니다.

## 목적

기능을 작게 쪼개서 구현 계획을 만듭니다.

AI agent가 한 번에 너무 많은 파일을 고치지 않도록 합니다.

## /plan에서 정의할 것

- 작업 순서
- vertical slices
- 수정할 파일 목록
- 새로 만들 파일 목록
- 데이터 모델 변경 여부
- 외부 API 변경 여부
- 테스트 방법
- rollback 또는 실패 시 대응
- 이번 slice에서 하지 않을 것

## Vertical Slice 원칙

가능하면 한 번에 3~5개 파일 이하만 수정합니다.

좋은 예:

```text
Slice 1:
- 데이터 타입 추가
- mock data 추가
- 화면에는 아직 연결하지 않음

Slice 2:
- API route 추가
- 저장 버튼 연결
- 성공/실패 메시지 표시

Slice 3:
- 목록 화면 연결
- edit/update flow 연결
```

나쁜 예:

```text
한 번에 DB, API, UI, 로그인, 관리자 화면, export, 이메일까지 모두 구현
```

## /plan 요청 예시

```text
Now write /plan only.

Break this into small vertical slices.
Each slice should touch no more than 3-5 files when possible.

For each slice include:
- goal
- files likely to change
- data/API impact
- test/build command
- rollback plan
- what is out of scope

Do not implement yet.
```

---

# /build

> **담당 모델: GLM 모델 주도 · Codex 보조.** 볼륨 큰 구현은 GLM이 담당합니다. "논리는 맞는데 안 도는 코드"나 특정 라이브러리 관용구가 필요하면 **Codex**로 올리고(아래 "막히는 코드 처리" 3단 참고), 설계·로직 차원의 문제일 때만 Claude로 승격합니다.

## 목적

계획된 작은 단위만 구현합니다.

## /build 원칙

- 한 번에 하나의 slice만 구현
- 기존 working demo flow 유지
- broad rewrite 금지
- 프로젝트 범위 밖 기능 추가 금지
- 파일 수정 범위를 최소화
- TODO는 명확히 남기되, 미완성 기능을 완성된 것처럼 보이게 하지 않기
- AI가 생성한 starter code를 production-ready라고 주장하지 않기
- 보안/결제/회계/개인정보 관련 기능은 추가 review 전 자동화하지 않기

## 막히는 코드 처리: GLM → Codex → Claude (3단)

코드가 "논리는 맞는데 실제로 안 도는" 상황을 처리하는 순서입니다. **핵심은 Claude(희소 자원)를 마지막에, 정말 필요할 때만 부르는 것**입니다.

1. **GLM 자가수정 (1차, 가장 저렴).** GLM이 만든 코드를 빌드/테스트하고, 실패하면 실제 에러·스택 트레이스·실패한 테스트를 그대로 GLM에 되먹여 1~2회 고치게 합니다. z.ai 구독 쿼터 안이라 추가 시도 비용이 사실상 들지 않습니다.
2. **Codex 승격 (2차, 실행 전문).** GLM이 1~2회로 못 고치거나, 특정 라이브러리/프레임워크의 최신 관용구가 필요하면 **Codex로** 올립니다 (Claude가 아닙니다). 같은 에러를 붙여넣어 고치게 하거나, 처음부터 "즉시 도는 스니펫"을 Codex에 맡깁니다.
3. **Claude 승격 (3차, 깊은 판단만).** 문제가 단순 실행이 아니라 설계·로직·아키텍처 차원이면 그때 Claude로 올립니다. 승격 시 "GLM/Codex가 시도한 내용 + 현재 에러 + 관련 파일"을 함께 전달합니다. Claude는 방향과 수정안을 결정하는 데까지만 쓰고, 결정이 나오면 실제 구현·대량 수정은 다시 GLM(또는 Codex)으로 내려보냅니다.

### 1차 — GLM 자가수정 요청 예시

```text
The previous build failed. Here is the actual result:

[빌드 에러 / 스택 트레이스 / 실패한 테스트 출력 / 런타임 로그를 그대로 붙여넣기]

Fix the code so it actually runs.
- Do not change scope.
- Touch only the files needed for the fix.
- Re-run the build/test command after fixing.
- If it still fails, explain what you tried and the new error.
```

### 2차 — Codex 승격 요청 예시 (실행·관용구)

```text
This code does not run, or I need the current idiom for [라이브러리/버전].

[안 도는 코드 또는 목표 + 실제 에러를 붙여넣기]

Give a minimal, immediately-runnable version using the current API.
- Match this project's stack: [스택].
- Only the snippet needed; no broad rewrite.
- Note any breaking changes from older versions.
```

## /build 요청 예시

```text
Proceed with /build for Slice [NUMBER] only.

Rules:
- Follow docs/AGENT_WORKFLOW.md.
- Touch no more than 3-5 files unless necessary.
- Preserve existing demo flow.
- Do not implement later-phase features.
- Do not add real user/customer data.
- Run the required build/test command after changes.
- Update docs/DEV_LOG.md.
- Summarize files changed and test results.
```

---

# /test

> **담당 모델: GLM 모델 주도 · Codex 보조.** 유닛 테스트·기본 동작 확인의 대량 생성은 GLM이 가장 저렴합니다. 프레임워크 특화 테스트 관용구가 필요하면 Codex. 복잡한 통합 테스트 시나리오 *설계*만 Claude에 맡깁니다. 실행 오류는 실행 안전망(Codex·테스트)이 잡아 주되, 커버리지는 넉넉하게 가져갑니다.

## 목적

코드를 만든 뒤 실제로 동작하는지 확인합니다.

## 기본 테스트

프로젝트에 맞는 build/test 명령어를 반드시 실행합니다.

예:

```bash
npm run build
npm run test
npm run lint
```

프로젝트에 test가 없으면 최소한 build는 통과해야 합니다.

## Manual Test Checklist 예시

- 메인 페이지가 열리는가?
- 핵심 기능이 여전히 작동하는가?
- 새 기능이 의도대로 작동하는가?
- 모바일 화면이 깨지지 않는가?
- demo 데이터만 사용하고 있는가?
- 내부 정보가 고객/외부 화면에 노출되지 않는가?
- 권한 없는 사용자가 민감 정보를 볼 수 없는가?
- 에러 상태가 사용자에게 명확히 보이는가?
- loading/empty/error 상태가 존재하는가?
- 외부 API 실패 시 fallback이 있는가?

## /test 요청 예시

```text
Run /test.

Required:
- npm run build
- npm run test if available
- npm run lint if available
- Check that the main demo flow still works
- Check that no real user data was added
- Check that no internal/admin/billing/security data is exposed
- Summarize any failures and fixes
```

---

# /review

> **담당 모델: Claude. 품질의 최종 안전망(정확성).** 실행 안전망(Codex·테스트)이 "도느냐"를 잡아 주므로, Claude는 "돌긴 도는데 비즈니스 규칙·보안·경계 조건·코드베이스 일관성이 틀렸는가"라는 깊은 정확성에 집중합니다. Claude(Pro)는 희소 자원이니 리뷰는 의미 있는 변경 단위로 묶어 한 번에 돌립니다.

## 목적

작업 결과를 다시 검토합니다.

## Review Checklist

- Spec과 plan 범위를 벗어나지 않았는가?
- 기존 기능을 깨지 않았는가?
- 불필요하게 많은 파일을 수정하지 않았는가?
- hardcoded 값이 생기지 않았는가?
- 민감 데이터가 노출되지 않는가?
- role/permission 문제가 생기지 않는가?
- multi-company 또는 future scalability를 막는 구조가 생기지 않았는가?
- 외부 API error handling이 있는가?
- loading/empty/error state가 있는가?
- accessibility 문제가 생기지 않았는가?
- build/test 결과가 기록되었는가?
- docs/DEV_LOG.md가 업데이트되었는가?

## /review 요청 예시

```text
Run /review for the last change.

Check:
- scope creep
- broken demo flow
- hardcoded values
- security/privacy risks
- role/permission risks
- missing loading/empty/error states
- missing tests/build
- whether docs/DEV_LOG.md was updated

Return:
1. Summary of change
2. Files changed
3. Build/test result
4. Risks
5. Recommended next step
```

---

# /log

> **담당 모델: GLM 모델 주도.** 변경 기록·로그 작성은 저비용 작업이므로 GLM 모델이 처리합니다.

## 목적

작업이 끝난 뒤 어떤 변경이 있었는지 기록합니다.

## /log에서 기록할 것

- Date
- Work completed
- Files changed
- Build/test result
- Known risks
- Follow-up tasks
- Decisions made

## /log 요청 예시

```text
Update docs/DEV_LOG.md.

Include:
- date
- summary of work
- files changed
- build/test result
- known risks
- next recommended step
```

---

## 5. 공통 AI Coding Agent Rules

아래 규칙은 모든 프로젝트에 적용할 수 있습니다.

```text
1. Do not start coding major features without a short spec.
2. For new products or large features, start with /blueprint.
3. Always create a plan before implementation.
4. Prefer small vertical slices.
5. Avoid modifying more than 3-5 files in one slice unless necessary.
6. Do not rewrite working code without a clear reason.
7. Preserve the current working demo flow.
8. Do not add real customer/user personal data to demo code.
9. Do not expose internal/admin/billing/security data to public or customer-facing views.
10. Keep external API integrations as later phases unless explicitly requested.
11. If a feature affects payments, tax, accounting, security, privacy, or user permissions, require extra review.
12. Prefer configurable settings over hardcoded customer-specific logic.
13. Before finishing, run the project build/test command.
14. Update docs/DEV_LOG.md after meaningful changes.
15. Clearly mark unfinished features as placeholder, mock, demo, or future phase.
16. Do not claim a feature is complete unless it has been built and tested.
17. Treat AI-generated code as starter code until reviewed and tested.
18. Separate MVP, v1, and later phases clearly.
19. Include loading, empty, and error states for user-facing features.
20. Include data visibility rules for customer, admin, driver, and internal views when relevant.
21. Three-model setup: "Claude" (Claude Code's latest, scarce on Pro $20) owns judgment/design/review; "Codex" ($20) owns runnable code, library idioms, and framework-specific bugs; "GLM" (z.ai's latest model, subscribed directly on z.ai — low flat cost, generous quota) owns volume implementation/tests/docs. Always use each provider's latest model.
22. Claude is the binding cost constraint. Before assigning a task to Claude, check whether GLM (volume) or Codex (runnability/idioms) can do it; reserve Claude for deep judgment only.
23. Default first attempt goes to GLM (if the goal itself is a current library idiom, starting at Codex is fine). If code does not run after 1-2 self-correction passes, escalate to Codex — not Claude.
24. Use Codex for "logic is right but it does not run," current library/framework idioms, and framework-specific bugs.
25. Escalate to Claude only for design/logic/architecture/security problems that Codex and GLM cannot resolve.
26. Two safety nets: Codex/tests catch "does it run"; Claude review catches "runs but is subtly wrong" (business rules, security, consistency).
27. After a Claude escalation, Claude only decides the direction/fix; the actual implementation goes back down to GLM (or Codex). Claude does not type volume changes.
28. End every session with a commit: run build/test, commit (and push if possible), and record the commit hash in docs/HANDOFF.md. Never hand off a dirty working tree.
29. Never commit secrets, API keys, or tokens. Use environment variables with a .gitignored .env file, and provide .env.example placeholders.
```

---

## 6. Project-Specific Rules Template

새 프로젝트마다 아래 섹션을 복사해서 채우세요.

````markdown
# Project-Specific Agent Rules

## Project Name

[프로젝트명]

## Current MVP Goal

[현재 MVP의 핵심 목표]

## Target Users

- [사용자 1]
- [사용자 2]

## Core Value Proposition

[사용자가 이 제품을 써야 하는 이유]

## Must Preserve Demo Flow

AI agent must preserve:

- [핵심 화면 1]
- [핵심 화면 2]
- [핵심 기능 1]
- [핵심 기능 2]

## Current MVP Scope

Included:

- [기능 1]
- [기능 2]
- [기능 3]

## Later Phases

Do not implement unless explicitly requested:

- [나중 기능 1]
- [나중 기능 2]
- [나중 기능 3]

## Data / Security Rules

- [예: customerId must be included]
- [예: internal notes must not be shown to customers]
- [예: payment info must be hidden from non-admin users]

## Role-Based Visibility Rules

| Role | Can See | Must Not See |
|---|---|---|
| Customer | [정보] | [민감 정보] |
| Driver | [정보] | [민감 정보] |
| Admin | [정보] | [제한 정보] |
| Public | [정보] | [민감 정보] |

## Build / Test Commands

Use:

```bash
[build command]
[test command]
```

## Deployment Notes

- [예: Vercel demo]
- [예: staging only]
- [예: no real customer data]
````

---

## 7. New Project Setup Prompt

새 프로젝트를 시작할 때 AI coding agent에게 아래 prompt를 줄 수 있습니다.

> **이 프롬프트는 GLM에게 줍니다** (문서 생성은 저비용 작업).

```text
Create project documentation for AI coding agent workflow.

Tasks:
1. Create docs/PRODUCT_BLUEPRINT.md.
2. Create docs/AGENT_WORKFLOW.md.
3. Create docs/DEV_LOG.md.
4. Create docs/PROJECT_SCOPE.md.
5. Create docs/HANDOFF.md and the docs/handoff_history/ folder.
6. Create CLAUDE.md and AGENTS.md in the project root as short pointer files
   to docs/AGENT_WORKFLOW.md and docs/HANDOFF.md.
7. Add workflow:
   /blueprint → /spec → /plan → /build → /test → /review → /log
8. Include rules:
   - no major coding without spec
   - product blueprint before large builds
   - small vertical slices
   - preserve demo flow
   - run build/test before finishing
   - update DEV_LOG after meaningful changes
   - no real user/customer data in demo
   - mark later-phase features clearly
   - treat AI output as draft until tested
   - commit before ending the session
9. Do not implement app features yet.
10. Only add documentation.
```

---

## 8. Feature Development Prompt Template

새 기능을 개발할 때 사용하세요.

> **이 프롬프트는 Claude에게 줍니다** (/spec·/plan은 Claude 담당 — 단순·표준 기능의 /spec은 GLM도 가능).

```text
Follow docs/AGENT_WORKFLOW.md.

Start with /spec and /plan only.
Do not implement yet.

Feature:
[기능명]

Context:
[왜 필요한지 설명]

Important constraints:
- [제약 1]
- [제약 2]
- [제약 3]

The spec must include:
- user
- goal
- affected screens
- affected data
- external services
- edge cases
- security/privacy risks
- acceptance criteria
- out of scope

The plan must:
- break work into small vertical slices
- list files likely to change
- include data/API impact
- include build/test steps
- include rollback plan
```

---

## 9. Starter Code Prompt Template

새 앱의 starter code를 만들 때 사용하세요.

> **이 프롬프트는 GLM에게 줍니다** (대량 starter code 생성).

```text
Act as a senior [SwiftUI/Kotlin/Flutter/React Native/Next.js] engineer.

Generate starter code for [APP NAME] based on the approved PRD, UX flow, backend requirements, and design system.

Rules:
- Follow docs/AGENT_WORKFLOW.md.
- Generate only MVP starter code.
- Do not implement later-phase features.
- Include setup, navigation, core screens, reusable components, state management, mock data, API layer placeholder, loading states, and error handling.
- Do not add real user/customer data.
- Do not claim production readiness.
- After coding, run the required build/test command.
- Update docs/DEV_LOG.md.
```

---

## 10. Build Prompt Template

spec과 plan을 확인한 후 구현할 때 사용하세요.

> **이 프롬프트는 GLM에게 줍니다** (막히면 0장 3단 사다리대로 Codex → Claude 순으로 승격).

```text
Proceed with /build for Slice [번호] only.

Rules:
- Follow docs/AGENT_WORKFLOW.md.
- Keep this change small.
- Touch no more than 3-5 files unless necessary.
- Preserve the existing demo flow.
- Do not implement out-of-scope features.
- Do not add real user/customer data.
- Run the required build/test command.
- Update docs/DEV_LOG.md with what changed.
- Summarize files changed and test results.
```

---

## 11. Review Prompt Template

작업 후 검토할 때 사용하세요.

> **이 프롬프트는 Claude에게 줍니다** (최종 정확성 안전망).

```text
Run /review for the last change.

Check:
- Did the change stay within scope?
- Did it preserve the existing demo flow?
- Did it introduce hardcoded customer-specific logic?
- Did it expose sensitive/internal data?
- Did it affect security, permissions, payments, accounting, or privacy?
- Did it include loading/empty/error states where needed?
- Did build/test pass?
- Was docs/DEV_LOG.md updated?

Return:
1. Summary of change
2. Files changed
3. Build/test result
4. Risks
5. Recommended next step
```

---

## 12. DEV_LOG Template

`docs/DEV_LOG.md`는 아래 구조를 추천합니다.

```markdown
# Development Log

## Project

[프로젝트명]

## Current Status

- Current Feature: [현재 작업 중인 기능]
- Current Phase: [MVP / v1 / v2]
- Current Slice: [현재 slice 번호/이름]
- Completed Slices: [완료된 slice 목록]
- Remaining Work: [남은 작업]
- Active Branch: [브랜치명]
- Build Status: [Passing / Failing]
- Test Status: [Passing / Failing]

## Current MVP Scope

- [기능 1]
- [기능 2]
- [기능 3]

## Important Decisions

| Date | Decision | Reason |
|---|---|---|
| YYYY-MM-DD | [결정] | [이유] |

## Completed Work

| Date | Model | Work | Notes |
|---|---|---|---|
| YYYY-MM-DD | [Claude/Codex/GLM] | [작업] | [메모] |

## Open Issues

| ID | Issue | Priority | Status |
|---|---|---|---|
| #001 | [이슈] | High | Open |

## Build / Test Log

| Date | Model | Command | Result | Notes |
|---|---|---|---|---|
| YYYY-MM-DD | [모델] | npm run build | Passed/Failed | [메모] |

## Risks / Follow-Ups

| Date | Risk or Follow-Up | Owner | Status |
|---|---|---|---|
| YYYY-MM-DD | [내용] | [담당] | Open |

## Next Steps

1. [다음 작업 1]
2. [다음 작업 2]
3. [다음 작업 3]
```

---

## 13. PROJECT_SCOPE Template

`docs/PROJECT_SCOPE.md`는 아래 구조를 추천합니다.

```markdown
# Project Scope

## Current MVP

The current MVP includes:

- [기능 1]
- [기능 2]
- [기능 3]

## Not Included in MVP

The following are later phases:

- [나중 기능 1]
- [나중 기능 2]
- [나중 기능 3]

## Core Users

- [사용자 1]
- [사용자 2]

## Core Workflows

1. [workflow 1]
2. [workflow 2]
3. [workflow 3]

## Data Rules

- [데이터 규칙 1]
- [데이터 규칙 2]

## Security / Privacy Rules

- [보안 규칙 1]
- [보안 규칙 2]

## Role-Based Visibility

| Role | Allowed Data | Hidden Data |
|---|---|---|
| [역할] | [허용 정보] | [숨길 정보] |

## Future Expansion

- [확장 1]
- [확장 2]
```

---

## 14. Recommended Workflow for Every New Project

새 프로젝트를 시작하면 아래 순서로 진행하세요.

```text
Step 1. 프로젝트 목적 정리
Step 2. PRODUCT_BLUEPRINT 작성
Step 3. README.md 작성
Step 4. PROJECT_SCOPE 작성
Step 5. AGENT_WORKFLOW 작성
Step 6. DEV_LOG 작성
Step 7. CLAUDE.md / AGENTS.md / HANDOFF.md 작성 (17~19장 템플릿 사용)
Step 8. MVP 기능만 구현
Step 9. 기능마다 /spec → /plan → /build → /test → /review 적용
Step 10. 작업 후 커밋 → DEV_LOG·HANDOFF 업데이트
Step 11. 데모 또는 배포 전 build/test 확인
Step 12. 나중 기능은 Phase로 분리
```

---

## 15. Key Principle

AI coding agent에게 가장 중요한 원칙은 이것입니다.

```text
Do not let the agent rush into coding.
Make it define the product, write the spec, plan small, build small, test, review, and log.
```

한국어로는:

```text
AI에게 바로 코딩을 시키지 말고,
제품 방향을 정하고, 명세를 쓰고, 계획을 세우고,
작게 만들고, 테스트하고, 리뷰하고, 기록하게 만든다.
```

---

## 16. One-Line Rule

```text
Blueprint first, spec before build, small slices only, build must pass, log every meaningful change.

Three models: GLM builds, Codex makes it run, Claude judges and verifies.
Claude is scarce — escalate non-running code to Codex, not Claude.
```

한국어로는:

```text
먼저 제품 방향을 잡고, 명세 후 구현하고, 작게 만들고, 빌드를 통과시키고, 의미 있는 변경은 기록한다.

3-모델: GLM으로 만들고, Codex로 돌게 만들고, Claude로 판단·검증한다. Claude(Pro)는 희소 자원이니 깊은 판단에만 쓰고, 안 도는 코드는 Claude가 아니라 Codex로 올린다.
```


---

## 17. Multi-Agent Handoff Protocol (Claude × Codex × GLM)

> 역할 분담의 "무엇을(what)"은 0장에 이미 정의되어 있습니다. 이 장은 "한 모델이 작업을 마치고 다음 모델에게 어떻게 넘기는가(handoff)"만 다룹니다. 0장과 내용이 겹치면 0장이 우선합니다.

### 세션 시작 시 (START)

1. `docs/HANDOFF.md`를 읽는다 (가장 먼저).
2. `docs/AGENT_WORKFLOW.md`를 읽는다 — 이 문서 전체가 규칙 원본입니다.
3. `docs/DEV_LOG.md`의 Current Status를 읽는다.
4. (CLAUDE.md 또는 AGENTS.md를 통해 자동으로 로드된) 자신의 역할 노트를 확인한다.
5. `docs/HANDOFF.md`에 적힌, 자신에게 배정된 작업만 진행한다.

### 세션 종료 시 (FINISH)

1. build/test를 돌리고 변경을 커밋한다(가능하면 push). 커밋하지 않은 변경을 남기고 인계하지 않는다.
2. `docs/DEV_LOG.md`의 Current Status와 Build/Test Log를 갱신한다.
3. `docs/HANDOFF.md`를 다음 모델 기준으로 새로 쓴다 — 마지막 커밋 해시 포함 (이전 버전은 `docs/handoff_history/`로 옮긴다).
4. 18장의 "Universal Output Block" 형식으로 다음 모델·다음 작업·이유를 채팅 응답 끝에도 남긴다.

작업은 인계(ownership transfer)가 끝나기 전까지 완료된 것으로 보지 않습니다.

### Build/Test 에스컬레이션 — 0장 3단 사다리 빠른 참조

> 아래는 0장 "3단 에스컬레이션 사다리"(상세는 /build 장 "막히는 코드 처리: GLM → Codex → Claude")의 요약표입니다. **`/build`·`/test`에서 코드가 안 도는 상황에만** 적용됩니다. `/blueprint`, `/spec`, `/prd`, `/plan`, `/review`처럼 처음부터 Claude가 담당하는 단계는 이 사다리와 무관하며, 0장의 "워크플로우 단계별 담당 모델" 표를 그대로 따릅니다.

| 단계 | 담당 | 조건 |
|---|---|---|
| 1차 | GLM (z.ai) | 기본값. 빌드/테스트 실패 시 에러를 되먹여 1~2회 자가수정 |
| 2차 | Codex | GLM이 1~2회로 못 고치거나, 라이브러리/프레임워크 최신 관용구가 필요할 때 |
| 3차 | Claude | 설계·로직·아키텍처·보안 차원의 문제일 때만 |

### 상황별 빠른 참조

| 상황 | 담당 |
|---|---|
| Framework/library 호환성 문제, compile/runtime 에러 | Codex (GLM 1~2회 자가수정 후) |
| 대량 CRUD·테스트·문서 | GLM |
| 아키텍처·보안·비즈니스 규칙 판단 | Claude |

### Human-in-the-loop (현재는 90/10)

Claude Code, Codex, GLM(z.ai 직접 구독을 지원하는 별도 CLI/에이전트 도구로 실행)은 서로 다른 제품이라, 한쪽이 다른 쪽을 자동으로 호출하지 못합니다. 지금 단계에서 사람(운영자)의 역할은 다음과 같습니다.

1. `docs/HANDOFF.md`에 적힌 다음 모델을 확인하고 해당 도구를 연다.
2. 새 세션이 `docs/HANDOFF.md`를 읽게 한다 — CLAUDE.md/AGENTS.md를 통해 자동으로 읽히거나, 직접 내용을 붙여넣는다.
3. 작업을 이어가게 한다.

그 외(무엇을 할지, 왜 하는지, 무엇을 건드리면 안 되는지)는 이미 프로젝트 문서 안에 있어야 합니다 — 사람이 매번 설명을 다시 쓸 필요가 없도록 만드는 것이 이 장의 목적입니다.

### 향후 CLI 자동화 (선택)

세 도구 모두 스크립트로 호출 가능한 인터페이스를 제공합니다 — Claude Code의 `claude -p`(headless), Codex의 `codex exec`, 그리고 GLM은 사용 중인 도구의 headless/비대화형 실행 모드(z.ai 구독으로 인증)를 씁니다. 이를 이용해 오케스트레이터 스크립트를 만들 수도 있지만, 이 경우에도 문서 구조는 바뀌지 않습니다.

1. `docs/HANDOFF.md`를 읽는다
2. 다음 담당 모델을 판별한다
3. 해당 CLI를 호출한다
4. 출력을 캡처한다
5. `docs/HANDOFF.md` · `docs/DEV_LOG.md` · `docs/handoff_history/`를 갱신한다

---

## 18. HANDOFF.md 템플릿 & Universal Output Block

`docs/HANDOFF.md`는 항상 최신 버전 하나만 존재합니다. 새로 쓸 때 이전 버전은 `docs/handoff_history/YYYY-MM-DD-HHmm.md`로 옮겨 보관합니다.

```markdown
# Handoff

## Current Owner
[방금까지 작업한 모델]

## Completed Work
[이번 세션에서 한 일]

## Current Stage
[/blueprint | /spec | /plan | /build Slice N | /test | /review | /log]

## Next Owner
[Claude | Codex | GLM]

## Next Task
[다음에 할 구체적 작업]

## Reason For Handoff
[왜 이 모델이어야 하는지 — 0장 표 기준으로 설명]

## Priority
[High | Medium | Low]

## Files Changed
- [파일1]
- [파일2]

## Last Commit
[커밋 해시 / 브랜치 — 커밋 없이 인계 금지]

## Files To Touch Next
- [파일1]

## Context Summary
[다음 모델이 알아야 할 핵심 맥락 3~5줄]

## Known Issues
[현재 알려진 문제]

## Escalation Rules
[이 작업이 막히면 누구에게 넘길지 — 17장 표 참고]

## Do NOT
[다음 모델이 하면 안 되는 것]
```

세션을 마칠 때는 채팅 응답 마지막에도 짧게 같은 정보를 남깁니다. HANDOFF.md 파일을 깜빡 안 읽고 넘어가는 사고를 줄이기 위한 이중 안전장치입니다.

```text
NEXT OWNER: [Claude | Codex | GLM]
NEXT TASK: [구체적 작업]
WHY: [이유]
FILES: [변경/예정 파일]
COMMIT: [마지막 커밋 해시]
RISKS: [리스크]
```

---

## 19. Model Guide Files (CLAUDE.md / AGENTS.md)

프로젝트 루트에 짧은 포인터 파일 두 개만 둡니다. 내용을 따로 적지 말고 `docs/AGENT_WORKFLOW.md`와 `docs/HANDOFF.md`를 가리키게만 합니다 — 규칙을 두 곳에 적으면 한쪽이 갱신되지 않아 어긋나기 쉽습니다.

### CLAUDE.md (Claude Code가 세션 시작 시 자동으로 읽음)

```markdown
# Claude Code Instructions

Before doing anything, read in this order:
1. docs/HANDOFF.md
2. docs/AGENT_WORKFLOW.md
3. docs/DEV_LOG.md (Current Status section)

Your role: judgment, architecture, planning, security, deep logic bugs, final review.
Never perform large-volume repetitive implementation — that belongs to GLM.
If code simply doesn't run, that's Codex's job, not yours, unless it's a design/logic/architecture issue.

At the end of every session, commit your changes, then update docs/HANDOFF.md (with the commit hash) and docs/DEV_LOG.md before finishing.
```

### AGENTS.md (Codex 등 이 컨벤션을 따르는 도구가 자동으로 읽음)

```markdown
# Agent Instructions (Codex / GLM)

Before doing anything, read in this order:
1. docs/HANDOFF.md
2. docs/AGENT_WORKFLOW.md
3. docs/DEV_LOG.md (Current Status section)

## If you are Codex
Produce runnable code. Fix framework/library issues and compile errors.
Keep changes minimal. Never redesign architecture — escalate that to Claude.

## If you are GLM (z.ai)
Produce high-volume implementation, tests, and documentation.
Retry self-fixing build/test failures up to 2 times.
If still failing and it is a runnability/idiom issue, escalate to Codex.
If it is an architecture/security/business-rule issue, escalate to Claude.

At the end of every session, commit your changes, then update docs/HANDOFF.md (with the commit hash) and docs/DEV_LOG.md before finishing.
```

> **참고:** GLM 모델은 z.ai에서 직접 구독해, z.ai가 지원하는 CLI/에이전트 도구로 돌립니다. 사용하는 GLM 도구가 AGENTS.md 컨벤션을 자동으로 읽으면 위 파일 하나로 Codex와 GLM 양쪽에 자동 적용되고, 자동으로 읽지 않는 도구라면 세션 시작 시 "AGENTS.md를 먼저 읽어라" 한 줄만 직접 지시합니다. 만약 GLM을 Claude Code(z.ai 엔드포인트)로 돌리게 된다면 그 세션은 CLAUDE.md를 읽으므로, CLAUDE.md에 "docs/HANDOFF.md의 Next Owner가 GLM이면 AGENTS.md의 GLM 역할을 따르라"는 분기 한 줄을 추가해야 합니다. 어떤 경우든 핵심 작업 규칙은 중복 없이 docs/AGENT_WORKFLOW.md 하나에만 유지합니다.

---

## 20. Golden Rule

```text
Project state belongs to files, never to chat history.
```

세션이 끝나면 채팅 맥락은 사라지고, Claude·Codex·GLM은 서로 다른 제품이라 서로의 대화 기록을 공유하지 않습니다. 그래서 프로젝트의 진짜 상태는 항상 `docs/HANDOFF.md`, `docs/DEV_LOG.md`, `docs/AGENT_WORKFLOW.md` 같은 파일 안에 있어야 합니다. 어떤 모델도 "아까 얘기했잖아"에 의존해서는 안 됩니다.
