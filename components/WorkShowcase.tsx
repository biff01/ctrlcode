'use client'

import { useLang } from './LanguageProvider'

const ISSUES = [
  {
    code: 'ENG-2991',
    title: 'Ride status fails to update',
    icon: (
      <svg viewBox="0 0 20 20" width="22" height="22" fill="none">
        <circle cx="10" cy="10" r="8.5" stroke="#f97316" strokeWidth="1.5" />
        <path d="M10 1.5 A8.5 8.5 0 0 1 10 18.5 Z" fill="#f97316" />
      </svg>
    ),
  },
  {
    code: 'ENG-2843',
    title: 'App shows incorrect pickup location',
    icon: (
      <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 10, color: '#fff', fontWeight: 700, lineHeight: 1 }}>5</span>
      </div>
    ),
  },
  {
    code: 'FEA-2018',
    title: 'Improve explanations for tax feature',
    icon: (
      <svg viewBox="0 0 20 20" width="22" height="22" fill="none">
        <circle cx="10" cy="10" r="8.5" stroke="#555" strokeWidth="1.5" />
      </svg>
    ),
  },
]

export default function WorkShowcase() {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--bg)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: 1440, margin: '0 auto' }}>

        {/* ── Left: circles + waves in one SVG, cy=380 matching Pencil ── */}
        {/* below lg the band height follows the viewport via aspect-ratio; fixed 730px from lg up */}
        <div className="max-lg:aspect-[720/730] lg:h-[730px]" style={{ flex: 1, position: 'relative' }}>
          <svg
            viewBox="0 0 720 730"
            fill="none"
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
                @keyframes ws-flow {
                  from { stroke-dashoffset: 800 }
                  to   { stroke-dashoffset: 0 }
                }
                .ws1 { stroke-dasharray: 800; animation: ws-flow 3s linear infinite; }
                .ws2 { stroke-dasharray: 800; animation: ws-flow 3s linear infinite 0.55s; }
                .ws3 { stroke-dasharray: 800; animation: ws-flow 3s linear infinite 1.1s; }
                .ws4 { stroke-dasharray: 800; animation: ws-flow 3s linear infinite 1.65s; }
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
            <path className="ws1" d="M170 380 Q265 140, 360 380 Q455 620, 550 380" stroke="#5252e0" strokeWidth="2.5" opacity="1" />
            <path className="ws2" d="M170 380 Q265 204, 360 380 Q455 556, 550 380" stroke="#4444dd" strokeWidth="1.8" opacity="0.78" />
            <path className="ws3" d="M170 380 Q265 264, 360 380 Q455 496, 550 380" stroke="#3333cc" strokeWidth="1.2" opacity="0.52" />
            <path className="ws4" d="M170 380 Q265 316, 360 380 Q455 444, 550 380" stroke="#2222bb" strokeWidth="0.8" opacity="0.32" />

            {/* ── Left circle (Q8kFu from Pencil, cx=110 cy=380 r=60) ── */}
            {/* Outer ring: rbqes 132×132 → r=66, stroke #FFFFFF0B */}
            <circle cx="110" cy="380" r="66" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            {/* Main frame fill #0F0F1B */}
            <circle cx="110" cy="380" r="60" fill="#0F0F1B" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            {/* Inner dark overlay (Gwjz4, r=50, fill #0A0A15) */}
            <circle cx="110" cy="380" r="50" fill="#0A0A15" />
            {/*
              Star path from Pencil (iKRvp): viewBox [0,0,110,110], size 66×66 at offset (27,27) in Q8kFu.
              Q8kFu TL in SVG: (110-60, 380-60) = (50, 320).
              Star TL in SVG: (50+27, 320+27) = (77, 347). Scale 66/110 = 0.6.
              Center after transform: (77 + 0.6×55, 347 + 0.6×55) = (110, 380) ✓
            */}
            <path
              d="M55 0l8.4 34.7 30.5-18.6-18.6 30.5 34.7 8.4-34.7 8.4 18.6 30.5-30.5-18.6-8.4 34.7-8.4-34.7-30.5 18.6 18.6-30.5-34.7-8.4 34.7-8.4-18.6-30.5 30.5 18.6z"
              fill="white"
              transform="translate(77, 347) scale(0.6)"
            />

            {/* ── Right circle (z9MgI4 from Pencil, cx=610 cy=380) ── */}
            {/* Outer ring: dY11M 132×132 → r=66 */}
            <circle cx="610" cy="380" r="66" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            {/* Main frame (z9MgI4) fill #0F0F1B */}
            <circle cx="610" cy="380" r="60" fill="#0F0F1B" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            {/* Inner sphere (rpnBz, 80×80 → r=40): silver gradient base */}
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
            {/* Specular highlight (gradient centre at 36%/30% of 80px sphere = offset ~29,24 from TL = abs 599,364) */}
            <ellipse cx="597" cy="366" rx="13" ry="9" fill="rgba(255,255,255,0.28)" />
          </svg>
        </div>

        {/* ── Right: issue tracker — its panels are positioned on a fixed 720px canvas, so it is desktop-only */}
        <div className="max-lg:hidden" style={{ flex: 1, height: 730, position: 'relative', background: 'var(--bg)' }}>

          {/* Connector curves — from command panel right edge (x=280) to card left edges (x=360) */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            viewBox="0 0 720 730"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Button 1 centre y=310 → Card 1 centre y=240 */}
            <path d="M 280 310 C 330 310 330 240 360 240" stroke="#2e2e2e" strokeWidth="1.5" strokeLinecap="round" />
            {/* Panel centre y=347 → Card 2 centre y=380 */}
            <path d="M 280 347 C 330 347 330 380 360 380" stroke="#2e2e2e" strokeWidth="1.5" strokeLinecap="round" />
            {/* Button 2 centre y=384 → Card 3 centre y=520 */}
            <path d="M 280 384 C 330 384 330 520 360 520" stroke="#2e2e2e" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          {/* Command panel (g4DZtG from Pencil: x=40 y=260 w=240, padding=20, gap=14) */}
          <div style={{
            position: 'absolute', left: 40, top: 260, width: 240,
            background: 'var(--surface-2)', borderRadius: 18, border: '1px solid var(--border-subtle)',
            padding: 20, display: 'flex', flexDirection: 'column', gap: 14,
          }}>
            {[
              { label: 'New Issue', glyph: 'Z' },
              { label: 'Create Issue', glyph: '⊞' },
            ].map(({ label, glyph }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: 'var(--surface-3)', borderRadius: 10, padding: '12px 14px',
              }}>
                {/* Icon: 36×36 r=8 fill #111 (from Pencil) */}
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: 'var(--bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span className="font-mono font-bold" style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{glyph}</span>
                </div>
                {/* Label: Inter 15px weight 500 white (from Pencil) */}
                <span className="font-body" style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>{t(label)}</span>
              </div>
            ))}
          </div>

          {/* Issue cards (from Pencil: x=360 w=300 h=120, title fontSize=18, code fontSize=12) */}
          {ISSUES.map((issue, i) => (
            <div key={issue.code} style={{
              position: 'absolute', left: 360, top: 180 + i * 140, width: 300,
              background: 'var(--surface-2)', borderRadius: 14, border: '1px solid var(--border-subtle)',
              padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10,
              overflow: 'hidden',
            }}>
              <span className="font-mono" style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: 0.5 }}>
                {issue.code}
              </span>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ flexShrink: 0, paddingTop: 2 }}>{issue.icon}</div>
                <span className="font-body" style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                  {t(issue.title)}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
