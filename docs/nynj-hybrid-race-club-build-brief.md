# NY/NJ Hybrid Race Club Website — Coding Agent Build Brief

Version: MVP v0.1  
Prepared for: Website build coding agent  
Primary audience: NY/NJ Korean and English-speaking people interested in HYROX, Mini HYROX, 5K, and Half Marathon training  
Primary device: Smartphone / mobile browser  
Primary conversion: Kakao OpenChat join

---

## 0. Executive Summary

Build a **mobile-first, high-energy, bilingual landing website** for a community club currently introduced through HeyKorean/Kakao OpenChat.

The website should present the club as a **NY/NJ community for HYROX, Mini HYROX, 5K, and Half Marathon training**. The tone should be energetic, welcoming, and action-oriented.

This is an MVP. Keep the site simple, fast, and easy to update. The first version should focus on:

1. Explaining what the club is.
2. Showing the next meetup information.
3. Showing upcoming HYROX / Mini HYROX / 5K / Half Marathon goals.
4. Making it easy to join the Kakao OpenChat.

Do **not** build a complex membership platform, RSVP system, login, payment system, or official HYROX-style brand site in this version.

---

## 1. Hard Requirements

### 1.1 Must Include

The MVP website must include the following information:

- Club name
- HYROX, Mini HYROX, 5K, Half Marathon positioning
- Mobile-friendly layout
- English and Korean content together
- Meetup location area
- Meetup day and time
- Participation fee status
- Kakao OpenChat link
- Kakao OpenChat CTA buttons
- Beginner-friendly messaging
- Upcoming event / race schedule section
- Clear statement that all levels are welcome

### 1.2 Must Not Include in MVP

Do **not** include the following in the first version:

- HYROX logo
- HYROX affiliate/partner claims
- HYROX official designation claims
- Don Clinic name
- Clinic logo
- Clinic address
- Don profile
- Don photo
- Don biography
- Medical/PT claims
- Injury/liability waiver
- Payment or checkout
- User login
- Member directory
- Official race registration function
- Official-looking HYROX event page design

### 1.3 HYROX Usage Rule for MVP

The word **HYROX** may be used as a training/event category, but the site must not appear to be the official HYROX website.

Allowed MVP usage examples:

- “HYROX training”
- “HYROX prep”
- “Training for HYROX, Mini HYROX, 5K, and Half Marathon”
- “Community training group for people interested in HYROX and hybrid fitness racing”

Avoid wording such as:

- “Official HYROX NY/NJ”
- “HYROX New York Official Club”
- “HYROX Partner Gym”
- “Official HYROX Training Center”
- “Register for HYROX here”

Footer should clarify:

> Community training group for people interested in HYROX, running, and hybrid fitness races. This is not an official event registration website.

Korean:

> HYROX, 러닝, 하이브리드 피트니스 레이스에 관심 있는 분들을 위한 커뮤니티 모임입니다. 본 사이트는 공식 대회 등록 사이트가 아닙니다.

---

## 2. Recommended Site Name

Use this working name unless the owner provides a different final name:

# NY/NJ Hybrid Race Club

Korean display name:

# 뉴욕/뉴저지 하이브리드 레이스 클럽

Short descriptor:

**HYROX · Mini HYROX · 5K · Half Marathon**

Rationale:

- Includes HYROX as a supported training goal without making the entire brand look like an official HYROX site.
- Allows expansion beyond HYROX into running events.
- Works naturally in both English and Korean.
- Feels like a community, not a corporate clinic or official event organizer.

---

## 3. Product Goal

The website should make a mobile visitor think:

> “This looks energetic, welcoming, and easy to join. I can train for HYROX or running events with people in NY/NJ, even if I am a beginner.”

The site must answer these questions within the first few seconds:

1. What is this group?
2. Where is it based?
3. What do they train for?
4. Can beginners join?
5. When is the next meetup?
6. How do I join?

---

## 4. Primary Conversion

