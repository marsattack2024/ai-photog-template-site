# Phase 3: Production Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the performance-optimized template into a launch-ready scaffold — SEO, accessibility, security headers, error boundaries, two-layer CSS tokens, and a fully wired Supabase backend — so every client site spun from this template is production-grade on day one.

**Architecture:** Every client-variable concern is isolated to one of three layers: (1) `.env.local` for credentials/domain, (2) the `@theme` block in `globals.css` for palette, (3) database seed content for copy/config. No code changes needed per client. The code layer is permanent infrastructure.

**Tech Stack:** Next.js 15.5, React 19, Tailwind CSS v4, Supabase (via MCP + `@supabase/supabase-js`), Zod, Vercel

**Hosting:** Vercel. Deploy command: `npm run build`. Env vars must be set in Vercel dashboard before first deploy.

**Supabase org:** `Photography to Profits` (org ID: `dqndzuiszjtasdbyhfax`)

**Research sources (verified March 2026):**
- https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- https://nextjs.org/docs/app/building-your-application/routing/error-handling
- https://supabase.com/docs/guides/database/migrations
- https://supabase.com/docs/guides/storage/image-transformations

---

## Current State (what Phase 1 & 2 left us)

**Done:**
- `next/font/google`, AVIF/WebP, `outputFileTracingRoot` — `next.config.ts`
- Hero split to server component (`fetchPriority="high"` on LCP image)
- `AnimateOnScroll.tsx` — framer-motion replacement (Phase 2 plan written, not yet executed)
- `loading.tsx` skeleton
- `lib/data.ts` with `use cache` stubs
- `app/(site)/galleries/[slug]/page.tsx` + `app/(site)/blog/[slug]/page.tsx` stubs

**Gaps this plan closes:**
| Gap | File(s) |
|-----|---------|
| No security headers | `next.config.ts` |
| Hex colors hardcoded in `@theme` | `app/globals.css` |
| No error/404 pages | `app/global-error.tsx`, `app/not-found.tsx` |
| No skip nav / `<main>` landmark | `app/layout.tsx` |
| No mobile menu / no aria on Navbar | `components/layout/Navbar.tsx` |
| No SEO helpers or metadata builder | `lib/seo.ts` |
| No `metadataBase` in root layout | `app/layout.tsx` |
| No sitemap or robots.txt | `app/sitemap.ts`, `app/robots.ts` |
| No JSON-LD | `components/seo/JsonLd.tsx`, `lib/schema.ts` |
| No Supabase project/tables | MCP → migrations → seed |
| Contact form → Route Handler (not Server Action) | `app/actions/submitInquiry.ts`, `components/sections/ContactForm.tsx` |
| No Zod validation | `lib/validators.ts` |
| No `remotePatterns` for Supabase Storage | `next.config.ts` |
| No `.env.example` | `.env.example` |

---

## File Map

| File | Action |
|------|--------|
| `app/globals.css` | Modify — two-layer token system (primitives + semantic) |
| `.env.example` | Create — all required vars with comments |
| `next.config.ts` | Modify — security headers + `remotePatterns` |
| `app/global-error.tsx` | Create — global error boundary |
| `app/(site)/error.tsx` | Create — route-group error boundary |
| `app/not-found.tsx` | Create — 404 page |
| `app/layout.tsx` | Modify — skip nav, `<main>` landmark, `metadataBase`, title template |
| `app/(site)/layout.tsx` | Create or modify — `<main id="main-content">` wrapper |
| `components/layout/Navbar.tsx` | Modify — mobile menu with state + aria |
| `lib/seo.ts` | Create — `buildPageMetadata` + `buildArticleMetadata` |
| `components/seo/JsonLd.tsx` | Create — JSON-LD script tag component |
| `lib/schema.ts` | Create — `buildLocalBusinessSchema`, `buildFAQSchema` |
| `app/sitemap.ts` | Create — dynamic from `lib/data.ts` |
| `app/robots.ts` | Create — disallow `/api/` |
| `app/(site)/page.tsx` | Modify — add `generateMetadata` + JSON-LD |
| `supabase/migrations/0001_schema.sql` | Create — all tables |
| `supabase/migrations/0002_rls.sql` | Create — RLS policies |
| `supabase/seed.sql` | Create — realistic placeholder data |
| `lib/supabase-server.ts` | Create — service-role client for server actions |
| `lib/data.ts` | Modify — wire stubs to real Supabase queries |
| `lib/validators.ts` | Create — Zod schemas |
| `app/actions/submitInquiry.ts` | Create — Server Action with Zod |
| `components/sections/ContactForm.tsx` | Modify — use Server Action, drop fetch |
| `app/api/contact/route.ts` | Delete (replaced by Server Action) |
| `app/api/revalidate/route.ts` | Create — `revalidateTag` webhook endpoint |

---

## Task 1: Two-Layer CSS Token Architecture

**Why:** `globals.css` currently has hex values directly in `@theme`. Swapping a client palette means editing 5+ lines scattered around. The two-layer system makes it **one `:root` block** — edit primitives, semantic tokens auto-update, zero component changes.

**Files:**
- Modify: `app/globals.css`

---

- [ ] **Step 1: Restructure globals.css into primitives + semantic layers**

Replace the entire `@theme` block with:

