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
  const gridVisible = useInView(gridRef, { once: true, margin: '-40px' })
  const { t } = useLang()
  const { theme } = useTheme()
  const dark = theme === 'dark'

  return (
    <section
      style={{ background: 'var(--bg)', padding: 'clamp(64px, 9.8vw, 100px) 0 clamp(72px, 10.75vw, 110px)', position: 'relative', overflow: 'hidden' }}
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

      <div className="max-lg:px-6" style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 'clamp(40px, 5.1vw, 52px)' }}
        >
          <span
            className="font-mono"
            style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text-tertiary)' }}
          >
            {t('WHY CTRL CODE')}
          </span>
          <h2
            className="font-display font-semibold text-center"
            style={{ fontSize: 'clamp(28px, 6vw, 44px)', letterSpacing: 'clamp(-1.5px, -0.2vw, -0.75px)', color: 'var(--text-primary)' }}
          >
            {t('Built to be your unfair advantage.')}
          </h2>
        </motion.div>

        {/* Grid wrapper — 1 col mobile, 2 cols tablet, 3 cols desktop, 1px gaps */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            border: dark ? '1px solid rgba(255,255,255,0.10)' : '1px solid var(--why-cell-border)',
            boxShadow: '0 32px 64px -12px rgba(0,0,0,0.55), 0 0 32px 1px rgba(255,255,255,0.03)',
            background: dark ? '#262626' : 'var(--why-gap)',
          }}
        >
          {FEATURES.map((feat, idx) => {
            const Icon = feat.Icon
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 18 }}
                animate={gridVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.07, ease: 'easeOut' }}
                style={{
                  padding: 'clamp(24px, 3.13vw, 32px) clamp(24px, 3.13vw, 32px) clamp(28px, 3.6vw, 36px)',
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
      </div>
    </section>
  )
}
