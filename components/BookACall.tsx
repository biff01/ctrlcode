'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Globe } from 'lucide-react'
import Link from 'next/link'
import { useLang } from './LanguageProvider'
import { useTheme } from './ThemeProvider'
import { useBreakpoint } from '@/lib/useBreakpoint'

function XIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function DribbbleIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" strokeLinecap="round" />
    </svg>
  )
}

// Circle box is 92px, offset outward from the pill's corners by these amounts.
const CIRCLE_SIZE = 92
const OPEN_LEFT = -26
const OPEN_TOP = -44
const CLOSE_RIGHT = -26
const CLOSE_BOTTOM = -26

// Phone variants — smaller circles, gentler offsets, so the crescents stay
// inside a 375px viewport (the 24px page gutter absorbs the -14px overhang).
const M_CIRCLE_SIZE = 64
const M_OPEN_LEFT = -14
const M_OPEN_TOP = -24
const M_CLOSE_RIGHT = -14
const M_CLOSE_BOTTOM = -14

const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const socialItemVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.88 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
}

export default function BookACall() {
  const { t } = useLang()
  const { theme } = useTheme()
  const dark = theme === 'dark'

  // The cut-out mask below is JS-computed pixel geometry, so the responsive
  // constants have to come from JS too. We start with a null sentinel so that
  // SSR and the initial client render both produce the desktop layout, avoiding
  // a React hydration mismatch. The effect corrects to the real breakpoint after
  // hydration.
  const bp = useBreakpoint()
  const [mobile, setMobile] = useState<boolean | null>(null)
  useEffect(() => {
    setMobile(bp === 'mobile')
  }, [bp])

  const circleSize = (mobile ?? false) ? M_CIRCLE_SIZE : CIRCLE_SIZE
  const openLeft = (mobile ?? false) ? M_OPEN_LEFT : OPEN_LEFT
  const openTop = (mobile ?? false) ? M_OPEN_TOP : OPEN_TOP
  const closeRight = (mobile ?? false) ? M_CLOSE_RIGHT : CLOSE_RIGHT
  const closeBottom = (mobile ?? false) ? M_CLOSE_BOTTOM : CLOSE_BOTTOM
  // Quote glyph scales with its circle (178px / 67px at the desktop 92px box).
  const quoteFont = Math.round(178 * (circleSize / CIRCLE_SIZE))
  const quoteShift = Math.round(67 * (circleSize / CIRCLE_SIZE))

  // The pill is translucent, so any part of a quote circle behind it would smear
  // through the glass. Clip each circle to the crescent outside the pill instead.
  // A pill's cap radius is its declared radius clamped to half its height, which
  // depends on how the quote wraps — so measure it rather than assume 99.
  const pillRef = useRef<HTMLDivElement>(null)
  const [capR, setCapR] = useState(78)
  useEffect(() => {
    const el = pillRef.current
    if (!el) return
    const measure = () => setCapR(Math.min(99, el.getBoundingClientRect().height / 2))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Cut-out disc centered on the pill's corner arc, in each circle's own coordinates.
  const cutout = (cx: number, cy: number) =>
    `radial-gradient(circle at ${cx}px ${cy}px, transparent ${capR}px, #000 ${capR + 0.5}px)`
  const openMask = cutout(capR - openLeft, capR - openTop)
  const closeMask = cutout(
    circleSize + closeRight - capR,
    circleSize + closeBottom - capR,
  )

  const GLASS_CIRCLE = useMemo<React.CSSProperties>(() => ({
    position: 'absolute',
    width: circleSize,
    height: circleSize,
    borderRadius: '50%',
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: 'var(--glass-border)',
    boxShadow: 'var(--glass-shadow)',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
  }), [circleSize])

  const quoteColor = dark ? 'rgba(255,255,255,0.282)' : 'rgba(13,27,75,0.22)'

  return (
    <section
      className="max-lg:overflow-x-clip"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 13vw, 128px) 0',
        background: 'var(--cta-bg)',
      }}
    >
      {dark && (
        <>
          <div className="book-overlay" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(75% 165% at 70% 55%, #454545 0%, #040404 5%)', opacity: 0.86, pointerEvents: 'none' }} />
          <div className="book-overlay" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(55% 65% at 68% 54%, #454545 0%, transparent 100%)', opacity: 0.58, pointerEvents: 'none' }} />
          <div className="book-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #040404 0%, #111217 100%)', opacity: 0.92, pointerEvents: 'none' }} />
        </>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.12) 70%, transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Container */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(32px, 5.5vw, 48px)',
        }}
      >
        {/* Pill + quote circles wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', width: '100%' }}
        >
          {/* Opening quote glass — top-left corner of pill */}
          <div style={{ ...GLASS_CIRCLE, left: openLeft, top: openTop, alignItems: 'center', paddingTop: 0, maskImage: openMask, WebkitMaskImage: openMask }}>
            <span
              className="font-display font-bold select-none"
              style={{ fontSize: quoteFont, lineHeight: 1, color: quoteColor, flexShrink: 0, marginTop: quoteShift }}
            >
              &#x201C;
            </span>
          </div>

          {/* Closing quote glass — bottom-right corner of pill */}
          <div style={{ ...GLASS_CIRCLE, right: closeRight, bottom: closeBottom, alignItems: 'center', paddingTop: 0, maskImage: closeMask, WebkitMaskImage: closeMask }}>
            <span
              className="font-display font-bold select-none"
              style={{ fontSize: quoteFont, lineHeight: 1, color: quoteColor, flexShrink: 0, marginTop: quoteShift }}
            >
              &#x201D;
            </span>
          </div>

          {/* CTA pill */}
          <div
            ref={pillRef}
            style={{
              width: '100%',
              borderRadius: 100,
              background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: dark ? '1px solid rgba(255,255,255,0.11)' : '1px solid rgba(255,255,255,0.95)',
              boxShadow: dark
                ? '0 1px 0 rgba(255,255,255,0.09)'
                : '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(24px, 6vw, 40px) clamp(28px, 8vw, 80px)',
            }}
          >
            <p
              className="font-display font-normal text-center"
              style={{ fontSize: 'clamp(17px, 4.5vw, 26px)', letterSpacing: 'clamp(-1px, -0.13vw, -0.5px)', lineHeight: 1.45, color: 'var(--text-primary)' }}
            >
              {t("Ctrl Code — we don't just build websites, we craft digital experiences that make brands feel sharper, faster, and more powerful.")}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >
          <Link
            href="/contact"
            className="btn-lift press"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 32px',
              borderRadius: 100,
              background: dark ? '#ffffff' : '#0D1B4B',
              color: dark ? '#0a0a0a' : '#ffffff',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: -0.2,
              textDecoration: 'none',
            }}
          >
            {t('Book a call')} <ArrowUpRight style={{ width: 16, height: 16 }} />
          </Link>
        </motion.div>

        {/* Bottom content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainerVariants}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
        >
          {/* Social icons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <motion.a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="btn-lift press"
              variants={socialItemVariants}
              style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <XIcon />
            </motion.a>
            {[
              { icon: <Globe style={{ width: 18, height: 18, color: 'var(--text-tertiary)' }} />, href: 'https://ctrlcode.uz', label: 'Website' },
              { icon: <InstagramIcon />, href: 'https://instagram.com/', label: 'Instagram' },
              { icon: <DribbbleIcon />, href: 'https://dribbble.com/', label: 'Dribbble' },
            ].map(({ icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(label)}
                className="btn-fade press"
                variants={socialItemVariants}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-tertiary)',
                }}
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* Credit */}
          <motion.div variants={socialItemVariants} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Globe aria-hidden={true} style={{ width: 13, height: 13, color: 'var(--text-muted)' }} />
            <span className="font-body" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              {t('Design by Wizerdui')}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
