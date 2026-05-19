"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export function SEAHero() {
  return (
    <section className="relative w-full min-h-[95vh] flex items-end overflow-hidden">
      <Image
        src="/seattle/sbc-5.webp"
        alt="Luxury boudoir photography session at Seattle Boudoir & Co in downtown Seattle Washington"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_25%]"
      />

      {/* Right-to-left gradient (subject is on the left) */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/45 to-transparent" />
      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pb-16 md:pb-28 flex justify-center md:justify-end">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg flex flex-col gap-5 text-center md:text-right items-center md:items-end"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-white/60 font-medium">
            Seattle&apos;s Premier Luxury Boudoir Studio
          </span>

          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.1] text-white">
            The version of you{" "}
            <em className="italic" style={{ color: "var(--color-accent)" }}>
              you&apos;ve been hiding.
            </em>
            <br />
            It&apos;s time you{" "}
            <em className="italic">met her.</em>
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-white/75 max-w-sm">
            A luxury boudoir experience in downtown Seattle. Hair, makeup,
            curated wardrobe, expert posing — every detail handled. You just
            show up.
          </p>

          {/* Stats row */}
          <div className="flex gap-5 md:gap-7 pt-1">
            {[
              { num: "689+", label: "Sessions slayed" },
              { num: "All", label: "Bodies welcome" },
              { num: "Same Week", label: "Image reveal" },
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
              Claim $400 Off — Book Now
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
