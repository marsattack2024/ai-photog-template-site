import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib/seo";
import { SBHero } from "./SBHero";

/* ── Below-fold: deferred until hero paints ── */
const SBSocialProof = dynamic(() =>
  import("./SBSocialProof").then((m) => ({ default: m.SBSocialProof }))
);
const SBTestimonialCards = dynamic(() =>
  import("./SBTestimonialCards").then((m) => ({ default: m.SBTestimonialCards }))
);
const SBImageQuote = dynamic(() =>
  import("./SBImageQuote").then((m) => ({ default: m.SBImageQuote }))
);
const SBEmpathy = dynamic(() =>
  import("./SBEmpathy").then((m) => ({ default: m.SBEmpathy }))
);
const SBProcess = dynamic(() =>
  import("./SBProcess").then((m) => ({ default: m.SBProcess }))
);
const SBGallery = dynamic(() =>
  import("./SBGallery").then((m) => ({ default: m.SBGallery }))
);
const SBScenes = dynamic(() =>
  import("./SBScenes").then((m) => ({ default: m.SBScenes }))
);
const SBIncludes = dynamic(() =>
  import("./SBIncludes").then((m) => ({ default: m.SBIncludes }))
);
const SBMeetSeydi = dynamic(() =>
  import("./SBMeetSeydi").then((m) => ({ default: m.SBMeetSeydi }))
);
const SBTestimonialsCarousel = dynamic(() =>
  import("./SBTestimonialsCarousel").then((m) => ({
    default: m.SBTestimonialsCarousel,
  }))
);
const SBFAQ = dynamic(() =>
  import("./SBFAQ").then((m) => ({ default: m.SBFAQ }))
);
const SBContact = dynamic(() =>
  import("./SBContact").then((m) => ({ default: m.SBContact }))
);

export const metadata: Metadata = buildPageMetadata({
  title:
    "Empower & Sparkle Boudoir | Luxury Boudoir Photography — Fredericksburg, VA",
  description:
    "Northern Virginia's most transformative luxury boudoir experience. 20+ years internationally published. Professional hair, makeup, 1,000+ wardrobe pieces, 10+ cinematic sets, same-day reveal. Book with Seydi today.",
  path: "/sparkle-boudoir",
});

/* ── Sparkle Boudoir brand palette ── */
const sbTokens = {
  "--color-ink": "#1A1118",
  "--color-cream": "#FFF8F5",
  "--color-accent": "#C4956C",
  "--color-accent-text": "#A0714A",
  "--color-muted": "#8A7583",
  "--color-border": "#E8DDE3",
} as React.CSSProperties;

export default function SparkleBoudoirPage() {
  return (
    <div style={sbTokens}>
      {/* 1. Hero */}
      <SBHero />

      {/* 2. Social proof strip */}
      <SBSocialProof />

      {/* 3. First testimonial batch — 6 cards */}
      <SBTestimonialCards />

      {/* 4. Quote banner #1 */}
      <SBImageQuote
        src="/sparkle/quote1.jpg"
        alt="Luxury boudoir portrait at Empower & Sparkle Boudoir in Fredericksburg Virginia"
        quote="I kept making excuses for years. I'm not ready. I'm not the right size. I'm not the type. None of that was true. I walked out of that studio feeling like a completely different woman."
        attribution="Empowerment Session Client"
        objectPosition="center 30%"
      />

      {/* 5. Empathy letter from Seydi */}
      <SBEmpathy />

      {/* 6. How it works (4 steps) */}
      <SBProcess />

      {/* 7. Quote banner #2 */}
      <SBImageQuote
        src="/sparkle/quote2.jpg"
        alt="Cinematic boudoir photography at Sparkle Boudoir studio"
        quote="I wept during the same-day reveal. Not because the photos were sad — because for the first time in my life, I saw myself the way the people who love me have always seen me."
        attribution="Self-Love Session Client"
        objectPosition="center 25%"
      />

      {/* 8. Gallery */}
      <SBGallery />

      {/* 9. Quote banner #3 — break between gallery and scenes */}
      <SBImageQuote
        src="/sparkle/quote3.jpg"
        alt="Boudoir empowerment photography at Empower & Sparkle Boudoir"
        quote="She made me feel like a goddess. I didn't have to figure out a single thing — Seydi handled every pose, every angle, every detail. I just showed up and sparkled."
        attribution="Rain Room Session Client"
        objectPosition="center 35%"
        align="right"
      />

      {/* 10. Scene sets — wings, rain room, smoke, etc. */}
      <SBScenes />

      {/* 11. What's included */}
      <SBIncludes />

      {/* 12. Meet Seydi */}
      <SBMeetSeydi />

      {/* 13. Quote banner #4 — break before testimonials */}
      <SBImageQuote
        src="/sparkle/quote4.jpg"
        alt="Luxury boudoir experience at Sparkle Boudoir Fredericksburg VA"
        quote="I almost cancelled three times. I am so glad I didn't. This was the most seen and celebrated I have ever felt in my life. Every woman deserves this."
        attribution="Milestone Session Client"
        objectPosition="center 30%"
      />

      {/* 14. Second testimonial batch — dark */}
      <SBTestimonialsCarousel />

      {/* 15. Contact form — above FAQ */}
      <SBContact />

      {/* 16. FAQ */}
      <SBFAQ />

      {/* 17. Final CTA */}
      <section className="bg-(--color-ink) py-20 px-6 text-center">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          <h2 className="font-serif text-3xl font-normal text-(--color-cream) leading-tight md:text-4xl">
            The woman in these photos{" "}
            <em className="italic">is you.</em>
          </h2>
          <p className="text-sm text-(--color-muted) leading-relaxed">
            You don&apos;t have to lose a pound. You don&apos;t have to wait for
            a special occasion. You don&apos;t have to be ready. You just have
            to dare to sparkle. Seydi will handle everything after that.
          </p>
          <div className="flex justify-center pt-2">
            <a
              href="#book"
              className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-(--color-accent) text-(--color-cream) px-10 py-4 hover:opacity-90 transition-opacity duration-300"
            >
              Book My Sparkle Experience
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-(--color-ink) border-t border-white/8 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="font-serif text-2xl tracking-[0.15em] text-(--color-cream)">
              Empower &amp; Sparkle
            </p>
            <p className="text-xs text-(--color-muted) tracking-widest">
              Fredericksburg, Virginia &middot; 540-300-0159
            </p>
          </div>
          <p className="text-xs text-(--color-muted) tracking-widest uppercase text-center">
            &copy; {new Date().getFullYear()} Empower &amp; Sparkle Boudoir. All
            rights reserved.
          </p>
          <div className="flex gap-8">
            {["Instagram", "Facebook", "TikTok", "YouTube"].map((s) => (
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
