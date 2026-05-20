// lib/schema.ts
import { siteConfig } from "@/lib/site.config";

/** LocalBusiness schema — drives Google rich result on homepage.
 *  Defaults flow from siteConfig (single source of truth). Pass overrides
 *  at the call site only when a page needs to vary from the defaults. */
export function buildLocalBusinessSchema(overrides?: {
  phone?: string;
  city?: string;
  state?: string;
  priceRange?: string;
  description?: string;
}) {
  const url = siteConfig.seo.baseUrl;
  const phone = overrides?.phone ?? siteConfig.brand.phone;
  const city = overrides?.city ?? siteConfig.brand.location?.city;
  const state = overrides?.state ?? siteConfig.brand.location?.state;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name: siteConfig.brand.name,
    url,
    description: overrides?.description ?? siteConfig.seo.description,
    // Next's OG route serves /opengraph-image as a real image — pointing at
    // a static /og-default.jpg that doesn't exist would break the rich result.
    image: `${url}/opengraph-image`,
    ...(phone && { telephone: phone }),
    ...(city && {
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressRegion: state ?? "",
        addressCountry: "US",
      },
    }),
    priceRange: overrides?.priceRange ?? "$",
  };
}

/** FAQPage schema — enables Google FAQ rich result.
 *  WARNING: `faqs` strings are serialized into an inline <script> via
 *  JsonLd.tsx. If callers ever wire FAQ content from Supabase/user input,
 *  sanitize at the boundary first (lib/sanitize.ts). */
export function buildFAQSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** Person schema — for the photographer. Wire on the homepage near the
 *  MeetPhotographer section or on /about when that route lands. */
export function buildPersonSchema(opts: {
  name: string;
  jobTitle?: string;
  image?: string;
  sameAs?: string[];
  bio?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    ...(opts.jobTitle && { jobTitle: opts.jobTitle }),
    ...(opts.image && { image: opts.image }),
    ...(opts.bio && { description: opts.bio }),
    ...(opts.sameAs && opts.sameAs.length > 0 && { sameAs: opts.sameAs }),
    worksFor: {
      "@type": "Organization",
      name: siteConfig.brand.name,
      url: siteConfig.seo.baseUrl,
    },
  };
}
