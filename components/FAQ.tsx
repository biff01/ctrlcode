'use client'

import { useLang } from './LanguageProvider'

const FAQS = [
  {
    q: 'How do payments work?',
    a: '50% to start, 50% on delivery. Larger projects are split into milestone payments tied to demos you can actually see.',
  },
  {
    q: 'Do you provide support after launch?',
    a: 'Yes — every plan includes 30 days of free support. Ongoing care plans with monitoring and updates start at $200/mo.',
  },
  {
    q: 'Can you take over an existing project?',
    a: 'We start with a code and infrastructure audit, then propose an honest fix-or-rebuild plan with estimates for both.',
  },
  {
    q: 'How fast can we start?',
    a: 'Discovery call this week; the first sprint usually kicks off within 7–10 days of signing.',
  },
  {
    q: 'Do you sign NDAs and contracts?',
    a: 'Always. As an official IT Park Uzbekistan resident we work with formal contracts and e-invoicing.',
  },
]

export default function FAQ() {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--bg)' }}>
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: '0 24px clamp(64px, 12vw, 104px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(28px, 6vw, 40px)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span className="font-mono" style={{ fontSize: 12, letterSpacing: 1.5, color: '#4A6FA5' }}>
            {t('FAQ')}
          </span>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(28px, 6vw, 38px)', fontWeight: 600, letterSpacing: '-0.0316em', color: 'var(--text-primary)', margin: 0 }}
          >
            {t('Questions, answered.')}
          </h2>
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FAQS.map((item) => (
            <div
              key={item.q}
              className="flex flex-col gap-3 md:flex-row md:gap-12"
              style={{
                padding: '26px 0',
                borderTop: '1px solid var(--faq-border)',
              }}
            >
              <h3
                className="font-display md:w-[340px]"
                style={{
                  flex: 'none',
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: -0.2,
                  lineHeight: 1.4,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                {t(item.q)}
              </h3>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0 }}
              >
                {t(item.a)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
