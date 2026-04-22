import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { buildPageMetadata } from "@/lib/seo";
import { buildFAQSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

/* ── Below-fold: deferred until after hero paints ── */
const UnderwaterSocialProof = dynamic(() =>
  import("./UnderwaterSocialProof").then((m) => ({ default: m.UnderwaterSocialProof }))
);
const UnderwaterTestimonialCards = dynamic(() =>
  import("./UnderwaterTestimonialCards").then((m) => ({ default: m.UnderwaterTestimonialCards }))
);
const UnderwaterProcess = dynamic(() =>
  import("./UnderwaterProcess").then((m) => ({ default: m.UnderwaterProcess }))
);
const UnderwaterEmpathy = dynamic(() =>
  import("./UnderwaterEmpathy").then((m) => ({ default: m.UnderwaterEmpathy }))
);
const UnderwaterWhyBook = dynamic(() =>
  import("./UnderwaterWhyBook").then((m) => ({ default: m.UnderwaterWhyBook }))
);
const UnderwaterIncludes = dynamic(() =>
  import("./UnderwaterIncludes").then((m) => ({ default: m.UnderwaterIncludes }))
);
const UnderwaterGallery = dynamic(() =>
  import("./UnderwaterGallery").then((m) => ({ default: m.UnderwaterGallery }))
);
const UnderwaterTestimonialsCarousel = dynamic(() =>
  import("./UnderwaterTestimonialsCarousel").then((m) => ({ default: m.UnderwaterTestimonialsCarousel }))
);
const UnderwaterUrgency = dynamic(() =>
  import("./UnderwaterUrgency").then((m) => ({ default: m.UnderwaterUrgency }))
);
const UnderwaterContact = dynamic(() =>
  import("./UnderwaterContact").then((m) => ({ default: m.UnderwaterContact }))
);
const UnderwaterFAQ = dynamic(() =>
  import("./UnderwaterFAQ").then((m) => ({ default: m.UnderwaterFAQ }))
);
const UnderwaterSplit = dynamic(() =>
  import("./UnderwaterSplit").then((m) => ({ default: m.UnderwaterSplit }))
);
const UnderwaterMeetJennifer = dynamic(() =>
  import("./UnderwaterMeetJennifer").then((m) => ({ default: m.UnderwaterMeetJennifer }))
);
const UnderwaterImageQuote = dynamic(() =>
  import("./UnderwaterImageQuote").then((m) => ({ default: m.UnderwaterImageQuote }))
);
const UnderwaterWhoItsFor = dynamic(() =>
  import("./UnderwaterWhoItsFor").then((m) => ({ default: m.UnderwaterWhoItsFor }))
);

/* ── SEO ── */
const underwaterFaqs = [
  { q: "Do I need to be a good swimmer?", a: "Not at all. You need to be comfortable standing in chest-to-shoulder-depth water and able to hold your breath for 10 to 15 seconds. Jennifer works with non-swimmers, nervous swimmers, and everyone in between." },
  { q: "Can I keep my eyes closed underwater?", a: "Many of the most beautiful underwater portraits are shot with eyes closed. If you're comfortable opening your eyes, we'll try both. Closed eyes can create an even more ethereal, dreamy look." },
  { q: "What about my hair and makeup?", a: "Waterproof mascara and minimal eye makeup work best. Underwater, even fine hair becomes full, flowing, and dramatic. Jennifer helps you position so the water does all the styling work." },
  { q: "How long do I have to hold my breath?", a: "Most shots require 10 to 15 seconds of submersion. Between each shot you surface, breathe normally, and go again when ready. The pace is entirely yours — Jennifer never rushes." },
  { q: "What if I panic underwater?", a: "Every session includes a dry-land rehearsal before you get wet. You'll practice the movements, the breath, and the entry so nothing is a surprise. Jennifer is certified in water safety and remains underwater with you throughout." },
  { q: "What should I wear?", a: "Jennifer provides flowing gowns, mermaid tails, floral arrangements, and fabric pieces in a range of sizes. You're welcome to bring your own swimsuit or outfit. A full wardrobe guide is sent after booking." },
  { q: "Where does the session take place?", a: "Sessions are at select crystal-clear freshwater locations in and around St. Augustine, Florida. Indoor heated pool options are also available." },
  { q: "When will I see my photos?", a: "Your private gallery is delivered within 2 to 3 weeks. Fully edited, high-resolution images ready for printing at any size." },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Underwater Portrait Photography in St. Augustine, FL | Jennifer Lynn James",
  description:
    "Ethereal, fully-guided underwater portrait sessions in St. Augustine, Florida. No swimming experience required. Mermaid, boudoir, and portrait sessions with Jennifer Lynn James.",
  path: "/underwater-photography-st-augustine",
});

