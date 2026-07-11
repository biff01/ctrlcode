'use client'

import Image from 'next/image'
import Link from 'next/link'
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
import { motion } from 'framer-motion'
import type { Project } from '@/lib/projects'
import Footer from './Footer'
import { useTheme } from './ThemeProvider'
import { useLang } from './LanguageProvider'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

interface SectionProps { project: Project; dark: boolean; t: (s: string) => string }

function themeColors(dark: boolean) {
  return {
    bg1:           dark ? '#0A0A0A'                    : '#ffffff',
    bg2:           dark ? '#111111'                    : '#F0F1F5',
    text:          dark ? '#ffffff'                    : '#0D1B4B',
    textSub:       dark ? 'rgba(255,255,255,0.55)'     : 'rgba(13,27,75,0.6)',
    textMuted:     dark ? 'rgba(255,255,255,0.4)'      : 'rgba(13,27,75,0.5)',
    textFaint:     dark ? 'rgba(255,255,255,0.25)'     : 'rgba(13,27,75,0.32)',
    textLabel:     dark ? '#444'                       : '#888',
    tagBg:         dark ? 'rgba(255,255,255,0.06)'     : 'rgba(13,27,75,0.06)',
    tagBorder:     dark ? 'rgba(255,255,255,0.14)'     : 'rgba(13,27,75,0.14)',
    tagText:       dark ? 'rgba(255,255,255,0.55)'     : 'rgba(13,27,75,0.6)',
    border:        dark ? 'rgba(255,255,255,0.08)'     : 'rgba(13,27,75,0.1)',
    borderSubtle:  dark ? 'rgba(255,255,255,0.07)'     : 'rgba(13,27,75,0.07)',
    borderStrong:  dark ? '#2A2A2A'                    : '#e0e2e8',
    surface:       dark ? 'rgba(255,255,255,0.03)'     : 'rgba(13,27,75,0.03)',
    surfaceBorder: dark ? 'rgba(255,255,255,0.08)'     : 'rgba(13,27,75,0.09)',
    iconBg:        dark ? 'rgba(255,255,255,0.06)'     : 'rgba(13,27,75,0.06)',
    iconBorder:    dark ? 'rgba(255,255,255,0.10)'     : 'rgba(13,27,75,0.10)',
    pillBg:        dark ? 'rgba(255,255,255,0.05)'     : 'rgba(13,27,75,0.05)',
    pillBorder:    dark ? 'rgba(255,255,255,0.10)'     : 'rgba(13,27,75,0.10)',
    pillText:      dark ? 'rgba(255,255,255,0.65)'     : 'rgba(13,27,75,0.7)',
    divider:       dark ? 'rgba(255,255,255,0.08)'     : 'rgba(13,27,75,0.08)',
    chrome:        dark ? 'rgba(20,20,20,0.95)'        : 'rgba(230,232,238,0.95)',
    heroBorder:    dark ? 'rgba(255,255,255,0.10)'     : 'rgba(13,27,75,0.12)',
    heroShadow:    dark ? '0 40px 120px rgba(0,0,0,0.7)' : '0 40px 80px rgba(13,27,75,0.12)',
    btnPrimBg:     dark ? '#ffffff'                    : '#0D1B4B',
    btnPrimText:   dark ? '#0A0A0A'                    : '#ffffff',
    btnSecBg:      dark ? 'rgba(255,255,255,0.07)'     : 'rgba(13,27,75,0.06)',
    btnSecBorder:  dark ? 'rgba(255,255,255,0.12)'     : 'rgba(13,27,75,0.14)',
    btnSecText:    dark ? '#ffffff'                    : '#0D1B4B',
    arrowFaint:    dark ? 'rgba(255,255,255,0.25)'     : 'rgba(13,27,75,0.25)',
    arrowVeryFaint:dark ? 'rgba(255,255,255,0.15)'     : 'rgba(13,27,75,0.18)',
    navLink:       dark ? 'rgba(255,255,255,0.45)'     : 'rgba(13,27,75,0.5)',
    navCenter:     dark ? 'rgba(255,255,255,0.25)'     : 'rgba(13,27,75,0.3)',
    labelColor:    dark ? '#555'                       : '#888',
  }
}