```css
@import "tailwindcss";

/* ═══════════════════════════════════════════════
   LAYER 1 — PRIMITIVES
   Swap this block per client. One block. One file.
   All values use oklch() for perceptual uniformity.
   ═══════════════════════════════════════════════ */
:root {
  /* Brand palette — override these per client */
  --primitive-ink:    oklch(15% 0.005 280);   /* near-black */
  --primitive-cream:  oklch(97% 0.008 90);    /* warm white */
  --primitive-accent: oklch(68% 0.10 80);     /* brand color (decorative use) */
  --primitive-accent-text: oklch(50% 0.10 80); /* brand color darkened for text — passes 4.5:1 on cream */
  --primitive-muted:  oklch(52% 0.010 280);   /* secondary text */
  --primitive-border: oklch(88% 0.006 280);   /* subtle borders */
}

/* ═══════════════════════════════════════════════
   LAYER 2 — SEMANTIC TOKENS (mapped to Tailwind)
   Components reference these — NEVER the primitives.
   Never hardcode hex in a component file.
   Audit: grep -r "#[0-9a-fA-F]" --include="*.tsx" .
   ═══════════════════════════════════════════════ */
@theme {
  --color-ink:          var(--primitive-ink);
  --color-cream:        var(--primitive-cream);
  --color-accent:       var(--primitive-accent);
  --color-accent-text:  var(--primitive-accent-text);
  --color-muted:        var(--primitive-muted);
  --color-border:       var(--primitive-border);
  --color-white:        oklch(100% 0 0);

  --font-serif:  var(--font-playfair), Georgia, serif;
  --font-sans:   var(--font-dm-sans), system-ui, sans-serif;

  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

Keep all existing CSS below the `@theme` block unchanged (box-sizing reset, scroll-behavior, body, h1-h4).

- [ ] **Step 2: Build to confirm token remap didn't break anything**

```bash
npm run build
```
Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "refactor: two-layer CSS token system — primitives in :root, semantic tokens in @theme"
```

---

## Task 2: .env.example + Template Checklist

**Why:** Every new client scaffold starts by copying `.env.example` to `.env.local`. Without this file, developers forget variables and get cryptic runtime errors.

**Files:**
- Create: `.env.example`

---

- [ ] **Step 1: Create .env.example**

```bash
# ─────────────────────────────────────────────
# SITE IDENTITY
# Drives metadata, JSON-LD, sitemap, og: tags
# ─────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME="Studio Name"
NEXT_PUBLIC_SITE_DESCRIPTION="One sentence describing the studio and what they offer."

# ─────────────────────────────────────────────
# SUPABASE
# Get from: Supabase dashboard → Settings → API
# ─────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...        # Server-only. NEVER expose to client.

# ─────────────────────────────────────────────
# SECURITY
# ─────────────────────────────────────────────
REVALIDATE_SECRET=generate-with-openssl-rand-hex-32
# On-demand cache revalidation. Set same value in Supabase webhook headers.
```

- [ ] **Step 2: Verify .env.example is NOT gitignored**

```bash
git check-ignore .env.example
```
Expected: no output (meaning it is NOT ignored — `.env.example` should be committed).

- [ ] **Step 3: Commit**

```bash
git add .env.example
git commit -m "feat: add .env.example with all required variables documented"
```

---

## Task 3: Security Headers

**Why:** Headers protect against XSS, clickjacking, MIME sniffing, and HTTPS downgrade attacks. For a static/ISR site, `next.config.ts headers()` is correct — it runs at the CDN/edge layer with zero runtime cost. `middleware.ts` adds latency and is only needed if you need per-request nonce generation (not required for this template).

**Files:**
- Modify: `next.config.ts`

---

- [ ] **Step 1: Add security headers to next.config.ts**

```ts
import type { NextConfig } from "next";
import path from "path";

const supabaseProjectRef = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : "*.supabase.co";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",   // required: Next.js hydration scripts + JSON-LD
      "style-src 'self' 'unsafe-inline'",    // required: Tailwind v4 inline styles
      `img-src 'self' data: blob: https://${supabaseProjectRef}`,
      `connect-src 'self' https://${supabaseProjectRef} wss://${supabaseProjectRef}`,
      "font-src 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseProjectRef,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
```

> **Note on `unsafe-inline`:** Next.js 15 inlines hydration scripts and JSON-LD uses `dangerouslySetInnerHTML`. Both require `unsafe-inline`. The nonce-based CSP approach is more secure but requires `middleware.ts` per-request nonce injection — a Phase 4 concern. This config passes Lighthouse Best Practices and blocks all major attack vectors.

- [ ] **Step 2: Build and verify**

```bash
npm run build
```
Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "feat: add security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy)"
```

---

## Task 4: Error Boundaries + 404 Page

**Why:** Without these, users see the bare Next.js default error/404 pages — completely un-branded. These files use your existing design tokens so they look native to whatever client palette is active.

**Files:**
- Create: `app/global-error.tsx`
- Create: `app/(site)/error.tsx`
- Create: `app/not-found.tsx`

---

- [ ] **Step 1: Create app/not-found.tsx**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-(--color-cream) flex flex-col items-center justify-center gap-8 px-6">
      <span className="text-xs uppercase tracking-widest text-(--color-muted)">404</span>
      <h1 className="font-serif text-5xl font-normal text-(--color-ink) text-center leading-tight">
        Page Not Found
      </h1>
      <p className="text-sm text-(--color-muted) max-w-sm text-center leading-relaxed">
        This page doesn&apos;t exist or may have moved. Let&apos;s get you back.
      </p>
      <Link
        href="/"
        className="text-xs uppercase tracking-widest border border-(--color-ink) text-(--color-ink) px-8 py-4 hover:bg-(--color-ink) hover:text-(--color-cream) transition-colors duration-300"
      >
        Back to Home
      </Link>
    </main>
  );
}
```

- [ ] **Step 2: Create app/global-error.tsx (global — "use client" required)**

```tsx
"use client";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Wire to Sentry or your error tracking here
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-(--color-cream) flex flex-col items-center justify-center gap-8 px-6">
        <span className="text-xs uppercase tracking-widest text-(--color-muted)">Error</span>
        <h2 className="font-serif text-4xl font-normal text-(--color-ink) text-center">
          Something went wrong
        </h2>
        <p className="text-sm text-(--color-muted) max-w-sm text-center leading-relaxed">
          We hit an unexpected error. Try again — if it persists, please reach out.
        </p>
        <button
          onClick={reset}
          className="text-xs uppercase tracking-widest border border-(--color-ink) text-(--color-ink) px-8 py-4 hover:bg-(--color-ink) hover:text-(--color-cream) transition-colors duration-300"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
