import { StickyBar } from "@/components/layout/StickyBar";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SocialProofStrip } from "@/components/sections/SocialProofStrip";
import { EmpathyBlock } from "@/components/sections/EmpathyBlock";
import { SplitSection } from "@/components/sections/SplitSection";
import { MeetPhotographer } from "@/components/sections/MeetPhotographer";
import { WhyBook } from "@/components/sections/WhyBook";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { TestimonialsGrid } from "@/components/sections/TestimonialsGrid";
import { IncludesGrid } from "@/components/sections/IncludesGrid";
import { UrgencyBlock } from "@/components/sections/UrgencyBlock";
import { ContactForm } from "@/components/sections/ContactForm";

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
        imageSrc="https://placehold.co/1920x1080/d4c5b2/ffffff?text="
        imageAlt="Photography session"
      />

      {/* 2. Early social proof */}
      <SocialProofStrip />

      {/* 3. Centered intro / empathy */}
      <EmpathyBlock />

      {/* 4. Session type A — image left, text right */}
      <SplitSection
        imageSrc="https://placehold.co/900x1100/c8b9a8/ffffff?text="
        imageAlt="Portrait session"
        eyebrow="Portraits & Headshots"
        headline="[Session Type One]"
        body="[Two to three sentences describing this session type. Who is it for? What does it feel like? What will they walk away with?]"
        ctaLabel="Learn More"
        ctaHref="#contact"
      />

      {/* 5. Session type B — text left, image right */}
      <SplitSection
        imageSrc="https://placehold.co/900x1100/d4c5b2/ffffff?text="
        imageAlt="Couples session"
        eyebrow="Couples & Families"
        headline="[Session Type Two]"
        body="[Two to three sentences describing this session type. Who is it for? What does it feel like? What will they walk away with?]"
        ctaLabel="Learn More"
        ctaHref="#contact"
        reverse
      />

      {/* 6. Meet the photographer */}
      <MeetPhotographer />

      {/* 7. Why people book — dark section */}
      <WhyBook />

      {/* 8. Process */}
      <ProcessSteps />

      {/* 9. What's included */}
      <IncludesGrid />

      {/* 10. Gallery */}
      <GalleryGrid />

      {/* 11. Testimonials */}
      <TestimonialsGrid />

      {/* 12. Urgency / closing argument */}
      <UrgencyBlock />

      {/* 13. Contact form */}
      <ContactForm />

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
