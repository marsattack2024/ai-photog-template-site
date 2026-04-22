"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const testimonials = [
  {
    quote: "I surfaced after the first shot and looked at the camera and burst into tears. I had spent years not recognizing myself in photos. That was the first time I did.",
    name: "Session Client",
    detail: "Underwater Portrait \u2014 St. Augustine Springs",
  },
  {
    quote: "Jennifer is SUPER cool and AMAZINGLY talented. I loved that she walked me through every pose and detail. All of my nerves disappeared and I have never felt more beautiful.",
    name: "Rania",
    detail: "Underwater Portrait Session",
  },
  {
    quote: "I\u2019m pretty self-conscious about my body\u2026 like every other woman. But I was like, Oh my god, that\u2019s me?! It was very empowering.",
    name: "Mrs. S",
    detail: "Crystal Springs Session",
  },
  {
    quote: "I drove four hours for this session and I would drive eight next time. The water, the light, the way Jennifer directs you \u2014 it\u2019s a completely different experience from any photography I\u2019ve ever done.",
    name: "Out-of-State Client",
    detail: "Destination Session \u2014 Natural Springs",
  },
  {
    quote: "Jenn knows how to do all the poses that make your body look perfect regardless of whatever imperfections you think you have. You\u2019ll be like, \u2018who is that person?!\u2019 and then you\u2019re like, OH DAMN THAT\u2019S ME.",
    name: "Kait",
    detail: "Underwater & Boudoir Session",
  },
  {
    quote: "The session itself was therapeutic in a way I didn\u2019t anticipate. Something about the silence underwater, the trust required, the total surrender to the moment \u2014 I came out changed. The photos are stunning, but what the experience did to me is what I keep talking about.",
    name: "Session Client",
    detail: "Full-Day Underwater Portrait Session",
  },
];

export function UnderwaterTestimonialsCarousel() {
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
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">What Clients Say</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-cream) mt-3 md:text-5xl">
            &ldquo;Oh my god.{" "}
            <em className="italic">That&apos;s me?&rdquo;</em>
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
