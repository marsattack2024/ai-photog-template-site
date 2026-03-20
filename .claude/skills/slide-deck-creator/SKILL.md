---
name: slide-deck-creator
description: >
  Generate a concise, story-driven slide deck specification (JSON) from any topic or brief.
  Use when the user asks to create a slide deck, presentation, pitch, or any set of slides
  — even if they don't say "JSON." Pairs with the pptx skill (which handles actual .pptx
  files) and the web-artifacts-builder skill (which can render the HTML viewer).
  Trigger keywords: deck, slides, presentation, pitch deck, slide deck, keynote, narrative deck.
categories:
  - presentations
  - content-creation
  - storytelling
tags:
  - slides
  - deck
  - pptx
  - pitch
  - narrative
version: 1.3.0
---

# Slide Deck Creator

## What This Skill Does

Produces a structured **JSON deck specification** from a topic + constraints. The spec drives:

| Script | Language | Output | Command |
|---|---|---|---|
| `scripts/export_to_pptx.py` | Python | `.pptx` file | `python export_to_pptx.py deck.json` |
| `scripts/generate_pptx.js` | Node.js | `.pptx` file | `node generate_pptx.js deck.json` |
| `scripts/generate_html.py` | Python | Standalone HTML | `python generate_html.py deck.json` |
| `scripts/export_to_html.jsx` | React/JSX | Component or bundle | Import as `<DeckRenderer deck={...} />` |

Claude Code can open and edit any of these scripts to adjust layouts, add new layout types, or change styling.

The JSON is the single source of truth. Scripts are thin renderers.

## When to Use This Skill

Use this skill when a user asks to:
- Create or draft a slide deck / presentation / pitch
- Build a narrative for a board meeting, investor call, team update, or client proposal
- Turn a brief, document, or talking points into structured slides
- Generate a deck spec that can later be exported to PPTX or rendered in a browser

Do **not** use this skill to directly edit an existing `.pptx` file — use the `pptx` skill for that.

---

## Instructions

### Step 1 — Understand the Brief

Extract from the user's message (or ask if missing):

| Field | Default if missing |
|---|---|
| **Topic / title** | Required — ask if absent |
| **Audience** | General professional audience |
| **Tone** | Confident, clear, modern |
| **Deck length** | 5–8 slides (never more than 12) |
| **Purpose** | Inform / persuade / inspire |
| **Export target** | JSON only (PPTX or HTML optional) |

### Step 1.5 — Style Selection (Show, Don't Tell)

**Before writing any copy**, show the user 3 visual style options and let them pick.

Read `references/STYLE_PRESETS.md` for the full preset catalog and preview instructions.

**The rule**: People can't describe what they want, but they can recognize it immediately.
Instead of asking "what colors do you like?", render 3 mini previews using the deck's
actual headline — then ask which one feels right.

**How to run style selection:**

1. Read `references/STYLE_PRESETS.md`
2. Pick 3 presets with contrast in character (one safe/on-brief, one audience-matched, one unexpected)
3. Render each as a single inline-HTML title-hero slide using the deck's real headline
4. Present them labeled **A**, **B**, **C** with a one-line character description
5. Ask: *"Which feels right — A, B, or C? Or tell me what to change."*
6. Apply the chosen preset's colors and fonts to `deck_meta` before generating the full JSON

**Skip style selection if:**
- The user already specified colors, a style name, or a brand guide
- The user says "just generate it" or "use defaults"
- This is a programmatic/API call (no interactive user)

In those cases, default to `bold-signal` preset or whatever the user specified.

---

### Step 2 — Build the Narrative Arc

Every deck must follow a story structure. Map slides to these narrative roles:

| Slide role | Purpose | Typical layout |
|---|---|---|
| **Hook** | Grab attention with a bold claim or question | `title-hero` |
| **Problem / tension** | Name the pain or gap | `split-text-visual` |
| **Insight / reframe** | The "aha" that changes perspective | `quote-callout` |
| **Solution** | What you offer and how it works | `three-column` or `split-text-visual` |
| **Proof / evidence** | Data, testimonials, results | `stat-grid` or `split-text-visual` |
| **Call to action** | Clear next step | `cta-close` |

> Always open with tension; always close with a single clear ask.
> Never put more than one narrative role per slide.

### Step 3 — Write Slide Copy

Rules for every slide:

- **Headline**: 4–8 words. Full sentence or bold fragment. No vague nouns.
  - ✅ "Most Agencies Waste 40% of Ad Spend"
  - ❌ "Our Approach to Marketing"
- **Subheadline**: Under 20 words. One idea. No jargon.
- **Bullets**: 0–4 max. Each under 10 words. Start with a verb or number.
  - ✅ "Cut cost-per-lead by 38%"
  - ❌ "We leverage synergistic frameworks"
- **Speaker note**: 1–2 sentences. What the presenter should say, not what's on screen.

### Step 4 — Assign Visual & Motion Metadata

For each slide, populate:

```
layout        → one of: title-hero | split-text-visual | three-column |
                         stat-grid | quote-callout | cta-close | full-bleed-image
visual_idea   → concrete art direction (what to show, not "relevant image")
motion        → one of: fade-in | slide-up | slide-left | zoom-in | stagger-up | none
accent_color  → hex code that fits deck theme (optional, inherits from deck_meta if omitted)
```

