"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const testimonials = [
  {
    quote: "We\u2019ve done family photos before with other photographers and it always felt like pulling teeth. This was the first time it was actually fun. The kids had a blast and it shows in every image.",
    name: "[Client Name]",
    detail: "Family of Four",
  },
  {
    quote: "My husband hates getting his photo taken. By the end of the session he was cracking jokes and hamming it up. She has a gift for making people comfortable.",
    name: "[Client Name]",
    detail: "Couples + Family Session",
  },
  {
    quote: "We got our holiday card photos done in September and I\u2019m already getting compliments. These are the best family photos we\u2019ve ever taken.",
    name: "[Client Name]",
    detail: "Holiday Family Session",
  },
  {
    quote: "Our daughter is in that phase where she doesn\u2019t want her photo taken. Somehow every shot of her is gorgeous. I don\u2019t know what kind of magic this is but I\u2019m booking again next year.",
    name: "[Client Name]",
    detail: "Family with Teens",
  },
  {
    quote: "We brought four adults, three kids, two grandparents, and a dog. Not a single meltdown. She kept everyone engaged and the photos are incredible. Every single one.",
    name: "[Client Name]",
    detail: "Extended Family Session",
  },
  {
    quote: "I lost my father last year. Having the multi-generational portrait we took the year before is the most valuable thing I own. Don\u2019t put this off.",
    name: "[Client Name]",
    detail: "Generations Portrait",
  },
];

export function FamilyTestimonialsCarousel() {
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
    <section className="bg-(--color-ink) py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">Family Testimonials</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-cream) mt-3 md:text-5xl">
            The Session They{" "}
            <em className="italic">Keep Recommending</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <motion.div
              key={`${current}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col gap-5 p-8 border border-white/10 bg-white/5 ${i > 0 ? "hidden md:flex" : "flex"}`}
            >
              <span className="font-serif text-5xl text-(--color-accent) opacity-40 leading-none">&ldquo;</span>
              <blockquote className="font-serif text-base italic text-(--color-cream) leading-relaxed flex-1">
                {t.quote}
              </blockquote>
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm font-medium text-(--color-cream)">{t.name}</p>
                <p className="text-xs tracking-widest uppercase text-(--color-muted) mt-0.5">{t.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6">
          <button onClick={prev} aria-label="Previous" className="w-10 h-10 border border-white/20 text-(--color-cream) hover:border-white/60 transition-colors flex items-center justify-center">&larr;</button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-(--color-accent) w-4" : "bg-white/30"}`} />
            ))}
          </div>
          <button onClick={next} aria-label="Next" className="w-10 h-10 border border-white/20 text-(--color-cream) hover:border-white/60 transition-colors flex items-center justify-center">&rarr;</button>
        </div>
      </div>
    </section>
  );
}
