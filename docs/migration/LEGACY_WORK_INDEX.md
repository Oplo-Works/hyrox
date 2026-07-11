# Legacy Work Index (pre-v8.1.1)

Built during the v8.1.1-solo adoption from Git history (11 commits), `docs/DEV_LOG.md`,
`docs/HANDOFF.md`, and existing project artifacts. Grouped by meaningful feature/milestone
(not one row per commit). No retroactive SPEC/PLAN/approval/evidence was invented. A current
full-project build does not retroactively prove each historical item.

Adoption base HEAD: `2663a83`. Baseline `npm run build` at adoption: **PASS**.

| Legacy item | Existing status | Relevant commits | Existing artifacts | Verification class | Evidence basis | Adoption action | Follow-up |
|---|---|---|---|---|---|---|---|
| MVP landing page (Slices 1–7: layout, 14 components, sections, i18n, a11y, metadata) | completed | `cd34c0b` | `app/`, `components/`, `data/site.ts`, `docs/PRODUCT_BLUEPRINT.md`, `docs/nynj-hybrid-race-club-build-brief.md` | VERIFIED_DURING_ADOPTION (build) / COMPLETED_BUT_UNVERIFIED (no per-slice TEST_EVIDENCE files) | DEV_LOG build logs (2026-07-09 build PASS) + adoption baseline build PASS; no formal test-evidence artifacts existed under v7 | preserved; indexed | none |
| Netlify deployment config | completed | `2da7cb5`, `7ebfab8` | `netlify.toml`, DEV_LOG/HANDOFF deploy notes | COMPLETED_BUT_UNVERIFIED | `netlify.toml` present + push-to-main documented; actual deploy success not observable from this environment | preserved; env facts moved to PROJECT_SCOPE §6 | Owner: confirm latest deploy is green in Netlify dashboard |
| Kakao OpenChat link (primary conversion) | completed | `c07e251`, `96a3446` | `data/site.ts` (`kakaoOpenChatUrl`) | VERIFIED_BY_EXISTING_EVIDENCE | DEV_LOG marks issue #001 Resolved with the real URL | preserved; indexed | none |
| Header club-name typography + header/Hero height sync | completed | `2aee4b8` | `components/Header.tsx`, `components/Hero.tsx` | COMPLETED_BUT_UNVERIFIED | commit + DEV_LOG entry; no separate evidence file | preserved; indexed | none |
| Codex review pass (build/lint/audit, 320/375/390 render, a11y) | completed | `88c719a` | DEV_LOG "Codex 리뷰 수행" rows, Open Issues #009–#013 | VERIFIED_BY_EXISTING_EVIDENCE | DEV_LOG records the review findings and results | preserved; indexed | Open issues #009 (next security patch), #011 (sticky CTA focus), #013 (320px polish) remain backlog |
| Mobile scroll energy (progress line, lanes, section reveal) | completed | `41ec5a5` | `components/ScrollEnergy.tsx`, `app/globals.css` | COMPLETED_BUT_UNVERIFIED | commit + DEV_LOG; 390px scroll check noted in DEV_LOG | preserved; indexed | none |
| Nitro shoe colorway retheme + FAQ focus a11y fix + WCAG contrast | completed | `fc05aeb` | `app/globals.css`, `tailwind.config.ts`, 9 components, build brief palette | VERIFIED_DURING_ADOPTION | this session: build PASS + live-DOM computed-style checks + 4-lens verification workflow; issue #014 (FAQ focus) resolved | preserved; indexed | Follow-ups #007/#010 (OG image), #015 (domain/OG assets) |
| v7 workflow governance (Claude × Codex × GLM) | superseded | `6129356`, `2663a83` | (archived) `docs/archive/workflow/pre-v8.1.1-*` | SUPERSEDED | replaced by this v8.1.1-solo adoption | archived byte-for-byte; active pointer at `docs/AGENT_WORKFLOW.md` | none — v8.1.1 is the only active workflow |

## Notes

- Verification classes used: VERIFIED_BY_EXISTING_EVIDENCE, VERIFIED_DURING_ADOPTION,
  COMPLETED_BUT_UNVERIFIED, SUPERSEDED. "Completed-but-unverified" is an honest result where
  no formal test-evidence artifact existed under the prior workflow.
- Future changes to any legacy item start a **new v8.1.1 task** (WF:SPEC_PLAN or WF:MICRO by risk).
- Open backlog issues live in the archived v7 DEV_LOG (`docs/archive/workflow/pre-v8.1.1-*/docs/DEV_LOG.md`,
  Open Issues table) and in PROJECT_SCOPE §6; they were not re-verified during adoption.