```

> `app/global-error.tsx` must include `<html>` + `<body>` because it replaces the root layout on global error.

- [ ] **Step 3: Create app/(site)/error.tsx (route-group scoped)**

```tsx
"use client";
import { useEffect } from "react";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[SiteError]", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-(--color-cream) flex flex-col items-center justify-center gap-8 px-6">
      <span className="text-xs uppercase tracking-widest text-(--color-muted)">Error</span>
      <h2 className="font-serif text-4xl font-normal text-(--color-ink) text-center">
        Something went wrong
      </h2>
      <p className="text-sm text-(--color-muted) max-w-sm text-center leading-relaxed">
        We hit an unexpected error. Try again or contact us if it persists.
      </p>
      <button
        onClick={reset}
        className="text-xs uppercase tracking-widest border border-(--color-ink) text-(--color-ink) px-8 py-4 hover:bg-(--color-ink) hover:text-(--color-cream) transition-colors duration-300"
      >
        Try Again
      </button>
    </main>
  );
}
```

> Route-group error.tsx renders inside the existing layout (header/footer stay visible). Global `app/error.tsx` only fires if the layout itself crashes.

- [ ] **Step 4: Build and verify**

```bash
npm run build
```
Expected: clean build. Both error pages appear in route output.

- [ ] **Step 5: Commit**

```bash
git add "app/global-error.tsx" "app/(site)/error.tsx" "app/not-found.tsx"
git commit -m "feat: add error boundaries (global + site-scoped) and styled 404 page"
```

---

## Task 5: Accessibility — Skip Nav + Main Landmark + Navbar Mobile Menu

**Why:** Skip nav is required for WCAG 2.2 AA. `<main>` landmark enables screen reader navigation. The Navbar currently has no mobile menu at all and no aria attributes — it renders the nav links hidden on mobile with no hamburger. This task adds both.

**Files:**
- Modify: `app/layout.tsx`
- Modify: `components/layout/Navbar.tsx`

---

- [ ] **Step 1: Add skip nav + main landmark to app/layout.tsx**

In `app/layout.tsx`, modify the `<body>` to:

```tsx
<body>
  {/* Skip nav — first element in body, visible on focus */}
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-(--color-ink) focus:text-(--color-cream) focus:text-xs focus:uppercase focus:tracking-widest focus:border focus:border-(--color-cream)"
  >
    Skip to main content
  </a>
  {children}
</body>
```

- [ ] **Step 2: Move StickyBar + Navbar out of page.tsx and into app/(site)/layout.tsx**

`app/(site)/page.tsx` currently renders `<StickyBar />` and `<Navbar>` as its first children. Once we wrap children in `<main>` in Step 3, those would end up inside `<main>` — a semantic violation. Move them up to the layout so they sit *above* `<main>`.

In `app/(site)/page.tsx`, remove these two lines from the top of the JSX:
```tsx
// DELETE these two lines:
<StickyBar />
<Navbar brandName="[Studio Name]" />
```

Also remove their imports if they become unused in page.tsx:
```tsx
// DELETE if no longer used in page.tsx:
import { StickyBar } from "@/components/layout/StickyBar";
import { Navbar } from "@/components/layout/Navbar";
```

- [ ] **Step 3: Add main landmark + StickyBar/Navbar in app/(site)/layout.tsx**

Check if `app/(site)/layout.tsx` exists. If not, create it. If it exists, modify it.

```tsx
// app/(site)/layout.tsx
import { StickyBar } from "@/components/layout/StickyBar";
import { Navbar } from "@/components/layout/Navbar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StickyBar />
      <Navbar brandName="[Studio Name]" />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
    </>
  );
}
```

> `tabIndex={-1}` is critical for Firefox — without it, the skip link activates but focus doesn't move. `outline-none` prevents a visible focus ring on the invisible `<main>` element.

- [ ] **Step 4: Rewrite Navbar.tsx with mobile menu + correct aria**

```tsx
"use client";
import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  brandName?: string;
}

