"use client";
import { m, type Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface AnimateInProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

export function AnimateIn({ children, variants = fadeUp, className = "", delay = 0 }: AnimateInProps) {
  return (
    <m.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}
