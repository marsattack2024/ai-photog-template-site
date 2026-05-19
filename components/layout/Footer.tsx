export interface FooterSocial {
  label: string;
  href: string;
}

export interface FooterProps {
  studioName: string;
  /** Year for the © line; defaults to current year. */
  year?: number;
  socials?: FooterSocial[];
}

const DEFAULT_SOCIALS: FooterSocial[] = [
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "TikTok", href: "#" },
];

export function Footer({
  studioName,
  year = new Date().getFullYear(),
  socials = DEFAULT_SOCIALS,
}: FooterProps) {
  return (
    <footer className="bg-(--color-ink) py-12 px-[var(--space-section-x)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-serif text-2xl tracking-[var(--tracking-label)] text-(--color-cream)">
          {studioName}
        </p>
        <p className="text-xs text-(--color-muted) tracking-widest uppercase text-center">
          &copy; {year} {studioName} Photography. All rights reserved.
        </p>
        <div className="flex gap-8">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="text-xs text-(--color-muted) hover:text-(--color-cream) uppercase tracking-widest transition-colors duration-300"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
