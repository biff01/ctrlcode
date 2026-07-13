'use client'

import { motion } from 'framer-motion'
import { useLang } from './LanguageProvider'
import { BlurIn } from './ui/blur-in'

export default function ServicesHero() {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(56px, 10vw, 80px) 24px clamp(40px, 8vw, 64px)' }}>
        <div className="flex flex-col lg:flex-row lg:items-center" style={{ gap: 'clamp(40px, 6vw, 80px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, minWidth: 0 }}>
            <motion.span
              className="font-mono"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0 }}
              style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--kicker)' }}
            >
              {t('SERVICES')}
            </motion.span>
            <BlurIn
              className="font-display"
              style={{ fontSize: 'clamp(36px, 9vw, 64px)', fontWeight: 600, letterSpacing: 'clamp(-2.4px, -0.24vw, -1.2px)', lineHeight: 1.05, color: 'var(--text-primary)', margin: 0 }}
              duration={0.9}
              delay={0.12}
            >
              {t('What we build.')}
            </BlurIn>
            <motion.p
              className="font-body"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
              style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 560, margin: 0 }}
            >
              {t('Five disciplines, one team. Every engagement is scoped, designed and engineered end-to-end — with a single point of contact.')}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
