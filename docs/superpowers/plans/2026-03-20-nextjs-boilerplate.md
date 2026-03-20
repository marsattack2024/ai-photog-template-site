# Next.js Photography Boilerplate — Implementation Plan

## Context

Replacing a React Router v7 + Vite starter with a Next.js 15 App Router boilerplate
for editorial photography/artist websites. The output is a starter template the developer
clones per client. Style: editorial magazine, airy, serif-heavy (like the "Amora" reference).

**Working directory:** `/Users/Humberto/Desktop/new-build`
**Branch:** master (intentional — this IS the boilerplate)

## Stack

- Next.js 15 (App Router)
- Tailwind v4 (CSS-first `@theme`)
- Framer Motion (scroll reveals, parallax, video bg)
- Supabase JS client (wired, no schema yet)
- next/font — Playfair Display + DM Sans
- TypeScript

## Target Structure

```
app/
  (site)/
    page.tsx              # Home (long-form editorial)
    thank-you/page.tsx    # Thank You page
  api/
    contact/route.ts      # Contact form → Supabase
  layout.tsx              # Root layout (fonts, metadata)
  globals.css             # Tailwind v4 @theme tokens
components/
  ui/                     # Button, Input, Textarea
  sections/               # Hero, Split, ContactForm, Footer
  layout/                 # Navbar
lib/
  supabase.ts             # Supabase browser client
  motion.ts               # Shared Framer Motion variants
public/
  placeholder/            # Demo images (wedding/portrait placeholders)
```

## Pages

### Home (long-form)

1. **Navbar** — centered logo, nav links, minimal. Transparent over hero, solid on scroll.
2. **Hero** — full-viewport, video background support (falls back to image), large serif headline, subtle fade-in
3. **Intro** — centered text block: headline mix of serif/italic, subtext, CTA button
4. **Split Section A** — image left, text + CTA right (Portraits style)
5. **Split Section B** — text left, image right (Weddings style)
6. **About Teaser** — 3-column photo collage left, large serif headline right ("Behind The Lens")
7. **Contact Form** — full name, email, message, submit → POST /api/contact
8. **Footer** — minimal, copyright, social links

### Thank You

- Centered, full-height, serif headline "Thank You", subtext, back to home link

## Tasks

---

### Task 1: Scaffold — Remove old files, install Next.js 15

**Goal:** Clean out React Router artifacts and install Next.js 15 with required dependencies.

**Steps:**

1. Delete: `app/`, `vite.config.ts`, `react-router.config.ts`, `public/` (keep `public/` dir, clear contents)
2. Remove from `package.json`: all react-router deps, vite deps
3. Run: `npm install next@15 react@19 react-dom@19`
4. Run: `npm install framer-motion @supabase/supabase-js`
5. Run: `npm install -D @types/node @types/react @types/react-dom typescript tailwindcss @tailwindcss/postcss postcss`
6. Create `next.config.ts` with image domains placeholder and `reactStrictMode: true`
7. Create `tsconfig.json` for Next.js (paths alias `@/*` → `./`)
8. Create `postcss.config.mjs` for Tailwind v4
9. Update `package.json` scripts: `dev: next dev`, `build: next build`, `start: next start`, `typecheck: tsc --noEmit`
10. Verify: `npm run dev` starts without error

**Verification:** `npm run dev` runs, no TypeScript errors on startup

---

### Task 2: Design tokens + fonts

**Goal:** Set up Tailwind v4 `@theme` tokens and next/font.

**Files to create/edit:**

- `app/globals.css` — Tailwind v4 `@import "tailwindcss"` + `@theme` block
- `app/layout.tsx` — Root layout with `next/font/google` (Playfair Display + DM Sans), metadata, html/body

**Token set (globals.css):**

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-cream: #faf9f7;
  --color-ink: #1a1a1a;
  --color-muted: #6b6b6b;
  --color-accent: #c9a96e;
  --color-border: #e8e4de;
  --color-white: #ffffff;

  /* Typography */
  --font-serif: var(--font-playfair), Georgia, serif;
  --font-sans: var(--font-dm-sans), system-ui, sans-serif;

  /* Spacing */
  --spacing-section: 6rem;

  /* Transitions */
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
}

body {
  background-color: var(--color-cream);
  color: var(--color-ink);
  font-family: var(--font-sans);
}
```

**layout.tsx must:**

- Import Playfair Display (weights: 400, 700, 400 italic) and DM Sans (weights: 400, 500)
- Set CSS variables `--font-playfair` and `--font-dm-sans` via `variable` option
- Apply both font variables to `<html>`
- Set default metadata: title "Photographer | [City]", description placeholder

**Verification:** `npm run dev`, fonts render, cream background visible on localhost

---

### Task 3: Shared motion variants + Supabase client

**Goal:** Create reusable animation primitives and Supabase client.

**lib/motion.ts:**

```ts
// Fade up — use on most section entries
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Stagger container
export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Fade in (no movement)
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9 } },
};

