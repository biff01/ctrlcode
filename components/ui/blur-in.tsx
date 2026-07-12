"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface BlurInProps {
  /** Plain-text word to render. Ignored when `children` is provided. */
  word?: string;
  /** Rich content (translated text, line breaks, spans). Overrides `word`. */
  children?: ReactNode;
  className?: string;
  /** Inline styles — lets callers keep their own per-page typography. */
  style?: CSSProperties;
  variant?: Variants;
  /** Animation duration in seconds. Recommended range: 0.4–0.8. */
  duration?: number;
  /** Stagger the entrance (seconds). */
  delay?: number;
  /** Semantic element rendered by the component. Defaults to 'h1'. */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const DEFAULT_VARIANTS: Variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const BlurIn = ({
  word,
  children,
  className,
  style,
  variant,
  duration = 0.7,
  delay = 0,
  as = 'h1',
}: BlurInProps) => {
  const combinedVariants = variant ?? DEFAULT_VARIANTS;
  const MotionTag = motion[as];

  const resolvedStyle: CSSProperties | undefined = !children
    ? {
        fontSize: 'clamp(2.25rem, 5vw + 1rem, 4.5rem)',
        lineHeight: 'var(--lh-hero, 1.1)',
        letterSpacing: 'var(--tracking-heading, -0.02em)',
        ...style,
      }
    : style;

  return (
    <MotionTag
      initial="hidden"
      animate="visible"
      transition={{ type: 'tween', duration, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={combinedVariants}
      style={resolvedStyle}
      className={cn(
        // Default shadcn typography only applies to the plain-`word` usage;
        // when `children` is supplied the caller owns the styling.
        !children &&
          "font-display text-center font-bold drop-shadow-sm",
        className,
      )}
    >
      {children ?? word}
    </MotionTag>
  );
};

export { BlurIn };
