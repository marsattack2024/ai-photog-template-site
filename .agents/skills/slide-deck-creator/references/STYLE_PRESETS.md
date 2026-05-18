# Style Presets

Curated visual styles for slide decks. Used during **Step 1.5 — Style Selection**.

When generating style previews, Claude renders a single `title-hero` slide in each
of 3 proposed styles and shows the user the output. The user picks A, B, or C.
The chosen preset populates `deck_meta` colors and fonts automatically.

---

## How to Generate a Style Preview

For each style option, output a minimal HTML block (inline CSS only, no external deps)
showing a single slide in that style. Keep each preview under 60 lines of HTML.
Show the deck's actual headline and subheadline — not lorem ipsum.

Preview structure:
```html
<div style="width:640px;height:360px;background:#...;display:flex;flex-direction:column;
            justify-content:center;align-items:center;padding:48px;font-family:'...', serif;">
  <div style="...rule or divider..."></div>
  <h1 style="font-size:2.2rem;color:#...;text-align:center;">HEADLINE</h1>
  <p style="font-size:1.1rem;color:#...;margin-top:1rem;text-align:center;">SUBHEADLINE</p>
  <div style="...label badge showing preset name...">Preset Name</div>
</div>
```

After showing 3 previews, ask: **"Which style feels right — A, B, or C? Or describe what you'd change."**

---

## Preset Catalog

### DARK THEMES

---

**bold-signal**
- Character: Confident, high-contrast, direct. Built for people who trust numbers over aesthetics.
- Use when: B2B pitch, investor deck, performance marketing, data-heavy presentations
- color_primary: `#0A0A0A`
- color_secondary: `#111827`
- color_accent: `#22D3EE`
- font_heading: `Georgia`
- font_body: `Calibri`
- Visual signature: Near-black background, bright cyan accent, wide rule line under headline

---

**electric-studio**
- Character: Professional, polished, sleek. The kind of deck a well-funded startup sends to Series A investors.
- Use when: Startup pitch, product launch, SaaS, clean modern brand
- color_primary: `#0F172A`
- color_secondary: `#1E3A5F`
- color_accent: `#60A5FA`
- font_heading: `Trebuchet MS`
- font_body: `Calibri`
- Visual signature: Deep navy gradient feel, periwinkle blue accent, split-panel ready

---

**dark-botanical**
- Character: Elegant, warm, sophisticated. Feels premium without being corporate.
- Use when: Luxury brand, agency credentials, creative pitch, design portfolio
- color_primary: `#1C1917`
- color_secondary: `#292524`
- color_accent: `#A3E635`
- font_heading: `Georgia`
- font_body: `Palatino`
- Visual signature: Warm near-black, lime-green accent (unexpected, tasteful), serif throughout

---

**creative-voltage**
- Character: Energetic, bold, slightly retro-modern. Designed to be remembered.
- Use when: Creative agency, marketing team, event pitch, brand refresh
- color_primary: `#09090B`
- color_secondary: `#18181B`
- color_accent: `#FACC15`
- font_heading: `Impact`
- font_body: `Arial`
- Visual signature: Pure black, electric yellow accent, Impact headers feel intentional not lazy

---

**neon-cyber**
- Character: Futuristic, technical, dramatic. High stimulation, high recall.
- Use when: Tech product, developer tool, cybersecurity, AI product
- color_primary: `#030712`
- color_secondary: `#0C1445`
- color_accent: `#A855F7`
- font_heading: `Trebuchet MS`
- font_body: `Consolas`
- Visual signature: Near-void background, purple/violet neon accent, monospace body text signals technical precision

---

**terminal-green**
- Character: Developer-focused, authentic, hacker-credible. Communicates builder identity.
- Use when: Developer tool, open-source pitch, engineering team presentation, technical demo
- color_primary: `#0D1117`
- color_secondary: `#161B22`
- color_accent: `#3FB950`
- font_heading: `Consolas`
- font_body: `Consolas`
- Visual signature: GitHub dark background, terminal green, monospace everywhere — commits to the bit

---

### LIGHT THEMES

---

**swiss-modern**
- Character: Minimal, precise, Bauhaus-influenced. Lets the content breathe.
- Use when: Academic presentation, architecture, product design, editorial pitch
- color_primary: `#FAFAFA`
- color_secondary: `#F4F4F5`
- color_accent: `#18181B`
- font_heading: `Georgia`
- font_body: `Calibri`
- Visual signature: Off-white background, near-black as accent (inverted from dark themes), generous whitespace

---

**vintage-editorial**
- Character: Witty, personality-driven, confident. Feels like a New Yorker cover — knows what it is.
- Use when: Thought leadership, content strategy, media company, book pitch, brand with strong POV
- color_primary: `#FEF9EF`
- color_secondary: `#FEF3C7`
- color_accent: `#92400E`
- font_heading: `Georgia`
- font_body: `Palatino`
- Visual signature: Cream/parchment background, amber-brown accent, serif throughout, editorial feel

---

**pastel-geometry**
- Character: Friendly, approachable, modern but not sterile. Feels human-made.
- Use when: Consumer product, education, HR/People team, nonprofit, wellness brand
- color_primary: `#F8FAFC`
- color_secondary: `#EFF6FF`
- color_accent: `#6366F1`
- font_heading: `Trebuchet MS`
- font_body: `Calibri`
- Visual signature: Near-white background, indigo accent, rounded shapes implied

---

**paper-ink**
- Character: Literary, thoughtful, high-concept. Feels like a well-designed book.
- Use when: Publishing pitch, research presentation, executive strategy brief, long-form narrative deck
- color_primary: `#FFFBF5`
- color_secondary: `#FFF8ED`
- color_accent: `#1C1917`
- font_heading: `Palatino`
- font_body: `Georgia`
- Visual signature: Warm white, deep brown/black accent, serif everywhere, pull-quote ready

---

### SPECIALTY

---

**coral-energy**
- Character: Warm, urgent, optimistic. High energy without aggression.
- Use when: Sales deck, fundraising, consumer startup, growth-stage company
- color_primary: `#1C1917`
- color_secondary: `#292524`
- color_accent: `#F97316`
- font_heading: `Georgia`
- font_body: `Calibri`
- Visual signature: Dark warm background, orange coral accent — feels warm not cold

---

**teal-trust**
- Character: Calm, credible, trustworthy. The preset for when you need the audience to believe you.
- Use when: Healthcare pitch, fintech, insurance, professional services, legal
- color_primary: `#0F2027`
- color_secondary: `#1B3A4B`
- color_accent: `#2DD4BF`
- font_heading: `Georgia`
- font_body: `Calibri`
- Visual signature: Deep teal-black, mint accent, feels stable and considered

---

## Style Selection Rules for Claude

1. **Always show 3 options** — never just 1. Give the user something to react to.
2. **Pick options with contrast** — don't show 3 dark blue presets. Pick from different character families.
3. **Match one option to the brief** (safe choice), **one to the audience** (considered choice), **one unexpected** (surprise option).
4. **Use the deck's actual headline** in every preview — not placeholder text. The user needs to see their words in the style.
5. **After selection**: update `deck_meta` with the chosen preset's exact colors and fonts before outputting the JSON.
6. **If the user says "none of these"**: ask what they'd change (too dark? too corporate?) and propose a custom variant.
7. **Skip style selection** if the user explicitly provides hex colors or specifies a style — don't slow them down.
