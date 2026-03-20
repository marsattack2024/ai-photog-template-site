---
name: tailwind-design-system
description: >
  Use when building React components or CSS with Tailwind CSS v4.1. Covers
  CSS-first @theme config, design tokens, CVA components, dark mode, animations,
  and all v4.1 additions (text-shadow, mask, pointer variants, safe alignment, etc.).
  NOT for Tailwind v3 projects.
keywords: tailwind, v4, design-system, cva, react, accessibility, dark-mode, components
version: 4.1
---

# Tailwind CSS v4.1 Design System

## Critical Rules
1. Config lives in CSS `@theme {}` — no `tailwind.config.ts`
2. Use `@import "tailwindcss"` — not `@tailwind base/components/utilities`
3. Dark mode via `@custom-variant dark (&:where(.dark, .dark *))` — not `darkMode: "class"`
4. No `forwardRef` — React 19 passes `ref` as a regular prop
5. Use OKLCH colors — better perceptual uniformity than HSL
6. Use `size-*` shorthand — not `w-* h-*`
7. Extend via `@theme` or `@utility` — not arbitrary values
8. Safelist dynamic classes via `@source inline("...")` in CSS — not config

## Anti-Patterns
- ❌ `tailwind.config.ts` → ✅ `@theme {}` in CSS
- ❌ `@tailwind directives` → ✅ `@import "tailwindcss"`
- ❌ `darkMode: "class"` → ✅ `@custom-variant dark`
- ❌ `require("tailwindcss-animate")` → ✅ Native `@keyframes` in `@theme`
- ❌ `bg-blue-500` hardcoded → ✅ `bg-primary` semantic tokens
- ❌ `forwardRef` → ✅ `ref` as prop

---

## 1. CSS-First Setup (`app.css`)

```css
@import "tailwindcss";

@theme {
  /* Semantic color tokens (OKLCH) */
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(14.5% 0.025 264);
  --color-primary: oklch(14.5% 0.025 264);
  --color-primary-foreground: oklch(98% 0.01 264);
  --color-secondary: oklch(96% 0.01 264);
  --color-secondary-foreground: oklch(14.5% 0.025 264);
  --color-muted: oklch(96% 0.01 264);
  --color-muted-foreground: oklch(46% 0.02 264);
  --color-accent: oklch(96% 0.01 264);
  --color-accent-foreground: oklch(14.5% 0.025 264);
  --color-destructive: oklch(53% 0.22 27);
  --color-destructive-foreground: oklch(98% 0.01 264);
  --color-border: oklch(91% 0.01 264);
  --color-ring: oklch(14.5% 0.025 264);
  --color-card: oklch(100% 0 0);
  --color-card-foreground: oklch(14.5% 0.025 264);

  /* Radius tokens */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;

  /* Animation tokens */
  --animate-fade-in: fade-in 0.2s ease-out;
  --animate-slide-in: slide-in 0.3s ease-out;

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slide-in {
    from { transform: translateY(-0.5rem); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
}

/* Dark mode */
@custom-variant dark (&:where(.dark, .dark *));

.dark {
  --color-background: oklch(14.5% 0.025 264);
  --color-foreground: oklch(98% 0.01 264);
  --color-primary: oklch(98% 0.01 264);
  --color-primary-foreground: oklch(14.5% 0.025 264);
  --color-secondary: oklch(22% 0.02 264);
  --color-secondary-foreground: oklch(98% 0.01 264);
  --color-muted: oklch(22% 0.02 264);
  --color-muted-foreground: oklch(65% 0.02 264);
  --color-border: oklch(22% 0.02 264);
  --color-card: oklch(14.5% 0.025 264);
  --color-card-foreground: oklch(98% 0.01 264);
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground antialiased; }
}
```

---

## 2. Component Patterns

### Button (CVA)
```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-border bg-background hover:bg-accent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export function Button({
  className, variant, size, asChild = false, ref, ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    ref?: React.Ref<HTMLButtonElement>
  }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
}
```

### Card (Compound)
```tsx
import { cn } from '@/lib/utils'

export function Card({ className, ref, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return <div ref={ref} className={cn('rounded-lg border border-border bg-card text-card-foreground shadow-sm', className)} {...props} />
}
export function CardHeader({ className, ref, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
}
export function CardTitle({ className, ref, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLHeadingElement> }) {
  return <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
}
export function CardContent({ className, ref, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
}
export function CardFooter({ className, ref, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
}
```

