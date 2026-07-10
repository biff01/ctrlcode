'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

function TargetIllo({ dark }: { dark: boolean }) {
  const accent = dark ? '#ffffff' : '#0D1B4B'
  const ringOuter = dark ? '#383838' : '#c4c7d0'
  const ringMid = dark ? '#525252' : '#b0b4bf'
  const ringInner = dark ? '#888888' : '#9499a6'
  const crosshair = dark ? 'rgba(255,255,255,0.15)' : 'rgba(59,92,228,0.2)'
  return (
    <svg viewBox="0 0 340 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <ellipse cx="170" cy="190" rx="140" ry="140" stroke={ringOuter} strokeWidth="1.5" />
      <ellipse cx="170" cy="190" rx="96" ry="96" stroke={ringMid} strokeWidth="1.5" />
      <ellipse cx="170" cy="190" rx="52" ry="52" stroke={ringInner} strokeWidth="2" />
      <ellipse cx="170" cy="190" rx="16" ry="16" fill={accent} />
      <line x1="0" y1="190" x2="340" y2="190" stroke={crosshair} strokeWidth="1.5" />
      <line x1="170" y1="0" x2="170" y2="380" stroke={crosshair} strokeWidth="1.5" />
    </svg>
  )
}

function NetworkIllo({ dark }: { dark: boolean }) {
  const accent = dark ? '#ffffff' : '#0D1B4B'
  const line = dark ? '#383838' : '#c4c7d0'
  const lineMain = dark ? '#707070' : '#9499a6'
  const node = dark ? '#888' : '#9499a6'
  const outputFill = dark ? 'rgba(255,255,255,0.3)' : 'rgba(13,27,75,0.25)'
  return (
    <svg viewBox="0 0 340 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Connections */}
      <line x1="70" y1="120" x2="170" y2="190" stroke={line} strokeWidth="1.5" />
      <line x1="70" y1="260" x2="170" y2="190" stroke={line} strokeWidth="1.5" />
      <line x1="170" y1="190" x2="280" y2="190" stroke={lineMain} strokeWidth="2" />
      <line x1="170" y1="70" x2="280" y2="190" stroke={line} strokeWidth="1.5" />
      <line x1="170" y1="310" x2="280" y2="190" stroke={line} strokeWidth="1.5" />
      <line x1="70" y1="120" x2="170" y2="70" stroke={line} strokeWidth="1" />
      <line x1="70" y1="260" x2="170" y2="310" stroke={line} strokeWidth="1" />
      {/* Input nodes */}
      <circle cx="70" cy="120" r="14" stroke={node} strokeWidth="1.8" />
      <circle cx="70" cy="260" r="14" stroke={node} strokeWidth="1.8" />
      {/* Hidden nodes */}
      <circle cx="170" cy="70" r="14" stroke={node} strokeWidth="1.8" />
      <circle cx="170" cy="310" r="14" stroke={node} strokeWidth="1.8" />
      {/* Core AI */}
      <circle cx="170" cy="190" r="20" fill={accent} />
      {/* Output */}
      <circle cx="280" cy="190" r="20" stroke={accent} strokeWidth="2.5" />
      <circle cx="280" cy="190" r="8" fill={outputFill} />
    </svg>
  )
}

function SpeedIllo({ dark }: { dark: boolean }) {
  const accent = dark ? '#ffffff' : '#0D1B4B'
  const speedLine = dark ? '#555' : '#b0b4bf'
  return (
    <svg viewBox="0 0 340 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Left speed lines */}
      <line x1="20" y1="130" x2="130" y2="130" stroke={speedLine} strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="165" x2="110" y2="165" stroke={speedLine} strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="200" x2="115" y2="200" stroke={speedLine} strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="235" x2="105" y2="235" stroke={speedLine} strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="270" x2="125" y2="270" stroke={speedLine} strokeWidth="2" strokeLinecap="round" />
      {/* Lightning bolt */}
      <path
        d="M200 30 L148 200 L186 200 L142 360 L238 155 L200 155 Z"
        fill={accent}
      />
      {/* Right speed lines */}
      <line x1="255" y1="155" x2="325" y2="155" stroke={speedLine} strokeWidth="2" strokeLinecap="round" />
      <line x1="248" y1="190" x2="325" y2="190" stroke={speedLine} strokeWidth="2" strokeLinecap="round" />
      <line x1="252" y1="225" x2="318" y2="225" stroke={speedLine} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const FIG_DEFS = [
  {
    label: 'FIG 0.2',
    Illo: TargetIllo,
    title: 'Built for purpose',
    desc: 'Ctrl Code is shaped by the practices and principles of world-class product teams — every decision serves the outcome.',
  },
  {
    label: 'FIG 0.3',
    Illo: NetworkIllo,
    title: 'Powered by AI agents',
    desc: 'Designed for workflows shared by humans and AI, from planning through execution and post-launch optimisation.',
  },
  {
    label: 'FIG 0.4',
    Illo: SpeedIllo,
    title: 'Designed for speed',
    desc: 'Reduces noise and restores momentum so your team can ship with clarity, confidence, and relentless focus.',
  },
]

export default function Services() {
  const colsRef = useRef<HTMLDivElement>(null)
  const colsVisible = useInView(colsRef, { once: true, margin: '-80px' })
  const { t } = useLang()
  const { theme } = useTheme()
  const dark = theme === 'dark'

  return (
    <section
      style={{
        background: 'var(--section-alt)',
        padding: '110px 0 120px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Statement headline */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 88 }}
        >
          <div>
            <span
              className="font-display font-semibold"
              style={{ fontSize: 46, letterSpacing: -1.8, lineHeight: 1.18, color: 'var(--text-primary)' }}
            >
              {t('A new species of product tool.')}{' '}
            </span>
            <span
              className="font-display font-semibold"
              style={{ fontSize: 46, letterSpacing: -1.8, lineHeight: 1.18, color: 'var(--text-secondary)' }}
            >
              {t('Purpose-built for modern teams with AI workflows at its core, Ctrl Code sets a new standard for planning and building products.')}
            </span>
          </div>
        </motion.div>

        {/* Fig columns */}
        <div ref={colsRef} className="flex w-full" style={{ gap: 0 }}>
          {FIG_DEFS.map((fig, i) => (
            <motion.div
              key={fig.label}
              initial={{ opacity: 0, y: 40 }}
              animate={colsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '0',
                paddingLeft: i === 0 ? 0 : 44,
                paddingRight: i === 2 ? 0 : 44,
                borderLeft: i > 0 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <span
                className="font-mono"
                style={{ fontSize: 12, letterSpacing: 2.2, color: 'var(--text-tertiary)', marginBottom: 20 }}
              >
                {fig.label}
              </span>
              <div style={{ height: 360, width: '100%' }}><fig.Illo dark={dark} /></div>
              <div style={{ paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h3
                  className="font-display font-semibold"
                  style={{ fontSize: 17, color: 'var(--text-primary)', letterSpacing: -0.3 }}
                >
                  {t(fig.title)}
                </h3>
                <p
                  className="font-body"
                  style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-secondary)' }}
                >
                  {t(fig.desc)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
