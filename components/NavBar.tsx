'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useLayoutEffect, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, ChevronRight } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLang } from './LanguageProvider'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname.startsWith(href)
}

// Inline brand icons — lucide-react doesn't ship social platform icons
const IconInstagram = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)
const IconTelegram = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)
const IconYoutube = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)

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
        priority
      />
      <Image
        className="logo-light"
        src="/logo-light.png"
        alt="Ctrl Code"
        width={width}
        height={height}
        priority
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

const LANG_ORDER: Array<'uz' | 'en' | 'ru'> = ['uz', 'en', 'ru']

const DARK_PILL_SHADOW = 'inset 0 3px 8px rgba(0,0,0,0.75), inset 0 1px 3px rgba(0,0,0,0.6)'

// Dome surface: bright white at centre, visible mid-grey fade at the full rim.
// Centre highlight sits at 34% (above midpoint) for natural top-down lighting.
const WHITE_INDICATOR_BG =
  'radial-gradient(circle at 50% 34%, #ffffff 0%, #f5f5f5 45%, #d2d2d2 100%)'

// Neumorphic raised-disc shadow stack:
//   outer  — lifts disc clearly off the dark pill
//   inset 0 0 12px — zero-offset vignette: equal blur on every inner edge simultaneously
//   inset spread   — hair-thin inner ring defines the disc edge cleanly
//   inset bottom   — directional shade deepens the convex belly
const WHITE_INDICATOR_SHADOW = [
  '0 2px 9px rgba(0,0,0,0.38)',
  '0 1px 2px rgba(0,0,0,0.26)',
  'inset 0 0 12px rgba(0,0,0,0.18)',
  'inset 0 0 0 1px rgba(0,0,0,0.07)',
  'inset 0 -3px 6px rgba(0,0,0,0.14)',
].join(', ')

const SEG_W = 48
const PILL_H = 48
const PAD = 4
const INDICATOR_H = PILL_H - PAD * 2
const CIRCLE_D = 38 // language indicator is a true circle, inset from the pill on every side
const TOGGLE_RING = 2
const TOGGLE_BTN = PILL_H - TOGGLE_RING * 2

const NAV_INNER_STYLE = {
  maxWidth: 1200,
  background: 'var(--nav-glass)',
  backdropFilter: 'blur(50px)',
  WebkitBackdropFilter: 'blur(50px)',
  border: '1px solid var(--border)',
  padding: '8px 16px 8px 20px',
  transition: 'background 0.25s ease, border-color 0.25s ease',
}

const SOCIAL_LINKS = [
  { icon: <IconInstagram size={20} />, href: 'https://instagram.com/ctrlcode.uz', label: 'Instagram' },
  { icon: <IconTelegram size={20} />, href: 'https://t.me/ctrlcode', label: 'Telegram' },
  { icon: <IconYoutube size={20} />, href: 'https://youtube.com/@ctrlcode', label: 'YouTube' },
]

