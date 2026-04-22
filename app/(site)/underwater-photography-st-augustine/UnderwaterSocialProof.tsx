const stats = [
  { value: "9+", label: "Years of Experience" },
  { value: "5★", label: "Average Review" },
  { value: "Heated Pool\nor Springs", label: "Your Choice of Location" },
  { value: "Safety Swimmer\nOn-Site", label: "Every Session" },
];

export function UnderwaterSocialProof() {
  return (
    <section className="bg-(--color-ink) py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="font-serif text-xl md:text-2xl text-(--color-accent) leading-tight whitespace-pre-line">{stat.value}</span>
            <span className="text-xs tracking-widest uppercase text-(--color-cream)/60 leading-snug">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
