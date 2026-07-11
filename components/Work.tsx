'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, ExternalLink, Maximize2 } from 'lucide-react'
import { useLang } from './LanguageProvider'
import ProjectShowcase from './ProjectShowcase'
import { getProjectBySlug } from '@/lib/projects'

interface ProjectCard {
  name: string
  category: string
  date: string
  image: string
  /** External product site. Omit when the project has no live site — the button is then hidden. */
  liveUrl?: string
  /** Case-study slug, opened by the arrow icon button. Must exist in lib/projects.ts. */
  slug: string
}

const FEATURED: ProjectCard = {
  name: 'AI Workflow Platform',
  category: 'SaaS Platform',
  date: 'Jan 2025',
  image: 'https://images.unsplash.com/photo-1707332287886-84315bbb04bb?w=1200&q=80',
  // No live site yet.
  slug: 'ai-workflow-platform',
}

const SIDE_CARDS: ProjectCard[] = [
  {
    name: 'Logistics Management',
    category: 'Web App',
    date: 'Mar 2024',
    image: 'https://images.unsplash.com/photo-1692384359344-42fd4a15603c?w=800&q=80',
    liveUrl: 'https://softms.io/',
    slug: 'logistics-management',
  },
  {
    name: 'Real Estate Platform',
    category: 'Website Design',
    date: 'Jun 2024',
    image: 'https://images.unsplash.com/photo-1585164216355-cfe3ca9c961d?w=800&q=80',
    liveUrl: 'https://uzautomotors.com/',
    slug: 'real-estate-platform',
  },
]

const GRID_CARDS: ProjectCard[] = [
  {
    name: 'Education Platform',
    category: 'EdTech',
    date: 'Sep 2024',
    image: 'https://images.unsplash.com/photo-1767449280971-46e438b1ce4a?w=800&q=80',
    liveUrl: 'https://darsly.uz/en/partners',
    slug: 'education-platform',
  },
  {
    name: 'Healthcare Website',
    category: 'Healthcare',
    date: 'Feb 2025',
    image: 'https://images.unsplash.com/photo-1613191413911-1032184f4035?w=800&q=80',
    liveUrl: 'https://nanomedicalclinic.com/',
    slug: 'healthcare-website',
  },
  {
    name: 'Mobile Application',
    category: 'Mobile App',
    date: 'Apr 2025',
    image: 'https://images.unsplash.com/photo-1700667282848-994df515c0d7?w=800&q=80',
    // No live site yet.
    slug: 'mobile-application',
  },
]

function DatePill({ date }: { date: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 40,
        background: 'var(--pill-bg)',
        border: '1px solid var(--pill-border)',
        padding: '6px 14px',
        alignSelf: 'flex-start',
      }}
    >
      <span className="font-body" style={{ fontSize: 12, color: 'var(--pill-text)' }}>
        {date}
      </span>
    </div>
  )
}

const pillStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  borderRadius: 40,
  background: 'var(--btn-secondary-bg)',
  border: '1px solid var(--border)',
  padding: '7px 15px',
  alignSelf: 'flex-start',
  fontSize: 12,
  color: 'var(--text-primary)',
  textDecoration: 'none',
  cursor: 'pointer',
}

/**
 * Opens the in-site showcase when the project has captured screenshots, else the
 * external product site in a new tab. Renders nothing when the project has neither,
 * so projects without a live site show no button at all.
 */
function LivePill({ href, onShowcase }: { href?: string; onShowcase?: () => void }) {
  const { t } = useLang()

  if (onShowcase) {
    return (
      <button onClick={onShowcase} className="font-body min-h-[44px] lg:min-h-0" style={pillStyle}>
        {t('View Live Product')}
        <Maximize2 style={{ width: 12, height: 12 }} />
      </button>
    )
  }

  if (!href) return null

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-body min-h-[44px] lg:min-h-0" style={pillStyle}>
      {t('View Live Product')}
      <ExternalLink style={{ width: 12, height: 12 }} />
    </a>
  )
}

/** Opens the internal case-study page. */
function DetailsButton({ slug, name }: { slug: string; name: string }) {
  const { t } = useLang()
  return (
    <Link
      href={`/portfolio/${slug}`}
      aria-label={`${t('View case study')}: ${t(name)}`}
      className="flex items-center justify-center flex-shrink-0 w-[52px] h-[52px] lg:w-[68px] lg:h-[68px]"
      style={{
        borderRadius: 14,
        background: 'var(--pill-bg)',
        border: '1px solid var(--card-border)',
        boxShadow: '0 1px 0 var(--why-cell-border)',
        cursor: 'pointer',
      }}
    >
      <ArrowUpRight style={{ width: 24, height: 24, color: 'var(--text-primary)' }} />
    </Link>
  )
}

function Card({ card, imgClassName, onShowcase }: { card: ProjectCard; imgClassName: string; onShowcase?: () => void }) {
  const { t } = useLang()
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className="flex flex-col overflow-hidden"
      style={{
        borderRadius: 16,
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--card-shadow)',
        height: '100%',
      }}
    >
      <div className={imgClassName} style={{ width: '100%', position: 'relative', overflow: 'hidden', borderRadius: 10 }}>
        <Image
          src={card.image}
          alt={card.name}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 400px"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div
        className="flex items-end justify-between gap-3 p-5 md:p-6 lg:gap-0 lg:p-7"
        style={{ flex: 1 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
          <span
            className="font-body"
            style={{ fontSize: 12, color: 'var(--text-tertiary)' }}
          >
            {t(card.category)}
          </span>
          <span
            className="font-display font-bold"
            style={{ fontSize: 22, letterSpacing: -0.4, lineHeight: 1.1, color: 'var(--text-primary)' }}
          >
            {t(card.name)}
          </span>
          <DatePill date={card.date} />
          <LivePill href={card.liveUrl} onShowcase={onShowcase} />
        </div>
        <DetailsButton slug={card.slug} name={card.name} />
      </div>
    </motion.div>
  )
}

