---
name: manage-seo
description: >
  Manage SEO for the P2P website — add meta tags to pages, create structured data
  (JSON-LD), set canonical URLs, update the sitemap, configure robots.txt, and
  optimize Open Graph / Twitter Card tags. Use this skill whenever the user mentions
  SEO, meta tags, page titles, descriptions, structured data, schema markup, Open Graph,
  Twitter cards, sitemap, robots.txt, canonical URLs, or wants to improve search rankings.
  Also trigger when creating new pages (they need meta), when auditing pages for missing
  SEO, or when the user says "add SEO to", "fix the title", "we need meta tags",
  "Google is showing the wrong description", or "check our SEO".
---

# SEO Management — P2P Website

This skill manages all SEO aspects of the Photography to Profits website.
The site uses React Router v7 framework mode with build-time prerendering.

## Architecture (Updated 2026-03-18)

SEO is centralized in three files — agents should almost never edit page components for SEO:

```
src/lib/seo-pages.ts    ← Single source of truth for all page SEO copy
src/lib/seo.ts          ← Generators: generatePageMeta(), generatePostMeta(), schema builders
src/lib/blog-mapper.ts  ← Blog SEO fields wired through PostSeoFields type
```

### How It Works

1. **`seo-pages.ts`** exports `SEO_PAGES` — a typed config object with one entry per page
2. Each page calls `export const meta = () => generatePageMeta(SEO_PAGES.pageName)`
3. `generatePageMeta()` produces all meta tags, OG tags, Twitter cards, and JSON-LD
4. At build time, prerendering bakes everything into static HTML — Google sees it without JS

### What Each Page Entry Contains

```ts
{
  title: string;              // Page title (50-60 chars) — appended with " | Photography to Profits"
  description: string;        // Meta description (140-160 chars)
  path: string;              // URL path (e.g., "/google-ads")
  ogImage?: string;          // Per-page OG image path (falls back to /assets/og/default-og.png)
  schema?: Record;           // JSON-LD structured data (Service, FAQ, Organization, etc.)
  canonical?: string;        // Override canonical URL
  noIndex?: boolean;         // true for terms, privacy, earnings, test pages
  breadcrumb?: Array;        // BreadcrumbList JSON-LD — auto-generated in <head>
  relatedPages?: string[];   // Keys from SEO_PAGES — powers the RelatedLinks component
}
```

## Core Workflow: Adding SEO to a New Page

### Step 1: Add Entry to `seo-pages.ts`

```ts
// In src/lib/seo-pages.ts, add inside SEO_PAGES:
seniorPortrait: {
  title: "Senior Portrait Photography Marketing",
  description: "Fill your calendar with high school senior sessions. Proven ad campaigns targeting parents in your local market.",
  path: "/senior-portrait",
  schema: serviceSchema({
    name: "Senior Portrait Photography Marketing",
    description: "Marketing for senior portrait photographers.",
    path: "/senior-portrait",
    areaServed: "United States",
  }),
  breadcrumb: [
    { name: "Home", path: "/" },
    { name: "Senior Portrait Marketing", path: "/senior-portrait" },
  ],
  relatedPages: ["googleAds", "metaAds", "caseStudies"],
},
```

### Step 2: Add meta() Export to the Page Component

```tsx
import { generatePageMeta } from "@/lib/seo";
import { SEO_PAGES } from "@/lib/seo-pages";

export const meta = () => generatePageMeta(SEO_PAGES.seniorPortrait);
```

That's it. One line. All meta tags, OG, Twitter, JSON-LD, breadcrumbs are automatic.

### Step 3: Add RelatedLinks Component (if service page)

```tsx
import { RelatedLinks } from "../components/RelatedLinks";

// In JSX, before the last section:
<RelatedLinks pageKey="seniorPortrait" />;
```

### Step 4: Verify

```bash
npm run build
grep "Senior Portrait" build/client/senior-portrait/index.html
```

## Blog Post SEO

Blog posts use a separate path — data comes from Supabase, not `seo-pages.ts`:

- **`generatePostMeta()`** reads SEO overrides from the post object
- Supabase `posts` table has: `seo_title`, `seo_description`, `og_image_url`, `canonical_url`
- If override is null, falls back to: `title`, `excerpt`, YouTube thumbnail, auto-generated URL
- JSON-LD: `Article` schema for articles, `VideoObject` for video posts (automatic)

To set blog SEO, update the Supabase row — no code changes needed.

## Available Schema Builders (in seo.ts)

| Function                                                 | Use Case                                                     |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| `organizationSchema()`                                   | Homepage only — OnlineBusiness with founder, social, contact |
| `serviceSchema({ name, description, path, areaServed })` | All service pages                                            |
| `faqSchema([{ question, answer }])`                      | Pages with FAQ sections                                      |
| `breadcrumbSchema([{ name, path }])`                     | Auto-wired via `breadcrumb` field in seo-pages.ts            |

## SEO Audit Workflow

When auditing SEO coverage:

1. Every page in `seo-pages.ts` already has title + description
2. Check for missing `schema` entries on service pages
3. Check for missing `breadcrumb` entries
4. Check for missing `relatedPages` (internal linking)
5. For blog posts: check `seo_title` and `seo_description` columns in Supabase

## Sitemap

Auto-generated at build time from `react-router.config.ts`:

- Static pages: read from `seo-pages.ts`
- Blog posts: fetched from Supabase `posts` table (published only)
- Output: `public/sitemap.xml`
- No manual maintenance needed — add a page to `seo-pages.ts` and it appears

## Key Files

| File                                  | Purpose                                                  |
| ------------------------------------- | -------------------------------------------------------- |
| `src/lib/seo-pages.ts`                | All page SEO config — edit this for copy changes         |
| `src/lib/seo.ts`                      | Meta generators + schema builders — rarely needs editing |
| `src/lib/blog-mapper.ts`              | Blog SEO field passthrough — PostSeoFields type          |
| `src/app/components/RelatedLinks.tsx` | Internal linking component                               |
| `react-router.config.ts`              | Prerender list + sitemap generation                      |
| `public/assets/og/default-og.png`     | Default OG image (1200x630)                              |

## Related Skills

| Need                                 | Skill           |
| ------------------------------------ | --------------- |
| Create blog post with SEO fields     | `/manage-blog`  |
| Build a new page (includes SEO step) | `/build-page`   |
| Deploy to update sitemap             | `/deploy`       |
| Check design compliance              | `/design-audit` |
