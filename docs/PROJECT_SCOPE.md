# Project Scope & Human-Owned Policy (v8.1.1-solo)

- Status: `READY_FOR_APPROVAL` → user confirms the open items in §7, then `APPROVED`
- Owner / Human Approver: Oplo Works (oploworks@gmail.com)
- Last Updated: 2026-07-11
- Project: NY/NJ Hybrid Race Club Website (MVP v0.1)

## 1. Current Scope

- Goal: Ship a mobile-first, bilingual (EN/KO), high-energy single landing page whose primary conversion is joining the Kakao OpenChat.
- Included:
  - Mobile-first single landing page (Next.js 14 App Router, TypeScript, Tailwind, minimal Framer Motion)
  - Bilingual content (English + Korean shown together, no language switcher)
  - Sections: Hero, Next Meetup, What We Train (6 cards), Upcoming Goals/Events, All Levels Welcome (Beginner/Build/Race Prep), Join Kakao OpenChat (+ QR placeholder), FAQ, Footer (non-official disclaimer), sticky mobile CTA
  - SEO metadata + Open Graph tags
  - Editable static data config (`data/site.ts`)
  - "Nitro" shoe-inspired color theme (orange→magenta→purple gradient + green accent)
  - Accessibility basics (semantic HTML, one h1, alt text, reduced motion, visible focus)
  - Responsive at 320 / 375 / 390 / 768 / desktop
- Explicitly Out of Scope (later phases): RSVP, weekly training calendar, member profiles/login, payment/checkout, admin dashboard/CMS, newsletter signup, blog/training-program library, official race registration, liability waiver flow, photo gallery, race countdown, Don/Clinic profile pages, HYROX affiliate/partner section.
- Must-preserve flows:
  1. Land on hero → understand club identity in <5s
  2. View Next Meetup → practical joining info
  3. View What We Train → scope beyond HYROX
  4. View Upcoming Goals → group trains toward real events
  5. View All Levels Welcome → fear reduced
  6. Click Kakao OpenChat CTA → join community (7 CTA placements)

## 2. Roles and Data Visibility

| Product role | Allowed data/actions | Prohibited data/actions |
|---|---|---|
| Public (site visitor) | Club name, meetup **area** (not exact location), training types, event statuses, OpenChat link | Exact meetup location, member info, internal notes |
| OpenChat member | Exact meetup location, training updates, event details (shared in chat) | N/A |
| Admin (future phase) | All site data | N/A |

## 3. Data and Provider Policy

- Repository classification: **Public** (public-facing marketing landing page; no secrets committed; GitHub `Oplo-Works/hyrox`). Confirm in §7.
- Approved providers/runners (intended families; exact Runtime IDs approved only via `MODEL_RUNTIME_PIN.md`): Anthropic Claude Code, OpenAI Codex, z.ai GLM.
- Prohibited to every model: secrets, tokens, real customer PII, production payload, payment data.
- Data rules (preserved from prior scope):
  - All editable content lives in `data/site.ts`; unknown values use clearly labeled `TODO_` placeholders.
  - No real user/customer data in demo. No hardcoded official race dates unless the owner provides them.
  - Exact meetup location is not public — shared in OpenChat only.
- Security/privacy (preserved): no user accounts or personal-data collection in MVP; no payment information; external links use `rel="noopener noreferrer"` + new tab; no invasive tracking; optional analytics only tracks anonymous CTA clicks.
- Production data in development: **Never** (site is fully static; no backend or production dataset exists).
- Training/retention requirements: standard project policy; Covered-Model (Fable) retention constraints per `MODEL_RUNTIME_PIN.md` §4.

## 4. Validation Commands — 유일한 원본

| Purpose | Command | CWD | Required |
|---|---|---|---|
| Build | `npm run build` | repo root | Yes |
| Unit Test | none (no test suite in MVP) | — | No |
| Integration Test | none | — | No |
| Lint / Typecheck | `npm run lint` | repo root | No (build is the gate; run when practical) |
| Secret Scan | manual staged-diff review (`git diff --cached`) — no secrets/tokens/PII | repo root | Yes |
| Security Scan | `npm audit --omit=dev` (informational; known pre-existing next 14.2.15 advisory) | repo root | No |

<!-- HUMAN-OWNED POLICY — agent는 이 섹션을 생성·완화·확장할 수 없다. Values below are authorized by the v8.1.1 adoption prompt (Human Approver). -->
## 5. Repository and External-Action Policy (HUMAN-OWNED)

