'use client'

/* Self-contained dark "Lumina" analytics dashboard, drawn as inline SVG.
   Replaces the static showcase.png inside the Hero browser mockup. */

const PURPLE = '#8b5cf6'
const PURPLE_LT = '#a78bfa'
const GREEN = '#34d399'
const RED = '#f87171'
const APP_BG = '#0a0a0f'
const SIDEBAR_BG = '#0c0c12'
const PANEL_BG = '#141419'
const PANEL_BORDER = '#23232c'
const TXT_PRIMARY = '#f4f4f7'
const TXT_SECONDARY = '#8a8a99'
const TXT_MUTED = '#54546a'
const GRID = 'rgba(255,255,255,0.05)'

const DISPLAY = 'var(--font-display), system-ui, sans-serif'
const BODY = 'var(--font-body), system-ui, sans-serif'

function spark(values: number[], x: number, y: number, w: number, h: number) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const step = w / (values.length - 1)
  const pts = values.map((v, i) => [x + i * step, y + h - ((v - min) / range) * h] as const)
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const area = `${line} L${(x + w).toFixed(1)},${(y + h).toFixed(1)} L${x.toFixed(1)},${(y + h).toFixed(1)} Z`
  return { line, area }
}

const CARDS = [
  { x: 250, title: 'Total Revenue', value: '$87.4K', badge: '+12.5% YoY', color: GREEN, spark: [10, 14, 12, 18, 16, 23, 21, 29] },
  { x: 465, title: 'New Signups', value: '1,248', badge: '+8.2% MoM', color: GREEN, spark: [8, 10, 9, 13, 12, 17, 16, 21] },
  { x: 680, title: 'Active Users', value: '4.1K', badge: '-1.9% YoY', color: RED, spark: [30, 28, 29, 25, 26, 21, 22, 18] },
  { x: 895, title: 'Churn Rate', value: '2.1%', badge: '-0.5% MoM', color: GREEN, spark: [12, 10, 11, 9, 10, 8, 9, 7] },
]
const CARD_W = 199
const CARD_H = 135
const CARD_Y = 180

const NAV = [
  { label: 'Dashboard', y: 132, active: true },
  { label: 'Projects', y: 186 },
  { label: 'Analytics', y: 240 },
  { label: 'Reports', y: 294 },
  { label: 'Team', y: 348 },
  { label: 'Settings', y: 402 },
]

const HEAT = [
  [0.9, 0.6, 0.75, 0.5, 0.85, 0.4, 0.2],
  [0.55, 0.8, 0.45, 0.7, 0.35, 0.6, 0.25],
  [0.7, 0.4, 0.85, 0.5, 0.65, 0.3, 0.5],
  [0.45, 0.65, 0.55, 0.8, 0.4, 0.7, 0.35],
  [0.6, 0.5, 0.7, 0.45, 0.75, 0.4, 0.55],
]

const REVENUE_LINE =
  'M306,519.4 C333,519.4 333.5,494.6 360.5,494.6 C387.5,494.6 388,500.4 415,500.4 ' +
  'C442,500.4 442.5,461 469.5,461 C496.5,461 497,472.7 524,472.7 C551,472.7 551.5,439.1 578.5,439.1 ' +
  'C605.5,439.1 606,449.3 633,449.3 C660,449.3 660.5,407 687.5,407 C714.5,407 715,417.2 742,417.2'
const REVENUE_AREA = `${REVENUE_LINE} L742,534 L306,534 Z`

