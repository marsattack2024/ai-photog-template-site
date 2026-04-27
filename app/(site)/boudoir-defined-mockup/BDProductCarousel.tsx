"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const BASE = "https://www.boudoirdefined.com/wp-content/uploads/";

const products = [
  { src: `${BASE}2021/11/2021-11-03_0054-scaled.jpg`, alt: "Handmade luxury boudoir album from Boudoir Defined", label: "Luxury Linen Album" },
  { src: `${BASE}2021/10/2021-10-29_0025.jpg`, alt: "Fine art boudoir print product", label: "Fine Art Prints" },
  { src: `${BASE}2021/10/2021-10-29_0003.jpg`, alt: "Boudoir Defined studio album and print products", label: "Metal Wall Art" },
  { src: `${BASE}2021/10/2021-10-29_0019.jpg`, alt: "Premium boudoir print collection", label: "Canvas Prints" },
  { src: `${BASE}2021/10/2021-10-29_0021.jpg`, alt: "Leather-bound boudoir album", label: "Premium Albums" },
  { src: `${BASE}2021/10/2021-10-29_0022.jpg`, alt: "Boudoir wall art collection", label: "Gallery Collections" },
  { src: `${BASE}2021/10/2021-10-29_0018.jpg`, alt: "Boudoir box set and keepsakes", label: "Keepsake Box Sets" },
  { src: `${BASE}2021/11/2021-11-03_0052-scaled.jpg`, alt: "Boudoir Defined signature album", label: "Signature Album" },
  { src: `${BASE}2023/03/IMG_0229-scaled.jpeg`, alt: "Digital gallery delivery at Boudoir Defined", label: "Digital Gallery" },
];

export function BDProductCarousel() {
  const [index, setIndex] = useState(0);
  const visible = 3;
  const max = products.length - visible;

  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }
  function next() {
    setIndex((i) => Math.min(max, i + 1));
  }

  return (
    <section className="bg-(--color-ink) py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">What You Take Home</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-cream)">
            Products That Last{" "}
            <em className="italic">a Lifetime.</em>
          </h2>
          <p className="text-sm text-(--color-cream)/60 max-w-md mx-auto leading-relaxed">
            Handmade luxury albums from Portugal. Fine art prints. Metal wall art.
            Digital files included with every album purchase.
          </p>
        </AnimateOnScroll>

        {/* Carousel */}
        <div className="relative">
          {/* Desktop: 3 across */}
          <div className="hidden md:block overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(calc(-${index * (100 / visible)}% - ${index * 16 / visible}px))` }}
            >
              {products.map((p, i) => (
                <div key={i} className="flex-shrink-0 w-[calc(33.333%-11px)] flex flex-col gap-3">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                      sizes="33vw"
                    />
                  </div>
                  <p className="text-xs tracking-widest uppercase text-(--color-cream)/50 text-center">{p.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: 1 at a time */}
          <div className="md:hidden relative h-64 overflow-hidden">
            <Image
              src={products[index % products.length].src}
              alt={products[index % products.length].alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Arrow controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              disabled={index === 0}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-(--color-cream) hover:border-white/50 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              ‹
            </button>
            <div className="flex gap-2">
              {Array.from({ length: max + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
                  style={{ backgroundColor: i === index ? "var(--color-accent)" : "rgba(255,255,255,0.2)" }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              disabled={index === max}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-(--color-cream) hover:border-white/50 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>

        <AnimateOnScroll delay={100} className="text-center">
          <p className="text-sm italic text-(--color-cream)/50 max-w-md mx-auto leading-relaxed">
            &ldquo;We&apos;d rather you have an album you can touch and feel &mdash; one that floods you
            with the same confidence you felt during your session.&rdquo;
          </p>
          <p className="text-xs tracking-widest uppercase text-(--color-accent) mt-3">&mdash; Cyndee</p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
