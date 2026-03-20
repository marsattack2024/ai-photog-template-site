"use client";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/lib/motion";

const reviews = [
  {
    stars: 5,
    quote: "I walked in nervous and walked out feeling like a completely different person. The experience was thoughtful, guided, and honestly one of the best things I've done for myself.",
    name: "[Client Name]",
    detail: "Portrait Session",
  },
  {
    stars: 5,
    quote: "From the first message to the final gallery, everything felt personal and easy. I didn't have to figure anything out — it was all handled. The photos took my breath away.",
    name: "[Client Name]",
    detail: "Couples Session",
  },
  {
    stars: 5,
    quote: "I kept putting this off for years. I finally said yes and I cannot believe I waited so long. I cried when I saw my images. It was that good.",
    name: "[Client Name]",
    detail: "Portrait Session",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-(--color-accent)" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export function TestimonialCards() {
  return (
    <section className="bg-white py-20 px-6 border-b border-(--color-border)">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">What Clients Say</span>
          <h2 className="font-serif text-3xl font-normal text-(--color-ink) mt-2 md:text-4xl">
            Real People. <em className="italic">Real Results.</em>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {reviews.map((r) => (
            <motion.div
              key={r.name + r.detail}
              variants={fadeUp}
              className="flex flex-col gap-4 p-8 border border-(--color-border) bg-(--color-cream)"
            >
              <Stars count={r.stars} />
              <blockquote className="font-serif text-base italic text-(--color-ink) leading-relaxed flex-1">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <div className="pt-2 border-t border-(--color-border)">
                <p className="text-sm font-medium text-(--color-ink)">{r.name}</p>
                <p className="text-xs tracking-widest uppercase text-(--color-muted) mt-0.5">{r.detail}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
