"use client";

import { motion } from "framer-motion";

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium transition-colors duration-300 cursor-pointer border";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-(--color-cream) text-(--color-ink) border-(--color-ink) hover:bg-(--color-ink) hover:text-(--color-cream)",
  ghost:
    "bg-transparent text-(--color-ink) border-(--color-ink) hover:bg-(--color-ink) hover:text-(--color-cream)",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-6 py-3",
  lg: "px-8 py-4",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
