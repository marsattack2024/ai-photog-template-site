"use client";
import { useRef, useEffect, useState } from "react";

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
      ? "translateX(-28px)"
      : from === "right"
      ? "translateX(28px)"
      : "translateY(20px)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : initialTransform,
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