**Layout rules:**
- `title-hero`: full-width headline + subheadline, minimal text, bold background
- `split-text-visual`: left/right split, text one side, image or chart the other
- `three-column`: headline + 3 equal columns with icon, heading, body each
- `stat-grid`: 2–4 large number callouts with labels
- `quote-callout`: large pull quote, attribution, subtle background
- `cta-close`: headline + single CTA button/text, minimal distractions
- `full-bleed-image`: image covers slide, headline overlaid with contrast treatment

**Motion rules:**
- Use `stagger-up` for bullet lists only
- Use `slide-left` for reveal slides (problem → solution transitions)
- Use `zoom-in` sparingly — only for hero or stat moments
- Default to `fade-in` when unsure

### Step 5 — Output the JSON Spec

Produce **only** valid JSON (no markdown code fences unless the user specifically asks).
Follow the schema exactly:

```json
{
  "deck_meta": {
    "title": "string",
    "subtitle": "string (optional)",
    "author": "string (optional)",
    "date": "YYYY-MM-DD or descriptive string",
    "audience": "string",
    "tone": "string",
    "purpose": "string",
    "color_primary": "#hex",
    "color_secondary": "#hex",
    "color_accent": "#hex",
    "font_heading": "font name",
    "font_body": "font name"
  },
  "outline": [
    { "slide": 1, "role": "hook", "headline": "..." },
    { "slide": 2, "role": "problem", "headline": "..." }
  ],
  "slides": [
    {
      "id": 1,
      "role": "hook",
      "layout": "title-hero",
      "headline": "string (4–8 words)",
      "subheadline": "string (under 20 words)",
      "bullets": [],
      "visual_idea": "string (concrete art direction)",
      "motion": "fade-in",
      "accent_color": "#hex (optional)",
      "speaker_note": "string"
    }
  ]
}
```

### Step 6 — After the JSON

Tell the user:
1. The JSON is ready and can be copy-pasted or saved as `deck.json`
2. To export to PPTX: `node .claude/skills/slide-deck-creator/scripts/generate_pptx.js deck.json`
3. To export to HTML: `python .claude/skills/slide-deck-creator/scripts/generate_html.py deck.json`
4. To edit the PPTX directly: use the `pptx` skill

---

## Example Output

`references/example_deck.json` is the canonical reference. It shows:
- A 6-slide narrative arc (hook → problem → insight → solution → proof → CTA)
- Proper headline/subheadline lengths and tone
- All layout and motion fields populated
- Concrete `visual_idea` descriptions (specific art direction, not "add image here")
- Realistic color palette and font choices

`references/style_guide.md` contains:
- Copy pattern tables (headline, subheadline, bullet examples per role)
- Motion selection rules (when to use each motion type)
- Layout selection guide (which layout for which slide role)
- Color system and accent color palette by tone
- `visual_idea` field examples (vague vs. specific)
- Speaker note patterns per slide role
- Common mistakes to avoid

`references/STYLE_PRESETS.md` contains:
- 12 named presets (dark, light, specialty)
- Per-preset: character description, use-when, exact hex colors, fonts, visual signature
- Instructions for rendering 3 mini HTML previews for user selection
- Rules for which presets to combine and when to skip selection

Claude should read all three references before generating a new deck.

---

## Scripts

### PPTX Export (choose one)

**`scripts/export_to_pptx.py`** — Python, uses `python-pptx`
- **Requires**: `pip install python-pptx`
- **Usage**: `python scripts/export_to_pptx.py deck.json [output.pptx]`
- Speaker notes are embedded in the .pptx notes panel
- Use `python -m markitdown output.pptx` for text QA after generating

**`scripts/generate_pptx.js`** — Node.js, uses `pptxgenjs`
- **Requires**: `npm install pptxgenjs`
- **Usage**: `node scripts/generate_pptx.js deck.json [output.pptx]`
- Slightly richer layout control (rounded rects, shape primitives)

After either PPTX script: hand off to the `pptx` skill for visual QA.

### HTML/React Export (choose one)

**`scripts/generate_html.py`** — self-contained, no dependencies
- **Requires**: Python 3.8+ (stdlib only)
- **Usage**: `python scripts/generate_html.py deck.json [deck.html]`
- Keyboard: `← →` navigate, `N` notes, `O` outline, `F` fullscreen
- Best for quick sharing — single HTML file, works offline

**`scripts/export_to_html.jsx`** — React component with Tailwind
- **Requires**: React 18+, Tailwind CSS
- **Usage A**: Import as `<DeckRenderer deck={deckJson} />`
- **Usage B**: Bundle with `web-artifacts-builder` skill for a standalone artifact
- Motion hints map to Tailwind `animate-in` classes (tailwindcss-animate)
- Best for richer motion, interactive embedding, or further React customization

Claude can open, modify, and extend any script to add new layout types, adjust colors, or wire up image loading.

---

## Integration with Other Skills

| Skill | When to combine |
|---|---|
| `pptx` | After generating JSON, use pptx skill for QA, visual inspection, or editing the output file |
| `web-artifacts-builder` | For a more interactive React-based viewer with complex animations |
| `frontend-design` | To build a custom slide viewer component |
| `copywriting-agency-saas` | For persuasive pitch deck copy before generating the spec |
