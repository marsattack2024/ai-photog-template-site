import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const columns = [
  {
    phase: "Before Your Session",
    items: [
      "Free 15-minute phone consultation with Cyndee",
      "Personalized Dream Guide mailed to your inbox",
      "Full wardrobe guidance and mood board",
      "Access to 200+ piece lingerie & wardrobe collection",
      "High heels in sizes 5–11 available",
    ],
  },
  {
    phase: "Your Session Day",
    items: [
      "Professional hair & makeup by in-house artist",
      "2–3 hours in our private heated luxury studio",
      "Expert posing direction for every body type",
      "Unlimited wardrobe changes throughout session",
      "Champagne welcome — you're celebrated from minute one",
    ],
  },
  {
    phase: "What You Take Home",
    items: [
      "Same-day image reveal — you see them that afternoon",
      "50+ fully edited high-resolution images in 7 days",
      "Handmade luxury album option from Portugal",
      "Digital files included with all album purchases",
      "Images shared ONLY with your written permission",
    ],
  },
];

export function BDIncludes() {
  return (
    <section className="py-24 px-6 bg-(--color-ink)">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">What&apos;s Included</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-cream)">
            No Surprises.{" "}
            <em className="italic">No Pressure.</em>
          </h2>
          <p className="text-sm text-(--color-cream)/60 max-w-md mx-auto leading-relaxed">
            You show up. We handle literally everything else.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-px bg-white/10">
          {columns.map((col, i) => (
            <AnimateOnScroll
              key={col.phase}
              delay={i * 80}
              className="bg-(--color-ink) flex flex-col gap-5 p-8"
            >
              <h3 className="text-xs tracking-widest uppercase text-(--color-accent) pb-4 border-b border-white/10">
                {col.phase}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-(--color-accent) mt-0.5 shrink-0">✓</span>
                    <span className="text-sm text-(--color-cream)/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