function FeaturedCard({ card, onShowcase }: { card: ProjectCard; onShowcase?: () => void }) {
  const { t } = useLang()
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className="flex flex-col overflow-hidden"
      style={{
        borderRadius: 16,
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--card-shadow)',
        height: '100%',
      }}
    >
      <div className="aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:h-[460px]" style={{ width: '100%', position: 'relative', overflow: 'hidden', borderRadius: 10 }}>
        <Image
          src={card.image}
          alt={card.name}
          fill
          sizes="(max-width: 1023px) 100vw, 780px"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div
        className="flex items-end justify-between gap-3 p-5 md:p-6 lg:gap-0 lg:p-7"
        style={{ flex: 1 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
          <span
            className="font-body"
            style={{ fontSize: 12, color: 'var(--text-tertiary)' }}
          >
            {t(card.category)}
          </span>
          <span
            className="font-display font-bold"
            style={{ fontSize: 'clamp(26px, 5.5vw, 38px)', letterSpacing: 'clamp(-1.2px, -0.12vw, -0.6px)', lineHeight: 1.1, color: 'var(--text-primary)' }}
          >
            {t(card.name)}
          </span>
          <DatePill date={card.date} />
          <LivePill href={card.liveUrl} onShowcase={onShowcase} />
        </div>
        <DetailsButton slug={card.slug} name={card.name} />
      </div>
    </motion.div>
  )
}

export default function Work() {
  const featuredRef = useRef<HTMLDivElement>(null)
  const featuredVisible = useInView(featuredRef, { once: true, margin: '-40px' })
  const { t } = useLang()
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  const openProject = openSlug ? getProjectBySlug(openSlug) : undefined

  /** Only projects with captured screenshots open in-site; the rest keep the external link. */
  const showcaseHandler = (slug: string) =>
    getProjectBySlug(slug)?.showcase ? () => setOpenSlug(slug) : undefined

  return (
    <section
      style={{ background: 'var(--bg)', padding: 'clamp(56px, 10vw, 96px) 0 clamp(64px, 11vw, 110px)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Section glow */}
      <div
        style={{
          position: 'absolute',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)',
          width: 1280,
          height: 960,
          left: 80,
          top: 200,
          pointerEvents: 'none',
          filter: 'blur(140px)',
        }}
      />

      <div className="px-5 md:px-8 lg:px-0" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-0"
          style={{ marginBottom: 28 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span
              className="font-mono"
              style={{ fontSize: 11, letterSpacing: 3, color: 'var(--text-tertiary)' }}
            >
              {t('SELECTED WORK')}
            </span>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(28px, 6vw, 52px)', letterSpacing: 'clamp(-2.2px, -0.22vw, -1.1px)', lineHeight: 1.08, color: 'var(--text-primary)' }}
            >
              {t('Work that speaks for itself.')}
            </h2>
            <p
              className="font-body"
              style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: 520 }}
            >
              {t('A collection of products, platforms, and digital systems built with clarity, speed, and precision.')}
            </p>
          </div>
          <Link
            href="/portfolio"
            className="flex items-center justify-center w-full min-h-[44px] py-3 lg:w-auto lg:justify-start lg:min-h-0 lg:py-[11px] font-body"
            style={{
              gap: 10,
              paddingInline: 22,
              borderRadius: 8,
              background: 'var(--btn-secondary-bg)',
              border: '1px solid var(--border)',
              color: 'var(--pill-text)',
              fontSize: 13,
              textDecoration: 'none',
            }}
          >
            {t('All projects')} <ArrowUpRight style={{ width: 15, height: 15 }} />
          </Link>
        </motion.div>

        {/* Featured row */}
        <div
          ref={featuredRef}
          className="flex flex-col lg:flex-row lg:items-stretch"
          style={{ gap: 20 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={featuredVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:flex-1"
          >
            <FeaturedCard card={FEATURED} onShowcase={showcaseHandler(FEATURED.slug)} />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col w-full lg:w-[400px]" style={{ gap: 20 }}>
            {SIDE_CARDS.map((card, i) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 40 }}
                animate={featuredVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: (i + 1) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ flex: 1 }}
              >
                <Card card={card} imgClassName="aspect-[16/10] lg:aspect-auto lg:h-[200px]" onShowcase={showcaseHandler(card.slug)} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grid row — 2-up on tablet, the last card spanning the full row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex" style={{ gap: 20 }}>
          {GRID_CARDS.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={i === 2 ? 'md:col-span-2' : undefined}
              style={{ flex: 1 }}
            >
              <Card
                card={card}
                imgClassName={i === 2
                  ? 'aspect-[16/10] md:aspect-[2/1] lg:aspect-auto lg:h-[240px]'
                  : 'aspect-[16/10] lg:aspect-auto lg:h-[240px]'}
                onShowcase={showcaseHandler(card.slug)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {openProject?.showcase && (
        <ProjectShowcase
          name={openProject.name}
          showcase={openProject.showcase}
          liveUrl={openProject.liveUrl}
          onClose={() => setOpenSlug(null)}
        />
      )}
    </section>
  )
}
