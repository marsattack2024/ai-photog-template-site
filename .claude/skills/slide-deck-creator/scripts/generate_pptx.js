#!/usr/bin/env node
/**
 * generate_pptx.js
 * Converts a slide-deck-creator JSON spec to a .pptx file using pptxgenjs.
 *
 * Usage:
 *   node generate_pptx.js deck.json [output.pptx]
 *
 * Requires:
 *   npm install pptxgenjs
 */

const fs = require("fs");
const path = require("path");
let pptxgen;
try {
  pptxgen = require("pptxgenjs");
} catch {
  console.error("Missing dependency. Run: npm install pptxgenjs");
  process.exit(1);
}

const inputFile = process.argv[2];
if (!inputFile) {
  console.error("Usage: node generate_pptx.js <deck.json> [output.pptx]");
  process.exit(1);
}

const deck = JSON.parse(fs.readFileSync(inputFile, "utf8"));
const outputFile =
  process.argv[3] ||
  path.basename(inputFile, ".json") + ".pptx";

const meta = deck.deck_meta;
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = meta.title;
if (meta.author) pres.author = meta.author;

// Color helpers (strip leading #)
const hex = (c) => (c || "").replace("#", "");
const PRIMARY   = hex(meta.color_primary)   || "0F172A";
const SECONDARY = hex(meta.color_secondary) || "1E40AF";
const ACCENT    = hex(meta.color_accent)    || "38BDF8";
const WHITE     = "FFFFFF";
const LIGHT     = "CBD5E1";

// Font helpers
const FONT_H = meta.font_heading || "Georgia";
const FONT_B = meta.font_body    || "Calibri";

/**
 * Render helpers per layout type
 */
function renderSlide(slide, spec) {
  const accentHex = hex(spec.accent_color) || ACCENT;

  switch (spec.layout) {
    case "title-hero":
      renderTitleHero(slide, spec, accentHex);
      break;
    case "split-text-visual":
      renderSplitText(slide, spec, accentHex);
      break;
    case "three-column":
      renderThreeColumn(slide, spec, accentHex);
      break;
    case "stat-grid":
      renderStatGrid(slide, spec, accentHex);
      break;
    case "quote-callout":
      renderQuoteCallout(slide, spec, accentHex);
      break;
    case "cta-close":
      renderCTAClose(slide, spec, accentHex);
      break;
    case "full-bleed-image":
      renderFullBleed(slide, spec, accentHex);
      break;
    default:
      renderFallback(slide, spec);
  }
}

function setDarkBg(slide, color) {
  slide.background = { color: color || PRIMARY };
}

function addHeadline(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.5,
    y: opts.y ?? 0.5,
    w: opts.w ?? 9,
    h: opts.h ?? 1.2,
    fontFace: FONT_H,
    fontSize: opts.fontSize ?? 40,
    bold: true,
    color: opts.color ?? WHITE,
    align: opts.align ?? "left",
    valign: "middle",
    wrap: true,
  });
}

function addSubheadline(slide, text, opts = {}) {
  if (!text) return;
  slide.addText(text, {
    x: opts.x ?? 0.5,
    y: opts.y ?? 1.9,
    w: opts.w ?? 9,
    h: opts.h ?? 0.8,
    fontFace: FONT_B,
    fontSize: opts.fontSize ?? 18,
    color: opts.color ?? ACCENT,
    align: opts.align ?? "left",
    valign: "top",
    wrap: true,
  });
}

function addBullets(slide, bullets, opts = {}) {
  if (!bullets || bullets.length === 0) return;
  const items = bullets.map((b) => ({ text: b, options: { bullet: true } }));
  slide.addText(items, {
    x: opts.x ?? 0.5,
    y: opts.y ?? 2.9,
    w: opts.w ?? 4.2,
    h: opts.h ?? 2.4,
    fontFace: FONT_B,
    fontSize: 15,
    color: opts.color ?? LIGHT,
    lineSpacingMultiple: 1.4,
    wrap: true,
  });
}

function addSpeakerNote(slide, note) {
  if (note) slide.addNotes(note);
}

// --- Layout renderers ---

