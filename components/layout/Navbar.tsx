"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "HOME", tagline: "take me home", href: "/" },
  { label: "ABOUT", tagline: "get to know me", href: "#about" },
  { label: "SERVICES", tagline: "learn more", href: "#services" },
  { label: "BLOG", tagline: "read the latest", href: "#blog" },
  { label: "GALLERIES", tagline: "view my work", href: "#galleries" },
  { label: "CONTACT", tagline: "get in touch", href: "#contact" },
];

export function Navbar({ brandName = "Studio" }: { brandName?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-(--color-cream) shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Brand */}
          <div className="text-center mb-3">
            <Link
              href="/"
              className="font-serif text-3xl tracking-[0.2em] text-(--color-ink) hover:opacity-70 transition-opacity"
            >
              {brandName}
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex flex-col items-center group"
              >
                <span className="text-xs tracking-[0.2em] text-(--color-ink) group-hover:text-(--color-accent) transition-colors font-medium">
                  {link.label}
                </span>
                <span className="text-[10px] text-(--color-muted) italic mt-0.5 group-hover:text-(--color-accent) transition-colors">
                  {link.tagline}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden absolute right-6 top-6 flex flex-col gap-1.5 cursor-pointer"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-px bg-(--color-ink)" />
            <span className="block w-6 h-px bg-(--color-ink)" />
            <span className="block w-4 h-px bg-(--color-ink)" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-(--color-cream) flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-6 right-6 text-2xl text-(--color-ink)"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              &#x2715;
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-2xl text-(--color-ink) hover:text-(--color-accent) transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
