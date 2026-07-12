'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()
  useEffect(() => {
    // Force instant scroll even on engines that ignore behavior:'instant'.
    // Temporarily suppress CSS scroll-behavior:smooth so the jump is synchronous.
    // The page-transition fade in app/template.tsx covers the visual jump.
    const el = document.documentElement
    const prev = el.style.scrollBehavior
    el.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    el.style.scrollBehavior = prev
  }, [pathname])
  return null
}
