export function UrgencyBlock() {
  return (
    <section className="py-24 px-6 bg-(--color-accent)">
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
        <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-white">
          Spots Are Filling Fast for{" "}
          <em className="italic">Spring &amp; Summer 2026</em>
        </h2>
        <p className="text-sm leading-relaxed text-white/80">
          I take on a limited number of portrait sessions each month to ensure every client
          gets my full attention. Once the calendar fills, it fills. Don&apos;t wait and
          wonder — reach out today to hold your date.
        </p>
        <div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-white text-(--color-ink) px-8 py-4 hover:bg-(--color-ink) hover:text-white transition-colors duration-300"
          >
            Secure Your Spot
          </a>
        </div>
      </div>
    </section>
  );
}
