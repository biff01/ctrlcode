'use client'

import { useSyncExternalStore } from 'react'

export type Breakpoint = 'mobile' | 'tablet' | 'desktop'

// Matches the Tailwind defaults used across the site: md = 768px, lg = 1024px.
const MOBILE_Q = '(max-width: 767px)'
const TABLET_Q = '(max-width: 1023px)'

function subscribe(onChange: () => void) {
  const mobile = window.matchMedia(MOBILE_Q)
  const tablet = window.matchMedia(TABLET_Q)
  mobile.addEventListener('change', onChange)
  tablet.addEventListener('change', onChange)
  return () => {
    mobile.removeEventListener('change', onChange)
    tablet.removeEventListener('change', onChange)
  }
}

function getSnapshot(): Breakpoint {
  if (window.matchMedia(MOBILE_Q).matches) return 'mobile'
  if (window.matchMedia(TABLET_Q).matches) return 'tablet'
  return 'desktop'
}

/**
 * SSR renders the desktop snapshot, so the first client paint on a phone is
 * desktop-flavoured until hydration. Use this hook for BEHAVIOUR (menus,
 * modals, JS-computed geometry) — prefer fluid CSS (clamp/min/auto-fit) or
 * Tailwind responsive classes for pure styling.
 */
export function useBreakpoint(): Breakpoint {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'desktop')
}