// Slide in from left
export const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Slide in from right
export const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};
```

**lib/supabase.ts:**

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Create `.env.local.example`:**

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Verification:** No TypeScript errors (`npm run typecheck`)

---

### Task 4: UI primitives — Button, Input, Textarea

**Goal:** Build minimal, on-brand reusable form + CTA components.

**components/ui/Button.tsx:**

- Variants: `primary` (cream bg, ink border, ink text) and `ghost` (transparent, ink border)
- Sizes: `md` (default), `lg`
- Hover: subtle background fill transition
- Uses `motion.button` with whileHover scale 1.02, whileTap scale 0.98
- Full TypeScript props extending `React.ButtonHTMLAttributes`

**components/ui/Input.tsx:**

- Clean underline style (no box border) OR thin full border — use thin full border
- Label above, placeholder inside
- Focus ring using accent color
- Error state (red border + message)
- Full TypeScript props

**components/ui/Textarea.tsx:**

- Same styling as Input
- Min height 120px, resizable vertically only
- Full TypeScript props

**Verification:** Components render without errors, visible in dev

---

### Task 5: Navbar

**Goal:** Transparent navbar that becomes solid cream on scroll.

**components/layout/Navbar.tsx:**

- Centered logo (text, Playfair Display, large)
- Nav links below logo OR inline — use the Amora layout: logo centered top, links below in a row
- Links: Home, About, Services, Galleries, Blog, Contact (all `#` hrefs as placeholders)
- `use client` — uses `useScroll` from Framer Motion or `useEffect` + `window.scrollY`
- Transitions from `bg-transparent` to `bg-cream` with backdrop-blur on scroll past 80px
- Mobile: hamburger menu (simple, no library)
- Sticky, `z-50`

**Verification:** Scroll behavior works in dev, no layout shift

---

### Task 6: Hero section

**Goal:** Full-viewport hero with video background support, parallax, large serif headline.

**components/sections/Hero.tsx:**

- Props: `headline: string`, `subline?: string`, `videoSrc?: string`, `imageSrc: string`, `imageAlt: string`
- If `videoSrc` provided: `<video autoPlay muted loop playsInline>` as background
- If no video: `next/image` fill as background
- Dark overlay (40% black) over media
- Content centered: large Playfair Display headline (white), smaller DM Sans subline (white/80%), CTA button
- Parallax on scroll: use Framer Motion `useScroll` + `useTransform` to shift background Y by 30% of scroll
- Fade-in animation on text content (fadeUp variant, `viewport={{ once: true }}`)
- Full viewport height (`h-screen`)

**Verification:** Hero renders with placeholder image, parallax visible on scroll

---

### Task 7: Split sections + About teaser

**Goal:** The alternating image/text sections from the Amora reference.

**components/sections/SplitSection.tsx:**

- Props: `image`, `imageAlt`, `eyebrow?`, `headline`, `body`, `ctaLabel?`, `ctaHref?`, `reverse?: boolean`
- 50/50 grid on desktop, stacked on mobile
- `reverse` flips image/text order
- Image: `next/image` with `object-cover`, full height of section
- Text side: generous padding, eyebrow in small caps/muted, headline in Playfair Display (large), body in DM Sans, Button
- Animation: image slides in from its side, text fades up — use `slideLeft`/`slideRight` + `fadeUp` with `viewport={{ once: true }}`

**components/sections/AboutTeaser.tsx:**

- Props: `images: string[]` (3 images), `headline`, `italicHeadline`, `body`, `ctaLabel`, `ctaHref`
- Left: 3-photo collage (CSS grid, slight overlap/rotation for editorial feel)
- Right: large serif headline with italic second line, body, Button
- Animations: collage fades in with stagger, text slides in from right

**Verification:** Sections render with placeholder images, animations trigger on scroll

---

### Task 8: Contact form section + API route

**Goal:** Full contact form section and server-side handler.

**components/sections/ContactForm.tsx:**

- `use client`
- Fields: Full Name, Email, Message (Textarea)
- Submit button
- State: idle | submitting | success | error
- On submit: POST to `/api/contact`
- Success: shows thank-you message inline OR redirects to `/thank-you`
- Use redirect to `/thank-you` on success
- Validation: required fields, email format
- Section wrapper: centered, max-w-2xl, generous padding, serif section headline above form

**app/api/contact/route.ts:**

- POST handler
- Reads `{ name, email, message }` from request body
- Validates fields (returns 400 if missing)
- Inserts into Supabase table `contact_submissions` (columns: id, name, email, message, created_at)
- Returns 200 `{ success: true }` or 500 `{ error: '...' }`
- Note: table may not exist yet — that's fine, Supabase will return an error that's handled gracefully

**Verification:** Form submits, redirects to /thank-you, API route returns expected shape

---

### Task 9: Home page + Thank You page

**Goal:** Assemble all sections into the Home page and build Thank You page.

**app/(site)/page.tsx:**
Assemble in order:

1. `<Navbar />`
2. `<Hero headline="Capturing Your Best Moments" subline="..." imageSrc="/placeholder/hero.jpg" />`
3. Intro block (inline, centered, max-w-2xl, serif headline, body, Button) — NOT a separate component
4. `<SplitSection>` — Portraits (image left, text right)
5. `<SplitSection reverse>` — Weddings (text left, image right)
6. `<AboutTeaser>` — Behind The Lens
7. `<ContactForm />`
8. Footer (inline, minimal — just copyright + placeholder socials)

Use placeholder images from `/placeholder/` — create simple placeholder references pointing to `https://placehold.co` URLs via next.config.ts `remotePatterns`.

**app/(site)/thank-you/page.tsx:**

- Full-height centered layout
- Large Playfair Display headline: "Thank You"
- Subtext: "I'll be in touch soon."
- Link back to home (styled as ghost Button)
- Fade-in animation

**Verification:** Both pages render, no broken images (placeholders load), full scroll of home page works

---

### Task 10: Update CLAUDE.md + .env.local.example + final typecheck

**Goal:** Update project docs, verify everything builds.

**Steps:**

1. Update `CLAUDE.md` — change project description, stack table, key files, dev commands to reflect Next.js
2. Ensure `.env.local.example` exists with Supabase keys placeholder
3. Run `npm run typecheck` — fix any TypeScript errors
4. Run `npm run build` — fix any build errors
5. Commit everything with message: "feat: migrate to Next.js 15 photography boilerplate"

**Verification:** `npm run build` succeeds with 0 errors
