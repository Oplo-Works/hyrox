# Product Blueprint — NY/NJ Hybrid Race Club Website

## App Name

- English: **NY/NJ Hybrid Race Club**
- Korean: **뉴욕/뉴저지 하이브리드 레이스 클럽**
- Descriptor: HYROX · Mini HYROX · 5K · Half Marathon

## Target Users

### Primary Users
- Korean-speaking adults in NY/NJ interested in HYROX, running, or fitness races
- People who recently discovered HYROX and want to start training
- People who want to train with others instead of alone
- People preparing for 5K or half marathon events
- Beginners who may feel intimidated by intense training groups

### Secondary Users
- English-speaking friends, coworkers, or community members
- Existing runners curious about hybrid fitness racing
- People who want a weekend fitness group in NY/NJ

## User Personas

1. **Beginner Korean expat (NY/NJ)** — Discovered HYROX online, wants to try but feels intimidated. Needs reassurance that beginners are welcome. Prefers Korean but comfortable with English.
2. **Intermediate runner** — Already runs 5K/half marathons, curious about HYROX hybrid format. Wants a community to train with on weekends.
3. **English-speaking community member** — Friend or coworker invited via Kakao OpenChat. Needs to quickly understand what the group is and how to join.

## Pain Points
- HYROX feels intimidating for beginners
- Training alone is hard to sustain
- Hard to find a Korean-and-English-friendly fitness community in NY/NJ
- Official HYROX info is scattered and English-only
- Unsure where/when local group meets

## Value Proposition
> A welcoming NY/NJ community where you can train for HYROX, Mini HYROX, 5K, and Half Marathon with others — regardless of your level. Bilingual (Korean/English), beginner-friendly, and easy to join via Kakao OpenChat.

## MVP Features
- Mobile-first single landing page
- Bilingual (English + Korean together) content
- Hero with clear club identity and primary CTA
- Next meetup info (day, time, location area, format, fee, what to bring)
- What We Train section (HYROX, Mini HYROX, 5K, Half Marathon, Strength, Beginner sessions)
- Upcoming goals/events board
- All Levels Welcome section
- Join Kakao OpenChat section (button + optional QR)
- FAQ section
- Sticky mobile CTA
- Footer with non-official event registration disclaimer
- SEO metadata + Open Graph support
- Editable static data config file (`data/site.ts`)

## v1 Features (after MVP)
- RSVP for sessions
- Weekly training calendar
- Photo gallery
- Race countdown timer
- Beginner guide content
- Instagram/Threads embed

## v2/Later Features
- Member profiles / login
- Payment / membership system
- Admin dashboard / CMS
- Newsletter signup
- Training program library
- Official race registration integration
- Liability waiver flow
- Don/Clinic profile pages (if desired later)
- HYROX affiliate/partner section (if proper materials provided)

## Core User Flow
1. Visitor lands on hero → instantly understands: NY/NJ club, HYROX/running, all levels welcome
2. Scrolls to Next Meetup → sees practical info (when, where, fee, what to bring)
3. Scrolls to What We Train → sees scope beyond HYROX
4. Scrolls to Upcoming Goals → sees the group is training toward real events
5. Scrolls to All Levels Welcome → fear reduced
6. Clicks Kakao OpenChat CTA (hero / sticky bar / final section) → joins community

## Monetization
- MVP: No payment. Free community group.
- Later: Optional fee sessions, paid training programs, affiliate partnerships (if properly licensed)

## UX Risks
- Too much text could overwhelm mobile users
- Bilingual content could feel cluttered if not spaced well
- Missing real meetup details (TODOs) could feel unfinished
- HYROX branding could look too official if not careful
- Sticky CTA could cover important content on small screens

## Tech Risks
- No real images yet — need clean abstract placeholders
- Kakao OpenChat URL unknown at build time — needs TODO fallback
- Font loading (Korean + condensed English headings) could hurt performance
- Framer Motion could slow mobile if overused

## Business Risks
- Appearing as official HYROX site (legal/brand risk)
- Appearing as a clinic/medical service (compliance risk)
- Hardcoding meetup details that go stale
- No real event dates yet — could feel inactive

## Out of Scope (MVP)
- HYROX logo / official branding
- HYROX affiliate/partner claims
- Don Clinic name / logo / address / profile / photo / bio
- Medical/PT claims
- Injury/liability waiver
- Payment or checkout
- User login / member directory
- Official race registration
- Official-looking HYROX event page design