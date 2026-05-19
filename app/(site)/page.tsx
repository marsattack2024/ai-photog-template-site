import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { SocialProofStrip } from "@/components/sections/SocialProofStrip";
import { ImageQuote } from "@/components/sections/ImageQuote";
import { BookingUrgencyCTA } from "@/components/sections/BookingUrgencyCTA";
import { buildPageMetadata } from "@/lib/seo";
import { buildLocalBusinessSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site.config";

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
  title: siteConfig.brand.name,
  description: siteConfig.seo.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />

      {/* 1. Hero — static import, server component, LCP paints before hydration */}
      <Hero {...siteConfig.hero} />

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
      {siteConfig.bookingCTA && <BookingUrgencyCTA {...siteConfig.bookingCTA} />}

      {/* Footer rendered globally by app/(site)/layout.tsx */}
    </>
  );
}
