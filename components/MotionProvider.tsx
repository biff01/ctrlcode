'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

// The reduced-motion CSS override in globals.css only freezes CSS
// transitions/animations; framer-motion drives inline styles from JS, so it
// needs its own opt-out. reducedMotion="user" disables transform animations
// while keeping opacity fades — the WCAG-aligned behaviour.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.55 }}>{children}</MotionConfig>
}
