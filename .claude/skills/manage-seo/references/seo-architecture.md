# SEO Architecture Reference

> Research-backed (March 2026). Sources: Google Search Central, Schema.org specs,
> React Router v7 docs, photography SEO best practices guides.

## Critical Gotchas

1. **React Router v7 meta() does NOT merge** — a child route's meta() completely
   replaces parent meta. If root has `{ charSet: "utf-8" }` and child returns only
   `{ title: "Child" }`, the charset is GONE. To preserve parent meta:
   ```tsx
   export function meta({ matches }: Route.MetaArgs) {
     const parentMeta = matches.flatMap((match) => match.meta ?? []);
     return [...parentMeta, { title: "Child Page" }];
   }
   ```
2. **`Service` and `ProfessionalService` do NOT trigger Google rich results** —
   but they help knowledge graph and AI search classification. Focus rich result
   effort on `FAQPage`, `VideoObject`, `BreadcrumbList`, `Article`.
3. **VideoObject schema requires visible video** — Google will penalize schema
   that doesn't match a playable embed on the page.
4. **og:image should be 1200x630px** and unique per page — don't reuse the same
   image everywhere.

## Base URL

`https://photographytoprofits.com`

## Current SEO Coverage

### Pages WITH meta tags (2/32):

- `BlogPost.tsx` — Full SEO via `generatePostMeta()` (title, description, OG, Twitter, JSON-LD)
- `BlogA.tsx` — Basic meta (title + description only)

### Pages WITHOUT meta tags (30/32):

All other pages have NO custom meta — they rely on React Router defaults.

**Priority 1 — Service pages (highest traffic potential):**

- Home.tsx → /
- GoogleAds.tsx → /google-ads
- MetaAds.tsx → /meta-ads
- SEO.tsx → /seo
- AEO.tsx → /aeo
- BoudoirServiceA.tsx → /boudoir
- WeddingServiceA.tsx → /wedding
- NewbornServiceA.tsx → /newborn
- MaternityServiceA.tsx → /maternity
- BrandingServiceA.tsx → /branding
- RealEstateServiceA.tsx → /real-estate

**Priority 2 — Content pages:**

- About.tsx → /about
- WhyRecommend.tsx → /why-recommend
- Resources.tsx → /resources
- Calculator.tsx → /calculator
- Podcast.tsx → /podcast
- Portfolio.tsx → /portfolio
- CaseStudies.tsx → /case-studies

**Priority 3 — Secondary/legal:**

- BoudoirServiceB.tsx → /boudoir-b
- BlogB.tsx → /blog-b
- Terms.tsx → /terms
- Privacy.tsx → /privacy
- Earnings.tsx → /earnings

**Skip (no-layout / standalone):**

- BookLanding.tsx → /book
- Book1Landing.tsx → /book1
- NotFound.tsx → \*

---

## Technical Architecture

### Meta tag generation

- `src/lib/seo.ts` — `generatePostMeta()` for blog posts
- Per-page `export function meta()` for static pages
- React Router v7 `<Meta />` component in `root.tsx` renders tags from meta()

### Sitemap

- Generated in `react-router.config.ts` `buildEnd` hook
- Static paths hardcoded in `staticPaths` array
- Blog paths fetched from Supabase at build time
- Output: `build/client/sitemap.xml`

### Prerendering

- All routes in `staticPaths` + blog slugs are prerendered at build time
- Produces static `.html` files with meta tags baked in
- `react-router.config.ts` `prerender` hook

### Robots.txt

- `public/robots.txt` → copied to build output
- Currently: Allow all, Sitemap reference

---

## Schema.org Types by Page Category

| Page Category       | Schema Type           | Key Properties                                       |
| ------------------- | --------------------- | ---------------------------------------------------- |
| Homepage            | Organization          | name, url, founder, description, sameAs              |
| Service pages       | Service               | name, description, provider, areaServed, serviceType |
| Genre service pages | Service               | + additionalType: "PhotographyService"               |
| About               | AboutPage             | name, description                                    |
| Blog post           | Article / VideoObject | headline, author, datePublished, image               |
| Calculator          | WebApplication        | name, applicationCategory                            |
| Podcast             | PodcastSeries         | name, description, author                            |
| Portfolio           | CollectionPage        | name, description                                    |
| Legal pages         | WebPage               | name, description (minimal)                          |

---

## Complete Schema Examples

### Homepage — ProfessionalService with hasOfferCatalog

