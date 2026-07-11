'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()
  useEffect(() => {
    // Instant, not smooth: the page-transition fade in app/template.tsx covers
    // the jump, and a visible smooth-scroll would fight it.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}
