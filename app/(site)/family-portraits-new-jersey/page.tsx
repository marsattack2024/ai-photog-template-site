import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { buildPageMetadata } from "@/lib/seo";
import { buildFAQSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

/* ── Below-fold: deferred until after hero paints ── */
const FamilySocialProof = dynamic(() =>
  import("./FamilySocialProof").then((m) => ({ default: m.FamilySocialProof }))
);
const FamilyTestimonialCards = dynamic(() =>
  import("./FamilyTestimonialCards").then((m) => ({ default: m.FamilyTestimonialCards }))
);
const FamilyProcess = dynamic(() =>
  import("./FamilyProcess").then((m) => ({ default: m.FamilyProcess }))
);
const FamilyEmpathy = dynamic(() =>
  import("./FamilyEmpathy").then((m) => ({ default: m.FamilyEmpathy }))
);
const FamilySplitSection = dynamic(() =>
  import("./FamilySplitSection").then((m) => ({ default: m.FamilySplitSection }))
);
const FamilyWhyBook = dynamic(() =>
  import("./FamilyWhyBook").then((m) => ({ default: m.FamilyWhyBook }))
);
const FamilyIncludes = dynamic(() =>
  import("./FamilyIncludes").then((m) => ({ default: m.FamilyIncludes }))
);
const FamilyGallery = dynamic(() =>
  import("./FamilyGallery").then((m) => ({ default: m.FamilyGallery }))
);
const FamilyTestimonialsCarousel = dynamic(() =>
  import("./FamilyTestimonialsCarousel").then((m) => ({ default: m.FamilyTestimonialsCarousel }))
);
const FamilyUrgency = dynamic(() =>
  import("./FamilyUrgency").then((m) => ({ default: m.FamilyUrgency }))
);
const FamilyContact = dynamic(() =>
  import("./FamilyContact").then((m) => ({ default: m.FamilyContact }))
);
const FamilyFAQ = dynamic(() =>
  import("./FamilyFAQ").then((m) => ({ default: m.FamilyFAQ }))
);

/* ── SEO ── */
const familyFaqs = [
  { q: "What ages work best for family sessions?", a: "Every age is the right age. We photograph families with newborns, toddlers, teens, adult children, and grandparents. The session is adapted to each family's dynamic \u2014 no age is too young or too old." },
  { q: "What if my kids won't cooperate?", a: "They never do, and that's completely fine. We build in time for kids to warm up, move around, and be themselves. Some of the best images come from the unscripted moments. We never force smiles \u2014 we earn them." },
  { q: "What should we wear?", a: "You'll receive a detailed wardrobe guide after booking. The short version: coordinate, don't match. Soft neutrals, earth tones, and muted colors photograph beautifully. Avoid logos, neon, and busy patterns." },
  { q: "How long is a family session?", a: "About 60 to 90 minutes, depending on the size of your family and the number of groupings. That gives us time for full family, couples, individual kids, grandparents, and sibling shots without anyone feeling rushed." },
  { q: "Can we include grandparents or extended family?", a: "Absolutely. Multi-generational portraits are some of the most meaningful images we create. We'll plan the session flow so everyone gets their moment \u2014 and the big group shot looks effortless." },
  { q: "Where do sessions take place?", a: "We're based in Montclair, New Jersey with a private studio. We also offer outdoor sessions at select NJ locations \u2014 parks, beaches, and urban backdrops. We'll help you choose the best setting for your family." },
  { q: "When will we see our photos?", a: "Your private gallery is delivered within two weeks. You'll view your images at a reveal appointment and choose only the ones you love. Nothing is shared or printed without your approval." },
  { q: "How do we book?", a: "Fill out the contact form below and tell us a little about your family. You'll hear back personally within 24 hours \u2014 no bots, no pressure. Just a real conversation about what this session could look like." },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Family Portrait Photography in New Jersey | [Studio Name]",
  description:
    "Professional family portrait photography in Montclair, NJ. Guided sessions for families of every size \u2014 from newborns to grandparents. Relaxed, natural, and beautifully lit.",
  path: "/family-portraits-new-jersey",
});

export default function FamilyPortraitsPage() {
  return (
    <>
      <JsonLd data={buildFAQSchema(familyFaqs)} />

      {/* 1. Hero */}
      <Hero
        eyebrow="Family Portraits &mdash; Montclair, New Jersey"
        headline="Real Life. Real Love. Beautifully Remembered."
        subline="Guided, relaxed family portrait sessions in New Jersey. No forced smiles. No stiff poses. Just your people, captured the way you actually are together."
        ctaLabel="Book Our Family Session"
        ctaHref="#contact"
        imageSrc="/images/family/family-hero.jpg"
        imageAlt="Family portrait photography session in New Jersey"
      />

      {/* 2. Social proof */}
      <FamilySocialProof />

      {/* 3. Featured testimonials */}
      <FamilyTestimonialCards />

      {/* 4. How it works */}
      <FamilyProcess />

      {/* 5. Empathy */}
      <FamilyEmpathy />

      {/* 6. Split — generations */}
      <FamilySplitSection />

      {/* 7. Why book */}
      <FamilyWhyBook />

      {/* 8. What's included */}
      <FamilyIncludes />

      {/* 9. Gallery */}
      <FamilyGallery />

      {/* 10. Testimonials carousel */}
      <FamilyTestimonialsCarousel />

      {/* 11. Urgency */}
      <FamilyUrgency />

      {/* 12. Contact form */}
      <FamilyContact />

      {/* 13. FAQ */}
      <FamilyFAQ />

      {/* 14. Final CTA */}
      <section className="bg-(--color-ink) py-20 px-6 text-center">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          <h2 className="font-serif text-3xl font-normal text-(--color-cream) leading-tight md:text-4xl">
            They Won&apos;t Be This Age Forever.{" "}
            <em className="italic">But These Photos Will Be.</em>
          </h2>
          <p className="text-sm text-(--color-muted) leading-relaxed">
            Every year the kids get taller, the grandparents get grayer, and the dog
            gets slower. You can&apos;t pause time &mdash; but you can hold onto how it looked.
            Reach out today.
          </p>
          <div className="flex justify-center pt-2">
            <a
              href="#contact"
              className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium border border-white/30 text-(--color-cream) px-8 py-3 hover:bg-white/10 transition-colors duration-300"
            >
              Book Our Family Session
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-(--color-ink) py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-serif text-2xl tracking-[0.2em] text-(--color-cream)">
            [Studio Name]
          </p>
          <p className="text-xs text-(--color-muted) tracking-widest uppercase text-center">
            &copy; {new Date().getFullYear()} [Studio Name] Photography. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Instagram", "Pinterest", "TikTok"].map((s) => (
              <a key={s} href="#" className="text-xs text-(--color-muted) hover:text-(--color-cream) uppercase tracking-widest transition-colors duration-300">
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
