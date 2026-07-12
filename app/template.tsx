'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

// Remounts on every route change, giving each page a soft fade-and-rise
// entrance. Transform/opacity only — no layout shift, and MotionConfig
// (reducedMotion="user") drops the rise for reduced-motion users.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      id="main-content"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