/* ── Hero ───────────────────────────────────────────────────────── */
function HeroSection({ project, dark, t }: SectionProps) {
  const c = themeColors(dark)
  const liveBtnStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '12px 22px', borderRadius: 10,
    background: c.btnPrimBg, color: c.btnPrimText,
    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
    textDecoration: 'none', letterSpacing: -0.2, border: 'none', cursor: 'pointer',
  }
  return (
    <section style={{ background: c.bg1, padding: '72px 0 96px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 120px', display: 'flex', alignItems: 'center', gap: 80 }}>
        {/* Left */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}
        >
          {/* Tags */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '5px 12px',
                  borderRadius: 999,
                  border: `1px solid ${c.tagBorder}`,
                  background: c.tagBg,
                  fontSize: 11,
                  fontFamily: 'var(--font-body)',
                  color: c.tagText,
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
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 72, letterSpacing: -3, lineHeight: 1.0, color: c.text, margin: 0 }}
          >
            {project.name}.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.65, color: c.textSub, margin: 0, maxWidth: 420 }}
          >
            {project.description}
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={liveBtnStyle}
              >
                {t('View Live Product')} <ExternalLink size={14} />
              </a>
            )}
            <a
              href="#overview"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 22px', borderRadius: 10,
                background: c.btnSecBg, border: `1px solid ${c.btnSecBorder}`,
                color: c.btnSecText, fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14,
                textDecoration: 'none',
              }}
            >
              {t('Read the Overview')}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', gap: 40, paddingTop: 8, borderTop: `1px solid ${c.divider}` }}
          >
            {project.stats.map((s) => (
              <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: c.text, letterSpacing: -1, lineHeight: 1 }}>
                  {s.value}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.textFaint, letterSpacing: 0.3 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 560, flexShrink: 0, borderRadius: 16, overflow: 'hidden',
            border: `1px solid ${c.heroBorder}`, boxShadow: c.heroShadow,
            position: 'relative', aspectRatio: '16/11',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 32, background: c.chrome, display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px', zIndex: 2 }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map((col) => (
              <div key={col} style={{ width: 10, height: 10, borderRadius: 999, background: col }} />
            ))}
          </div>
          <Image src={project.heroImage} alt={project.name} fill sizes="560px" style={{ objectFit: 'cover', paddingTop: 32 }} />
        </motion.div>
      </div>
    </section>
  )
}

