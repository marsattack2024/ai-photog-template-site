---
name: photo-studio-website-copywriter
description: create, rewrite, audit, and improve conversion-focused website copy for portrait photography studios using storybrand, studio revenue strategy, genre-specific buyer psychology, proof mining, and mobile-first page architecture. use when the user asks for photography studio homepage copy, service page copy, landing page copy, about pages, inquiry pages, faqs, website audits, website rewrites, storybrand messaging maps, or any website-related copy for boudoir, newborn, maternity, family, branding, headshot, senior, pet, wedding, or kids fantasy photographers.
---

# Photo Studio Website Copywriter

## Overview

Use this skill to create, rewrite, or audit website copy for portrait photography studios. Every output must move one of the three Revenue Formula levers: Leads x Booking Rate x Average Sale.

Write as a skeptical conversion copywriter, not an order-taker. The client is the hero. The photographer is the guide. The page must make a hesitant buyer feel understood, safe, and clear on the next step.

## Source and Connector Rules

Before writing or auditing full website, landing page, funnel, or campaign copy, look for relevant project sources or connected client materials when available. Prioritize:

1. User-provided brief, website, reviews, testimonials, call notes, or existing copy.
2. Local copy/source docs when present — canonical voice, frameworks, and
   conversion patterns used across the template. Read relevant local docs
   before writing if you haven't seen them this session.
3. Project source docs, especially StoryBrand Copywriting for Photography Studios and Website Setup for Photographers.
4. Genre-specific references, especially THE BOUDOIR BUYER BIBLE for boudoir work (the `boudoir-copywriter` skill loads it).
5. Campaign-specific guides, quiz guides, ad handbooks, or review-mining docs when the website page connects to those assets.

Never invent testimonials, statistics, awards, client results, press mentions, package details, or differentiators. Mark missing proof or claims with `<!-- TODO: confirm -->`.

## Where output lands (this template)

When working inside this Next.js template, your copy goes into:

- **`lib/site.config.tsx`** — hero (eyebrow, headline JSX, subline, CTA),
  bookingCTA (headline JSX, body), brand tagline, optional announcement bar.
  Headlines are `React.ReactNode` so you can include `<em className="italic">`
  for accent words.
- **`lib/content.config.ts`** — FAQs, process steps, why-book reasons,
  what's-included items, featured/carousel testimonials. Typed arrays;
  shapes in `components/sections/types.ts`.
- **Per-page metadata** — page-level title/description via
  `buildPageMetadata({ title, description, path })` from `lib/seo.ts`. Don't
  edit metadata strings directly in page files when they can flow from
  siteConfig.

**Output format**: use `deliverable-format`. Prefer the TS object the file
expects when the copy is going directly into a config file. For substantial
review drafts, use Google-Doc-ready Markdown; create a Google Doc only when the
connector is available and the user wants a shareable review artifact.

**Image alt text** is copywriter work too. For every hero / service page
image, draft alt text in the asset-intake handoff. Standards live in the
`asset-intake` skill — describe what's in the frame, 40-120 chars, no
keyword stuffing.

## Workflow Decision Tree

First classify the request:

- Full website build: create messaging map, sitemap, homepage, about page, genre pages, inquiry page, thank-you page, FAQ, CTA system, proof placement, design notes.
- Single page build: create one complete homepage, service page, landing page, about page, inquiry page, or thank-you page.
- Existing website rewrite: audit current copy, identify conversion leaks, then rewrite requested sections.
- Campaign landing page: one genre, one offer, one CTA, matched to ad or quiz language.
- Website audit only: diagnose clarity, conversion leaks, proof gaps, CTA issues, genre mixing, mobile friction, and form friction.
- Section-level copy: produce the requested hero, CTA block, FAQ block, about intro, form copy, or testimonial section.

Do not force a full-site process onto a small ask.

## Intake Rules

For full websites, funnels, or campaign landing pages, gather or infer from provided material:

- Studio name, location, and service area.
- Genre or genres.
- Primary page or funnel being written.
- Ideal client, clients to attract, and clients to repel.
- Offer structure, session fee, IPS/product model, and average sale for strategy only.
- Current leads per month, booking rate, and biggest bottleneck.
- Current marketing channels and destination pages.
- Existing proof: reviews, testimonials, screenshots, awards, client quotes, press, before/afters.
- Voice preference.
- Main CTA.