function renderTitleHero(slide, spec, accentHex) {
  setDarkBg(slide, PRIMARY);
  addHeadline(slide, spec.headline, { y: 1.5, align: "center", w: 9, fontSize: 44 });
  addSubheadline(slide, spec.subheadline, { y: 3.0, align: "center", w: 9, color: accentHex });
  slide.addShape(pres.ShapeType.line, {
    x: 3.5, y: 2.85, w: 3, h: 0,
    line: { color: accentHex, width: 2 },
  });
  addSpeakerNote(slide, spec.speaker_note);
}

function renderSplitText(slide, spec, accentHex) {
  setDarkBg(slide, PRIMARY);
  addHeadline(slide, spec.headline, { x: 0.4, y: 0.5, w: 4.5, fontSize: 30 });
  addSubheadline(slide, spec.subheadline, { x: 0.4, y: 1.65, w: 4.5, fontSize: 15, color: accentHex });
  addBullets(slide, spec.bullets, { x: 0.4, y: 2.4, w: 4.5, h: 2.8 });
  // Right panel placeholder box (replace with an image in pptx skill)
  slide.addShape(pres.ShapeType.rect, {
    x: 5.3, y: 0.4, w: 4.3, h: 4.8,
    fill: { color: SECONDARY, transparency: 80 },
    line: { color: accentHex, width: 1 },
  });
  slide.addText("[Visual: " + (spec.visual_idea || "chart or image") + "]", {
    x: 5.3, y: 0.4, w: 4.3, h: 4.8,
    fontSize: 11, color: LIGHT, align: "center", valign: "middle",
    fontFace: FONT_B, italic: true, wrap: true,
  });
  addSpeakerNote(slide, spec.speaker_note);
}

function renderThreeColumn(slide, spec, accentHex) {
  setDarkBg(slide, PRIMARY);
  addHeadline(slide, spec.headline, { y: 0.3, w: 9, align: "center", fontSize: 32 });
  addSubheadline(slide, spec.subheadline, { y: 1.35, w: 9, align: "center", fontSize: 14, color: LIGHT });

  const columns = spec.columns || [];
  const colW = 2.8;
  const colStarts = [0.4, 3.6, 6.7];

  columns.forEach((col, i) => {
    const x = colStarts[i] ?? 0.4 + i * 3.2;
    // Icon circle
    slide.addShape(pres.ShapeType.ellipse, {
      x: x + 0.9, y: 2.0, w: 0.9, h: 0.9,
      fill: { color: accentHex },
    });
    slide.addText(col.icon ? col.icon.slice(0, 1).toUpperCase() : String(i + 1), {
      x: x + 0.9, y: 2.0, w: 0.9, h: 0.9,
      fontSize: 18, bold: true, color: PRIMARY, align: "center", valign: "middle",
      fontFace: FONT_H,
    });
    // Heading
    slide.addText(col.heading || "", {
      x, y: 3.05, w: colW, h: 0.5,
      fontSize: 16, bold: true, color: WHITE, align: "center", fontFace: FONT_H,
    });
    // Body
    slide.addText(col.body || "", {
      x, y: 3.65, w: colW, h: 1.6,
      fontSize: 13, color: LIGHT, align: "center", fontFace: FONT_B, wrap: true,
      lineSpacingMultiple: 1.3,
    });
    // Divider (skip last)
    if (i < columns.length - 1) {
      slide.addShape(pres.ShapeType.line, {
        x: x + colW + 0.05, y: 2.0, w: 0, h: 3.2,
        line: { color: accentHex, width: 1, transparency: 60 },
      });
    }
  });
  addSpeakerNote(slide, spec.speaker_note);
}

