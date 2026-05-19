import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { SocialProofStrip } from "@/components/sections/SocialProofStrip";
import { ImageQuote } from "@/components/sections/ImageQuote";
import { BookingUrgencyCTA } from "@/components/sections/BookingUrgencyCTA";
import { Footer } from "@/components/layout/Footer";
import { buildPageMetadata } from "@/lib/seo";
import { buildLocalBusinessSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

// Below-fold: deferred until after hero paints
const TestimonialCards = dynamic(() =>
  import("@/components/sections/TestimonialCards").then((m) => ({ default: m.TestimonialCards }))
);
const ProcessSteps = dynamic(() =>
  import("@/components/sections/ProcessSteps").then((m) => ({ default: m.ProcessSteps }))
);
const MeetPhotographer = dynamic(() =>
  import("@/components/sections/MeetPhotographer").then((m) => ({ default: m.MeetPhotographer }))
);
const WhyBook = dynamic(() =>
  import("@/components/sections/WhyBook").then((m) => ({ default: m.WhyBook }))
);
const IncludesGrid = dynamic(() =>
  import("@/components/sections/IncludesGrid").then((m) => ({ default: m.IncludesGrid }))
);
const GalleryGrid = dynamic(() =>
  import("@/components/sections/GalleryGrid").then((m) => ({ default: m.GalleryGrid }))
);
const TestimonialsCarousel = dynamic(() =>
  import("@/components/sections/TestimonialsCarousel").then((m) => ({ default: m.TestimonialsCarousel }))
);
const UrgencyBlock = dynamic(() =>
  import("@/components/sections/UrgencyBlock").then((m) => ({ default: m.UrgencyBlock }))
);
const ContactForm = dynamic(() =>
  import("@/components/sections/ContactForm").then((m) => ({ default: m.ContactForm }))
);
const FAQSection = dynamic(() =>
  import("@/components/sections/FAQSection").then((m) => ({ default: m.FAQSection }))
);

export const metadata: Metadata = buildPageMetadata({
  title: process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio Name",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />

      {/* 1. Hero — static import, server component, LCP paints before hydration */}
      <Hero
        eyebrow="New Jersey Boudoir Photography"
        headline={'Boudoir, For The Woman Who Doesn\u2019t Feel \u201cReady\u201d\u2026 Yet'}
        subline="A boutique boudoir studio in Montclair, NJ for women ready to uplift, reclaim, and celebrate their body exactly as it is."
        ctaLabel="Inquire Today"
        ctaHref="#contact"
        imageSrc="/images/hero.jpg"
        imageAlt="Boudoir photography session"
      />

      {/* 2. Social proof strip — static import, above fold on most screens */}
      <SocialProofStrip />

      {/* Below-fold — all dynamically imported */}
      {/* 3. Featured testimonial cards (cream) */}
      <TestimonialCards />

      {/* 4. Breaker — image quote between two cream sections */}
      <ImageQuote
        src="/images/underwater/empathy-section.webp"
        alt="Editorial portrait session — intimate moment captured by a real photographer"
        quote="I almost cancelled three different times. I'm so glad I didn't. Walking out of that session I felt like a completely different person."
        attribution="Portrait Session Client"
        objectPosition="center 30%"
      />

      {/* 5. How it works (cream) */}
      <ProcessSteps />

      {/* 6. Meet the photographer (DARK — inversion to create rhythm) */}
      <MeetPhotographer variant="dark" />

      {/* 7. Why people book (cream) */}
      <WhyBook />

      {/* 8. What's included (cream) */}
      <IncludesGrid />

      {/* 9. Breaker — image quote between two cream sections */}
      <ImageQuote
        src="/images/family/family-cta-bg.jpg"
        alt="Family session — three generations laughing together in natural light"
        quote="She made me feel like I belonged in front of the camera. Every shot looks like me on my best day."
        attribution="Family Session Client"
        objectPosition="center 35%"
        align="right"
      />

      {/* 10. Gallery (cream) */}
      <GalleryGrid />

      {/* 11. Testimonials carousel — 3-card dark */}
      <TestimonialsCarousel />

      {/* 12. Urgency (accent color) */}
      <UrgencyBlock />

      {/* 13. Contact form (cream) */}
      <ContactForm />

      {/* 14. Breaker — image quote between two cream sections */}
      <ImageQuote
        src="/images/underwater/jennifer-portrait.jpg"
        alt="Close-up portrait — quiet moment, soft natural light"
        quote="I cried at the viewing. Not because they were sad — because for the first time I saw myself the way the people who love me see me."
        attribution="Portrait Session Client"
        objectPosition="center 25%"
        align="left"
      />

      {/* 15. FAQ (cream) */}
      <FAQSection />

      {/* 16. Booking urgency CTA — compact dark scarcity strip */}
      <BookingUrgencyCTA
        headline={
          <>
            Spots Are Filling Fast for{" "}
            <em className="italic">Spring &amp; Summer 2026</em>
          </>
        }
        body="I take on a limited number of portrait sessions each month to ensure every client gets my full attention. Once the calendar fills, it fills. Don't wait and wonder — reach out today to hold your date."
      />

      {/* 17. Footer */}
      <Footer studioName="[Studio Name]" />
    </>
  );
}
