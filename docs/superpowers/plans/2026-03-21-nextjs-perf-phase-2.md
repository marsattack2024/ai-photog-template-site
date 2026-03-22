# Next.js Performance Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Push Lighthouse score from its current optimized baseline toward 95+ by eliminating framer-motion from the client bundle, fixing missing `sizes` props on all fill images, enabling Partial Prerendering, and pre-wiring the Supabase data layer with `use cache`.

**Architecture:** Four independent workstreams — bundle elimination (framer-motion), image correctness (`sizes` prop), rendering model (PPR via `cacheComponents`), and data layer stubs (`lib/data.ts`). Each task is self-contained and produces a passing build.

**Tech Stack:** Next.js 15.5.x App Router, React 19, Tailwind CSS v4, framer-motion v12 (to be eliminated), Supabase (stubs only — not wired yet)

**Research sources (verified against live docs, March 2026):**
- https://nextjs.org/docs/app/api-reference/components/image — `sizes` prop requirement for `fill` images
- https://nextjs.org/docs/app/getting-started/caching — `cacheComponents: true` / PPR model
- https://nextjs.org/docs/app/api-reference/directives/use-cache — `use cache` directive
- https://nextjs.org/docs/app/api-reference/functions/after — `after()` API
- https://nextjs.org/docs/app/guides/package-bundling — bundle analyzer (`npx next experimental-analyze`)

---

## Phase 2 Context (What's Already Done)

From Phase 1:
- ✅ `next/font/google` — Playfair + DM Sans, `display: swap`
- ✅ AVIF + WebP in `next.config.ts`
- ✅ Hero split: `Hero.tsx` (server, raw `<img fetchpriority="high">`) + `HeroOverlay.tsx` (client, motion)
- ✅ `AnimateOnScroll.tsx` — thin client wrapper for scroll animations
- ✅ 4 sections converted to server components: GalleryGrid, ProcessSteps, SplitSection, AboutTeaser
- ✅ `next/dynamic` for all 10 below-fold sections
- ✅ `loading.tsx` skeleton

**Remaining framer-motion usage (6 files):**
| File | Why client | framer-motion usage |
|------|-----------|---------------------|
| `HeroOverlay.tsx` | motion entrance | `motion.div` (opacity/y) |
| `TestimonialCards.tsx` | carousel state | `AnimatePresence` + `motion.div` slide |
| `TestimonialsCarousel.tsx` | carousel state | `motion.div` header + card transitions |
| `FAQSection.tsx` | accordion state | `AnimatePresence` + `motion.div` expand |
| `components/ui/Button.tsx` | hover/tap | `motion.button` whileHover + whileTap |
| `components/ui/AnimateIn.tsx` | entrance | `motion.div` — superseded by AnimateOnScroll |

**Missing `sizes` props on `<Image fill>` (4+ files):**
GalleryGrid, AboutTeaser, SplitSection, MeetPhotographer — all use `fill` with no `sizes`.
Per docs: without `sizes`, Next.js assumes `100vw` on all screen sizes → serves oversized images to mobile.

---

## File Map

| File | Action | Why |
|------|--------|-----|
| `components/sections/HeroOverlay.tsx` | Modify | Replace `motion.div` with CSS `@keyframes` → eliminates client JS for hero animation |
| `components/sections/TestimonialCards.tsx` | Modify | Replace `AnimatePresence` + `motion.div` with CSS `transition` |
| `components/sections/TestimonialsCarousel.tsx` | Modify | Replace `motion.div` with `AnimateOnScroll` (header) + CSS card transition |
| `components/sections/FAQSection.tsx` | Modify | Replace `AnimatePresence` accordion with CSS `grid-template-rows` trick |
| `lib/motion.ts` | Delete | No longer needed after framer-motion elimination |
| `components/ui/Button.tsx` | Modify | Replace `motion.button` with plain `<button>` + CSS transforms |
| `components/ui/AnimateIn.tsx` | Delete | Superseded by `AnimateOnScroll.tsx`; exports removed from `index.ts` |
| `components/sections/GalleryGrid.tsx` | Modify | Add `sizes` to all `<Image fill>` |
| `components/sections/AboutTeaser.tsx` | Modify | Add `sizes` to all `<Image fill>` |
| `components/sections/SplitSection.tsx` | Modify | Add `sizes` to `<Image fill>` |
| `components/sections/MeetPhotographer.tsx` | Modify | Add `sizes` to `<Image fill>` |
| `next.config.ts` | Modify | Add `cacheComponents: true` |
| `app/(site)/page.tsx` | Modify | Wrap future dynamic sections in `<Suspense>` per PPR model |
| `lib/data.ts` | Create | Supabase query stubs with `use cache` + `cacheLife()` |
| `app/(site)/galleries/[slug]/page.tsx` | Create | `generateStaticParams` stub |
| `app/(site)/blog/[slug]/page.tsx` | Create | `generateStaticParams` stub |
| `package.json` | Modify | Remove `framer-motion` after all usages eliminated |

