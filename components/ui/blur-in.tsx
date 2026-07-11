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
  duration?: number;
  /** Stagger the entrance (seconds). */
  delay?: number;
}

const BlurIn = ({
  word,
  children,
  className,
  style,
  variant,
  duration = 1,
  delay = 0,
}: BlurInProps) => {
  const defaultVariants: Variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{ duration, delay }}
      variants={combinedVariants}
      style={style}
      className={cn(
        // Default shadcn typography only applies to the plain-`word` usage;
        // when `children` is supplied the caller owns the styling.
        !children &&
          "font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]",
        className,
      )}
    >
      {children ?? word}
    </motion.h1>
  );
};

export { BlurIn };
