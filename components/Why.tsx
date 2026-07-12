'use client'

import { motion } from 'framer-motion'
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
  const { t } = useLang()
  const { theme } = useTheme()
  const dark = theme === 'dark'

  return (
    <section
      aria-labelledby="why-heading"
      style={{ background: 'var(--bg)', padding: 'clamp(64px, 9.6vw, 96px) 0 clamp(72px, 10.4vw, 112px)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          background: dark
            ? 'radial-gradient(ellipse, rgba(255,255,255,0.035) 0%, transparent 55%)'
            : 'radial-gradient(ellipse, rgba(88,44,255,0.07) 0%, transparent 55%)',
          width: 1100,
          height: 480,
          left: 80,
          top: 180,
          filter: dark ? 'blur(80px)' : 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-lg:px-6" style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 'clamp(40px, 5vw, 56px)' }}
        >
          <span
            className="font-mono"
            style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text-tertiary)' }}
          >
            {t('WHY CTRL CODE')}
          </span>
          <h2
            id="why-heading"
            className="font-display font-semibold text-center"
            style={{ fontSize: 'clamp(28px, 6vw, 44px)', letterSpacing: 'clamp(-1.5px, -0.2vw, -0.75px)', color: 'var(--text-primary)' }}
          >
            {t('Built to be your unfair advantage.')}
          </h2>
        </motion.div>

        {/* Grid wrapper — 1 col mobile, 2 cols tablet, 3 cols desktop, 1px gaps */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{
            borderRadius: 18,
            overflow: 'hidden',
            border: '1px solid var(--why-cell-border)',
            background: 'var(--why-gap)',
          }}
        >
          {FEATURES.map((feat, idx) => {
            const Icon = feat.Icon
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.6, delay: idx * 0.11, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  padding: `clamp(24px, 3.13vw, 32px) clamp(24px, 3.13vw, 32px) clamp(28px, 3.2vw, 32px)`,
                  background: 'linear-gradient(180deg, var(--surface-2) 0%, var(--why-cell) 100%)',
                  borderTop: '1px solid var(--why-cell-border)',
                    display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  cursor: 'default',
                  willChange: 'transform',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.12, rotate: idx % 2 === 0 ? 8 : -8, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                  style={{ display: 'inline-block' }}
                >
                  <Icon style={{ width: 22, height: 22, color: 'var(--text-primary)' }} strokeWidth={1.6} />
                </motion.div>
                <h3
                  className="font-display font-semibold"
                  style={{ fontSize: 'clamp(20px, 2.2vw, 24px)', lineHeight: 1.3, color: 'var(--text-primary)', letterSpacing: -0.2 }}
                >
                  {t(feat.title)}
                </h3>
                <p
                  className="font-body"
                  style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}
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
