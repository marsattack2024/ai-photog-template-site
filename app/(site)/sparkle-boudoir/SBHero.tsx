"use client";
import { motion } from "framer-motion";

export function SBHero() {
  return (
    <section className="relative w-full min-h-[95vh] flex items-end overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sparkle/hero.jpg"
        alt="Luxury boudoir photography session at Empower & Sparkle Boudoir in Fredericksburg Virginia"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
      />

      {/* Right-to-left gradient (face is on the left) */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/45 to-transparent" />
      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pb-16 md:pb-28 flex justify-center md:justify-end">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg flex flex-col gap-5 text-center md:text-right items-center md:items-end"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-white/60 font-medium">
            Northern Virginia&apos;s Premier Luxury Boudoir Studio
          </span>

          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.1] text-white">
            Dare to{" "}
            <em className="italic" style={{ color: "var(--color-accent)" }}>
              Sparkle.
            </em>
            <br />
            Meet the woman you&apos;ve{" "}
            <em className="italic">always been.</em>
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-white/75 max-w-sm">
            A luxury boudoir experience in downtown Fredericksburg, VA.
            Hair, makeup, wardrobe from our 1,000+ piece collection, and
            expert posing — all included. You just show up.
          </p>

          {/* Stats row */}
          <div className="flex gap-5 md:gap-7 pt-1">
            {[
              { num: "20+", label: "Years of experience" },
              { num: "1,000+", label: "Wardrobe pieces" },
              { num: "Same Day", label: "Image reveal" },
            ].map((s) => (
              <div key={s.num} className="flex flex-col gap-0.5">
                <span className="font-serif text-xl text-white">{s.num}</span>
                <span className="text-[10px] tracking-widest uppercase text-white/50">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-end">
            <a
              href="#book"
              className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium px-8 py-4 transition-opacity duration-300 hover:opacity-90"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-cream)",
              }}
            >
              Book My Experience
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium border border-white/30 text-white px-8 py-4 hover:bg-white/10 transition-colors duration-300"
            >
              See the Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
