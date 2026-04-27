"use client";
import { motion } from "framer-motion";

export function BDHero() {
  return (
    <section className="relative w-full min-h-[95vh] flex items-end overflow-hidden">
      {/* Full-bleed LCP image — raw img for fastest paint */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://www.boudoirdefined.com/wp-content/uploads/2023/03/BoudoirDefinedPhotographyBoiseIdaho_0021-686x1024.jpg"
        alt="Luxury boudoir photography session at Boudoir Defined studio in Meridian Idaho"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Left-to-right gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content — bottom left, matching the shared Hero pattern */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-10 md:px-16 pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg flex flex-col gap-5"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-white/60 font-medium">
            Boise&apos;s Premier Luxury Boudoir Studio
          </span>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] text-white">
            You&apos;ve always been{" "}
            <em className="italic" style={{ color: "var(--color-accent)" }}>gorgeous.</em>
            <br />
            We just make you{" "}
            <em className="italic">believe it.</em>
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-white/75 max-w-sm">
            Meridian, Idaho&apos;s most trusted boudoir experience. Hair, makeup,
            wardrobe, and expert posing — all included. You just show up.
          </p>

          {/* Stats row */}
          <div className="flex gap-7 pt-1">
            {[
              { num: "200+", label: "Women transformed" },
              { num: "5.0★", label: "Google rating" },
              { num: "7 days", label: "Image delivery" },
            ].map((s) => (
              <div key={s.num} className="flex flex-col gap-0.5">
                <span className="font-serif text-xl text-white">{s.num}</span>
                <span className="text-[10px] tracking-widest uppercase text-white/50">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#book"
              className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium px-8 py-4 transition-opacity duration-300 hover:opacity-90"
              style={{ backgroundColor: "var(--color-accent)", color: "var(--color-cream)" }}
            >
              Book My Free Consultation
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
