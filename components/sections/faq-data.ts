/**
 * Shared FAQ data — extracted from FAQSection.tsx so it can be imported
 * by Server Components (route handlers like /llms.txt) without crossing
 * the "use client" boundary, which serializes named exports.
 */

export interface FAQ {
  q: string;
  a: string;
}

export const DEFAULT_FAQS: FAQ[] = [
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
