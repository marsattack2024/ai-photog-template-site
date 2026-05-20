/**
 * SECTION CONTENT — single source of truth for all template page content.
 *
 * Forking workflow:
 *   - Brand identity, hero copy, socials, booking CTA → lib/site.config.tsx
 *   - Section content (FAQs, process, testimonials, etc.) → this file
 *   - Images → siteConfig.images (also in site.config)
 *   - Theme colors → app/globals.css (--primitive-* block) or per-page override
 *
 * Section components import these arrays as their defaults. Override
 * per-render by passing props to the section.
 */

import type {
  FAQ,
  ProcessStep,
  WhyBookReason,
  FeaturedTestimonial,
  CarouselTestimonial,
  GalleryImage,
} from "@/components/sections/types";

// ── FAQs ──────────────────────────────────────────────────────────────
export const faqs: FAQ[] = [
  {
    q: "Do I need experience in front of a camera?",
    a: "Not at all. Most clients have never done a session like this before. Every pose, every expression, every angle is guided — you simply follow along. By the end, most people forget they were ever nervous.",
  },
  {
    q: "What should I wear?",
    a: "You'll receive a full wardrobe guide after booking that covers what works for different body types, what to avoid, and how to prepare. There's also an in-studio accessory closet available during your session.",
  },
  {
    q: "How long does a session take?",
    a: "Sessions are typically two hours. This gives us enough time to settle in, work through multiple looks, and make sure you never feel rushed. The consultation before and gallery reveal after are scheduled separately.",
  },
  {
    q: "When will I see my photos?",
    a: "Your gallery reveal is typically scheduled within a few weeks of your session. You'll see your edited images for the first time at a private reveal appointment, and you only choose what you love.",
  },
  {
    q: "Is this experience right for me?",
    a: "If you've been thinking about doing something just for yourself — whether it's a gift, a milestone, a confidence reset, or simply because you're tired of waiting for the right time — then yes. This experience was made for you.",
  },
  {
    q: "How do I book?",
    a: "Fill out the contact form below and you'll hear back personally within 24 hours. There's no pressure — it's just a conversation to answer your questions and help you figure out if this feels right.",
  },
];

// ── Process steps ─────────────────────────────────────────────────────
export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Reach Out",
    body: "Fill out the contact form. You'll hear back personally within 24 hours — no automated responses, no pressure. Just a real conversation about what you're looking for.",
  },
  {
    number: "02",
    title: "We Plan Together",
    body: "Once you book, you'll get everything you need to prepare — what to wear, what to expect, how to get ready. You will never walk in blind or figure it out alone.",
  },
  {
    number: "03",
    title: "Show Up & Be You",
    body: "Every pose, every angle, every expression is guided. Your only job is to show up. The rest is handled. Most people forget they were nervous within the first few minutes.",
  },
];

// ── What's included ───────────────────────────────────────────────────
export const includesItems: string[] = [
  "Pre-session style consultation",
  "Full posing direction throughout",
  "Location scouting & recommendations",
  "1–2 hour session",
  "50+ fully edited images",
  "Private online gallery",
  "High-resolution digital downloads",
  "Unlimited personal print rights",
  "5-business-day turnaround",
];

// ── Why book ──────────────────────────────────────────────────────────
export const whyBookReasons: WhyBookReason[] = [
  {
    title: "Fully Guided Sessions",
    body: "No awkward silences or blank stares. I direct every pose so you always know what to do.",
  },
  {
    title: "Style Consultation Included",
    body: "Before your session, we'll talk outfits, locations, and vision so nothing is left to chance.",
  },
  {
    title: "Same-Week Gallery Delivery",
    body: "Your edited gallery arrives within 5 business days — not months.",
  },
  {
    title: "Unlimited Print Rights",
    body: "Print wherever, whenever. Your images are yours to keep forever.",
  },
  {
    title: "Natural Light Expertise",
    body: "Every session is timed and located to maximize the most flattering light for your skin tone.",
  },
  {
    title: "100% Satisfaction Guarantee",
    body: "If you're not in love with your gallery, I'll reshoot — no questions asked.",
  },
];

