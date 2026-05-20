# Project Instructions: Showit-Style Photography Websites with Next.js

## What We're Building

Premium, editorial-style websites for photographers, wedding vendors, creatives, and service-based entrepreneurs. These replicate the look of high-end Showit templates but are built as real Next.js applications.

The workflow is CLI-first. The human provides a brief (brand name, niche, palette, fonts, copy, images) and Claude builds the entire site. Content lives in the typed config files (`lib/site.config.tsx`, `lib/content.config.ts`); add a CMS like Supabase only when a fork needs editor-side updates (migrations are provided as a starting point in `supabase/`).

---

## Tech Stack

- **Framework**: Next.js 15 or latest stable (App Router)
- **Styling**: Tailwind CSS — use whichever version the project already has (v3 or v4). Do not switch versions mid-build.
- **Database/CMS** (optional): Supabase migrations included in `supabase/` as a starter schema. Drop in `@supabase/supabase-js` when a fork actually needs editor-side content; the default template is fully static + form-only.
- **Deployment**: Vercel
- **Package Manager**: Use whatever the project already uses (npm, pnpm, yarn). Do not switch mid-build.
- **Animations**: Framer Motion (`whileInView` for scroll triggers, `useScroll`/`useTransform` for parallax)
- **Images**: `next/image` always — never raw `<img>`
- **Fonts**: `next/font/google` always — never external `<link>` tags

---

## Project Structure

The `app/` directory can live at the root or inside `src/` — follow whatever the project already uses. The conceptual organization is:

```
app/
  layout.tsx                  # Root layout: fonts, metadata, globals.css
  (site)/
    page.tsx                  # Homepage
    thank-you/page.tsx        # Post-form confirmation
    about/page.tsx
    services/page.tsx
    galleries/
      page.tsx
      [slug]/page.tsx
    blog/
      page.tsx
      [slug]/page.tsx
    contact/page.tsx
  api/
    contact/route.ts
components/
  layout/                     # Navbar, Footer
  sections/                   # Hero, SplitSection, AboutTeaser, ContactForm, etc.
  ui/                         # Button, Input, Textarea, etc.
lib/
  motion.ts                   # Shared Framer Motion variants
  ghl/contacts.ts             # GHL CRM upsert (the wired CMS surface)
  # supabase.ts (optional)    # Add when a fork wires Supabase
public/
  placeholder/
```

---

## Design Philosophy

Every site should feel like it costs $5,000+ from a boutique studio. Key traits:

- **Serif + sans font pairing** — always two typefaces minimum
- **Large photography** as dominant element
- **Italic accents** in headings ("Capturing Your *Best Moments*")
- **Ghost/outline buttons** with hover fill transitions (300–500ms)
- **Generous whitespace** — never crowded
- **Scroll-triggered entrance animations** — fade-in + slight upward translate
- **Section rhythm**: hero → intro → content → social proof → testimonials → CTA → footer
- **Mobile-first** — stack vertically, reduce heading sizes, full-width images

---

## Aesthetic Modes (Reference Only)

These are examples, not rigid templates. Mix elements as the brief requires.

- **Light & Airy** — cream/white, light serif 300–400, ghost buttons, romantic photography (wedding, portrait)
- **Dark & Moody Luxury** — deep black, high-contrast serif, cream/gold accents, empowering copy (boudoir, glamour)
- **Bold Personal Brand** — dark hero + warm cream sections, condensed display type, coral/gold accents (coaches, influencers)
- **Editorial Chic** — sage/olive palette, oversized serif at large sizes, mono font for labels, asymmetric grids (copywriters, agencies)

---

## Supabase Schema

Use what the site requires. Not every client needs every table. The full schema is available as a reference — start with what's needed, add tables as features require.

### Core Tables

```sql
-- Site configuration
CREATE TABLE site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL,
  tagline TEXT,
  phone TEXT,
  email TEXT,
  instagram_handle TEXT,
  social_links JSONB DEFAULT '{}',
  seo_defaults JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Contact/inquiry submissions
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_date DATE,
  event_type TEXT,
  message TEXT,
  budget TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Blog posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  category TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_title TEXT,
  quote TEXT NOT NULL,
  highlight_quote TEXT,
  photo TEXT,
  display_order INT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Galleries
CREATE TABLE galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_image TEXT,
  category TEXT,
  display_order INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Gallery images
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID REFERENCES galleries(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  starting_price TEXT,
  features TEXT[] DEFAULT '{}',
  cover_image TEXT,
  display_order INT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Row Level Security
- Public read on published/active content
- Authenticated write on all tables
- Public insert on inquiries

---

## Key Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout, fonts, metadata |
| `app/globals.css` | Tailwind imports + `@theme` tokens |
| `lib/motion.ts` | Shared Framer Motion variants |
| `lib/tweaks.config.ts` | Live-design-tweaks registry (see below — opt-in) |
| `components/ui/TweaksPanel.tsx` | Floating dev-only review panel (paired with above) |
| `components/sections/` | Page section components |
| `components/ui/` | Button, Input, Textarea primitives |

---

## Optional: live design tweaks (for client review sessions)

`components/ui/TweaksPanel` + `lib/tweaks.config.ts` ship in the repo
but are NOT wired by default. Activate when you want a photographer to
A/B compare design variants (palette, with/without testimonials, dark
vs light hero) without you redeploying between every nudge:

1. Add groups + defaults to `lib/tweaks.config.ts` (header comments show
   a worked example — palette swap with swatches + section visibility)
2. Mount in `app/(site)/layout.tsx`:
   `<TweaksPanel groups={TWEAK_GROUPS} defaults={TWEAK_DEFAULTS} />`
3. Add the CSS overrides in `globals.css` keyed off the body data
   attributes the panel sets (`body[data-palette="warm-luxe"] { ... }`)

The panel is triple-guarded (NODE_ENV check + hostname check +
production gate) and physically cannot render on Vercel preview or
prod — even if accidentally left wired after the review session.

When the photographer picks the winning combo, the panel has a "Copy
choices for Claude →" button that produces a paste-ready message;
hand it back to an agent and the chosen values become the permanent
defaults. Remove the `<TweaksPanel>` mount afterward.

---

## Dev Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run typecheck # Type check (tsc --noEmit)
npm run lint      # ESLint (max-warnings 0)
```

---

## What NOT to Do

- No raw `<img>` — always `next/image`
- No external font `<link>` tags — always `next/font/google`
- No client-side data fetching for initial content — Server Components
- No MUI, Chakra, Bootstrap — Tailwind only
- No purple gradients, no Inter font, no generic AI aesthetics
- No over-engineering — these are brochure sites, not SaaS apps
- Never sacrifice image quality or whitespace
