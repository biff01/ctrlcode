'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from './LanguageProvider'

const SMOOTH = [0.16, 1, 0.3, 1] as const

const ISSUES = [
  {
    code: 'ENG-2991',
    title: 'Ride status fails to update',
    icon: (
      <svg viewBox="0 0 20 20" width="22" height="22" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8.5" stroke="var(--status-warning)" strokeWidth="1.5" />
        <path d="M10 1.5 A8.5 8.5 0 0 1 10 18.5 Z" fill="var(--status-warning)" />
      </svg>
    ),
  },
  {
    code: 'ENG-2843',
    title: 'App shows incorrect pickup location',
    icon: (
      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--status-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 10, color: 'var(--status-warning-text)', fontWeight: 700, lineHeight: 1 }}>5</span>
      </div>
    ),
  },
  {
    code: 'FEA-2018',
    title: 'Improve explanations for tax feature',
    icon: (
      <svg viewBox="0 0 20 20" width="22" height="22" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8.5" stroke="var(--text-tertiary)" strokeWidth="1.5" />
      </svg>
    ),
  },
]

export default function WorkShowcase() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  return (
    <section ref={sectionRef} style={{ background: 'var(--bg)', overflow: 'hidden', padding: 'clamp(56px, 8vw, 96px) 0' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: 1440, margin: '0 auto' }}>

        {/* ── Left: circles + waves in one SVG, cy=380 matching Pencil ── */}
        {/* below lg the band height follows the viewport via aspect-ratio; fixed 730px from lg up */}
        <motion.div
          className="max-lg:aspect-[720/730] lg:h-[730px]"
          style={{ flex: 1, position: 'relative' }}
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            viewBox="0 0 720 730"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            <defs>
              <radialGradient id="ws-glow" cx="55%" cy="50%" r="55%">
                <stop offset="0%" stopColor="#2626cc" stopOpacity="0.13" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
              {/* Silver-gray gradient from Pencil: #E0E0E0 → #ABABAB → #676767 */}
              <radialGradient id="ws-sphere" cx="36%" cy="30%" r="72%">
                <stop offset="0%"   stopColor="#E0E0E0" />
                <stop offset="55%"  stopColor="#ABABAB" />
                <stop offset="100%" stopColor="#676767" />
              </radialGradient>
              {/* Clip for the inner 80×80 sphere (r=40) only */}
              <clipPath id="ws-sphere-clip">
                <circle cx="610" cy="380" r="40" />
              </clipPath>
              <style>{`
                @keyframes workShowcase-flow {
                  from { stroke-dashoffset: 800 }
                  to   { stroke-dashoffset: 0 }
                }
                .workShowcase-ws1 { stroke-dasharray: 800; animation: workShowcase-flow 3s ease-in-out infinite; }
                .workShowcase-ws2 { stroke-dasharray: 800; animation: workShowcase-flow 3s ease-in-out infinite 0.55s; }
                .workShowcase-ws3 { stroke-dasharray: 800; animation: workShowcase-flow 3s ease-in-out infinite 1.1s; }
                .workShowcase-ws4 { stroke-dasharray: 800; animation: workShowcase-flow 3s ease-in-out infinite 1.65s; }
              `}</style>
            </defs>

            {/* Background glow centred at cy=380 */}
            <ellipse cx="390" cy="380" rx="310" ry="260" fill="url(#ws-glow)" />

            {/*
              Quadratic bezier S-waves, baseline cy=380.
              Actual peak = 0.5*cy + 0.5*Qy.
              Wave 1 ±120: Q top=140, bottom=620
              Wave 2 ±88:  Q top=204, bottom=556
              Wave 3 ±58:  Q top=264, bottom=496
              Wave 4 ±32:  Q top=316, bottom=444
            */}
            <path className="workShowcase-ws1" d="M170 380 Q265 140, 360 380 Q455 620, 550 380" stroke="#5252e0" strokeWidth="2.5" opacity="1" />
            <path className="workShowcase-ws2" d="M170 380 Q265 204, 360 380 Q455 556, 550 380" stroke="#4444dd" strokeWidth="1.8" opacity="0.78" />
            <path className="workShowcase-ws3" d="M170 380 Q265 264, 360 380 Q455 496, 550 380" stroke="#3333cc" strokeWidth="1.2" opacity="0.52" />
            <path className="workShowcase-ws4" d="M170 380 Q265 316, 360 380 Q455 444, 550 380" stroke="#2222bb" strokeWidth="0.8" opacity="0.32" />

            {/* ── Left circle — hover: whole group lifts, star rotates ── */}
            <motion.g
              whileHover="hover"
              initial="rest"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
              transition={{ duration: 0.5, ease: SMOOTH }}
              style={{ transformOrigin: '110px 380px' }}
            >
              <circle cx="110" cy="380" r="66" fill="none" stroke="var(--border-subtle)" strokeWidth="1" />
              <circle cx="110" cy="380" r="60" style={{ fill: 'var(--surface-2)' }} stroke="var(--border-subtle)" strokeWidth="1" />
              <circle cx="110" cy="380" r="50" style={{ fill: 'var(--bg)' }} />
              {/*
                Star path from Pencil (iKRvp): viewBox [0,0,110,110], size 66×66 at offset (27,27) in Q8kFu.
                Q8kFu TL in SVG: (110-60, 380-60) = (50, 320).
                Star TL in SVG: (50+27, 320+27) = (77, 347). Scale 66/110 = 0.6.
                Center after transform: (77 + 0.6×55, 347 + 0.6×55) = (110, 380) ✓
              */}
              <motion.g
                variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: 18, scale: 1.14 } }}
                transition={{ duration: 0.55, ease: SMOOTH }}
                style={{ transformOrigin: '110px 380px' }}
              >
                <path
                  d="M55 0l8.4 34.7 30.5-18.6-18.6 30.5 34.7 8.4-34.7 8.4 18.6 30.5-30.5-18.6-8.4 34.7-8.4-34.7-30.5 18.6 18.6-30.5-34.7-8.4 34.7-8.4-18.6-30.5 30.5 18.6z"
                  style={{ fill: 'var(--text-primary)' }}
                  transform="translate(77, 347) scale(0.6)"
                />
              </motion.g>
            </motion.g>

            {/* ── Right circle — hover: lifts, specular highlight brightens ── */}
            <motion.g
              whileHover="hover"
              initial="rest"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
              transition={{ duration: 0.5, ease: SMOOTH }}
              style={{ transformOrigin: '610px 380px' }}
            >
              <circle cx="610" cy="380" r="66" fill="none" stroke="var(--border-subtle)" strokeWidth="1" />
              <circle cx="610" cy="380" r="60" style={{ fill: 'var(--surface-2)' }} stroke="var(--border-subtle)" strokeWidth="1" />
              <circle cx="610" cy="380" r="40" fill="url(#ws-sphere)" />
              {/*
                5 diagonal stripes from Pencil, each 12×120 rotated -42°.
                rpnBz TL in SVG: (610-40, 380-40) = (570, 340).
                Stripe x positions within rpnBz: -12, 10, 32, 54, 76 (all at y=-15).
                In SVG abs: x = 570+xi, y = 340-15 = 325. Height = 120. Rotation centre = (x+6, 325+60) = (x+6, 385).
              */}
              <g clipPath="url(#ws-sphere-clip)">
                <rect x="558" y="325" width="12" height="120" fill="#0F0F1B" transform="rotate(-42, 564, 385)" />
                <rect x="580" y="325" width="12" height="120" fill="#0F0F1B" transform="rotate(-42, 586, 385)" />
                <rect x="602" y="325" width="12" height="120" fill="#0F0F1B" transform="rotate(-42, 608, 385)" />
                <rect x="624" y="325" width="12" height="120" fill="#0F0F1B" transform="rotate(-42, 630, 385)" />
                <rect x="646" y="325" width="12" height="120" fill="#0F0F1B" transform="rotate(-42, 652, 385)" />
              </g>
              {/* Specular highlight — brightens and expands on hover */}
              <motion.ellipse
                cx="597" cy="366" rx="13" ry="9"
                variants={{
                  rest: { opacity: 0.28, scale: 1 },
                  hover: { opacity: 0.52, scale: 1.42 },
                }}
                transition={{ duration: 0.5, ease: SMOOTH }}
                fill="white"
                style={{ transformOrigin: '597px 366px' }}
              />
            </motion.g>
          </svg>
        </motion.div>

        {/* ── Right: issue tracker — its panels are positioned on a fixed 720px canvas, so it is desktop-only */}
        <motion.div
          className="max-lg:hidden"
          aria-hidden="true"
          style={{ flex: 1, height: 730, position: 'relative', background: 'var(--bg)' }}
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >

          {/* Connector curves — from command panel right edge (x=280) to card left edges (x=360) */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            viewBox="0 0 720 730"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Button 1 centre y=310 → Card 1 centre y=225 */}
            <path d="M 280 310 C 330 310 330 225 360 225" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" />
            {/* Panel centre y=347 → Card 2 centre y=405 */}
            <path d="M 280 347 C 330 347 330 405 360 405" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" />
            {/* Button 2 centre y=384 → Card 3 centre y=585 */}
            <path d="M 280 384 C 330 384 330 585 360 585" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          {/* Command panel (g4DZtG from Pencil: x=40 y=260 w=240, padding=20, gap=12) */}
          <div style={{
            position: 'absolute', left: 40, top: 260, width: 240,
            background: 'var(--surface-2)', borderRadius: 18, border: '1px solid var(--border-subtle)',
            padding: 20, display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {[
              { label: 'New Issue', glyph: 'Z' },
              { label: 'Create Issue', glyph: '⊞' },
            ].map(({ label, glyph }) => (
              <motion.div key={label} whileHover={{ x: 3, background: 'var(--surface-3)' }} transition={{ duration: 0.18 }} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: 'var(--surface-3)', borderRadius: 10, padding: '12px 16px',
              }}>
                {/* Icon: 36×36 r=8 fill #111 (from Pencil) */}
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: 'var(--bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span className="font-mono font-bold" style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{glyph}</span>
                </div>
                {/* Label: Inter 15px weight 500 (from Pencil) */}
                <span className="font-body" style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>{t(label)}</span>
              </motion.div>
            ))}
          </div>

          {/* Issue cards (from Pencil: x=360 w=300, title fontSize=18, code fontSize=12) */}
          {ISSUES.map((issue, i) => (
            <motion.div
              key={issue.code}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, borderColor: 'var(--border)', transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
              style={{
                position: 'absolute', left: 360, top: 180 + i * 180, width: 300,
                background: 'var(--surface-2)', borderRadius: 14, border: '1px solid var(--border-subtle)',
                padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8,
                overflow: 'hidden',
              }}
            >
              <span className="font-mono" style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: 0.5 }}>
                {issue.code}
              </span>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ flexShrink: 0, paddingTop: 2 }}>{issue.icon}</div>
                <span className="font-body" style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {t(issue.title)}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Mobile-only issue list */}
      <div className="lg:hidden" style={{ padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520, margin: '0 auto' }}>
        {ISSUES.map((issue) => (
          <div key={issue.code} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', background: 'var(--surface-2)', borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
            <div style={{ flexShrink: 0, paddingTop: 2 }}>{issue.icon}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span className="font-mono" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 0.5 }}>{issue.code}</span>
              <span className="font-body" style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{t(issue.title)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
