const items = [
  "Pre-session style consultation",
  "Full posing direction throughout",
  "Location scouting & recommendations",
  "1–2 hour session",
  "50+ fully edited images",
  "Private online gallery",
  "High-resolution digital downloads",
  "Unlimited personal print rights",
  "5-business-day turnaround",
];

export function IncludesGrid() {
  return (
    <section className="py-[var(--space-section-y)] px-[var(--space-section-x)] bg-(--color-cream)">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">What&apos;s Included</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Everything in{" "}
            <em className="italic">Every Session</em>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 border border-(--color-border) px-5 py-4"
            >
              <span className="text-(--color-accent) text-lg">&#10003;</span>
              <span className="text-sm text-(--color-ink)">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
