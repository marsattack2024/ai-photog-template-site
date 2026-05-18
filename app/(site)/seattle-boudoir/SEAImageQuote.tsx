"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface Props {
  src: string;
  alt: string;
  quote: string;
  attribution?: string;
  objectPosition?: string;
  align?: "center" | "right" | "left";
}

export function SEAImageQuote({
  src,
  alt,
  quote,
  attribution,
  objectPosition = "center",
  align = "center",
}: Props) {
  const alignClass =
    align === "right"
      ? "items-center justify-center md:justify-end px-6 md:pr-24 lg:pr-32 md:pl-8"
      : align === "left"
        ? "items-center justify-center md:justify-start px-6 md:pl-24 lg:pl-32 md:pr-8"
        : "items-center justify-center px-6 md:px-16 lg:px-24";

  const textAlign =
    align === "center"
      ? "text-center items-center"
      : align === "right"
        ? "text-center md:text-right items-center md:items-end"
        : "text-center md:text-left items-center md:items-start";

  return (
    <div className="relative w-full h-[380px] md:h-[560px] lg:h-[620px] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ objectPosition }}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-(--color-ink)/65" />
      <div className={`absolute inset-0 flex ${alignClass}`}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className={`max-w-xl flex flex-col gap-3 ${textAlign}`}
        >
          <blockquote className="font-serif text-base md:text-2xl lg:text-[1.7rem] italic text-(--color-cream) leading-relaxed">
            &ldquo;{quote}&rdquo;
          </blockquote>
          {attribution && (
            <p className="text-xs tracking-widest uppercase text-white/50 mt-1">
              &mdash; {attribution}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
