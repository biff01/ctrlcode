'use client'

import { motion } from 'framer-motion'
import { useLang } from './LanguageProvider'
import { BlurIn } from './ui/blur-in'

export default function PricingHero() {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Soft purple glow */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: -160,
          left: '50%',
          transform: 'translateX(-30%)',
          width: 800,
          height: 440,
          background: 'radial-gradient(closest-side, rgba(88,44,255,0.22), rgba(88,44,255,0))',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(56px, 10vw, 80px) 24px clamp(40px, 7vw, 56px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 20,
        }}
      >
        <motion.span
          className="font-mono"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--kicker)' }}
        >
          {t('PRICING')}
        </motion.span>
        <BlurIn
          as="h1"
          className="font-display"
          style={{ fontSize: 'clamp(36px, 9vw, 64px)', fontWeight: 600, letterSpacing: '-0.0375em', lineHeight: 1.05, color: 'var(--text-primary)', margin: 0 }}
          duration={0.9}
        >
          {t('Invest in what ships.')}
        </BlurIn>
        <motion.p
          className="font-body"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 560, margin: 0 }}
        >
          {t('Fixed scopes, milestone payments and a free consultation before any commitment.')}
        </motion.p>
      </div>
    </section>
  )
}
