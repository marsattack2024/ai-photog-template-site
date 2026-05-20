"use client";
import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  brandName?: string;
}

const NAV_ITEMS = [
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ brandName = "[Studio Name]" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-(--color-cream) border-b border-(--color-border) px-6 py-4 relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="font-serif text-2xl tracking-widest text-(--color-ink)">
          {brandName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs tracking-widest uppercase text-(--color-muted) hover:text-(--color-ink) transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex text-xs tracking-widest uppercase border border-(--color-ink) px-5 py-2 hover:bg-(--color-ink) hover:text-(--color-cream) transition-colors"
        >
          Inquire
        </a>

        {/* Mobile hamburger — WCAG-compliant 44x44 touch target */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          className="md:hidden p-3 -mr-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-(--color-ink)"
        >
          <span className="sr-only">{isOpen ? "Close" : "Open"} menu</span>
          {/* Animated hamburger icon */}
          <div className="w-5 flex flex-col gap-1.5" aria-hidden="true">
            <span
              className={`block h-px bg-(--color-ink) transition-transform duration-300 origin-center ${isOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-px bg-(--color-ink) transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px bg-(--color-ink) transition-transform duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile nav drawer */}
      <nav
        id="mobile-nav"
        aria-hidden={!isOpen}
        aria-label="Mobile navigation"
        className={`md:hidden absolute top-full left-0 right-0 bg-(--color-cream) border-b border-(--color-border) px-6 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-64 py-6" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-xs tracking-widest uppercase text-(--color-muted) hover:text-(--color-ink) transition-colors py-3 min-h-[44px] flex items-center"
              tabIndex={isOpen ? 0 : -1}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="text-xs tracking-widest uppercase border border-(--color-ink) px-5 py-3 min-h-[44px] flex items-center justify-center hover:bg-(--color-ink) hover:text-(--color-cream) transition-colors mt-2"
            tabIndex={isOpen ? 0 : -1}
          >
            Inquire
          </a>
        </div>
      </nav>
    </header>
  );
}
