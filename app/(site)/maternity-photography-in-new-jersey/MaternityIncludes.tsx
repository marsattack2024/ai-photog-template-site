const items = [
  "Pre-session planning call",
  "Full wardrobe guide + studio gowns",
  "Professional posing direction",
  "90-minute to 2-hour session",
  "Partner & sibling shots (optional)",
  "40+ fully edited images",
  "Private online gallery",
  "High-resolution digital downloads",
  "Two-week turnaround",
];

export function MaternityIncludes() {
  return (
    <section className="py-24 px-6 bg-(--color-cream)">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">What&apos;s Included</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Everything in Your{" "}
            <em className="italic">Maternity Session</em>
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
