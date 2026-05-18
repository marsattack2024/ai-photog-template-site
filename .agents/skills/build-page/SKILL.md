---
name: build-page
description: >
  Create new pages or modify existing pages on the P2P website following the design
  system, routing conventions, and component library. Use this skill whenever the user
  wants to: create a new page, add a service page, build a landing page, add a new
  route, update the navigation, or make structural changes to the website. Also trigger
  when the user says "new page", "add a page for", "build the X page", "create a route",
  "add this to the navbar", or references creating any new section of the website. This
  skill enforces the P2P design system (gold/dark/light tokens, Inter font, shared
  components) and handles all wiring (routes.ts, Navbar.tsx, isDarkHeroPage, seo-pages.ts,
  HeroGenreBackground genre type, diagnosticQuestions genre questions and scoring).
---

# Page Builder — P2P Website

This skill creates and modifies pages on the Photography to Profits website,
enforcing the design system and handling all wiring automatically.

## Before You Start

1. Read `guidelines/rules.md` — the page building checklist and component reuse rules
2. Read `guidelines/Guidelines.md` — design tokens, typography, spacing, components
3. Check `src/app/routes.ts` — understand existing routes
4. Check `src/app/components/Navbar.tsx` — understand navigation structure

For the full design token reference, read `references/design-tokens.md` in this
skill directory.

## Page Types

### Standard Page

Any content page (About, Resources, Portfolio, etc.)

### Service Page

Marketing pages for P2P services (Google Ads, Meta Ads, SEO, AEO).
Follow the section flow: Hero → Proof → Problem → Process → Why Different → FAQ → CTA

### Genre Service Page

Pages targeting specific photography genres (Boudoir, Wedding, Newborn, Pet, etc.).
Use `ServicePageHero` with kinetic typography animation.

**Genre pages require 6 touch points** — missing any causes TS errors or silent
fallback to wrong genre data. See the "Genre Service Page Wiring" section below.

### Legal Page

Terms, Privacy, Earnings disclaimers. Minimal styling, content-focused.

### Blog Page

Blog listing or detail — handled by `/manage-blog` skill instead.

---

## Step-by-Step: Creating a New Page

### Step 1: Create the Page File

Create `src/app/pages/YourPage.tsx`:

```tsx
import { motion } from "motion/react";
import { SectionHeader } from "../components/SectionHeader";
import { SectionDivider } from "../components/SectionDivider";
import { PrimaryCTA, SecondaryCTA } from "../components/buttons";

// SEO meta tags (always include — see /manage-seo skill for details)
export function meta() {
  return [
    { title: "Page Title | Photography to Profits" },
    { name: "description", content: "150-160 char description..." },
    { property: "og:title", content: "Page Title" },
    { property: "og:description", content: "150-160 char description..." },
    {
      property: "og:url",
      content: "https://photographytoprofits.com/page-path",
    },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Photography to Profits" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Page Title" },
    { name: "twitter:description", content: "150-160 char description..." },
  ];
}

export default function YourPage() {
  return (
    <>
      {/* Dark Hero Section */}
      <section className="bg-dark py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">{/* Content */}</div>
      </section>

      <SectionDivider from="#0a0a0a" to="#F7F6F3" />

      {/* Light Content Section */}
      <section className="bg-light py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="Section Label"
            heading="Section Title"
            on="light"
          />
          {/* Content */}
        </div>
      </section>

      <SectionDivider from="#F7F6F3" to="#0a0a0a" />

      {/* CTA Section */}
      <section className="bg-dark py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <PrimaryCTA to="/apply">Book Your Strategy Call</PrimaryCTA>
        </div>
      </section>
    </>
  );
}
```

### Step 2: Add the Route

Edit `src/app/routes.ts` — add inside the `layout("./SiteLayout.tsx", [...])` array:

```tsx
route("your-path", "./pages/YourPage.tsx"),
```

Use kebab-case for routes. Place it logically near similar pages.

### Step 3: Update Navigation (if needed)

Edit `src/app/components/Navbar.tsx`:

1. **Add to nav links** if the page should appear in the menu
2. **Add to `isDarkHeroPage`** if the page has a dark hero section — check the
   `isDarkHeroPage` function and add the path to the appropriate check

### Step 4: Add SEO Entry

