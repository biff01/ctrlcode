'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowUpRight, Rocket, Briefcase, Building2, type LucideIcon } from 'lucide-react'
import { useLang } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

type Plan = {
  id: string
  Icon: LucideIcon
  name: string
  subtitle: string
  price: string
  badge: string | null
  features: string[]
  cta: string
}

const CARD_GRADIENT = 'linear-gradient(135deg, #080a18 0%, #171717 50%, #454545 100%)'

const ALL_PLANS: Plan[] = [
  {
    id: 'start',
    Icon: Rocket,
    name: 'Start',
    subtitle: 'Perfect for small businesses and startups.',
    price: '$1,500',
    badge: null,
    features: [
      'Single-page website',
      'Basic UI/UX Design',
      'Responsive Design',
      'Contact Form',
      'SEO Ready',
      '2 Weeks Delivery',
    ],
    cta: 'Get Started',
  },
  {
    id: 'pro',
    Icon: Briefcase,
    name: 'Pro',
    subtitle: 'Ideal for growing businesses.',
    price: '$3,500',
    badge: 'Most Popular',
    features: [
      'Corporate Website',
      'Admin Panel',
      'CMS Integration',
      'Advanced UI/UX',
      'SEO Optimization',
      '4-6 Weeks Delivery',
    ],
    cta: 'Get Started',
  },
  {
    id: 'premium',
    Icon: Building2,
    name: 'Premium',
    subtitle: 'For enterprises and complex digital products.',
    price: '$7,500',
    badge: null,
    features: [
      'Custom Web Platform',
      'CRM / ERP Integration',
      'AI Features',
      'API Integrations',
      'High Performance',
      'Dedicated Support',
      '8+ Weeks Delivery',
    ],
    cta: 'Contact Us',
  },
]