const NAV_ITEMS = [
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ brandName = "[Studio Name]" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-(--color-cream) border-b border-(--color-border) px-6 py-4 relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="font-serif text-2xl tracking-widest text-(--color-ink)">
          {brandName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs tracking-widest uppercase text-(--color-muted) hover:text-(--color-ink) transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex text-xs tracking-widest uppercase border border-(--color-ink) px-5 py-2 hover:bg-(--color-ink) hover:text-(--color-cream) transition-colors"
        >
          Inquire
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          className="md:hidden p-2 text-(--color-ink)"
        >
          <span className="sr-only">{isOpen ? "Close" : "Open"} menu</span>
          {/* Animated hamburger icon */}
          <div className="w-5 flex flex-col gap-1.5" aria-hidden="true">
            <span
              className={`block h-px bg-(--color-ink) transition-transform duration-300 origin-center ${isOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-px bg-(--color-ink) transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px bg-(--color-ink) transition-transform duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile nav drawer */}
      <nav
        id="mobile-nav"
        aria-hidden={!isOpen}
        aria-label="Mobile navigation"
        className={`md:hidden absolute top-full left-0 right-0 bg-(--color-cream) border-b border-(--color-border) px-6 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-64 py-6" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col gap-5">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-xs tracking-widest uppercase text-(--color-muted) hover:text-(--color-ink) transition-colors"
              tabIndex={isOpen ? 0 : -1}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="text-xs tracking-widest uppercase border border-(--color-ink) px-5 py-2 text-center hover:bg-(--color-ink) hover:text-(--color-cream) transition-colors"
            tabIndex={isOpen ? 0 : -1}
          >
            Inquire
          </a>
        </div>
      </nav>
    </header>
  );
}
```

> `tabIndex={isOpen ? 0 : -1}` on mobile nav links prevents hidden links from receiving keyboard focus when the menu is closed.

- [ ] **Step 5: Build and verify**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx "app/(site)/layout.tsx" "app/(site)/page.tsx" components/layout/Navbar.tsx
git commit -m "feat: skip nav, main landmark, mobile menu with aria — accessibility foundations"
```

---

## Task 6: SEO — lib/seo.ts + Root Metadata + Sitemap + Robots

**Why:** All SEO should flow through one helper so per-client metadata is a database row change, not a code change. `metadataBase` is required — without it, relative OG image URLs resolve to `localhost:3000` in production.

**Files:**
- Create: `lib/seo.ts`
- Modify: `app/layout.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

---

- [ ] **Step 1: Create lib/seo.ts**

```ts
// lib/seo.ts
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio Name";
const DEFAULT_DESC = process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? "Professional photography studio.";
const DEFAULT_OG = "/og-default.jpg"; // 1200×630 — place in /public

type PageMetadataOptions = {
  title: string;
  description?: string;
  /** Relative path, e.g. "/galleries/golden-hour" */
  path?: string;
  /** Absolute URL or relative path to OG image */
  image?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  noIndex,
}: PageMetadataOptions): Metadata {
  const desc = description ?? DEFAULT_DESC;
  const canonical = path ? `${SITE_URL}${path}` : SITE_URL;
  const ogImage = image ?? DEFAULT_OG;

  return {
    title,
    description: desc,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description: desc,
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogImage],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

type ArticleMetadataOptions = PageMetadataOptions & {
  publishedTime: string;
  modifiedTime?: string;
  tags?: string[];
};

export function buildArticleMetadata({
  publishedTime,
  modifiedTime,
  tags,
  ...base
}: ArticleMetadataOptions): Metadata {
  const page = buildPageMetadata(base);
  return {
    ...page,
    openGraph: {
      ...page.openGraph,
      type: "article",
      publishedTime,
      modifiedTime: modifiedTime ?? publishedTime,
      tags,
    },
  };
}
```

- [ ] **Step 2: Add metadataBase + title template to app/layout.tsx**

In `app/layout.tsx`, convert `metadata` to `generateMetadata` that reads from env:

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com"),
  title: {
    default: process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio Name",
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio Name"}`,
  },
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
};
```

> Keep this as a `const` (not `generateMetadata`) — the root layout metadata is static and doesn't need Supabase. Child page `generateMetadata` functions will override per-field.

- [ ] **Step 3: Create app/sitemap.ts**

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getGallerySlugs, getPostSlugs } from "@/lib/data";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";

  const [gallerySlugs, postSlugs] = await Promise.all([
    getGallerySlugs(),
    getPostSlugs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1.0, lastModified: new Date() },
    { url: `${BASE}/galleries`, changeFrequency: "weekly", priority: 0.9, lastModified: new Date() },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8, lastModified: new Date() },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.7, lastModified: new Date() },
  ];

  return [
    ...staticRoutes,
    ...gallerySlugs.map((slug) => ({
      url: `${BASE}/galleries/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: new Date(),
    })),
    ...postSlugs.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: new Date(),
    })),
  ];
}
```

> When stubs return empty arrays, sitemap gracefully includes only static routes. Automatically expands as Supabase data is seeded.

- [ ] **Step 4: Create app/robots.ts**

```ts
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] }],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
```

- [ ] **Step 5: Build and verify**

```bash
npm run build
```
Expected: clean build. `sitemap.xml` and `robots.txt` appear as routes in build output.

- [ ] **Step 6: Commit**

```bash
git add lib/seo.ts app/layout.tsx app/sitemap.ts app/robots.ts
git commit -m "feat: SEO foundation — lib/seo.ts, metadataBase, sitemap, robots"
```

---

## Task 7: JSON-LD + generateMetadata on Homepage

**Why:** JSON-LD gives Google the LocalBusiness rich result for free. `generateMetadata` on the homepage ties it to env vars so client name/URL/description drive all OG tags without a code change.

**Files:**
- Create: `components/seo/JsonLd.tsx`
- Create: `lib/schema.ts`
- Modify: `app/(site)/page.tsx`

---

- [ ] **Step 1: Create components/seo/JsonLd.tsx**

```tsx
// components/seo/JsonLd.tsx
// Server component — renders JSON-LD script tag with no client JS
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2: Create lib/schema.ts**

```ts
// lib/schema.ts
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio Name";

/** LocalBusiness schema — drives Google rich result on homepage */
export function buildLocalBusinessSchema(overrides?: {
  phone?: string;
  city?: string;
  state?: string;
  priceRange?: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_URL,
    name: SITE_NAME,
    url: SITE_URL,
    description: overrides?.description ?? process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    image: `${SITE_URL}/og-default.jpg`,
    ...(overrides?.phone && { telephone: overrides.phone }),
    ...(overrides?.city && {
      address: {
        "@type": "PostalAddress",
        addressLocality: overrides.city,
        addressRegion: overrides.state ?? "",
        addressCountry: "US",
      },
    }),
    priceRange: overrides?.priceRange ?? "$",
  };
}

/** FAQPage schema — enables Google FAQ rich result */
export function buildFAQSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
```

- [ ] **Step 3: Add generateMetadata + JSON-LD to app/(site)/page.tsx**

At the top of `page.tsx`, add:

```ts
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildLocalBusinessSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio Name",
  path: "/",
});
```

Inside the `Home()` function, add `<JsonLd>` as the first element before `<StickyBar>`:

```tsx
export default function Home() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <StickyBar />
      {/* ... rest unchanged ... */}
    </>
  );
}
```

- [ ] **Step 4: Build and verify**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add components/seo/JsonLd.tsx lib/schema.ts "app/(site)/page.tsx"
git commit -m "feat: JSON-LD LocalBusiness schema + generateMetadata on homepage"
```

---

## Task 8: Supabase Project + Schema Migration

**Why:** Creates the database. Uses Supabase MCP (available in this session) to create the project and apply the migration SQL. The SQL is also saved as migration files so any developer can apply it to a fresh Supabase project via `supabase db push`.

**Files:**
- Create: `supabase/migrations/0001_schema.sql`
- Create: `supabase/migrations/0002_rls.sql`
- Action: Supabase MCP — create project + apply migrations

---

- [ ] **Step 1: Create supabase/migrations/0001_schema.sql**

```sql
-- 0001_schema.sql
-- Template schema for photography/creative service studios
-- Idempotent: all tables use IF NOT EXISTS

-- ── Site configuration ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_config (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name     TEXT NOT NULL,
  tagline       TEXT,
  phone         TEXT,
  email         TEXT,
  city          TEXT,
  state         TEXT,
  price_range   TEXT DEFAULT '$',
  instagram_url TEXT,
  social_links  JSONB DEFAULT '{}',
  seo_defaults  JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── Services ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              TEXT UNIQUE NOT NULL,
  title             TEXT NOT NULL,
  short_description TEXT,
  description       TEXT,
  starting_price    TEXT,
  duration_minutes  INT,
  features          TEXT[] DEFAULT '{}',
  cover_image_url   TEXT,
  active            BOOLEAN DEFAULT TRUE,
  display_order     INT DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── Galleries ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS galleries (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  description     TEXT,
  cover_image_url TEXT,
  category        TEXT,
  published       BOOLEAN DEFAULT TRUE,
  display_order   INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Gallery images ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id    UUID REFERENCES galleries(id) ON DELETE CASCADE,
  image_url     TEXT NOT NULL,
  alt_text      TEXT,
  display_order INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── Blog posts ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           TEXT UNIQUE NOT NULL,
  title          TEXT NOT NULL,
  excerpt        TEXT,
  content        TEXT NOT NULL DEFAULT '',
  featured_image TEXT,
  category       TEXT,
  published      BOOLEAN DEFAULT FALSE,
  published_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── Testimonials ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name   TEXT NOT NULL,
  client_detail TEXT,            -- e.g. "Portrait Session"
  quote         TEXT NOT NULL,
  stars         INT DEFAULT 5 CHECK (stars BETWEEN 1 AND 5),
  photo_url     TEXT,
  service_type  TEXT,
  active        BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── Inquiries (contact form submissions) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS inquiries (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT,
  service_interest TEXT,
  message          TEXT NOT NULL,
  source_page      TEXT DEFAULT 'contact_form',
  status           TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── Triggers: updated_at ──────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['site_config','services','galleries','posts'] LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS trg_%s_updated_at ON %s;
       CREATE TRIGGER trg_%s_updated_at
       BEFORE UPDATE ON %s
       FOR EACH ROW EXECUTE FUNCTION set_updated_at();',
      t, t, t, t
    );
  END LOOP;
END $$;
```

- [ ] **Step 2: Create supabase/migrations/0002_rls.sql**

```sql
-- 0002_rls.sql
-- Row Level Security policies for all tables

-- Enable RLS on all tables
ALTER TABLE site_config   ENABLE ROW LEVEL SECURITY;
ALTER TABLE services      ENABLE ROW LEVEL SECURITY;
ALTER TABLE galleries     ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials  ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries     ENABLE ROW LEVEL SECURITY;

-- Public read: published/active content
CREATE POLICY "public_read_site_config"   ON site_config   FOR SELECT USING (TRUE);
CREATE POLICY "public_read_services"      ON services      FOR SELECT USING (active = TRUE);
CREATE POLICY "public_read_galleries"     ON galleries     FOR SELECT USING (published = TRUE);
CREATE POLICY "public_read_gallery_images" ON gallery_images FOR SELECT USING (TRUE);
CREATE POLICY "public_read_posts"         ON posts         FOR SELECT USING (published = TRUE);
CREATE POLICY "public_read_testimonials"  ON testimonials  FOR SELECT USING (active = TRUE);

-- Public insert: inquiries only (contact form)
CREATE POLICY "public_insert_inquiries"   ON inquiries     FOR INSERT WITH CHECK (TRUE);

-- Authenticated write: all tables (for future admin UI)
CREATE POLICY "auth_write_all" ON site_config    FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "auth_write_services" ON services  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "auth_write_galleries" ON galleries FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "auth_write_gallery_images" ON gallery_images FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "auth_write_posts" ON posts         FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "auth_write_testimonials" ON testimonials FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "auth_write_inquiries" ON inquiries FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
```

- [ ] **Step 3: Use Supabase MCP to create the project**

Using `mcp__claude_ai_Supabase__create_project`:
- Name: `photography-template` (or client-specific name)
- Region: `us-east-1`
- Org: `dqndzuiszjtasdbyhfax`

Wait for project to initialize (check with `get_project` until status = `ACTIVE_HEALTHY`).

- [ ] **Step 4: Apply migrations via MCP**

Using `mcp__claude_ai_Supabase__apply_migration`, apply `0001_schema.sql` then `0002_rls.sql` in order.

- [ ] **Step 5: Get project URL and keys**

Using `mcp__claude_ai_Supabase__get_project` and `mcp__claude_ai_Supabase__get_publishable_keys`, retrieve:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Note: `SUPABASE_SERVICE_ROLE_KEY` must be retrieved from the Supabase dashboard → Settings → API (not exposed via MCP).

- [ ] **Step 6: Commit migration files**

```bash
git add supabase/
git commit -m "feat: Supabase schema — 7 tables, RLS policies, updated_at triggers"
```

---

## Task 9: Seed Data

**Why:** Fresh Supabase projects need realistic placeholder content so the template renders correctly before a client provides their actual copy. Seed data is generic and template-agnostic.

**Files:**
- Create: `supabase/seed.sql`

---

- [ ] **Step 1: Create supabase/seed.sql**

```sql
-- supabase/seed.sql
-- Realistic placeholder data for photography/creative service template
-- Generic: no studio-specific branding. Swap via Supabase dashboard.
-- Idempotent: ON CONFLICT DO NOTHING

-- ── Site config ───────────────────────────────────────────────────────────
INSERT INTO site_config (site_name, tagline, phone, email, city, state, price_range, instagram_url)
VALUES (
  'Studio Name',
  'Timeless portraits for people who know their worth.',
  '(555) 000-0000',
  'hello@yourstudio.com',
  'Your City',
  'ST',
  '$$',
  'https://instagram.com/yourstudio'
);

-- ── Services ──────────────────────────────────────────────────────────────
INSERT INTO services (slug, title, short_description, starting_price, duration_minutes, active, display_order)
VALUES
  ('portrait',  'Portrait Session',   'A timeless portrait experience, tailored entirely to you.',           '$450',  90,  TRUE, 1),
  ('boudoir',   'Boudoir Experience', 'Private, empowering, and completely guided from start to finish.',    '$650',  120, TRUE, 2),
  ('wedding',   'Wedding Coverage',   'Full-day documentary coverage with a second photographer included.',  '$3500', 600, TRUE, 3),
  ('branding',  'Brand Story Session','60+ images for entrepreneurs and creatives. Content-forward.',        '$800',  180, TRUE, 4)
ON CONFLICT (slug) DO NOTHING;

-- ── Galleries ─────────────────────────────────────────────────────────────
INSERT INTO galleries (slug, title, description, cover_image_url, published, display_order)
VALUES
  ('natural-light',    'Natural Light',      'Soft, luminous work done entirely in window light.',    '/placeholder/gallery-1.jpg', TRUE, 1),
  ('golden-hour',      'Golden Hour',        'That last hour before sunset. Every time.',             '/placeholder/gallery-2.jpg', TRUE, 2),
  ('studio-editorial', 'Studio & Editorial', 'Clean backgrounds. Strong light. No distractions.',     '/placeholder/gallery-3.jpg', TRUE, 3)
ON CONFLICT (slug) DO NOTHING;

-- ── Testimonials ──────────────────────────────────────────────────────────
-- Truncate first so the seed is idempotent (no unique constraint on testimonials)
TRUNCATE testimonials RESTART IDENTITY CASCADE;
INSERT INTO testimonials (client_name, client_detail, quote, stars, active, display_order)
VALUES
  ('Sarah M.',    'Portrait Session',   'I walked in nervous and left feeling like myself again. The most beautiful images I have ever had taken of me.', 5, TRUE, 1),
  ('Jennifer K.', 'Boudoir Experience', 'Worth every single penny. I will treasure these forever. I almost didn''t do this — I am so glad I did.',        5, TRUE, 2),
  ('Rachel T.',   'Wedding Coverage',   'She has a gift for making everyone feel at ease. Our photos are everything we dreamed of.',                      5, TRUE, 3),
  ('Monica D.',   'Portrait Session',   'I''ve never felt more seen in my life. I cried when I saw the gallery. In the best way.',                        5, TRUE, 4),
  ('Claire B.',   'Brand Story Session','I needed photos that actually matched my brand. What I got was a whole visual language for my business.',         5, TRUE, 5)
;

-- ── Blog posts ────────────────────────────────────────────────────────────
INSERT INTO posts (slug, title, excerpt, content, published, published_at)
VALUES
  (
    'what-to-wear-portrait-session',
    'What to Wear to Your Portrait Session',
    'The right outfit makes a portrait. The wrong one works against it. Here''s our honest guide.',
    'Full article content goes here.',
    TRUE,
    NOW() - INTERVAL '14 days'
  ),
  (
    'how-to-prepare-boudoir',
    'How to Prepare for a Boudoir Session',
    'What to do, what to skip, and how to actually feel ready on the day.',
    'Full article content goes here.',
    TRUE,
    NOW() - INTERVAL '7 days'
  )
ON CONFLICT (slug) DO NOTHING;
```

- [ ] **Step 2: Apply seed via MCP**

Using `mcp__claude_ai_Supabase__execute_sql`, run the contents of `seed.sql` on the project.

- [ ] **Step 3: Commit**

```bash
git add supabase/seed.sql
git commit -m "feat: seed.sql with template placeholder data for all tables"
```

---

## Task 10: Create lib/data.ts with Real Supabase Queries

**Why:** `lib/data.ts` does not yet exist. This task creates it with all data-fetching functions using the `use cache` directive so data is cached at build time and revalidated via webhook. Also create `lib/supabase-server.ts` — a server-side client using the service role key for write operations.

> **Prerequisite:** Tasks 8 and 9 must be complete (Supabase project + tables + seed data) before this task builds successfully. Task 6 (`app/sitemap.ts`) imports from this file — if you run `npm run build` before this task, it will fail. Only build after this task is complete.

**Files:**
- Create: `lib/supabase-server.ts`
- Create: `lib/data.ts`

---

- [ ] **Step 1: Create lib/supabase-server.ts**

```ts
// lib/supabase-server.ts
// Service-role client for server-side operations (Server Actions, Route Handlers)
// NEVER import this in client components or expose to the browser
import { createClient } from "@supabase/supabase-js";

export function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing server Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required"
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
```

- [ ] **Step 2: Create lib/data.ts with all data-fetching functions**

Create the file from scratch. The `use cache` + `cacheLife` + `cacheTag` calls enable Next.js data caching at the function level:

```ts
import { cacheLife, cacheTag } from "next/cache";
import { getSupabaseClient } from "./supabase";

// ── Testimonials ──────────────────────────────────────────────────────────
export async function getTestimonials() {
  "use cache";
  cacheLife("hours");
  cacheTag("testimonials");

  const { data } = await getSupabaseClient()
    .from("testimonials")
    .select("*")
    .eq("active", true)
    .order("display_order");
  return data ?? [];
}

// ── Galleries ─────────────────────────────────────────────────────────────
export async function getGalleries() {
  "use cache";
  cacheLife("days");
  cacheTag("galleries");

  const { data } = await getSupabaseClient()
    .from("galleries")
    .select("*")
    .eq("published", true)
    .order("display_order");
  return data ?? [];
}

export async function getGalleryBySlug(slug: string) {
  "use cache";
  cacheLife("days");
  cacheTag(`gallery-${slug}`);

  const { data } = await getSupabaseClient()
    .from("galleries")
    .select("*, gallery_images(*)")
    .eq("slug", slug)
    .single();
  return data ?? null;
}

export async function getGallerySlugs(): Promise<string[]> {
  "use cache";
  cacheLife("days");
  cacheTag("gallery-slugs");

  const { data } = await getSupabaseClient()
    .from("galleries")
    .select("slug")
    .eq("published", true);
  return data?.map((g) => g.slug) ?? [];
}

// ── Blog ──────────────────────────────────────────────────────────────────
export async function getPosts() {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");

  const { data } = await getSupabaseClient()
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  return data ?? [];
}

export async function getPostBySlug(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(`post-${slug}`);

  const { data } = await getSupabaseClient()
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data ?? null;
}

export async function getPostSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("days");
  cacheTag("post-slugs");

  const { data } = await getSupabaseClient()
    .from("posts")
    .select("slug")
    .eq("published", true);
  return data?.map((p) => p.slug) ?? [];
}

// ── Services ──────────────────────────────────────────────────────────────
export async function getServices() {
  "use cache";
  cacheLife("days");
  cacheTag("services");

  const { data } = await getSupabaseClient()
    .from("services")
    .select("*")
    .eq("active", true)
    .order("display_order");
  return data ?? [];
}

// ── Site config ────────────────────────────────────────────────────────────
export async function getSiteConfig() {
  "use cache";
  cacheLife("days");
  cacheTag("site-config");

  const { data } = await getSupabaseClient()
    .from("site_config")
    .select("*")
    .single();
  return data ?? null;
}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```
Expected: clean build. If Supabase env vars aren't set locally, the build still passes (Server Components don't execute at build time unless `cacheComponents` pre-renders them).

- [ ] **Step 4: Commit**

```bash
git add lib/supabase-server.ts lib/data.ts
git commit -m "feat: wire lib/data.ts to real Supabase queries + supabase-server client"
```

---

## Task 11: Contact Form → Server Action + Zod

**Why:** Current form uses `fetch("/api/contact")` — a Route Handler. Server Actions are the Next.js 15 native pattern: no API endpoint, no fetch, progressive enhancement works without JS, and validation runs server-side. Also renames the table from `contact_submissions` to `inquiries` (per schema).

**Files:**
- Install: `zod`
- Create: `lib/validators.ts`
- Create: `app/actions/submitInquiry.ts`
- Modify: `components/sections/ContactForm.tsx`
- Delete: `app/api/contact/route.ts`

---

- [ ] **Step 1: Install zod**

```bash
npm install zod
```

- [ ] **Step 2: Create lib/validators.ts**

```ts
// lib/validators.ts
import { z } from "zod";

export const InquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service_interest: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
  source_page: z.string().optional(),
});

