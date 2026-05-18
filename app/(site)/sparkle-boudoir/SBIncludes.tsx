import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const columns = [
  {
    phase: "Before Your Session",
    items: [
      "Personal consultation with Seydi",
      "Complete planning guide and questionnaire",
      "Wardrobe consultation and mood board",
      "Access to 1,000+ piece wardrobe collection",
      "Heels and jewelry available in studio",
    ],
  },
  {
    phase: "Your Session Day",
    items: [
      "Professional hair, makeup & lash application",
      "4–6 hours in our private luxury studio",
      "Expert posing direction for every body type",
      "Unlimited wardrobe changes from our collection",
      "10+ cinematic scene sets at your disposal",
    ],
  },
  {
    phase: "What You Take Home",
    items: [
      "Same-day cinematic image reveal on large screen",
      "Fully edited high-resolution digital images",
      "Professional prints, canvas & album options",
      "Private client portal access to your gallery",
      "Images shared ONLY with your written permission",
    ],
  },
];

export function SBIncludes() {
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
            literally everything else.
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
