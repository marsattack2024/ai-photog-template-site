import type { TweakGroup } from "@/components/ui/TweaksPanel";

/**
 * Tweaks registry for a client review session.
 *
 * This file is INTENTIONALLY empty in the template. Forks add groups
 * when they want to demo design variations to a photographer:
 *
 *   export const TWEAK_GROUPS: TweakGroup[] = [
 *     {
 *       key: "palette",
 *       label: "Color Palette",
 *       opts: [
 *         { val: "default", label: "Editorial Cream", swatches: ["#C9A961", "#1A1A1A"] },
 *         { val: "warm-luxe", label: "Warm Luxe", swatches: ["#B65D3B", "#1A1410"] },
 *         { val: "moody", label: "Dark Moody", swatches: ["#8C6B49", "#141619"] },
 *       ],
 *     },
 *     {
 *       key: "show-testimonials",
 *       label: "Testimonials",
 *       opts: [
 *         { val: "on", label: "Show" },
 *         { val: "off", label: "Hide" },
 *       ],
 *     },
 *   ];
 *
 *   export const TWEAK_DEFAULTS: Record<string, string> = {
 *     palette: "default",
 *     "show-testimonials": "on",
 *   };
 *
 * Then add CSS overrides in globals.css:
 *
 *   body[data-palette="warm-luxe"] {
 *     --primitive-accent: #B65D3B;
 *     --primitive-ink: #1A1410;
 *   }
 *   body[data-show-testimonials="off"] section[id="testimonials"] {
 *     display: none;
 *   }
 *
 * And mount the panel in app/(site)/layout.tsx (dev-only):
 *
 *   <TweaksPanel groups={TWEAK_GROUPS} defaults={TWEAK_DEFAULTS} />
 *
 * The panel only renders on localhost — triple-layered NODE_ENV +
 * hostname guard means it never ships to a preview or prod deploy.
 *
 * After the review session, click "Copy choices for Claude →" in the
 * panel, paste the message, and the chosen values get promoted to
 * permanent defaults.
 */

export const TWEAK_GROUPS: TweakGroup[] = [];

export const TWEAK_DEFAULTS: Record<string, string> = {};
