"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { Button } from "@/components/ui";

const faqs = [
  {
    q: "Do I need to know how to swim?",
    a: "No. As long as you can tread water comfortably, you\u2019re qualified for this session. The goal isn\u2019t swimming \u2014 it\u2019s floating, posing, and capturing graceful movement. Jennifer\u2019s private pool is 5.5 feet deep at its deepest point, so most clients can touch the bottom. Pool noodles are also available between shots if you want extra support. Jennifer has never had a session she couldn\u2019t make work.",
  },
  {
    q: "How long do I have to hold my breath?",
    a: "About 10 to 15 seconds per shot \u2014 that\u2019s it. Between each frame, you surface, breathe normally, and go again when you\u2019re ready. Jennifer never rushes the pace. If you need three minutes between shots, you take three minutes. Your comfort determines the rhythm of the entire session.",
  },
  {
    q: "Is there a lifeguard or safety assistant on-site?",
    a: "Yes \u2014 always. Safety is Jennifer\u2019s first priority, and a dedicated safety swimmer is present at every single session. Their only job is to monitor the environment, assist if needed, and ensure the water stays controlled and comfortable. You are never in the water unsupervised.",
  },
  {
    q: "What if I panic or need a break?",
    a: "You just say so. The session pauses immediately, no questions asked. It\u2019s completely normal to need a moment to reset \u2014 underwater photography is a new sensory experience for most people. Jennifer also does a full dry-land rehearsal before anyone gets wet, so by the time you\u2019re in the water, nothing feels like a surprise.",
  },
  {
    q: "What\u2019s the difference between the pool and the springs?",
    a: "Jennifer\u2019s private saltwater pool runs 80\u201390\u00b0F depending on the season \u2014 warm, controlled, and low-chlorine. The natural Florida springs run 72\u201374\u00b0F year-round, which feels refreshing in summer and warm in cooler months. The springs produce extraordinary light and color that no pool can replicate. Jennifer helps you choose based on your vision and the look you\u2019re going for.",
  },
  {
    q: "What should I wear? Do you provide wardrobe?",
    a: "Jennifer has an extensive wardrobe of couture gowns, flowing silks, lingerie, and mermaid tails \u2014 all purchased specifically for underwater photography. You\u2019re welcome to bring your own pieces too (some fabrics work better in water than others \u2014 Jennifer will advise). After booking, you\u2019ll receive a full wardrobe guide covering exactly what to bring and what to expect.",
  },
  {
    q: "I don\u2019t know how to pose. Will I look stiff?",
    a: "You\u2019re not hiring Jennifer just to press a button \u2014 you\u2019re hiring her expertise in posing, lighting, and movement. She is in the water with you for every shot, directing your hands, hair, fabric, and expression in real time. You don\u2019t need to know how to pose. You just need to show up and follow her lead.",
  },
  {
    q: "Can I open my eyes underwater? What about makeup?",
    a: "Many of Jennifer\u2019s most stunning images are shot with eyes closed \u2014 it creates an ethereal, dreamy quality that open eyes can\u2019t replicate. If you\u2019re comfortable opening them, she\u2019ll try both. For makeup, waterproof mascara and minimal eye products work best. In the water, your hair becomes full, flowing, and dramatic in ways that surprise almost everyone.",
  },
  {
    q: "How long is the session?",
    a: "Most underwater sessions run about two hours in the water, plus time for the dry-land rehearsal and wardrobe. Underwater photography is physically engaging, and two hours tends to be the sweet spot where everyone is still having a great time and no one is exhausted. Jennifer takes plenty of breaks throughout.",
  },
  {
    q: "When will I see my photos?",
    a: "Your fully edited gallery is delivered within two to three weeks. High-resolution digital files, ready to print at any size. Wall art, albums, and custom prints are available to order directly. Jennifer also offers a reveal appointment where you see everything together for the first time \u2014 which clients consistently describe as one of the best parts of the whole experience.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
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
          transition={{ duration: 0.2 }}
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
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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

export function UnderwaterFAQ() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">Common Questions</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-3 md:text-5xl">
            Everything You Want to Know{" "}
            <em className="italic">Before You Dive In</em>
          </h2>
          <p className="mt-4 text-sm text-(--color-muted) leading-relaxed">
            If your question isn&apos;t here, reach out below. Jennifer answers personally.
          </p>
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
          <p className="text-sm text-(--color-muted) mb-4">Still unsure? Schedule a free consultation call. No commitment, no pitch.</p>
          <a href="#contact"><Button variant="ghost">Schedule My Free Consultation</Button></a>
        </motion.div>
      </div>
    </section>
  );
}
