'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Filter } from './PortfolioPageClient'
import { useLang } from './LanguageProvider'

interface Project {
  name: string
  category: string
  tag: Filter
  date: string
  image: string
  slug?: string
}

const PROJECTS: Project[] = [
  {
    name: 'Darsly',
    category: 'Education / EdTech',
    tag: 'SaaS',
    date: '2024-11-01',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
    slug: 'darsly',
  },
  {
    name: 'SonicMeditate',
    category: 'Wellness / Mobile',
    tag: 'Mobile',
    date: '2024-09-01',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    slug: 'sonicmeditate',
  },
  {
    name: 'NextWay App',
    category: 'Navigation / Mobile',
    tag: 'Mobile',
    date: '2025-01-01',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    slug: 'nextway',
  },
  {
    name: 'Studify Pro',
    category: 'E-Commerce / EdTech',
    tag: 'E-Com',
    date: '2024-09-01',
    image: 'https://images.unsplash.com/photo-1767449280971-46e438b1ce4a?w=800&q=80',
    slug: 'studify-pro',
  },
  {
    name: 'MediCare Portal',
    category: 'Healthcare',
    tag: 'Web',
    date: '2025-02-01',
    image: 'https://images.unsplash.com/photo-1613191413911-1032184f4035?w=800&q=80',
    slug: 'medicare-portal',
  },
  {
    name: 'FitTrack Mobile',
    category: 'Mobile App',
    tag: 'Mobile',
    date: '2025-04-01',
    image: 'https://images.unsplash.com/photo-1700667282848-994df515c0d7?w=800&q=80',
    slug: 'fittrack-mobile',
  },
  {
    name: 'Brand Identity System',
    category: 'Brand Design',
    tag: 'Branding',
    date: '2024-12-01',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    slug: 'brand-identity',
  },
  {
    name: 'AI Workflow Platform',
    category: 'SaaS Platform',
    tag: 'SaaS',
    date: '2025-01-01',
    image: 'https://images.unsplash.com/photo-1707332287886-84315bbb04bb?w=800&q=80',
    slug: 'ai-workflow-platform',
  },
  {
    name: 'Logistics Management',
    category: 'Web App',
    tag: 'Web',
    date: '2024-03-01',
    image: 'https://images.unsplash.com/photo-1692384359344-42fd4a15603c?w=800&q=80',
    slug: 'logistics-management',
  },
  {
    name: 'Real Estate Platform',
    category: 'Website Design',
    tag: 'Web',
    date: '2024-06-01',
    image: 'https://images.unsplash.com/photo-1585164216355-cfe3ca9c961d?w=800&q=80',
    slug: 'real-estate-platform',
  },
]

function accentBorder(tag: Filter): string {
  if (tag === 'SaaS') return '2px solid var(--accent-saas)'
  if (tag === 'Mobile') return '2px solid var(--accent-mobile)'
  if (tag === 'Web') return '2px solid var(--accent-web)'
  if (tag === 'Branding') return '2px solid var(--accent-branding)'
  if (tag === 'E-Com') return '2px solid var(--accent-ecom)'
  return '2px solid var(--border)'
}

function DatePill({ date }: { date: string }) {
  const { lang } = useLang()
  const localeMap: Record<string, string> = { en: 'en-GB', ru: 'ru-RU', uz: 'uz-UZ' }
  const formatted = new Intl.DateTimeFormat(localeMap[lang] ?? 'en-GB', { month: 'short', year: 'numeric' }).format(new Date(date))
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 9999,
        background: 'var(--pill-bg)',
        border: '1px solid var(--pill-border)',
        padding: '4px 12px',
        alignSelf: 'flex-start',
      }}
    >
      <span className="font-body" style={{ fontSize: 11, color: 'var(--pill-text)' }}>
        {formatted}
      </span>
    </div>
  )
}

