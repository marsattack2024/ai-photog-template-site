import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib/seo";
import { SEAHero } from "./SEAHero";

/* ── Below-fold: deferred until hero paints ── */
const SEASocialProof = dynamic(() =>
  import("./SEASocialProof").then((m) => ({ default: m.SEASocialProof }))
);
const SEATestimonialCards = dynamic(() =>
  import("./SEATestimonialCards").then((m) => ({
    default: m.SEATestimonialCards,
  }))
);
const SEAImageQuote = dynamic(() =>
  import("./SEAImageQuote").then((m) => ({ default: m.SEAImageQuote }))
);
const SEAEmpathy = dynamic(() =>
  import("./SEAEmpathy").then((m) => ({ default: m.SEAEmpathy }))
);
const SEAProcess = dynamic(() =>
  import("./SEAProcess").then((m) => ({ default: m.SEAProcess }))
);
const SEAGallery = dynamic(() =>
  import("./SEAGallery").then((m) => ({ default: m.SEAGallery }))
);
const SEAScenes = dynamic(() =>
  import("./SEAScenes").then((m) => ({ default: m.SEAScenes }))
);
const SEAIncludes = dynamic(() =>
  import("./SEAIncludes").then((m) => ({ default: m.SEAIncludes }))
);
const SEAMeetMolly = dynamic(() =>
  import("./SEAMeetMolly").then((m) => ({ default: m.SEAMeetMolly }))
);
const SEATestimonialsCarousel = dynamic(() =>
  import("./SEATestimonialsCarousel").then((m) => ({
    default: m.SEATestimonialsCarousel,
  }))
);
const SEAFAQ = dynamic(() =>
  import("./SEAFAQ").then((m) => ({ default: m.SEAFAQ }))
);
const SEAContact = dynamic(() =>
  import("./SEAContact").then((m) => ({ default: m.SEAContact }))
);

export const metadata: Metadata = buildPageMetadata({
  title:
    "Seattle Boudoir & Co. | Luxury Boudoir Photography — Downtown Seattle, WA",
  description:
    "Seattle's premier luxury boudoir studio. Solo, couples, bridal & erotica sessions. Professional hair, makeup, curated wardrobe, expert posing, same-week reveal. All bodies and all loves welcome. Book with Molly Blair today.",
  path: "/seattle-boudoir",
});

/* ── Seattle Boudoir brand palette — moody PNW luxe ── */
const seaTokens = {
  "--color-ink": "#141619",
  "--color-cream": "#F4ECE2",
  "--color-accent": "#B79268",
  "--color-accent-text": "#8C6B49",
  "--color-muted": "#7A726B",
  "--color-border": "#E4DAD0",
} as React.CSSProperties;

export default function SeattleBoudoirPage() {
  return (
    <div style={seaTokens}>
      {/* 1. Hero */}
      <SEAHero />

      {/* 2. Social proof strip */}
      <SEASocialProof />

      {/* 3. First testimonial batch — 6 cards */}
      <SEATestimonialCards />

      {/* 4. Quote banner #1 */}
      <SEAImageQuote
        src="/seattle/sbc-15.webp"
        alt="Luxury boudoir portrait at Seattle Boudoir & Co downtown Seattle"
        quote="I had been talking about doing this for three years. I wish I had stopped talking and just booked. I walked out of that studio feeling like a completely different person."
        attribution="Solo Session Client"
        objectPosition="center 30%"
      />

      {/* 5. Empathy letter from Molly */}
      <SEAEmpathy />

      {/* 6. How it works */}
      <SEAProcess />

      {/* 7. Quote banner #2 */}
      <SEAImageQuote
        src="/seattle/sbc-16.webp"
        alt="Intimate emotional boudoir photography by Molly Blair Seattle"
        quote="I cried at the viewing. Not because the photos were sad — because for the first time in my life I saw myself the way the people who love me have always seen me."
        attribution="Empowerment Session Client"
        objectPosition="center 25%"
      />

      {/* 8. Gallery */}
      <SEAGallery />

      {/* 9. Quote banner #3 — break between gallery and scenes */}
      <SEAImageQuote
        src="/seattle/sls-9.webp"
        alt="Editorial boudoir photography session at Seattle Boudoir & Co"
        quote="She made me feel like the main character of my own life. I didn't have to figure out a single thing. Molly directed every angle, every expression. I just showed up."
        attribution="Bridal Boudoir Client"
        objectPosition="center 35%"
        align="right"
      />

      {/* 10. Sessions / scenes */}
      <SEAScenes />

      {/* 11. What's included */}
      <SEAIncludes />

      {/* 12. Meet Molly */}
      <SEAMeetMolly />

      {/* 13. Quote banner #4 — break before testimonials */}
      <SEAImageQuote
        src="/seattle/sls-13.webp"
        alt="Luxury boudoir experience at Seattle Boudoir & Co Washington"
        quote="I almost cancelled three times. I am so glad I didn't. This was the most seen and celebrated I have ever felt. Every person deserves this."
        attribution="Milestone Session Client"
        objectPosition="center 30%"
      />

      {/* 14. Second testimonial batch — dark */}
      <SEATestimonialsCarousel />

      {/* 15. Contact form */}
      <SEAContact />

      {/* 16. FAQ */}
      <SEAFAQ />

      {/* 17. Final CTA */}
      <section className="bg-(--color-ink) py-20 px-6 text-center">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          <h2 className="font-serif text-3xl font-normal text-(--color-cream) leading-tight md:text-4xl">
            The person in these photos{" "}
            <em className="italic">is already you.</em>
          </h2>
          <p className="text-sm text-(--color-muted) leading-relaxed">
            You don&apos;t have to lose a pound. You don&apos;t have to wait
            for a special occasion. You don&apos;t have to feel ready. You
            just have to decide. Molly will handle everything after that.
          </p>
          <div className="flex justify-center pt-2">
            <a
              href="#book"
              className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-(--color-accent) text-(--color-cream) px-10 py-4 hover:opacity-90 transition-opacity duration-300"
            >
              Claim $400 Off — Book Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer rendered globally by app/(site)/layout.tsx
          (Seattle Boudoir's branded footer with phone + location lives in the
          forked repo's siteConfig; the template repo shows the default footer.) */}
    </div>
  );
}
