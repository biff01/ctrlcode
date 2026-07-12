'use client'
import { useEffect, useRef, useState } from 'react'

export function CountUp({ value, active }: { value: string; active: boolean }) {
  // Only count values shaped like "48+" or "15+" (digits then optional trailing suffix).
  // Values like "24/7" have a non-digit in the middle — render them as-is.
  const isCountable = /^\d+\D*$/.test(value)
  const numeric = isCountable ? parseInt(value, 10) : NaN
  const suffix = isCountable ? value.replace(/^\d+/, '') : ''
  const [displayed, setDisplayed] = useState(0)
  const raf = useRef<number>(0)

  useEffect(() => {
    if (!active || isNaN(numeric)) return
    const start = performance.now()
    const dur = 900
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setDisplayed(Math.round(ease * numeric))
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [active, numeric])

  if (isNaN(numeric)) return <>{value}</>
  return <>{displayed}{suffix}</>
}
