---
name: copywriting-agency-saas
version: 1.0.0
description: >
  Use when writing or rewriting marketing copy for agencies, SaaS products,
  or B2B services. Triggers: "write copy for," "landing page," "rewrite this,"
  "headline help," "pricing page copy," "feature page." For local services or
  photography studios, see copywriting-local-services.
keywords: copywriting, agency, saas, b2b, conversion, landing-page
---

# Agency & SaaS Copywriting

## Core Behavior
Always attempt a full draft before asking questions. Make assumptions, state them,
offer to adjust. Never ask more than 2 questions before drafting.

## Before Writing
Check `.claude/product-marketing-context.md` first. Use it and start writing.
Only ask for what's genuinely missing for the specific task.

If user provides a URL or existing copy → analyze, identify 3 biggest conversion
weaknesses, rewrite with annotations. No questions before the draft.

## Fast Context (gather only if not provided)
1. **Offer type** — done-for-you agency, SaaS tool, consulting, course?
2. **Primary CTA** — book a call, start trial, request audit, get pricing?
3. **Audience** — who specifically? (e-comm brands, local businesses, founders?)
4. **Key outcome** — what result does the customer get? Be specific.
5. **Differentiator** — what do you do that competitors don't?

## Tone Default
- **Marketing agency:** Confident, direct, results-obsessed. No fluff. Peer-to-peer,
  not vendor-to-client. You solve real problems for smart people.
- **SaaS:** Clear, outcome-focused, slightly conversational. Smart but not smug.
- When rewriting: match existing brand voice unless asked to change it.
- Default: direct and confident, never corporate or jargon-heavy.

## Copywriting Principles (Agency/SaaS)

### Lead with the Outcome, Not the Process
- ❌ "We use a proven 3-step framework to optimize your ad campaigns"
- ✅ "Our clients average 3.2x ROAS in 90 days or we work for free"

### Specificity is Credibility
Vague claims are ignored. Specific claims are believed.
- ❌ "We help businesses grow faster"
- ✅ "We've generated $4.2M in leads for Miami-area service businesses since 2022"

### Benefits Over Features
- Feature: "AI-powered ad generation"
- Benefit: "Launch 10 ad variants in the time it used to take to write one"

### One Idea Per Section
Each section advances one argument. Build logical momentum down the page.

### Objection Handling Is Copy Too
Agency: "We've tried agencies before" → address it head-on in the hero or FAQ
SaaS: "Does it work for my use case?" → segment CTAs or add use-case callouts

## CTA Formula
[Action Verb] + [What They Get] + [Qualifier]
- "Book a Free Strategy Call" (not "Contact Us")
- "See My Pricing Options"
- "Start My 14-Day Trial"
- "Get a Free Audit"
- "Watch a 3-Minute Demo"
Never use: Submit, Sign Up, Learn More, Get Started

## Page Structure

### Hero
- **Headline formulas:**
  - "{Specific outcome} for {specific audience} — {timeframe or qualifier}"
  - "Stop {painful thing}. Start {desired outcome}."
  - "The {category} built for {audience} who want {outcome}"
- **Subheadline:** Specificity + proof signal (one stat, one client type, one result)
- **CTA:** Booking/trial action
- **Trust bar:** Logos, client count, or one standout result

### Social Proof
- Specific results beat vague praise: "$40K in new contracts from one campaign"
- Include the person's role and company type for B2B credibility
- Numbers + named proof beats anonymous testimonials

### Problem Section
Name the specific frustration in their language.
"You've tried hiring freelancers. You've run the ads yourself. You've bought the courses.
The pipeline still isn't predictable."

### Solution / Benefits
3-5 outcomes, not features. Connect each to a measurable result.

### How It Works
3-4 steps. Make it feel fast and low-risk to start.

### Objection / FAQ
Address real buying objections: contracts, results guarantees, onboarding complexity,
team size requirements, cancellation.

### Final CTA
Restate ROI → reduce risk → repeat primary CTA.

## Self-Review (Before Outputting)
- [ ] Hero headline names a specific outcome, not a process
- [ ] At least one specific number or result stat
- [ ] CTA follows the formula
- [ ] No agency buzzwords: "full-service," "holistic," "data-driven," "synergy"
- [ ] Passive voice removed from headlines
- [ ] No exclamation points
- [ ] Each section advances one argument

## Output Format
Organized by section with headers. Annotate key choices with one-line rationale.
Provide 2-3 headline/CTA alternatives labeled A/B/C with rationale.
Include meta title + description when full page copy is requested.

## Related Skills
- `copywriting-local-services` — photography, salon, boat rentals
- `copy-editing` — polish after drafting
- `page-cro` — if page structure needs strategic work beyond copy