function Card({ project }: { project: Project }) {
  const { t } = useLang()
  const inner = (
    <motion.div
      whileHover={{
        y: -6,
        boxShadow: '0 24px 48px rgba(0,0,0,0.14), 0 8px 16px rgba(0,0,0,0.08)',
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      whileTap={{ scale: 0.98, transition: { duration: 0.12 } }}
      className="flex flex-col overflow-hidden group"
      style={{
        borderRadius: 16,
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderTop: accentBorder(project.tag),
        boxShadow: 'var(--card-shadow)',
        cursor: 'pointer',
        height: '100%',
      }}
    >
      <div className="aspect-video" style={{ width: '100%', position: 'relative', overflow: 'hidden', borderRadius: 10 }}>
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex items-end justify-between gap-3 lg:gap-0" style={{ padding: '20px 24px 24px', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
          <span className="font-body" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 1.2, textTransform: 'uppercase' }}>
            {t(project.category)}
          </span>
          <span className="font-display font-bold" style={{ fontSize: 'clamp(18px, 2vw, 24px)', letterSpacing: -0.4, lineHeight: 1.15, color: 'var(--text-primary)' }}>
            {t(project.name)}
          </span>
          <DatePill date={project.date} />
        </div>
        <div
          className="flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-[var(--text-primary)] group-hover:border-transparent"
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: 'var(--pill-bg)',
            border: '1px solid var(--card-border)',
          }}
        >
          <ArrowUpRight className="transition-colors duration-300 group-hover:text-[var(--bg)]" style={{ width: 20, height: 20, color: 'var(--text-primary)' }} />
        </div>
      </div>
    </motion.div>
  )
  return project.slug ? (
    <Link href={`/portfolio/${project.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      {inner}
    </Link>
  ) : inner
}

function FeaturedCard({ project }: { project: Project }) {
  const { t } = useLang()
  const inner = (
    <motion.div
      whileHover={{
        y: -6,
        boxShadow: '0 24px 48px rgba(0,0,0,0.14), 0 8px 16px rgba(0,0,0,0.08)',
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      whileTap={{ scale: 0.98, transition: { duration: 0.12 } }}
      className="flex flex-col overflow-hidden group"
      style={{
        borderRadius: 16,
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderTop: accentBorder(project.tag),
        boxShadow: 'var(--card-shadow)',
        cursor: 'pointer',
        height: '100%',
      }}
    >
      <div className="aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:h-[460px]" style={{ width: '100%', position: 'relative', overflow: 'hidden', borderRadius: 10 }}>
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 1023px) 100vw, 60vw"
          className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex items-end justify-between gap-3 lg:gap-0" style={{ padding: '20px 24px 24px', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
          <span className="font-body" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 1.2, textTransform: 'uppercase' }}>
            {t(project.category)}
          </span>
          <span className="font-display font-bold" style={{ fontSize: 'clamp(26px, 5.5vw, 36px)', letterSpacing: 'clamp(-1.2px, -0.12vw, -0.6px)', lineHeight: 1.1, color: 'var(--text-primary)' }}>
            {t(project.name)}
          </span>
          <DatePill date={project.date} />
        </div>
        <div
          className="flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-[var(--text-primary)] group-hover:border-transparent"
          style={{
            width: 68,
            height: 68,
            borderRadius: 14,
            background: 'var(--pill-bg)',
            border: '1px solid var(--card-border)',
          }}
        >
          <ArrowUpRight className="transition-colors duration-300 group-hover:text-[var(--bg)]" style={{ width: 24, height: 24, color: 'var(--text-primary)' }} />
        </div>
      </div>
    </motion.div>
  )
  return project.slug ? (
    <Link href={`/portfolio/${project.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      {inner}
    </Link>
  ) : inner
}

export default function PortfolioWork({ active }: { active: Filter }) {
  const { t } = useLang()
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.tag === active)

  return (
    <section style={{ background: 'var(--bg)', padding: '80px 0 112px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-0"
          style={{ marginBottom: 8 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="font-mono" style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text-muted)' }}>{t('SELECTED WORK')}</span>
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 6vw, 48px)', letterSpacing: 'clamp(-2px, -0.2vw, -1px)', lineHeight: 1.08, color: 'var(--text-primary)' }}>
              {t('Work that speaks for itself.')}
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="flex items-center font-body btn-fade press"
            style={{
              gap: 8,
              padding: '8px 20px',
              borderRadius: 8,
              background: 'var(--pill-bg)',
              border: '1px solid var(--border)',
              color: 'var(--pill-text)',
              fontSize: 13,
              textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s',
            }}
          >
            {t('All projects')} <ArrowUpRight aria-hidden={true} style={{ width: 14, height: 14 }} />
          </Link>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {active === 'All' ? (
            <motion.div
              key="all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              {/* Featured row */}
              <div className="flex flex-col lg:flex-row lg:items-stretch" style={{ gap: 20 }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:flex-1"
                >
                  <FeaturedCard project={PROJECTS[0]} />
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col w-full lg:w-[380px]" style={{ gap: 20 }}>
                  {[PROJECTS[1], PROJECTS[2]].map((p, i) => (
                    <motion.div
                      key={p.slug ?? p.name}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: (i + 1) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      style={{ flex: 1 }}
                    >
                      <Card project={p} />
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Grid row — 2-up on tablet, the last card spanning the full row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:flex" style={{ gap: 20 }}>
                {[PROJECTS[3], PROJECTS[4], PROJECTS[5]].map((p, i) => (
                  <motion.div
                    key={p.slug ?? p.name}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={i === 2 ? 'md:col-span-2' : undefined}
                    style={{ flex: 1 }}
                  >
                    <Card project={p} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : filtered.length > 0 ? (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}
            >
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug ?? p.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full md:w-[calc(50%_-_10px)] lg:w-[calc(33.333%_-_14px)]"
                >
                  <Card project={p} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '80px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                color: 'var(--text-muted)',
              }}
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                className="font-display"
                style={{ fontSize: 40, display: 'block' }}
              >✦</motion.span>
              <p className="font-body" style={{ fontSize: 15, color: 'var(--text-muted)' }}>
                {t('No projects in this category yet.')}
              </p>
              <Link
                href="/contact"
                className="font-body flex items-center gap-2 btn-lift press"
                style={{
                  marginTop: 8,
                  padding: '10px 20px',
                  borderRadius: 8,
                  background: 'var(--pill-bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  fontSize: 13,
                  textDecoration: 'none',
                }}
              >
                {t('Start a project')} <ArrowUpRight style={{ width: 13, height: 13 }} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
