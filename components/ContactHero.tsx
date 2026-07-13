'use client'

import { motion } from 'framer-motion'
import { useLang } from './LanguageProvider'
import { BlurIn } from './ui/blur-in'

export default function ContactHero() {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(56px, 12vw, 80px) clamp(20px, 5vw, 24px) clamp(36px, 9vw, 56px)' }}>
        <div className="flex flex-col lg:flex-row lg:items-center" style={{ gap: 'clamp(40px, 6vw, 80px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, minWidth: 0 }}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono"
              style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--text-secondary)' }}
            >
              {t('CONTACT')}
            </motion.span>
            <BlurIn
              as="h1"
              className="font-display"
              style={{ fontSize: 'clamp(38px, 9vw, 72px)', fontWeight: 600, letterSpacing: '-0.0375em', lineHeight: 1.05, color: 'var(--text-primary)', margin: 0 }}
              duration={0.9}
            >
              {t("Let's talk.")}
            </BlurIn>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="font-body"
              style={{ fontSize: 'clamp(15px, 2vw, 17px)', lineHeight: 1.6, color: 'var(--text-secondary)', width: '100%', maxWidth: 560, margin: 0 }}
            >
              {t('Tell us about your project — we reply within 24 hours and estimate within 48.')}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