function NavIcon({ label, x, y, color }: { label: string; x: number; y: number; color: string }) {
  const s = { stroke: color, strokeWidth: 1.6, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (label) {
    case 'Dashboard':
      return (
        <g {...s}>
          <rect x={x} y={y} width="7" height="7" rx="1.5" />
          <rect x={x + 9} y={y} width="7" height="7" rx="1.5" />
          <rect x={x} y={y + 9} width="7" height="7" rx="1.5" />
          <rect x={x + 9} y={y + 9} width="7" height="7" rx="1.5" />
        </g>
      )
    case 'Projects':
      return <path d={`M${x},${y + 3} h5 l2,2 h7 v9 h-14 Z`} {...s} />
    case 'Analytics':
      return <polyline points={`${x},${y + 14} ${x + 5},${y + 7} ${x + 9},${y + 10} ${x + 16},${y + 2}`} {...s} />
    case 'Reports':
      return (
        <g {...s}>
          <rect x={x + 1} y={y} width="14" height="16" rx="2" />
          <line x1={x + 4} y1={y + 5} x2={x + 12} y2={y + 5} />
          <line x1={x + 4} y1={y + 9} x2={x + 12} y2={y + 9} />
          <line x1={x + 4} y1={y + 12} x2={x + 9} y2={y + 12} />
        </g>
      )
    case 'Team':
      return (
        <g {...s}>
          <circle cx={x + 5} cy={y + 5} r="3" />
          <circle cx={x + 12} cy={y + 5} r="3" />
          <path d={`M${x},${y + 16} c0,-4 3,-6 5,-6 s5,2 5,6`} />
        </g>
      )
    default:
      return (
        <g {...s}>
          <circle cx={x + 8} cy={y + 8} r="3.2" />
          <path d={`M${x + 8},${y} v3 M${x + 8},${y + 13} v3 M${x},${y + 8} h3 M${x + 13},${y + 8} h3`} />
        </g>
      )
  }
}

export default function DashboardMockup() {
  return (
    <svg
      viewBox="0 0 1120 580"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PURPLE} stopOpacity="0.42" />
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="revLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={PURPLE} />
          <stop offset="100%" stopColor={PURPLE_LT} />
        </linearGradient>
        <linearGradient id="sparkUp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PURPLE} stopOpacity="0.35" />
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="avatarG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={PURPLE_LT} />
          <stop offset="100%" stopColor={PURPLE} />
        </linearGradient>
      </defs>

      {/* Base */}
      <rect x="0" y="0" width="1120" height="580" fill={APP_BG} />
      <rect x="0" y="0" width="210" height="580" fill={SIDEBAR_BG} />
      <line x1="210" y1="0" x2="210" y2="580" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <line x1="210" y1="84" x2="1120" y2="84" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* ── Logo ── */}
      <g>
        <path d="M28,34 l9,7 -9,7 -9,-7 Z" fill="url(#avatarG)" />
        <path d="M28,44 l9,7 -9,7 -9,-7 Z" fill={PURPLE} opacity="0.5" />
        <text x="52" y="50" fontFamily={DISPLAY} fontSize="17" fontWeight="700" fill={TXT_PRIMARY}>Ctrl Code</text>
      </g>

      {/* ── Sidebar nav ── */}
      {NAV.map((n) => (
        <g key={n.label}>
          {n.active && <rect x="16" y={n.y - 18} width="178" height="38" rx="10" fill="rgba(139,92,246,0.14)" />}
          <NavIcon label={n.label} x={30} y={n.y - 8} color={n.active ? PURPLE_LT : TXT_SECONDARY} />
          <text
            x="56"
            y={n.y + 5}
            fontFamily={BODY}
            fontSize="14.5"
            fontWeight={n.active ? 600 : 500}
            fill={n.active ? '#e9e4ff' : TXT_SECONDARY}
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* ── Header: search + actions ── */}
      <rect x="250" y="26" width="366" height="42" rx="11" fill="#101016" stroke={PANEL_BORDER} strokeWidth="1" />
      <g stroke={TXT_MUTED} strokeWidth="1.7" fill="none" strokeLinecap="round">
        <circle cx="274" cy="47" r="5.5" />
        <line x1="278.5" y1="51.5" x2="283" y2="56" />
      </g>
      <text x="294" y="52" fontFamily={BODY} fontSize="14" fill={TXT_MUTED}>Search</text>

      <g stroke={TXT_SECONDARY} strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M986,40 h14 v11 h-14 Z M990,40 v-3 h6 v3" />
        <path d="M1030,39 c-4,0 -6,3 -6,7 c0,5 -3,6 -3,6 h18 c0,0 -3,-1 -3,-6 c0,-4 -2,-7 -6,-7 Z M1027,55 a3,3 0 0 0 6,0" />
      </g>
      <circle cx="1070" cy="47" r="18" fill="url(#avatarG)" />
      <text x="1070" y="52" textAnchor="middle" fontFamily={DISPLAY} fontSize="14" fontWeight="700" fill="#fff">J</text>

      {/* ── Page title + controls ── */}
      <text x="250" y="150" fontFamily={DISPLAY} fontSize="27" fontWeight="700" fill={TXT_PRIMARY} letterSpacing="-0.5">
        Performance Overview
      </text>
      <rect x="858" y="126" width="182" height="38" rx="10" fill={PANEL_BG} stroke={PANEL_BORDER} strokeWidth="1" />
      <g stroke={PURPLE_LT} strokeWidth="1.6" fill="none" strokeLinecap="round">
        <rect x="874" y="138" width="14" height="13" rx="2" />
        <line x1="874" y1="142" x2="888" y2="142" />
        <line x1="878" y1="135" x2="878" y2="139" />
        <line x1="884" y1="135" x2="884" y2="139" />
      </g>
      <text x="898" y="150" fontFamily={BODY} fontSize="13.5" fontWeight="600" fill={TXT_PRIMARY}>Oct 1 – Oct 28</text>
      <path d="M1022,143 l4,4 4,-4" stroke={TXT_SECONDARY} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="1050" y="126" width="38" height="38" rx="10" fill={PANEL_BG} stroke={PANEL_BORDER} strokeWidth="1" />
      <g stroke={TXT_SECONDARY} strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M1062,141 a7,7 0 1 1 -1,7" />
        <path d="M1062,136 v5 h5" />
      </g>

      {/* ── Stat cards ── */}
      {CARDS.map((c) => {
        const sp = spark(c.spark, c.x + CARD_W - 92, CARD_Y + 78, 70, 30)
        return (
          <g key={c.title}>
            <rect x={c.x} y={CARD_Y} width={CARD_W} height={CARD_H} rx="14" fill={PANEL_BG} stroke={PANEL_BORDER} strokeWidth="1" />
            <text x={c.x + 22} y={CARD_Y + 32} fontFamily={BODY} fontSize="13.5" fill={TXT_SECONDARY}>{c.title}</text>
            <g fill={TXT_MUTED}>
              <circle cx={c.x + CARD_W - 40} cy={CARD_Y + 27} r="1.6" />
              <circle cx={c.x + CARD_W - 33} cy={CARD_Y + 27} r="1.6" />
              <circle cx={c.x + CARD_W - 26} cy={CARD_Y + 27} r="1.6" />
            </g>
            <text x={c.x + 22} y={CARD_Y + 70} fontFamily={DISPLAY} fontSize="31" fontWeight="700" fill={TXT_PRIMARY} letterSpacing="-1">
              {c.value}
            </text>
            <text x={c.x + 22} y={CARD_Y + 104} fontFamily={BODY} fontSize="12.5" fontWeight="600" fill={c.color}>
              {c.badge}
            </text>
            <path d={sp.area} fill="url(#sparkUp)" />
            <path d={sp.line} fill="none" stroke={c.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )
      })}

      {/* ── Revenue Growth panel ── */}
      <rect x="250" y="331" width="510" height="232" rx="14" fill={PANEL_BG} stroke={PANEL_BORDER} strokeWidth="1" />
      <text x="272" y="363" fontFamily={DISPLAY} fontSize="16" fontWeight="700" fill={TXT_PRIMARY}>Revenue Growth</text>
      <g fill={TXT_MUTED}>
        <circle cx="725" cy="357" r="1.6" />
        <circle cx="732" cy="357" r="1.6" />
        <circle cx="739" cy="357" r="1.6" />
      </g>

      {/* grid + y labels */}
      {[
        { v: '$100K', y: 388 },
        { v: '$80K', y: 417.2 },
        { v: '$60K', y: 446.4 },
        { v: '$40K', y: 475.6 },
        { v: '$20K', y: 504.8 },
        { v: '$0K', y: 534 },
      ].map((g) => (
        <g key={g.v}>
          <line x1="306" y1={g.y} x2="742" y2={g.y} stroke={GRID} strokeWidth="1" />
          <text x="298" y={g.y + 4} textAnchor="end" fontFamily={BODY} fontSize="10.5" fill={TXT_MUTED}>{g.v}</text>
        </g>
      ))}

      <path d={REVENUE_AREA} fill="url(#revFill)" />
      <path d={REVENUE_LINE} fill="none" stroke="url(#revLine)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />

      {/* x labels */}
      {[
        { l: 'Oct 1', x: 306 },
        { l: 'Oct 8', x: 415 },
        { l: 'Oct 15', x: 524 },
        { l: 'Oct 22', x: 633 },
        { l: 'Oct 29', x: 742 },
      ].map((g) => (
        <text key={g.l} x={g.x} y="551" textAnchor="middle" fontFamily={BODY} fontSize="10.5" fill={TXT_MUTED}>{g.l}</text>
      ))}

      {/* highlight marker + tooltip at peak (Oct 26) */}
      <line x1="687.5" y1="407" x2="687.5" y2="534" stroke={PURPLE_LT} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="687.5" cy="407" r="6" fill="#fff" stroke={PURPLE} strokeWidth="3" />
      <g>
        <rect x="639" y="356" width="97" height="40" rx="8" fill="#1c1c24" stroke={PANEL_BORDER} strokeWidth="1" />
        <text x="687.5" y="373" textAnchor="middle" fontFamily={DISPLAY} fontSize="13" fontWeight="700" fill={TXT_PRIMARY}>$87,452.18</text>
        <text x="687.5" y="388" textAnchor="middle" fontFamily={BODY} fontSize="10.5" fill={TXT_SECONDARY}>Oct 26</text>
      </g>

      {/* ── User Retention panel ── */}
      <rect x="776" y="331" width="318" height="150" rx="14" fill={PANEL_BG} stroke={PANEL_BORDER} strokeWidth="1" />
      <text x="798" y="363" fontFamily={DISPLAY} fontSize="16" fontWeight="700" fill={TXT_PRIMARY}>User Retention</text>
      <text x="1072" y="363" textAnchor="end" fontFamily={BODY} fontSize="12" fill={TXT_SECONDARY}>65% avg.</text>
      {HEAT.map((row, r) =>
        row.map((op, col) => (
          <rect
            key={`${r}-${col}`}
            x={798 + col * 38}
            y={382 + r * 17}
            width="32"
            height="12"
            rx="3"
            fill={PURPLE}
            opacity={op}
          />
        ))
      )}
      <text x="798" y="474" fontFamily={BODY} fontSize="10" fill={TXT_MUTED}>avg.</text>
      <text x="935" y="474" textAnchor="middle" fontFamily={BODY} fontSize="10" fill={TXT_MUTED}>65%</text>
      <text x="1072" y="474" textAnchor="end" fontFamily={BODY} fontSize="10" fill={TXT_MUTED}>avg.</text>

      {/* ── Recent Activity panel ── */}
      <rect x="776" y="497" width="318" height="66" rx="14" fill={PANEL_BG} stroke={PANEL_BORDER} strokeWidth="1" />
      <text x="798" y="521" fontFamily={DISPLAY} fontSize="14" fontWeight="700" fill={TXT_PRIMARY}>Recent Activity</text>
      <g fill={TXT_MUTED}>
        <circle cx="1060" cy="517" r="1.5" />
        <circle cx="1066" cy="517" r="1.5" />
        <circle cx="1072" cy="517" r="1.5" />
      </g>
      {[
        { i: 'S', name: 'Sarah', action: "created 'Campaign Q4'", y: 538 },
        { i: 'M', name: 'Mike', action: "updated 'Dashboard'", y: 552 },
      ].map((a) => (
        <g key={a.i}>
          <circle cx="806" cy={a.y + 1} r="8" fill="url(#avatarG)" opacity="0.9" />
          <text x="806" y={a.y + 4} textAnchor="middle" fontFamily={DISPLAY} fontSize="8.5" fontWeight="700" fill="#fff">{a.i}</text>
          <text x="822" y={a.y + 4} fontFamily={BODY} fontSize="11.5" fill={TXT_SECONDARY}>
            <tspan fontWeight="700" fill={TXT_PRIMARY}>{a.name}</tspan> {a.action}
          </text>
        </g>
      ))}
    </svg>
  )
}