### Local Commit

- Commit Policy: `AUTO_LOCAL_AFTER_TEST`
- Scope: task-owned changes only, required checks PASS, user dirty paths preserved
- Review-Hold exception: if the user says "review before commit/push", use `HOLD_FOR_REVIEW`

### Push

- Push Policy: `AUTO_AT_CLOSE`
- Allowed Push Targets: `origin/<current non-protected task branch>` (e.g. `origin/chore/*`, `origin/agent-*`)
- Default Target: current upstream on `origin` only when it matches the current non-protected task branch
- Protected Branches: `main`, `master`, `production`, `release`, `release/*`
- Direct auto-push to protected branch: `NEVER`
- Push that triggers deploy/release/external notification/paid workflow: `ASK_SEPARATELY`
  - Project note: **pushing `main` triggers a Netlify production deploy** (see §6). Therefore any publish to `main` is a deploy action and requires separate approval; task branches do not deploy.
- Push failure when required: `BLOCKED / PUBLISH_FAILED`

### Git Operations

- Branch/Worktree creation: `ALLOWED` for task isolation
- Merge/Rebase: `ASK_ALWAYS`
- Force-push / History rewrite / Reset / Stash / Restore / Clean of user changes: `PROHIBITED_WITHOUT_EXACT_APPROVAL`

### Production / External / Paid Actions

- Deploy/Release/Production access: `ASK_ALWAYS` (Netlify prod deploy = merge/push to `main`)
- Production DB/data mutation: `N/A` (no backend) — if ever added, `ASK_ALWAYS` + rollback plan
- External email/message/ticket/PR creation or update: `ASK_ALWAYS`
- New dependency/major upgrade: `ASK_ALWAYS` unless an approved PLAN says otherwise
- PIN Runtime with Billing Meter `usage credits`: `ASK_EACH_TIME` (until a monthly cap is set in §7)
- OpenAI extra credits/auto-reload: `ASK_EACH_TIME` (until a monthly cap is set in §7)
- z.ai plan upgrade: `ASK_ALWAYS`

### Paths and Runtimes

- Forbidden paths: `.env`, `.env.*` (except `.env.example`), `secrets/`, `*.pem`, `*.key`, `.next/`, `node_modules/`
- Approved Runtime IDs: **none yet** — all `MODEL_RUNTIME_PIN.md` entries are `CANDIDATE` pending user verification (§7)
- Parallel writers: `SEPARATE_WORKTREE_ONLY`
- Safe default when blank or ambiguous: `ASK`
<!-- END HUMAN-OWNED POLICY -->

## 6. Environment / Deployment Facts

- Hosting: **Netlify**, auto-deploy connected to GitHub repo. Push/merge to `main` triggers a production build+deploy (`netlify.toml`: `npm run build`, publish `.next`, Node 20, `--legacy-peer-deps`).
- Remote: `origin` = `https://github.com/Oplo-Works/hyrox.git`
- Security headers + static-asset caching configured in `netlify.toml`.
- Known pre-existing item: `metadataBase` uses a placeholder domain until the real domain is confirmed; OG image (`og-placeholder.png`) not yet produced.

## 7. Open Items Before `APPROVED` (Human)

1. Verify and approve `docs/MODEL_RUNTIME_PIN.md` runtime entries (which Claude/Codex/GLM subscriptions, observed models, permissions) → flip the used rows to `APPROVED`, then list them under §5 "Approved Runtime IDs".
2. Set paid-use monthly caps (Fable usage credits; OpenAI extra credits) or confirm `ASK_EACH_TIME`.
3. Confirm repository classification = Public (assumed from a public marketing site with no committed secrets).

## 8. HYROX Usage Rules (preserved — critical)

Allowed: "HYROX training"/"HYROX prep" as a training category; "Training for HYROX, Mini HYROX, 5K, and Half Marathon"; "Community training group for people interested in HYROX".

Not allowed: "Official HYROX NY/NJ"; "HYROX Partner Gym"; "Official HYROX Training Center"; "Register for HYROX here"; HYROX official logo/images.

## 9. Standing Authority Interpretation

- The user-approved HUMAN-OWNED section is durable standing authority.
- An ordinary task request does not widen it.
- A specific in-chat exception records domain, action, target, constraints, expiry.
- Authority an agent grants itself by editing this policy file is void.