---

## Task 1: Add `sizes` Prop to All `<Image fill>` Components

**Why:** Per [Next.js docs](https://nextjs.org/docs/app/api-reference/components/image#sizes), images with `fill` default to `100vw` if `sizes` is missing. This causes Next.js to serve a 1920px image to a phone looking at a 2-column grid cell. Without `sizes`, the `srcSet` is useless. This is a silent bandwidth killer.

**Rule:** `sizes` = the CSS width of the container at each breakpoint.

**Files:**
- Modify: `components/sections/GalleryGrid.tsx`
- Modify: `components/sections/AboutTeaser.tsx`
- Modify: `components/sections/SplitSection.tsx`
- Modify: `components/sections/MeetPhotographer.tsx`

---

- [ ] **Step 1: Fix GalleryGrid — 2-column grid, each cell is ~50vw on desktop, 50vw on mobile**

In `components/sections/GalleryGrid.tsx`, find every `<Image ... fill ...>` and add the `sizes` prop:

```tsx
<Image
  src={img.src}
  alt={img.alt}
  fill
  sizes="(max-width: 1024px) 50vw, 500px"
  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
/>
```

- [ ] **Step 2: Fix AboutTeaser — 3 images inside a 50vw column (2-column layout)**

Top image spans `col-span-2` inside the half-width column:
```tsx
{/* Top image — col-span-2 inside 50vw column */}
<Image src={images[0]} alt={imageAlts[0]} fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover" />

{/* Bottom two — each ~25vw on desktop, 50vw on mobile */}
<Image src={images[1]} alt={imageAlts[1]} fill
  sizes="(max-width: 768px) 50vw, 25vw"
  className="object-cover" />

<Image src={images[2]} alt={imageAlts[2]} fill
  sizes="(max-width: 768px) 50vw, 25vw"
  className="object-cover" />
```

- [ ] **Step 3: Fix SplitSection — fill image in a 50/50 grid**

```tsx
<Image
  src={imageSrc}
  alt={imageAlt}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>
```

- [ ] **Step 4: Fix MeetPhotographer — check and add `sizes` based on its layout**

Read `components/sections/MeetPhotographer.tsx` first. Add appropriate `sizes` based on its container width at each breakpoint. Common pattern:
```tsx
sizes="(max-width: 768px) 100vw, 50vw"
```

- [ ] **Step 5: Build and verify no errors**

```bash
npm run build
```
Expected: clean build, no type errors.

- [ ] **Step 6: Commit**

```bash
git add components/sections/GalleryGrid.tsx components/sections/AboutTeaser.tsx components/sections/SplitSection.tsx components/sections/MeetPhotographer.tsx
git commit -m "perf: add sizes prop to all fill images — fixes 100vw default on mobile"
```

---

## Task 2: Eliminate framer-motion — HeroOverlay (CSS @keyframes)

**Why:** `HeroOverlay.tsx` is `"use client"` solely for a one-time entrance animation (opacity 0→1, y 28→0). There are no hooks, no state, no interaction. CSS `@keyframes` does this with zero JS — and since the animation runs once on mount, CSS is architecturally superior (no hydration required).

**Files:**
- Modify: `components/sections/HeroOverlay.tsx`
- Modify: `app/globals.css`

---

- [ ] **Step 1: Add keyframe to globals.css**

In `app/globals.css`, add after the existing `@theme` block:

```css
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

- [ ] **Step 2: Rewrite HeroOverlay as a server component**

Replace `components/sections/HeroOverlay.tsx` entirely:

```tsx
// Server component — CSS animation, no JS required
interface HeroOverlayProps {
  eyebrow?: string;
  headline: string;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
}

export function HeroOverlay({ eyebrow, headline, subline, ctaLabel, ctaHref }: HeroOverlayProps) {
  return (
    <div
      className="relative z-10 w-full max-w-7xl mx-auto px-10 md:px-16 pb-20 md:pb-28"
      style={{
        animation: "slide-up 0.9s cubic-bezier(0.22,1,0.36,1) both",
      }}
    >
      <div className="max-w-lg flex flex-col gap-5">
        {eyebrow && (
          <span className="text-xs uppercase tracking-[0.25em] text-white/60 font-medium">
            {eyebrow}
          </span>
        )}

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] text-white">
          {headline}
        </h1>

        <p className="text-sm md:text-base leading-relaxed text-white/75 max-w-sm">
          {subline}
        </p>

        <div className="pt-2">
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium border border-white/40 text-white px-8 py-4 hover:bg-white hover:text-(--color-ink) transition-colors duration-300"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```
Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add components/sections/HeroOverlay.tsx app/globals.css
git commit -m "perf: replace HeroOverlay motion.div with CSS @keyframes — removes use client"
```

---

## Task 3: Eliminate framer-motion — FAQSection (CSS grid-template-rows accordion)

**Why:** `AnimatePresence` adds ~30KB just for show/hide. CSS `grid-template-rows: 0fr → 1fr` achieves the same accordion expand/collapse with zero JS and smooth animation. This is a documented CSS pattern supported in all modern browsers.

**Files:**
- Modify: `components/sections/FAQSection.tsx`

---

- [ ] **Step 1: Remove framer-motion, replace with CSS accordion**

Rewrite `FAQSection.tsx`:

```tsx
"use client";
import { useState } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui";

// ... keep the same faqs array ...

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-(--color-border)">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-serif text-lg text-(--color-ink)">{q}</span>
        <span
          className="text-(--color-muted) transition-transform duration-300 ml-4 flex-shrink-0"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {/* CSS accordion: grid-template-rows 0fr → 1fr */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-(--color-muted) leading-relaxed pb-5">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="bg-(--color-cream) py-24 px-6 border-t border-(--color-border)">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">FAQ</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-3 md:text-5xl">
            Everything You <em className="italic">Want to Know</em>
          </h2>
        </AnimateOnScroll>

        <div>
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        <AnimateOnScroll delay={100} className="flex flex-col items-center gap-5 mt-16 text-center">
          <p className="text-sm text-(--color-muted) max-w-sm leading-relaxed">
            Still have questions? Reach out — there&apos;s no pressure and no script. Just a real conversation.
          </p>
          <a href="#contact"><Button variant="ghost">Send a Message</Button></a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
```

> **Note:** Preserve the complete `faqs` array from the original file. Only replace the animation logic.

- [ ] **Step 2: Build and verify**

```bash
npm run build
```
Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add components/sections/FAQSection.tsx
git commit -m "perf: replace FAQSection AnimatePresence with CSS grid-template-rows accordion"
```

---

## Task 3.5: Eliminate framer-motion — Button.tsx + AnimateIn.tsx

**Why:** `Button.tsx` uses `motion.button` with `whileHover={{ scale: 1.02 }}` and `whileTap={{ scale: 0.98 }}`. This imports framer-motion into the client bundle everywhere a button is rendered. CSS `:hover` + `:active` transforms are identical visually and require zero JS. `AnimateIn.tsx` is dead code superseded by `AnimateOnScroll.tsx` — it just exports a `motion.div`. Both must be fixed BEFORE `npm uninstall framer-motion` or the build breaks.

**Files:**
- Modify: `components/ui/Button.tsx`
- Delete: `components/ui/AnimateIn.tsx`
- Modify: `components/ui/index.ts`

---

- [ ] **Step 1: Rewrite Button.tsx — replace motion.button with plain button + CSS transforms**

```tsx
"use client";

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseStyles =
  "inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium transition-colors duration-300 cursor-pointer border active:scale-[0.98] hover:scale-[1.02] transition-transform";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-(--color-cream) text-(--color-ink) border-(--color-ink) hover:bg-(--color-ink) hover:text-(--color-cream)",
  ghost:
    "bg-transparent text-(--color-ink) border-(--color-ink) hover:bg-(--color-ink) hover:text-(--color-cream)",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-6 py-3",
  lg: "px-8 py-4",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

> Note: `transition-transform` and `transition-colors` are both needed. Tailwind applies both; they don't conflict. The `active:scale-[0.98]` replaces `whileTap`.

- [ ] **Step 2: Delete AnimateIn.tsx and remove from index.ts**

```bash
rm components/ui/AnimateIn.tsx
```

Remove from `components/ui/index.ts`:
```ts
// Delete this line:
export { AnimateIn } from "./AnimateIn";
```

- [ ] **Step 3: Check no component imports AnimateIn**

```bash
grep -r "AnimateIn" --include="*.tsx" --include="*.ts" . | grep -v node_modules
```
Expected: only `index.ts` (which we just cleaned) or zero results.

- [ ] **Step 4: Build and verify**

```bash
npm run build
```
Expected: clean build.

- [ ] **Step 5: Commit**

```bash
git add components/ui/Button.tsx components/ui/AnimateIn.tsx components/ui/index.ts
git commit -m "perf: replace motion.button with CSS transforms in Button, delete AnimateIn"
```

---

## Task 4: Eliminate framer-motion — TestimonialCards + TestimonialsCarousel (CSS transitions)

**Why:** Both carousels use `AnimatePresence` + `motion.div` for slide transitions. CSS `opacity` + `transform` transitions keyed by slide index produce identical visuals with zero framer-motion dependency.

**Files:**
- Modify: `components/sections/TestimonialCards.tsx`
- Modify: `components/sections/TestimonialsCarousel.tsx`

---

- [ ] **Step 1: Rewrite TestimonialCards — replace AnimatePresence with CSS**

In `TestimonialCards.tsx`, the slide transition currently uses:
```tsx
<AnimatePresence mode="wait">
  <motion.div key={current} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
```

Replace with a CSS approach using a wrapper that forces remount via key:

```tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

// ... keep Stars component, featured array unchanged ...

export function TestimonialCards() {
  const [current, setCurrent] = useState(0);
  const total = featured.length;
  const t = featured[current];

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section className="bg-(--color-cream) py-24 px-6 border-t border-(--color-border)">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">Client Love</span>
          <h2 className="font-serif text-3xl font-normal text-(--color-ink) mt-2 md:text-4xl">
            Lovely Words. <em className="italic">Real Women.</em>
          </h2>
        </AnimateOnScroll>

        {/* Slide — CSS fade transition keyed by current */}
        <div
          key={current}
          className="flex flex-col items-center gap-6 text-center"
          style={{ animation: "fade-in-up 0.45s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <div className="relative w-24 h-24 rounded-full overflow-hidden border border-(--color-border)">
            <Image src="/placeholder/square.svg" alt="Client headshot" fill sizes="96px" className="object-cover" />
          </div>

          <Stars count={t.stars} />

          <blockquote className="font-serif text-xl md:text-2xl italic text-(--color-ink) leading-relaxed max-w-2xl">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <div className="flex flex-col items-center gap-0.5 pt-2">
            <p className="text-sm font-medium text-(--color-ink)">{t.name}</p>
            <p className="text-xs tracking-widest uppercase text-(--color-muted)">{t.detail}</p>
          </div>
        </div>

        {/* Controls — unchanged */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button onClick={prev} aria-label="Previous" className="w-10 h-10 border border-(--color-border) text-(--color-ink) hover:border-(--color-ink) transition-colors flex items-center justify-center">←</button>
          <div className="flex gap-2">
            {featured.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-(--color-accent) w-6" : "bg-(--color-border) w-1.5"}`}
              />
            ))}
          </div>
          <button onClick={next} aria-label="Next" className="w-10 h-10 border border-(--color-border) text-(--color-ink) hover:border-(--color-ink) transition-colors flex items-center justify-center">→</button>
        </div>
      </div>
    </section>
  );
}
```

Add to `app/globals.css`:
```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

- [ ] **Step 2: Rewrite TestimonialsCarousel — same CSS pattern**

In `TestimonialsCarousel.tsx`:
- Replace the `motion.div` header with `<AnimateOnScroll className="text-center mb-14">`
- Replace `motion.div key={...} initial/animate/transition` on cards with the same `key={...}` + CSS `animation: fade-in-up` pattern (stagger via `animation-delay`)

```tsx
"use client";
import { useState } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

// ... keep testimonials array ...

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const visible = [
    testimonials[current % total],
    testimonials[(current + 1) % total],
    testimonials[(current + 2) % total],
  ];

  return (
    <section className="bg-(--color-ink) py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">Lovely Words</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-cream) mt-3 md:text-5xl">
            The Experience They <em className="italic">Talk About</em>
          </h2>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <div
              key={`${current}-${i}`}
              className={`flex flex-col gap-5 p-8 border border-white/10 bg-white/5 ${i > 0 ? "hidden md:flex" : "flex"}`}
              style={{ animation: `fade-in-up 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 100}ms both` }}
            >
              <span className="font-serif text-5xl text-(--color-accent) opacity-40 leading-none">&ldquo;</span>
              <blockquote className="font-serif text-base italic text-(--color-cream) leading-relaxed flex-1">
                {t.quote}
              </blockquote>
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm font-medium text-(--color-cream)">{t.name}</p>
                <p className="text-xs tracking-widest uppercase text-(--color-muted) mt-0.5">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls — unchanged */}
        <div className="flex items-center justify-center gap-6">
          <button onClick={prev} aria-label="Previous" className="w-10 h-10 border border-white/20 text-(--color-cream) hover:border-white/60 transition-colors flex items-center justify-center">←</button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-(--color-accent) w-4" : "bg-white/30"}`}
              />
            ))}
          </div>
          <button onClick={next} aria-label="Next" className="w-10 h-10 border border-white/20 text-(--color-cream) hover:border-white/60 transition-colors flex items-center justify-center">→</button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```
Expected: clean build.

- [ ] **Step 4: Remove framer-motion package and lib/motion.ts**

```bash
npm uninstall framer-motion
```

Then delete `lib/motion.ts`:
```bash
rm lib/motion.ts
```

Verify no remaining imports:
```bash
grep -r "framer-motion" --include="*.tsx" --include="*.ts" . | grep -v node_modules
```
Expected: no output.

- [ ] **Step 5: Final build after package removal**

```bash
npm run build
```
Expected: clean build, framer-motion no longer in output.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "perf: eliminate framer-motion entirely — replace with CSS @keyframes + AnimateOnScroll"
```

