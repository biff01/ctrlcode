'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Send } from 'lucide-react'
import { useLang } from './LanguageProvider'

const sectionStyle = {
  background: 'var(--cta-bg)',
  padding: 'clamp(72px, 12vw, 120px) 0 clamp(84px, 14vw, 140px)',
  position: 'relative' as const,
  overflow: 'hidden' as const,
}

const overlayBase = {
  position: 'absolute' as const,
  inset: 0,
  pointerEvents: 'none' as const,
}

const overlay1Style = {
  ...overlayBase,
  background: 'radial-gradient(75% 165% at 70% 55%, var(--overlay-mid) 0%, var(--bg) 5%)',
  opacity: 0.86,
}

const overlay2Style = {
  ...overlayBase,
  background: 'radial-gradient(55% 65% at 68% 54%, var(--overlay-mid) 0%, transparent 100%)',
  opacity: 0.58,
}

const overlay3Style = {
  ...overlayBase,
  background: 'linear-gradient(90deg, var(--bg) 0%, var(--overlay-dark-gradient) 100%)',
  opacity: 0.92,
}

const containerStyle = {
  maxWidth: 1200,
  margin: '0 auto',
  position: 'relative' as const,
  zIndex: 10,
  justifyContent: 'center' as const,
  flexWrap: 'wrap' as const,
  gap: 'clamp(40px, 6vw, 60px)',
  padding: '0 clamp(20px, 5vw, 48px)',
}

const leftColStyle = {
  display: 'flex' as const,
  flexDirection: 'column' as const,
  gap: 16,
  flex: 1,
  minWidth: 0,
}

const rightColStyle = {
  display: 'flex' as const,
  flexDirection: 'column' as const,
  alignItems: 'flex-start' as const,
  gap: 20,
  flexShrink: 0,
}

const buttonsRowStyle = {
  display: 'flex' as const,
  flexWrap: 'wrap' as const,
  gap: 12,
}

const primaryBtnStyle = {
  background: 'var(--btn-primary-bg)',
  color: 'var(--btn-primary-color)',
  fontSize: 15,
  lineHeight: 1.5,
  padding: '16px 32px',
  borderRadius: 8,
  boxShadow: 'var(--btn-primary-shadow)',
  textDecoration: 'none' as const,
}

const secondaryBtnStyle = {
  background: 'var(--btn-secondary-bg)',
  border: '1px solid var(--border-subtle)',
  color: 'var(--btn-secondary-color)',
  fontSize: 15,
  lineHeight: 1.5,
  padding: '16px 32px',
  borderRadius: 8,
  textDecoration: 'none' as const,
}

const contactLinkStyle = {
  fontSize: 'clamp(13px, 1.5vw, 15px)',
  letterSpacing: 0.5,
  color: 'var(--text-primary)',
  textDecoration: 'none' as const,
  transition: 'opacity 0.2s ease',
}

const separatorStyle = {
  color: 'var(--text-tertiary)',
  fontSize: 'clamp(13px, 1.5vw, 15px)',
}

export default function FinalCTA() {
  const { t, lang } = useLang()
  return (
    <section className="cta-section" style={sectionStyle}>
      <div className="book-overlay" style={overlay1Style} />
      <div className="book-overlay" style={overlay2Style} />
      <div className="book-overlay" style={overlay3Style} />

      <div
        className="flex flex-col items-start lg:flex-row lg:items-center"
        style={containerStyle}
      >
        <motion.div
          className="max-lg:w-full"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={leftColStyle}
        >
          <h2
            className="font-display font-bold"
            style={{ fontSize: lang === 'uz' ? 'clamp(28px, 6vw, 48px)' : 'clamp(34px, 7.5vw, 56px)', letterSpacing: '-1.5px', lineHeight: 1.1, color: 'var(--text-primary)' }}
          >
            {t('Have an idea?')}<br />{t("Let's ship it together.")}
          </h2>
          <p
            className="font-body"
            style={{ fontSize: 'clamp(15px, 1.15vw, 17px)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 520 }}
          >
            {t("Book a free 30-minute consultation — we'll estimate your project within 48 hours.")}
          </p>
        </motion.div>

        <motion.div
          className="max-lg:w-full"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          style={rightColStyle}
        >
          <div className="max-md:w-full max-md:flex-col" style={buttonsRowStyle}>
            <Link
              href="/contact"
              className="flex items-center max-md:justify-center gap-2 font-body font-semibold btn-lift press"
              style={primaryBtnStyle}
            >
              {t('Book free consultation')}
              <motion.span
                style={{ display: 'inline-flex' }}
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <ArrowRight aria-hidden="true" style={{ width: 16, height: 16 }} />
              </motion.span>
            </Link>
            <a
              href="https://t.me/ctrlcode"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t('Write on Telegram')} (opens in new tab)`}
              className="flex items-center max-md:justify-center gap-2 font-body font-medium btn-fade press"
              style={secondaryBtnStyle}
            >
              <Send aria-hidden="true" style={{ width: 16, height: 16, color: 'currentColor' }} />
              {t('Write on Telegram')}
            </a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', alignItems: 'center' }}>
            <a
              href="tel:+998770007878"
              className="font-mono font-normal"
              style={contactLinkStyle}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.72')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {t('+998 77 000 78 78')}
            </a>
            <span className="font-mono" style={separatorStyle}>·</span>
            <a
              href="mailto:info@ctrlcode.uz"
              className="font-mono font-normal"
              style={contactLinkStyle}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.72')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {t('info@ctrlcode.uz')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
