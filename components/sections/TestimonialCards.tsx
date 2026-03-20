"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const featured = [
  {
    quote:
      "I walked in nervous and walked out feeling like a completely different person. The experience was thoughtful, guided, and honestly one of the best things I've done for myself. I cried when I saw my images. It was that good.",
    name: "[Client Name]",
    detail: "Portrait Session",
    stars: 5,
  },
  {
    quote:
      "From the first message to the final gallery, everything felt personal and easy. I didn't have to figure anything out — it was all handled. The photos took my breath away.",
    name: "[Client Name]",
    detail: "Couples Session",
    stars: 5,
  },
  {
    quote:
      "I kept putting this off for years. I finally said yes and I cannot believe I waited so long. Every woman deserves to feel this way about herself.",
    name: "[Client Name]",
    detail: "Portrait Session",
    stars: 5,
  },
  {
    quote:
      "She made me feel completely at ease from the moment I walked in. I went in thinking I wasn't photogenic. I left knowing that was never true.",
    name: "[Client Name]",
    detail: "Milestone Session",
    stars: 5,
  },
  {
    quote:
      "I turned 50 and wanted to finally do something just for me. This was it. The most seen and celebrated I have ever felt in my life.",
    name: "[Client Name]",
    detail: "Milestone Session",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-(--color-accent)" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialCards() {
  const [current, setCurrent] = useState(0);
  const total = featured.length;
  const t = featured[current];

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section className="bg-(--color-cream) py-24 px-6 border-t border-(--color-border)">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">Client Love</span>
          <h2 className="font-serif text-3xl font-normal text-(--color-ink) mt-2 md:text-4xl">
            Lovely Words. <em className="italic">Real Women.</em>
          </h2>
        </motion.div>

        {/* Featured slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6 text-center"
          >
            {/* Circular headshot */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden border border-(--color-border)">
              <Image
                src="/placeholder/square.svg"
                alt="Client headshot"
                fill
                className="object-cover"
              />
            </div>

            <Stars count={t.stars} />

            <blockquote className="font-serif text-xl md:text-2xl italic text-(--color-ink) leading-relaxed max-w-2xl">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="flex flex-col items-center gap-0.5 pt-2">
              <p className="text-sm font-medium text-(--color-ink)">{t.name}</p>
              <p className="text-xs tracking-widest uppercase text-(--color-muted)">{t.detail}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-10 h-10 border border-(--color-border) text-(--color-ink) hover:border-(--color-ink) transition-colors flex items-center justify-center"
          >
            ←
          </button>

          <div className="flex gap-2">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-(--color-accent) w-6" : "bg-(--color-border) w-1.5"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next"
            className="w-10 h-10 border border-(--color-border) text-(--color-ink) hover:border-(--color-ink) transition-colors flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