Primary CTA:

**Join Kakao OpenChat**  
Korean: **카카오 오픈채팅 참여하기**

The CTA should appear in:

- Hero section
- Sticky mobile bottom bar
- Next Meetup section
- Final Join section

If QR code is provided, show both:

- Button link
- QR image

If QR code is not provided, use only the button and leave a TODO placeholder for QR.

---

## 5. Target Users

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

---

## 6. Tone and Messaging

The tone should be:

- Energetic
- Welcoming
- Community-first
- Beginner-friendly
- Direct
- Not salesy
- Not elite-only
- Not corporate
- Not medical/clinic-like
- Not official HYROX-branded

The site should feel intense and exciting visually, but the copy should make people feel comfortable joining.

Core message:

> Train together. Race together. All levels welcome.

Korean:

> 같이 운동하고, 같이 준비하고, 같이 도전합니다. 초보자부터 경험자까지 누구나 환영합니다.

---

## 7. Recommended Tech Stack

Use the existing project stack if this is being built inside an existing repo. If starting from scratch, recommended stack:

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Framer Motion for light animations
- Vercel deployment
- Static data config file for meetup and event updates

Do not over-engineer. This can be a fully static landing page with editable data.

Optional but useful:

- `next/font` for font loading
- Vercel Analytics or Plausible
- Simple JSON/TS config file for schedule updates

No database needed for MVP.

---

## 8. Suggested File Structure

If using Next.js App Router:

```txt
app/
  layout.tsx
  page.tsx
  globals.css
components/
  Header.tsx
  Hero.tsx
  NextMeetup.tsx
  TrainingTypes.tsx
  UpcomingEvents.tsx
  AllLevelsWelcome.tsx
  JoinOpenChat.tsx
  FAQ.tsx
  Footer.tsx
  StickyCTA.tsx
  SectionHeader.tsx
  EventCard.tsx
  TrainingCard.tsx
data/
  site.ts
public/
  images/
    hero-placeholder.jpg
    openchat-qr-placeholder.png
```

If the existing project uses a different structure, adapt to the existing conventions while preserving the same components and data separation.

---

## 9. Data Configuration

Create a single editable data file so the owner can update meeting details and race schedules without digging through components.

Example:

```ts
export const siteConfig = {
  clubNameEn: "NY/NJ Hybrid Race Club",
  clubNameKo: "뉴욕/뉴저지 하이브리드 레이스 클럽",
  descriptor: "HYROX · Mini HYROX · 5K · Half Marathon",
  kakaoOpenChatUrl: "TODO_ADD_KAKAO_OPENCHAT_URL",
  kakaoQrImage: "/images/openchat-qr-placeholder.png",

  nextMeetup: {
    day: "TODO: Saturday",
    time: "TODO: 8:00 AM",
    locationAreaEn: "TODO: Long Island City, NY",
    locationAreaKo: "TODO: 롱아일랜드시티, NY",
    exactLocationPublic: false,
    exactLocationNoteEn: "Exact meetup details are shared in Kakao OpenChat.",
    exactLocationNoteKo: "정확한 모임 장소는 카카오 오픈채팅에서 공유됩니다.",
    formatEn: "HYROX-style circuit + easy run",
    formatKo: "하이록스 스타일 서킷 + 가벼운 러닝",
    feeEn: "TODO: Free / $XX",
    feeKo: "TODO: 무료 / $XX",
    bringEn: ["Running shoes", "Water", "Towel"],
    bringKo: ["운동화", "물", "수건"],
  },

  trainingTypes: [
    {
      titleEn: "HYROX Training",
      titleKo: "HYROX 트레이닝",
      descriptionEn: "Run, push, pull, carry, lunge, row, and finish stronger.",
      descriptionKo: "러닝, 푸시, 풀, 캐리, 런지, 로우 등 하이브리드 레이스 훈련을 함께합니다.",
    },
    {
      titleEn: "Mini HYROX",
      titleKo: "Mini HYROX",
      descriptionEn: "Shorter community-style simulations for practice and confidence.",
      descriptionKo: "짧은 형식의 커뮤니티 연습 세션으로 감각과 자신감을 쌓습니다.",
    },
    {
      titleEn: "5K Running",
      titleKo: "5K 러닝",
      descriptionEn: "Build a running base at a manageable pace.",
      descriptionKo: "각자 페이스에 맞춰 러닝 기본기를 쌓습니다.",
    },
    {
      titleEn: "Half Marathon Prep",
      titleKo: "하프마라톤 준비",
      descriptionEn: "Train consistently toward longer-distance goals.",
      descriptionKo: "장거리 목표를 향해 꾸준히 준비합니다.",
    },
  ],

  upcomingEvents: [
    {
      type: "HYROX",
      nameEn: "HYROX Race",
      nameKo: "HYROX 대회",
      date: "TBD",
      location: "TBD",
      statusEn: "Watching official schedule",
      statusKo: "공식 일정 확인 중",
      link: "",
      noteEn: "Official registration should happen through the official event website.",
      noteKo: "공식 등록은 공식 대회 웹사이트에서 진행해 주세요.",
    },
    {
      type: "Mini HYROX",
      nameEn: "Mini HYROX Community Session",
      nameKo: "Mini HYROX 커뮤니티 세션",
      date: "TBD",
      location: "NY/NJ",
      statusEn: "Planning",
      statusKo: "준비 중",
      link: "",
      noteEn: "Community training format. Not an official race registration page.",
      noteKo: "커뮤니티 연습 형식입니다. 공식 대회 등록 페이지가 아닙니다.",
    },
    {
      type: "5K",
      nameEn: "5K Race",
      nameKo: "5K 러닝 대회",
      date: "TBD",
      location: "TBD",
      statusEn: "Training group forming",
      statusKo: "함께 준비할 멤버 모집 중",
      link: "",
      noteEn: "Open to all levels.",
      noteKo: "초보자부터 누구나 참여 가능합니다.",
    },
    {
      type: "Half Marathon",
      nameEn: "Half Marathon",
      nameKo: "하프마라톤",
      date: "TBD",
      location: "TBD",
      statusEn: "Training group forming",
      statusKo: "함께 준비할 멤버 모집 중",
      link: "",
      noteEn: "Join the OpenChat for training updates.",
      noteKo: "훈련 일정은 오픈채팅에서 확인해 주세요.",
    },
  ],
};
```

---

## 10. Page Structure

Build a single landing page with the following sections in this order.

---

### 10.1 Header

Mobile-first header.

Content:

- Club name or compact logo text: `NY/NJ Hybrid Race Club`
- CTA button: `Join`

Behavior:

- Header can be transparent over hero or dark solid.
- Keep it simple.
- On mobile, do not use a complicated menu.
- Optional: anchor links only if they do not clutter the UI.

Suggested nav links if used:

- Meetup
- Training
- Events
- Join

---

### 10.2 Hero Section

This is the most important section.

Design goal:

- Dark, high-energy, dynamic.
- Large typography.
- Clear CTA.
- Should look exciting on mobile.

Suggested English copy:

```txt
NY/NJ HYBRID RACE CLUB
HYROX · Mini HYROX · 5K · Half Marathon

Train together. Race together.
All levels welcome.
```

Suggested Korean copy:

```txt
뉴욕/뉴저지 하이브리드 레이스 클럽
HYROX · Mini HYROX · 5K · Half Marathon

같이 운동하고, 같이 준비하고, 같이 도전합니다.
초보자부터 경험자까지 누구나 환영합니다.
```

CTA buttons:

- Primary: `Join Kakao OpenChat / 카카오 오픈채팅 참여하기`
- Secondary: `See Next Meetup / 다음 모임 보기`

Visual ideas:

