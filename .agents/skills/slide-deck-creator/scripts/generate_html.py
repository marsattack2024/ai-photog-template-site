#!/usr/bin/env python3
"""
generate_html.py
Converts a slide-deck-creator JSON spec to a self-contained HTML presentation.

Usage:
    python generate_html.py deck.json [deck.html]

Requirements:
    Python 3.8+ (stdlib only — no external packages needed)

Features:
    - Full-screen keyboard navigation (← → arrows, Space, Escape)
    - Speaker notes toggle (press N)
    - Progress bar
    - Motion hints from JSON mapped to CSS transitions
    - All layouts rendered (title-hero, split-text-visual, three-column,
      stat-grid, quote-callout, cta-close, full-bleed-image)
"""

import json
import sys
import html
import os
from pathlib import Path

def load_deck(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def esc(s) -> str:
    return html.escape(str(s or ""), quote=True)

def render_bullets(bullets: list) -> str:
    if not bullets:
        return ""
    items = "".join(f"<li>{esc(b)}</li>" for b in bullets)
    return f"<ul class='bullets'>{items}</ul>"

def render_columns(columns: list, accent: str) -> str:
    parts = []
    for col in columns:
        icon_char = (col.get("icon") or "●")[0].upper()
        parts.append(f"""
        <div class='col'>
          <div class='col-icon' style='background:{accent}'>{esc(icon_char)}</div>
          <div class='col-heading'>{esc(col.get('heading',''))}</div>
          <div class='col-body'>{esc(col.get('body',''))}</div>
        </div>""")
    return f"<div class='three-cols'>{''.join(parts)}</div>"

def render_stats(stats: list, accent: str) -> str:
    parts = []
    for s in stats[:4]:
        parts.append(f"""
        <div class='stat-cell'>
          <div class='stat-value' style='color:{accent}'>{esc(s.get('value',''))}</div>
          <div class='stat-label'>{esc(s.get('label',''))}</div>
          <div class='stat-context'>{esc(s.get('context',''))}</div>
        </div>""")
    return f"<div class='stat-grid-inner'>{''.join(parts)}</div>"

def render_slide_body(spec: dict, meta: dict) -> str:
    layout   = spec.get("layout", "split-text-visual")
    headline = esc(spec.get("headline", ""))
    sub      = esc(spec.get("subheadline", ""))
    bullets  = spec.get("bullets", [])
    columns  = spec.get("columns", [])
    stats    = spec.get("stats", [])
    cta      = spec.get("cta", {})
    accent   = spec.get("accent_color") or meta.get("color_accent", "#38BDF8")

    if layout == "title-hero":
        return f"""
        <div class='layout-title-hero'>
          <div class='hero-rule' style='background:{esc(accent)}'></div>
          <h1 class='hero-headline'>{headline}</h1>
          <p class='hero-sub' style='color:{esc(accent)}'>{sub}</p>
        </div>"""

    if layout == "split-text-visual":
        bl = render_bullets(bullets)
        return f"""
        <div class='layout-split'>
          <div class='split-left'>
            <h2>{headline}</h2>
            <p class='sub' style='color:{esc(accent)}'>{sub}</p>
            {bl}
          </div>
          <div class='split-right'>
            <div class='visual-placeholder'>{esc(spec.get('visual_idea','[Visual]'))}</div>
          </div>
        </div>"""

    if layout == "three-column":
        cols = render_columns(columns, accent)
        return f"""
        <div class='layout-three-column'>
          <h2>{headline}</h2>
          <p class='sub' style='color:{esc(accent)}'>{sub}</p>
          {cols}
        </div>"""

    if layout == "stat-grid":
        sg = render_stats(stats, accent)
        return f"""
        <div class='layout-stat-grid'>
          <h2>{headline}</h2>
          <p class='sub'>{sub}</p>
          {sg}
        </div>"""

    if layout == "quote-callout":
        return f"""
        <div class='layout-quote'>
          <div class='quote-mark' style='color:{esc(accent)}'>&ldquo;</div>
          <blockquote>{headline}</blockquote>
          <p class='quote-attr' style='color:{esc(accent)}'>{sub}</p>
        </div>"""

    if layout == "cta-close":
        cta_label = esc(cta.get("label", "Get Started"))
        cta_url   = esc(cta.get("url", "#"))
        return f"""
        <div class='layout-cta'>
          <h2>{headline}</h2>
          <p class='sub'>{sub}</p>
          <a href='{cta_url}' class='cta-btn' style='background:{esc(accent)}'>{cta_label}</a>
        </div>"""

    if layout == "full-bleed-image":
        return f"""
        <div class='layout-full-bleed'>
          <div class='bleed-overlay'>
            <h2>{headline}</h2>
            <p class='sub'>{sub}</p>
          </div>
          <div class='bleed-bg-placeholder'>{esc(spec.get('visual_idea',''))}</div>
        </div>"""

    # Fallback
    bl = render_bullets(bullets)
    return f"""
    <div class='layout-fallback'>
      <h2>{headline}</h2>
      <p class='sub' style='color:{esc(accent)}'>{sub}</p>
      {bl}
    </div>"""

def motion_class(motion: str) -> str:
    mapping = {
        "fade-in":    "anim-fade",
        "slide-up":   "anim-slide-up",
        "slide-left": "anim-slide-left",
        "zoom-in":    "anim-zoom",
        "stagger-up": "anim-slide-up",
        "none":       "",
    }
    return mapping.get(motion, "anim-fade")

def build_slides_html(deck: dict) -> str:
    meta   = deck.get("deck_meta", {})
    slides = deck.get("slides", [])
    parts  = []
    for i, spec in enumerate(slides):
        anim  = motion_class(spec.get("motion", "fade-in"))
        body  = render_slide_body(spec, meta)
        note  = esc(spec.get("speaker_note", ""))
        bg    = meta.get("color_primary", "#0F172A")
        parts.append(f"""
    <section class='slide {anim}' data-index='{i}' style='background:{esc(bg)}'>
      <div class='slide-inner'>{body}</div>
      <div class='speaker-note hidden'><strong>Note:</strong> {note}</div>
      <div class='slide-num'>{i+1} / {len(slides)}</div>
    </section>""")
    return "\n".join(parts)

def build_html(deck: dict) -> str:
    meta    = deck.get("deck_meta", {})
    title   = esc(meta.get("title", "Presentation"))
    primary = meta.get("color_primary",   "#0F172A")
    second  = meta.get("color_secondary", "#1E40AF")
    accent  = meta.get("color_accent",    "#38BDF8")
    fh      = esc(meta.get("font_heading", "Georgia"))
    fb      = esc(meta.get("font_body",    "system-ui, sans-serif"))
    slides_html = build_slides_html(deck)
    outline = deck.get("outline", [])
    outline_items = "".join(
        f"<li data-slide='{o['slide']-1}'><span class='role'>{esc(o.get('role',''))}</span> {esc(o.get('headline',''))}</li>"
        for o in outline
    )

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<style>
/* === Reset & Base === */
*, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
:root {{
  --primary:   {primary};
  --secondary: {second};
  --accent:    {accent};
  --white:     #ffffff;
  --light:     #cbd5e1;
  --font-h:    "{fh}", Georgia, serif;
  --font-b:    "{fb}", system-ui, sans-serif;
}}
body {{
  background: #000;
  color: var(--white);
  font-family: var(--font-b);
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}}

/* === Deck container === */
#deck {{
  width: 100%;
  height: 100%;
  position: relative;
}}

