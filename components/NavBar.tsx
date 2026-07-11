'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLang } from './LanguageProvider'

// Both lockups render; globals.css shows the one matching the active theme so the
// swap happens on first paint rather than after ThemeProvider mounts.
function CtrlCodeLogo({ height = 30 }: { height?: number }) {
  const width = Math.round(height * (16363 / 3503))
  return (
    <>
      <Image
        className="logo-dark"
        src="/logo-dark.png"
        alt="Ctrl Code"
        width={width}
        height={height}
        preload
      />
      <Image
        className="logo-light"
        src="/logo-light.png"
        alt="Ctrl Code"
        width={width}
        height={height}
        preload
      />
    </>
  )
}

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Price', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
]

const DARK_PILL_SHADOW = 'inset 0 3px 8px rgba(0,0,0,0.75), inset 0 1px 3px rgba(0,0,0,0.6)'
const WHITE_INDICATOR_BG = 'linear-gradient(180deg, #ffffff 0%, #e8e8e8 100%)'
const WHITE_INDICATOR_SHADOW = [
  // Inset (inside-the-shape) shadows only. The outer drop shadows were removed
  // because, with the thin dark frames, they bled past the pill/circle onto the page.
  'inset 0 0 18px rgba(0,0,0,0.18)',
  'inset 0 4px 10px rgba(0,0,0,0.12)',
].join(', ')

export default function NavBar() {
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const { lang, setLang, t } = useLang()

  const LANG_ORDER: Array<'uz' | 'en' | 'ru'> = ['uz', 'en', 'ru']
  const SEG_W = 48
  const PILL_H = 52
  const PAD = 4
  const INDICATOR_H = PILL_H - PAD * 2
  const activeIdx = LANG_ORDER.indexOf(lang)

  // The toggle's black ring is the padding around its white button. Kept separate
  // from PAD so thinning the ring doesn't also thin the language pill.
  const TOGGLE_RING = 2
  const TOGGLE_BTN = PILL_H - TOGGLE_RING * 2

  // Sliding nav indicator — measure actual link positions (variable widths per language)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [navInd, setNavInd] = useState({ left: 0, top: 0, width: 0, height: 0, visible: false })

  function isActive(href: string, label: string) {
    if (label === 'Home') return pathname === '/'
    if (label === 'Services') return pathname.startsWith('/services')
    if (label === 'Portfolio') return pathname.startsWith('/portfolio')
    if (label === 'Price') return pathname.startsWith('/pricing')
    if (label === 'Contact') return pathname.startsWith('/contact')
    return false
  }

  useLayoutEffect(() => {
    const activeIndex = NAV_LINKS.findIndex(({ label, href }) => isActive(href, label))
    const container = navContainerRef.current
    const activeEl = activeIndex !== -1 ? navLinkRefs.current[activeIndex] : null
    if (!container || !activeEl) {
      setNavInd(prev => ({ ...prev, visible: false }))
      return
    }
    const cRect = container.getBoundingClientRect()
    const eRect = activeEl.getBoundingClientRect()
    setNavInd({
      left: eRect.left - cRect.left,
      top: eRect.top - cRect.top,
      width: eRect.width,
      height: eRect.height,
      visible: true,
    })
  }, [pathname, lang])

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 flex justify-center"
      style={{ padding: '18px 120px' }}
    >
      <div
        className="flex items-center justify-between w-full rounded-full"
        style={{
          maxWidth: 1200,
          background: 'var(--nav-glass)',
          backdropFilter: 'blur(50px)',
          WebkitBackdropFilter: 'blur(50px)',
          border: '1px solid var(--border)',
          padding: '10px 16px 10px 20px',
          transition: 'background 0.25s ease, border-color 0.25s ease',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" style={{ textDecoration: 'none' }}>
          <CtrlCodeLogo height={30} />
        </Link>

        {/* Nav pill — single sliding indicator over variable-width links */}
        <div
          ref={navContainerRef}
          className="flex items-center gap-1 rounded-full"
          style={{
            position: 'relative',
            background: '#0e0e0e',
            padding: '5px 6px',
            boxShadow: DARK_PILL_SHADOW,
          }}
        >
          {/* Absolutely-positioned sliding indicator */}
          {navInd.visible && (
            <span
              aria-hidden
              style={{
                position: 'absolute',
                top: navInd.top,
                left: navInd.left,
                width: navInd.width,
                height: navInd.height,
                borderRadius: 999,
                background: WHITE_INDICATOR_BG,
                boxShadow: WHITE_INDICATOR_SHADOW,
                pointerEvents: 'none',
                transition: 'left 0.28s cubic-bezier(0.22, 1, 0.36, 1), width 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
                zIndex: 0,
              }}
            />
          )}

          {NAV_LINKS.map(({ label, href }, i) => {
            const active = isActive(href, label)
            return (
              <Link
                key={label}
                href={href}
                ref={(el) => { navLinkRefs.current[i] = el }}
                className="rounded-full font-body"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  padding: '7px 18px',
                  fontSize: 13,
                  fontWeight: 600,
                  color: active ? '#0e0e0e' : 'rgba(255,255,255,0.42)',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'color 0.25s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {t(label)}
              </Link>
            )
          })}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-[10px]">
          {/* Language switcher — dark pill, white 3D floating indicator */}
          <div
            role="tablist"
            aria-label="Change language"
            style={{
              position: 'relative',
              display: 'flex',
              height: PILL_H,
              padding: PAD,
              borderRadius: 999,
              background: '#0e0e0e',
              boxShadow: DARK_PILL_SHADOW,
            }}
          >
            <span
              aria-hidden
              style={{
                position: 'absolute',
                top: PAD,
                left: PAD,
                width: SEG_W,
                height: INDICATOR_H,
                borderRadius: 999,
                background: WHITE_INDICATOR_BG,
                boxShadow: WHITE_INDICATOR_SHADOW,
                transform: `translateX(${activeIdx * SEG_W}px)`,
                transition: 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
                pointerEvents: 'none',
              }}
            />
            {LANG_ORDER.map((l) => {
              const active = lang === l
              return (
                <button
                  key={l}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setLang(l)}
                  className="font-mono"
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: SEG_W,
                    height: INDICATOR_H,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 11,
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                    fontWeight: active ? 800 : 500,
                    color: active ? '#0e0e0e' : 'rgba(255,255,255,0.38)',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {l}
                </button>
              )
            })}
          </div>

          {/* Theme toggle — dark circle, white 3D floating button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: PILL_H,
              height: PILL_H,
              borderRadius: 999,
              background: '#0e0e0e',
              padding: TOGGLE_RING,
              boxShadow: DARK_PILL_SHADOW,
              flexShrink: 0,
            }}
          >
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: TOGGLE_BTN,
                height: TOGGLE_BTN,
                borderRadius: 999,
                background: WHITE_INDICATOR_BG,
                boxShadow: WHITE_INDICATOR_SHADOW,
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              {theme === 'dark'
                ? <Sun style={{ width: 17, height: 17, color: '#0e0e0e' }} />
                : <Moon style={{ width: 17, height: 17, color: '#0e0e0e' }} />
              }
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
