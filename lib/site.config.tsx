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

export interface SiteAnalytics {
  /**
   * Google Tag Manager container ID (GTM-XXXXXXX). When set, the layout
   * renders <GoogleTagManager /> from @next/third-parties.
   * Falls back to env var NEXT_PUBLIC_GTM_ID at runtime.
   */
  gtmId?: string;
  /**
   * Google Analytics 4 measurement ID (G-XXXXXXXXXX). Most setups should
   * use GTM instead and load GA from there — only set this if you're
   * loading GA4 directly without GTM.
   * Falls back to env var NEXT_PUBLIC_GA_ID at runtime.
   */
  gaId?: string;
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
  /**
   * Secondary footer links (Privacy, Terms, Sitemap, etc.). Omit or pass an
   * empty array to hide the "Quick Links" column entirely.
   */
  footerLinks?: SiteSocial[];
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
  /**
   * Optional analytics IDs. Both fall back to env vars at runtime
   * (NEXT_PUBLIC_GTM_ID / NEXT_PUBLIC_GA_ID) so you can rotate per
   * environment without redeploying code.
   */
  analytics?: SiteAnalytics;
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "[Studio Name]",
    tagline:
      "Editorial portrait photography for the people who keep putting themselves last.",
    phone: "(555) 000-0000",
    email: "hello@yourdomain.com",
    location: {
      city: "[City]",
      state: "[ST]",
    },
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
  footerLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Sitemap", href: "/sitemap.xml" },
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
    imageSrc: "/placeholder/hero.svg",
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
  analytics: {
    // Leave undefined to fall back to env vars. Set explicit IDs here if you
    // want them committed to the repo (most clients don't — env is safer).
  },
  images: {
    portrait: {
      src: "/placeholder/portrait.svg",
      alt: "Photographer portrait",
    },
    // ImageQuote breakers are opt-in. Add up to 3 entries to weave evocative
    // pull-quotes between cream sections. The homepage renders each slot
    // conditionally, so an empty array simply omits them.
    //
    // RHYTHM NOTE: the homepage already has dark sections at Hero, SocialProofStrip,
    // MeetPhotographer(dark variant), TestimonialsCarousel, UrgencyBlock, and
    // BookingUrgencyCTA. ImageQuotes also render dark (image + heavy overlay),
    // so use them sparingly — adding all 3 stacks the dark count. Pattern that
    // reads best: 2 imageQuotes (slots 0 and 1), skip slot 2.
    //
    // IMAGE SELECTION: pick editorial-quality photos with a clear focal area
    // OUT of the text path (`position` lets you nudge — `"center 30%"` pulls the
    // subject up so the centered overlay text doesn't land on a face). Avoid:
    // - busy backgrounds that fight the quote
    // - subjects with masks/sunglasses (face is the emotional anchor)
    // - tight crops that look bad at 100vw width
    //
    // Example:
    //   { src: "/images/portrait-01.webp", alt: "...", quote: "...",
    //     attribution: "Portrait Session Client", align: "left",
    //     position: "center 30%" },
    imageQuotes: [],
  },
};