export default function NavBar() {
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const { lang, setLang, t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredLinkIdx, setHoveredLinkIdx] = useState<number | null>(null)

  const activeIdx = LANG_ORDER.indexOf(lang)

  // Sliding nav indicator — measure actual link positions (variable widths per language)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const drawerRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const desktopLangRefs = useRef<(HTMLButtonElement | null)[]>([])
  const mobileLangRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [navInd, setNavInd] = useState({ left: 0, top: 0, width: 0, height: 0, visible: false })

  const measureNav = useCallback(() => {
    const activeIndex = NAV_LINKS.findIndex(({ href }) => isActive(pathname, href))
    const container = navContainerRef.current
    const activeEl = activeIndex !== -1 ? navLinkRefs.current[activeIndex] : null
    if (!container || !activeEl) {
      setNavInd(prev => ({ ...prev, visible: false }))
      return
    }
    const cRect = container.getBoundingClientRect()
    const eRect = activeEl.getBoundingClientRect()
    // display:none below lg — rects collapse to 0; hide the indicator instead.
    if (eRect.width === 0) {
      setNavInd(prev => ({ ...prev, visible: false }))
      return
    }
    setNavInd({
      left: eRect.left - cRect.left,
      top: eRect.top - cRect.top,
      width: eRect.width,
      height: eRect.height,
      visible: true,
    })
  }, [pathname])

  useIsomorphicLayoutEffect(() => {
    measureNav()
    const ro = new ResizeObserver(measureNav)
    if (navContainerRef.current) ro.observe(navContainerRef.current)
    return () => ro.disconnect()
  }, [pathname, lang, measureNav])

  // Drawer lifecycle: close on navigation, on Escape, lock body scroll, and trap focus while open.
  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        hamburgerRef.current?.focus()
        return
      }
      if (e.key === 'Tab') {
        const drawer = drawerRef.current
        if (!drawer) return
        const focusable = Array.from(
          drawer.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'
          )
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
      'a[href], button:not([disabled])'
    )
    firstFocusable?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  return (
    <>
    <motion.header
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 flex justify-center px-5 py-3 lg:px-[120px] lg:py-5"
    >
      <div
        className="flex items-center justify-between w-full rounded-full"
        style={NAV_INNER_STYLE}
      >
        {/* Logo — position:relative + explicit z-index keeps it above any overlay
            elements regardless of stacking-context changes in sibling nodes. */}
        <Link href="/" className="flex items-center shrink-0 btn-fade" style={{ textDecoration: 'none', position: 'relative', zIndex: 10 }}>
          <CtrlCodeLogo height={30} />
        </Link>

        {/* Nav pill — single sliding indicator over variable-width links (desktop only) */}
        <div
          ref={navContainerRef}
          className="hidden lg:flex items-center gap-1 rounded-full"
          style={{
            position: 'relative',
            background: '#1a1a1a',
            padding: '4px 8px',
            boxShadow: DARK_PILL_SHADOW,
            flexShrink: 1,
            overflow: 'hidden',
          }}
        >
          {/* Absolutely-positioned sliding indicator */}
          <AnimatePresence>
            {navInd.visible && (
              <motion.span
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.23, ease: [0.22, 1, 0.36, 1] }}
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
                  transition: 'left 0.35s cubic-bezier(0.22, 1, 0.36, 1), width 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.23s ease',
                  zIndex: 0,
                }}
              />
            )}
          </AnimatePresence>

          {NAV_LINKS.map(({ label, href }, i) => {
            const active = isActive(pathname, href)
            return (
              <Link
                key={label}
                href={href}
                ref={(el) => { navLinkRefs.current[i] = el }}
                className={`rounded-full font-body${active ? '' : ' nav-link'}`}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  color: active ? '#111111' : 'rgba(255,255,255,0.58)',
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
        <div className="flex items-center gap-3">
          {/* Language switcher — dark pill, white 3D floating indicator (desktop only;
              the drawer carries its own full-width copy below lg) */}
          <div
            role="tablist"
            aria-label={t('Change language')}
            className="hidden lg:flex"
            style={{
              position: 'relative',
              height: PILL_H,
              padding: PAD,
              borderRadius: 999,
              background: '#1a1a1a',
              boxShadow: DARK_PILL_SHADOW,
            }}
          >
            <span
              aria-hidden
              style={{
                position: 'absolute',
                top: (PILL_H - CIRCLE_D) / 2,
                left: PAD + (SEG_W - CIRCLE_D) / 2,
                width: CIRCLE_D,
                height: CIRCLE_D,
                borderRadius: '50%',
                background: WHITE_INDICATOR_BG,
                boxShadow: WHITE_INDICATOR_SHADOW,
                transform: `translateX(${activeIdx * SEG_W}px)`,
                transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                pointerEvents: 'none',
              }}
            />
            {LANG_ORDER.map((l, i) => {
              const active = lang === l
              return (
                <motion.button
                  key={l}
                  ref={(el) => { desktopLangRefs.current[i] = el }}
                  role="tab"
                  aria-selected={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setLang(l)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') {
                      e.preventDefault()
                      const next = (i + 1) % LANG_ORDER.length
                      setLang(LANG_ORDER[next])
                      desktopLangRefs.current[next]?.focus()
                    } else if (e.key === 'ArrowLeft') {
                      e.preventDefault()
                      const prev = (i - 1 + LANG_ORDER.length) % LANG_ORDER.length
                      setLang(LANG_ORDER[prev])
                      desktopLangRefs.current[prev]?.focus()
                    }
                  }}
                  className="font-mono"
                  whileHover={!active ? { filter: 'brightness(1.65)', transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } } : {}}
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
                    color: active ? '#111111' : 'rgba(255,255,255,0.58)',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {l}
                </motion.button>
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
              background: 'rgba(14,14,14,0.5)',
              padding: TOGGLE_RING,
              boxShadow: DARK_PILL_SHADOW,
              flexShrink: 0,
            }}
          >
            <button
              onClick={toggle}
              aria-label={t('Toggle theme')}
              className="press btn-fade"
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
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.23, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex' }}
                >
                  {theme === 'dark'
                    ? <Sun style={{ width: 17, height: 17, color: '#0e0e0e' }} />
                    : <Moon style={{ width: 17, height: 17, color: '#0e0e0e' }} />
                  }
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* Hamburger — same dark-ring / white-button language as the theme toggle */}
          <div
            className="flex lg:hidden"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: PILL_H,
              height: PILL_H,
              borderRadius: 999,
              background: 'rgba(14,14,14,0.5)',
              padding: TOGGLE_RING,
              boxShadow: DARK_PILL_SHADOW,
              flexShrink: 0,
            }}
          >
            <button
              ref={hamburgerRef}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t('Close menu') : t('Open menu')}
              aria-expanded={menuOpen}
              className="press btn-fade"
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
              {/* Fixed-size wrapper so the X and hamburger icons occupy
                  identical space — position:absolute children mean neither
                  icon can shift the button's layout when it appears. */}
              <span style={{ position: 'relative', width: 18, height: 18, display: 'block', flexShrink: 0 }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={menuOpen ? 'close' : 'open'}
                    initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                    transition={{ duration: 0.23, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {menuOpen
                      ? <X style={{ width: 18, height: 18, color: '#0e0e0e' }} />
                      : <Menu style={{ width: 18, height: 18, color: '#0e0e0e' }} />
                    }
                  </motion.span>
                </AnimatePresence>
              </span>
            </button>
          </div>
        </div>
      </div>

    </motion.header>

      {/* Mobile full-screen menu — z-51 covers the sticky header */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="fullscreen-menu"
            ref={drawerRef}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.40, ease: [0.22, 1, 0.36, 1] }}
            aria-label={t('Site menu')}
            aria-modal="true"
            role="dialog"
            className="lg:hidden"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 51,
              background: 'var(--bg)',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* ── Top bar: logo + close ── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 20px',
              borderBottom: '1px solid var(--border)',
              flexShrink: 0,
            }}>
              <Link href="/" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', display: 'flex' }}>
                <CtrlCodeLogo height={28} />
              </Link>
              <button
                onClick={() => { setMenuOpen(false); hamburgerRef.current?.focus() }}
                aria-label={t('Close menu')}
                className="press btn-fade"
                style={{
                  width: 44, height: 44, borderRadius: 999,
                  background: 'var(--nav-btn)',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <X style={{ width: 18, height: 18, color: 'var(--text-primary)' }} />
              </button>
            </div>

            {/* ── Nav links ── */}
            <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV_LINKS.map(({ label, href }, i) => {
                const active = isActive(pathname, href)
                const hovered = hoveredLinkIdx === i
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.33, delay: 0.06 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={href}
                      className="font-body"
                      onMouseEnter={() => setHoveredLinkIdx(i)}
                      onMouseLeave={() => setHoveredLinkIdx(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 16px',
                        borderRadius: 14,
                        fontSize: 17,
                        fontWeight: active ? 600 : 500,
                        color: active ? 'var(--nav-accent)' : 'var(--text-primary)',
                        background: active
                          ? 'var(--surface-3)'
                          : hovered ? 'var(--surface-3)' : 'transparent',
                        textDecoration: 'none',
                        transition: 'background 0.18s ease, color 0.18s ease',
                      }}
                    >
                      {t(label)}
                      <ChevronRight style={{
                        width: 18, height: 18,
                        color: active ? 'var(--nav-accent)' : 'var(--text-muted)',
                      }} />
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* ── Social ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.38, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
              style={{ padding: '32px 32px 0' }}
            >
              <span className="font-mono" style={{
                fontSize: 11, letterSpacing: 1.4,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
              }}>
                {t('Social')}
              </span>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                {SOCIAL_LINKS.map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="btn-fade press"
                    style={{
                      width: 52, height: 52, borderRadius: 14,
                      background: 'var(--nav-btn)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'transform 0.22s ease, background-color 0.22s ease',
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>

            <div style={{ flex: 1 }} />

            {/* ── Bottom: language + CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ padding: '0 16px calc(env(safe-area-inset-bottom, 0px) + 32px)', display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              {/* Language */}
              <div
                role="tablist"
                aria-label={t('Change language')}
                style={{
                  display: 'flex', gap: 4,
                  background: 'var(--surface-3)',
                  borderRadius: 14, padding: 4,
                }}
              >
                {LANG_ORDER.map((l, i) => {
                  const active = lang === l
                  return (
                    <motion.button
                      key={l}
                      ref={(el) => { mobileLangRefs.current[i] = el }}
                      role="tab"
                      aria-selected={active}
                      tabIndex={active ? 0 : -1}
                      onClick={() => setLang(l)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowRight') {
                          e.preventDefault()
                          const next = (i + 1) % LANG_ORDER.length
                          setLang(LANG_ORDER[next])
                          mobileLangRefs.current[next]?.focus()
                        } else if (e.key === 'ArrowLeft') {
                          e.preventDefault()
                          const prev = (i - 1 + LANG_ORDER.length) % LANG_ORDER.length
                          setLang(LANG_ORDER[prev])
                          mobileLangRefs.current[prev]?.focus()
                        }
                      }}
                      className="font-mono"
                      whileHover={!active ? { filter: 'brightness(1.3)', transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } } : {}}
                      style={{
                        flex: 1, height: 48, border: 'none', borderRadius: 10,
                        background: active ? 'var(--nav-active-bg)' : 'transparent',
                        color: active ? 'var(--nav-active-color)' : 'var(--text-muted)',
                        fontWeight: active ? 700 : 500,
                        fontSize: 13, letterSpacing: 0.8, textTransform: 'uppercase',
                        cursor: 'pointer',
                        boxShadow: active ? '0 1px 6px rgba(0,0,0,0.12)' : 'none',
                        transition: 'background-color 0.22s ease, color 0.22s ease, box-shadow 0.22s ease',
                      }}
                    >
                      {l}
                    </motion.button>
                  )
                })}
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="font-body font-semibold btn-lift press"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  height: 56, borderRadius: 14,
                  background: 'var(--brand-cta-gradient, linear-gradient(135deg, #1a50cc 0%, #3b7ef6 100%))',
                  color: '#ffffff', fontSize: 16, fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: 'var(--brand-cta-shadow, 0 4px 20px rgba(26,80,204,0.35))',
                }}
              >
                {t('Start a project')}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