/* ── Overview ────────────────────────────────────────────────────── */
function OverviewSection({ project, dark, t }: SectionProps) {
  const c = themeColors(dark)
  const meta = [
    { label: 'Client', value: project.name },
    { label: 'Industry', value: project.category },
    { label: 'Type', value: project.type },
    { label: 'Timeline', value: project.timeline },
  ]
  return (
    <section id="overview" style={{ background: c.bg2, padding: '96px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 120px', display: 'flex', flexDirection: 'column', gap: 56 }}>
        {/* Header */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <motion.span variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: c.textLabel, textTransform: 'uppercase' }}>
            {t('Project Overview')}
          </motion.span>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 52, letterSpacing: -2.2, lineHeight: 1.05, color: c.text, margin: 0 }}>
            {t('What we built.')}
          </motion.h2>
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          style={{ display: 'flex', width: '100%' }}
        >
          {meta.map((m, i) => (
            <motion.div
              key={m.label} variants={fadeUp}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 10,
                padding: i === 0 ? '0 32px 0 0' : '0 32px',
                borderLeft: i === 0 ? 'none' : `1px solid ${c.borderStrong}`,
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: c.textLabel, textTransform: 'uppercase' }}>
                {t(m.label)}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, letterSpacing: -0.5, color: c.text, lineHeight: 1.2 }}>
                {m.value}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Body: paragraph + services */}
        <div style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>
          <motion.p
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            style={{
              flex: 1, fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.8, color: c.textSub, margin: 0,
              display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden',
            }}
          >
            {project.overviewDescription}
          </motion.p>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <motion.span variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: c.textLabel, textTransform: 'uppercase' }}>
              {t('Services Provided')}
            </motion.span>
            {project.skills.map((skill, i) => (
              <motion.div
                key={skill} custom={i} variants={fadeUp}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.textFaint, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.textSub }}>{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Challenge ───────────────────────────────────────────────────── */
function ChallengeSection({ project, dark, t }: SectionProps) {
  const c = themeColors(dark)
  return (
    <section style={{ background: c.bg1, padding: '96px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 120px', display: 'flex', flexDirection: 'column', gap: 56 }}>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <motion.span variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: c.textLabel, textTransform: 'uppercase' }}>
            {t('The Problem')}
          </motion.span>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 52, letterSpacing: -2.5, lineHeight: 1.05, color: c.text, margin: 0, maxWidth: 540 }}>
            {t('What needed to change.')}
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: c.textMuted, margin: 0, maxWidth: 520 }}>
            {project.challengeIntro}
          </motion.p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {project.challenges.map((ch, i) => {
            const ChallengeIcon = CHALLENGE_ICONS[ch.icon] ?? Gauge
            return (
            <motion.div
              key={ch.title}
              initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
              style={{ padding: '28px 24px', borderRadius: 14, background: c.surface, border: `1px solid ${c.surfaceBorder}`, display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: c.iconBg, border: `1px solid ${c.iconBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChallengeIcon size={22} strokeWidth={1.5} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: c.labelColor, textTransform: 'uppercase' }}>
                  {String(i + 1).padStart(2, '0')} {t('Problem')}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: c.text, margin: 0, lineHeight: 1.35 }}>
                  {ch.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.6, color: c.textMuted, margin: 0 }}>
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
function ProcessSection({ project, dark, t }: SectionProps) {
  const c = themeColors(dark)
  return (
    <section style={{ background: c.bg1, padding: '96px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 120px' }}>
        <div style={{ display: 'flex', gap: 80, marginBottom: 56 }}>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <motion.span variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: c.textLabel, textTransform: 'uppercase' }}>
              {t('Our Process')}
            </motion.span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 52, letterSpacing: -2.5, lineHeight: 1.05, color: c.text, margin: 0 }}>
              {project.processTitle}
            </motion.h2>
          </motion.div>
          <motion.p
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: c.textMuted, margin: 0, alignSelf: 'flex-end' }}
          >
            {project.processSubtitle}
          </motion.p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {project.processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
              style={{ display: 'flex', alignItems: 'center', gap: 48, padding: '24px 0', borderBottom: `1px solid ${c.borderSubtle}` }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 1, color: c.textFaint, width: 28, flexShrink: 0 }}>
                {step.number}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, color: c.text, width: 200, flexShrink: 0 }}>
                {step.title}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: c.textMuted, flex: 1 }}>
                {step.description}
              </span>
              <ArrowUpRight size={14} color={c.arrowVeryFaint} style={{ flexShrink: 0 }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Mockups ─────────────────────────────────────────────────────── */
function MockupsSection({ project, dark, t }: SectionProps) {
  const c = themeColors(dark)
  const large = project.mockups.find((m) => m.large)
  const rest = project.mockups.filter((m) => !m.large)

  return (
    <section style={{ background: c.bg2, padding: '96px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 120px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <motion.span variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: c.textLabel, textTransform: 'uppercase' }}>
            {t('Design Preview')}
          </motion.span>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 52, letterSpacing: -2.5, lineHeight: 1.05, color: c.text, margin: 0 }}>
            {project.mockupsTitle}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}
        >
          {large && (
            <motion.div variants={fadeUp} style={{ flex: 1, position: 'relative', borderRadius: 16, overflow: 'hidden', border: `1px solid ${c.border}`, minHeight: 400 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 32, background: c.chrome, display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px', zIndex: 2 }}>
                {['#FF5F57', '#FEBC2E', '#28C840'].map((col) => (
                  <div key={col} style={{ width: 8, height: 8, borderRadius: 999, background: col }} />
                ))}
              </div>
              <Image src={large.src} alt="Main mockup" fill sizes="65vw" style={{ objectFit: 'cover', paddingTop: 32 }} />
            </motion.div>
          )}
          {rest.length > 0 && (
            <div style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {rest.map((m) => (
                <motion.div
                  key={m.src} variants={fadeUp}
                  style={{ flex: 1, position: 'relative', borderRadius: 12, overflow: 'hidden', border: `1px solid ${c.border}` }}
                >
                  <Image src={m.src} alt={m.label || 'Mockup'} fill sizes="280px" style={{ objectFit: 'cover' }} />
                  {m.label && (
                    <div style={{ position: 'absolute', bottom: 12, left: 12, background: dark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 6, border: `1px solid ${c.border}` }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(13,27,75,0.7)' }}>{m.label}</span>
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
function ProjectNav({ project, dark, t }: SectionProps) {
  const c = themeColors(dark)
  return (
    <section style={{ background: c.bg1, borderTop: `1px solid ${c.borderStrong}`, borderBottom: `1px solid ${c.borderStrong}`, padding: '32px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 120px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {project.prevProject ? (
          <Link href={`/portfolio/${project.prevProject.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: c.navLink, fontFamily: 'var(--font-body)', fontSize: 13 }}>
            <ArrowLeft size={14} />
            {project.prevProject.name}
          </Link>
        ) : <div />}
        <Link href="/portfolio" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', color: c.navCenter, fontFamily: 'var(--font-body)', fontSize: 12 }}>
          {t('All Projects')}
        </Link>
        {project.nextProject ? (
          <Link href={`/portfolio/${project.nextProject.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: c.navLink, fontFamily: 'var(--font-body)', fontSize: 13 }}>
            {project.nextProject.name}
            <ArrowRight size={14} />
          </Link>
        ) : <div />}
      </div>
    </section>
  )
}

/* ── CTA ─────────────────────────────────────────────────────────── */
function CTASection({ dark, t }: { dark: boolean; t: (s: string) => string }) {
  const c = themeColors(dark)
  return (
    <section style={{ background: c.bg1, padding: '96px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 120px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 32 }}>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
        >
          <motion.span variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: c.textLabel, textTransform: 'uppercase' }}>
            {t('Start Your Project')}
          </motion.span>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 56, letterSpacing: -2.5, lineHeight: 1.0, color: c.text, margin: 0, maxWidth: 520 }}>
            {t('Ready to build something great?')}
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: c.textMuted, margin: 0, maxWidth: 380 }}>
            {t("Let's discuss your idea and turn it into a product your users will love.")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          style={{ display: 'flex', gap: 12 }}
        >
          <Link
            href="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 10, background: c.btnPrimBg, color: c.btnPrimText, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
          >
            {t('Get in touch')} <ArrowUpRight size={14} />
          </Link>
          <Link
            href="/portfolio"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 10, background: c.btnSecBg, border: `1px solid ${c.btnSecBorder}`, color: c.btnSecText, fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}
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
  const { theme } = useTheme()
  const { t } = useLang()
  const dark = theme === 'dark'

  return (
    <main style={{ background: themeColors(dark).bg1, minHeight: '100vh' }}>
      <HeroSection project={project} dark={dark} t={t} />
      <OverviewSection project={project} dark={dark} t={t} />
      <ChallengeSection project={project} dark={dark} t={t} />
      <ProcessSection project={project} dark={dark} t={t} />
      <MockupsSection project={project} dark={dark} t={t} />
      <ProjectNav project={project} dark={dark} t={t} />
      <CTASection dark={dark} t={t} />
      <Footer />
    </main>
  )
}