- Dark gradient background
- Diagonal grid lines
- Thin animated racing lines
- Subtle orange/lime glow
- Optional hero video loop if owner provides video
- If no video, use abstract motion background instead

Do not use HYROX official logo or official images.

---

### 10.3 Next Meetup Section

This section should appear immediately after hero.

Purpose:

- Show the practical joining information.
- Make the club feel active.

Suggested title:

```txt
Next Meetup / 다음 모임
```

Required fields:

- Day
- Time
- Location area
- Workout format
- Level
- Fee
- What to bring
- OpenChat CTA

Suggested display:

```txt
Saturday · 8:00 AM
Long Island City, NY
HYROX-style circuit + easy run

Level: All levels
Fee: Free / $XX
Bring: Running shoes, water, towel
```

Korean:

```txt
토요일 오전 8시
롱아일랜드시티, NY
하이록스 스타일 서킷 + 가벼운 러닝

난이도: 누구나 참여 가능
참가비: 무료 / $XX
준비물: 운동화, 물, 수건
```

If exact location is not public:

```txt
Exact meetup details are shared in Kakao OpenChat.
정확한 모임 장소는 카카오 오픈채팅에서 공유됩니다.
```

UI direction:

- Use a bold card.
- Make the date/time visually prominent.
- Add small icons if desired, but do not make it cute or childish.
- Keep the CTA visible inside the card.

---

### 10.4 What We Train Section

Purpose:

- Show the scope beyond HYROX.
- Make runners and beginners feel included.

Title:

```txt
What We Train / 우리가 함께 준비하는 것
```

Intro:

English:

```txt
We train for hybrid fitness races and running events together.
```

Korean:

```txt
하이브리드 피트니스 레이스와 러닝 이벤트를 함께 준비합니다.
```

Cards:

1. HYROX Training / HYROX 트레이닝
2. Mini HYROX / Mini HYROX
3. 5K Running / 5K 러닝
4. Half Marathon Prep / 하프마라톤 준비
5. Strength & Conditioning / 근력 & 컨디셔닝
6. Beginner-Friendly Group Sessions / 초보자 환영 그룹 운동

Mobile behavior:

- Use horizontal scroll cards or 2-column compact grid.
- On very small screens, single-column cards are fine.

---

### 10.5 Upcoming Goals / Events Section

Purpose:

- Show that the group is training toward actual goals.
- Provide a schedule board for HYROX, Mini HYROX, 5K, and Half Marathon events.

Title:

```txt
Upcoming Goals / 함께 준비하는 목표
```

Intro:

English:

```txt
We share upcoming HYROX, Mini HYROX, 5K, and Half Marathon plans here.
```

Korean:

```txt
HYROX, Mini HYROX, 5K, Half Marathon 일정을 공유하고 함께 준비합니다.
```

Each event card should include:

- Event type
- Event name
- Date
- Location
- Status
- Link if available
- Short note

Event statuses can include:

- Planning
- Training group forming
- Watching official schedule
- Registration open
- Completed

Important:

- Do not hardcode current official race dates unless the owner provides them.
- If linking to official race registration, label clearly as an external official link.
- Do not make the site look like it directly registers users for official events.

CTA under section:

```txt
Want to train for one of these? Join the OpenChat.
같이 준비하고 싶다면 오픈채팅으로 들어와 주세요.
```

---

### 10.6 All Levels Welcome Section

Purpose:

- Reduce fear for beginners.
- Make the club feel accessible.

English copy:

```txt
New to HYROX or running? You are welcome here.

You do not need to be fast.
You do not need to be experienced.
Just show up, move, and build with the group.
```

Korean copy:

```txt
하이록스나 러닝이 처음이어도 괜찮습니다.

빠를 필요 없습니다.
경험이 많을 필요도 없습니다.
같이 시작하고, 같이 꾸준히 하면 됩니다.
```

UI idea:

Show three intensity levels as non-intimidating cards:

