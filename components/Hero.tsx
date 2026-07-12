'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Lock } from 'lucide-react'
import { useLang } from './LanguageProvider'
import DashboardMockup from './DashboardMockup'
import IconGrid from './IconGrid'
import { BlurIn } from './ui/blur-in'
import { CountUp } from './ui/count-up'

const STATS = [
  { value: '48+', label: 'PROJECTS DELIVERED' },
  { value: '5+', label: 'YEARS OF EXPERIENCE' },
  { value: '15+', label: 'LONG-TERM CLIENTS' },
  { value: '24/7', label: 'SUPPORT & CARE' },
]

const STAT_ANIM_HIDDEN = { opacity: 0, y: 18 } as const
const STAT_ANIM_VISIBLE = { opacity: 1, y: 0 } as const
const STAT_TRANSITION_BASE = { duration: 0.55, ease: [0.22, 1, 0.36, 1] } as const

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)
  const { t, lang } = useLang()

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Russian runs ~40% wider than EN/UZ, so "цифровой реальности." overflows the
  // ~560px headline column at 76px and wraps to a 3rd line. Size it down to fit.
  // Below desktop the clamp scales fluidly and saturates at these caps by 1024px.
  const headlineSize = lang === 'ru' ? 52 : 76
  const headlineMin = lang === 'ru' ? 30 : 36

  const headlineStyle = useMemo<React.CSSProperties>(() => ({
    fontSize: `clamp(${headlineMin}px, 9vw, ${headlineSize}px)`,
    letterSpacing: 'clamp(-2.8px, -0.28vw, -1.4px)',
    lineHeight: 1.08,
    color: 'var(--text-primary)',
  }), [headlineMin, headlineSize])

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: 'var(--bg)', paddingBottom: 'clamp(64px, 9.8vw, 100px)' }}
    >
      {/* Container */}
      <div className="w-full max-lg:px-6" style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Hero Top Row: text on top (mobile/tablet), text (left) + icon grid (right) on desktop ── */}
        <div
          className="hero-top-row flex flex-col lg:flex-row lg:items-center lg:justify-between"
          style={{ gap: 40, paddingTop: 'clamp(48px, 7.1vw, 72px)' }}
        >
        {/* ── Hero Text ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1 lg:flex-1 lg:min-w-0"
          style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
        >
          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['From idea to', 'digital reality.'].map((line, i) => (
              <BlurIn
                key={line}
                className="font-display font-semibold"
                style={headlineStyle}
                duration={0.9}
                delay={i * 0.15}
              >
                {t(line)}
              </BlurIn>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            className="font-body"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(16px, 1.76vw, 18px)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 540 }}
          >
            {t('We design and build web platforms, mobile apps, CRM systems and AI products for ambitious companies — fast, reliable and beautifully engineered.')}
          </motion.p>

          {/* Badge */}
          <motion.div
            className="flex items-center gap-2 rounded-[20px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
            style={{
              alignSelf: 'flex-start',
              maxWidth: '100%',
              background: 'var(--badge-bg, rgba(255,255,255,0.05))',
              border: '1px solid var(--border-subtle)',
              padding: '6px 16px',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--kicker)', flexShrink: 0 }} />
            <span
              className="font-mono"
              style={{
                fontSize: 'clamp(11px, 0.9vw, 12px)',
                letterSpacing: 1,
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {t('OFFICIAL IT PARK UZBEKISTAN RESIDENT')}
            </span>
          </motion.div>

          {/* CTAs — stacked full-width buttons on mobile */}
          <motion.div
            className="max-md:flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', gap: 16 }}
          >
            <Link
              href="/contact"
              className="group flex items-center gap-2 font-body font-semibold max-md:w-full max-md:justify-center btn-lift press"
              style={{
                background: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-color)',
                fontSize: 'clamp(14px, 1.2vw, 15px)',
                padding: '13px 28px',
                borderRadius: 8,
                boxShadow: 'var(--btn-primary-shadow, 0 8px 32px rgba(0,0,0,0.18))',
                textDecoration: 'none',
              }}
            >
              {t('Start a project')}
              <ArrowRight
                aria-hidden="true"
                className="group-hover:translate-x-1"
                style={{ width: 16, height: 16, transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1)' }}
              />
            </Link>
            <Link
              href="/portfolio"
              className="font-body font-medium inline-block max-md:w-full max-md:text-center btn-fade press"
              style={{
                background: 'var(--btn-secondary-bg)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--btn-secondary-color)',
                fontSize: 'clamp(14px, 1.2vw, 15px)',
                padding: '13px 28px',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              {t('View our work')}
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Icon Grid — beside the headline on desktop, decorative band below it when stacked ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="order-1 lg:order-2 hero-icon-grid w-full lg:w-[600px] lg:shrink-0"
        >
          <IconGrid height={360} fadeColor="var(--bg)" />
        </motion.div>
        </div>

        {/* ── Browser Mockup — intentionally dark-anchored illustration ── */}
        <motion.div
          initial={{ opacity: 0, y: 64 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="flex justify-center"
          style={{ paddingTop: 'clamp(44px, 6.7vw, 68px)' }}
        >
          <div
            data-theme="dark"
            className="overflow-hidden"
            style={{
              width: '100%',
              maxWidth: 1120,
              borderRadius: 14,
              background: 'var(--surface-3)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center"
              style={{ background: 'var(--surface-3)', padding: '12px 16px', gap: 16 }}
            >
              <div className="flex items-center" style={{ gap: 8 }}>
                {[0.9, 0.55, 0.22].map((op, i) => (
                  <div
                    key={i}
                    style={{ width: 11, height: 11, borderRadius: '50%', background: '#fff', opacity: op }}
                  />
                ))}
              </div>
              <div
                className="flex items-center"
                style={{ background: 'var(--surface-2)', borderRadius: 6, padding: '4px 12px', gap: 6 }}
              >
                <Lock aria-hidden="true" style={{ width: 11, height: 11, color: 'rgba(255,255,255,0.7)' }} />
                <span className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>
                  ctrlcode.uz
                </span>
              </div>
            </div>
            {/* Showcase — inline SVG dashboard; keeps the SVG's aspect below lg */}
            <div className="w-full max-lg:aspect-[1120/580] lg:h-[580px]" style={{ background: 'var(--bg)' }}>
              <DashboardMockup />
            </div>
          </div>
        </motion.div>

        {/* ── Stats — 2x2 grid on mobile, single row from md up ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 gap-x-4 gap-y-8 md:flex md:justify-between md:gap-x-0 md:gap-y-0 md:px-10"
          style={{ maxWidth: 1120, width: '100%', margin: '0 auto', paddingTop: 'clamp(44px, 5.5vw, 56px)' }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={STAT_ANIM_HIDDEN}
              animate={statsVisible ? STAT_ANIM_VISIBLE : STAT_ANIM_HIDDEN}
              transition={{ ...STAT_TRANSITION_BASE, delay: i * 0.1 }}
              className="flex flex-col items-center"
              style={{ gap: 8 }}
            >
              <span
                className="font-display font-bold"
                style={{ fontSize: 'clamp(40px, 10vw, 64px)', letterSpacing: 'clamp(-1.5px, -0.15vw, -1px)', color: 'var(--text-primary)', lineHeight: 1 }}
              >
                <CountUp value={s.value} active={statsVisible} />
              </span>
              <span
                className="font-mono line-clamp-2"
                style={{ fontSize: 12, letterSpacing: 1.4, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 160 }}
              >
                {t(s.label)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background: 'linear-gradient(to bottom, transparent, var(--section-alt, var(--bg)))',
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
