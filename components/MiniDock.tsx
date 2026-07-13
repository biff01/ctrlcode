'use client'

import { useRef, useCallback, useMemo, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring, type MotionValue } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

const TILE = 88
const GAP = 12
const MAX_DIST = 150
const SHRINK_DIST = 300
const MAX_SCALE = 1.40
const SHRINK_AMOUNT = 0.10
const TILE_RADIUS = 20
const ICON_SIZE = 26

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
  if (d < MAX_DIST) return 1
  if (d < SHRINK_DIST) {
    const t = (d - MAX_DIST) / (SHRINK_DIST - MAX_DIST)
    return 1 - 0.18 * smoothstep(1 - t)
  }
  return 1
}

export interface DockTileItem { Icon: LucideIcon; key: string }

interface TileProps {
  Icon: LucideIcon
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  containerRef: React.RefObject<HTMLDivElement | null>
}

function Tile({ Icon, mouseX, mouseY, containerRef }: TileProps) {
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
      style={{ width: spacerSize, height: spacerSize, flexShrink: 0, position: 'relative', zIndex: 1 }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: TILE, height: TILE,
          marginTop: -(TILE / 2), marginLeft: -(TILE / 2),
          scale: springScale,
          opacity: springOpacity,
          borderRadius: TILE_RADIUS,
          background: 'linear-gradient(180deg, var(--surface-2) 0%, var(--surface) 100%)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          willChange: 'transform, opacity',
          cursor: 'pointer',
        }}
      >
        <Icon style={{ width: ICON_SIZE, height: ICON_SIZE, color: 'var(--text-primary)' }} strokeWidth={1.6} />
      </motion.div>
    </motion.div>
  )
}

// Each row can have a horizontal padding offset to create the staggered diagonal look
const ROW_PADDING = [
  { paddingRight: 36, paddingLeft: 0 },
  { paddingRight: 0, paddingLeft: 0 },
  { paddingRight: 0, paddingLeft: 36 },
]

interface MiniDockProps {
  rows: DockTileItem[][]
  height?: number
  fadeColor?: string
}

export default function MiniDock({ rows, height = 280, fadeColor = 'var(--bg)' }: MiniDockProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)

  const tileProps = useMemo(
    () => ({ mouseX, mouseY, containerRef }),
    [mouseX, mouseY]
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

  const vignette = `radial-gradient(ellipse 78% 80% at 50% 50%, transparent 18%, ${fadeColor} 70%)`

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height, overflow: 'hidden' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetMouse}
      onTouchCancel={resetMouse}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: GAP,
        }}
      >
        {rows.map((row, ri) => (
          <div
            key={ri}
            style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: GAP,
              ...(ROW_PADDING[ri] ?? {}),
            }}
          >
            {row.map((t) => <Tile key={t.key} Icon={t.Icon} {...tileProps} />)}
          </div>
        ))}
      </div>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: vignette, pointerEvents: 'none' }} />
    </div>
  )
}