---

## Task 5: Enable Partial Prerendering (cacheComponents: true)

**Why:** Per [Next.js docs](https://nextjs.org/docs/app/getting-started/caching), `cacheComponents: true` enables the PPR model — the default rendering approach as of Next.js 16. With this enabled:
- Components with `use cache` → included in the static shell
- Components wrapped in `<Suspense>` without `use cache` → stream at request time
- Everything else → pre-rendered into static HTML

This is a zero-cost change on a template with no dynamic data. It future-proofs every Supabase query for free.

**Files:**
- Modify: `next.config.ts`
- Modify: `app/(site)/page.tsx`

---

- [ ] **Step 1: Enable cacheComponents in next.config.ts**

```ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  experimental: {
    cacheComponents: true,  // PPR — see https://nextjs.org/docs/app/getting-started/caching
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

> **Critical:** `cacheComponents` must be nested under `experimental`, not placed at the top level. A top-level `cacheComponents: true` is silently ignored in Next.js 15.5.x — PPR never activates and no build error is produced.

- [ ] **Step 2: Add Suspense wrappers to page.tsx for future dynamic sections**

In `app/(site)/page.tsx`, wrap the dynamic imports that will eventually fetch Supabase data in `<Suspense>` with skeleton fallbacks. This makes the PPR boundary explicit for future developers:

```tsx
import { Suspense } from "react";

// Sections that will fetch from Supabase get Suspense boundaries:
<Suspense fallback={<div className="py-24 bg-(--color-cream) animate-pulse" />}>
  <GalleryGrid />
</Suspense>

<Suspense fallback={<div className="py-24 bg-(--color-cream) animate-pulse" />}>
  <TestimonialCards />
</Suspense>

<Suspense fallback={<div className="py-16 bg-(--color-ink) animate-pulse" />}>
  <TestimonialsCarousel />
</Suspense>
```

> Sections with purely static markup (ProcessSteps, WhyBook, IncludesGrid, UrgencyBlock, SocialProofStrip) do NOT need Suspense — they have no async data.

- [ ] **Step 3: Build and verify**

```bash
npm run build
```
Expected: clean build. Note any new warnings about uncached data outside Suspense — they indicate components that will need `use cache` when wired to Supabase.

- [ ] **Step 4: Commit**

```bash
git add next.config.ts "app/(site)/page.tsx"
git commit -m "feat: enable cacheComponents (PPR) + add Suspense boundaries for future Supabase sections"
```

---

## Task 6: Create lib/data.ts — Supabase Query Stubs with use cache

**Why:** When Supabase is wired up, every query function should use `use cache` + `cacheLife()` by default. Creating these stubs now means future developers copy a working, correctly-cached pattern instead of forgetting it. Per [docs](https://nextjs.org/docs/app/api-reference/directives/use-cache), `use cache` at the function level caches the return value with arguments as the cache key.

**Files:**
- Create: `lib/data.ts`
- Reference: `lib/supabase.ts` (already exists)

---

- [ ] **Step 1: Read lib/supabase.ts to understand the client setup**

Read `lib/supabase.ts` to understand the existing client export.

- [ ] **Step 2: Create lib/data.ts with cached query stubs**

```ts
/**
 * lib/data.ts — Supabase query functions
 *
 * ALL functions use `use cache` + `cacheLife()` by convention.
 * Replace TODO stubs with real Supabase queries when the database is seeded.
 *
 * Docs: https://nextjs.org/docs/app/api-reference/directives/use-cache
 */
import { cacheLife, cacheTag } from "next/cache";
// import { supabase } from "./supabase"; // Uncomment when wiring Supabase

// --- Testimonials ---

export async function getTestimonials() {
  "use cache";
  cacheLife("hours");
  cacheTag("testimonials");

  // TODO: return supabase.from("testimonials").select("*").eq("active", true).order("display_order");
  return [];
}

// --- Gallery ---

export async function getGalleries() {
  "use cache";
  cacheLife("days");
  cacheTag("galleries");

  // TODO: return supabase.from("galleries").select("*").eq("published", true).order("display_order");
  return [];
}

export async function getGalleryBySlug(slug: string) {
  "use cache";
  cacheLife("days");
  cacheTag(`gallery-${slug}`);

  // TODO: return supabase.from("galleries").select("*, gallery_images(*)").eq("slug", slug).single();
  return null;
}

export async function getGallerySlugs(): Promise<string[]> {
  "use cache";
  cacheLife("days");
  cacheTag("gallery-slugs");

  // TODO: const { data } = await supabase.from("galleries").select("slug").eq("published", true);
  // return data?.map((g) => g.slug) ?? [];
  return [];
}

// --- Blog ---

export async function getPosts() {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");

  // TODO: return supabase.from("posts").select("*").eq("published", true).order("published_at", { ascending: false });
  return [];
}

export async function getPostBySlug(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(`post-${slug}`);

  // TODO: return supabase.from("posts").select("*").eq("slug", slug).eq("published", true).single();
  return null;
}

export async function getPostSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("days");
  cacheTag("post-slugs");

  // TODO: const { data } = await supabase.from("posts").select("slug").eq("published", true);
  // return data?.map((p) => p.slug) ?? [];
  return [];
}

