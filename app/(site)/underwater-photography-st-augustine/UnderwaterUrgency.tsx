export function UnderwaterUrgency() {
  return (
    <section className="py-24 px-6 bg-(--color-accent)">
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
        <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-white">
          Sessions Book Out 4–6 Weeks in Advance.{" "}
          <em className="italic">Yours Is Waiting.</em>
        </h2>
        <p className="text-sm leading-relaxed text-white/80">
          Jennifer takes on a limited number of underwater sessions each month to give every
          client her full attention above and below the surface. Florida&apos;s spring season and
          golden-light windows fill fast. Once the calendar closes, it closes.
        </p>
        <div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-white text-(--color-ink) px-8 py-4 hover:bg-(--color-ink) hover:text-white transition-colors duration-300"
          >
            Check My Date
          </a>
        </div>
      </div>
    </section>
  );
}
