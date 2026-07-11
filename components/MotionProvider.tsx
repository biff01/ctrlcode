'use client'

import { MotionConfig } from 'framer-motion'

// The reduced-motion CSS override in globals.css only freezes CSS
// transitions/animations; framer-motion drives inline styles from JS, so it
// needs its own opt-out. reducedMotion="user" disables transform animations
// while keeping opacity fades — the WCAG-aligned behaviour.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
