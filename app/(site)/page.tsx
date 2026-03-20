import { StickyBar } from "@/components/layout/StickyBar";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TestimonialCards } from "@/components/sections/TestimonialCards";
import { SocialProofStrip } from "@/components/sections/SocialProofStrip";
import { EmpathyBlock } from "@/components/sections/EmpathyBlock";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { MeetPhotographer } from "@/components/sections/MeetPhotographer";
import { WhyBook } from "@/components/sections/WhyBook";
import { IncludesGrid } from "@/components/sections/IncludesGrid";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { UrgencyBlock } from "@/components/sections/UrgencyBlock";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQSection } from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <>
      <StickyBar />
      <Navbar brandName="[Studio Name]" />

      {/* 1. Hero */}
      <Hero
        headline="[Your Headline Here]"
        subline="[One line about what you do and who it's for.]"
        ctaLabel="Inquire Today"
        ctaHref="#contact"
        imageSrc="/placeholder/hero.svg"
        imageAlt="Photography session"
      />

      {/* 2. Early social proof — 3 review cards */}
      <TestimonialCards />

      {/* 3. Single pull quote strip */}
      <SocialProofStrip />

      {/* 4. Empathy / "if you've been putting this off" */}
      <EmpathyBlock />

      {/* 5. How it works — replaces session types */}
      <ProcessSteps />

      {/* 6. Meet the photographer */}
      <MeetPhotographer />

      {/* 7. Why people book — dark section */}
      <WhyBook />

      {/* 8. What's included */}
      <IncludesGrid />

      {/* 9. Gallery */}
      <GalleryGrid />

      {/* 10. Testimonials carousel */}
      <TestimonialsCarousel />

      {/* 11. Urgency — closing argument */}
      <UrgencyBlock />

      {/* 12. Contact form — above FAQ */}
      <ContactForm />

      {/* 13. FAQ */}
      <FAQSection />

      {/* 14. Booking urgency — below FAQ */}
      <section className="bg-(--color-ink) py-20 px-6 text-center">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          <h2 className="font-serif text-3xl font-normal text-(--color-cream) leading-tight md:text-4xl">
            Spots Are Filling Fast for{" "}
            <em className="italic">Spring &amp; Summer 2026</em>
          </h2>
          <p className="text-sm text-(--color-muted) leading-relaxed">
            I take on a limited number of portrait sessions each month to ensure every client gets my full attention. Once the calendar fills, it fills. Don&apos;t wait and wonder — reach out today to hold your date.
          </p>
          <div className="flex justify-center pt-2">
            <a
              href="#contact"
              className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium border border-white/30 text-(--color-cream) px-8 py-3 hover:bg-white/10 transition-colors duration-300"
            >
              Inquire Today
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
