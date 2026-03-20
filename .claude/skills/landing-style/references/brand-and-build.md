# Photography to Profits — Brand & Build Guidelines

**This skill is used when building landing pages, not software pages.**

---

## Brand Identity

- **Brand name:** Photography to Profits (also referred to as **P2P**)
- **Tagline:** _Your work is good enough. Your system isn't._
- **Audience:** Portrait photography studio owners — boudoir, newborn, maternity, family. Never agencies, never beginners.
- **Tone:** Direct, empathetic, authoritative. Write like a smart colleague who's been through it — not a sales page.
- **Never use** generic marketing language ("take your business to the next level", "unlock your potential").

---

## Colors

| Name           | Hex       | Use                                    |
| -------------- | --------- | -------------------------------------- |
| Gold           | `#C9A84C` | Primary CTA, accents, overlines, links |
| Gold Dark      | `#B89740` | Gold button hover state                |
| Gold Light     | `#E8D5A0` | Gradient highlight                     |
| Gold Deep      | `#A08530` | Gradient tail                          |
| Cream          | `#FAF9F6` | Primary page background                |
| Warm Gray      | `#F0EEEA` | Alternate section background           |
| Off-White      | `#F8F7F4` | Dashboard / active sidebar item        |
| Card Surface   | `#FAFAF8` | Inner dashboard cards                  |
| Near Black     | `#1A1A1A` | Dark sections, primary text, footer    |
| Deepest Black  | `#151515` | Footer only                            |
| Body Text      | `#555555` | Long-form paragraphs                   |
| Secondary Text | `#777777` | Subtitles, supporting copy             |
| Muted          | `#999999` | Labels, placeholders                   |
| Disabled       | `#BBBBBB` | Ghost text, hints                      |
| Success        | `#38A169` | Positive metrics                       |
| Alert          | `#E53E3E` | Negative metrics                       |
| Chart Teal     | `#2D6A6A` | Primary chart/graph lines              |

**Gold Gradient:**

```css
linear-gradient(135deg, #C9A84C 0%, #E8D5A0 40%, #C9A84C 70%, #A08530 100%)
```

Used on: hero headline text (via `background-clip: text`), modal top border bar.

---

## Typography

**Two fonts only. No others.**