// --- Services ---

export async function getServices() {
  "use cache";
  cacheLife("days");
  cacheTag("services");

  // TODO: return supabase.from("services").select("*").eq("active", true).order("display_order");
  return [];
}

// --- Site Config ---

export async function getSiteConfig() {
  "use cache";
  cacheLife("days");
  cacheTag("site-config");

  // TODO: return supabase.from("site_config").select("*").single();
  return null;
}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```
Expected: clean build. TypeScript may warn about `cacheLife`/`cacheTag` imports — these require `cacheComponents: true` (already done in Task 5).

- [ ] **Step 4: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add lib/data.ts with use cache stubs for all Supabase queries"
```

---

## Task 7: Add generateStaticParams Stubs to Dynamic Routes

**Why:** Per [docs](https://nextjs.org/docs/app/api-reference/functions/generate-static-params), `generateStaticParams` pre-generates all dynamic route HTML at build time. Without it, gallery/blog slugs are rendered on-demand for every visitor's first request. With it, they're pre-baked into the static shell.

**Files:**
- Create: `app/(site)/galleries/[slug]/page.tsx`
- Create: `app/(site)/blog/[slug]/page.tsx`

---

- [ ] **Step 1: Create gallery slug route**

Create directory: `app/(site)/galleries/[slug]/`

```tsx
// app/(site)/galleries/[slug]/page.tsx
import { getGalleryBySlug, getGallerySlugs } from "@/lib/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getGallerySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gallery = await getGalleryBySlug(slug);

  if (!gallery) notFound();

  return (
    <main className="min-h-screen bg-(--color-cream) py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-serif text-5xl text-(--color-ink)">Gallery</h1>
        <p className="text-(--color-muted) mt-2">Slug: {slug}</p>
        {/* TODO: render gallery images from Supabase */}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Create blog slug route**

Create directory: `app/(site)/blog/[slug]/`

```tsx
// app/(site)/blog/[slug]/page.tsx
import { getPostBySlug, getPostSlugs } from "@/lib/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-(--color-cream) py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl text-(--color-ink)">Blog Post</h1>
        <p className="text-(--color-muted) mt-2">Slug: {slug}</p>
        {/* TODO: render post content from Supabase */}
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```
Expected: clean build. Routes appear as `○ (Static)` in build output.

- [ ] **Step 4: Commit**

```bash
git add "app/(site)/galleries" "app/(site)/blog"
git commit -m "feat: add gallery and blog [slug] routes with generateStaticParams stubs"
```

---

## Task 8 (Informational): Run Bundle Analyzer Baseline

**Why:** Before declaring performance work complete, capture a baseline of the client bundle to confirm framer-motion is fully gone and identify any surprises.

**No code changes — this is a read-only audit.**

- [ ] **Step 1: Install and configure @next/bundle-analyzer**

Per [docs](https://nextjs.org/docs/app/guides/package-bundling):

```bash
npm install --save-dev @next/bundle-analyzer
```

Temporarily wrap `next.config.ts` for the analysis run:
```ts
import withBundleAnalyzer from "@next/bundle-analyzer";

const analyze = withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" });
export default analyze(nextConfig);
```

Then run:
```bash
ANALYZE=true npm run build
```

This opens 3 browser tabs (client, server, edge bundles). Per docs, a separate `npx next experimental-analyze` command exists for the Turbopack module graph (v16.1+), but is not available in v15.5.x.

- [ ] **Step 2: Check the client bundle for unexpected large packages**

In the analyzer UI:
1. Filter by route: `/` (homepage)
2. Filter by environment: `client`
3. Look for any package > 20KB that shouldn't be there

**What you should NOT see after this plan:**
- `framer-motion` — eliminated in Task 4
- `@emotion` / `@mui` — never installed

**What you will see (expected):**
- `react` + `react-dom` (~130KB — framework, unavoidable)
- Small Next.js runtime
- `AnimateOnScroll.tsx` (tiny — just a `useRef` + `useEffect`)

- [ ] **Step 3: Document findings**

If any unexpected large package is found, create a new task to address it. Otherwise, record the baseline numbers in `PERFORMANCE.md` (or as a comment in `next.config.ts`).

---

## Expected Outcomes After All Tasks

| Metric | Before Phase 2 | After Phase 2 | Source |
|--------|---------------|---------------|--------|
| framer-motion in client bundle | ~50KB gzipped | 0 KB | Tasks 2-4 |
| Image sizes on mobile | 100vw default (wrong) | Correctly sized | Task 1 |
| Gallery image at 480px col | ~800KB JPEG | ~80KB AVIF | Tasks 1 + next.config |
| PPR enabled | No | Yes | Task 5 |
| Supabase queries cache-ready | No | Yes (stubs) | Task 6 |
| Dynamic routes | Not scaffolded | Stubbed + static | Task 7 |
| TBT (from framer-motion hydration) | ~50-80ms | ~0ms | Tasks 2-4 |

---

## Key Docs Referenced (All Verified March 2026)

| Topic | URL |
|-------|-----|
| `sizes` prop for fill images | https://nextjs.org/docs/app/api-reference/components/image#sizes |
| `cacheComponents` / PPR | https://nextjs.org/docs/app/getting-started/caching |
| `use cache` directive | https://nextjs.org/docs/app/api-reference/directives/use-cache |
| `cacheLife` / `cacheTag` | https://nextjs.org/docs/app/getting-started/caching-and-revalidating |
| `generateStaticParams` | https://nextjs.org/docs/app/api-reference/functions/generate-static-params |
| Bundle analyzer | https://nextjs.org/docs/app/guides/package-bundling |
| `after()` API | https://nextjs.org/docs/app/api-reference/functions/after |
