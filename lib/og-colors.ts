/**
 * Hex palette for /opengraph-image, /icon, /apple-icon.
 *
 * `next/og` renders inside Satori (an SVG renderer in a V8 isolate) and
 * cannot resolve CSS custom properties — it has no DOM, no <html>, no
 * stylesheet. So the OG/icon files have to inline hex literals.
 *
 * These values are the hex equivalents of the OKLCH primitives in
 * app/globals.css (`--primitive-*`). When a fork swaps the palette
 * there, also update this file. They are intentionally duplicated
 * (in a single place) rather than computed because OKLCH → sRGB
 * conversion at the edge is overkill for static brand colors.
 */
export const OG_COLORS = {
  cream:  "#F5F0E6", // ~oklch(97% 0.008 90)
  ink:    "#1A1A1A", // ~oklch(15% 0.005 280)
  accent: "#C9A961", // ~oklch(68% 0.10 80)
  muted:  "#7A7368", // ~oklch(52% 0.010 280)
} as const;