1. Beginner / 처음 시작
2. Build / 꾸준히 준비
3. Race Prep / 대회 준비

Do not imply formal coaching or medical/PT supervision in this section.

---

### 10.7 Join Kakao OpenChat Section

Purpose:

- Final conversion section.

English copy:

```txt
Join the Club

Most updates happen in Kakao OpenChat.
Join to see meetup details, training updates, and upcoming race plans.
```

Korean copy:

```txt
참여 방법

모임 일정, 장소, 운동 내용, 대회 일정은 카카오 오픈채팅에서 공유합니다.
관심 있으신 분들은 편하게 들어와 주세요.
```

CTA:

```txt
Join Kakao OpenChat
카카오 오픈채팅 참여하기
```

If QR exists:

- Show QR image in a card.
- Add text: `Scan to join / QR로 참여하기`.

If QR does not exist:

- Hide QR or show a placeholder only in development.
- Do not ship broken image.

---

### 10.8 FAQ Section

Keep FAQ short.

Recommended FAQs:

#### Q1. Can beginners join?

EN:

```txt
Yes. All levels are welcome, from first-timers to experienced athletes.
```

KO:

```txt
네. 처음 시작하는 분부터 경험자까지 누구나 참여할 수 있습니다.
```

#### Q2. Do I need HYROX experience?

EN:

```txt
No. You can join even if you are just getting started with HYROX or hybrid fitness training.
```

KO:

```txt
아니요. HYROX를 막 시작하는 분들도 환영합니다.
```

#### Q3. Do I need to be a good runner?

EN:

```txt
No. We prepare for 5K, Half Marathon, and HYROX at different paces.
```

KO:

```txt
아니요. 각자 페이스에 맞춰 5K, 하프마라톤, HYROX를 준비합니다.
```

#### Q4. Is there a fee?

EN:

```txt
Current fee information is listed in the meetup section and updated in Kakao OpenChat.
```

KO:

```txt
현재 참가비 정보는 모임 안내 섹션과 카카오 오픈채팅에서 확인할 수 있습니다.
```

#### Q5. Where do you meet?

EN:

```txt
We mainly meet around the NY/NJ area. Exact details are shared in Kakao OpenChat when needed.
```

KO:

```txt
주로 NY/NJ 지역에서 모입니다. 자세한 장소는 필요 시 카카오 오픈채팅에서 공유됩니다.
```

#### Q6. Is the group Korean-only?

EN:

```txt
No. Korean and English are both welcome.
```

KO:

```txt
아니요. 한국어와 영어 모두 가능합니다.
```

---

### 10.9 Footer

Include compact footer.

Content:

- Club name
- Kakao OpenChat CTA/link
- Non-official event registration note

Footer note:

EN:

```txt
Community training group for people interested in HYROX, running, and hybrid fitness races. This is not an official event registration website.
```

KO:

```txt
HYROX, 러닝, 하이브리드 피트니스 레이스에 관심 있는 분들을 위한 커뮤니티 모임입니다. 본 사이트는 공식 대회 등록 사이트가 아닙니다.
```

Do not include legal waiver language in MVP.

---

## 11. Sticky Mobile CTA

Add a sticky bottom CTA on mobile.

Behavior:

- Visible after user scrolls past hero or always visible from load.
- Safe-area compatible for iPhone.
- Does not cover important content.
- Button text:

```txt
Join OpenChat / 오픈채팅 참여
```

Click target:

- Opens Kakao OpenChat URL.
- External link should open in a new tab/window.

---

## 12. Visual Direction

The UI should feel intense, dynamic, and motivating. Think:

- Race energy
- Training intensity
- Stopwatch/countdown
- Motion lines
- Dark gym lighting
- Running track lines
- Strong typography

### 12.1 Suggested Color Palette

Use a custom palette that does not copy HYROX official branding too closely.

Suggested tokens:

```css
--color-bg: #080A0F;
--color-bg-soft: #10141C;
--color-card: #151A23;
--color-card-border: rgba(255,255,255,0.10);
--color-text: #F8FAFC;
--color-muted: #AAB2C0;
--color-orange: #FF6A2A;
--color-lime: #C8FF3D;
--color-red-orange: #FF3D1F;
--color-line: rgba(255,255,255,0.12);
```

### 12.2 Typography

Recommended:

- Heading: bold condensed font, e.g. `Bebas Neue`, `Oswald`, `Anton`, or similar
- Body English: `Inter`, `system-ui`, or similar
- Body Korean: `Noto Sans KR`, `Pretendard`, or system sans

Use large, punchy uppercase headings, but keep body copy highly readable.

### 12.3 Motion

Use motion carefully.

Good ideas:

- Hero text enters with a quick fade/slide.
- Background lines move subtly.
- Event cards animate on scroll.
- CTA button has slight pulse/glow.
- Countdown numbers update if a real date exists.

Avoid:

- Heavy animations that slow mobile.
- Too many scroll effects.
- Autoplay audio.
- Long video loads.

Must support reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 13. Imagery and Assets

### 13.1 First Version Assets

The site can launch with minimal assets.

Required:

- No HYROX logo
- No official HYROX images
- No clinic images
- Kakao OpenChat link

Optional but recommended:

- 1 hero background image or short video from the actual group
- 3 to 5 training photos
- 1 group photo
- QR code image for OpenChat
- Social share image / OG image

### 13.2 Placeholder Rules

If real images are not available:

- Use abstract dark gradient/motion background.
- Do not use stock photos that look too fake.
- Do not scrape official HYROX photos.
- Do not ship broken placeholders.

---

## 14. Mobile UX Requirements

The website must be designed for smartphone use first.

Minimum requirements:

- Looks good at 320px width.
- Optimized for 375px and 390px mobile widths.
- CTA buttons minimum 44px height.
- Sticky CTA safe for iPhone bottom area.
- No tiny text.
- No wide desktop-only layouts.
- No horizontal overflow except intentional card carousels.
- Fast loading on mobile networks.
- Clear section spacing.
- Event cards easy to scan.

Desktop should look good, but mobile is the priority.

---

## 15. Bilingual Content Strategy

Do not implement a complex language switcher for MVP unless the existing codebase already has i18n.

Recommended approach:

- Show English and Korean together in each major section.
- Use English for short punchy headlines.
- Use Korean for explanatory warmth and clarity.
- Keep both languages short.

Example pattern:

```txt
TRAIN TOGETHER. RACE TOGETHER.
같이 운동하고, 같이 준비하고, 같이 도전합니다.
```

This is better for MVP than separate English/Korean pages.

---

## 16. SEO and Sharing

### 16.1 Metadata

Set page title:

```txt
NY/NJ Hybrid Race Club | HYROX, 5K & Half Marathon Training
```

Meta description:

```txt
NY/NJ community for HYROX, Mini HYROX, 5K, and Half Marathon training. All levels welcome. Join through Kakao OpenChat.
```

Korean can be included in description if space allows:

```txt
HYROX, Mini HYROX, 5K, Half Marathon을 함께 준비하는 NY/NJ 운동 커뮤니티입니다. 초보자 환영.
```

### 16.2 Open Graph

Create or reserve support for:

- `og:title`
- `og:description`
- `og:image`
- `twitter:card`

OG image should be 1200x630.

Suggested OG image text:

```txt
NY/NJ HYBRID RACE CLUB
HYROX · Mini HYROX · 5K · Half Marathon
Train Together. Race Together.
```

Do not include HYROX official logo in OG image.

### 16.3 Structured Data

For MVP, structured data is optional.

Do not add `LocalBusiness` schema unless there is a public address and official organization details.

A simple `WebSite` schema is acceptable if already part of the project pattern.

---

## 17. Accessibility Requirements

