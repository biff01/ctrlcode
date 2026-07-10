'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Send } from 'lucide-react'
import { useLang } from './LanguageProvider'

export default function FinalCTA() {
  const { t } = useLang()
  return (
    <section
      style={{
        background: 'var(--cta-bg)',
        padding: '120px 0 140px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient layers — same as Book A Call */}
      <div className="book-overlay" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(75% 165% at 70% 55%, #454545 0%, #040404 5%)', opacity: 0.86, pointerEvents: 'none' }} />
      <div className="book-overlay" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(55% 65% at 68% 54%, #454545 0%, transparent 100%)', opacity: 0.58, pointerEvents: 'none' }} />
      <div className="book-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #040404 0%, #111217 100%)', opacity: 0.92, pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 60,
          padding: '0 48px',
        }}
      >
        {/* Left — headline + subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, minWidth: 0 }}>
          <h2
            className="font-display font-semibold"
            style={{ fontSize: 60, letterSpacing: -2.2, lineHeight: 1.1, color: 'var(--text-primary)' }}
          >
            {t('Have an idea?')}<br />{t("Let's ship it together.")}
          </h2>
          <p
            className="font-body"
            style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 520 }}
          >
            {t("Book a free 30-minute consultation — we'll estimate your project within 48 hours.")}
          </p>
        </div>

        {/* Right — buttons + contact */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20, flexShrink: 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <Link
              href="/contact"
              className="flex items-center gap-2 font-body font-semibold"
              style={{
                background: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-color)',
                fontSize: 15,
                lineHeight: '23px',
                padding: '15px 30px',
                borderRadius: 8,
                boxShadow: '0 8px 32px rgba(255,255,255,0.13)',
                textDecoration: 'none',
              }}
            >
              {t('Book free consultation')}
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <a
              href="https://t.me/ctrlcode"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body font-medium"
              style={{
                background: 'var(--btn-secondary-bg)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--btn-secondary-color)',
                fontSize: 15,
                lineHeight: '23px',
                padding: '15px 30px',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              <Send style={{ width: 15, height: 15, color: 'var(--text-tertiary)' }} />
              {t('Write on Telegram')}
            </a>
          </div>
          <span
            className="font-mono font-normal"
            style={{ fontSize: 20, letterSpacing: 0.5, color: 'var(--text-primary)' }}
          >
            +998 77 000 78 78 · info@ctrlcode.uz
          </span>
        </div>
      </motion.div>
    </section>
  )
}