/* === Slides === */
.slide {{
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4vh 5vw;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.45s ease, transform 0.45s ease;
}}
.slide.active {{
  opacity: 1;
  pointer-events: all;
  transform: none !important;
}}

/* Motion variants (start state — active removes) */
.anim-fade            {{ opacity: 0; }}
.anim-slide-up        {{ opacity: 0; transform: translateY(40px); }}
.anim-slide-left      {{ opacity: 0; transform: translateX(60px); }}
.anim-zoom            {{ opacity: 0; transform: scale(0.93); }}

.slide-inner {{
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}}

/* === Layouts === */

/* title-hero */
.layout-title-hero    {{ text-align: center; }}
.hero-rule            {{ width: 80px; height: 3px; margin: 0 auto 1.5rem; border-radius: 2px; }}
.hero-headline        {{ font-family: var(--font-h); font-size: clamp(2rem, 5vw, 3.5rem); color: var(--white); line-height: 1.15; margin-bottom: 1rem; }}
.hero-sub             {{ font-size: clamp(1rem, 2vw, 1.4rem); }}

/* split */
.layout-split         {{ display: grid; grid-template-columns: 1fr 1fr; gap: 4vw; align-items: center; }}
.split-left h2        {{ font-family: var(--font-h); font-size: clamp(1.4rem, 3vw, 2.2rem); margin-bottom: 0.75rem; line-height: 1.2; }}
.split-right          {{ display: flex; align-items: center; justify-content: center; }}
.visual-placeholder   {{ border: 1px dashed var(--accent); border-radius: 8px; padding: 2rem 1.5rem; color: var(--light); font-size: 0.85rem; font-style: italic; text-align: center; min-height: 200px; display: flex; align-items: center; opacity: 0.7; }}

