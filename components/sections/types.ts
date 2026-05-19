/**
 * Shared section content types — extracted so lib/content.config.ts and
 * server-component routes (llms.txt, /md/[slug]) can import without
 * crossing the "use client" boundary of components that consume them.
 */

export interface FAQ {
  q: string;
  a: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  body: string;
}

export interface WhyBookReason {
  title: string;
  body: string;
}

export interface FeaturedTestimonial {
  quote: string;
  name: string;
  detail: string;
  stars?: number;
  /** Optional headshot — defaults to /placeholder/square.svg. */
  photoSrc?: string;
}

export interface CarouselTestimonial {
  quote: string;
  name: string;
  detail: string;
}
