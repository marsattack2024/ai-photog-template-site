import { includesItems as DEFAULT_INCLUDES_ITEMS } from "@/lib/content.config";

export { DEFAULT_INCLUDES_ITEMS };

export interface IncludesGridProps {
  eyebrow?: string;
  headline?: React.ReactNode;
  items?: string[];
}

export function IncludesGrid({
  eyebrow = "What's Included",
  headline = (
    <>
      Everything in <em className="italic">Every Session</em>
    </>
  ),
  items = DEFAULT_INCLUDES_ITEMS,
}: IncludesGridProps = {}) {
  return (
    <section className="py-[var(--space-section-y)] px-[var(--space-section-x)] bg-(--color-cream)">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent-text)">
            {eyebrow}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            {headline}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 border border-(--color-border) px-5 py-4"
            >
              <span className="text-(--color-accent-text) text-lg">&#10003;</span>
              <span className="text-sm text-(--color-ink)">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