### Input (with validation)
```tsx
export function Input({ className, type, error, ref, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string; ref?: React.Ref<HTMLInputElement> }) {
  return (
    <div className="relative">
      <input
        type={type} ref={ref}
        className={cn('flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50', error && 'border-destructive', className)}
        aria-invalid={!!error}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-destructive" role="alert">{error}</p>}
    </div>
  )
}
```

---

## 3. v4.1 New Utilities

### Text Shadow
```html
<!-- Sizes: text-shadow-2xs | text-shadow-xs | text-shadow-sm | text-shadow-md | text-shadow-lg -->
<h1 class="text-shadow-md">Heading</h1>
<h1 class="text-shadow-lg text-shadow-blue-500/50">Colored shadow</h1>
<button class="text-gray-900 text-shadow-2xs text-shadow-white/70">Embossed</button>
```

### Mask Utilities
```html
<!-- Gradient mask fading bottom edge -->
<div class="mask-b-from-50% mask-b-to-0%">
  <img src="photo.jpg" />
</div>
<!-- Composable: combine radial + linear masks -->
<div class="mask-b-from-80% mask-radial-from-80%">...</div>
```

### Colored Drop Shadow
```html
<img class="drop-shadow-xl drop-shadow-blue-500/50" src="logo.png" />
<img class="drop-shadow-lg drop-shadow-indigo-500" src="icon.png" />
```

### Pointer Variants (touch vs. mouse)
```html
<!-- Larger tap targets on touch devices -->
<button class="px-3 py-1 pointer-coarse:px-5 pointer-coarse:py-3">Submit</button>
<!-- any-pointer-coarse = true even on hybrid devices (touchscreen laptop) -->
<div class="grid-cols-4 any-pointer-coarse:grid-cols-2">...</div>
```

### Safe Alignment
```html
<!-- Centered but falls back to start on overflow -->
<div class="flex justify-center-safe gap-2">...</div>
<div class="flex items-center-safe">...</div>
```

### Overflow Wrap
```html
<p class="wrap-break-word">VeryLongWordThatWouldBreakLayout</p>
<!-- Use wrap-anywhere inside flex containers -->
<p class="wrap-anywhere">VeryLongWordInFlexItem</p>
```

### Baseline Last Alignment
```html
<div class="flex items-baseline-last gap-4">
  <div><h4>Name</h4><p>Multi-line bio text here...</p></div>
  <a href="#">website.com</a> <!-- aligns to last baseline of bio -->
</div>
```

### New Variants
```html
<!-- Form validation (fires only after user interaction) -->
<input required class="border user-valid:border-green-500 user-invalid:border-red-500" />

<!-- No-JS fallback -->
<div class="hidden noscript:block">Enable JavaScript to use this app.</div>

<!-- Inverted colors accessibility -->
<div class="shadow-xl inverted-colors:shadow-none">...</div>

<!-- Details accordion content -->
<details class="details-content:pt-2 details-content:px-4">
  <summary>Toggle</summary>
  <p>Content here</p>
</details>
```

### Source Control
```css
/* Safelist dynamic classes */
@source inline("{hover:,}bg-red-{50,{100..900..100},950}");

/* Exclude paths from scanning */
@source not "./src/components/legacy";

/* Prevent specific class generation */
@source not inline("container");
```

---

## 4. Utility Helpers

```ts
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
export const focusRing = cn('focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2')
export const disabled = 'disabled:pointer-events-none disabled:opacity-50'
```

---

## 5. Custom Utilities & Advanced @theme

```css
/* Custom utility */
@utility text-gradient {
  @apply bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent;
}

/* Alpha color variants */
@theme {
  --color-primary-50: color-mix(in oklab, var(--color-primary) 5%, transparent);
  --color-primary-100: color-mix(in oklab, var(--color-primary) 10%, transparent);
}

/* Font override */
@theme inline {
  --font-sans: var(--font-inter), system-ui;
}

/* Override all default colors */
@theme {
  --color-*: initial;
  --color-white: #fff;
  --color-black: #000;
  --color-primary: oklch(45% 0.2 260);
}
