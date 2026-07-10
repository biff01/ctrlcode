'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { useLang } from './LanguageProvider'

type Tab = 'standard' | 'premium'

const ENTERPRISE = {
  id: 'enterprise',
  name: 'Enterprise',
  subtitle: 'Dedicated team for complex, long-term projects.',
  price: '$199',
  unit: '/ hour',
  badge: null as string | null,
  gradient: 'linear-gradient(135deg, #080a18 0%, #171717 50%, #454545 100%)',
  features: [
    'Dedicated development team',
    'Full-stack architecture & planning',
    'Performance, security & SEO audit',
    'SLA guarantee & uptime monitoring',
    'Ongoing retainer available',
    'Support 24 months',
  ],
  cta: 'Contact Us',
}

const STANDARD_PLANS = [
  {
    id: 'standard',
    name: 'Standard Plan',
    subtitle: 'Have design ready to build? Or small budget?',
    price: '$49',
    unit: '/ hour',
    badge: null as string | null,
    gradient: 'linear-gradient(135deg, #080a18 0%, #0d1b40 50%, #1a3070 100%)',
    features: [
      'Need your wireframe',
      'Design with Figma, Framer',
      'Implement with Webflow, React, WordPress, Laravel/PHP',
      'Remote / Online',
      'Work in business days, no weekend',
      'Support 6 months',
    ],
    cta: 'Get Started',
  },
  ENTERPRISE,
]

const PREMIUM_PLANS = [
  {
    id: 'premium',
    name: 'Premium Plan',
    subtitle: 'Full design & development with priority delivery.',
    price: '$99',
    unit: '/ hour',
    badge: 'Most Popular',
    gradient: 'linear-gradient(145deg, #0c0800 0%, #1e1100 28%, #3a2000 54%, #6a3a00 76%, #9a5a00 100%)',
    features: [
      'Everything in Standard',
      'Custom UI/UX design from scratch',
      'React, Next.js & TypeScript apps',
      'CMS & API integrations',
      'Priority support & faster turnaround',
      'Support 12 months',
    ],
    cta: 'Get Started',
  },
  ENTERPRISE,
]

