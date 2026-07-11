'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Workflow, BadgeCheck, Zap, MessageSquare, LifeBuoy, Receipt } from 'lucide-react'
import { useLang } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

const FEATURES = [
  {
    Icon: Workflow,
    title: 'Proven process',
    desc: 'A battle-tested delivery cycle — discovery, design, sprints, launch. No chaos, no guessing.',
  },
  {
    Icon: BadgeCheck,
    title: 'International quality',
    desc: "Standards you'd expect from a top European studio, priced fairly for the region.",
  },
  {
    Icon: Zap,
    title: 'Fast execution',
    desc: 'First results in weeks, not months. We move at startup speed without cutting corners.',
  },
  {
    Icon: MessageSquare,
    title: 'Clear communication',
    desc: 'One dedicated manager, weekly demos, and a roadmap you can actually read and trust.',
  },
  {
    Icon: LifeBuoy,
    title: '24/7 support',
    desc: 'We stay on after launch — monitoring, updates, and real humans on call when it matters.',
  },
  {
    Icon: Receipt,
    title: 'Transparent pricing',
    desc: 'Fixed scopes and clear estimates upfront. No surprise invoices, ever.',
  },
]

export default function Why() {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridVisible = useInView(gridRef, { once: true, margin: '-60px' })
  const { t } = useLang()
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const rows = [FEATURES.slice(0, 3), FEATURES.slice(3, 6)]

  return (
    <section
      style={{ background: 'var(--bg)', padding: '100px 0 110px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.035) 0%, transparent 55%)',
          width: 1100,
          height: 480,
          left: 80,
          top: 180,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 52 }}
        >
          <span
            className="font-mono"
            style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text-tertiary)' }}
          >
            {t('WHY CTRL CODE')}
          </span>
          <h2
            className="font-display font-semibold text-center"
            style={{ fontSize: 44, letterSpacing: -1.5, color: 'var(--text-primary)' }}
          >
            {t('Built to be your unfair advantage.')}
          </h2>
        </motion.div>

        {/* Grid wrapper */}
        <div
          ref={gridRef}
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            border: dark ? '1px solid rgba(255,255,255,0.10)' : '1px solid var(--why-cell-border)',
            boxShadow: '0 32px 64px -12px rgba(0,0,0,0.55), 0 0 32px 1px rgba(255,255,255,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            background: dark ? '#262626' : 'var(--why-gap)',
          }}
        >
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} style={{ display: 'flex', gap: 1 }}>
              {row.map((feat, i) => {
                const Icon = feat.Icon
                const idx = rowIdx * 3 + i
                return (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={gridVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: idx * 0.07, ease: 'easeOut' }}
                    style={{
                      flex: 1,
                      padding: '32px 32px 36px',
                      background: dark
                        ? 'linear-gradient(180deg, #1C1C1C 0%, #0C0C0C 100%)'
                        : 'var(--why-cell)',
                      borderTop: dark ? '1px solid rgba(255,255,255,0.125)' : '1px solid var(--why-cell-border)',
                      boxShadow: dark
                        ? '0 1px 0 rgba(255,255,255,0.06), 0 8px 24px -2px rgba(0,0,0,0.33)'
                        : '0 1px 0 var(--why-cell-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 14,
                    }}
                  >
                    <Icon style={{ width: 22, height: 22, color: 'var(--text-primary)' }} strokeWidth={1.6} />
                    <h3
                      className="font-display font-semibold"
                      style={{ fontSize: 17, color: 'var(--text-primary)', letterSpacing: -0.2 }}
                    >
                      {t(feat.title)}
                    </h3>
                    <p
                      className="font-body"
                      style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)' }}
                    >
                      {t(feat.desc)}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
