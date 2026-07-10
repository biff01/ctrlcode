'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useLang } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function DribbbleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
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

export default function BookACall() {
  const { t } = useLang()
  const { theme } = useTheme()
  const dark = theme === 'dark'

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
  const openMask = cutout(capR - OPEN_LEFT, capR - OPEN_TOP)
  const closeMask = cutout(
    CIRCLE_SIZE + CLOSE_RIGHT - capR,
    CIRCLE_SIZE + CLOSE_BOTTOM - capR,
  )

  const GLASS_CIRCLE: React.CSSProperties = {
    position: 'absolute',
    width: 92,
    height: 92,
    borderRadius: '50%',
    background: dark
      ? 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.094) 100%), rgba(24,24,24,0.56)'
      : 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: dark ? '1px solid rgba(255,255,255,0.118)' : '1px solid rgba(13,27,75,0.1)',
    boxShadow: dark
      ? '0 6px 28px 2px rgba(0,0,0,0.435), 0 1px 6px rgba(255,255,255,0.133)'
      : '0 6px 28px 2px rgba(0,0,0,0.08), 0 1px 6px rgba(0,0,0,0.04)',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
  }

  const quoteColor = dark ? 'rgba(255,255,255,0.282)' : 'rgba(13,27,75,0.22)'
  return (
    <section
      style={{
        position: 'relative',
        padding: '130px 0',
        background: 'var(--cta-bg)',
      }}
    >
      {/* Background gradient layers */}
      <div className="book-overlay" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(75% 165% at 70% 55%, #454545 0%, #040404 5%)', opacity: 0.86, pointerEvents: 'none' }} />
      <div className="book-overlay" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(55% 65% at 68% 54%, #454545 0%, transparent 100%)', opacity: 0.58, pointerEvents: 'none' }} />
      <div className="book-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #040404 0%, #111217 100%)', opacity: 0.92, pointerEvents: 'none' }} />

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
          gap: 44,
        }}
      >
        {/* Pill + quote circles wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', width: '100%' }}
        >
          {/* Opening quote glass — top-left corner of pill */}
          <div style={{ ...GLASS_CIRCLE, left: OPEN_LEFT, top: OPEN_TOP, alignItems: 'center', paddingTop: 0, maskImage: openMask, WebkitMaskImage: openMask }}>
            <span
              className="font-display font-bold select-none"
              style={{ fontSize: 178, lineHeight: 1, color: quoteColor, flexShrink: 0, marginTop: 67 }}
            >
              &#x201C;
            </span>
          </div>

          {/* Closing quote glass — bottom-right corner of pill */}
          <div style={{ ...GLASS_CIRCLE, right: CLOSE_RIGHT, bottom: CLOSE_BOTTOM, alignItems: 'center', paddingTop: 0, maskImage: closeMask, WebkitMaskImage: closeMask }}>
            <span
              className="font-display font-bold select-none"
              style={{ fontSize: 178, lineHeight: 1, color: quoteColor, flexShrink: 0, marginTop: 67 }}
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
              padding: '40px 80px',
            }}
          >
            <p
              className="font-display font-normal text-center"
              style={{ fontSize: 26, letterSpacing: -1, lineHeight: 1.45, color: dark ? '#ffffff' : '#0D1B4B' }}
            >
              {t("Ctrl Code — we don't just build websites, we craft digital experiences that make brands feel sharper, faster, and more powerful.")}
            </p>
          </div>
        </motion.div>

        {/* Bottom content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
        >
          {/* Social icons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <XIcon />
            </a>
            {[
              { icon: <Globe key="globe" style={{ width: 18, height: 18, color: '#888' }} />, href: 'https://ctrlcode.uz', label: 'Website' },
              { icon: <InstagramIcon key="ig" />, href: 'https://instagram.com/', label: 'Instagram' },
              { icon: <DribbbleIcon key="drib" />, href: 'https://dribbble.com/', label: 'Dribbble' },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-tertiary)',
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Credit */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Globe style={{ width: 13, height: 13, color: '#454545' }} />
            <span className="font-body" style={{ fontSize: 13, color: '#454545' }}>
              {t('Design by Wizerdui')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
