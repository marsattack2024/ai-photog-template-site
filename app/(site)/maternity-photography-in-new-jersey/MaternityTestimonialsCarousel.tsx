"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const testimonials = [
  {
    quote: "I was terrified. I felt swollen and exhausted. But the second I saw the first image on the back of her camera, something shifted. I felt proud of this body for the first time in months.",
    name: "[Client Name]",
    detail: "Maternity Boudoir \u2014 31 Weeks",
  },
  {
    quote: "She made pregnancy feel like a superpower, not a side effect. The photos are stunning \u2014 my daughter will see these one day and know how much she was wanted.",
    name: "[Client Name]",
    detail: "Maternity Session \u2014 35 Weeks",
  },
  {
    quote: "I kept saying I\u2019d do it next pregnancy. There was no next pregnancy. I am so grateful I finally stopped waiting and just booked. These images are everything.",
    name: "[Client Name]",
    detail: "Maternity Boudoir \u2014 32 Weeks",
  },
  {
    quote: "My partner and I did the session together. Watching him see the photos for the first time was one of the most emotional moments of my pregnancy. Worth every penny.",
    name: "[Client Name]",
    detail: "Couples Maternity \u2014 30 Weeks",
  },
  {
    quote: "I brought my two-year-old for a few shots. The way she captured him kissing my belly \u2014 I can\u2019t look at that photo without crying. It\u2019s already framed in the nursery.",
    name: "[Client Name]",
    detail: "Maternity + Sibling Session",
  },
  {
    quote: "The studio was warm, private, and beautiful. She had gowns in my size, she told me exactly how to stand, and I left feeling more confident than I\u2019ve felt in nine months.",
    name: "[Client Name]",
    detail: "Maternity Boudoir \u2014 33 Weeks",
  },
];

export function MaternityTestimonialsCarousel() {
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
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">Mama Testimonials</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-cream) mt-3 md:text-5xl">
            The Session They{" "}
            <em className="italic">Keep Talking About</em>
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
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-10 h-10 border border-white/20 text-(--color-cream) hover:border-white/60 transition-colors flex items-center justify-center"
          >
            &larr;
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-(--color-accent) w-4" : "bg-white/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next"
            className="w-10 h-10 border border-white/20 text-(--color-cream) hover:border-white/60 transition-colors flex items-center justify-center"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
