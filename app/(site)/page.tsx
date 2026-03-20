import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SplitSection } from "@/components/sections/SplitSection";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ContactForm } from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <Navbar brandName="Amora" />

      <Hero
        headline="Capturing Your Best Moments"
        subline="Timeless, romantic photography that feels as effortless as it looks."
        ctaLabel="Make Memories"
        ctaHref="#contact"
        imageSrc="https://placehold.co/1920x1080/d4c5b2/6b5e4e?text=Hero+Photo"
        imageAlt="Wedding couple on stairs"
      />

      {/* Intro Block */}
      <section className="py-24 px-6 bg-(--color-cream)">
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <h2 className="font-serif text-4xl font-normal leading-tight text-(--color-ink) md:text-5xl">
            Capturing Your <br />
            <em className="italic">Best Moments</em>
          </h2>
          <p className="text-sm leading-relaxed text-(--color-muted)">
            Based in the heart of California, I document wedding days with a
            timeless, romantic style that feels as effortless as it looks. From
            sunlit coastal ceremonies to intimate vineyard celebrations, my goal
            is to create photographs you&apos;ll treasure for a lifetime.
          </p>
          <div className="flex justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium border border-(--color-ink) px-6 py-3 hover:bg-(--color-ink) hover:text-(--color-cream) transition-colors duration-300"
            >
              Make Memories
            </a>
          </div>
        </div>
      </section>

      <SplitSection
        imageSrc="https://placehold.co/800x1000/c8b9a8/6b5e4e?text=Portraits"
        imageAlt="Portrait session"
        headline="Portraits"
        body="Engagements, anniversaries, and everyday love stories — portrait sessions that capture your connection in a way that feels natural and true."
        ctaLabel="View the Gallery"
        ctaHref="#galleries"
      />

      <SplitSection
        imageSrc="https://placehold.co/800x1000/d4c5b2/6b5e4e?text=Weddings"
        imageAlt="Wedding day"
        headline="Weddings"
        body="From quiet morning moments to the joy of your first dance, my wedding galleries tell the full story of your day, exactly as it unfolded."
        ctaLabel="View the Gallery"
        ctaHref="#galleries"
        reverse
      />

      <AboutTeaser
        images={[
          "https://placehold.co/800x600/c8b9a8/6b5e4e?text=Photo+1",
          "https://placehold.co/400x500/d4c5b2/6b5e4e?text=Photo+2",
          "https://placehold.co/400x500/bfae9e/6b5e4e?text=Photo+3",
        ]}
        headline="Behind"
        italicHeadline="The Lens"
        body="I believe your wedding day should feel like you: joyful, relaxed, and full of moments you'll want to relive again and again. I've learned how to blend gentle direction with authentic storytelling so you can be fully present while I capture every detail."
        ctaLabel="Get to Know Me"
        ctaHref="#about"
      />

      <ContactForm />

      {/* Footer */}
      <footer className="bg-(--color-ink) py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-xl tracking-widest text-(--color-cream)">
            Amora
          </p>
          <p className="text-xs text-(--color-muted) tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Amora Photography. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-(--color-muted) hover:text-(--color-cream) uppercase tracking-widest transition-colors">
              Instagram
            </a>
            <a href="#" className="text-xs text-(--color-muted) hover:text-(--color-cream) uppercase tracking-widest transition-colors">
              Pinterest
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