| Font             | Role                           | Import       |
| ---------------- | ------------------------------ | ------------ |
| Playfair Display | Headlines, blockquotes, stats  | Google Fonts |
| DM Sans          | Body, UI, buttons, nav, labels  | Google Fonts |

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
```

### Type Scale

| Role            | Desktop | Mobile  | Font         |
| --------------- | ------- | ------- | ------------ |
| Hero H1         | 72px    | 44px    | Playfair 800 |
| Section H2      | 48px    | 32px    | Playfair 700 |
| Guide H2        | 44px    | 30px    | Playfair 700 |
| Gut-punch quote | 32px    | 22px    | Playfair 700 |
| Body large      | 18px    | 16px    | DM Sans 400  |
| Body            | 17px    | 15–16px | DM Sans 400  |
| Body small      | 15px    | 14px    | DM Sans 400  |
| Nav / UI        | 13px    | 13–16px | DM Sans 500  |
| Overline label  | 11px    | 11px    | DM Sans 600  |
| Micro / caption | 9–10px  | 9–10px  | DM Sans 700  |

### Letter Spacing

| Value     | Use                                                  |
| --------- | ---------------------------------------------------- |
| `0.22em`  | Overline labels (e.g. `THE STUDIO OPERATING SYSTEM`) |
| `0.12em`  | Gold CTA button text                                 |
| `0.10em`  | Ghost button text                                    |
| `0.08em`  | Logo wordmark                                        |
| `0.02em`  | Nav links                                            |
| `-0.03em` | Hero H1                                              |
| `-0.02em` | Section H2                                           |

### Line Height

- Headlines: `1.02–1.12`
- Body: `1.75–1.8`
- Tight UI: `1.2–1.4`

---

## Spacing

### Section Padding

| Section                     | Desktop      | Mobile      |
| --------------------------- | ------------ | ----------- |
| Problem / Internal sections | `140px 48px` | `80px 20px` |
| CTA / FAQ / Guide           | `120px 48px` | `80px 20px` |
| Proof bar                   | `52px 48px`  | `40px 20px` |
| Footer                      | `32px 48px`  | `28px 20px` |
| Nav inner                   | `0 48px`     | `0 20px`    |

### Component Gaps

| Gap    | Use                            |
| ------ | ------------------------------ |
| `56px` | Section H2 → body copy         |
| `44px` | Body copy → CTA buttons        |
| `40px` | Overline → H1 (desktop)        |
| `28px` | Testimonial card margin-bottom |
| `20px` | Gold button + Ghost button gap |
| `16px` | Dashboard inner card gap       |
| `12px` | Nav link gap (desktop)         |

### Max-Widths

| Width    | Use                         |
| -------- | --------------------------- |
| `1400px` | Nav, hero grid              |
| `1200px` | Two-column sections         |
| `1000px` | Proof bar                   |
| `760px`  | FAQ accordion               |
| `720px`  | Single-column text sections |
| `700px`  | Dark CTA section            |
| `480px`  | Hero body paragraph         |
| `460px`  | Modal                       |

---

## Border Radius

| Value   | Use                                      |
| ------- | ---------------------------------------- |
| `50%`   | Logo dot, decorative circles             |
| `100px` | CTA buttons (desktop)                    |
| `20px`  | Modal, dashboard wrapper                 |
| `16px`  | Proof cards, FAQ container               |
| `12px`  | Mobile buttons, section cards            |
| `10px`  | Form inputs, select elements             |
| `8px`   | Nav items, dashboard sidebar items, tabs |
| `6px`   | URL bar mock, small UI tags              |
| `4px`   | Hustle activity grid squares             |

---

## Shadows

| Name              | Value                                                                                  | Use                  |
| ----------------- | -------------------------------------------------------------------------------------- | -------------------- |
| Dashboard         | `0 40px 80px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.02), 0 0 0 1px rgba(0,0,0,0.03)` | Hero dashboard mock  |
| Modal             | `0 32px 64px rgba(0,0,0,0.12)`                                                         | Waitlist modal       |
| Card hover        | `0 12px 40px rgba(0,0,0,0.06)`                                                         | Proof cards on hover |
| Gold button       | `0 4px 24px rgba(201,168,76,0.25)`                                                     | Default CTA          |
| Gold button hover | `0 8px 32px rgba(201,168,76,0.35)`                                                     | Hovered CTA          |
| Card resting      | `0 1px 3px rgba(0,0,0,0.02)`                                                            | Proof cards default  |

---

## Animation

**Primary easing:** `cubic-bezier(0.16, 1, 0.3, 1)` — use for all reveal transitions, hover lifts, drawers, and accordions.

### Keyframes

| Name              | Use                           | Duration                     |
| ----------------- | ----------------------------- | ---------------------------- |
| `fadeUp`          | Scroll reveal — all sections  | `1s`                         |
| `slideUp`         | Modal entrance                | `0.4s`                       |
| `scaleIn`         | Success checkmark in modal    | `0.5s`                       |
| `shimmer`         | Gold button overlay shine     | `3s infinite`                |
| `pulse`           | Closing CTA idle state        | `3s ease-in-out infinite`   |
| `float1 / float2` | Decorative circles, hero dots | `8–12s ease-in-out infinite` |
| `fadeIn`          | Modal backdrop, success state | `0.3–0.5s`                   |

### Scroll Reveal Delay Ladder

Elements in each section animate in this order with staggered delays:

1. Overline label — `0s`
2. Section H2 — `0.1s`
3. First body paragraph — `0.15–0.2s`
4. Each subsequent paragraph — `+0.1s`
5. Gut-punch callouts / closing quotes — `0.6s+`

Hero elements use `heroReady` state (set 200ms after mount) with inline `transition` strings — not scroll-based.

---

## Components

### Gold Button (Primary CTA)

```css
background: #c9a84c;
color: #1a1a1a;
font: DM Sans 600, 13px, 0.12em letter-spacing, uppercase;
border-radius: 100px (desktop) / 12px (mobile);
padding: 18px 44px (desktop) / 16px full-width (mobile);
box-shadow: 0 4px 24px rgba(201, 168, 76, 0.25);
transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
/* Hover: background #B89740, translateY(-2px) scale(1.02), shadow upgrade */
/* ::after: shimmer overlay, 3s infinite */
```

### Ghost Button (Secondary)

```css
background: transparent;
color: #c9a84c;
border: 1.5px solid rgba(201, 168, 76, 0.4);
border-radius: 100px (desktop) / 12px (mobile);
padding: 14px 36px (desktop) / full-width (mobile);
font: DM Sans 600, 13px, 0.1em letter-spacing, uppercase;
/* Hover: border rgba(201,168,76,1.0), background rgba(201,168,76,0.06) */
```

### Proof Card (Testimonials)

- `border-radius: 16px`
- `background: #FFFFFF`
- `border: 1px solid rgba(0,0,0,0.04)`
- `box-shadow: 0 1px 3px rgba(0,0,0,0.02)`
- **Hover:** `translateY(-4px)`, shadow upgrade, `border rgba(201,168,76,0.2)`
- **Name:** DM Sans 700 15px #1A1A1A
- **Location:** DM Sans 400 12px #999
- **Stat (top-right):** Playfair 800 28px #C9A84C
- **Sub-label:** DM Sans 400 12px #777
- **Quote:** DM Sans 400 14px italic #555, padding-left 12px, border-left 2px solid rgba(201,168,76,0.3)