function PricingCard({ plan, i, dark }: { plan: Plan; i: number; dark: boolean }) {
  const [hovered, setHovered] = useState(false)
  const router = useRouter()
  const { t } = useLang()
  const cardBorder = hovered
    ? dark
      ? '1px solid rgba(255,255,255,0.08)'
      : '1px solid rgba(13,27,75,0.09)'
    : dark ? '1px solid transparent' : '1px solid rgba(13,27,75,0.07)'

  return (
    <motion.div
      className="w-full min-w-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -4, scale: 1.012, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      whileTap={{ scale: 0.99, y: 0, transition: { duration: 0.15 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      transition={{ duration: 0.45, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        borderRadius: 18,
        background: dark ? 'var(--surface-2)' : 'var(--surface)',
        padding: 'clamp(12px, 3vw, 16px)',
        overflow: 'hidden',
        position: 'relative',
        border: cardBorder,
        boxShadow: 'var(--card-shadow)',
        transition: 'box-shadow 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.5s cubic-bezier(0.16,1,0.3,1)',
        cursor: 'default',
      }}
    >
      {/* Gradient hero */}
      <div
        style={{
          borderRadius: 14,
          background: CARD_GRADIENT,
          padding: 'clamp(16px, 4vw, 24px) clamp(16px, 4vw, 24px) clamp(14px, 3.5vw, 20px)',
          marginBottom: 'clamp(14px, 3vw, 20px)',
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>
          <div className="flex flex-wrap items-center justify-between" style={{ rowGap: 8 }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              <plan.Icon
                style={{ width: 16, height: 16, color: '#fff', flexShrink: 0 }}
                strokeWidth={1.8}
              />
              <span className="font-display font-semibold" style={{ fontSize: 'clamp(14px, 3.5vw, 17px)', color: '#fff' }}>
                {t(plan.name)}
              </span>
            </div>
            {plan.badge && (
              <span
                className="font-body"
                style={{
                  fontSize: 11, fontWeight: 600, color: '#f5c842',
                  background: 'rgba(245,200,66,0.18)',
                  border: '1px solid rgba(245,200,66,0.5)',
                  borderRadius: 99, padding: '4px 12px', letterSpacing: 0.5,
                  boxShadow: '0 0 12px rgba(245,200,66,0.3)',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                ✦ {t(plan.badge)}
              </span>
            )}
          </div>
          <p className="font-body" style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
            {t(plan.subtitle)}
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <p className="font-mono" style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>
            {t('from')}
          </p>
          <span className="font-display font-light" style={{ fontSize: 'clamp(40px, 10vw, 62px)', color: '#fff', lineHeight: 1 }}>
            {plan.price}
          </span>
        </div>
      </div>

      {/* Features */}
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, padding: '0 8px', listStyle: 'none', margin: 0 }}>
        {plan.features.map((f) => (
          <li key={f} className="flex items-start" style={{ gap: 12 }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: 14, flexShrink: 0, marginTop: 1 }}>•</span>
            <span className="font-body" style={{ fontSize: 'clamp(12px, 2.5vw, 13.5px)', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              {t(f)}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <motion.button
        onClick={() => router.push('/contact')}
        whileHover={{
          y: -2,
          filter: 'brightness(1.18)',
          boxShadow: '0 6px 20px rgba(13,27,75,0.35)',
        }}
        whileTap={{ y: 0, filter: 'brightness(0.95)' }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center font-body font-semibold"
        style={{
          background: 'var(--btn-primary-bg)',
          color: 'var(--btn-primary-color)',
          fontSize: 'clamp(13px, 3vw, 15px)',
          borderRadius: 99,
          padding: '8px 8px 8px 20px',
          marginTop: 20,
          gap: 12,
          border: 'none',
          cursor: 'pointer',
          boxShadow: 'none',
          filter: 'brightness(1)',
          alignSelf: 'flex-start',
        }}
      >
        {t(plan.cta)}
        <div
          aria-hidden="true"
          style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'var(--btn-primary-disc-bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.25s ease',
          }}
        >
          <ArrowUpRight
            style={{
              width: 16, height: 16, color: 'var(--btn-primary-disc-fg)',
              transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
              transform: hovered ? 'translate(2px, -2px)' : 'translate(0,0)',
            }}
          />
        </div>
      </motion.button>
    </motion.div>
  )
}

export default function Pricing() {
  const [quoteHovered, setQuoteHovered] = useState(false)
  const router = useRouter()
  const { t } = useLang()
  const { theme } = useTheme()
  const dark = theme === 'dark'

  return (
    <section style={{ background: 'var(--bg)', padding: 'clamp(32px, 5vw, 60px) 0 clamp(60px, 8vw, 96px)' }}>
      <div className="px-5 md:px-6 lg:px-0" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Plan cards — 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 12 }}>
          {ALL_PLANS.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} i={i} dark={dark} />
          ))}
        </div>

        {/* Custom Quote bar */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          whileTap={{ scale: 0.985, y: 0 }}
          onClick={() => router.push('/contact')}
          onMouseEnter={() => setQuoteHovered(true)}
          onMouseLeave={() => setQuoteHovered(false)}
          className="flex items-center justify-between w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          style={{
            background: dark ? 'var(--surface-2)' : 'var(--surface)',
            borderRadius: 16,
            padding: 'clamp(16px, 4vw, 20px) clamp(16px, 4.5vw, 24px)',
            border: dark ? '1px solid transparent' : '1px solid var(--border)',
            gap: 12,
            minWidth: 0,
            transition: 'box-shadow 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0, overflow: 'hidden' }}>
            <span
              className="font-display font-semibold"
              style={{
                fontSize: 'clamp(18px, 4vw, 26px)',
                color: 'var(--text-primary)',
                letterSpacing: -0.4,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {t('Need a custom solution?')}
            </span>
            <span
              className="font-body"
              style={{
                fontSize: 'clamp(12px, 2vw, 14px)',
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {t('Every project is unique. Contact us for a tailored proposal and project estimate.')}
            </span>
          </div>
          <div
            aria-hidden="true"
            style={{
              width: 'clamp(44px, 12vw, 56px)', height: 'clamp(44px, 12vw, 56px)', borderRadius: 14,
              background: dark ? 'var(--border-subtle)' : 'var(--surface-2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ArrowUpRight
              style={{
                width: 20, height: 20,
                color: dark ? 'var(--text-primary)' : 'var(--text-secondary)',
                transition: 'transform 0.28s cubic-bezier(0.22,1,0.36,1)',
                transform: quoteHovered ? 'translate(3px, -3px)' : 'translate(0,0)',
              }}
            />
          </div>
        </motion.button>
      </div>
    </section>
  )
}
