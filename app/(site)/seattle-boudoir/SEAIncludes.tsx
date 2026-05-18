import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const columns = [
  {
    phase: "Before Your Session",
    items: [
      "Personal pre-session consultation",
      "Complete prep & planning guide",
      "Wardrobe consultation and mood board",
      "Guided assistance with outfit selection",
      "Heels and jewelry available in studio",
    ],
  },
  {
    phase: "Your Studio Day",
    items: [
      "Professional hair, makeup & lash application",
      "Expert posing direction for every body",
      "Unlimited wardrobe changes",
      "Access to every curated set in the studio",
      "Champagne, music & a judgement-free space",
    ],
  },
  {
    phase: "What You Take Home",
    items: [
      "Same-day professionally edited sneak peek",
      "Same-week viewing & ordering appointment",
      "High-end hand retouching on every image",
      "Hand-crafted luxury album options",
      "Private gallery — shared only with your written permission",
    ],
  },
];

export function SEAIncludes() {
  return (
    <section className="py-24 px-6 bg-(--color-ink)">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">
            What&apos;s Included
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-cream)">
            A Full Day of Luxury.{" "}
            <em className="italic">You Just Show Up.</em>
          </h2>
          <p className="text-sm text-(--color-cream)/60 max-w-md mx-auto leading-relaxed">
            Flexible payment plans available. You show up. We handle
            literally every other detail.
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
                    <span className="text-(--color-accent) mt-0.5 shrink-0">
                      ✓
                    </span>
                    <span className="text-sm text-(--color-cream)/80 leading-relaxed">
                      {item}
                    </span>
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
