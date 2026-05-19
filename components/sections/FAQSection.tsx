"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { motionDurations, motionEasings } from "@/lib/motion.config";
import { Button } from "@/components/ui";
import { DEFAULT_FAQS, type FAQ } from "./faq-data";

export { DEFAULT_FAQS, type FAQ };

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
