# Themes

This template ships with **one primary theme** defined as CSS custom properties in `app/globals.css` (the `:root` `--primitive-*` block). Most clients should just edit those six values for a full re-skin — that's the simplest path and applies site-wide.

## Two swap mechanisms

### 1. Global swap — edit `app/globals.css`

Affects every page. Edit the six primitives:

```css
:root {
  --primitive-ink:    oklch(15% 0.005 280);   /* near-black */
  --primitive-cream:  oklch(97% 0.008 90);    /* warm white */
  --primitive-accent: oklch(68% 0.10 80);     /* brand color */
  --primitive-accent-text: oklch(50% 0.10 80);
  --primitive-muted:  oklch(52% 0.010 280);
  --primitive-border: oklch(88% 0.006 280);
}
```

Use `oklch()` so adjacent tokens stay perceptually consistent when lightness changes. Online picker: [oklch.com](https://oklch.com/).

### 2. Per-page override — inline style on a wrapper div

For sites with multiple distinct brand looks (e.g., a sub-brand page that needs different colors than the main site), wrap the page in a `<div style={tokens}>` and pass a CSS variable override object.

```tsx
import { exampleWarmLuxe } from "@/lib/themes/example-warm-luxe.tokens";

export default function Page() {
  return (
    <div style={exampleWarmLuxe}>
      {/* page content — inherits the override tokens */}
    </div>
  );
}
```

The inline `style` prop is Server-Component-safe (no hydration mismatch, no flash of wrong theme).

## When to use which

- **Forking the whole site for a new client** → option 1 (edit `globals.css`). One source of truth.
- **One page within a site needs a different look** → option 2 (inline override).
- **A/B testing two palettes** → option 2 with a feature flag swap.

## Examples in this directory

- `example-warm-luxe.tokens.ts` — warmer, more saturated palette (deeper ink, golden cream, terracotta accent). Demonstrates the override shape; not wired into any page.

## Don't

- Don't create a third mechanism (e.g., a `<ThemeProvider>` context). The CSS-var approach already covers every realistic need and adds zero runtime cost.
- Don't override `--color-*` semantic tokens directly in CSS. Override the underlying `--primitive-*` and let the semantic tokens re-resolve.
