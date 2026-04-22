"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const featured = [
  {
    quote:
      "I was 32 weeks and feeling huge and exhausted. She made me feel like the most beautiful woman in the room. When I saw my gallery, I cried. I had no idea I could look like that.",
    name: "[Client Name]",
    detail: "Maternity Session \u2014 33 Weeks",
    stars: 5,
  },
  {
    quote:
      "I almost didn\u2019t book because I felt so unlike myself. I am so glad I did. These photos are the most powerful thing I own from my pregnancy.",
    name: "[Client Name]",
    detail: "Maternity Boudoir \u2014 30 Weeks",
    stars: 5,
  },
  {
    quote:
      "My husband teared up when he saw the photos. She captured something I didn\u2019t even know was there. This was the best gift I gave myself during my entire pregnancy.",
    name: "[Client Name]",
    detail: "Maternity Session \u2014 34 Weeks",
    stars: 5,
  },
  {
    quote:
      "I\u2019ve had two kids and never did this. With my third, I finally said yes. I will never regret it. Every woman deserves to feel this way about her body.",
    name: "[Client Name]",
    detail: "Maternity Boudoir \u2014 29 Weeks",
    stars: 5,
  },
  {
    quote:
      "The wardrobe, the lighting, the way she guided me through every single pose \u2014 it felt like a luxury experience from start to finish. And I got to bring my toddler for a few shots too.",
    name: "[Client Name]",
    detail: "Maternity + Sibling Session",
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

export function MaternityTestimonialCards() {
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
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">Mama Love</span>
          <h2 className="font-serif text-3xl font-normal text-(--color-ink) mt-2 md:text-4xl">
            Words From Women Who{" "}
            <em className="italic">Almost Didn&apos;t Book</em>
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

        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-10 h-10 border border-(--color-border) text-(--color-ink) hover:border-(--color-ink) transition-colors flex items-center justify-center"
          >
            &larr;
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
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
