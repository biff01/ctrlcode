'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

/** Storage key next-themes reads on ctrlcode.uz. Must stay in sync with that site. */
const CTRLCODE_THEME_KEY = 'ctrlcode-theme'

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
})

export function useTheme() {
  return useContext(ThemeCtx)
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved === 'light' || saved === 'dark') setTheme(saved)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    // ctrlcode.uz boots next-themes from this key. In production it is served from
    // the same origin, so mirroring the theme here makes a "View Live Product" link
    // open in whichever mode the app is currently in. Off-origin (dev, or the
    // hirehubgroup.uz / softms.io links) this write is simply inert.
    localStorage.setItem(CTRLCODE_THEME_KEY, theme)
  }, [theme, mounted])

  return (
    <ThemeCtx.Provider value={{ theme, toggle: () => setTheme(t => t === 'dark' ? 'light' : 'dark') }}>
      {children}
    </ThemeCtx.Provider>
  )
}
