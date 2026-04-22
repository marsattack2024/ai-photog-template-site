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
}

export function UnderwaterImageQuote({ src, alt, quote, attribution, objectPosition = "center" }: Props) {
  return (
    <div className="relative w-full h-[440px] md:h-[520px] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ objectPosition }}
      />
      <div className="absolute inset-0 bg-(--color-ink)/55" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl text-center flex flex-col items-center gap-4"
        >
          <span className="font-serif text-7xl text-white/20 leading-none">&ldquo;</span>
          <blockquote className="font-serif text-xl md:text-2xl italic text-(--color-cream) leading-relaxed -mt-6">
            {quote}
          </blockquote>
          {attribution && (
            <p className="text-xs tracking-widest uppercase text-white/50 mt-2">&mdash; {attribution}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