export default function UnderwaterPhotographyPage() {
  return (
    <>
      <JsonLd data={buildFAQSchema(underwaterFaqs)} />

      {/* 1. Hero */}
      <Hero
        eyebrow="Underwater Portraits — St. Augustine, Florida"
        headline={"You\u2019ve Seen the Photos.\nNow It\u2019s Your Turn to Be In One."}
        subline="Fully guided underwater portrait sessions in St. Augustine, FL. No swimming experience needed. No held-breath panic. Just you, the water, and images that look like they came from another world."
        ctaLabel="Book My Underwater Session"
        ctaHref="#contact"
        imageSrc="/images/underwater/gallery-10.webp"
        imageAlt="Underwater portrait photography session in St. Augustine Florida crystal springs"
      />

      {/* 2. Social proof strip */}
      <UnderwaterSocialProof />

      {/* 3. Testimonial cards */}
      <UnderwaterTestimonialCards />

      {/* 4. Quote banner — lands between reviews and Jennifer's letter */}
      <UnderwaterImageQuote
        src="/images/underwater/gallery-06.webp"
        alt="Underwater portrait in natural Florida springs"
        quote="I drove four hours for this session and I would drive eight next time. The water, the light, the way Jennifer directs you — it's a completely different experience from any photography I've ever done."
        attribution="Out-of-State Client — Destination Session"
        objectPosition="center 30%"
      />

      {/* 5. How it works */}
      <UnderwaterProcess />

      {/* 6. St. Augustine split */}
      <UnderwaterSplit />

      {/* 7. Why book */}
      <UnderwaterWhyBook />

      {/* 8. Who it's for */}
      <UnderwaterWhoItsFor />

      {/* 9. Quote banner — dark break before gallery */}
      <UnderwaterImageQuote
        src="/images/underwater/empathy-section.webp"
        alt="Mermaid underwater portrait in Florida natural springs"
        quote="The session itself was therapeutic in a way I didn't anticipate. Something about the silence underwater, the trust required, the total surrender to the moment — I came out changed. The photos are stunning, but what the experience did to me is what I keep talking about."
        attribution="Session Client — Full-Day Underwater Portrait"
        objectPosition="center 40%"
      />

      {/* 10. Gallery — cream break between the two dark sections */}
      <UnderwaterGallery />

      {/* 11. What's included — dark section, now separated from quote banner by gallery */}
      <UnderwaterIncludes />

      {/* 12. Jennifer's personal letter */}
      <UnderwaterEmpathy />

      {/* 13. Meet Jennifer */}
      <UnderwaterMeetJennifer />

      {/* 11. Testimonials carousel — 3-card dark */}
      <UnderwaterTestimonialsCarousel />

      {/* 12. Urgency */}
      <UnderwaterUrgency />

      {/* 13. Contact form */}
      <UnderwaterContact />

      {/* 14. FAQ */}
      <UnderwaterFAQ />

      {/* 15. Final CTA */}
      <section className="bg-(--color-ink) py-20 px-6 text-center">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          <h2 className="font-serif text-3xl font-normal text-(--color-cream) leading-tight md:text-4xl">
            The Water Is Ready.{" "}
            <em className="italic">Are You?</em>
          </h2>
          <p className="text-sm text-(--color-muted) leading-relaxed">
            You don&apos;t need to be fearless. You don&apos;t need to be a swimmer. You just need to
            say yes to one experience that will change the way you see yourself — permanently.
            Jennifer is waiting to make it happen.
          </p>
          <div className="flex justify-center pt-2">
            <a
              href="#contact"
              className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium border border-white/30 text-(--color-cream) px-8 py-3 hover:bg-white/10 transition-colors duration-300"
            >
              Book My Underwater Session
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-(--color-ink) py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-serif text-2xl tracking-[0.2em] text-(--color-cream)">
            Jennifer Lynn James
          </p>
          <p className="text-xs text-(--color-muted) tracking-widest uppercase text-center">
            &copy; {new Date().getFullYear()} Jennifer Lynn James Photography. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Instagram", "Pinterest", "Facebook"].map((s) => (
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