/* three-column */
.layout-three-column  {{ text-align: center; }}
.layout-three-column h2 {{ font-family: var(--font-h); font-size: clamp(1.4rem, 3vw, 2rem); margin-bottom: 0.4rem; }}
.three-cols           {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 2vw; margin-top: 2rem; }}
.col                  {{ padding: 0 1rem; border-right: 1px solid rgba(255,255,255,0.1); }}
.col:last-child       {{ border-right: none; }}
.col-icon             {{ width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: bold; color: var(--primary); margin: 0 auto 1rem; font-family: var(--font-h); }}
.col-heading          {{ font-family: var(--font-h); font-size: 1.05rem; font-weight: bold; margin-bottom: 0.5rem; }}
.col-body             {{ font-size: 0.9rem; color: var(--light); line-height: 1.55; }}

/* stat-grid */
.layout-stat-grid     {{ text-align: center; }}
.layout-stat-grid h2  {{ font-family: var(--font-h); font-size: clamp(1.2rem, 2.5vw, 1.8rem); margin-bottom: 0.3rem; }}
.stat-grid-inner      {{ display: grid; grid-template-columns: 1fr 1fr; gap: 2rem 4rem; margin-top: 1.8rem; }}
.stat-cell            {{  }}
.stat-value           {{ font-family: var(--font-h); font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: bold; line-height: 1; }}
.stat-label           {{ font-size: 1rem; margin-top: 0.25rem; }}
.stat-context         {{ font-size: 0.8rem; color: var(--light); font-style: italic; margin-top: 0.15rem; }}

/* quote */
.layout-quote         {{ text-align: center; }}
.quote-mark           {{ font-family: var(--font-h); font-size: 7rem; line-height: 0.7; margin-bottom: 0.5rem; }}
blockquote            {{ font-family: var(--font-h); font-size: clamp(1.4rem, 3.5vw, 2.4rem); font-weight: bold; line-height: 1.3; max-width: 850px; margin: 0 auto 1.2rem; }}
.quote-attr           {{ font-size: 1rem; font-style: italic; }}

/* cta */
.layout-cta           {{ text-align: center; }}
.layout-cta h2        {{ font-family: var(--font-h); font-size: clamp(1.6rem, 3.5vw, 2.6rem); margin-bottom: 1rem; }}
.cta-btn              {{ display: inline-block; margin-top: 1.5rem; padding: 0.75rem 2.2rem; border-radius: 6px; font-size: 1.1rem; font-weight: bold; color: var(--primary); text-decoration: none; font-family: var(--font-h); transition: opacity 0.2s; }}
.cta-btn:hover        {{ opacity: 0.85; }}

/* full-bleed */
.layout-full-bleed    {{ position: relative; }}
.bleed-bg-placeholder {{ position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-style: italic; color: var(--light); font-size: 0.85rem; border: 1px dashed rgba(255,255,255,0.15); z-index: 0; }}
.bleed-overlay        {{ position: relative; z-index: 1; padding: 2rem; background: rgba(0,0,0,0.55); border-radius: 4px; max-width: 600px; }}
.bleed-overlay h2     {{ font-family: var(--font-h); font-size: 2rem; }}

/* Shared text helpers */
h2                    {{ font-family: var(--font-h); color: var(--white); line-height: 1.2; }}
.sub                  {{ color: var(--light); margin-top: 0.5rem; font-size: clamp(0.9rem, 1.8vw, 1.15rem); line-height: 1.4; }}
.bullets              {{ margin-top: 1rem; padding-left: 1.2rem; color: var(--light); font-size: clamp(0.85rem, 1.5vw, 1rem); line-height: 1.7; }}

