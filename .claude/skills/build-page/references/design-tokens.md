# P2P Design Token Reference

Source of truth: `/src/styles/theme.css`

## Color Tokens

| Token        | Hex     | Tailwind Class                        | Usage                           |
| ------------ | ------- | ------------------------------------- | ------------------------------- |
| Gold         | #D4AF37 | `bg-gold`, `text-gold`, `border-gold` | CTAs, accents, highlights       |
| Gold Hover   | #E8B730 | `bg-gold-hover`                       | Button hover state              |
| Dark         | #0A0A0A | `bg-dark`, `text-dark`                | Page backgrounds, text on light |
| Dark2        | #121212 | `bg-dark2`                            | Card interiors on dark bg       |
| Dark3        | #111111 | `bg-dark3`                            | Alternate dark shade            |
| Light        | #F7F6F3 | `bg-light`, `text-light`              | Light section backgrounds       |
| White        | #FFFFFF | `bg-white`, `text-white`              | Card fills, text on dark        |
| Surface Alt  | #FAFAFA | `bg-surface-alt`                      | Card hover on light bg          |
| Surface Warm | #F0EDE8 | `bg-surface-warm`                     | Warm light surface              |
| Text Gray    | #555    | `text-text-gray`                      | Body text on light bg           |
| Text Muted   | #999    | `text-text-muted`                     | Captions, subtext               |
| Text Soft    | #ccc    | `text-text-soft`                      | Light text on dark bg           |
| Border Light | #E8E5E0 | `border-border-light`                 | Borders on light bg             |
| Border Dark  | #222    | `border-border-dark`                  | Borders on dark bg              |

## Semantic Aliases

| Semantic             | Maps To    | Class                     |
| -------------------- | ---------- | ------------------------- |
| action-primary       | Gold       | `bg-action-primary`       |
| action-primary-hover | Gold Hover | `bg-action-primary-hover` |
| surface-dark         | Dark       | `bg-surface-dark`         |
| surface-light        | Light      | `bg-surface-light`        |
| text-primary         | Dark       | `text-text-primary`       |
| text-secondary       | Text Gray  | `text-text-secondary`     |
| text-tertiary        | Text Muted | `text-text-tertiary`      |
| text-on-dark         | White      | `text-text-on-dark`       |

## Typography

| Element        | Size                                        | Weight  | Notes                          |
| -------------- | ------------------------------------------- | ------- | ------------------------------ |
| H1 (Hero)      | `text-[40px] md:text-[60px] lg:text-[72px]` | 800     | uppercase, tight leading       |
| H2 (Section)   | `text-[36px] md:text-[44px]`                | 700     | uppercase, leading ~1.15       |
| Eyebrow        | `text-[13px]`                               | 500-600 | uppercase tracking-wider, gold |
| Body           | `text-[15px]` - `text-[18px]`               | 400     | leading 1.6-1.75               |
| Bold Statement | `text-[20px]`                               | 700     | Key takeaway lines             |
| Tags/Badges    | `text-[12px]`                               | 700     | uppercase tracking-wider       |

**Font stacks:**

- Primary: `Inter, sans-serif` — all UI text
- Accent: `Playfair Display, Georgia, serif` — hero gold italic phrases ONLY

**Always set inline:**

```tsx
style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
```

## Spacing Standards

| Element                     | Value                      |
| --------------------------- | -------------------------- |
| Container padding           | `px-6`                     |
| Content max-width           | `max-w-7xl` (1280px)       |
| Narrow content              | `max-w-5xl` or `max-w-4xl` |
| Text-heavy sections         | `max-w-3xl`                |
| Section padding (standard)  | `py-14 md:py-20`           |
| Section padding (generous)  | `py-24 md:py-32`           |
| Card padding (light)        | `p-7 md:p-8`               |
| Card padding (dark feature) | `p-10 md:p-16`             |
| Card border radius          | `rounded-2xl`              |

## SectionDivider Sizes

| Size         | Height | Used by                   |
| ------------ | ------ | ------------------------- |
| sm           | 48px   | Real Estate               |
| md (default) | 72px   | Home, Boudoir, Podcast    |
| lg           | 100px  | About, Resources, Courses |

## Animation Pattern

```tsx
import { motion } from "motion/react";

// Entrance
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5 }}

// Stagger in lists
delay: Math.min(i * 0.1, 0.3)

// Hero orb glow
animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.14, 0.06] }}
transition={{ duration: 7, repeat: Infinity }}
```

## What NOT to Do

1. Don't create `tailwind.config.js` — uses Tailwind v4 with `@theme` in CSS
2. Don't hardcode hex colors — use tokens
3. Don't use `font-bold` class — use inline `fontWeight`
4. Don't define local versions of shared components — import them
5. Don't add fonts except in `/src/styles/fonts.css`
6. Don't use `react-router-dom` — use `react-router`
7. Don't forget `viewport={{ once: true }}` on whileInView
8. Don't rely on CSS inheritance for font-family
