'use client'

import { motion } from 'framer-motion'
import { useLang } from './LanguageProvider'

const COINBASE_BLUE = '#1652F0' /* Coinbase brand blue — intentional */
const LOGO_SIZE = 'clamp(16px, 2vw, 22px)'

function VercelLogo() {
  return (
    <div className="flex items-center" style={{ gap: 8, color: 'var(--text-primary)' }}>
      <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L21 20H1L11 2Z" fill="currentColor" />
      </svg>
      <span className="font-display font-semibold" style={{ fontSize: LOGO_SIZE }}>
        Vercel
      </span>
    </div>
  )
}

function CursorLogo() {
  return (
    <div className="flex items-center" style={{ gap: 8, color: 'var(--text-primary)' }}>
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span
        className="font-mono font-semibold"
        style={{ fontSize: LOGO_SIZE, letterSpacing: '2px' }}
      >
        CURSOR
      </span>
    </div>
  )
}

function OscarLogo() {
  return (
    <span className="font-display font-light" style={{ fontSize: LOGO_SIZE, color: 'var(--text-primary)', letterSpacing: -1 }}>
      oscar
    </span>
  )
}

function OpenAILogo() {
  return (
    <div className="flex items-center" style={{ gap: 8, color: 'var(--text-primary)' }}>
      <svg aria-hidden="true" width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="13" cy="13" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="13" y1="2" x2="13" y2="7.5" stroke="currentColor" strokeWidth="1.8" />
        <line x1="13" y1="18.5" x2="13" y2="24" stroke="currentColor" strokeWidth="1.8" />
        <line x1="2" y1="13" x2="7.5" y2="13" stroke="currentColor" strokeWidth="1.8" />
        <line x1="18.5" y1="13" x2="24" y2="13" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      <span className="font-display font-medium" style={{ fontSize: LOGO_SIZE }}>
        OpenAI
      </span>
    </div>
  )
}

function CoinbaseLogo() {
  return (
    <div className="flex items-center" style={{ gap: 8 }}>
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: COINBASE_BLUE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="font-display font-bold"
          style={{ fontSize: 16, color: '#ffffff', lineHeight: 1 }}
        >
          c
        </span>
      </div>
      <span className="font-display font-normal" style={{ fontSize: LOGO_SIZE, color: 'var(--text-primary)' }}>
        coinbase
      </span>
    </div>
  )
}

function CashAppLogo() {
  return (
    <div className="flex items-center" style={{ gap: 12 }}>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="font-display font-bold"
          style={{ fontSize: 20, color: 'var(--bg)', lineHeight: 1 }}
        >
          $
        </span>
      </div>
      <span className="font-body font-medium" style={{ fontSize: LOGO_SIZE, color: 'var(--text-primary)' }}>
        Cash App
      </span>
    </div>
  )
}

function BoomLogo() {
  return (
    <div className="flex items-center" style={{ gap: 8, color: 'var(--text-primary)' }}>
      <svg aria-hidden="true" width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path
          d="M13 1L14.6 9.4L22 7L17.2 13L22 19L14.6 16.6L13 25L11.4 16.6L4 19L8.8 13L4 7L11.4 9.4L13 1Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="font-display font-bold"
        style={{ fontSize: LOGO_SIZE, letterSpacing: '3px' }}
      >
        BOOM
      </span>
    </div>
  )
}

function RampLogo() {
  return (
    <div className="flex items-center" style={{ gap: 8, color: 'var(--text-primary)' }}>
      <span className="font-display font-normal" style={{ fontSize: LOGO_SIZE }}>
        ramp
      </span>
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 20L20 4M20 4H10M20 4V14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

const logos = [
  <VercelLogo key="vercel" />,
  <CursorLogo key="cursor" />,
  <OscarLogo key="oscar" />,
  <OpenAILogo key="openai" />,
  <CoinbaseLogo key="coinbase" />,
  <CashAppLogo key="cashapp" />,
  <BoomLogo key="boom" />,
  <RampLogo key="ramp" />,
]

export default function TrustStrip() {
  const { t } = useLang()
  return (
    <section aria-label="Trusted by leading companies" style={{ background: 'var(--bg)', padding: '56px 0', borderTop: '1px solid var(--trust-border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 4vw, 40px)' }}>
        <motion.p
          className="font-body text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 11,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: 40,
          }}
        >
          {t('Trusted by leading teams')}
        </motion.p>
        <div
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 lg:flex-nowrap lg:justify-between lg:gap-x-0"
        >
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              whileHover={{ opacity: 1, scale: 1.06, transition: { duration: 0.18 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{ cursor: 'default' }}
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
