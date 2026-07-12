'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import type { ReactNode } from 'react'

type Theme = 'dark' | 'light'

/** 'theme' is the authoritative key for this app's own reads. */
const LOCAL_THEME_KEY = 'theme'

/** Storage key next-themes reads on ctrlcode.uz. Must stay in sync with that site.
 *  Both keys are written on every theme change so the production site inherits the
 *  user's choice when opened from the same origin. Reads prefer LOCAL_THEME_KEY
 *  first, then fall back to CTRLCODE_THEME_KEY so sessions started on ctrlcode.uz
 *  carry over correctly. */
const CTRLCODE_THEME_KEY = 'ctrlcode-theme'

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
})

export function useTheme() {
  return useContext(ThemeCtx)
}

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){var t=localStorage.getItem('theme')||localStorage.getItem('ctrlcode-theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t)})()`,
      }}
    />
  )
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = (localStorage.getItem(LOCAL_THEME_KEY) ?? localStorage.getItem(CTRLCODE_THEME_KEY)) as Theme | null
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(LOCAL_THEME_KEY, theme)
    // ctrlcode.uz boots next-themes from this key. In production it is served from
    // the same origin, so mirroring the theme here makes a "View Live Product" link
    // open in whichever mode the app is currently in. Off-origin (dev, or the
    // hirehubgroup.uz / softms.io links) this write is simply inert.
    localStorage.setItem(CTRLCODE_THEME_KEY, theme)
  }, [theme, mounted])

  const toggle = useCallback(() => {
    const html = document.documentElement
    const next: Theme = theme === 'dark' ? 'light' : 'dark'

    // Apply theme synchronously so the browser captures the new CSS-variable state
    // before/after the transition (both VT and the fallback path need this).
    const commit = () => {
      html.setAttribute('data-theme', next)
      localStorage.setItem(LOCAL_THEME_KEY, next)
      localStorage.setItem(CTRLCODE_THEME_KEY, next)
      setTheme(next)
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!reduced && 'startViewTransition' in document) {
      // View Transitions API: flushSync forces React to fully re-render before the
      // browser captures the new-state snapshot, so all inline styles (not just
      // CSS-variable-based ones) are already in their final state when the cross-fade runs.
      ;(document as Document & { startViewTransition: (cb: () => void) => void })
        .startViewTransition(() => flushSync(commit))
    } else if (!reduced) {
      // Fallback: flushSync ensures all React components re-render in one synchronous
      // batch while the theme-transitioning class is active, so every element transitions
      // at the same time rather than section-by-section.
      html.classList.add('theme-transitioning')
      flushSync(commit)
      setTimeout(() => html.classList.remove('theme-transitioning'), 450)
    } else {
      commit()
    }
  }, [theme])
  const ctxValue = useMemo(() => ({ theme, toggle }), [theme, toggle])

  return (
    <ThemeCtx.Provider value={ctxValue}>
      {children}
    </ThemeCtx.Provider>
  )
}
