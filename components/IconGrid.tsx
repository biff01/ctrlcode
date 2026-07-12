'use client'

import { useRef, useCallback, useMemo, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring, type MotionValue } from 'framer-motion'
import {
  Globe, Smartphone, Brain, Cpu, BarChart2, Layers, Zap,
  Activity, Sparkles, Mail, Box, MessageSquare, type LucideIcon,
} from 'lucide-react'

const TILE = 110
const CENTER = 130
const ICON = 34
const GAP = 12
const MAX_DIST = 190
const SHRINK_DIST = 380
const MAX_SCALE = 1.40
const SHRINK_AMOUNT = 0.10
const TILE_RADIUS = 24

const ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: GAP,
}

function smoothstep(t: number) { return t * t * (3 - 2 * t) }

function getDockScale(d: number): number {
  if (d < MAX_DIST) {
    const ease = smoothstep(1 - d / MAX_DIST)
    return 1 + (MAX_SCALE - 1) * ease
  }
  if (d < SHRINK_DIST) {
    const t = (d - MAX_DIST) / (SHRINK_DIST - MAX_DIST)
    return 1 - SHRINK_AMOUNT * smoothstep(1 - t)
  }
  return 1
}

function getDockOpacity(d: number): number {
  if (d < MAX_DIST) {
    return 1
  }
  if (d < SHRINK_DIST) {
    const t = (d - MAX_DIST) / (SHRINK_DIST - MAX_DIST)
    return 1 - 0.18 * smoothstep(1 - t)
  }
  return 1
}

interface Tile { Icon: LucideIcon; key: string }

const ROW_TOP: Tile[] = [
  { Icon: Globe, key: 'globe' },
  { Icon: Smartphone, key: 'smartphone' },
  { Icon: Activity, key: 'activity' },
  { Icon: Brain, key: 'brain' },
]
const ROW_MID_LEFT: Tile[] = [
  { Icon: Layers, key: 'layers' },
  { Icon: Zap, key: 'zap' },
  { Icon: Sparkles, key: 'sparkles' },
]
const ROW_MID_RIGHT: Tile[] = [
  { Icon: Mail, key: 'mail' },
  { Icon: Box, key: 'box' },
  { Icon: MessageSquare, key: 'message' },
]
const ROW_BOTTOM: Tile[] = [
  { Icon: BarChart2, key: 'barchart2' },
  { Icon: Cpu, key: 'cpu' },
  { Icon: Activity, key: 'activity-b' },
  { Icon: Sparkles, key: 'sparkles-b' },
]

interface DockTileProps {
  Icon: LucideIcon
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  containerRef: React.RefObject<HTMLDivElement | null>
  tileBg: string
  tileBorder: string
  iconColor: string
}

function DockTile({ Icon, mouseX, mouseY, containerRef, tileBg, tileBorder, iconColor }: DockTileProps) {
  const ref = useRef<HTMLDivElement>(null)
  const centerRef = useRef({ cx: 0, cy: 0 })

  useEffect(() => {
    const update = () => {
      const el = ref.current
      const container = containerRef.current
      if (!el || !container) return
      const cRect = container.getBoundingClientRect()
      const eRect = el.getBoundingClientRect()
      centerRef.current = {
        cx: eRect.left - cRect.left + eRect.width / 2,
        cy: eRect.top - cRect.top + eRect.height / 2,
      }
    }
    update()
    const ro = new ResizeObserver(update)
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  const dist = useTransform([mouseX, mouseY], ([mx, my]: number[]) => {
    const { cx, cy } = centerRef.current
    return Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2)
  })

  const scale = useTransform(dist, getDockScale)
  const opacity = useTransform(dist, getDockOpacity)

  const springScale = useSpring(scale, { stiffness: 140, damping: 20, mass: 1.0 })
  const springOpacity = useSpring(opacity, { stiffness: 140, damping: 20, mass: 1.0 })

  const spacerSize = useTransform(springScale, (s) => TILE * s)

  return (
    <motion.div
      ref={ref}
      style={{
        width: spacerSize,
        height: spacerSize,
        flexShrink: 0,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: TILE,
          height: TILE,
          marginTop: -(TILE / 2),
          marginLeft: -(TILE / 2),
          scale: springScale,
          opacity: springOpacity,
          borderRadius: TILE_RADIUS,
          background: tileBg,
          border: `1px solid ${tileBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform, opacity',
          cursor: 'pointer',
        }}
      >
        <Icon style={{ width: ICON, height: ICON, color: iconColor }} strokeWidth={1.6} />
      </motion.div>
    </motion.div>
  )
}

interface IconGridProps {
  height?: number
  fadeColor?: string
}

export default function IconGrid({ height = 360, fadeColor = 'var(--bg)' }: IconGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)

  const tileBg = 'linear-gradient(180deg, var(--surface-2) 0%, var(--surface) 100%)'
  const tileBorder = 'var(--border)'
  const iconColor = 'var(--text-primary)'
  const centerBg = 'radial-gradient(circle, var(--surface-3) 0%, var(--surface-2) 50%, var(--surface) 100%)'
  const centerBorder = 'var(--border-subtle)'
  const centerText = 'var(--text-primary)'
  const centerGlow = 'var(--center-tile-glow, 0 0 60px 6px rgba(128,128,128,0.08), 0 8px 30px rgba(0,0,0,0.08))'
  const vignette = `radial-gradient(ellipse 72% 78% at 50% 50%, transparent 22%, ${fadeColor} 72%)`

  const tileProps = useMemo(
    () => ({ mouseX, mouseY, containerRef, tileBg, tileBorder, iconColor }),
    [mouseX, mouseY, containerRef, tileBg, tileBorder, iconColor]
  )

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }, [mouseX, mouseY])

  const resetMouse = useCallback(() => {
    mouseX.set(-9999)
    mouseY.set(-9999)
  }, [mouseX, mouseY])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(touch.clientX - rect.left)
    mouseY.set(touch.clientY - rect.top)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: `min(${height}px, 70vw)`,
        overflow: 'hidden',
        ['--tile-size' as string]: `clamp(72px, 18vw, ${TILE}px)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetMouse}
      onTouchCancel={resetMouse}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="max-md:scale-[0.62] md:max-lg:scale-[0.85]"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
        >
          <div style={{ ...ROW_STYLE, paddingRight: 48 }}>
            {ROW_TOP.map((t) => <DockTile key={t.key} Icon={t.Icon} {...tileProps} />)}
          </div>

          <div style={ROW_STYLE}>
            {ROW_MID_LEFT.map((t) => <DockTile key={t.key} Icon={t.Icon} {...tileProps} />)}

            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: CENTER,
                height: CENTER,
                borderRadius: TILE_RADIUS,
                background: centerBg,
                border: `1px solid ${centerBorder}`,
                boxShadow: centerGlow,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
                zIndex: 2,
                cursor: 'pointer',
              }}
            >
              <span
                className="font-display font-bold"
                style={{ fontSize: 16, letterSpacing: -0.3, lineHeight: 1.05, color: centerText, textAlign: 'center' }}
              >
                Ctrl Code
              </span>
            </motion.div>

            {ROW_MID_RIGHT.map((t) => <DockTile key={t.key} Icon={t.Icon} {...tileProps} />)}
          </div>

          <div style={{ ...ROW_STYLE, paddingLeft: 48 }}>
            {ROW_BOTTOM.map((t) => <DockTile key={t.key} Icon={t.Icon} {...tileProps} />)}
          </div>
        </div>
      </div>

      <div aria-hidden style={{ position: 'absolute', inset: 0, background: vignette, pointerEvents: 'none' }} />
    </div>
  )
}
