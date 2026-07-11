'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Lock } from 'lucide-react'
import { useLang } from './LanguageProvider'
import DashboardMockup from './DashboardMockup'
import IconGrid from './IconGrid'
import { BlurIn } from './ui/blur-in'

const STATS = [
  { value: '50+', label: 'PROJECTS DELIVERED' },
  { value: '5+', label: 'YEARS OF EXPERIENCE' },
  { value: '15+', label: 'LONG-TERM CLIENTS' },
  { value: '24/7', label: 'SUPPORT & CARE' },
]

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null)
  const statsVisible = useInView(statsRef, { once: true })
  const { t, lang } = useLang()

  // Russian runs ~40% wider than EN/UZ, so "цифровой реальности." overflows the
  // ~560px headline column at 76px and wraps to a 3rd line. Size it down to fit.
  // Below desktop the clamp scales fluidly and saturates at these caps by 1024px.
  const headlineSize = lang === 'ru' ? 52 : 76
  const headlineMin = lang === 'ru' ? 30 : 36

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
          className="lg:flex-1 lg:min-w-0"
          style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
        >
          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {['From idea to', 'digital reality.'].map((line, i) => (
              <BlurIn
                key={line}
                className="font-display font-semibold"
                style={{
                  fontSize: `clamp(${headlineMin}px, 9vw, ${headlineSize}px)`,
                  letterSpacing: 'clamp(-2.8px, -0.28vw, -1.4px)',
                  lineHeight: 1.08,
                  color: 'var(--text-primary)',
                }}
                duration={0.9}
                delay={i * 0.15}
              >
                {t(line)}
              </BlurIn>
            ))}
          </div>

          {/* Subtitle */}
          <p className="font-body" style={{ fontSize: 'clamp(16px, 1.76vw, 18px)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 540 }}>
            {t('We design and build web platforms, mobile apps, CRM systems and AI products for ambitious companies — fast, reliable and beautifully engineered.')}
          </p>

          {/* Badge */}
          <div
            className="flex items-center gap-[9px] rounded-full"
            style={{
              alignSelf: 'flex-start',
              maxWidth: '100%',
              background: 'rgba(255,255,255,0.031)',
              border: '1px solid var(--border-subtle)',
              padding: '6px 16px',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--kicker)', flexShrink: 0 }} />
            <span className="font-mono" style={{ fontSize: 12, letterSpacing: 1, color: 'var(--text-secondary)' }}>
              {t('OFFICIAL IT PARK UZBEKISTAN RESIDENT')}
            </span>
          </div>

          {/* CTAs — stacked full-width buttons on mobile */}
          <div className="max-md:flex-col" style={{ display: 'flex', gap: 14 }}>
            <Link
              href="/contact"
              className="flex items-center gap-2 font-body font-semibold max-md:w-full max-md:justify-center"
              style={{
                background: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-color)',
                fontSize: 15,
                padding: '13px 28px',
                borderRadius: 8,
                boxShadow: '0 8px 32px rgba(255,255,255,0.13)',
                textDecoration: 'none',
              }}
            >
              {t('Start a project')} <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link
              href="/portfolio"
              className="font-body font-medium inline-block max-md:w-full max-md:text-center"
              style={{
                background: 'var(--btn-secondary-bg)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--btn-secondary-color)',
                fontSize: 15,
                padding: '13px 28px',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              {t('View our work')}
            </Link>
          </div>
        </motion.div>

        {/* ── Icon Grid — beside the headline on desktop, decorative band below it when stacked ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="hero-icon-grid w-full lg:w-[600px] lg:shrink-0"
        >
          <IconGrid height={360} fadeColor="var(--bg)" />
        </motion.div>
        </div>

        {/* ── Browser Mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 64 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="flex justify-center"
          style={{ paddingTop: 'clamp(44px, 6.7vw, 68px)' }}
        >
          <div
            className="overflow-hidden"
            style={{
              width: '100%',
              maxWidth: 1120,
              borderRadius: 14,
              background: '#000',
              border: '1px solid #1a1a1a',
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.05), 0 24px 80px rgba(0,0,0,0.5), 0 0 100px rgba(255,255,255,0.03)',
            }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center"
              style={{ background: '#000', padding: '12px 18px', gap: 14 }}
            >
              <div className="flex items-center" style={{ gap: 7 }}>
                {[0.9, 0.55, 0.22].map((op, i) => (
                  <div
                    key={i}
                    style={{ width: 11, height: 11, borderRadius: '50%', background: '#fff', opacity: op }}
                  />
                ))}
              </div>
              <div
                className="flex items-center"
                style={{ background: '#060d24', borderRadius: 6, padding: '5px 13px', gap: 6 }}
              >
                <Lock style={{ width: 11, height: 11, color: 'rgba(255,255,255,0.7)' }} />
                <span className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>
                  ctrlcode.uz
                </span>
              </div>
            </div>
            {/* Showcase — inline SVG dashboard; keeps the SVG's aspect below lg */}
            <div className="w-full max-lg:aspect-[1120/580] lg:h-[580px]" style={{ background: '#0a0a0f' }}>
              <DashboardMockup />
            </div>
          </div>
        </motion.div>

        {/* ── Stats — 2x2 grid on mobile, single row from md up ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 gap-x-4 gap-y-9 md:flex md:justify-between md:gap-x-0 md:gap-y-0 md:px-10"
          style={{ maxWidth: 1120, width: '100%', margin: '0 auto', paddingTop: 'clamp(44px, 5.5vw, 56px)' }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              animate={statsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
              className="flex flex-col items-center"
              style={{ gap: 8 }}
            >
              <span
                className="font-display font-semibold"
                style={{ fontSize: 'clamp(30px, 9vw, 38px)', letterSpacing: -1, color: 'var(--text-primary)', lineHeight: 1 }}
              >
                {s.value}
              </span>
              <span
                className="font-mono"
                style={{ fontSize: 11, letterSpacing: 1.2, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 160 }}
              >
                {t(s.label)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