- Use semantic HTML sections.
- Use one `h1` only.
- Use logical heading order.
- Buttons and links must be keyboard accessible.
- Ensure sufficient contrast.
- Add `aria-label` for icon-only buttons.
- All images need useful alt text.
- Decorative visuals should have empty alt text or be CSS backgrounds.
- Support reduced motion.
- Avoid text embedded in images unless repeated in HTML.

---

## 18. Performance Requirements

Target:

- Lighthouse mobile performance: 90+ if possible
- No heavy animation libraries beyond what is already needed
- No autoplay video unless optimized and muted
- Hero video must have poster fallback
- Lazy-load gallery images
- Use compressed images
- Avoid huge font bundles
- Avoid unnecessary client-side JavaScript

If using Framer Motion, keep animations minimal and component-scoped.

---

## 19. Analytics

Optional for MVP.

If analytics are added:

Track only simple events:

- OpenChat CTA click
- Event link click
- QR section view if useful

Do not add invasive tracking.

Suggested event names:

- `click_openchat_hero`
- `click_openchat_sticky`
- `click_openchat_final`
- `click_event_external`

---

## 20. Content Copy — Ready to Use

### 20.1 Hero

EN:

```txt
NY/NJ HYBRID RACE CLUB
HYROX · Mini HYROX · 5K · Half Marathon

Train together. Race together.
All levels welcome.
```

KO:

```txt
뉴욕/뉴저지 하이브리드 레이스 클럽
HYROX · Mini HYROX · 5K · Half Marathon

같이 운동하고, 같이 준비하고, 같이 도전합니다.
초보자부터 경험자까지 누구나 환영합니다.
```

### 20.2 About

EN:

```txt
We are a NY/NJ community for people training for HYROX, Mini HYROX, 5K, Half Marathon, and hybrid fitness races.

Whether you are just getting started or already preparing for race day, you are welcome to join, move, and build with the group.
```

KO:

```txt
HYROX, Mini HYROX, 5K, Half Marathon, 하이브리드 피트니스 레이스를 함께 준비하는 NY/NJ 운동 커뮤니티입니다.

이제 막 시작하는 분부터 대회를 준비하는 분까지, 각자 페이스에 맞춰 함께 운동하고 도전합니다.
```

### 20.3 Next Meetup

EN:

```txt
Next Meetup

Join our next group session for a mix of running, strength, and HYROX-style conditioning.
```

KO:

```txt
다음 모임

러닝, 근력 운동, HYROX 스타일 컨디셔닝을 함께 진행하는 그룹 세션입니다.
```

### 20.4 All Levels

EN:

```txt
New to HYROX or running? You are welcome here.

You do not need to be fast.
You do not need to be experienced.
Just show up, move, and build with the group.
```

KO:

```txt
하이록스나 러닝이 처음이어도 괜찮습니다.

빠를 필요 없습니다.
경험이 많을 필요도 없습니다.
같이 시작하고, 같이 꾸준히 하면 됩니다.
```

### 20.5 Join

EN:

```txt
Join the Club

Most updates happen in Kakao OpenChat. Join to see meetup details, training updates, and upcoming race plans.
```

KO:

```txt
참여 방법

모임 일정, 장소, 운동 내용, 대회 일정은 카카오 오픈채팅에서 공유합니다. 관심 있으신 분들은 편하게 들어와 주세요.
```

### 20.6 Footer

EN:

```txt
Community training group for people interested in HYROX, running, and hybrid fitness races. This is not an official event registration website.
```

KO:

```txt
HYROX, 러닝, 하이브리드 피트니스 레이스에 관심 있는 분들을 위한 커뮤니티 모임입니다. 본 사이트는 공식 대회 등록 사이트가 아닙니다.
```

---

## 21. UI Component Requirements

### 21.1 EventCard

Props:

```ts
type EventCardProps = {
  type: string;
  nameEn: string;
  nameKo: string;
  date: string;
  location: string;
  statusEn: string;
  statusKo: string;
  link?: string;
  noteEn?: string;
  noteKo?: string;
};
```

