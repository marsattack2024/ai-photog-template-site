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

export interface SiteAnnouncement {
  /** Short text — keep under ~60 chars. */
  text: string;
  /** Optional inline link. */
  ctaLabel?: string;
  ctaHref?: string;
}

export interface SiteImage {
  src: string;
  alt: string;
  /** Optional CSS object-position (e.g. "center 25%"). */
  position?: string;
}

export interface SiteImageQuote extends SiteImage {
  quote: string;
  attribution?: string;
  /** Horizontal alignment of the quote within the image. */
  align?: "left" | "center" | "right";
}

export interface SiteImages {
  /** Bio portrait — used by MeetPhotographer when no override is passed. */
  portrait: SiteImage;
  /** Image-quote breakers — sprinkled between cream sections for rhythm. */
  imageQuotes: SiteImageQuote[];
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
  /** Optional thin top bar (scarcity / launch / seasonal). Omit to hide entirely. */
  announcement?: SiteAnnouncement;
  hero: SiteHero;
  bookingCTA?: SiteBookingCTA;
  /**
   * Canonical asset registry. Sections that don't take their own image
   * props pull from here. Hero image lives on `hero.imageSrc` (it's part
   * of hero copy, not a reusable asset).
   */
  images: SiteImages;
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
    // OG image is auto-generated from brand name + tagline by app/opengraph-image.tsx
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
  announcement: {
    text: "Limited spots available for 2026",
    ctaLabel: "Inquire today",
    ctaHref: "#contact",
  },
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
  images: {
    portrait: {
      src: "/placeholder/portrait.svg",
      alt: "Photographer portrait",
    },
    imageQuotes: [
      {
        src: "/images/underwater/empathy-section.webp",
        alt: "Editorial portrait session — intimate moment captured by a real photographer",
        position: "center 30%",
        quote:
          "I almost cancelled three different times. I'm so glad I didn't. Walking out of that session I felt like a completely different person.",
        attribution: "Portrait Session Client",
        align: "left",
      },
      {
        src: "/images/family/family-cta-bg.jpg",
        alt: "Family session — three generations laughing together in natural light",
        position: "center 35%",
        quote:
          "She made me feel like I belonged in front of the camera. Every shot looks like me on my best day.",
        attribution: "Family Session Client",
        align: "right",
      },
      {
        src: "/images/underwater/jennifer-portrait.jpg",
        alt: "Close-up portrait — quiet moment, soft natural light",
        position: "center 25%",
        quote:
          "I cried at the viewing. Not because they were sad — because for the first time I saw myself the way the people who love me see me.",
        attribution: "Portrait Session Client",
        align: "left",
      },
    ],
  },
};
