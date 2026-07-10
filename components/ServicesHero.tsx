'use client'

import { useLang } from './LanguageProvider'

export default function ServicesHero() {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 64px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span className="font-mono" style={{ fontSize: 12, letterSpacing: 1.5, color: '#4A6FA5' }}>
            {t('SERVICES')}
          </span>
          <h1
            className="font-display"
            style={{ fontSize: 64, fontWeight: 600, letterSpacing: -2.4, lineHeight: 1.05, color: 'var(--text-primary)', margin: 0 }}
          >
            {t('What we build.')}
          </h1>
          <p
            className="font-body"
            style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)', width: 560, margin: 0 }}
          >
            {t('Five disciplines, one team. Every engagement is scoped, designed and engineered end-to-end — with a single point of contact.')}
          </p>
        </div>
      </div>
    </section>
  )
}
