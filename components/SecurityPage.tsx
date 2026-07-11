'use client'

import { motion } from 'framer-motion'
import { Lock, ShieldCheck, Server, Eye, Code2, FileText } from 'lucide-react'
import { useLang } from './LanguageProvider'

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
  { label: 'IT Park Uzbekistan', sub: 'Official Resident' },
  { label: 'GDPR', sub: 'Aligned Practices' },
  { label: 'NDA', sub: 'Signed on Every Project' },
  { label: 'ISO 27001', sub: 'Principles Followed' },
]

export default function SecurityPage() {
  const { t } = useLang()

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(56px, 10vw, 80px) 24px clamp(48px, 9vw, 72px)' }}>
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
              style={{ fontSize: 'clamp(36px, 9vw, 64px)', letterSpacing: 'clamp(-2.4px, -0.32vw, -1.2px)', lineHeight: 1.05, color: 'var(--text-primary)', margin: 0 }}
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
      <section style={{ background: 'var(--bg)', padding: '0 24px clamp(56px, 9vw, 72px)' }}>
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            gap: 12,
          }}
        >
          {TRUST_BADGES.map((badge, i) => (
            <motion.div
              key={badge.label}
              className="px-4 py-3.5 lg:px-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: 12,
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
              }}
            >
              <span className="font-display font-semibold" style={{ fontSize: 15, color: 'var(--text-primary)', letterSpacing: -0.3 }}>
                {t(badge.label)}
              </span>
              <span className="font-body" style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: 0.2 }}>
                {t(badge.sub)}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Security pillars ── */}
      <section style={{ background: 'var(--bg)', padding: '0 24px clamp(64px, 10vw, 96px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 4vw, 40px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className="font-mono" style={{ fontSize: 11, letterSpacing: 3, color: 'var(--text-tertiary)' }}>
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
            style={{
              gap: 14,
            }}
          >
            {PILLARS.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    padding: 'clamp(22px, 3vw, 28px) clamp(20px, 3vw, 28px) clamp(26px, 3.2vw, 32px)',
                    borderRadius: 16,
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'var(--surface-3)',
                      border: '1px solid var(--card-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon style={{ width: 20, height: 20, color: 'var(--text-primary)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <h3
                      className="font-display font-semibold"
                      style={{ fontSize: 18, letterSpacing: -0.4, color: 'var(--text-primary)', margin: 0 }}
                    >
                      {t(p.title)}
                    </h3>
                    <p
                      className="font-body"
                      style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0 }}
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
          <div
            style={{
              borderRadius: 20,
              background: 'linear-gradient(135deg, #080a18 0%, #0d1420 50%, #131825 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: 'clamp(32px, 5.1vw, 52px) clamp(24px, 5.5vw, 56px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'clamp(28px, 4vw, 40px)',
              flexWrap: 'wrap',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow */}
            <div style={{
              position: 'absolute',
              top: -100, right: -80,
              width: 400, height: 400,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minWidth: 'min(280px, 100%)' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 99,
                  padding: '5px 14px',
                  alignSelf: 'flex-start',
                }}
              >
                <ShieldCheck style={{ width: 13, height: 13, color: 'rgba(255,255,255,0.7)' }} />
                <span className="font-mono" style={{ fontSize: 11, letterSpacing: 1, color: 'rgba(255,255,255,0.7)' }}>
                  {t('OUR COMMITMENT')}
                </span>
              </div>
              <h2
                className="font-display font-semibold"
                style={{ fontSize: 'clamp(28px, 5.5vw, 36px)', letterSpacing: 'clamp(-1.2px, -0.16vw, -0.6px)', lineHeight: 1.15, color: '#fff', margin: 0 }}
              >
                {t("We treat your project like it's ours.")}
              </h2>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', margin: 0, maxWidth: 480 }}
              >
                {t("Security isn't a checkbox — it's embedded in how we design, code, and deploy every single day. You get full visibility, formal agreements, and a team that takes responsibility.")}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: '100%' }}>
              {[
                t('Full source code ownership on delivery'),
                t('NDA signed before any scoping call'),
                t('No third-party data sharing, ever'),
                t('Incident response within 4 hours'),
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-body" style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