function renderStatGrid(slide, spec, accentHex) {
  setDarkBg(slide, PRIMARY);
  addHeadline(slide, spec.headline, { y: 0.25, w: 9, align: "center", fontSize: 28 });
  addSubheadline(slide, spec.subheadline, { y: 1.2, w: 9, align: "center", fontSize: 13, color: LIGHT });

  const stats = spec.stats || [];
  const positions = [
    { x: 0.5, y: 1.9 }, { x: 5.1, y: 1.9 },
    { x: 0.5, y: 3.5 }, { x: 5.1, y: 3.5 },
  ];

  stats.slice(0, 4).forEach((stat, i) => {
    const pos = positions[i];
    slide.addText(stat.value || "", {
      x: pos.x, y: pos.y, w: 4.2, h: 1.0,
      fontSize: 60, bold: true, color: accentHex, align: "center",
      fontFace: FONT_H, valign: "middle",
    });
    slide.addText(stat.label || "", {
      x: pos.x, y: pos.y + 0.95, w: 4.2, h: 0.4,
      fontSize: 16, color: WHITE, align: "center", fontFace: FONT_B,
    });
    if (stat.context) {
      slide.addText(stat.context, {
        x: pos.x, y: pos.y + 1.38, w: 4.2, h: 0.3,
        fontSize: 11, color: LIGHT, align: "center", fontFace: FONT_B, italic: true,
      });
    }
  });
  addSpeakerNote(slide, spec.speaker_note);
}

function renderQuoteCallout(slide, spec, accentHex) {
  setDarkBg(slide, SECONDARY);
  slide.addText("\u201C", {
    x: 0.3, y: 0.2, w: 1.5, h: 1.5,
    fontSize: 100, color: accentHex, fontFace: FONT_H, bold: true, align: "left",
  });
  slide.addText(spec.headline, {
    x: 0.7, y: 1.1, w: 8.5, h: 1.8,
    fontSize: 34, bold: true, color: WHITE, fontFace: FONT_H, wrap: true, align: "center",
  });
  if (spec.subheadline) {
    slide.addText(spec.subheadline, {
      x: 1.5, y: 3.2, w: 7, h: 0.7,
      fontSize: 15, color: accentHex, fontFace: FONT_B, align: "center", italic: true,
    });
  }
  addSpeakerNote(slide, spec.speaker_note);
}

function renderCTAClose(slide, spec, accentHex) {
  setDarkBg(slide, PRIMARY);
  addHeadline(slide, spec.headline, { y: 1.2, w: 9, align: "center", fontSize: 38 });
  addSubheadline(slide, spec.subheadline, { y: 2.55, w: 9, align: "center", fontSize: 16, color: LIGHT });

  const cta = spec.cta;
  if (cta && cta.label) {
    slide.addShape(pres.ShapeType.roundRect, {
      x: 3.2, y: 3.5, w: 3.6, h: 0.7,
      fill: { color: accentHex },
      line: { color: accentHex },
    });
    slide.addText(cta.label, {
      x: 3.2, y: 3.5, w: 3.6, h: 0.7,
      fontSize: 18, bold: true, color: PRIMARY, align: "center", valign: "middle",
      fontFace: FONT_H,
    });
    if (cta.url) {
      slide.addText(cta.url, {
        x: 2.5, y: 4.4, w: 5, h: 0.3,
        fontSize: 11, color: LIGHT, align: "center", fontFace: FONT_B, italic: true,
      });
    }
  }
  addSpeakerNote(slide, spec.speaker_note);
}

function renderFullBleed(slide, spec, accentHex) {
  setDarkBg(slide, PRIMARY);
  slide.addText("[Full bleed image: " + (spec.visual_idea || "") + "]", {
    x: 0, y: 0, w: 10, h: 5.625,
    fontSize: 12, color: LIGHT, align: "center", valign: "middle", fontFace: FONT_B, italic: true,
  });
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 3.5, w: 10, h: 2.125,
    fill: { color: PRIMARY, transparency: 30 },
  });
  addHeadline(slide, spec.headline, { y: 3.7, w: 9.5, align: "center", fontSize: 36, color: WHITE });
  addSpeakerNote(slide, spec.speaker_note);
}

function renderFallback(slide, spec) {
  setDarkBg(slide, PRIMARY);
  addHeadline(slide, spec.headline);
  addSubheadline(slide, spec.subheadline);
  addBullets(slide, spec.bullets);
  addSpeakerNote(slide, spec.speaker_note);
}

// --- Main ---

deck.slides.forEach((spec) => {
  const slide = pres.addSlide();
  renderSlide(slide, spec);
});

pres.writeFile({ fileName: outputFile }).then(() => {
  console.log(`✓ Written: ${outputFile}`);
  console.log(`  Slides: ${deck.slides.length}`);
  console.log(`  Next: run the pptx skill's QA workflow to inspect visually.`);
});
