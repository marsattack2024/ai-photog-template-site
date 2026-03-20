"use client";

interface NavbarProps {
  brandName?: string;
}

export function Navbar({ brandName = "[Studio Name]" }: NavbarProps) {
  return (
    <header className="w-full bg-(--color-cream) border-b border-(--color-border) px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="font-serif text-2xl tracking-widest text-(--color-ink)">
          {brandName}
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {["Gallery", "About", "Services", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs tracking-widest uppercase text-(--color-muted) hover:text-(--color-ink) transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="text-xs tracking-widest uppercase border border-(--color-ink) px-5 py-2 hover:bg-(--color-ink) hover:text-(--color-cream) transition-colors"
        >
          Inquire
        </a>
      </div>
    </header>
  );
}