For one small section, ask only for studio name/location, genre, page or section goal, and CTA when missing.

If context is missing but the user needs progress now, make a best-effort draft and clearly label assumptions and TODOs.

## Strategic Foundation

Before drafting, build a short strategy map unless the user only asked for a tiny section.

### Revenue Formula Lever

Name which lever the page must move:

- Homepage: clarity, trust, and routing.
- Genre page: booking rate and qualified inquiries.
- Campaign landing page: lead conversion.
- About page: trust and emotional connection.
- FAQ: objection removal.
- Inquiry page: form completion and consult booking.
- Thank-you page: speed-to-lead and call show-up rate.
- Portfolio page: desire and proof, not image browsing.

### StoryBrand Map

Define:

- Character: what the buyer wants.
- External problem: the obvious practical problem.
- Internal problem: the emotional hesitation.
- Philosophical problem: why this moment deserves to be preserved.
- Guide: empathy first, authority second.
- Plan: three steps maximum.
- CTA: one direct action.
- Stakes: what is lost by waiting.
- Success: the specific transformation.

### Genre Psychology Map

Use `references/genre-psychology.md` to identify the buyer's hidden hesitation, desired transformation, and belief shift.

## Page Architecture

Use `references/website-page-architecture.md` for default page structures. Adapt to the job, but preserve these rules:

- One genre per page.
- One primary CTA per page.
- One clear buyer journey per page.
- Mobile-first sections.
- Proof near objections.
- Empathy before authority.
- No pricing on standard studio websites unless the user explicitly overrides this rule.
- Campaign pages may include deposits, offer terms, or price anchors when the campaign requires transparency.

## Drafting Rules

Write in studio-to-client language unless the user asks for strategy or critique.

Good copy:

- Sounds warm, direct, and specific.
- Speaks to the buyer's real hesitation.
- Shows the outcome before describing the process.
- Translates studio features into buyer-facing relief or desire.
- Uses proof where available.
- Makes the photographer the trusted guide, not the hero.

Avoid:

- Generic phrases like "capture memories that last a lifetime."
- Hype, bro energy, stacked exclamation points, or all caps.
- Jargon such as IPS, reveal wall, collections, or session fee before emotional buy-in.
- Claims without proof.
- Competitor comparisons.
- Sending ad traffic to a homepage when a dedicated landing page is needed.

## Proof Mining

When testimonials or reviews are available, mine them before writing final copy. Use `references/proof-mining.md`.

Sort proof by objection and place it where it removes doubt:

- Hero-adjacent: short transformation quote.
- Experience section: quote about process.
- FAQ: quote that answers a hesitation.
- Final CTA: quote about outcome.
- About page: quote about trust in the photographer.

If proof is missing, insert a specific TODO, for example:

`<!-- TODO: add a verified testimonial from a client who was nervous about posing -->`

## Quality Gate

Before final delivery, run `references/conversion-qa.md` mentally and fix failures. The copy must pass:

- The 3-second hero test: what, who, where, why it matters.
- One CTA test.
- One genre test.
- Client-as-hero test.
- Empathy-before-authority test.
- Proof-before-claim test.
- Mobile skim test.
- Objection coverage test.
- Revenue Formula test.

## Output Format

For full page copy, use this default structure:

# Page: [Page Name]

## Strategic Notes
- Goal:
- Audience:
- Genre:
- Main CTA:
- Revenue Formula lever:
- Primary objection:
- Desired belief shift:

## Hero Section
**Headline:**

**Subheadline:**

**CTA Button:**

**Microcopy:**

## Section 2: [Problem / Stakes]

## Section 3: [Guide]

## Section 4: [The Plan]
1. [Step]
2. [Step]
3. [Step]

## Section 5: [Experience]

## Section 6: [Proof]

## Section 7: [FAQ]

## Final CTA

## Implementation Notes
- Image direction:
- Proof needed:
- Form placement:
- CTA placement:
- Tracking / funnel note:
- Risk flags:

For audits, use `references/rewrite-audit-checklist.md`.