### Form Inputs

- `padding: 13px 14px`
- `border: 1px solid #E8E6E1`
- `border-radius: 10px`
- `font: DM Sans 400 15px`
- `background: #FAF9F6`
- **Focus:** `border-color #C9A84C`
- **Label:** DM Sans 700 11px #999 letter-spacing 0.05em uppercase

### Navigation

- Height: 72px (desktop) / 68px (mobile)
- `position: fixed`, top 0, z-index 100+
- **Scrolled:** `background rgba(250,249,246,0.92)`, `backdrop-filter blur(20px) saturate(180%)`, `border-bottom 1px solid rgba(0,0,0,0.04)`
- **Logo:** gold dot (8px circle #C9A84C) + DM Sans 700 15px 0.08em tracking
- **Nav links:** DM Sans 500 13px #777, hover #1A1A1A — use `<button>` not `<a>`; scroll to page anchors (not `href="#"`)

### Hamburger Menu (Mobile)

- 3 lines: 22px wide, 1.5px tall, 5px gap
- **Open:** line 1 → rotate 45deg, line 3 → rotate -45deg, line 2 → opacity 0
- **Drawer:** max-height 0 → 400px, transition 0.45s cubic-bezier(0.16,1,0.3,1)
- Body scroll locked while open. Close on: nav link tap, resize to desktop, outside tap
- **Nav links in drawer:** DM Sans 500 16px, full-width, border-bottom 1px solid rgba(0,0,0,0.04)
- **CTA in drawer:** gold button, full-width, border-radius 12px

### Overline Label

- Pattern: `[32px gold line] [CAPS TEXT] [32px gold line]`
- Font: DM Sans 700 11px #C9A84C 0.2em letter-spacing uppercase
- Margin-bottom: 28px
- Centered in section headers, left-aligned in two-column layouts

### FAQ Accordion

- Items: `border-bottom 1px solid rgba(0,0,0,0.06)`
- **Toggle icon:** 28px circle, border 1.5px solid rgba(201,168,76,0.4), gold +/× icon
- **Open:** icon rotate 45deg, max-height 0 → 200px, transition 0.4s cubic-bezier(0.16,1,0.3,1)
- **Question:** DM Sans 600 16px #1A1A1A
- **Answer:** DM Sans 400 15px #666 line-height 1.75

### Modal (Waitlist Form)

- **Backdrop:** rgba(0,0,0,0.5), backdrop-filter blur(4px)
- **Desktop:** centered, max-width 460px, border-radius 20px, padding 44px 40px
- **Mobile:** bottom sheet, border-radius 20px 20px 0 0, max-height 92vh, overflow-y auto
- **Top accent bar:** 3px, gold gradient, border-radius matches modal top
- **Animation:** slideUp 0.4s cubic-bezier(0.16,1,0.3,1)
- **Close:** X button top-right, clicking backdrop

---

## Mobile Rules

**Breakpoint: 768px** — use a `useIsMobile()` hook (`window.innerWidth < 768`).

| Element                | Desktop                              | Mobile                              |
| ---------------------- | ------------------------------------ | ----------------------------------- |
| Hero layout            | 2-column grid                        | 1-column stacked (text → dashboard) |
| Hero H1                | 72px                                 | 44px                                |
| Section H2             | 48px                                 | 32px                                |
| Body text              | 17–18px                              | 15–16px                             |
| CTA buttons            | Side-by-side, pill shape             | Full-width stacked, 12px radius     |
| Section padding        | `140px 48px`                         | `80px 20px`                         |
| Dashboard 3D transform | `perspective(1200px) rotateY(-2deg)` | None                                |
| Dashboard sidebar      | Visible                              | Hidden                              |
| Decorative circles     | Visible                              | Hidden                              |
| Proof bar              | Horizontal inline                    | Vertical stacked, dots hidden      |
| Guide section          | 2-column                             | 1-column                            |
| Modal                  | Centered float                       | Bottom sheet                        |
| Nav links              | Horizontal row                       | Hamburger drawer                    |
| Hero padding-top       | 72px                                 | 100px (nav clearance)               |

---

## Page Structure & Anchor IDs

Sections must use these IDs for nav scroll links:

| Section              | ID                     | Nav Label         |
| -------------------- | ---------------------- | ------------------ |
| Hero                 | _(none — top of page)_ | —                  |
| Social proof bar     | _(none)_               | —                  |
| Problem section      | `how-it-works`         | How It Works       |
| Internal problem     | _(none)_               | —                  |
| Guide + testimonials | `inside-the-system`    | Inside the System  |
| FAQ accordion        | `faq`                  | FAQ                |
| Closing CTA          | _(none)_               | —                  |

---

## Background Color Alternation

Sections alternate backgrounds:

- **Hero** → #FAF9F6
- **Proof bar** → #1A1A1A
- **Problem** → #FAF9F6
- **Internal** → #F0EEEA
- **Guide** → #FAF9F6
- **FAQ** → #F0EEEA
- **Closing CTA** → #1A1A1A
- **Footer** → #151515

---

## Voice & Copy Rules

- Use **she/her** for the studio owner persona by default.
- Name real outcomes with real numbers: e.g. `$330K`, `39 bookings`, `$5,300 average sale`.
- Always include an exclusivity qualifier near CTAs: e.g. "Studio owners only · Boudoir · Portrait · Newborn · Maternity".
- Overline labels: **THE [CATEGORY]** — all caps, gold, small, with flanking lines.
- Every CTA section must have a secondary disclaimer in muted text beneath the button.

---

## What Not To Do

- Do **not** use any font other than Playfair Display and DM Sans.
- Do **not** use cold blues, purples, or flat corporate grays.
- Do **not** center body text longer than 2 lines.
- Do **not** apply the gold gradient to more than one line per section.
- Do **not** use `<a href="#">` for nav links — use `<button>` with scroll logic.
- Do **not** add 3D transforms on mobile.
- Do **not** animate more than 3 elements simultaneously.
- Do **not** use equal padding on desktop and mobile — always reduce on mobile.
- Do **not** use generic placeholder copy.
