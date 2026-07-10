'use client'

import { motion } from 'framer-motion'

function VercelLogo() {
  return (
    <div className="flex items-center" style={{ gap: 10, color: 'var(--text-primary)' }}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L21 20H1L11 2Z" fill="currentColor" />
      </svg>
      <span className="font-display font-semibold" style={{ fontSize: 22 }}>
        Vercel
      </span>
    </div>
  )
}

function CursorLogo() {
  return (
    <div className="flex items-center" style={{ gap: 10, color: 'var(--text-primary)' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span
        className="font-mono font-semibold"
        style={{ fontSize: 18, letterSpacing: 2 }}
      >
        CURSOR
      </span>
    </div>
  )
}

function OscarLogo() {
  return (
    <span className="font-display font-light" style={{ fontSize: 32, color: 'var(--text-primary)', letterSpacing: -1 }}>
      oscar
    </span>
  )
}

function OpenAILogo() {
  return (
    <div className="flex items-center" style={{ gap: 9, color: 'var(--text-primary)' }}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="13" cy="13" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="13" y1="2" x2="13" y2="7.5" stroke="currentColor" strokeWidth="1.8" />
        <line x1="13" y1="18.5" x2="13" y2="24" stroke="currentColor" strokeWidth="1.8" />
        <line x1="2" y1="13" x2="7.5" y2="13" stroke="currentColor" strokeWidth="1.8" />
        <line x1="18.5" y1="13" x2="24" y2="13" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      <span className="font-display font-medium" style={{ fontSize: 22 }}>
        OpenAI
      </span>
    </div>
  )
}

function CoinbaseLogo() {
  return (
    <div className="flex items-center" style={{ gap: 9 }}>
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: '#1652F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="font-display font-bold"
          style={{ fontSize: 16, color: '#fff', lineHeight: 1 }}
        >
          c
        </span>
      </div>
      <span className="font-display font-normal" style={{ fontSize: 22, color: 'var(--text-primary)' }}>
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
      <span className="font-body font-medium" style={{ fontSize: 22, color: 'var(--text-primary)' }}>
        Cash App
      </span>
    </div>
  )
}

function BoomLogo() {
  return (
    <div className="flex items-center" style={{ gap: 9, color: 'var(--text-primary)' }}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path
          d="M13 1L14.6 9.4L22 7L17.2 13L22 19L14.6 16.6L13 25L11.4 16.6L4 19L8.8 13L4 7L11.4 9.4L13 1Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="font-display font-bold"
        style={{ fontSize: 20, letterSpacing: 3 }}
      >
        BOOM
      </span>
    </div>
  )
}

function RampLogo() {
  return (
    <div className="flex items-center" style={{ gap: 9, color: 'var(--text-primary)' }}>
      <span className="font-display font-normal" style={{ fontSize: 24 }}>
        ramp
      </span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
  return (
    <section style={{ background: 'var(--bg)', padding: '56px 0', borderTop: '1px solid var(--trust-border)' }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex items-center justify-between"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 0' }}
      >
        {logos}
      </motion.div>
    </section>
  )
}
