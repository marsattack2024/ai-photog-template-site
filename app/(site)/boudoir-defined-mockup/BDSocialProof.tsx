"use client";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const stats = [
  { num: "200+", label: "Women Transformed" },
  { num: "5.0★", label: "Google Reviews" },
  { num: "7 Days", label: "Image Delivery" },
  { num: "200+", label: "Wardrobe Pieces" },
  { num: "100%", label: "Private & Secure" },
];

const press = [
  "As Seen in The Idaho Statesman",
  "Featured: Boise Weekly",
  "Meridian Press — Best of Boise",
  "208 Life Magazine",
  "Woman-Owned Since 2014",
  "Member: Professional Photographers of America",
];

export function BDSocialProof() {
  return (
    <section className="bg-(--color-cream)">
      {/* Stats row */}
      <div className="border-b border-(--color-border)">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {stats.map((s, i) => (
            <AnimateOnScroll key={s.label} delay={i * 60} className="flex flex-col items-center text-center gap-1">
              <span className="font-serif text-3xl md:text-4xl text-(--color-ink)">{s.num}</span>
              <span className="text-[10px] tracking-widest uppercase text-(--color-muted)">{s.label}</span>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* Press ticker */}
      <div className="overflow-hidden border-b border-(--color-border) py-4 bg-(--color-cream)">
        <div className="flex gap-12 items-center animate-[marquee_30s_linear_infinite] whitespace-nowrap w-max">
          {[...press, ...press].map((item, i) => (
            <span
              key={i}
              className="text-[10px] tracking-[0.2em] uppercase text-(--color-muted) flex-shrink-0"
            >
              {item}
              <span className="ml-12 text-(--color-accent)">✦</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
