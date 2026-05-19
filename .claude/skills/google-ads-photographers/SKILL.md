---
name: google-ads-photographers
description: build, audit, rewrite, and troubleshoot google ads search campaigns for portrait photography studios. use when the user asks for google ads, search ads, responsive search ads, rsa assets, keywords, display paths, sitelinks, callouts, structured snippets, promotion extensions, image extension direction, search campaign structure, ad to landing page alignment, google ads audits, or campaign troubleshooting for boudoir, newborn, maternity, family, branding, headshot, wedding, pet, senior, or other photography genres.
---

# Google Ads for Photographers

Use this skill to create build-ready Google Ads Search campaigns for portrait photography studios. The goal is not just good copy. The goal is aligned search intent, relevant ad assets, clear conversion paths, and profitable booked sessions.

## Core Rule

Every campaign must align three things:

1. **Search term** - what the prospect is actively looking for.
2. **Ad asset** - the promise made in the headline, description, and extensions.
3. **Landing page** - the page that fulfills the promise and moves the prospect to inquire.

If any of those three are misaligned, stop and fix the structure before writing more assets.

## Source Loading

When project sources or connected docs are available, load relevant documentation before creating final assets.

Always use:
- Google Ads handbook for photographers.
- Studio brief, website, offer, location, and existing campaign notes when provided.

Load conditionally:
- Boudoir Buyer Bible for boudoir.
- 40 Over 40 / campaign docs for 40 over 40, 30 over 30, model call, or application campaigns.
- Website setup or website copy skill for landing-page alignment.
- StoryBrand docs when messaging is unclear or needs objection-led copy.
- Reviews/testimonials when proof is needed.

Do not invent testimonials, review counts, awards, years in business, prices, product values, or guarantees. Mark missing proof as `<!-- TODO: confirm -->`.

## Intake

For a full campaign build, gather or infer:

- Studio name.
- Location and service area.
- Genre or campaign type.
- Target landing page URL or page plan.
- Offer and CTA.
- Revenue Formula numbers when available: leads/month, booking rate, average sale.
- What makes the studio different.
- Proof: reviews, ratings, awards, press, certifications, client quotes.
- Must-include services or products.
- Must-avoid claims, words, or offers.
- Existing Google Ads account notes, if any.

For a small ask, proceed with studio name, location, genre, offer, and CTA.

## Campaign Strategy Rules

- Build one search campaign per genre or intent cluster. Do not mix newborn, maternity, family, boudoir, and branding in one generic campaign.
- Send each campaign to a matching genre-specific landing page, not the homepage, unless the user explicitly asks for a homepage traffic strategy.
- Keep keywords tight. Default to 10 high-intent keywords per campaign unless the user asks for expansion.
- Prioritize local commercial intent: `[city] [genre] photographer`, `[genre] photographer near me`, `[genre] photography studio`, `[genre] photoshoot`, and service-specific variants.
- Avoid broad, research-only, or educational keywords unless building a separate content or discovery campaign.
- Separate branded, non-branded, competitor, and campaign-offer traffic when relevant.
- Use exact and phrase match first for small budgets. Add broad match only with strong conversion tracking and enough budget/data.
- Include negative keyword recommendations for irrelevant intent.

## Asset Requirements

For each search campaign, produce:

- 15 responsive search ad headlines, each 30 characters or fewer.
- 4 descriptions, each 90 characters or fewer.
- 2 display path fields, each 15 characters or fewer.
- 10 keywords.
- Negative keyword recommendations.
- 6 callouts, each 25 characters or fewer.
- Structured snippets with at least 3 values per header.
- 8 sitelinks with two description lines each, each description line 35 characters or fewer.
- Promotion extension when an actual offer exists.
- Image extension direction.
- Landing page alignment notes.
- Tracking and QA notes.

When character limits matter, check the character count manually before finalizing.

## Copy Rules

- Use search-intent language, not clever brand language.
- Put the main keyword or close variant in at least 3 headlines.
- Include the location in multiple assets.
- Use action language: book, schedule, inquire, reserve, plan, apply.
- Use concrete benefits: hair and makeup, guided posing, safe newborn studio, wardrobe help, printed artwork, same-day reveal, private studio.
- Use proof only when verified.
- Keep headlines varied. Do not create 15 versions of the same line.
- Keep descriptions benefit-led and CTA-driven.
- Use dynamic keyword insertion sparingly, no more than about 30 percent of headlines.
- Use location insertion only in headlines, not descriptions.
- Pin only when necessary for brand/legal clarity. Otherwise leave RSA assets flexible.

## Studio Conversion Standards

- Do not put pricing on public website or landing page copy unless the user explicitly overrides this standard for the specific client.
- Do not create "view pricing" sitelinks by default. Use consultation, portfolio, experience, FAQ, testimonials, or availability instead.
- Do not make claims like "#1", "best", "guaranteed", "award-winning", or exact review counts unless the user provides proof.
- If the Google Ads handbook example conflicts with studio conversion standards, follow studio conversion standards and flag the conflict.

## Genre Handling

Use `references/genre-keyword-strategy.md` for genre-specific keyword themes, buyer objections, and copy angles.

Use `references/rsa-copy-framework.md` to write headlines and descriptions.

Use `references/extensions.md` for sitelinks, callouts, structured snippets, promotion extensions, and image extension direction.

Use `references/landing-page-alignment.md` before finalizing a campaign.

Use `references/qa-checklist.md` before delivering final assets.

Use `references/troubleshooting.md` when auditing poor performance.

## Default Output

Use this structure for full campaign builds:

# Google Ads Build: [Studio Name]

## Strategy Snapshot
- Studio:
- Location:
- Genre:
- Campaign goal:
- Landing page:
- CTA:
- Offer:
- Revenue Formula lever:
- Search intent:
- Proof available:
- Proof needed:

## Campaign Structure
[Campaign and ad group plan]

## [Genre] Search Campaign

### Keywords
[10 high-intent keywords]

### Negative Keywords
[Recommended negatives]

### Responsive Search Ad

#### Headlines
| # | Headline | Characters | Role |
|---|---|---:|---|

#### Descriptions
| # | Description | Characters | Role |
|---|---|---:|---|

#### Display Paths
- Path 1:
- Path 2:

### Extensions

#### Callouts
[6 callouts]

#### Structured Snippets
[Headers and values]

#### Sitelinks
| Sitelink | Description line 1 | Description line 2 | Destination |
|---|---|---|---|

#### Promotion Extension
[Only if offer exists]

#### Image Extension Direction
[What images to upload]

### Landing Page Alignment
[What the page must say/show to fulfill the ad promise]

### Tracking and QA
[Conversion actions, thank-you page, UTM, form test, mobile checks]

## Final QA Notes
[Issues, TODOs, proof gaps, compliance concerns]

## Audit Mode

When auditing existing Google Ads, evaluate:

- Campaigns are separated by genre and search intent.
- Keywords match landing pages.
- Headlines meet character limits and include main keywords.
- Descriptions are clear, benefit-led, and CTA-driven.
- Extensions are complete and aligned.
- Negative keywords block irrelevant traffic.
- Landing pages are fast, mobile-friendly, and genre-specific.
- Conversion tracking fires on the thank-you page or scheduling event.
- Form submissions sync to the CRM.
- Follow-up system supports fast lead response.
- Spend decisions are judged against CPL, booking rate, average sale, and ROI.

## Handoff Behavior

For campaign creation, deliver build-ready assets in plain text or tables.
For implementation support, include naming conventions, URL/UTM guidance, and QA steps.
For missing information, make the smallest safe assumption, mark TODOs, and continue.
