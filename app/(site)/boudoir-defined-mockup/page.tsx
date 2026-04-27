import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib/seo";
import { BDHero } from "./BDHero";

/* ── Below-fold: deferred until hero paints ── */
const BDSocialProof = dynamic(() =>
  import("./BDSocialProof").then((m) => ({ default: m.BDSocialProof }))
);
const BDTestimonialCards = dynamic(() =>
  import("./BDTestimonialCards").then((m) => ({ default: m.BDTestimonialCards }))
);
const BDImageQuote = dynamic(() =>
  import("./BDImageQuote").then((m) => ({ default: m.BDImageQuote }))
);
const BDEmpathy = dynamic(() =>
  import("./BDEmpathy").then((m) => ({ default: m.BDEmpathy }))
);
const BDProcess = dynamic(() =>
  import("./BDProcess").then((m) => ({ default: m.BDProcess }))
);
const BDGallery = dynamic(() =>
  import("./BDGallery").then((m) => ({ default: m.BDGallery }))
);
const BDIncludes = dynamic(() =>
  import("./BDIncludes").then((m) => ({ default: m.BDIncludes }))
);
const BDMeetCyndee = dynamic(() =>
  import("./BDMeetCyndee").then((m) => ({ default: m.BDMeetCyndee }))
);
const BDTestimonialsCarousel = dynamic(() =>
  import("./BDTestimonialsCarousel").then((m) => ({ default: m.BDTestimonialsCarousel }))
);
const BDProductCarousel = dynamic(() =>
  import("./BDProductCarousel").then((m) => ({ default: m.BDProductCarousel }))
);
const BDFAQ = dynamic(() =>
  import("./BDFAQ").then((m) => ({ default: m.BDFAQ }))
);
const BDContact = dynamic(() =>
  import("./BDContact").then((m) => ({ default: m.BDContact }))
);

export const metadata: Metadata = buildPageMetadata({
  title: "Boudoir Defined | Luxury Boudoir Studio — Meridian, Idaho",
  description:
    "Boise's premier luxury boudoir photography studio. Professional hair, makeup, wardrobe included. 200+ women transformed. Same-day image reveal. Book your free consultation with Cyndee.",
  path: "/boudoir-defined-mockup",
});

/* ── Boudoir Defined brand palette ── */
const bdTokens = {
  "--color-ink": "#3D2B3A",
  "--color-cream": "#FFF9F5",
  "--color-accent": "#C4966A",
  "--color-accent-text": "#9B6240",
  "--color-muted": "#9B8297",
  "--color-border": "#E8DFE5",
} as React.CSSProperties;

export default function BoudoirDefinedMockupPage() {
  return (
    <div style={bdTokens}>
      {/* 1. Hero */}
      <BDHero />

      {/* 2. Social proof strip */}
      <BDSocialProof />

      {/* 3. First testimonial batch — 6 cards */}
      <BDTestimonialCards />

      {/* 4. Quote banner #1 */}
      <BDImageQuote
        src="https://www.boudoirdefined.com/wp-content/uploads/2023/01/Parker_Z-114-1024x688.jpg"
        alt="Luxury boudoir portrait by Boudoir Defined in Meridian Idaho"
        quote="I kept making excuses for years. My body isn't ready. The timing isn't right. I'm not the type. None of that was true. I walked out of that studio a completely different woman."
        attribution="Kayla R. — Verified Google Review"
        objectPosition="center 30%"
      />

      {/* 5. Empathy letter from Cyndee */}
      <BDEmpathy />

      {/* 6. How it works (4 steps) */}
      <BDProcess />

      {/* 7. Quote banner #2 */}
      <BDImageQuote
        src="https://www.boudoirdefined.com/wp-content/uploads/2025/10/230406_JosieBatz_080-1024x688.jpg"
        alt="Empowerment boudoir session at Boudoir Defined Meridian Idaho"
        quote="I wept in the chair during my image reveal. Not because the photos were sad — because for the first time in my life I saw myself the way the people who love me have always seen me."
        attribution="Danielle F. — Empowerment Session"
        objectPosition="center 25%"
      />

      {/* 8. Gallery */}
      <BDGallery />

      {/* 9. Product carousel — albums, prints, wall art */}
      <BDProductCarousel />

      {/* 10. What's included */}
      <BDIncludes />

      {/* 11. Meet Cyndee */}
      <BDMeetCyndee />

      {/* 12. Second testimonial batch — 6 more */}
      <BDTestimonialsCarousel />

      {/* 13. FAQ */}
      <BDFAQ />

      {/* 14. Contact form */}
      <BDContact />

      {/* 14. Final CTA */}
      <section className="bg-(--color-ink) py-20 px-6 text-center">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          <h2 className="font-serif text-3xl font-normal text-(--color-cream) leading-tight md:text-4xl">
            The woman in these photos{" "}
            <em className="italic">is you.</em>
          </h2>
          <p className="text-sm text-(--color-muted) leading-relaxed">
            You don&apos;t have to lose a pound. You don&apos;t have to wait for a
            special occasion. You don&apos;t have to be ready. You just have to
            make the call. Cyndee will handle everything after that.
          </p>
          <div className="flex justify-center pt-2">
            <a
              href="#book"
              className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-(--color-accent) text-(--color-cream) px-10 py-4 hover:opacity-90 transition-opacity duration-300"
            >
              Book My Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-(--color-ink) border-t border-white/8 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="font-serif text-2xl tracking-[0.15em] text-(--color-cream)">
              Boudoir Defined
            </p>
            <p className="text-xs text-(--color-muted) tracking-widest">
              Meridian, Idaho &middot; 208-877-3779
            </p>
          </div>
          <p className="text-xs text-(--color-muted) tracking-widest uppercase text-center">
            &copy; {new Date().getFullYear()} Boudoir Defined. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Instagram", "Facebook", "YouTube"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs text-(--color-muted) hover:text-(--color-cream) uppercase tracking-widest transition-colors duration-300"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
