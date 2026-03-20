# Slide Deck Style Guide

Reference patterns for copy, motion, and visual decisions. Use this alongside
`example_deck.json` when generating or reviewing deck specs.

---

## Copy Patterns

### Headlines
Rule: 4–8 words. Full sentence or bold fragment. Verb or number where possible.

| Role | Pattern | Example |
|---|---|---|
| Hook | Bold claim or question | "Your Best Customers Are Already Online" |
| Problem | Name the gap with a number | "Broad Targeting Wastes 60% of Your Budget" |
| Insight | Reframe the assumption | "Buyers Signal Intent Long Before They Click" |
| Solution | What + how in one line | "P2P Finds Them First — Then Follows Up" |
| Proof | Lead with the result | "38% Lower CPL. 2.4× ROAS. Across 14 Accounts." |
| CTA | Offer + no-risk qualifier | "Book a 20-Minute Audit. No Pitch." |

### Subheadlines
Rule: Under 20 words. One idea. No jargon.

- ✅ "You're just not reaching them before your competitors do."
- ✅ "Platform algorithms optimize for clicks, not customers."
- ❌ "Our proprietary methodology leverages synergistic multi-channel attribution frameworks."

### Bullets
Rule: 0–4 max. Each under 10 words. Start with verb or number.

- ✅ "Cut cost-per-lead by 38%"
- ✅ "90-day retargeting audiences that compound"
- ✅ "3 signals that predict intent 2 weeks out"
- ❌ "We help clients achieve their marketing objectives more efficiently"

### Stat callouts
Rule: value → label → context. Keep context under 6 words.

```
38%     ← value (big, colored)
Average CPL reduction  ← label (white, medium)
vs. prior 90-day baseline  ← context (gray, small, italic)
```

---

## Motion Patterns

| Motion | Use when | Never use for |
|---|---|---|
| `fade-in` | Default. Title slides, CTA, quote callouts | Nothing — always safe |
| `slide-up` | Bullet reveals, stat grids | Hero/title slides |
| `slide-left` | Reveal or transition slides (problem → solution) | First slide of deck |
| `zoom-in` | Hero moments only: hook, key stat | Bullet lists, body copy |
| `stagger-up` | Bullet lists only — implies items enter one-by-one | Any non-list layout |
| `none` | Diagrams, static visuals | Anything you want noticed |

**Rule of thumb:** Use at most 3 different motion types in a deck.
Vary them at turning points in the narrative (problem → insight, insight → solution).
Don't assign `zoom-in` to more than one slide.

---

## Layout Selection Guide

| Layout | Ideal slide count | Best for |
|---|---|---|
| `title-hero` | 1–2 (hook + close) | Opening, closing, chapter dividers |
| `split-text-visual` | 2–3 | Problem, solution, proof with diagram |
| `three-column` | 1 | Solution breakdown, comparison |
| `stat-grid` | 1 | Proof — 2–4 key numbers |
| `quote-callout` | 0–1 | Insight/reframe, testimonial |
| `cta-close` | 1 (always last) | Call to action |
| `full-bleed-image` | 0–1 | Emotional opener or section break |

**Don't repeat the same layout more than twice in a row.**

---

## Color System

Every deck spec should include three semantic colors in `deck_meta`:

| Key | Role | Default |
|---|---|---|
| `color_primary` | Slide background | `#0F172A` (near-black navy) |
| `color_secondary` | Secondary background / accents | `#1E40AF` (deep blue) |
| `color_accent` | Highlights, stats, CTA | `#38BDF8` (sky blue) |

**Choosing accent colors by tone:**

| Tone | Accent suggestion |
|---|---|
| Trust / finance | `#38BDF8` (sky) or `#60A5FA` (cornflower) |
| Energy / urgency | `#F97316` (orange) or `#EF4444` (red) |
| Growth / health | `#34D399` (emerald) |
| Premium / luxury | `#F59E0B` (amber) or `#A78BFA` (violet) |
| Minimal / corporate | `#E2E8F0` (light slate) |

**Avoid:** Multiple accent colors in one deck. Pick one and use it consistently.

---

## visual_idea Field

This field is **art direction**, not a search term. Be specific about what to show.

| ❌ Vague | ✅ Specific |
|---|---|
| "relevant image" | "Abstract particle network slowly animating — nodes connecting, suggesting data signals finding each other" |
| "chart showing results" | "Funnel diagram — top wide (Impressions), narrowing dramatically to tiny slice labeled 'Actual Buyers.' Wasted portion in muted red/gray." |
| "people working" | "Two founders reviewing a dashboard on a laptop, warm office lighting, one pointing at a rising graph line" |

When no real image is available, the export scripts render a dashed border with
the `visual_idea` text as a placeholder — useful for review and AI image generation prompts.

---

## Speaker Note Patterns

Notes tell the presenter what to **say**, not repeat what's on screen.

| Slide role | Note focus |
|---|---|
| Hook | Set tension. What problem are we naming right now? |
| Problem | Don't soften it. Name the specific dysfunction. |
| Insight | The reframe. What changes after they understand this? |
| Solution | Walk left to right. Each element compounds on the prior. |
| Proof | Read the headline number. Ask a question. Don't oversell. |
| CTA | Keep it short. The offer is clear. Stop here. |

---

## Common Mistakes to Avoid

1. **More than 12 slides** — Every extra slide adds friction. Cut first.
2. **Two narrative roles on one slide** — One job per slide. Split it.
3. **Bullets on a hero slide** — `title-hero` = zero bullets. Period.
4. **Generic visual_idea** — "relevant image" is not direction. Be specific.
5. **No closing CTA** — Every deck ends with a single, clear ask.
6. **Vague CTA** — "Learn more" is not a CTA. Name what happens: "Book a 20-Minute Audit."
7. **All slides same motion** — At minimum vary at the hook, insight, and CTA.
8. **Stat without context** — Every number needs a denominator or a baseline.
