'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from './LanguageProvider'

export default function ConsultStrip() {
  const { t } = useLang()
  return (
    <div style={{ background: 'var(--bg)', paddingBottom: 96 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '36px 44px',
          borderRadius: 16,
          background: 'var(--consult-card)',
          border: '1px solid var(--consult-border)',
          transition: 'background 0.25s ease, border-color 0.25s ease',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span
            className="font-display"
            style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.6, color: 'var(--text-primary)' }}
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
          className="font-body"
        >
          {t('Book free consultation')}
          <ArrowRight style={{ width: 15, height: 15 }} />
        </Link>
      </div>
      </div>
    </div>
  )
}
