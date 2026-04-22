"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const featured = [
  {
    quote:
      "Jennifer is SUPER cool and AMAZINGLY talented. I loved that she walked me through every pose and detail. All of my nerves disappeared and I have never felt more beautiful.",
    name: "Rania",
    detail: "Underwater Portrait Session \u2014 St. Augustine",
    stars: 5,
  },
  {
    quote:
      "I\u2019m pretty self-conscious about my body\u2026 like every other woman. But I was like, Oh my god, that\u2019s me?! It was very empowering.",
    name: "Mrs. S",
    detail: "Underwater Session \u2014 Crystal Springs",
    stars: 5,
  },
  {
    quote:
      "Jenn knows how to do all the poses that make your body look perfect regardless of whatever imperfections you think you have. You\u2019ll be like, \u2018who is that person?!\u2019 and then you\u2019re like, OH DAMN THAT\u2019S ME.",
    name: "Kait",
    detail: "Boudoir & Underwater Session",
    stars: 5,
  },
  {
    quote:
      "I almost didn\u2019t book because I hated photos of myself. From the moment I walked in I felt completely at ease. I\u2019ve never felt so beautiful. So confident. If you\u2019re on the fence because of how you look in photos \u2014 that\u2019s exactly why you should do this.",
    name: "January R.",
    detail: "Underwater Portrait Session",
    stars: 5,
  },
  {
    quote:
      "I drove four hours for this session and I would drive eight next time. The water, the light, the way Jennifer directs you \u2014 it\u2019s a completely different experience from any photography I\u2019ve ever done. Worth every penny.",
    name: "Destination Client",
    detail: "Underwater Session \u2014 Natural Springs",
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

export function UnderwaterTestimonialCards() {
  const [current, setCurrent] = useState(0);
  const total = featured.length;
  const t = featured[current];

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section className="bg-(--color-cream) py-24 px-6 border-t border-(--color-border)">
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">Real Clients</span>
          <h2 className="font-serif text-3xl font-normal text-(--color-ink) mt-2 md:text-4xl">
            They Were Nervous, Too.{" "}
            <em className="italic">Every Single One.</em>
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden border border-(--color-border)">
              <Image
                src="/placeholder/square.svg"
                alt={`${t.name} — client headshot`}
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

        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 border border-(--color-border) text-(--color-ink) hover:border-(--color-ink) transition-colors flex items-center justify-center"
          >
            &larr;
          </button>

          <div className="flex gap-2">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-(--color-accent) w-6" : "bg-(--color-border) w-1.5"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 border border-(--color-border) text-(--color-ink) hover:border-(--color-ink) transition-colors flex items-center justify-center"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