// ── Featured testimonials (large carousel — 1 visible at a time) ──────
export const featuredTestimonials: FeaturedTestimonial[] = [
  {
    quote:
      "I walked in nervous and walked out feeling like a completely different person. The experience was thoughtful, guided, and honestly one of the best things I've done for myself. I cried when I saw my images. It was that good.",
    name: "[Client Name]",
    detail: "Portrait Session",
    stars: 5,
  },
  {
    quote:
      "From the first message to the final gallery, everything felt personal and easy. I didn't have to figure anything out — it was all handled. The photos took my breath away.",
    name: "[Client Name]",
    detail: "Couples Session",
    stars: 5,
  },
  {
    quote:
      "I kept putting this off for years. I finally said yes and I cannot believe I waited so long. Every woman deserves to feel this way about herself.",
    name: "[Client Name]",
    detail: "Portrait Session",
    stars: 5,
  },
  {
    quote:
      "She made me feel completely at ease from the moment I walked in. I went in thinking I wasn't photogenic. I left knowing that was never true.",
    name: "[Client Name]",
    detail: "Milestone Session",
    stars: 5,
  },
  {
    quote:
      "I turned 50 and wanted to finally do something just for me. This was it. The most seen and celebrated I have ever felt in my life.",
    name: "[Client Name]",
    detail: "Milestone Session",
    stars: 5,
  },
];

// ── Gallery images (2-col masonry; per-item heights are intentional rhythm) ──
export const galleryImages: GalleryImage[] = [
  // Left column
  { src: "/placeholder/portrait.svg", alt: "Session photo", h: "h-[480px]" },
  { src: "/placeholder/landscape.svg", alt: "Session photo", h: "h-[300px]" },
  { src: "/placeholder/portrait.svg", alt: "Session photo", h: "h-[540px]" },
  { src: "/placeholder/landscape.svg", alt: "Session photo", h: "h-[280px]" },
  // Right column
  { src: "/placeholder/landscape.svg", alt: "Session photo", h: "h-[260px]" },
  { src: "/placeholder/portrait.svg", alt: "Session photo", h: "h-[510px]" },
  { src: "/placeholder/landscape.svg", alt: "Session photo", h: "h-[260px]" },
  { src: "/placeholder/portrait.svg", alt: "Session photo", h: "h-[480px]" },
];

// ── Carousel testimonials (3-up dark variant) ─────────────────────────
export const carouselTestimonials: CarouselTestimonial[] = [
  {
    quote:
      "Words truly cannot describe how incredible this experience was. I walked in nervous and walked out feeling like myself again — only better.",
    name: "[Client Name]",
    detail: "Portrait Session",
  },
  {
    quote:
      "From the first message to the final gallery delivery, everything was thoughtful, personal, and completely exceeded my expectations.",
    name: "[Client Name]",
    detail: "Couples Session",
  },
  {
    quote:
      "I've been putting this off for years. I finally said yes and I cannot believe I waited so long. This is the best thing I've done for myself.",
    name: "[Client Name]",
    detail: "Portrait Session",
  },
  {
    quote:
      "She guided me through everything. I never once felt unsure of what to do. The whole experience felt like it was designed just for me.",
    name: "[Client Name]",
    detail: "Portrait Session",
  },
  {
    quote:
      "I turned 50 and wanted a way to celebrate myself for once. This was it. I cannot recommend this enough to every woman who keeps putting herself last.",
    name: "[Client Name]",
    detail: "Milestone Session",
  },
  {
    quote:
      "I almost cancelled three times. I am so glad I didn't. This was the most I have ever felt like myself in a photograph.",
    name: "[Client Name]",
    detail: "Portrait Session",
  },
];
