// lib/schema.ts
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio Name";

/** LocalBusiness schema — drives Google rich result on homepage */
export function buildLocalBusinessSchema(overrides?: {
  phone?: string;
  city?: string;
  state?: string;
  priceRange?: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_URL,
    name: SITE_NAME,
    url: SITE_URL,
    description: overrides?.description ?? process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    image: `${SITE_URL}/og-default.jpg`,
    ...(overrides?.phone && { telephone: overrides.phone }),
    ...(overrides?.city && {
      address: {
        "@type": "PostalAddress",
        addressLocality: overrides.city,
        addressRegion: overrides.state ?? "",
        addressCountry: "US",
      },
    }),
    priceRange: overrides?.priceRange ?? "$",
  };
}

/** FAQPage schema — enables Google FAQ rich result */
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
