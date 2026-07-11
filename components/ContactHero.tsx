'use client'

import { useLang } from './LanguageProvider'
import { BlurIn } from './ui/blur-in'

export default function ContactHero() {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(56px, 12vw, 80px) clamp(20px, 5vw, 24px) clamp(36px, 9vw, 56px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span className="font-mono" style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--text-secondary)' }}>
            {t('CONTACT')}
          </span>
          <BlurIn
            className="font-display"
            style={{ fontSize: 'clamp(38px, 9vw, 64px)', fontWeight: 600, letterSpacing: '-0.0375em', lineHeight: 1.05, color: 'var(--text-primary)', margin: 0 }}
            duration={0.9}
          >
            {t("Let's talk.")}
          </BlurIn>
          <p
            className="font-body"
            style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)', width: '100%', maxWidth: 560, margin: 0 }}
          >
            {t('Tell us about your project — we reply within 24 hours and estimate within 48.')}
          </p>
        </div>
      </div>
    </section>
  )
}
