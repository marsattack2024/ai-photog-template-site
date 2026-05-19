const testimonials = [
  {
    quote: "I have never liked photos of myself. After this session I literally cried looking at my gallery. I cannot recommend her enough.",
    name: "Sarah M.",
    detail: "Portrait Session",
  },
  {
    quote: "She made the whole experience so easy and fun. I was nervous going in and completely relaxed within the first 10 minutes.",
    name: "Jamie & Chris",
    detail: "Couples Session",
  },
  {
    quote: "The photos arrived in 4 days and they are absolutely stunning. My family keeps asking who took them.",
    name: "Rachel T.",
    detail: "Family Session",
  },
  {
    quote: "I booked on a whim and it was the best spontaneous decision I've ever made. Worth every penny.",
    name: "Alex K.",
    detail: "Portrait Session",
  },
  {
    quote: "Professional, warm, talented, and fast. The trifecta. Book her before she's fully booked out.",
    name: "Dana L.",
    detail: "Branding Session",
  },
  {
    quote: "I sent the gallery link to my mom and she cried. That's the highest compliment I can give.",
    name: "Maria C.",
    detail: "Portrait Session",
  },
];

export function TestimonialsGrid() {
  return (
    <section className="py-[var(--space-section-y)] px-[var(--space-section-x)] bg-(--color-cream)">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">Client Love</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Don&apos;t Take My Word{" "}
            <em className="italic">For It</em>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 border border-(--color-border) p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-(--color-accent) text-sm">&#9733;</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-(--color-muted) italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto">
                <p className="text-sm font-medium text-(--color-ink)">{t.name}</p>
                <p className="text-xs tracking-widest uppercase text-(--color-muted)">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
