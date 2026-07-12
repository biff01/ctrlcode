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
      <style>{`
        .filter-pill:hover {
          background: var(--surface-2);
          color: var(--text-primary);
          border-color: var(--border);
        }
        .filter-pill:focus-visible {
          outline: 2px solid var(--kicker);
          outline-offset: 2px;
        }
      `}</style>
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          right: -100,
          top: -200,
          background: 'radial-gradient(ellipse, var(--border) 0%, transparent 70%)',
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
          <span className="font-mono" style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {t('Portfolio')}
          </span>
          <h1
            className="font-display font-bold"
            style={{ fontSize: 'clamp(40px, 9.5vw, 80px)', letterSpacing: 'clamp(-2.6px, -0.26vw, -1.4px)', lineHeight: 1.06, color: 'var(--text-primary)', maxWidth: 760 }}
          >
            {t('Work that defines')}<br />{t('our craft.')}
          </h1>
          <p
            className="font-body"
            style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 520, marginTop: 0 }}
          >
            {t('Every project is a collaboration, every result is a story. Browse 48+ projects across web, mobile, SaaS, and brand design.')}
          </p>

          {/* Filter tabs */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }}
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: 12, width: '100%' }}
          >
            {filters.map((f) => (
              <motion.button
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }}
                key={f}
                onClick={() => onFilterChange(f)}
                className="font-body filter-pill"
                whileHover={{ scale: 1.04, filter: active === f ? 'brightness(1.06)' : 'brightness(1.2)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                style={{
                  padding: '8px 16px',
                  borderRadius: 9999,
                  fontSize: 13,
                  minHeight: 44,
                  fontWeight: active === f ? 500 : 400,
                  background: active === f ? 'var(--nav-active-bg)' : 'var(--btn-secondary-bg)',
                  color: active === f ? 'var(--nav-active-color)' : 'var(--text-tertiary)',
                  border: active === f ? 'none' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease, color 0.2s ease',
                }}
              >
                {t(f)}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
