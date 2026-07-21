'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/projects'
import Footer from './Footer'
import { useLang } from './LanguageProvider'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink,
  Users, BookOpen, BarChart2, MessageCircle,
  SlidersHorizontal, Music, Layers, Timer,
  Map, Zap, WifiOff, EyeOff,
  ShoppingCart, PlayCircle, TrendingDown, ShieldOff,
  Palette, Calendar, Eye, Gauge,
  RefreshCw, Paintbrush, Smartphone,
  LayoutGrid, Type, Ruler,
  Repeat, Unlink, FileSearch, ToggleLeft,
  ClipboardList, Radio, AlertTriangle, Key,
  Filter, Image as ImageIcon, FileText,
  type LucideIcon,
} from 'lucide-react'

const MAC_RED = '#FF5F57'
const MAC_YELLOW = '#FEBC2E'
const MAC_GREEN = '#28C840'

const BLUR_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

const CHALLENGE_ICONS: Record<string, LucideIcon> = {
  'users': Users, 'book-open': BookOpen, 'bar-chart-2': BarChart2, 'message-circle': MessageCircle,
  'sliders-horizontal': SlidersHorizontal, 'music': Music, 'layers': Layers, 'timer': Timer,
  'map': Map, 'zap': Zap, 'wifi-off': WifiOff, 'eye-off': EyeOff,
  'shopping-cart': ShoppingCart, 'play-circle': PlayCircle, 'trending-down': TrendingDown, 'shield-off': ShieldOff,
  'palette': Palette, 'calendar': Calendar, 'eye': Eye, 'gauge': Gauge,
  'refresh-cw': RefreshCw, 'paintbrush': Paintbrush, 'smartphone': Smartphone,
  'layout-grid': LayoutGrid, 'type': Type, 'ruler': Ruler,
  'repeat': Repeat, 'unlink': Unlink, 'file-search': FileSearch, 'toggle-left': ToggleLeft,
  'clipboard-list': ClipboardList, 'radio': Radio, 'alert-triangle': AlertTriangle, 'key': Key,
  'filter': Filter, 'image': ImageIcon, 'file-text': FileText,
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

interface SectionProps { project: Project; t: (s: string) => string }

function ChromeDots() {
  return (
    <>
      {[MAC_RED, MAC_YELLOW, MAC_GREEN].map((col) => (
        <div key={col} style={{ width: 10, height: 10, borderRadius: 999, background: col }} />
      ))}
    </>
  )
}

/* ── Hero ───────────────────────────────────────────────────────── */
function HeroSection({ project, t }: SectionProps) {
  const liveBtnStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '12px 22px', borderRadius: 8,
    background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-color)',
    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
    textDecoration: 'none', letterSpacing: -0.2, border: 'none', cursor: 'pointer',
    transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1), filter 0.22s ease',
  }
  return (
    <section style={{ background: 'var(--bg)', padding: 'clamp(48px, 8vw, 72px) 0 clamp(56px, 10vw, 96px)' }}>
      <div className="flex flex-col lg:flex-row lg:items-center" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 120px)', gap: 'clamp(40px, 8vw, 80px)' }}>
        {/* Left */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}
        >
          {/* Tags */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '4px 12px',
                  borderRadius: 999,
                  border: '1px solid var(--tag-border)',
                  background: 'var(--tag-bg)',
                  fontSize: 11,
                  fontFamily: 'var(--font-body)',
                  color: 'var(--tag-color)',
                  letterSpacing: 0.3,
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(40px, 10vw, 72px)', letterSpacing: 'clamp(-3px, -0.3vw, -1.5px)', lineHeight: 1.0, color: 'var(--text-primary)', margin: 0 }}
          >
            {project.heroTitleLines ? (
              <>{t(project.heroTitleLines[0])}<br />{t(project.heroTitleLines[1])}.</>
            ) : (
              <>{t(project.name)}.</>
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0, maxWidth: 420 }}
          >
            {t(project.description)}
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row" style={{ gap: 12, flexWrap: 'wrap' }}>
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="max-md:w-full max-md:justify-center max-md:min-h-[48px] btn-lift press"
                style={liveBtnStyle}
                whileHover={{ scale: 1.025, filter: 'brightness(1.08)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              >
                {t('View Live Product')} <ExternalLink size={14} />
              </motion.a>
            )}
            <a
              href="#overview"
              className="max-md:w-full max-md:justify-center max-md:min-h-[48px] btn-fade press"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 22px', borderRadius: 8,
                background: 'var(--btn-secondary-bg)', border: '1px solid var(--btn-secondary-border)',
                color: 'var(--btn-secondary-color)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14,
                textDecoration: 'none',
              }}
            >
              {t('Read the Overview')}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            className="grid grid-cols-2 gap-x-8 gap-y-5 md:flex md:gap-x-10"
            style={{ paddingTop: 8, borderTop: '1px solid var(--border)' }}
          >
            {project.stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 42, color: 'var(--text-primary)', letterSpacing: -2, lineHeight: 1 }}>
                  {s.value}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: 0.3 }}>
                  {t(s.label)}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-[560px]"
          style={{
            flexShrink: 0, borderRadius: 16, overflow: 'hidden',
            border: '1px solid var(--border)', boxShadow: 'var(--hero-shadow)',
            position: 'relative', aspectRatio: '16/11',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 32, background: 'var(--chrome)', display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px', zIndex: 2 }}>
            <ChromeDots />
          </div>
          <Image
            src={project.heroImage}
            alt={project.name}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 90vw, 560px"
            style={{ objectFit: 'cover', paddingTop: 32 }}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        </motion.div>
      </div>
    </section>
  )
}

