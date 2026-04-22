const stats = [
  { value: "9+", label: "Years of Experience" },
  { value: "250+", label: "Women Photographed" },
  { value: "Heated Pool\nor Natural Springs", label: "Your Choice of Location" },
  { value: "Safety Swimmer\nOn-Site", label: "Every Single Session" },
];

const press = [
  "HuffPost Featured",
  "First Coast Living",
  "AIBP Best of Boudoir",
  "Rangefinder Magazine",
  "Fstoppers",
  "TPM Image Awards",
  "Woman-Owned Since 2016",
  "First Coast News",
];

export function UnderwaterSocialProof() {
  return (
    <div className="bg-(--color-ink)">
      {/* Stats row */}
      <section className="py-10 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-serif text-xl md:text-2xl text-(--color-accent) leading-tight whitespace-pre-line">
                {stat.value}
              </span>
              <span className="text-xs tracking-widest uppercase text-(--color-cream)/60 leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Press strip */}
      <section className="py-5 px-6 overflow-hidden">
        <div className="flex items-center gap-10 overflow-x-auto scrollbar-none">
          {[...press, ...press].map((name, i) => (
            <span
              key={i}
              className="text-xs tracking-widest uppercase text-(--color-cream)/35 whitespace-nowrap flex-shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