/* === Speaker notes === */
.speaker-note         {{ position: fixed; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.9); color: var(--light); font-size: 0.9rem; padding: 0.75rem 1.5rem; border-top: 1px solid var(--accent); z-index: 50; }}
.hidden               {{ display: none !important; }}

/* === Slide number === */
.slide-num            {{ position: fixed; bottom: 12px; right: 1rem; font-size: 0.75rem; color: rgba(255,255,255,0.3); z-index: 40; }}

/* === Progress bar === */
#progress             {{ position: fixed; top: 0; left: 0; height: 3px; background: var(--accent); transition: width 0.35s ease; z-index: 100; }}

/* === Controls === */
#controls             {{ position: fixed; bottom: 1rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.6rem; z-index: 60; opacity: 0; transition: opacity 0.3s; }}
#deck:hover #controls {{ opacity: 1; }}
.ctrl-btn             {{ background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); color: var(--white); padding: 0.35rem 0.9rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem; font-family: var(--font-b); transition: background 0.2s; }}
.ctrl-btn:hover       {{ background: rgba(255,255,255,0.22); }}

/* === Outline drawer === */
#outline              {{ position: fixed; top: 0; left: -280px; bottom: 0; width: 280px; background: rgba(10,15,30,0.97); padding: 1.5rem 1rem; overflow-y: auto; transition: left 0.3s ease; z-index: 200; border-right: 1px solid var(--accent); }}
#outline.open         {{ left: 0; }}
#outline h3           {{ font-family: var(--font-h); color: var(--accent); margin-bottom: 1rem; font-size: 0.9rem; letter-spacing: 0.1em; text-transform: uppercase; }}
#outline ul           {{ list-style: none; }}
#outline li           {{ padding: 0.5rem 0.4rem; cursor: pointer; font-size: 0.82rem; color: var(--light); border-radius: 4px; line-height: 1.3; }}
#outline li:hover     {{ background: rgba(255,255,255,0.07); }}
#outline li .role     {{ display: block; font-size: 0.68rem; color: var(--accent); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.1rem; }}
</style>
</head>
<body>

<div id="progress"></div>

<nav id="outline">
  <h3>Outline</h3>
  <ul>{outline_items}</ul>
</nav>

<div id="deck">
{slides_html}

  <div id="controls">
    <button class="ctrl-btn" onclick="prevSlide()">← Prev</button>
    <button class="ctrl-btn" onclick="toggleOutline()">≡ Outline</button>
    <button class="ctrl-btn" onclick="toggleNotes()">N Notes</button>
    <button class="ctrl-btn" onclick="nextSlide()">Next →</button>
  </div>
</div>

