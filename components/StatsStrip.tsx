'use client'

import { motion } from 'framer-motion'
import { useLang } from './LanguageProvider'

const STATS = [
  { number: '48+', label: 'Projects Delivered' },
  { number: '$3.2M', label: 'Revenue Generated' },
  { number: '100%', label: 'Client Retention' },
  { number: '5+', label: 'Years of Experience' },
]

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
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              padding: '36px 0',
              paddingLeft: i === 0 ? 0 : 48,
            }}
          >
            <span
              className="font-display font-semibold"
              style={{ fontSize: 44, letterSpacing: -1.6, lineHeight: 1, color: 'var(--text-primary)' }}
            >
              {stat.number}
            </span>
            <span
              className="font-body"
              style={{ fontSize: 12, letterSpacing: 0.3, color: 'var(--text-muted)', textTransform: 'uppercase' }}
            >
              {t(stat.label)}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
