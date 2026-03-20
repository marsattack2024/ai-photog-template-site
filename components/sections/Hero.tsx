import Image from "next/image";

interface HeroProps {
  headline: string;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

export function Hero({ headline, subline, ctaLabel, ctaHref, imageSrc, imageAlt }: HeroProps) {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        unoptimized
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col gap-6">
        <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight text-white">
          {headline}
        </h1>
        <p className="text-sm md:text-base leading-relaxed text-white/80 max-w-xl mx-auto">
          {subline}
        </p>
        <div>
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-white text-(--color-ink) px-8 py-4 hover:bg-(--color-accent) hover:text-white transition-colors duration-300"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
