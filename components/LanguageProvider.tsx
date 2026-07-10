'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '@/lib/translations'

export type Lang = 'en' | 'ru' | 'uz'

const LANGS: Lang[] = ['en', 'ru', 'uz']

const LangCtx = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  cycle: () => void
  t: (s: string) => string
}>({
  lang: 'en',
  setLang: () => {},
  cycle: () => {},
  t: (s) => s,
})

export function useLang() {
  return useContext(LangCtx)
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'en' || saved === 'ru' || saved === 'uz') setLangState(saved)
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('lang', lang)
    document.documentElement.setAttribute('lang', lang)
  }, [lang, mounted])

  const setLang = (l: Lang) => setLangState(l)
  const cycle = () => setLangState((l) => LANGS[(LANGS.indexOf(l) + 1) % LANGS.length])

  const t = (s: string) => {
    if (lang === 'en') return s
    return translations[lang]?.[s] ?? s
  }

  return (
    <LangCtx.Provider value={{ lang, setLang, cycle, t }}>
      {children}
    </LangCtx.Provider>
  )
}
