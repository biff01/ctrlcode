'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from './LanguageProvider'

export default function ConsultStrip() {
  const { t } = useLang()
  return (
    <div style={{ background: 'var(--bg)', paddingBottom: 'clamp(64px, 10vw, 96px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <div
        className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        style={{
          padding: 'clamp(24px, 4vw, 36px) clamp(20px, 4.5vw, 44px)',
          borderRadius: 16,
          background: 'var(--consult-card)',
          border: '1px solid var(--consult-border)',
          transition: 'background 0.25s ease, border-color 0.25s ease',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span
            className="font-display"
            style={{ fontSize: 'clamp(21px, 5.5vw, 24px)', fontWeight: 600, letterSpacing: -0.6, color: 'var(--text-primary)' }}
          >
            {t('Not sure what you need?')}
          </span>
          <span className="font-body" style={{ fontSize: 14.5, color: 'var(--text-secondary)' }}>
            {t("Book a free 30-minute call — we'll help you scope it and send an estimate within 48 hours.")}
          </span>
        </div>

        <Link
          href="/contact"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--btn-primary-bg)',
            color: 'var(--btn-primary-color)',
            fontSize: 14,
            fontWeight: 600,
            padding: '13px 26px',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            boxShadow: '0 6px 24px rgba(255,255,255,0.13)',
            textDecoration: 'none',
            transition: 'background 0.25s ease, color 0.25s ease',
          }}
          className="font-body w-full min-h-12 justify-center md:w-auto md:min-h-0 md:justify-start"
        >
          {t('Book free consultation')}
          <ArrowRight style={{ width: 15, height: 15 }} />
        </Link>
      </div>
      </div>
    </div>
  )
}
