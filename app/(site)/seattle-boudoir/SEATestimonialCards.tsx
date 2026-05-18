import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const reviews = [
  {
    name: "Jenna R.",
    stars: 5,
    text: "I had been talking about doing this for three years. I wish I had stopped talking and just booked. Molly created the most beautiful sets I have ever stepped into — I felt like a real model. The hair, the makeup, the direction. Everything.",
    detail: "Solo Boudoir",
  },
  {
    name: "Alex & Marcus",
    stars: 5,
    text: "We did couples boudoir for our second anniversary and it was hands-down the most fun we have had together in years. Molly directed every pose with zero awkwardness. The album is now our most prized thing in the house.",
    detail: "Couples Boudoir",
  },
  {
    name: "Priya S.",
    stars: 5,
    text: "My wedding gift to my husband. He cried. I cried. The bridal session in Molly's studio was its own little vacation — champagne, gorgeous wardrobe, music, laughter. I felt like the version of myself I always knew was in there.",
    detail: "Bridal Boudoir",
  },
  {
    name: "Tasha M.",
    stars: 5,
    text: "As a plus-size woman I had a lot of fear walking in. Molly disarmed me in five minutes. She works with every body and it shows. The before/after of seeing myself the way she captured me was genuinely healing. Worth every penny.",
    detail: "Empowerment Session",
  },
  {
    name: "Devon K.",
    stars: 5,
    text: "I'm non-binary and was a little nervous booking. Seattle Boudoir is genuinely a space for every body and every love. I felt celebrated, not tolerated. The shots are art. I'm framing three of them for my apartment.",
    detail: "Solo Session",
  },
  {
    name: "Catherine W.",
    stars: 5,
    text: "I turned 50 and gifted myself this. The studio is gorgeous, the sets feel cinematic, and the team treated me like the main character all day long. I left feeling 25. The images haven't left my phone since.",
    detail: "Milestone Session",
  },
];

export function SEATestimonialCards() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">
            Real People. Real Transformations.
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            What Happens When You Finally{" "}
            <em className="italic">Stop Waiting</em>
          </h2>
          <p className="text-sm text-(--color-muted) max-w-md mx-auto leading-relaxed">
            Every single person who walks through our doors had the same
            doubts you have right now. Here&apos;s what they said after.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <AnimateOnScroll
              key={r.name}
              delay={i * 60}
              className="bg-white border border-(--color-border) p-7 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <span key={j} className="text-(--color-accent) text-sm">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-(--color-ink) italic flex-1">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="pt-2 border-t border-(--color-border)">
                <p className="text-sm font-medium text-(--color-ink)">
                  {r.name}
                </p>
                <p className="text-[10px] tracking-widest uppercase text-(--color-muted) mt-0.5">
                  {r.detail}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
