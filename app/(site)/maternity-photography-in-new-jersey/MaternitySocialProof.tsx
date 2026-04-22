const stats = [
  { value: "150+", label: "Mamas Photographed" },
  { value: "5\u2605", label: "Average Review" },
  { value: "28\u201336 Weeks", label: "Ideal Booking Window" },
  { value: "Montclair", label: "NJ Studio Location" },
];

export function MaternitySocialProof() {
  return (
    <section className="bg-(--color-ink) py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="font-serif text-2xl md:text-3xl text-(--color-accent)">{stat.value}</span>
            <span className="text-xs tracking-widest uppercase text-(--color-cream)/60">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