Add an entry to `src/lib/seo-pages.ts` — this is the single source of truth for
all page SEO. The sitemap is auto-generated from this file at build time (no
manual `react-router.config.ts` edit needed).

```tsx
yourPage: {
  title: "Page Title",
  description: "150-160 char description...",
  path: "/your-path",
  schema: serviceSchema({ name: "...", description: "...", path: "/your-path", areaServed: "United States" }),
  breadcrumb: [
    { name: "Home", path: "/" },
    { name: "Page Title", path: "/your-path" },
  ],
  relatedPages: ["googleAds", "metaAds", "caseStudies"],
},
```

Then in the page file, use the SEO generator:

```tsx
import { generatePageMeta } from "@/lib/seo";
import { SEO_PAGES } from "@/lib/seo-pages";

export const meta: MetaFunction = () => generatePageMeta(SEO_PAGES.yourPage);
```

Use the `/manage-seo` skill for comprehensive SEO beyond the basics.

---

## Genre Service Page Wiring (6 Touch Points — All Required)

Genre pages (Boudoir, Wedding, Pet, etc.) need **all 6 files** updated.
Missing any one causes TS compile errors or silent runtime fallback to the
wrong genre's data (e.g., pet photographers seeing real estate agent questions).

| #   | File                                         | What to Add                                                                                                    |
| --- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 1   | `src/app/pages/<Genre>.tsx`                  | Page file using shared service components                                                                      |
| 2   | `src/app/routes.ts`                          | Route entry inside `layout("./SiteLayout.tsx", [...])`                                                         |
| 3   | `src/app/components/Navbar.tsx`              | Nav link in Services dropdown + path in `isDarkHeroPage`                                                       |
| 4   | `src/lib/seo-pages.ts`                       | SEO entry with title, description, schema, breadcrumb, relatedPages                                            |
| 5   | `src/app/components/HeroGenreBackground.tsx` | Add genre string to `Genre` type union + entry in `ICONS` record + entry in `SILHOUETTES` record               |
| 6   | `src/app/data/diagnosticQuestions.ts`        | Genre-specific question array + scoring branch in `calculateScore()` + case in `getQuestionsForGenre()` switch |

**Step 5 detail — HeroGenreBackground.tsx:**

- Add the genre name to the `Genre` type union (e.g. `| "Pet"`)
- Add a `Pet: [...]` entry to the `ICONS` record (10 floating icons with lucide-react)
- Add a `Pet: <SomeSilhouette />` entry to the `SILHOUETTES` record (reuse an
  existing silhouette as placeholder if no custom SVG exists yet)

**Step 6 detail — diagnosticQuestions.ts:**

- Export a `GENRE_QUESTIONS` array with 5 genre-specific `DiagnosticQuestion` items
- Add an `else if (genre === "Genre")` branch to `calculateScore()` with deduction logic
- Add a `case "Genre":` to the `getQuestionsForGenre()` switch returning your array

**The `genre` prop must match exactly** across ServicePageHero, HeroDiagnostic,
the Genre type, the ICONS key, the SILHOUETTES key, and the switch case.

---

## Service Page Template

For genre service pages, follow this section flow. Reference any existing genre
page (e.g. `MaternityServiceA.tsx`) for the real pattern:

```
ServicePageHero → ProofBar → SectionDivider
  → ProblemSection → SectionDivider
  → WhyDifferentSection → SectionDivider
  → FlipCardGrid → ProcessSection → GuaranteeBlock → SectionDivider
  → FeaturedStudio (optional) → SectionDivider
  → FAQSection → SectionDivider
  → RelatedLinks → HeroDiagnostic
```

Key imports for a full genre page:

```tsx
import { ServicePageHero } from "../components/service/ServicePageHero";
import { ProofBar } from "../components/service/ProofBar";
import {
  ProblemSection,
  ProblemPara,
  ProblemCallout,
  ProblemClose,
} from "../components/service/ProblemSection";
import { WhyDifferentSection } from "../components/service/WhyDifferentSection";
import { FlipCardGrid } from "../components/service/FlipCardGrid";
import { ProcessSection } from "../components/service/ProcessSection";
import { GuaranteeBlock } from "../components/service/GuaranteeBlock";
import { FAQSection } from "../components/service/FAQSection";
import { HeroDiagnostic } from "../components/HeroDiagnostic";
import { RelatedLinks } from "../components/RelatedLinks";
import { SectionDivider } from "../components/SectionDivider";
import { FeaturedStudio } from "../components/FeaturedStudio";
```

