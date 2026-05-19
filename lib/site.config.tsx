import type { ReactNode } from "react";

/**
 * SITE CONFIG — single source of truth for branding & top-level content.
 *
 * To fork this template for a new client:
 *   1. Duplicate the repo
 *   2. Edit this file (brand name, hero copy, socials, etc.)
 *   3. Drop the client's images into /public/
 *   4. Set NEXT_PUBLIC_SITE_URL + NEXT_PUBLIC_SITE_NAME on Vercel
 *   5. Set GHL_PIT_TOKEN + GHL_LOCATION_ID for the contact form
 *
 * Section-level content (FAQs, testimonials, process steps, etc.) lives
 * inside each section component as DEFAULT_* exports. Override per-page
 * by passing props, OR edit the defaults in-place for a permanent change.
 */

export interface SiteSocial {
  label: string;
  href: string;
}

export interface SiteHero {
  eyebrow?: string;
  headline: ReactNode;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

export interface SiteBookingCTA {
  headline: ReactNode;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    tagline?: string;
    phone?: string;
    email?: string;
    location?: {
      city: string;
      state: string;
      address?: string;
      zip?: string;
    };
  };
  seo: {
    baseUrl: string;
    description: string;
    defaultOgImage?: string;
    titleTemplate?: string;
    /**
     * AI bot crawling policy (consumed by robots.ts).
     * Recommendation: allow search bots (so AI search engines cite the site)
     * and block training bots (so the photographer's images aren't scraped
     * into model training corpora).
     */
    aiBotPolicy?: {
      allowSearch: boolean;
      allowTraining: boolean;
    };
  };
  socials: SiteSocial[];
  hero: SiteHero;
  bookingCTA?: SiteBookingCTA;
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "[Studio Name]",
    tagline:
      "Editorial portrait photography for the people who keep putting themselves last.",
    email: "hello@yourdomain.com",
  },
  seo: {
    baseUrl:
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com",
    description:
      process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
      "A boutique portrait and editorial photography studio. Guided sessions, same-week delivery, every body welcome.",
    defaultOgImage: "/og-default.jpg",
    titleTemplate: "%s | [Studio Name]",
    aiBotPolicy: {
      allowSearch: true,
      allowTraining: false,
    },
  },
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Pinterest", href: "#" },
    { label: "TikTok", href: "#" },
  ],
  hero: {
    eyebrow: "Editorial Portrait Photography",
    headline: (
      <>
        Portraits, For The People Who Don&apos;t Feel{" "}
        <em className="italic">&ldquo;Ready&rdquo;</em>… Yet
      </>
    ),
    subline:
      "A boutique portrait and editorial studio for people ready to see themselves the way the world already does.",
    ctaLabel: "Inquire Today",
    ctaHref: "#contact",
    imageSrc: "/images/hero.jpg",
    imageAlt:
      "Portrait photography session — editorial light, intimate moment captured by a real photographer",
  },
  bookingCTA: {
    headline: (
      <>
        Spots Are Filling Fast for{" "}
        <em className="italic">Spring &amp; Summer 2026</em>
      </>
    ),
    body: "I take on a limited number of portrait sessions each month to ensure every client gets my full attention. Once the calendar fills, it fills. Don't wait and wonder — reach out today to hold your date.",
  },
};
