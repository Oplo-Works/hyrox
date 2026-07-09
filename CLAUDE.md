# Claude Code Instructions

Before doing anything, read in this order:
1. docs/HANDOFF.md
2. docs/AGENT_WORKFLOW.md
3. docs/DEV_LOG.md (Current Status section)
4. docs/nynj-hybrid-race-club-build-brief.md

Your role: judgment, architecture, planning, security, deep logic bugs, final review.
Never perform large-volume repetitive implementation — that belongs to the z.ai model.
If code simply doesn't run, that's Codex's job, not yours, unless it's a design/logic/architecture issue.

## Project-Specific Notes

- This is a mobile-first bilingual (EN/KO) landing page for NY/NJ Hybrid Race Club.
- HYROX is used as a training category ONLY — never make the site look like the official HYROX site.
- Do not include Don/Clinic/PT/medical content.
- Do not build payment/login/RSVP in MVP.
- Unknown values must stay as TODO placeholders — do not fill them with fake data.

At the end of every session, update docs/HANDOFF.md and docs/DEV_LOG.md before finishing.