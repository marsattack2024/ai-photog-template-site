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
    <section className="relative w-full min-h-[95vh] flex items-end overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_15%]"
      />

      {/* Left-to-right gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

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
