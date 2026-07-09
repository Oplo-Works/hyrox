# Project Scope — NY/NJ Hybrid Race Club Website

## Current MVP

The current MVP includes:

- Mobile-first single landing page (Next.js App Router)
- Bilingual content (English + Korean shown together)
- Hero section with club identity + primary CTA
- Next Meetup section (day, time, location area, format, level, fee, what to bring)
- What We Train section (6 training type cards)
- Upcoming Goals / Events section (HYROX, Mini HYROX, 5K, Half Marathon)
- All Levels Welcome section (Beginner / Build / Race Prep)
- Join Kakao OpenChat section (button + QR placeholder)
- FAQ section (6 questions)
- Footer with non-official event registration disclaimer
- Sticky mobile bottom CTA
- SEO metadata + Open Graph tags
- Editable static data config (`data/site.ts`)
- Accessibility basics (semantic HTML, one h1, alt text, reduced motion)
- Responsive at 320px / 375px / 390px / 768px / desktop

## Not Included in MVP

The following are later phases:

- RSVP system
- Weekly training calendar
- Member profiles / login
- Payment / checkout
- Admin dashboard / CMS
- Newsletter signup
- Full blog / training program library
- Official race registration
- Liability waiver flow
- Photo gallery
- Race countdown timer
- Don / Clinic profile pages
- HYROX affiliate/partner section

## Core Users

- Korean-speaking adults in NY/NJ interested in HYROX / running
- Beginners intimidated by intense training groups
- Intermediate runners curious about hybrid fitness racing
- English-speaking community members invited via OpenChat

## Core Workflows

1. Land on hero → understand club identity in <5 seconds
2. View Next Meetup → get practical joining info
3. View What We Train → see scope beyond HYROX
4. View Upcoming Goals → see group is training toward real events
5. View All Levels Welcome → fear reduced
6. Click Kakao OpenChat CTA → join community

## Data Rules

- All editable content lives in `data/site.ts`
- Unknown values use clearly labeled `TODO_` placeholders
- No real user/customer data in demo
- No hardcoded official race dates unless owner provides them
- Exact meetup location is not public — shared in OpenChat only

## Security / Privacy Rules

- No user accounts or personal data collection in MVP
- No payment information
- External links use `rel="noopener noreferrer"` and open in new tab
- No invasive tracking
- Optional analytics only tracks anonymous CTA clicks

## Role-Based Visibility

| Role | Allowed Data | Hidden Data |
|---|---|---|
| Public (site visitor) | Club name, meetup area, training types, event statuses, OpenChat link | Exact meetup location, member info, internal notes |
| OpenChat member | Exact meetup location, training updates, event details | N/A (shared in chat) |
| Admin (future) | All site data | N/A |

## HYROX Usage Rules

Allowed:
- "HYROX training" / "HYROX prep" as training category
- "Training for HYROX, Mini HYROX, 5K, and Half Marathon"
- "Community training group for people interested in HYROX"

Not allowed:
- "Official HYROX NY/NJ"
- "HYROX Partner Gym"
- "Official HYROX Training Center"
- "Register for HYROX here"
- HYROX official logo / images

## Future Expansion

- RSVP + weekly calendar
- Member PR board
- Race countdown
- Photo gallery
- Beginner guide + training plans
- Admin-editable schedule
- Email/SMS updates
- Social media embeds
- Waiver / attendance form
- Don/Clinic profile (if desired)
- HYROX affiliate section (if properly licensed)