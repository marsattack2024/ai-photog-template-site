"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { slideLeft, slideRight } from "@/lib/motion";
import { Button } from "@/components/ui";

interface SplitSectionProps {
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  headline: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  reverse?: boolean;
}

export function SplitSection({
  imageSrc,
  imageAlt,
  eyebrow,
  headline,
  body,
  ctaLabel,
  ctaHref = "#",
  reverse = false,
}: SplitSectionProps) {
  const imageVariant = reverse ? slideRight : slideLeft;
  const textVariant = reverse ? slideLeft : slideRight;

  return (
    <section className="grid md:grid-cols-2 min-h-[600px]">
      {/* Image */}
      <motion.div
        variants={imageVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`relative min-h-[400px] md:min-h-full ${reverse ? "md:order-2" : ""}`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Text */}
      <motion.div
        variants={textVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`flex flex-col justify-center gap-6 px-10 py-16 md:px-16 bg-(--color-cream) ${
          reverse ? "md:order-1" : ""
        }`}
      >
        {eyebrow && (
          <span className="text-xs uppercase tracking-[0.2em] text-(--color-muted)">
            {eyebrow}
          </span>
        )}
        <h2 className="font-serif text-4xl font-normal leading-tight text-(--color-ink) md:text-5xl">
          {headline}
        </h2>
        <p className="text-sm leading-relaxed text-(--color-muted) max-w-sm">{body}</p>
        {ctaLabel && (
          <div>
            <a href={ctaHref}>
              <Button variant="ghost">{ctaLabel}</Button>
            </a>
          </div>
        )}
      </motion.div>
    </section>
  );
}
