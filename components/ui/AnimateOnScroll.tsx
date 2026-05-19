"use client";
import { useRef, useEffect, useState } from "react";
import { motionOffsets } from "@/lib/motion.config";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in milliseconds before the animation plays */
  delay?: number;
  /** Direction the element slides in from */
  from?: "bottom" | "left" | "right";
  /** IntersectionObserver threshold (0–1) */
  threshold?: number;
}

/**
 * Thin client wrapper for scroll-triggered entrance animations.
 * Section components remain server components — only this wrapper is client.
 */
export function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  from = "bottom",
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const initialTransform =
    from === "left"
      ? `translateX(-${motionOffsets.sm}px)`
      : from === "right"
      ? `translateX(${motionOffsets.sm}px)`
      : `translateY(${motionOffsets.xs}px)`;

  // Duration + easing read from CSS vars (see globals.css @theme); the global
  // prefers-reduced-motion @media block already neutralizes transition-duration.
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : initialTransform,
        transition: `opacity var(--motion-duration-md) var(--motion-ease-out) ${delay}ms, transform var(--motion-duration-md) var(--motion-ease-out) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
