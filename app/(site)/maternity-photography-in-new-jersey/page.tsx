import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { buildPageMetadata } from "@/lib/seo";
import { buildFAQSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

/* ── Below-fold: deferred until after hero paints ── */
const MaternitySocialProof = dynamic(() =>
  import("./MaternitySocialProof").then((m) => ({ default: m.MaternitySocialProof }))
);
const MaternityTestimonialCards = dynamic(() =>
  import("./MaternityTestimonialCards").then((m) => ({ default: m.MaternityTestimonialCards }))
);
const MaternityProcess = dynamic(() =>
  import("./MaternityProcess").then((m) => ({ default: m.MaternityProcess }))
);
const MaternityEmpathy = dynamic(() =>
  import("./MaternityEmpathy").then((m) => ({ default: m.MaternityEmpathy }))
);
const MaternityWhyBook = dynamic(() =>
  import("./MaternityWhyBook").then((m) => ({ default: m.MaternityWhyBook }))
);
const MaternityIncludes = dynamic(() =>
  import("./MaternityIncludes").then((m) => ({ default: m.MaternityIncludes }))
);
const MaternityGallery = dynamic(() =>
  import("./MaternityGallery").then((m) => ({ default: m.MaternityGallery }))
);
const MaternityTestimonialsCarousel = dynamic(() =>
  import("./MaternityTestimonialsCarousel").then((m) => ({ default: m.MaternityTestimonialsCarousel }))
);
const MaternityUrgency = dynamic(() =>
  import("./MaternityUrgency").then((m) => ({ default: m.MaternityUrgency }))
);
const MaternityContact = dynamic(() =>
  import("./MaternityContact").then((m) => ({ default: m.MaternityContact }))
);
const MaternityFAQ = dynamic(() =>
  import("./MaternityFAQ").then((m) => ({ default: m.MaternityFAQ }))
);

/* ── SEO ── */
const maternityFaqs = [
  { q: "When is the best time to schedule a maternity session?", a: "Between 28 and 36 weeks is ideal. Your bump is beautifully round, you still feel comfortable enough to move and pose, and the timing gives us flexibility if baby decides to arrive early." },
  { q: "I don\u2019t feel beautiful right now. Is this still for me?", a: "Especially for you. Most of our maternity clients say the same thing before their session. Pregnancy changes your body in ways that can feel unfamiliar. This experience is designed to show you how stunning you actually are right now \u2014 not despite the changes, but because of them." },
  { q: "What should I wear?", a: "You\u2019ll get a full style guide after booking. We have a studio wardrobe of flowing gowns, bodysuits, and draped fabrics sized for expectant mothers. Most clients wear two to three looks. Bring anything sentimental \u2014 baby shoes, a partner\u2019s shirt, ultrasound prints." },
  { q: "Can my partner or other children be in the photos?", a: "Of course. Many sessions include a few partner shots or sibling moments. We\u2019ll plan the flow so the session still feels intimate and unhurried, even with little ones in the mix." },
  { q: "How long is a maternity session?", a: "About 90 minutes to two hours. That gives us time for outfit changes, different setups, and a relaxed pace. You\u2019ll never feel rushed, and there\u2019s always time to sit down and rest." },
  { q: "Is boudoir maternity too revealing for me?", a: "You decide what you\u2019re comfortable with. Some mamas go full skin, some stay in a gown the entire time. We talk through everything beforehand so there are zero surprises. The point is to feel powerful, not exposed." },
  { q: "When do I see my photos?", a: "Your private gallery is typically delivered within two weeks. You\u2019ll view your images at a reveal appointment and choose only the ones you love. Nothing is shared publicly without your permission." },
  { q: "Where is the studio located?", a: "We\u2019re based in Montclair, New Jersey \u2014 easily accessible from across North Jersey, the NYC metro area, and the surrounding suburbs. We also offer outdoor sessions at select NJ locations." },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Maternity Boudoir Photography in New Jersey | [Studio Name]",
  description:
    "Intimate, empowering maternity boudoir photography in Montclair, NJ. Celebrate your pregnancy with guided, luxurious sessions designed for expecting mothers across New Jersey.",
  path: "/maternity-photography-in-new-jersey",
});

export default function MaternityPage() {
  return (
    <>
      <JsonLd data={buildFAQSchema(maternityFaqs)} />

      {/* 1. Hero — same component, maternity copy */}
      <Hero
        eyebrow="Maternity Boudoir — Montclair, New Jersey"
        headline={"You\u2019re Growing a Human. You Deserve Photos That Feel Like It."}
        subline="Intimate, guided maternity boudoir sessions for expecting mothers in New Jersey. No posing experience needed. Just you, your bump, and the most beautiful version of this chapter."
        ctaLabel="Book My Maternity Session"
        ctaHref="#contact"
        imageSrc="/images/maternity-hero.jpg"
        imageAlt="Maternity boudoir photography session in New Jersey studio"
      />

      {/* 2. Social proof strip */}
      <MaternitySocialProof />

      {/* 3. Featured testimonial carousel */}
      <MaternityTestimonialCards />

      {/* 4. How it works */}
      <MaternityProcess />

      {/* 5. Empathy / objection handling */}
      <MaternityEmpathy />

      {/* 6. Why book */}
      <MaternityWhyBook />

      {/* 7. What's included */}
      <MaternityIncludes />

      {/* 8. Gallery */}
      <MaternityGallery />

      {/* 9. Testimonials carousel — 3-card dark */}
      <MaternityTestimonialsCarousel />

      {/* 10. Urgency */}
      <MaternityUrgency />

      {/* 11. Contact form */}
      <MaternityContact />

      {/* 12. FAQ */}
      <MaternityFAQ />

      {/* 13. Final CTA */}
      <section className="bg-(--color-ink) py-20 px-6 text-center">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          <h2 className="font-serif text-3xl font-normal text-(--color-cream) leading-tight md:text-4xl">
            This Chapter Doesn&apos;t Last Forever.{" "}
            <em className="italic">But These Photos Will.</em>
          </h2>
          <p className="text-sm text-(--color-muted) leading-relaxed">
            You&apos;re only pregnant with this baby once. Don&apos;t let the weeks slip by wishing
            you&apos;d done something just for yourself. Reach out today — no commitment, no pressure.
          </p>
          <div className="flex justify-center pt-2">
            <a
              href="#contact"
              className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium border border-white/30 text-(--color-cream) px-8 py-3 hover:bg-white/10 transition-colors duration-300"
            >
              Book My Maternity Session
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