export type InquiryInput = z.infer<typeof InquirySchema>;
```

- [ ] **Step 3: Create app/actions/submitInquiry.ts**

```ts
// app/actions/submitInquiry.ts
"use server";
import { InquirySchema } from "@/lib/validators";
import { getServerSupabase } from "@/lib/supabase-server";

type ActionResult =
  | { success: true }
  | { success: false; errors: Record<string, string[]> };

export async function submitInquiry(formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = InquirySchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const supabase = getServerSupabase();
  const { error } = await supabase.from("inquiries").insert({
    ...parsed.data,
    status: "new",
  });

  if (error) {
    console.error("[submitInquiry] Supabase error:", error.message);
    return {
      success: false,
      errors: { root: ["Submission failed. Please try again."] },
    };
  }

  return { success: true };
}
```

- [ ] **Step 4: Rewrite ContactForm.tsx to use Server Action**

Replace the `handleSubmit` + `fetch` pattern with `useFormState` + Server Action:

```tsx
"use client";
import { useActionState } from "react";
import { submitInquiry } from "@/app/actions/submitInquiry";

const initialState = { success: false, errors: {} as Record<string, string[]> };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  if (state.success) {
    return (
      <section id="contact" className="py-24 px-6 bg-(--color-cream)">
        <div className="max-w-2xl mx-auto border border-(--color-border) p-12 text-center flex flex-col gap-4">
          <p className="font-serif text-3xl text-(--color-ink)">Message Received</p>
          <p className="text-sm text-(--color-muted) max-w-sm mx-auto leading-relaxed">
            Thank you for reaching out. You&apos;ll hear back personally within 24 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6 bg-(--color-cream)">
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">Get In Touch</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Ready to Book Your <em className="italic">Session?</em>
          </h2>
          <p className="text-sm leading-relaxed text-(--color-muted)">
            Fill out the form and you&apos;ll hear back within 24 hours.
          </p>
        </div>

        <form action={formAction} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs tracking-widest uppercase text-(--color-muted)">
              Full Name
            </label>
            <input
              id="name" name="name" type="text" required
              className="w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-(--color-ink) focus:outline-none focus:border-(--color-ink) transition-colors"
              aria-describedby={state.errors?.name ? "name-error" : undefined}
            />
            {state.errors?.name && (
              <p id="name-error" className="text-xs text-red-600">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs tracking-widest uppercase text-(--color-muted)">
              Email Address
            </label>
            <input
              id="email" name="email" type="email" required
              className="w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-(--color-ink) focus:outline-none focus:border-(--color-ink) transition-colors"
              aria-describedby={state.errors?.email ? "email-error" : undefined}
            />
            {state.errors?.email && (
              <p id="email-error" className="text-xs text-red-600">{state.errors.email[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs tracking-widest uppercase text-(--color-muted)">
              Message
            </label>
            <textarea
              id="message" name="message" required rows={5}
              placeholder="Tell me about what you're envisioning..."
              className="w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-(--color-ink) focus:outline-none focus:border-(--color-ink) transition-colors resize-none"
              aria-describedby={state.errors?.message ? "message-error" : undefined}
            />
            {state.errors?.message && (
              <p id="message-error" className="text-xs text-red-600">{state.errors.message[0]}</p>
            )}
          </div>

          {state.errors?.root && (
            <p className="text-xs text-red-600">{state.errors.root[0]}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full tracking-widest uppercase text-xs font-medium bg-(--color-ink) text-(--color-cream) px-8 py-4 hover:bg-(--color-accent-text) transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}
```

> `useActionState` is the React 19 / Next.js 15 native pattern. It replaces `useFormState` from `react-dom` (they're the same API, React 19 moved it to `react`). `isPending` tracks the in-flight state without `useState`.

- [ ] **Step 5: Delete the old Route Handler**

```bash
rm app/api/contact/route.ts
```

- [ ] **Step 6: Build and verify**

```bash
npm run build
```
Expected: clean build. The `/api/contact` route no longer appears in output.

- [ ] **Step 7: Commit**

```bash
git add lib/validators.ts "app/actions/submitInquiry.ts" components/sections/ContactForm.tsx
git rm app/api/contact/route.ts
git commit -m "feat: contact form → Server Action + Zod validation + inquiries table"
```

---

## Task 12: Revalidation Webhook + Final Cleanup

**Why:** When a client adds a testimonial or publishes a gallery in Supabase, the cache should invalidate automatically. This webhook endpoint receives a POST from Supabase Database Webhooks and calls `revalidateTag`.

**Files:**
- Create: `app/api/revalidate/route.ts`

---

- [ ] **Step 1: Create app/api/revalidate/route.ts**

```ts
// app/api/revalidate/route.ts
export const runtime = "nodejs"; // revalidateTag is not available in Edge runtime

import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Map Supabase table names to cache tags
const TABLE_TAGS: Record<string, string[]> = {
  site_config:    ["site-config"],
  services:       ["services"],
  galleries:      ["galleries", "gallery-slugs"],
  gallery_images: ["galleries"],
  posts:          ["posts", "post-slugs"],
  testimonials:   ["testimonials"],
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = req.headers.get("x-revalidate-secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { table?: string; tag?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Allow direct tag revalidation or table-based lookup
  const tagsToInvalidate = body.tag
    ? [body.tag]
    : TABLE_TAGS[body.table ?? ""] ?? [];

  if (tagsToInvalidate.length === 0) {
    return NextResponse.json({ error: "Unknown table or tag" }, { status: 400 });
  }

  tagsToInvalidate.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({ revalidated: tagsToInvalidate });
}
```

**Setup note:** In Supabase dashboard → Database → Webhooks, create a webhook for each table pointing to `https://yourdomain.com/api/revalidate` with header `x-revalidate-secret: <your secret>`.

- [ ] **Step 2: Verify build is still clean**

```bash
npm run build
```

- [ ] **Step 3: Commit everything and tag**

```bash
git add app/api/revalidate/route.ts
git commit -m "feat: revalidation webhook — Supabase → revalidateTag per table"
git tag v0.1.0-template -m "Phase 3 complete — production-ready template scaffold"
```

---

## Expected Post-Phase-3 State

| Checklist Item | Status |
|---|---|
| Two-layer CSS token system | ✅ Task 1 |
| `.env.example` documented | ✅ Task 2 |
| Security headers (CSP, HSTS, X-Frame, etc.) | ✅ Task 3 |
| `remotePatterns` for Supabase Storage | ✅ Task 3 |
| Error boundaries + 404 page | ✅ Task 4 |
| Skip nav + `<main>` landmark | ✅ Task 5 |
| Mobile nav with aria | ✅ Task 5 |
| `lib/seo.ts` metadata builder | ✅ Task 6 |
| `metadataBase` in root layout | ✅ Task 6 |
| `app/sitemap.ts` (Supabase-driven) | ✅ Task 6 |
| `app/robots.ts` | ✅ Task 6 |
| JSON-LD LocalBusiness schema | ✅ Task 7 |
| Supabase project + tables | ✅ Task 8 |
| RLS policies | ✅ Task 8 |
| Seed data | ✅ Task 9 |
| `lib/data.ts` wired to real queries | ✅ Task 10 |
| Contact form → Server Action + Zod | ✅ Task 11 |
| Revalidation webhook | ✅ Task 12 |

**Per-client deployment checklist (post-template):**
1. Copy `.env.example` → `.env.local`, fill in Supabase credentials + domain
2. Update `:root` primitive block in `globals.css` with client palette
3. Create a new Supabase project via MCP (or CLI), apply migrations, run seed
4. Update seed content with client copy in Supabase dashboard
5. Set env vars in Vercel dashboard
6. `git push` → Vercel auto-deploys

Three changes. One client site. Done.