export default function Pricing() {
  const [tab, setTab] = useState<Tab>('standard')
  const router = useRouter()
  const { t } = useLang()
  const plans = tab === 'premium' ? PREMIUM_PLANS : STANDARD_PLANS

  return (
    <section style={{ background: 'var(--bg)', padding: '40px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <h2
            className="font-display font-bold"
            style={{ fontSize: 42, letterSpacing: -1.5, color: 'var(--text-primary)' }}
          >
            {t('My Pricing')}
          </h2>
          {/* Tab switcher */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--surface-3)',
              borderRadius: 99,
              padding: '4px',
              gap: 2,
            }}
          >
            {(['standard', 'premium'] as Tab[]).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setTab(tabKey)}
                className="font-body rounded-full"
                style={{
                  padding: '7px 16px',
                  fontSize: 13,
                  background: tab === tabKey ? 'var(--tab-active)' : 'transparent',
                  color: tab === tabKey ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  fontWeight: tab === tabKey ? 500 : 400,
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {t(tabKey === 'standard' ? 'Standard Plan' : 'Premium Plan')}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div style={{ display: 'flex', gap: 12 }}>
          {plans.map((plan, i) => {
            const isPremium = plan.id === 'premium'
            return (
            <motion.div
              key={plan.id + tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                borderRadius: 20,
                background: 'var(--surface-2)',
                padding: 14,
                overflow: 'hidden',
                position: 'relative',
                border: isPremium ? '1px solid rgba(200,140,30,0.35)' : '1px solid transparent',
                boxShadow: isPremium
                  ? '0 0 0 1px rgba(200,140,30,0.15), 0 20px 80px rgba(140,80,0,0.35), 0 4px 20px rgba(0,0,0,0.3)'
                  : 'none',
              }}
            >
              {/* Premium top shimmer line */}
              {isPremium && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '10%',
                    right: '10%',
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(220,160,40,0.9), transparent)',
                    borderRadius: 1,
                  }}
                />
              )}

              {/* Gradient hero area */}
              <div
                style={{
                  borderRadius: 14,
                  background: plan.gradient,
                  padding: '22px 22px 20px',
                  marginBottom: 20,
                  minHeight: isPremium ? 220 : 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Premium inner glow */}
                {isPremium && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 80% 20%, rgba(180,100,0,0.35) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  }} />
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center" style={{ gap: 8 }}>
                      <span style={{ color: isPremium ? '#e8a020' : '#fff', fontSize: 18 }}>•</span>
                      <span
                        className="font-display font-semibold"
                        style={{ fontSize: 17, color: '#fff' }}
                      >
                        {t(plan.name)}
                      </span>
                    </div>
                    {plan.badge && (
                      <span
                        className="font-body"
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: '#f5c842',
                          background: 'rgba(245,200,66,0.18)',
                          border: '1px solid rgba(245,200,66,0.5)',
                          borderRadius: 99,
                          padding: '4px 12px',
                          letterSpacing: 0.5,
                          boxShadow: '0 0 12px rgba(245,200,66,0.3)',
                        }}
                      >
                        ✦ {t(plan.badge)}
                      </span>
                    )}
                  </div>
                  <p
                    className="font-body"
                    style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}
                  >
                    {t(plan.subtitle)}
                  </p>
                </div>
                <div style={{ position: 'relative' }}>
                  <div className="flex items-end" style={{ gap: 8 }}>
                    <span
                      className="font-display font-light"
                      style={{ fontSize: 62, color: '#fff', lineHeight: 1 }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="font-body"
                      style={{ fontSize: 18, color: '#888', paddingBottom: 4 }}
                    >
                      {t(plan.unit)}
                    </span>
                  </div>
                  {isPremium && (
                    <p className="font-body" style={{ fontSize: 11.5, color: 'rgba(220,160,40,0.75)', marginTop: 6, letterSpacing: 0.2 }}>
                      {t('Best value · Save up to 40% vs. agency rates')}
                    </p>
                  )}
                </div>
              </div>

              {/* Features list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13, flex: 1, padding: '0 6px' }}>
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start" style={{ gap: 10 }}>
                    {isPremium ? (
                      <div style={{
                        width: 18, height: 18, borderRadius: '50%',
                        background: 'rgba(200,140,30,0.15)',
                        border: '1px solid rgba(200,140,30,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: 1,
                      }}>
                        <Check style={{ width: 10, height: 10, color: '#e8a020' }} />
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-primary)', fontSize: 14, flexShrink: 0, marginTop: 1 }}>•</span>
                    )}
                    <span className="font-body" style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                      {t(f)}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => router.push('/contact')}
                className="flex items-center font-body font-semibold"
                style={{
                  background: isPremium
                    ? 'linear-gradient(135deg, #a06000 0%, #d48000 50%, #e09500 100%)'
                    : '#0D1B4B',
                  color: '#FFFFFF',
                  fontSize: 15,
                  borderRadius: 99,
                  padding: '8px 8px 8px 20px',
                  marginTop: 22,
                  gap: 12,
                  alignSelf: 'flex-start',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: isPremium ? '0 4px 24px rgba(180,100,0,0.45)' : 'none',
                }}
              >
                {t(plan.cta)}
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: isPremium ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.19)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ArrowUpRight style={{ width: 16, height: 16, color: '#FFFFFF' }} />
                </div>
              </button>
            </motion.div>
            )
          })}
        </div>

        {/* Custom Quote bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onClick={() => router.push('/contact')}
          className="flex items-center justify-between"
          style={{
            background: 'var(--surface-2)',
            borderRadius: 16,
            padding: '18px 24px',
            cursor: 'pointer',
          }}
        >
          <span
            className="font-display font-semibold"
            style={{ fontSize: 26, color: 'var(--text-primary)', letterSpacing: -0.5 }}
          >
            {t('Custom Quote')}
          </span>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowUpRight style={{ width: 20, height: 20, color: 'var(--text-primary)' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
