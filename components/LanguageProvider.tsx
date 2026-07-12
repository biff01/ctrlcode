'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { translations } from '@/lib/translations'

export type Lang = 'en' | 'ru' | 'uz'

const LANG_ORDER: Lang[] = ['uz', 'en', 'ru']

const LangCtx = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  t: (s: string) => string
}>({
  lang: 'uz',
  setLang: () => {},
  t: (s) => s,
})

export function useLang() {
  return useContext(LangCtx)
}

export default function LanguageProvider({
  children,
  initialLang = 'uz',
}: {
  children: ReactNode
  initialLang?: Lang
}) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  // Persist to cookie so the server reads the right lang on next request
  useEffect(() => {
    document.cookie = `lang=${lang};path=/;max-age=31536000;SameSite=Lax`
  }, [lang])

  const t = useCallback(
    (s: string) => {
      if (lang === 'en') return s
      return translations[lang]?.[s] ?? s
    },
    [lang]
  )

  const value = useMemo(
    () => ({ lang, setLang: setLangState, t }),
    [lang, t]
  )

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>
}
