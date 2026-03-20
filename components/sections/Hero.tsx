"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroProps {
  eyebrow?: string;
  headline: string;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

export function Hero({ eyebrow, headline, subline, ctaLabel, ctaHref, imageSrc, imageAlt }: HeroProps) {
  return (
    <section className="relative w-full min-h-[95vh] flex items-end overflow-hidden">
      {/* Background image — subject sits right-center */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-[65%_center]"
        unoptimized
      />

      {/* Left-to-right gradient — text side dark, photo side clear */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
      {/* Bottom vignette for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Text block — bottom-left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl flex flex-col gap-5"
        >
          {eyebrow && (
            <span className="text-xs uppercase tracking-[0.25em] text-white/60 font-medium">
              {eyebrow}
            </span>
          )}

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] text-white">
            {headline}
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-white/75 max-w-sm">
            {subline}
          </p>

          <div className="pt-2">
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium border border-white/40 text-white px-8 py-4 hover:bg-white hover:text-(--color-ink) transition-colors duration-300"
            >
              {ctaLabel}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