<script>
(function() {{
  const slides = document.querySelectorAll('.slide');
  const progress = document.getElementById('progress');
  const outline  = document.getElementById('outline');
  const outlineItems = document.querySelectorAll('#outline li');
  let current = 0;
  let notesVisible = false;

  function show(n) {{
    n = Math.max(0, Math.min(slides.length - 1, n));
    slides[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    progress.style.width = ((current + 1) / slides.length * 100) + '%';
    // Update notes visibility
    document.querySelectorAll('.speaker-note').forEach(el => {{
      el.classList.toggle('hidden', !notesVisible);
    }});
  }}

  function nextSlide() {{ show(current + 1); }}
  function prevSlide() {{ show(current - 1); }}

  function toggleNotes() {{
    notesVisible = !notesVisible;
    document.querySelectorAll('.speaker-note').forEach(el => {{
      el.classList.toggle('hidden', !notesVisible);
    }});
  }}

  function toggleOutline() {{
    outline.classList.toggle('open');
  }}

  outlineItems.forEach(li => {{
    li.addEventListener('click', () => {{
      show(parseInt(li.dataset.slide));
      outline.classList.remove('open');
    }});
  }});

  document.addEventListener('keydown', e => {{
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') {{ e.preventDefault(); nextSlide(); }}
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')                    {{ e.preventDefault(); prevSlide(); }}
    if (e.key === 'n' || e.key === 'N')  toggleNotes();
    if (e.key === 'o' || e.key === 'O')  toggleOutline();
    if (e.key === 'Escape')              outline.classList.remove('open');
    if (e.key === 'f' || e.key === 'F') {{
      if (!document.fullscreenElement) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    }}
  }});

  // Expose to inline onclick
  window.nextSlide    = nextSlide;
  window.prevSlide    = prevSlide;
  window.toggleNotes  = toggleNotes;
  window.toggleOutline = toggleOutline;

  // Init
  show(0);
}})();
</script>
</body>
</html>"""

# --- Style presets (mirrors STYLE_PRESETS.md) ---
PRESETS = {
    "bold-signal":       {"color_primary": "#0A0A0A", "color_secondary": "#111827", "color_accent": "#22D3EE", "font_heading": "Georgia",      "font_body": "Calibri"},
    "electric-studio":   {"color_primary": "#0F172A", "color_secondary": "#1E3A5F", "color_accent": "#60A5FA", "font_heading": "Trebuchet MS",  "font_body": "Calibri"},
    "dark-botanical":    {"color_primary": "#1C1917", "color_secondary": "#292524", "color_accent": "#A3E635", "font_heading": "Georgia",       "font_body": "Palatino"},
    "creative-voltage":  {"color_primary": "#09090B", "color_secondary": "#18181B", "color_accent": "#FACC15", "font_heading": "Impact",        "font_body": "Arial"},
    "neon-cyber":        {"color_primary": "#030712", "color_secondary": "#0C1445", "color_accent": "#A855F7", "font_heading": "Trebuchet MS",  "font_body": "Consolas"},
    "terminal-green":    {"color_primary": "#0D1117", "color_secondary": "#161B22", "color_accent": "#3FB950", "font_heading": "Consolas",      "font_body": "Consolas"},
    "swiss-modern":      {"color_primary": "#FAFAFA", "color_secondary": "#F4F4F5", "color_accent": "#18181B", "font_heading": "Georgia",       "font_body": "Calibri"},
    "vintage-editorial": {"color_primary": "#FEF9EF", "color_secondary": "#FEF3C7", "color_accent": "#92400E", "font_heading": "Georgia",       "font_body": "Palatino"},
    "pastel-geometry":   {"color_primary": "#F8FAFC", "color_secondary": "#EFF6FF", "color_accent": "#6366F1", "font_heading": "Trebuchet MS",  "font_body": "Calibri"},
    "paper-ink":         {"color_primary": "#FFFBF5", "color_secondary": "#FFF8ED", "color_accent": "#1C1917", "font_heading": "Palatino",      "font_body": "Georgia"},
    "coral-energy":      {"color_primary": "#1C1917", "color_secondary": "#292524", "color_accent": "#F97316", "font_heading": "Georgia",       "font_body": "Calibri"},
    "teal-trust":        {"color_primary": "#0F2027", "color_secondary": "#1B3A4B", "color_accent": "#2DD4BF", "font_heading": "Georgia",       "font_body": "Calibri"},
}

def apply_preset(deck: dict, preset_name: str) -> dict:
    """Override deck_meta colors/fonts with a named preset."""
    import copy
    preset = PRESETS.get(preset_name)
    if not preset:
        print(f"Unknown preset '{preset_name}'. Available: {', '.join(PRESETS.keys())}", file=sys.stderr)
        sys.exit(1)
    deck = copy.deepcopy(deck)
    deck.setdefault("deck_meta", {}).update(preset)
    deck["deck_meta"]["style_preset"] = preset_name
    return deck


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Generate HTML presentation from deck JSON")
    parser.add_argument("input",          help="Path to deck.json")
    parser.add_argument("output",         nargs="?", help="Output HTML path (default: deck.html)")
    parser.add_argument("--preset", "-p", help=f"Style preset name. Options: {', '.join(PRESETS.keys())}")
    args = parser.parse_args()

    deck = load_deck(args.input)

    if args.preset:
        deck = apply_preset(deck, args.preset)
        print(f"  Applying preset: {args.preset}")

    output_path = args.output or (Path(args.input).stem + ".html")
    html_content = build_html(deck)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    slides_count = len(deck.get("slides", []))
    preset_note  = f" [{args.preset}]" if args.preset else ""
    print(f"✓ Written: {output_path}{preset_note}")
    print(f"  Slides: {slides_count}")
    print(f"  Open in browser. Keys: ← → navigate | N notes | O outline | F fullscreen")
    print(f"  Available presets: {', '.join(PRESETS.keys())}")

if __name__ == "__main__":
    main()
