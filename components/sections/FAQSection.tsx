"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { motionDurations, motionEasings } from "@/lib/motion.config";
import { Button } from "@/components/ui";

export interface FAQ {
  q: string;
  a: string;
}

export const DEFAULT_FAQS: FAQ[] = [
  {
    q: "Do I need experience in front of a camera?",
    a: "Not at all. Most clients have never done a session like this before. Every pose, every expression, every angle is guided — you simply follow along. By the end, most people forget they were ever nervous.",
  },
  {
    q: "What should I wear?",
    a: "You'll receive a full wardrobe guide after booking that covers what works for different body types, what to avoid, and how to prepare. There's also an in-studio accessory closet available during your session.",
  },
  {
    q: "How long does a session take?",
    a: "Sessions are typically two hours. This gives us enough time to settle in, work through multiple looks, and make sure you never feel rushed. The consultation before and gallery reveal after are scheduled separately.",
  },
  {
    q: "When will I see my photos?",
    a: "Your gallery reveal is typically scheduled within a few weeks of your session. You'll see your edited images for the first time at a private reveal appointment, and you only choose what you love.",
  },
  {
    q: "Is this experience right for me?",
    a: "If you've been thinking about doing something just for yourself — whether it's a gift, a milestone, a confidence reset, or simply because you're tired of waiting for the right time — then yes. This experience was made for you.",
  },
  {
    q: "How do I book?",
    a: "Fill out the contact form below and you'll hear back personally within 24 hours. There's no pressure — it's just a conversation to answer your questions and help you figure out if this feels right.",
  },
];

function FAQItem({ q, a }: FAQ) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div variants={fadeUp} className="border-b border-(--color-border)">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 cursor-pointer group"
        aria-expanded={open}
      >
        <span className="font-serif text-lg font-normal text-(--color-ink) group-hover:text-(--color-accent) transition-colors">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: motionDurations.xs }}
          className="text-2xl leading-none text-(--color-muted) shrink-0"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: motionDurations.sm, ease: motionEasings.out }}
            className="overflow-hidden"
          >
            <p className="text-sm text-(--color-muted) leading-relaxed pb-6 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export interface FAQSectionProps {
  eyebrow?: string;
  headline?: React.ReactNode;
  faqs?: FAQ[];
  footerText?: string;
  footerCtaLabel?: string;
  footerCtaHref?: string;
}

export function FAQSection({
  eyebrow = "Got Questions",
  headline = (
    <>
      Frequently Asked <em className="italic">Questions</em>
    </>
  ),
  faqs = DEFAULT_FAQS,
  footerText = "Still have questions? Reach out — happy to help.",
  footerCtaLabel = "Get In Touch",
  footerCtaHref = "#contact",
}: FAQSectionProps = {}) {
  return (
    <section className="bg-(--color-cream) py-[var(--space-section-y)] px-[var(--space-section-x)]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-[var(--space-heading-body-gap)]"
        >
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">
            {eyebrow}
          </span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-[var(--space-heading-eyebrow-gap)] md:text-5xl">
            {headline}
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mt-12"
        >
          {footerText && (
            <p className="text-sm text-(--color-muted) mb-4">{footerText}</p>
          )}
          {footerCtaLabel && footerCtaHref && (
            <a href={footerCtaHref}>
              <Button variant="ghost">{footerCtaLabel}</Button>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
