"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { motionEasings } from "@/lib/motion.config";

export interface CarouselTestimonial {
  quote: string;
  name: string;
  detail: string;
}

export const DEFAULT_CAROUSEL_TESTIMONIALS: CarouselTestimonial[] = [
  {
    quote:
      "Words truly cannot describe how incredible this experience was. I walked in nervous and walked out feeling like myself again — only better.",
    name: "[Client Name]",
    detail: "Portrait Session",
  },
  {
    quote:
      "From the first message to the final gallery delivery, everything was thoughtful, personal, and completely exceeded my expectations.",
    name: "[Client Name]",
    detail: "Couples Session",
  },
  {
    quote:
      "I've been putting this off for years. I finally said yes and I cannot believe I waited so long. This is the best thing I've done for myself.",
    name: "[Client Name]",
    detail: "Portrait Session",
  },
  {
    quote:
      "She guided me through everything. I never once felt unsure of what to do. The whole experience felt like it was designed just for me.",
    name: "[Client Name]",
    detail: "Portrait Session",
  },
  {
    quote:
      "I turned 50 and wanted a way to celebrate myself for once. This was it. I cannot recommend this enough to every woman who keeps putting herself last.",
    name: "[Client Name]",
    detail: "Milestone Session",
  },
  {
    quote:
      "I almost cancelled three times. I am so glad I didn't. This was the most I have ever felt like myself in a photograph.",
    name: "[Client Name]",
    detail: "Portrait Session",
  },
];

export interface TestimonialsCarouselProps {
  eyebrow?: string;
  headline?: React.ReactNode;
  testimonials?: CarouselTestimonial[];
}

export function TestimonialsCarousel({
  eyebrow = "Lovely Words",
  headline = (
    <>
      The Experience They <em className="italic">Talk About</em>
    </>
  ),
  testimonials = DEFAULT_CAROUSEL_TESTIMONIALS,
}: TestimonialsCarouselProps = {}) {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const visible = [
    testimonials[current % total],
    testimonials[(current + 1) % total],
    testimonials[(current + 2) % total],
  ];

  return (
    <section className="bg-(--color-ink) py-[var(--space-section-y)] px-[var(--space-section-x)] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-[var(--space-heading-body-gap)]"
        >
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">
            {eyebrow}
          </span>
          <h2 className="font-serif text-4xl font-normal text-(--color-cream) mt-[var(--space-heading-eyebrow-gap)] md:text-5xl">
            {headline}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <motion.div
              key={`${current}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: motionEasings.out }}
              className={`flex flex-col gap-5 p-8 border border-(--color-card-on-dark-border) bg-(--color-card-on-dark-bg) ${
                i > 0 ? "hidden md:flex" : "flex"
              }`}
            >
              <span className="font-serif text-5xl text-(--color-accent) opacity-40 leading-none">
                &ldquo;
              </span>
              <blockquote className="font-serif text-base italic text-(--color-cream) leading-relaxed flex-1">
                {t.quote}
              </blockquote>
              <div className="border-t border-(--color-card-on-dark-border) pt-4">
                <p className="text-sm font-medium text-(--color-cream)">{t.name}</p>
                <p className="text-xs tracking-widest uppercase text-(--color-muted) mt-0.5">
                  {t.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-10 h-10 border border-(--color-border-on-dark) text-(--color-cream) hover:border-(--color-border-on-dark-hover) transition-colors flex items-center justify-center"
          >
            ←
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-(--color-accent) w-4"
                    : "bg-(--color-indicator-inactive)"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next"
            className="w-10 h-10 border border-(--color-border-on-dark) text-(--color-cream) hover:border-(--color-border-on-dark-hover) transition-colors flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
