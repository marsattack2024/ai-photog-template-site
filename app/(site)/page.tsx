import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { SocialProofStrip } from "@/components/sections/SocialProofStrip";
import { ImageQuote } from "@/components/sections/ImageQuote";
import { BookingUrgencyCTA } from "@/components/sections/BookingUrgencyCTA";
import { buildPageMetadata } from "@/lib/seo";
import { buildLocalBusinessSchema, buildFAQSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site.config";
import { faqs } from "@/lib/content.config";

// Below-fold: deferred until after hero paints
const EmpathyBlock = dynamic(() =>
  import("@/components/sections/EmpathyBlock").then((m) => ({ default: m.EmpathyBlock }))
);
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
      <JsonLd data={buildFAQSchema(faqs)} />

      {/* 1. Hero — static import, server component, LCP paints before hydration */}
      <Hero {...siteConfig.hero} />

      {/* 2. Social proof strip — static import, above fold on most screens */}
      <SocialProofStrip />

      {/* Below-fold — all dynamically imported */}
      {/* 3. Empathy intro (cream) — breaks the Hero+SocialProof dark double
             and lands the emotional argument before the testimonial proof */}
      <EmpathyBlock />

      {/* 4. Featured testimonial cards (cream) */}
      <TestimonialCards />

      {/* 4. Breaker — image quote (cream → image → cream) */}
      {siteConfig.images.imageQuotes[0] && (
        <ImageQuote
          src={siteConfig.images.imageQuotes[0].src}
          alt={siteConfig.images.imageQuotes[0].alt}
          quote={siteConfig.images.imageQuotes[0].quote}
          attribution={siteConfig.images.imageQuotes[0].attribution}
          objectPosition={siteConfig.images.imageQuotes[0].position}
          align={siteConfig.images.imageQuotes[0].align}
        />
      )}

      {/* 5. How it works (cream) */}
      <ProcessSteps />

      {/* 6. Meet the photographer (DARK — inversion to create rhythm) */}
      <MeetPhotographer variant="dark" />

      {/* 7. Why people book (cream) */}
      <WhyBook />

      {/* 8. What's included (cream) */}
      <IncludesGrid />

      {/* 9. Breaker — image quote (cream → image → cream) */}
      {siteConfig.images.imageQuotes[1] && (
        <ImageQuote
          src={siteConfig.images.imageQuotes[1].src}
          alt={siteConfig.images.imageQuotes[1].alt}
          quote={siteConfig.images.imageQuotes[1].quote}
          attribution={siteConfig.images.imageQuotes[1].attribution}
          objectPosition={siteConfig.images.imageQuotes[1].position}
          align={siteConfig.images.imageQuotes[1].align}
        />
      )}

      {/* 10. Gallery (cream) */}
      <GalleryGrid />

      {/* 11. Testimonials carousel — 3-card dark */}
      <TestimonialsCarousel />

      {/* 12. Urgency (accent color) */}
      <UrgencyBlock />

      {/* 13. Contact form (cream) */}
      <ContactForm />

      {/* 14. Breaker — image quote (cream → image → cream) */}
      {siteConfig.images.imageQuotes[2] && (
        <ImageQuote
          src={siteConfig.images.imageQuotes[2].src}
          alt={siteConfig.images.imageQuotes[2].alt}
          quote={siteConfig.images.imageQuotes[2].quote}
          attribution={siteConfig.images.imageQuotes[2].attribution}
          objectPosition={siteConfig.images.imageQuotes[2].position}
          align={siteConfig.images.imageQuotes[2].align}
        />
      )}

      {/* 15. FAQ (cream) */}
      <FAQSection />

      {/* 16. Booking urgency CTA — compact dark scarcity strip */}
      {siteConfig.bookingCTA && <BookingUrgencyCTA {...siteConfig.bookingCTA} />}

      {/* Footer rendered globally by app/(site)/layout.tsx */}
    </>
  );
}
