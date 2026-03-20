import { StickyBar } from "@/components/layout/StickyBar";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SocialProofStrip } from "@/components/sections/SocialProofStrip";
import { EmpathyBlock } from "@/components/sections/EmpathyBlock";
import { MeetPhotographer } from "@/components/sections/MeetPhotographer";
import { WhyBook } from "@/components/sections/WhyBook";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { IncludesGrid } from "@/components/sections/IncludesGrid";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { TestimonialsGrid } from "@/components/sections/TestimonialsGrid";
import { UrgencyBlock } from "@/components/sections/UrgencyBlock";
import { ContactForm } from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <StickyBar />
      <Navbar brandName="[Studio Name]" />

      <Hero
        headline="Photography for the People Who Think They're Not Photogenic"
        subline="Fully guided portrait sessions for real people — no experience, no confidence required. Just show up."
        ctaLabel="Inquire Today"
        ctaHref="#contact"
        imageSrc="https://placehold.co/1920x1080/d4c5b2/6b5e4e?text=Hero+Image"
        imageAlt="Portrait photography session"
      />

      <SocialProofStrip />

      <EmpathyBlock />

      <MeetPhotographer />

      <WhyBook />

      <ProcessSteps />

      <IncludesGrid />

      <GalleryGrid />

      <TestimonialsGrid />

      <UrgencyBlock />

      <ContactForm />

      {/* Footer */}
      <footer className="bg-(--color-ink) py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-xl tracking-widest text-(--color-cream)">
            [Studio Name]
          </p>
          <p className="text-xs text-(--color-muted) tracking-widest uppercase">
            &copy; {new Date().getFullYear()} [Studio Name]. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-(--color-muted) hover:text-(--color-cream) uppercase tracking-widest transition-colors">Instagram</a>
            <a href="#" className="text-xs text-(--color-muted) hover:text-(--color-cream) uppercase tracking-widest transition-colors">Pinterest</a>
          </div>
        </div>
      </footer>
    </>
  );
}