Behavior:

- If `link` exists, show `View details / 자세히 보기`.
- External links open in new tab.
- If no link, hide button.
- Display TBD cleanly, not as broken content.

### 21.2 TrainingCard

Props:

```ts
type TrainingCardProps = {
  titleEn: string;
  titleKo: string;
  descriptionEn: string;
  descriptionKo: string;
};
```

### 21.3 CTAButton

Props:

```ts
type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  trackingId?: string;
};
```

Behavior:

- Use real anchor tag for external Kakao link.
- Open in new tab.
- Add `rel="noopener noreferrer"`.

---

## 22. Development Steps for Coding Agent

1. Inspect existing repo structure and package manager.
2. Confirm whether this is a new app or part of an existing app.
3. Set up or use existing styling system.
4. Create `data/site.ts` or equivalent config file.
5. Build the landing page sections in the required order.
6. Implement mobile-first responsive layout.
7. Add sticky mobile CTA.
8. Add bilingual copy.
9. Add TODO placeholders for unknown details.
10. Add metadata / OG tags.
11. Add accessibility basics.
12. Test at 320px, 375px, 390px, 768px, and desktop widths.
13. Verify there is no horizontal overflow.
14. Verify all CTA links work.
15. Verify no prohibited content is included.
16. Provide screenshots or preview link.

---

## 23. Unknown Values / TODOs to Leave Easy to Update

The following values may not be known at build start. Use clearly labeled TODO placeholders in `data/site.ts`:

- Kakao OpenChat URL
- Kakao QR image
- Exact meetup day
- Exact meetup time
- Exact meetup location or area
- Fee status
- Upcoming event dates
- Upcoming event links
- Hero image/video
- Social links, if any
- Domain name

Do not block the build on missing values. Use clean fallback content.

---

## 24. Acceptance Criteria

The MVP is complete when:

- The site is one-page, mobile-first, and responsive.
- A mobile visitor can understand the club in under 5 seconds.
- Hero clearly says: NY/NJ Hybrid Race Club + HYROX / Mini HYROX / 5K / Half Marathon.
- Next meetup section shows day/time/location/fee/bring info or clean TODO fallback.
- Upcoming events section supports HYROX, Mini HYROX, 5K, Half Marathon.
- All levels welcome message is clear.
- Kakao OpenChat CTA appears at least 3 times.
- Sticky mobile CTA works.
- English and Korean are both included.
- No HYROX logo is used.
- No official HYROX affiliation claim is made.
- No clinic, Don profile, PT, medical, or waiver content is included.
- Footer includes the non-official event registration note.
- External links open safely.
- Page has metadata and OG support.
- No console errors.
- No broken images.
- No obvious mobile layout issues.

---

## 25. Non-Goals for MVP

Do not build:

- Login
- Member profiles
- Payment
- RSVP
- Admin dashboard
- CMS
- Newsletter signup
- Full blog
- Training program library
- Official race registration
- Liability waiver flow
- Clinic profile page
- Don profile page
- HYROX affiliate badge section

These can be considered later after the community grows.

---

## 26. Future Enhancements

Possible after MVP:

- RSVP for sessions
- Weekly training calendar
- Member PR board
- Race countdown
- Mini HYROX community event page
- Photo gallery
- Beginner guide
- 5K / Half Marathon training plans
- Admin-editable event schedule
- Email/SMS updates
- Instagram/Threads embed
- Waiver and attendance form
- Don/Clinic profile if desired later
- HYROX affiliate/partner section if proper materials are provided later

---

## 27. Final Build Direction

Build this as a **fast, energetic, mobile-first bilingual landing page**.

Do not make it look like a corporate clinic site.  
Do not make it look like the official HYROX site.  
Do make it feel like a real NY/NJ community that people want to join.

The emotional goal:

> “I want to train with them this weekend.”

The practical goal:

> Click Kakao OpenChat.
