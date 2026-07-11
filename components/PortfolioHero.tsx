'use client'
import { motion } from 'framer-motion'
import type { Filter } from './PortfolioPageClient'
import { useLang } from './LanguageProvider'

interface Props {
  filters: readonly Filter[]
  active: Filter
  onFilterChange: (f: Filter) => void
}

export default function PortfolioHero({ filters, active, onFilterChange }: Props) {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--bg)', padding: '80px 0 64px', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          right: -100,
          top: -200,
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.035) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', gap: 20 }}
        >
          <span className="font-mono" style={{ fontSize: 11, letterSpacing: 3, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {t('Portfolio')}
          </span>
          <h1
            className="font-display font-bold"
            style={{ fontSize: 'clamp(38px, 9.5vw, 64px)', letterSpacing: 'clamp(-2.6px, -0.26vw, -1.4px)', lineHeight: 1.06, color: 'var(--text-primary)', maxWidth: 760 }}
          >
            {t('Work that defines')}<br />{t('our craft.')}
          </h1>
          <p
            className="font-body"
            style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: 520, marginTop: 4 }}
          >
            {t('Every project is a collaboration, every result is a story. Browse 48+ projects across web, mobile, SaaS, and brand design.')}
          </p>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12, width: '100%' }}
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => onFilterChange(f)}
                className="font-body"
                style={{
                  padding: '8px 18px',
                  borderRadius: 99,
                  fontSize: 13,
                  fontWeight: active === f ? 500 : 400,
                  background: active === f ? 'var(--nav-active-bg)' : 'var(--btn-secondary-bg)',
                  color: active === f ? 'var(--nav-active-color)' : 'var(--text-tertiary)',
                  border: active === f ? 'none' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {t(f)}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
