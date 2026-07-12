'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLang } from './LanguageProvider'
import type { CSSProperties } from 'react'

const CTA_LINK_STYLE: CSSProperties = {
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
  boxShadow: 'var(--btn-primary-shadow)',
  textDecoration: 'none',
  transition: 'background 0.25s ease, color 0.25s ease',
}

export default function ConsultStrip() {
  const { t } = useLang()
  return (
    <section aria-label="Free consultation" style={{ background: 'var(--bg)', paddingBottom: 'clamp(64px, 10vw, 96px)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}
      >
        <motion.div
          className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
          whileHover={{
            boxShadow: 'var(--card-shadow)',
            borderColor: 'var(--border)',
            transition: { duration: 0.22 },
          }}
          style={{
            padding: 'clamp(24px, 4vw, 40px) clamp(20px, 4.5vw, 44px)',
            borderRadius: 16,
            background: 'var(--consult-card)',
            border: '1px solid var(--consult-border)',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span
              className="font-display"
              style={{ fontSize: 'clamp(20px, 5.5vw, 24px)', fontWeight: 600, letterSpacing: -0.6, color: 'var(--text-primary)' }}
            >
              {t('Not sure what you need?')}
            </span>
            <span className="font-body" style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
              {t("Book a free 30-minute call — we'll help you scope it and send an estimate within 48 hours.")}
            </span>
          </div>

          <Link
            href="/contact"
            style={CTA_LINK_STYLE}
            className="font-body w-full min-h-12 justify-center md:w-auto md:min-h-0 md:justify-start btn-lift press group"
          >
            {t('Book free consultation')}
            <span className="flex transition-transform duration-200 group-hover:translate-x-1">
              <ArrowRight aria-hidden="true" style={{ width: 16, height: 16 }} />
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
