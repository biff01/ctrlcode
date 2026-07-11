'use client'

import {
  Command, Asterisk, Activity, Headphones, Triangle, Dog, Sparkles,
  Mail, Box, MessageSquare, Package, type LucideIcon,
} from 'lucide-react'
import { useTheme } from './ThemeProvider'

const TILE = 110
const CENTER = 130
const ICON = 34
const GAP = 12

interface Tile { Icon: LucideIcon; op: number; key: string }

const ROW_TOP: Tile[] = [
  { Icon: Command, op: 0.7, key: 'command' },
  { Icon: Asterisk, op: 0.7, key: 'asterisk' },
  { Icon: Activity, op: 0.7, key: 'activity' },
  { Icon: Headphones, op: 0.7, key: 'headphones' },
]
const ROW_MID_LEFT: Tile[] = [
  { Icon: Triangle, op: 0.7, key: 'triangle' },
  { Icon: Dog, op: 0.7, key: 'dog' },
  { Icon: Sparkles, op: 0.7, key: 'sparkles' },
]
const ROW_MID_RIGHT: Tile[] = [
  { Icon: Mail, op: 0.7, key: 'mail' },
  { Icon: Box, op: 0.7, key: 'box' },
  { Icon: MessageSquare, op: 0.7, key: 'message' },
]
const ROW_BOTTOM: Tile[] = [
  { Icon: Package, op: 0.7, key: 'package' },
  { Icon: Headphones, op: 0.7, key: 'headphones-b' },
  { Icon: Activity, op: 0.7, key: 'activity-b' },
  { Icon: Sparkles, op: 0.7, key: 'sparkles-b' },
]

interface IconGridProps {
  /** Fixed clip-box height. */
  height?: number
  /** Colour the vignette fades the edges into. */
  fadeColor?: string
}

/**
 * Decorative icon field with a glowing "Ctrl Code" centre tile and a radial
 * vignette that clips + fades the surrounding tiles into the background.
 * Designed to be embedded (e.g. beside the hero headline) — no section wrapper.
 */
export default function IconGrid({ height = 360, fadeColor = 'var(--bg)' }: IconGridProps) {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const tileBg = dark
    ? 'linear-gradient(180deg, #1D1D1D 0%, #131313 100%)'
    : 'linear-gradient(180deg, #FFFFFF 0%, #EEF0F6 100%)'
  const tileBorder = dark ? '#262626' : '#E2E4EF'
  const iconColor = dark ? '#FFFFFF' : '#0D1B4B'

  const centerBg = dark
    ? 'radial-gradient(circle, #3A3A3A 0%, #262626 50%, #1C1C1C 100%)'
    : 'radial-gradient(circle, #FFFFFF 0%, #F4F5FA 55%, #E7EAF3 100%)'
  const centerBorder = dark ? '#444444' : '#D9DCEA'
  const centerText = dark ? '#FFFFFF' : '#0D1B4B'
  const centerGlow = dark
    ? '0 0 100px 10px rgba(255,255,255,0.10), 0 0 40px 4px rgba(255,255,255,0.05)'
    : '0 18px 50px rgba(13,27,75,0.12), 0 4px 14px rgba(13,27,75,0.07)'

  // Radial vignette fading the grid edges into the background.
  const vignette = `radial-gradient(ellipse 72% 78% at 50% 50%, transparent 22%, ${fadeColor} 72%)`

  const Tile = ({ Icon, op }: { Icon: LucideIcon; op: number }) => (
    <div
      style={{
        width: TILE,
        height: TILE,
        borderRadius: 22,
        background: tileBg,
        border: `1px solid ${tileBorder}`,
        opacity: op,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon style={{ width: ICON, height: ICON, color: iconColor }} strokeWidth={1.6} />
    </div>
  )

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: GAP,
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: `min(${height}px, 70vw)`, overflow: 'hidden' }}>
      {/* Icon field — centred, overflowing tiles get clipped by the box */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Scale wrapper — shrinks the fixed-px tile field below desktop */}
        <div
          className="max-md:scale-[0.62] md:max-lg:scale-[0.85]"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div style={{ ...rowStyle, paddingRight: 50 }}>
            {ROW_TOP.map((t) => <Tile key={t.key} Icon={t.Icon} op={t.op} />)}
          </div>

          <div style={rowStyle}>
            {ROW_MID_LEFT.map((t) => <Tile key={t.key} Icon={t.Icon} op={t.op} />)}
            <div
              style={{
                width: CENTER,
                height: CENTER,
                borderRadius: 26,
                background: centerBg,
                border: `1px solid ${centerBorder}`,
                boxShadow: centerGlow,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                className="font-display font-bold"
                style={{ fontSize: 16, letterSpacing: -0.3, lineHeight: 1.05, color: centerText, textAlign: 'center' }}
              >
                Ctrl Code
              </span>
            </div>
            {ROW_MID_RIGHT.map((t) => <Tile key={t.key} Icon={t.Icon} op={t.op} />)}
          </div>

          <div style={{ ...rowStyle, paddingLeft: 50 }}>
            {ROW_BOTTOM.map((t) => <Tile key={t.key} Icon={t.Icon} op={t.op} />)}
          </div>
        </div>
      </div>

      {/* Vignette overlay */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: vignette, pointerEvents: 'none' }} />
    </div>
  )
}
