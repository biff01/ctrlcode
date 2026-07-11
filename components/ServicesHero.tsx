'use client'

import { useLang } from './LanguageProvider'
import { BlurIn } from './ui/blur-in'

export default function ServicesHero() {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(56px, 10vw, 80px) 24px clamp(40px, 8vw, 64px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span className="font-mono" style={{ fontSize: 12, letterSpacing: 1.5, color: '#4A6FA5' }}>
            {t('SERVICES')}
          </span>
          <BlurIn
            className="font-display"
            style={{ fontSize: 'clamp(36px, 9vw, 64px)', fontWeight: 600, letterSpacing: 'clamp(-2.4px, -0.24vw, -1.2px)', lineHeight: 1.05, color: 'var(--text-primary)', margin: 0 }}
            duration={0.9}
          >
            {t('What we build.')}
          </BlurIn>
          <p
            className="font-body"
            style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 560, margin: 0 }}
          >
            {t('Five disciplines, one team. Every engagement is scoped, designed and engineered end-to-end — with a single point of contact.')}
          </p>
        </div>
      </div>
    </section>
  )
}
