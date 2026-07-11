'use client'

import { useLang } from './LanguageProvider'

export default function ContactHero() {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 56px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span className="font-mono" style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--text-secondary)' }}>
            {t('CONTACT')}
          </span>
          <h1
            className="font-display"
            style={{ fontSize: 64, fontWeight: 600, letterSpacing: -2.4, lineHeight: 1.05, color: 'var(--text-primary)', margin: 0 }}
          >
            {t("Let's talk.")}
          </h1>
          <p
            className="font-body"
            style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)', width: 560, margin: 0 }}
          >
            {t('Tell us about your project — we reply within 24 hours and estimate within 48.')}
          </p>
        </div>
      </div>
    </section>
  )
}
