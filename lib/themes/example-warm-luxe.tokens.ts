import type { CSSProperties } from "react";

/**
 * Example alternate theme — warmer, more saturated, "luxe" feel.
 * Drop this on any page wrapper to re-skin that page only:
 *
 *   <div style={exampleWarmLuxe}>
 *     ... page content ...
 *   </div>
 *
 * Not wired into any page — this file demonstrates the override shape.
 * Copy + edit for your own variants. Pattern matches the `seaTokens`
 * object in app/(site)/seattle-boudoir/page.tsx.
 *
 * Override the PRIMITIVE tokens, not the semantic ones. The semantic
 * tokens (--color-ink, --color-cream, etc.) re-resolve automatically.
 */
export const exampleWarmLuxe: CSSProperties = {
  // Deeper, warmer near-black — feels more like espresso than carbon
  "--primitive-ink": "#1A1410",
  // Golden cream — warmer than the default neutral cream
  "--primitive-cream": "#F4ECDB",
  // Terracotta accent — earthier than the default warm gold
  "--primitive-accent": "#B65D3B",
  // Darkened accent for WCAG-passing text
  "--primitive-accent-text": "#8A4528",
  // Muted warm taupe for secondary text
  "--primitive-muted": "#8A7E70",
  // Subtle warm beige border
  "--primitive-border": "#E0D4C2",
} as CSSProperties;