**WhyDifferentSection requires `imageSrc` + `imageAlt`** — even with
`hideOutline`. Use a placeholder image if the real one isn't ready yet.

---

## Design System Quick Reference

### Colors (always use tokens, never hex)

- **Gold**: `bg-gold`, `text-gold`, `border-gold`
- **Dark**: `bg-dark`, `text-dark` (page bg, text on light)
- **Light**: `bg-light`, `text-light` (#F7F6F3)
- **Text**: `text-text-gray` (body), `text-text-muted` (captions), `text-text-soft` (on dark)
- **Borders**: `border-border-light` (light bg), `border-border-dark` (dark bg)

### Typography (always set fontFamily + fontWeight inline)

```tsx
style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
```

Never use `font-bold` Tailwind class — theme.css overrides it.

### Spacing

- Container: `max-w-7xl mx-auto px-6`
- Section padding: `py-14 md:py-20` (standard), `py-24 md:py-32` (generous)
- Cards: `rounded-2xl p-7 md:p-8`

### Animation

```tsx
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: Math.min(i * 0.1, 0.3) }}
>
```

### Shared Components — Use These, Don't Rebuild

| Need                  | Component                     | Import                                  |
| --------------------- | ----------------------------- | --------------------------------------- |
| Gold/outline button   | `PrimaryCTA` / `SecondaryCTA` | `../components/buttons`                 |
| Section heading       | `SectionHeader`               | `../components/SectionHeader`           |
| Background transition | `SectionDivider`              | `../components/SectionDivider`          |
| Service hero          | `ServicePageHero`             | `../components/service/ServicePageHero` |
| 3-stat bar            | `ProofBar`                    | `../components/service/ProofBar`        |
| FAQ accordion         | `FAQSection`                  | `../components/service/FAQSection`      |
| Lead form             | `ApplyForm`                   | `../components/service/ApplyForm`       |
| Process steps         | `ProcessSection`              | `../components/service/ProcessSection`  |
| Guarantee             | `GuaranteeBlock`              | `../components/service/GuaranteeBlock`  |

---

## Verification Checklist

After creating/modifying a page:

- [ ] Route added to `src/app/routes.ts`
- [ ] Nav link added to `Navbar.tsx` (if applicable)
- [ ] Added to `isDarkHeroPage` in `Navbar.tsx` (if dark hero)
- [ ] SEO entry in `src/lib/seo-pages.ts` (auto-generates sitemap — no manual edit needed)
- [ ] `meta()` export using `generatePageMeta(SEO_PAGES.key)`
- [ ] Uses design tokens (no hardcoded hex values)
- [ ] `fontFamily` and `fontWeight` set inline on text elements
- [ ] `SectionDivider` between every background color change
- [ ] `SectionHeader` for section titles (not hand-rolled)
- [ ] `PrimaryCTA`/`SecondaryCTA` for buttons (not hand-rolled)
- [ ] Motion animations with `viewport={{ once: true }}`
- [ ] Responsive: mobile-first, `md:` tablet, `lg:` desktop
- [ ] Build succeeds: `npm run build`

**Additional checks for genre service pages:**

- [ ] Genre added to `Genre` type union in `HeroGenreBackground.tsx`
- [ ] ICONS entry added for the genre in `HeroGenreBackground.tsx`
- [ ] SILHOUETTES entry added for the genre in `HeroGenreBackground.tsx`
- [ ] Genre-specific questions exported from `diagnosticQuestions.ts`
- [ ] Scoring branch added in `calculateScore()` for the genre
- [ ] Case added in `getQuestionsForGenre()` switch for the genre
- [ ] `HeroDiagnostic genre="GenreName"` matches all of the above exactly

---

## Related Skills

| Need                      | Skill                           |
| ------------------------- | ------------------------------- |
| Write page copy           | `/copywriting-local-services`   |
| Add SEO + structured data | `/manage-seo`                   |
| P2P brand landing page    | `/landing-style`                |
| Blog content management   | `/manage-blog`                  |
| Design token compliance   | `/style-fix` or `/design-audit` |
| Deploy after building     | `/deploy`                       |
