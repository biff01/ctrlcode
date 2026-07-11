'use client'

import { useLang } from './LanguageProvider'
import { BlurIn } from './ui/blur-in'

export default function PricingHero() {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Soft purple glow */}
      <div
        aria-hidden
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
        <span className="font-mono" style={{ fontSize: 12, letterSpacing: 1.5, color: '#4A6FA5' }}>
          {t('PRICING')}
        </span>
        <BlurIn
          className="font-display"
          style={{ fontSize: 'clamp(36px, 9vw, 64px)', fontWeight: 600, letterSpacing: '-0.0375em', lineHeight: 1.05, color: 'var(--text-primary)', margin: 0 }}
          duration={0.9}
        >
          {t('Invest in what ships.')}
        </BlurIn>
        <p
          className="font-body"
          style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 560, margin: 0 }}
        >
          {t('Fixed scopes, milestone payments and a free consultation before any commitment.')}
        </p>
      </div>
    </section>
  )
}
