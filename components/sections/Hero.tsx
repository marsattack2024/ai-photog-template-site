import Image from "next/image";
import { HeroOverlay } from "./HeroOverlay";

interface HeroProps {
  eyebrow?: string;
  headline: React.ReactNode;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

export function Hero({ eyebrow, headline, subline, ctaLabel, ctaHref, imageSrc, imageAlt }: HeroProps) {
  return (
    <section className="relative w-full min-h-[var(--min-h-hero)] flex items-end overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_15%] md:object-[62%_15%]"
      />

      {/* Desktop: left-to-right gradient — darkness sits behind left-aligned text */}
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
      {/* Mobile: bottom-up gradient — darkness sits behind centered text at the bottom */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
      {/* Bottom vignette (both viewports, stronger on mobile already covered above) */}
      <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Client component handles motion entrance animation */}
      <HeroOverlay
        eyebrow={eyebrow}
        headline={headline}
        subline={subline}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
      />
    </section>
  );
}
