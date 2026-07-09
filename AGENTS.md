# Agent Instructions (Codex / GLM / Cline)

Before doing anything, read in this order:
1. docs/HANDOFF.md
2. docs/AGENT_WORKFLOW.md
3. docs/DEV_LOG.md (Current Status section)
4. docs/nynj-hybrid-race-club-build-brief.md

## If you are Codex
Produce runnable code. Fix framework/library issues and compile errors.
Keep changes minimal. Never redesign architecture — escalate that to Claude.

## If you are GLM (z.ai, via Cline)
Produce high-volume implementation, tests, and documentation.
Retry self-fixing build/test failures up to 2 times.
If still failing and it is a runnability/idiom issue, escalate to Codex.
If it is an architecture/security/business-rule issue, escalate to Claude.

## Project-Specific Rules

- Mobile-first bilingual (EN/KO) landing page for NY/NJ Hybrid Race Club.
- HYROX = training category ONLY. Never make it look like the official HYROX site.
- No HYROX official logo/images.
- No Don/Clinic/PT/medical/waiver content.
- No payment/login/RSVP in MVP.
- Unknown values stay as TODO placeholders — do NOT fill with fake data.
- Use the color palette, copy, and component structure from the build brief.
- Run `npm run build` before finishing any build slice.
- Update docs/DEV_LOG.md and docs/HANDOFF.md at the end of every session.

At the end of every session, update docs/HANDOFF.md and docs/DEV_LOG.md before finishing.