/* ── Overview ────────────────────────────────────────────────────── */
function OverviewSection({ project, t }: SectionProps) {
  const meta = [
    { label: 'Client', value: project.name },
    { label: 'Industry', value: project.category },
    { label: 'Type', value: project.type },
    { label: 'Timeline', value: project.timeline },
  ]
  const metaCellClasses = [
    'pr-4 md:pr-8',
    'border-l pl-4 md:pl-8 md:pr-8',
    'pr-4 md:border-l md:pl-8 md:pr-8',
    'border-l pl-4 md:pl-8 md:pr-8',
  ]
  return (
    <section id="overview" style={{ background: 'var(--surface)', padding: 'clamp(56px, 10vw, 96px) 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 120px)', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 5.5vw, 56px)' }}>
        {/* Header */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <motion.span variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1.5, color: 'var(--text-label)', textTransform: 'uppercase' }}>
            {t('Project Overview')}
          </motion.span>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 6vw, 52px)', letterSpacing: 'clamp(-2.2px, -0.22vw, -1.1px)', lineHeight: 1.05, color: 'var(--text-primary)', margin: 0 }}>
            {t('What we built.')}
          </motion.h2>
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-2 gap-y-8 md:flex"
          style={{ width: '100%' }}
        >
          {meta.map((m, i) => (
            <motion.div
              key={m.label} variants={fadeUp}
              className={metaCellClasses[i] ?? ''}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 8,
                borderLeftColor: 'var(--border-subtle)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: 'var(--text-label)', textTransform: 'uppercase' }}>
                {t(m.label)}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(16px, 2.5vw, 20px)', letterSpacing: -0.5, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {t(m.value)}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Body: paragraph + services */}
        <div className="flex flex-col md:flex-row md:items-start" style={{ gap: 'clamp(32px, 5.5vw, 56px)' }}>
          <motion.p
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            style={{
              flex: 1, fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0,
            }}
          >
            {project.overviewDescription}
          </motion.p>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            className="w-full md:w-[240px]"
            style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <motion.span variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: 'var(--text-label)', textTransform: 'uppercase' }}>
              {t('Services Provided')}
            </motion.span>
            {project.skills.map((skill, i) => (
              <motion.div
                key={skill} custom={i} variants={fadeUp}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--text-muted)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)' }}>{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Challenge ───────────────────────────────────────────────────── */
function ChallengeSection({ project, t }: SectionProps) {
  return (
    <section style={{ background: 'var(--bg)', padding: 'clamp(56px, 10vw, 96px) 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 120px)', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 5.5vw, 56px)' }}>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <motion.span variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1.5, color: 'var(--text-label)', textTransform: 'uppercase' }}>
            {t('The Problem')}
          </motion.span>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 6vw, 52px)', letterSpacing: 'clamp(-2.5px, -0.25vw, -1.25px)', lineHeight: 1.05, color: 'var(--text-primary)', margin: 0, maxWidth: 540 }}>
            {t('What needed to change.')}
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: 'var(--text-tertiary)', margin: 0, maxWidth: 520 }}>
            {project.challengeIntro}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 16 }}>
          {project.challenges.map((ch, i) => {
            const ChallengeIcon = CHALLENGE_ICONS[ch.icon] ?? Gauge
            return (
              <motion.div
                key={ch.title}
                initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
                whileHover={{ y: -4, boxShadow: 'var(--case-hover-shadow)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                style={{ padding: '24px 24px', borderRadius: 14, background: 'var(--card-bg)', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: 20, cursor: 'default' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChallengeIcon size={22} strokeWidth={1.5} color="var(--text-secondary)" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: 'var(--text-label)', textTransform: 'uppercase' }}>
                    {String(i + 1).padStart(2, '0')} {t('Problem')}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(17px, 2.2vw, 22px)', color: 'var(--text-primary)', margin: 0, lineHeight: 1.35 }}>
                    {ch.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.6, color: 'var(--text-tertiary)', margin: 0 }}>
                    {ch.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Process ─────────────────────────────────────────────────────── */
function ProcessSection({ project, t }: SectionProps) {
  return (
    <section style={{ background: 'var(--surface)', padding: 'clamp(56px, 10vw, 96px) 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 120px)' }}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-20" style={{ marginBottom: 'clamp(40px, 5.5vw, 56px)' }}>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <motion.span variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1.5, color: 'var(--text-label)', textTransform: 'uppercase' }}>
              {t('Our Process')}
            </motion.span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 6vw, 52px)', letterSpacing: 'clamp(-2.5px, -0.25vw, -1.25px)', lineHeight: 1.05, color: 'var(--text-primary)', margin: 0 }}>
              {project.processTitle}
            </motion.h2>
          </motion.div>
          <motion.p
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="lg:self-end"
            style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: 'var(--text-tertiary)', margin: 0 }}
          >
            {project.processSubtitle}
          </motion.p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {project.processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
              whileHover={{ backgroundColor: 'var(--process-hover-bg)', borderRadius: 8, x: 2, transition: { duration: 0.18 } }}
              className="flex flex-wrap gap-x-4 gap-y-2 md:flex-nowrap md:gap-x-12"
              style={{ alignItems: 'center', padding: '24px 0', borderBottom: '1px solid var(--border-subtle)', borderRadius: 8 }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 1, color: 'var(--text-muted)', width: 28, flexShrink: 0 }}>
                {step.number}
              </span>
              <span className="flex-1 md:flex-none md:min-w-[200px] md:max-w-[260px]" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(15px, 2vw, 18px)', color: 'var(--text-primary)' }}>
                {step.title}
              </span>
              <span className="w-full pl-11 md:w-auto md:flex-1 md:pl-0" style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-tertiary)' }}>
                {step.description}
              </span>
              <motion.span
                className="max-md:hidden"
                aria-hidden="true"
                style={{ flexShrink: 0, opacity: 0, display: 'flex' }}
                whileHover={{ opacity: 1, x: 2, y: -2 }}
              >
                <ArrowUpRight size={14} color="var(--arrow-faint)" />
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Mockups ─────────────────────────────────────────────────────── */
function MockupsSection({ project, t }: SectionProps) {
  const large = project.mockups.find((m) => m.large)
  const rest = project.mockups.filter((m) => !m.large)

  return (
    <section style={{ background: 'var(--surface)', padding: 'clamp(56px, 10vw, 96px) 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 120px)', display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 4vw, 40px)' }}>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="flex flex-col md:flex-row md:items-end md:justify-between"
          style={{ gap: 16 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <motion.span variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1.5, color: 'var(--text-label)', textTransform: 'uppercase' }}>
              {t('Design Preview')}
            </motion.span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 6vw, 52px)', letterSpacing: 'clamp(-2.5px, -0.25vw, -1.25px)', lineHeight: 1.05, color: 'var(--text-primary)', margin: 0 }}>
              {project.mockupsTitle}
            </motion.h2>
          </div>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col lg:flex-row"
          style={{ gap: 16, alignItems: 'stretch' }}
        >
          {large && (
            <motion.div
              variants={fadeUp}
              className="aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-[400px]"
              whileHover={{ scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 250, damping: 28 }}
              style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 32, background: 'var(--chrome)', display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px', zIndex: 2 }}>
                <ChromeDots />
              </div>
              <Image
                src={large.src}
                alt={large.label ? large.label : `${project.name} main screen`}
                fill
                sizes="(max-width: 1023px) 100vw, 65vw"
                style={{ objectFit: 'cover', paddingTop: 32 }}
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
            </motion.div>
          )}
          {rest.length > 0 && (
            <div className="grid grid-cols-2 lg:flex lg:flex-col lg:w-[280px]" style={{ gap: 16 }}>
              {rest.map((m) => (
                <motion.div
                  key={m.src} variants={fadeUp}
                  className="aspect-square lg:aspect-auto"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                  style={{ flex: 1, position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}
                >
                  <Image
                    src={m.src}
                    alt={m.label || t('Mockup')}
                    fill
                    sizes="(max-width: 1023px) 50vw, 280px"
                    style={{ objectFit: 'cover' }}
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                  {m.label && (
                    <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'var(--overlay-bg)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border)' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-on-overlay-muted)' }}>{m.label}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Project Nav ─────────────────────────────────────────────────── */
function ProjectNav({ project, t }: SectionProps) {
  return (
    <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '32px 0' }}>
      <div className="max-lg:gap-2" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 120px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {project.prevProject ? (
          <Link
            href={`/portfolio/${project.prevProject.slug}`}
            className="max-lg:flex-1 max-lg:min-w-0 max-lg:min-h-[44px] nav-link"
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--nav-link)', fontFamily: 'var(--font-body)', fontSize: 13, transition: 'color 0.2s ease' }}
          >
            <ArrowLeft size={14} style={{ flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.prevProject.name}</span>
          </Link>
        ) : <div />}
        <Link
          href="/portfolio"
          className="max-lg:shrink-0 max-lg:min-h-[44px] nav-link"
          style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', color: 'var(--nav-center)', fontFamily: 'var(--font-body)', fontSize: 12 }}
        >
          {t('All Projects')}
        </Link>
        {project.nextProject ? (
          <Link
            href={`/portfolio/${project.nextProject.slug}`}
            className="max-lg:flex-1 max-lg:min-w-0 max-lg:justify-end max-lg:min-h-[44px] nav-link"
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--nav-link)', fontFamily: 'var(--font-body)', fontSize: 13, transition: 'color 0.2s ease' }}
          >
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.nextProject.name}</span>
            <ArrowRight size={14} style={{ flexShrink: 0 }} />
          </Link>
        ) : <div />}
      </div>
    </section>
  )
}

/* ── CTA ─────────────────────────────────────────────────────────── */
function CTASection({ t }: { t: (s: string) => string }) {
  return (
    <section style={{ background: 'var(--cta-section-bg)', padding: 'clamp(56px, 10vw, 96px) 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 32 }}>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
        >
          <motion.span variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1.5, color: 'var(--text-label)', textTransform: 'uppercase' }}>
            {t('Start Your Project')}
          </motion.span>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 7vw, 56px)', letterSpacing: 'clamp(-2.5px, -0.25vw, -1.25px)', lineHeight: 1.0, color: 'var(--text-primary)', margin: 0, maxWidth: 520 }}>
            {t('Ready to build something great?')}
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: 'var(--text-tertiary)', margin: 0, maxWidth: 380 }}>
            {t("Let's discuss your idea and turn it into a product your users will love.")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="flex flex-col md:flex-row w-full md:w-auto"
          style={{ gap: 12 }}
        >
          <Link
            href="/contact"
            className="max-md:w-full max-md:justify-center max-md:min-h-[48px] btn-lift press"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 8, background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-color)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
          >
            {t('Get in touch')} <ArrowUpRight size={14} />
          </Link>
          <Link
            href="/portfolio"
            className="max-md:w-full max-md:justify-center max-md:min-h-[48px] btn-fade press"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 8, background: 'var(--btn-secondary-bg)', border: '1px solid var(--btn-secondary-border)', color: 'var(--btn-secondary-color)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}
          >
            {t('View all work')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Root ────────────────────────────────────────────────────────── */
export default function CaseStudyPage({ project }: { project: Project }) {
  const { t } = useLang()

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <HeroSection project={project} t={t} />
      <OverviewSection project={project} t={t} />
      <ChallengeSection project={project} t={t} />
      <ProcessSection project={project} t={t} />
      <MockupsSection project={project} t={t} />
      <ProjectNav project={project} t={t} />
      <CTASection t={t} />
      <Footer />
    </main>
  )
}
