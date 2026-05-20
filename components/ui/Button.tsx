"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  /**
   * When set, renders the button as a navigation element. Internal routes
   * (`/...`, no file extension) use next/link for SPA navigation; hashes,
   * tel:/mailto:, externals, and asset URLs fall through to a plain anchor.
   *
   * This is the supported way to make a button navigate — never wrap a
   * <Button> in an <a>/<Link> (invalid <a><button> nesting).
   */
  href: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  "aria-label"?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

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

function isInternalRoute(href: string): boolean {
  if (!href.startsWith("/")) return false;
  // Asset paths (.xml, .pdf, .webp, etc.) should hard-load, not SPA-navigate
  if (/\.[a-z0-9]{2,5}(\?|#|$)/i.test(href)) return false;
  return true;
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    const motionProps = {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      className: classes,
    };
    return isInternalRoute(href) ? (
      <motion.span {...motionProps}>
        <Link href={href} className="contents" aria-label={props["aria-label"]}>
          {children}
        </Link>
      </motion.span>
    ) : (
      <motion.a
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        aria-label={props["aria-label"]}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...buttonProps } = props;
  void _v; void _s; void _c; void _ch;
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      {...(buttonProps as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
