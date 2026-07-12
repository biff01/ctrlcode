'use client'

import { motion } from 'framer-motion'
import { useLang } from './LanguageProvider'

const STATS = [
  { number: '48+', label: 'Projects Delivered' },
  { number: '$3.2M', label: 'Revenue Generated' },
  { number: '100%', label: 'Client Retention' },
  { number: '5+', label: 'Years of Experience' },
]

const STAT_ITEM_STYLE = {
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 8,
  paddingTop: 'clamp(24px, 3.5vw, 40px)',
  paddingBottom: 'clamp(24px, 3.5vw, 40px)',
  cursor: 'default',
}

const STAT_NUMBER_STYLE = {
  fontSize: 'clamp(32px, 9vw, 48px)',
  letterSpacing: 'clamp(-1.6px, -0.3vw, -1px)',
  lineHeight: 1,
  color: 'var(--text-primary)',
}

const STAT_LABEL_STYLE = {
  fontSize: 'clamp(11px, 1.1vw, 13px)',
  letterSpacing: 0.8,
  color: 'var(--text-tertiary)',
  textTransform: 'uppercase' as const,
}

export default function StatsStrip() {
  const { t } = useLang()
  return (
    <section
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
        padding: '0 0',
      }}
    >
      {/* 2x2 grid on mobile, single row from md up */}
      <div
        className="grid grid-cols-2 gap-x-8 md:flex md:items-stretch md:gap-x-0"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={i === 0 ? '' : 'md:pl-12 md:border-l md:border-[var(--border-light)]'}
            style={STAT_ITEM_STYLE}
          >
            <span
              className="font-display font-semibold"
              style={STAT_NUMBER_STYLE}
            >
              {stat.number}
            </span>
            <span
              className="font-mono"
              style={STAT_LABEL_STYLE}
            >
              {t(stat.label)}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
