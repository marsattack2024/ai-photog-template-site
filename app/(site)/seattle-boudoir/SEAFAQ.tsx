"use client";
import { useState } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const faqs = [
  {
    q: "Do I need to look a certain way or be a certain size?",
    a: "Absolutely not. We photograph every body, every gender, every love. The clients who arrive most convinced they're 'not the type' are almost always the ones who leave with the most powerful images. This session is for you exactly as you are today — no shrinking, no waiting.",
  },
  {
    q: "I'm not the lingerie type. Can I still do this?",
    a: "Yes — and you're far from alone. We shoot 'glam, no lingerie' sessions all the time: dress shirts, oversized sweaters, blazers, gowns, bed sheets, even just a robe and great hair. Boudoir is about how you feel, not what you wear.",
  },
  {
    q: "Do you photograph couples and all genders?",
    a: "Yes. We work with all bodies, all loves. Solo, couples, bridal, erotica — for men, women, non-binary clients, and partners of every configuration. Our studio is a celebration, not a category.",
  },
  {
    q: "Is hair and makeup included?",
    a: "Always. Every session includes professional hair, makeup, and lash application from an artist specifically trained for boudoir photography lighting. By the time you walk out of that chair you'll already feel like a different person.",
  },
  {
    q: "What if I'm not photogenic?",
    a: "Nobody is 'not photogenic.' There are just poses that work and poses that don't — and that's our job. Expert posing direction runs through every single frame. You will be guided into every angle, every expression. You don't pose; you get posed.",
  },
  {
    q: "How long does a session last?",
    a: "Plan for a half-day at the studio with hair, makeup, and the shoot itself. You'll then return for a same-week viewing and ordering appointment. This is luxury and pampering — we will never rush you.",
  },
  {
    q: "When will I see my photos?",
    a: "You'll get a professionally edited sneak peek the same day. Your full gallery is ready for your same-week viewing and ordering appointment, where you'll see every finished image on a large screen and plan your album and wall art.",
  },
  {
    q: "Who will see my images?",
    a: "Nobody — without your explicit written permission. Your privacy is non-negotiable. Galleries are password-protected, and nothing is shared on social or anywhere else unless you say so in writing.",
  },
  {
    q: "Where is the studio located?",
    a: "We're in downtown Seattle, Washington. Easy parking, private entrance, and an interior designed to feel like a hidden luxury suite — not a typical photography set.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes. We offer flexible in-house payment plans to make investing in yourself accessible. Reach out and we'll walk through every option during your consultation. Many clients also use Klarna or Affirm.",
  },
  {
    q: "How do I get started?",
    a: "Fill out the form below and Molly will be in touch within one business day to set up your consultation call. No pressure — just a real conversation about what your session could look like. Most clients book their date directly on that call.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-(--color-border)">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="font-serif text-lg text-(--color-ink) group-hover:text-(--color-accent) transition-colors duration-200">
          {q}
        </span>
        <span
          className="text-(--color-accent) text-xl shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <p className="text-sm leading-relaxed text-(--color-muted) pb-5 pr-8">
          {a}
        </p>
      </div>
    </div>
  );
}

export function SEAFAQ() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">
            Questions
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            The Ones Everyone Asks{" "}
            <em className="italic">Before They Book</em>
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100} className="flex flex-col">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} {...faq} />
          ))}
        </AnimateOnScroll>

        <AnimateOnScroll delay={200} className="text-center pt-4">
          <p className="text-sm text-(--color-muted) mb-6">
            Have a question that isn&apos;t here? Reach out — Molly answers
            every inquiry personally.
          </p>
          <a
            href="#book"
            className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-(--color-accent) text-(--color-cream) px-8 py-4 hover:opacity-90 transition-opacity duration-300"
          >
            Book My Experience
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