The `hasOfferCatalog` pattern nests all services under the business entity,
giving Google a complete picture of what P2P offers:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://photographytoprofits.com/#organization",
  "name": "Photography to Profits",
  "url": "https://photographytoprofits.com",
  "description": "Photography business growth expert helping photographers build 6-figure businesses through marketing, systems, and coaching.",
  "founder": {
    "@type": "Person",
    "name": "Humberto Garcia",
    "jobTitle": "Founder"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Miami",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "telephone": "+1-786-802-2316",
  "email": "support@photographytoprofits.com",
  "areaServed": { "@type": "Country", "name": "US" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "P2P Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Google Ads for Photographers",
          "url": "https://photographytoprofits.com/google-ads"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Meta Ads for Photographers",
          "url": "https://photographytoprofits.com/meta-ads"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SEO for Photographers",
          "url": "https://photographytoprofits.com/seo"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Answer Engine Optimization",
          "url": "https://photographytoprofits.com/aeo"
        }
      }
    ]
  },
  "sameAs": [
    "https://instagram.com/photographytoprofits",
    "https://youtube.com/@photographytoprofits"
  ]
}
```

### Service Page — Service + FAQPage (combined)

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Google Ads Management for Photographers",
    "description": "Get booked solid with targeted Google Ads campaigns designed specifically for photography studios.",
    "url": "https://photographytoprofits.com/google-ads",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Photography to Profits",
      "url": "https://photographytoprofits.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "US"
    },
    "serviceType": "Google Ads Management",
    "audience": {
      "@type": "Audience",
      "audienceType": "Professional Photographers"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much should photographers spend on Google Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most photography studios see strong results starting at $500-1500/month..."
        }
      }
    ]
  }
]
```

Note: Multiple schema objects can be passed as an array. Use separate `script:ld+json`
entries in the meta() return array for each schema type.

### Genre Service Page — Service with photography specialization

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Boudoir Photography Marketing",
  "description": "Attract and book premium boudoir clients consistently with proven marketing systems.",
  "url": "https://photographytoprofits.com/boudoir",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Photography to Profits"
  },
  "serviceType": "Photography Marketing",
  "category": "Boudoir Photography",
  "areaServed": "US"
}
```

### Video Blog Post — VideoObject (already in seo.ts, for reference)

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Video Title",
  "description": "Video description...",
  "thumbnailUrl": "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
  "uploadDate": "2026-01-15",
  "embedUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "duration": "PT15M30S",
  "author": {
    "@type": "Person",
    "name": "Humberto Garcia"
  }
}
```

Tip: Include `duration` in ISO 8601 format when known — Google uses it for video
rich results. YouTube transcript length can help estimate duration.

### Pages with YouTube Embeds — VideoObject on non-blog pages

Any page that embeds a YouTube video (not just blog posts) should include VideoObject
schema. This applies to service pages with demo videos, the podcast page, etc.

### Calculator/Tool — WebApplication

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Photography Revenue Calculator",
  "description": "Calculate your potential revenue growth with P2P marketing systems.",
  "url": "https://photographytoprofits.com/calculator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

### FAQ Sections — FAQPage schema

Many service pages include FAQ accordion sections. Add FAQPage schema alongside
the Service schema to qualify for FAQ rich results in Google:

```tsx
// In the meta() return array, add a second script:ld+json entry:
{
  "script:ld+json": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }
}
```

### BreadcrumbList — For all pages

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://photographytoprofits.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Google Ads",
      "item": "https://photographytoprofits.com/google-ads"
    }
  ]
}
```

---

## SEO Best Practices Quick Reference

### Title Tags

- 50-60 characters maximum (Google truncates at ~60)
- Format: `Primary Keyword — Secondary Context | Brand`
- Front-load the most important keywords
- Every page title must be unique

### Meta Descriptions

- 150-160 characters (Google truncates at ~155)
- Include a call to action ("Learn how to...", "Discover...")
- Include primary keyword naturally
- Make it compelling — this is your ad copy in search results

### Open Graph

- `og:image` should be 1200x630px for optimal display
- Always include og:url (canonical URL)
- og:type: "website" for pages, "article" for blog posts

### Canonical URLs

- Every page should have a canonical URL
- In React Router v7: `{ tagName: "link", rel: "canonical", href: "..." }`
- Blog posts use `canonical_url` field from DB or construct from slug

### Internal Linking

- Link between related service pages
- Blog posts should link to relevant service pages
- Service pages should link to relevant blog posts and case studies
- Use descriptive anchor text (not "click here")

### Image SEO

- All images should have descriptive alt text
- OG images: 1200x630px, branded
- YouTube thumbnails work as fallback OG images

---

## Meta Tag Template

```tsx
export function meta() {
  return [
    { title: "PAGE_TITLE | Photography to Profits" },
    { name: "description", content: "PAGE_DESCRIPTION" },
    { property: "og:title", content: "PAGE_TITLE" },
    { property: "og:description", content: "PAGE_DESCRIPTION" },
    {
      property: "og:url",
      content: "https://photographytoprofits.com/PAGE_PATH",
    },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Photography to Profits" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "PAGE_TITLE" },
    { name: "twitter:description", content: "PAGE_DESCRIPTION" },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://photographytoprofits.com/PAGE_PATH",
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "SCHEMA_TYPE",
        name: "PAGE_TITLE",
        description: "PAGE_DESCRIPTION",
        url: "https://photographytoprofits.com/PAGE_PATH",
      },
    },
  ];
}
```
