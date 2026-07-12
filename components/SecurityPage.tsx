'use client'

import { motion } from 'framer-motion'
import { Lock, ShieldCheck, Server, Eye, Code2, FileText, Building, Award } from 'lucide-react'
import { useLang } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

const SMOOTH = [0.16, 1, 0.3, 1] as const

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: SMOOTH },
  }),
  hover: {
    y: -4,
    transition: { duration: 0.5, ease: SMOOTH },
  },
}

const ICON_VARIANTS = {
  hidden: { scale: 1, rotate: 0 },
  visible: { scale: 1, rotate: 0 },
  hover: { scale: 1.06, rotate: -3, transition: { duration: 0.45, ease: SMOOTH } },
}

const COMMITMENT_ITEMS = [
  'Full source code ownership on delivery',
  'NDA signed before any scoping call',
  'No third-party data sharing, ever',
  'Incident response within 4 hours',
] as const

const PILLARS = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    body: 'All data in transit and at rest is encrypted using TLS 1.3 and AES-256. No plain-text storage, ever.',
  },
  {
    icon: ShieldCheck,
    title: 'Access Control',
    body: 'Role-based permissions and multi-factor authentication across all internal systems and client environments.',
  },
  {
    icon: Server,
    title: 'Secure Infrastructure',
    body: 'Hosted on enterprise-grade cloud providers with automatic backups, failover, and DDoS mitigation built in.',
  },
  {
    icon: Eye,
    title: 'Privacy by Design',
    body: "GDPR-aligned data practices are embedded from day one — not added as an afterthought. Your users' data stays yours.",
  },
  {
    icon: Code2,
    title: 'Code Security',
    body: 'Dependency audits, automated vulnerability scanning, and zero-trust code reviews before every production release.',
  },
  {
    icon: FileText,
    title: 'Transparent Agreements',
    body: 'Full NDAs, formal contracts, and complete IP transfer upon project completion. No grey areas.',
  },
]

const TRUST_BADGES = [
  { label: 'IT Park Uzbekistan', sub: 'Official Resident', icon: Building },
  { label: 'GDPR', sub: 'Aligned Practices', icon: ShieldCheck },
  { label: 'NDA', sub: 'Signed on Every Project', icon: FileText },
  { label: 'ISO 27001', sub: 'Principles Followed', icon: Award },
]

