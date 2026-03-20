"use client";

export function StickyBar() {
  return (
    <div className="sticky top-0 z-50 w-full bg-(--color-ink) py-2 px-6 text-center">
      <p className="text-xs tracking-widest uppercase text-(--color-cream)">
        Limited spots available for 2026 —{" "}
        <a href="#contact" className="underline hover:text-(--color-accent) transition-colors">
          Inquire today
        </a>
      </p>
    </div>
  );
}
