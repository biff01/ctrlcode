'use client'

import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useLang } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

const SMOOTH = [0.16, 1, 0.3, 1] as const

/* ─────────────────────────────────────────────────────────────────────────
 * Shared drag helpers
 * These illustrations render at 100% width with a fixed viewBox, so on screen
 * they scale (and letterbox) freely. getScreenCTM().inverse() maps a pointer's
 * client coords back into viewBox units, so a drag is accurate at any size.
 * ──────────────────────────────────────────────────────────────────────── */

const SPRING = { stiffness: 150, damping: 20, mass: 1 } // weighted, no bounce

function toSvgPoint(svg: SVGSVGElement | null, clientX: number, clientY: number) {
  if (!svg) return { x: 0, y: 0 }
  const ctm = svg.getScreenCTM()
  if (!ctm) return { x: 0, y: 0 }
  const p = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse())
  return { x: p.x, y: p.y }
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))
const lerp = (a: number, b: number, e: number) => a + (b - a) * e
const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)
const TAU = Math.PI * 2

// Gentle ambient drift — small amplitude, long mismatched periods so it never
// settles into an obvious loop. Shared by the reticle dot and the bolt.
function reticleIdle(t: number) {
  return {
    x: 5.6 * Math.sin((TAU * t) / 6000) + 3.4 * Math.sin((TAU * t) / 9200 + 1.1),
    y: 5.0 * Math.sin((TAU * t) / 7000 + 0.7) + 3.2 * Math.sin((TAU * t) / 10200 + 2.3),
  }
}
function boltIdle(t: number) {
  return {
    x: 5.2 * Math.sin((TAU * t) / 6200 + 0.8) + 3.1 * Math.sin((TAU * t) / 9100 + 2.4),
    y: 6.6 * Math.sin((TAU * t) / 5800) + 3.6 * Math.sin((TAU * t) / 8500 + 1.5),
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
 * FIG 0.2 — Target reticle (joystick)
 * Drag the centre dot; the crosshair tracks it and the tick marks on each arm
 * compress on the leading side / expand on the trailing side. Springs back to
 * centre on release.
 * ═════════════════════════════════════════════════════════════════════════ */

const T_CX = 170
const T_CY = 190
const T_RANGE = 84 // max travel from centre
const T_FRACS = [0.32, 0.62, 0.92]
const T_TICK = 10
const T_PAUSE = 750 // ms held where released before the return begins
const T_RETURN = 900 // ms of the glide back to centre

function TargetTick({
  shx,
  shy,
  axis,
  edge,
  frac,
  color,
}: {
  shx: MotionValue<number>
  shy: MotionValue<number>
  axis: 'v' | 'h'
  edge: number
  frac: number
  color: string
}) {
  const y   = useTransform(shy, (v) => v + (edge - v) * frac)
  const x1v = useTransform(shx, (v) => v - T_TICK)
  const x2v = useTransform(shx, (v) => v + T_TICK)
  const x   = useTransform(shx, (v) => v + (edge - v) * frac)
  const y1  = useTransform(shy, (v) => v - T_TICK)
  const y2  = useTransform(shy, (v) => v + T_TICK)
  if (axis === 'v')
    return <motion.line x1={x1v} x2={x2v} y1={y} y2={y} stroke={color} strokeWidth={2} strokeLinecap="round" />
  return <motion.line x1={x} x2={x} y1={y1} y2={y2} stroke={color} strokeWidth={2} strokeLinecap="round" />
}

function TargetIllo({ dark }: { dark: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const inView = useInView(svgRef)
  const dragging = useRef(false)
  const releaseAt = useRef<number | null>(null) // loop-clock time of release, null when idle
  const drop = useRef({ x: T_CX, y: T_CY })
  const lastT = useRef(0)

  const hx = useMotionValue(T_CX)
  const hy = useMotionValue(T_CY)
  const shx = useSpring(hx, SPRING)
  const shy = useSpring(hy, SPRING)

  const crosshair = dark ? 'rgba(255,255,255,0.15)' : 'rgba(59,92,228,0.2)'
  const tickColor = dark ? 'rgba(255,255,255,0.38)' : 'rgba(13,27,75,0.32)'

  // One loop owns hx/hy so idle-drift and the slow return never fight:
  //   dragging → pointer owns it · released → hold, then ease home · idle → drift.
  useAnimationFrame((t) => {
    if (!inView) return
    lastT.current = t
    if (dragging.current) return
    const idle = reticleIdle(t)
    const rel = releaseAt.current
    if (rel === null) {
      hx.set(T_CX + idle.x)
      hy.set(T_CY + idle.y)
      return
    }
    const dt = t - rel
    if (dt < T_PAUSE) {
      // hold where released, barely breathing
      hx.set(drop.current.x + idle.x * 0.35)
      hy.set(drop.current.y + idle.y * 0.35)
      return
    }
    const p = (dt - T_PAUSE) / T_RETURN
    if (p < 1) {
      const e = easeInOut(p)
      hx.set(lerp(drop.current.x, T_CX, e) + idle.x * (0.35 + 0.65 * e))
      hy.set(lerp(drop.current.y, T_CY, e) + idle.y * (0.35 + 0.65 * e))
      return
    }
    releaseAt.current = null // return complete → pure idle drift
    hx.set(T_CX + idle.x)
    hy.set(T_CY + idle.y)
  })

  const move = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const p = toSvgPoint(svgRef.current, e.clientX, e.clientY)
    let dx = p.x - T_CX
    let dy = p.y - T_CY
    const d = Math.hypot(dx, dy)
    if (d > T_RANGE) {
      dx = (dx / d) * T_RANGE
      dy = (dy / d) * T_RANGE
    }
    hx.set(T_CX + dx)
    hy.set(T_CY + dy)
  }
  const start = (e: React.PointerEvent) => {
    releaseAt.current = null // cancel any pending / in-progress return
    dragging.current = true
    svgRef.current?.setPointerCapture(e.pointerId)
    move(e)
  }
  const end = () => {
    if (!dragging.current) return
    dragging.current = false
    // Stay where released; the loop holds, then eases home after T_PAUSE.
    drop.current = { x: hx.get(), y: hy.get() }
    releaseAt.current = lastT.current
  }

  const ticks: Array<{ axis: 'v' | 'h'; edge: number }> = [
    { axis: 'v', edge: 0 },
    { axis: 'v', edge: 380 },
    { axis: 'h', edge: 0 },
    { axis: 'h', edge: 340 },
  ]

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 340 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Interactive target reticle — drag the centre dot"
      style={{ width: '100%', height: '100%' }}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
    >
      <ellipse cx={T_CX} cy={T_CY} rx="140" ry="140" style={{ stroke: 'var(--border-subtle)' }} strokeWidth="1.5" />
      <ellipse cx={T_CX} cy={T_CY} rx="96" ry="96" style={{ stroke: 'var(--border)' }} strokeWidth="1.5" />
      <ellipse cx={T_CX} cy={T_CY} rx="52" ry="52" style={{ stroke: 'var(--text-tertiary)' }} strokeWidth="2" />

      {/* Crosshair through the handle */}
      <motion.line x1={0} x2={340} y1={shy} y2={shy} style={{ stroke: crosshair }} strokeWidth="1.5" />
      <motion.line x1={shx} x2={shx} y1={0} y2={380} style={{ stroke: crosshair }} strokeWidth="1.5" />

      {/* Range ticks — spacing responds to handle offset */}
      {ticks.flatMap((tk) =>
        T_FRACS.map((frac, i) => (
          <TargetTick key={`${tk.axis}-${tk.edge}-${i}`} shx={shx} shy={shy} axis={tk.axis} edge={tk.edge} frac={frac} color={tickColor} />
        )),
      )}

      {/* Handle */}
      <motion.g whileHover="dh" whileTap="dh">
        <motion.circle
          cx={shx} cy={shy} r="16"
          variants={{ dh: { scale: 1.2, transition: { duration: 0.3, ease: SMOOTH } } }}
          style={{ fill: 'var(--text-primary)', pointerEvents: 'none', transformBox: 'fill-box', transformOrigin: 'center' }}
        />
        <motion.circle
          cx={shx}
          cy={shy}
          r="34"
          fill="transparent"
          role="slider"
          aria-label="Drag handle"
          aria-valuemin={-T_RANGE}
          aria-valuemax={T_RANGE}
          aria-valuenow={0}
          onPointerDown={start}
          style={{ cursor: 'grab', touchAction: 'none', pointerEvents: 'all' }}
        />
      </motion.g>
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
 * FIG 0.3 — Neural mesh
 * Six independently draggable nodes; every connecting line reads the same spring
 * value as its endpoints, so links stay welded to the circles while the mesh
 * re-flows with a fluid, trailing motion.
 * ═════════════════════════════════════════════════════════════════════════ */

interface NetNode {
  id: string
  x: number
  y: number
  r: number
  kind: 'stroke' | 'fill' | 'ring'
}
const NET_NODES: NetNode[] = [
  { id: 'in1', x: 70, y: 120, r: 14, kind: 'stroke' },
  { id: 'in2', x: 70, y: 260, r: 14, kind: 'stroke' },
  { id: 'h1', x: 170, y: 70, r: 14, kind: 'stroke' },
  { id: 'h2', x: 170, y: 310, r: 14, kind: 'stroke' },
  { id: 'core', x: 170, y: 190, r: 20, kind: 'fill' },
  { id: 'out', x: 280, y: 190, r: 20, kind: 'ring' },
]
const NET_EDGES: Array<{ a: string; b: string; w: number; main?: boolean }> = [
  { a: 'in1', b: 'core', w: 1.5 },
  { a: 'in2', b: 'core', w: 1.5 },
  { a: 'core', b: 'out', w: 2, main: true },
  { a: 'h1', b: 'out', w: 1.5 },
  { a: 'h2', b: 'out', w: 1.5 },
  { a: 'in1', b: 'h1', w: 1 },
  { a: 'in2', b: 'h2', w: 1 },
]

/* Ambient drift — each node traces a slow Lissajous path from two sine waves
 * with mismatched periods, so the motion never lines up into an obvious loop.
 * Per-node phases/periods keep them independent; the core barely moves so it
 * still reads as the anchor the links radiate from. */
const NET_FLOAT = NET_NODES.map((n, i) => ({
  scale: n.id === 'core' ? 0.22 : 1,
  ax: 9 + (i % 3),
  ay: 9 + ((i + 1) % 3),
  px1: 4800 + i * 640,
  px2: 7200 + i * 880,
  py1: 5500 + i * 770,
  py2: 8300 + i * 520,
  phx: i * 1.7,
  phy: i * 2.3 + 0.6,
}))

function floatAt(f: (typeof NET_FLOAT)[number], t: number) {
  return {
    x: f.scale * (f.ax * 0.6 * Math.sin((TAU * t) / f.px1 + f.phx) + f.ax * 0.4 * Math.sin((TAU * t) / f.px2 + f.phx * 1.3)),
    y: f.scale * (f.ay * 0.6 * Math.sin((TAU * t) / f.py1 + f.phy) + f.ay * 0.4 * Math.sin((TAU * t) / f.py2 + f.phy * 1.3)),
  }
}

function NetworkIllo({ dark }: { dark: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const inView = useInView(svgRef)
  const active = useRef<string | null>(null)
  // Each node's home — the point it drifts around. Dragging moves the home, so a
  // released node stays where you put it instead of returning to its default.
  const home = useRef<Record<string, { x: number; y: number }>>(
    Object.fromEntries(NET_NODES.map((n) => [n.id, { x: n.x, y: n.y }])),
  )

  const outputFill = dark ? 'rgba(255,255,255,0.3)' : 'rgba(13,27,75,0.25)'

  // One position + spring per node — 24 individual hook calls (6 nodes × 4 each)
  // so the hook call count is constant and never varies with array length.
  const px_in1 = useMotionValue(70);   const py_in1 = useMotionValue(120)
  const sx_in1 = useSpring(px_in1, SPRING); const sy_in1 = useSpring(py_in1, SPRING)
  const px_in2 = useMotionValue(70);   const py_in2 = useMotionValue(260)
  const sx_in2 = useSpring(px_in2, SPRING); const sy_in2 = useSpring(py_in2, SPRING)
  const px_h1  = useMotionValue(170);  const py_h1  = useMotionValue(70)
  const sx_h1  = useSpring(px_h1,  SPRING); const sy_h1  = useSpring(py_h1,  SPRING)
  const px_h2  = useMotionValue(170);  const py_h2  = useMotionValue(310)
  const sx_h2  = useSpring(px_h2,  SPRING); const sy_h2  = useSpring(py_h2,  SPRING)
  const px_core = useMotionValue(170); const py_core = useMotionValue(190)
  const sx_core = useSpring(px_core, SPRING); const sy_core = useSpring(py_core, SPRING)
  const px_out = useMotionValue(280);  const py_out = useMotionValue(190)
  const sx_out = useSpring(px_out, SPRING);  const sy_out = useSpring(py_out, SPRING)

  const px: Record<string, MotionValue<number>> = { in1: px_in1, in2: px_in2, h1: px_h1, h2: px_h2, core: px_core, out: px_out }
  const py: Record<string, MotionValue<number>> = { in1: py_in1, in2: py_in2, h1: py_h1, h2: py_h2, core: py_core, out: py_out }
  const sx: Record<string, MotionValue<number>> = { in1: sx_in1, in2: sx_in2, h1: sx_h1, h2: sx_h2, core: sx_core, out: sx_out }
  const sy: Record<string, MotionValue<number>> = { in1: sy_in1, in2: sy_in2, h1: sy_h1, h2: sy_h2, core: sy_core, out: sy_out }

  // Ambient float — runs every frame; the node under the finger is left to the
  // drag, all others drift around their current home (the last place they were
  // dropped), so nothing snaps back to its original spot.
  useAnimationFrame((t) => {
    if (!inView) return
    for (let i = 0; i < NET_NODES.length; i++) {
      const n = NET_NODES[i]
      if (active.current === n.id) continue
      const o = floatAt(NET_FLOAT[i], t)
      const h = home.current[n.id]
      px[n.id].set(h.x + o.x)
      py[n.id].set(h.y + o.y)
    }
  })

  const move = (e: React.PointerEvent) => {
    const id = active.current
    if (!id) return
    const p = toSvgPoint(svgRef.current, e.clientX, e.clientY)
    const x = clamp(p.x, 24, 316)
    const y = clamp(p.y, 24, 356)
    home.current[id] = { x, y } // remember where it was left — no reset
    px[id].set(x)
    py[id].set(y)
  }
  const start = (e: React.PointerEvent, id: string) => {
    active.current = id
    svgRef.current?.setPointerCapture(e.pointerId)
  }
  const end = () => {
    active.current = null
  }

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 340 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Interactive neural mesh — drag the nodes to reshape the network"
      style={{ width: '100%', height: '100%' }}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
    >
      {NET_EDGES.map(({ a, b, w, main }) => (
        <motion.line
          key={`${a}-${b}`}
          x1={sx[a]} y1={sy[a]} x2={sx[b]} y2={sy[b]}
          style={{ stroke: main ? 'var(--border)' : 'var(--border-subtle)' }}
          strokeWidth={w}
        />
      ))}

      {NET_NODES.map((n) => (
        <motion.g key={n.id} whileHover="dh" whileTap="dh">
          {n.kind === 'fill' && (
            <motion.circle cx={sx[n.id]} cy={sy[n.id]} r={n.r}
              variants={{ dh: { scale: 1.15, transition: { duration: 0.3, ease: SMOOTH } } }}
              style={{ fill: 'var(--text-primary)', pointerEvents: 'none', transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          )}
          {n.kind === 'stroke' && (
            <motion.circle cx={sx[n.id]} cy={sy[n.id]} r={n.r}
              variants={{ dh: { scale: 1.15, transition: { duration: 0.3, ease: SMOOTH } } }}
              style={{ stroke: 'var(--text-tertiary)', pointerEvents: 'none', transformBox: 'fill-box', transformOrigin: 'center' }} strokeWidth="1.8"
            />
          )}
          {n.kind === 'ring' && (
            <>
              <motion.circle cx={sx[n.id]} cy={sy[n.id]} r={n.r}
                variants={{ dh: { scale: 1.15, transition: { duration: 0.3, ease: SMOOTH } } }}
                style={{ stroke: 'var(--text-primary)', pointerEvents: 'none', transformBox: 'fill-box', transformOrigin: 'center' }} strokeWidth="2.5"
              />
              <motion.circle cx={sx[n.id]} cy={sy[n.id]} r="8"
                variants={{ dh: { scale: 1.15, transition: { duration: 0.3, ease: SMOOTH } } }}
                style={{ fill: outputFill, pointerEvents: 'none', transformBox: 'fill-box', transformOrigin: 'center' }}
              />
            </>
          )}
          {/* transparent grab area — enlarged for finger-sized touch targets */}
          <motion.circle
            cx={sx[n.id]}
            cy={sy[n.id]}
            r={n.r + 16}
            fill="transparent"
            role="slider"
            aria-label="Drag handle"
            aria-valuenow={0}
            onPointerDown={(e) => start(e, n.id)}
            style={{ cursor: 'grab', touchAction: 'none', pointerEvents: 'all' }}
          />
        </motion.g>
      ))}
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
 * FIG 0.4 — Velocity
 * Drag the bolt vertically; the speed lines shear horizontally and spread apart,
 * proportional to the pull and to each line's lean, then spring back to rest.
 * ═════════════════════════════════════════════════════════════════════════ */

const S_RANGE = 74
const S_SHEAR = 32
const S_SPREAD = 16
const S_MID = 195 // bolt vertical centre
const S_PAD = 6 // keep line ends this far inside the 340-wide viewBox

interface Speed {
  x1: number
  x2: number
  y: number
}
const S_LEFT: Speed[] = [
  { x1: 20, x2: 130, y: 130 },
  { x1: 20, x2: 110, y: 165 },
  { x1: 20, x2: 115, y: 200 },
  { x1: 20, x2: 105, y: 235 },
  { x1: 20, x2: 125, y: 270 },
]
const S_RIGHT: Speed[] = [
  { x1: 255, x2: 325, y: 155 },
  { x1: 248, x2: 325, y: 190 },
  { x1: 252, x2: 318, y: 225 },
]

function SpeedLine({ sby, line, color }: { sby: MotionValue<number>; line: Speed; color: string }) {
  const lean = clamp((line.y - S_MID) / 110, -1, 1)
  // Both ends shift together (length preserved); clamp the shift so neither end
  // leaves the viewBox — no matter how far the bolt travels, nothing clips.
  const lo = Math.min(line.x1, line.x2)
  const hi = Math.max(line.x1, line.x2)
  const maxLeft = S_PAD - lo
  const maxRight = 340 - S_PAD - hi
  const shiftOf = (v: number) => clamp((v / S_RANGE) * S_SHEAR * lean, maxLeft, maxRight)
  const x1 = useTransform(sby, (v) => line.x1 + shiftOf(v))
  const x2 = useTransform(sby, (v) => line.x2 + shiftOf(v))
  const y = useTransform(sby, (v) => line.y + (v / S_RANGE) * S_SPREAD * lean)
  return <motion.line x1={x1} x2={x2} y1={y} y2={y} style={{ stroke: color }} strokeWidth="2" strokeLinecap="round" />
}

function SpeedIllo({ dark }: { dark: boolean }) {
  void dark
  const svgRef = useRef<SVGSVGElement>(null)
  const inView = useInView(svgRef)
  const dragging = useRef(false)
  const startPy = useRef(0)
  const startBy = useRef(0)
  const boltHome = useRef(0) // the offset the bolt idles around (last drop point)

  const bx = useMotionValue(0)
  const sbx = useSpring(bx, SPRING)
  const by = useMotionValue(0)
  const sby = useSpring(by, SPRING)

  // Idle bob — when not dragging, the bolt drifts slowly around its home; the
  // speed lines sway with it since they react to sby.
  useAnimationFrame((t) => {
    if (!inView) return
    if (dragging.current) return
    const idle = boltIdle(t)
    bx.set(idle.x)
    by.set(clamp(boltHome.current + idle.y, -S_RANGE, S_RANGE))
  })

  const move = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const p = toSvgPoint(svgRef.current, e.clientX, e.clientY)
    const v = clamp(startBy.current + (p.y - startPy.current), -S_RANGE, S_RANGE)
    boltHome.current = v // remember where it was left
    by.set(v)
  }
  const start = (e: React.PointerEvent) => {
    dragging.current = true
    svgRef.current?.setPointerCapture(e.pointerId)
    const p = toSvgPoint(svgRef.current, e.clientX, e.clientY)
    startPy.current = p.y
    startBy.current = by.get()
  }
  const end = () => {
    dragging.current = false
  }

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 340 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Interactive speed bolt — drag vertically to control velocity"
      style={{ width: '100%', height: '100%' }}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
    >
      {[...S_LEFT, ...S_RIGHT].map((l) => (
        <SpeedLine key={`${l.y}-${l.x1}-${l.x2}`} sby={sby} line={l} color="var(--border)" />
      ))}

      {/* Bolt — vertical drag */}
      <motion.g style={{ x: sbx, y: sby }} whileHover="dh" whileTap="dh">
        <motion.path
          d="M200 30 L148 200 L186 200 L142 360 L238 155 L200 155 Z"
          variants={{ dh: { scale: 1.08, transition: { duration: 0.35, ease: SMOOTH } } }}
          style={{ fill: 'var(--text-primary)', pointerEvents: 'none', transformBox: 'fill-box', transformOrigin: 'center' }}
        />
        <motion.rect
          x="138"
          y="20"
          width="106"
          height="350"
          fill="transparent"
          role="slider"
          aria-label="Drag handle"
          aria-valuemin={-S_RANGE}
          aria-valuemax={S_RANGE}
          aria-valuenow={0}
          onPointerDown={start}
          style={{ cursor: 'grab', touchAction: 'none', pointerEvents: 'all' }}
        />
      </motion.g>
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
 * Section (layout + copy unchanged)
 * ═════════════════════════════════════════════════════════════════════════ */

const FIG_DEFS = [
  {
    label: 'PURPOSE',
    Illo: TargetIllo,
    title: 'Built for purpose',
    desc: 'Ctrl Code is shaped by the practices and principles of world-class product teams — every decision serves the outcome.',
  },
  {
    label: 'INTELLIGENCE',
    Illo: NetworkIllo,
    title: 'Powered by AI agents',
    desc: 'Designed for workflows shared by humans and AI, from planning through execution and post-launch optimisation.',
  },
  {
    label: 'VELOCITY',
    Illo: SpeedIllo,
    title: 'Designed for speed',
    desc: 'Reduces noise and restores momentum so your team can ship with clarity, confidence, and relentless focus.',
  },
]

export default function Services() {
  const { t } = useLang()
  const { theme } = useTheme()
  const dark = theme === 'dark'

  return (
    <section
      style={{
        background: 'var(--section-alt)',
        padding: 'clamp(64px, 10.75vw, 112px) 0 clamp(72px, 11.72vw, 128px)',
      }}
    >
      <div className="max-lg:px-6" style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Statement headline */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 'clamp(56px, 8.6vw, 88px)' }}
        >
          <div>
            <span
              className="font-display font-semibold"
              style={{ fontSize: 'clamp(28px, 6vw, 46px)', letterSpacing: 'clamp(-1.8px, -0.25vw, -0.9px)', lineHeight: 1.18, color: 'var(--text-primary)' }}
            >
              {t('A new species of product tool.')}{' '}
            </span>
            <span
              className="font-display font-semibold"
              style={{ fontSize: 'clamp(28px, 6vw, 46px)', letterSpacing: 'clamp(-1.8px, -0.25vw, -0.9px)', lineHeight: 1.18, color: 'var(--text-secondary)' }}
            >
              {t('Purpose-built for modern teams with AI workflows at its core, Ctrl Code sets a new standard for planning and building products.')}
            </span>
          </div>
        </motion.div>

        {/* Fig columns — stacked on mobile, 2-up on tablet (last spans), row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex w-full gap-14 md:gap-x-10 md:gap-y-14 lg:gap-16">
          {FIG_DEFS.map((fig, i) => (
            <motion.div
              key={fig.label}
              className={[
                i === 2 ? 'md:max-lg:col-span-2' : '',
              ].join(' ')}
              initial={{ y: 40 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ backgroundColor: dark ? 'rgba(255,255,255,0.025)' : 'rgba(13,27,75,0.025)', transition: { duration: 0.22 } }}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 12,
                padding: '0 8px 8px',
                margin: '0 -8px -8px',
              }}
            >
              <span
                className="font-mono"
                style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--text-tertiary)', marginBottom: 24 }}
              >
                {fig.label}
              </span>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: 'clamp(260px, 35.2vw, 360px)', width: '100%' }}
              >
                <fig.Illo dark={dark} />
              </motion.div>
              <div style={{ paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h3
                  className="font-display font-semibold"
                  style={{ fontSize: 'clamp(17px, 2.2vw, 22px)', color: 'var(--text-primary)', letterSpacing: -0.4 }}
                >
                  {t(fig.title)}
                </h3>
                <p
                  className="font-body"
                  style={{ fontSize: 'clamp(14px, 1.2vw, 15px)', lineHeight: 1.7, color: 'var(--text-secondary)' }}
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