export default function SecurityPage() {
  const { t } = useLang()
  const { theme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <div role="region" aria-label="Security overview">
      {/* ── Hero ── */}
      <section
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(88,44,255,0.06) 0%, transparent 70%), var(--bg)',
          padding: 'clamp(56px, 10vw, 80px) 24px clamp(48px, 9vw, 72px)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            <span className="font-mono" style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--kicker)' }}>
              {t('SECURITY')}
            </span>
            <h1
              className="font-display font-semibold"
              style={{
                fontSize: 'clamp(40px, 9.5vw, 76px)',
                letterSpacing: 'clamp(-2.8px, -0.36vw, -1.4px)',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              {t('Built to protect')}<br />{t('what matters.')}
            </h1>
            <p
              className="font-body"
              style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: 580, margin: 0 }}
            >
              {t('Every product we build follows strict security principles — your data, your users, and your reputation are always protected.')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Trust badges ── */}
      <section style={{ background: 'var(--section-alt)', padding: 'clamp(40px, 6vw, 56px) 24px clamp(56px, 9vw, 72px)' }}>
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            gap: 12,
          }}
        >
          {TRUST_BADGES.map((badge, i) => {
            const BadgeIcon = badge.icon
            return (
              <motion.div
                key={badge.label}
                className="px-4 py-3.5 lg:px-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2, scale: 1.01, transition: { duration: 0.45, ease: SMOOTH } }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: SMOOTH }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  borderRadius: 12,
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                <BadgeIcon aria-hidden="true" style={{ width: 18, height: 18, color: 'var(--kicker)', marginBottom: 2 }} />
                <span className="font-display font-semibold" style={{ fontSize: 15, color: 'var(--text-primary)', letterSpacing: -0.3 }}>
                  {t(badge.label)}
                </span>
                <span className="font-body" style={{ fontSize: 12, color: 'var(--text-secondary)', letterSpacing: 0.2 }}>
                  {t(badge.sub)}
                </span>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── Security pillars ── */}
      <section
        style={{
          background: 'var(--surface-2, color-mix(in srgb, var(--bg) 97%, var(--text-primary) 3%))',
          padding: 'clamp(56px, 9vw, 80px) 24px clamp(64px, 10vw, 96px)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 4vw, 40px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className="font-mono" style={{ fontSize: 12, letterSpacing: 3, color: 'var(--kicker)' }}>
              {t('HOW WE PROTECT YOU')}
            </span>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(28px, 6vw, 42px)', letterSpacing: 'clamp(-1.5px, -0.2vw, -0.75px)', lineHeight: 1.08, color: 'var(--text-primary)', margin: 0 }}
            >
              {t('Six layers of security.')}
            </h2>
          </div>

          {/* 3 × 2 grid → 2 cols tablet, 1 col mobile */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: 16 }}
          >
            {PILLARS.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  custom={i}
                  variants={CARD_VARIANTS}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: '-40px' }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    padding: 'clamp(20px, 3vw, 28px) clamp(20px, 3vw, 28px) clamp(24px, 3.2vw, 32px)',
                    borderRadius: 16,
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    boxShadow: 'var(--card-shadow)',
                    willChange: 'transform',
                  }}
                >
                  <motion.div
                    variants={ICON_VARIANTS}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'var(--surface-3)',
                      border: '1px solid var(--card-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      willChange: 'transform',
                    }}
                  >
                    <Icon aria-hidden="true" style={{ width: 20, height: 20, color: 'var(--text-primary)' }} />
                  </motion.div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <h3
                      className="font-display font-semibold"
                      style={{ fontSize: 'clamp(22px, 2.8vw, 28px)', letterSpacing: -0.4, color: 'var(--text-primary)', margin: 0 }}
                    >
                      {t(p.title)}
                    </h3>
                    <p
                      className="font-body"
                      style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0 }}
                    >
                      {t(p.body)}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Commitment strip ── */}
      <section style={{ background: 'var(--bg)', padding: '0 24px clamp(64px, 10vw, 96px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              borderRadius: 20,
              background: isDark
                ? 'linear-gradient(135deg, #080a18 0%, #0d1420 50%, #131825 100%)'
                : 'linear-gradient(135deg, #f0f3ff 0%, #e8edf8 50%, #dde4f5 100%)',
              border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(13,27,75,0.1)',
              boxShadow: isDark
                ? '0 4px 6px rgba(0,0,0,0.4), 0 24px 80px rgba(0,0,0,0.6)'
                : '0 4px 6px rgba(13,27,75,0.06), 0 24px 80px rgba(13,27,75,0.1)',
              padding: 'clamp(32px, 5.1vw, 52px) clamp(24px, 5.5vw, 56px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'clamp(24px, 4vw, 40px)',
              flexWrap: 'wrap',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: 'absolute',
                top: -100, right: -80,
                width: 480, height: 480,
                borderRadius: '50%',
                background: isDark
                  ? 'radial-gradient(circle, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 40%, transparent 80%)'
                  : 'radial-gradient(circle, rgba(88,44,255,0.07) 0%, rgba(88,44,255,0.02) 40%, transparent 80%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minWidth: 'min(280px, 100%)' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(13,27,75,0.06)',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(13,27,75,0.12)',
                  borderRadius: 99,
                  padding: '4px 12px',
                  alignSelf: 'flex-start',
                }}
              >
                <ShieldCheck
                  aria-hidden="true"
                  style={{
                    width: 14, height: 14,
                    color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(13,27,75,0.65)',
                  }}
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: 1,
                    color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(13,27,75,0.65)',
                  }}
                >
                  {t('OUR COMMITMENT')}
                </span>
              </div>
              <h2
                className="font-display font-semibold"
                style={{
                  fontSize: 'clamp(32px, 5.5vw, 44px)',
                  letterSpacing: 'clamp(-1.5px, -0.2vw, -0.8px)',
                  lineHeight: 1.15,
                  color: isDark ? '#fff' : '#0D1B4B',
                  margin: 0,
                }}
              >
                {t("We treat your project like it's ours.")}
              </h2>
              <p
                className="font-body"
                style={{
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(13,27,75,0.65)',
                  margin: 0,
                  maxWidth: 480,
                }}
              >
                {t("Security isn't a checkbox — it's embedded in how we design, code, and deploy every single day. You get full visibility, formal agreements, and a team that takes responsibility.")}
              </p>
              <motion.a
                href="/contact"
                whileHover={{ y: -3, opacity: 0.88, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 8,
                  padding: '12px 24px',
                  borderRadius: 99,
                  background: isDark ? '#fff' : '#0D1B4B',
                  color: isDark ? '#080a18' : '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: -0.2,
                  textDecoration: 'none',
                  alignSelf: 'flex-start',
                }}
              >
                {t('Start a Project')}
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                maxWidth: '100%',
                minWidth: 'min(260px, 100%)',
                flexShrink: 0,
              }}
            >
              {COMMITMENT_ITEMS.map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.38, delay: idx * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <div
                    style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(13,27,75,0.06)',
                      border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(13,27,75,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}
                  >
                    <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2.5 2.5L8 3"
                        stroke={isDark ? 'rgba(255,255,255,0.8)' : 'rgba(13,27,75,0.7)'}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="font-body" style={{ fontSize: 15, color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(13,27,75,0.75)' }}>
                    {t(item)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
