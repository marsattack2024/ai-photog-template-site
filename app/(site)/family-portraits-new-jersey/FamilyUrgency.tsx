export function FamilyUrgency() {
  return (
    <section className="py-24 px-6 bg-(--color-accent)">
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
        <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-white">
          They Grow Up Fast.{" "}
          <em className="italic">You Already Know That.</em>
        </h2>
        <p className="text-sm leading-relaxed text-white/80">
          We take on a limited number of family sessions each month so every family gets our
          full attention. Fall and holiday slots fill months in advance. Don&apos;t wait until
          the leaves are already gone.
        </p>
        <div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-white text-(--color-ink) px-8 py-4 hover:bg-(--color-ink) hover:text-white transition-colors duration-300"
          >
            Reserve Our Family Date
          </a>
        </div>
      </div>
    </section>
  );
}
