"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { Button } from "@/components/ui";

interface HeroProps {
  headline: string;
  subline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  videoSrc?: string;
  imageSrc: string;
  imageAlt: string;
}

export function Hero({
  headline,
  subline,
  ctaLabel = "Get in Touch",
  ctaHref = "#contact",
  videoSrc,
  imageSrc,
  imageAlt,
}: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background media */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y }}>
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
        )}
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          <h1 className="font-serif text-5xl font-normal leading-tight text-white md:text-7xl">
            {headline}
          </h1>
          {subline && (
            <p className="max-w-md text-base text-white/80 md:text-lg">{subline}</p>
          )}
          {ctaLabel && (
            <a href={ctaHref}>
              <Button variant="ghost" size="lg">
                {ctaLabel}
              </Button>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
