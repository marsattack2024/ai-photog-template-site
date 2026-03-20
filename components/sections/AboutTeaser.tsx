"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { stagger, fadeIn, slideRight } from "@/lib/motion";
import { Button } from "@/components/ui";

interface AboutTeaserProps {
  images: [string, string, string];
  imageAlts?: [string, string, string];
  headline: string;
  italicHeadline: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function AboutTeaser({
  images,
  imageAlts = ["Photo 1", "Photo 2", "Photo 3"],
  headline,
  italicHeadline,
  body,
  ctaLabel = "Get to Know Me",
  ctaHref = "#about",
}: AboutTeaserProps) {
  return (
    <section className="grid md:grid-cols-2 min-h-[600px] bg-(--color-cream)">
      {/* Photo collage */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative grid grid-cols-2 gap-3 p-10 md:p-16"
      >
        <motion.div variants={fadeIn} className="relative col-span-2 h-64">
          <Image src={images[0]} alt={imageAlts[0]} fill className="object-cover" />
        </motion.div>
        <motion.div variants={fadeIn} className="relative h-48">
          <Image src={images[1]} alt={imageAlts[1]} fill className="object-cover" />
        </motion.div>
        <motion.div variants={fadeIn} className="relative h-48 mt-6">
          <Image src={images[2]} alt={imageAlts[2]} fill className="object-cover" />
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.div
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col justify-center gap-6 px-10 py-16 md:px-16"
      >
        <h2 className="font-serif text-5xl font-normal leading-tight text-(--color-ink) md:text-6xl">
          {headline}
          <br />
          <em className="italic">{italicHeadline}</em>
        </h2>
        <p className="text-sm leading-relaxed text-(--color-muted) max-w-sm">{body}</p>
        <div>
          <a href={ctaHref}>
            <Button variant="ghost">{ctaLabel}</Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
