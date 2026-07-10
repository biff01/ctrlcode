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
      <button onClick={onShowcase} className="font-body" style={pillStyle}>
        {t('View Live Product')}
        <Maximize2 style={{ width: 12, height: 12 }} />
      </button>
    )
  }

  if (!href) return null

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-body" style={pillStyle}>
      {t('View Live Product')}
      <ExternalLink style={{ width: 12, height: 12 }} />
    </a>
  )
}

/** Opens the internal case-study page. */
function DetailsButton({ slug, name, size }: { slug: string; name: string; size: number }) {
  const { t } = useLang()
  return (
    <Link
      href={`/portfolio/${slug}`}
      aria-label={`${t('View case study')}: ${t(name)}`}
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: size,
        height: size,
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

function Card({ card, imgHeight, onShowcase }: { card: ProjectCard; imgHeight: number; onShowcase?: () => void }) {
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
      <div style={{ width: '100%', height: imgHeight, position: 'relative', overflow: 'hidden', borderRadius: 10 }}>
        <Image
          src={card.image}
          alt={card.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div
        className="flex items-end justify-between"
        style={{ padding: 28, flex: 1 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
        <DetailsButton slug={card.slug} name={card.name} size={68} />
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
      <div style={{ width: '100%', height: 460, position: 'relative', overflow: 'hidden', borderRadius: 10 }}>
        <Image
          src={card.image}
          alt={card.name}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div
        className="flex items-end justify-between"
        style={{ padding: 28, flex: 1 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span
            className="font-body"
            style={{ fontSize: 12, color: 'var(--text-tertiary)' }}
          >
            {t(card.category)}
          </span>
          <span
            className="font-display font-bold"
            style={{ fontSize: 38, letterSpacing: -1.2, lineHeight: 1.1, color: 'var(--text-primary)' }}
          >
            {t(card.name)}
          </span>
          <DatePill date={card.date} />
          <LivePill href={card.liveUrl} onShowcase={onShowcase} />
        </div>
        <DetailsButton slug={card.slug} name={card.name} size={68} />
      </div>
    </motion.div>
  )
}

export default function Work() {
  const featuredRef = useRef<HTMLDivElement>(null)
  const featuredVisible = useInView(featuredRef, { once: true, margin: '-80px' })
  const { t } = useLang()
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  const openProject = openSlug ? getProjectBySlug(openSlug) : undefined

  /** Only projects with captured screenshots open in-site; the rest keep the external link. */
  const showcaseHandler = (slug: string) =>
    getProjectBySlug(slug)?.showcase ? () => setOpenSlug(slug) : undefined

  return (
    <section
      style={{ background: 'var(--bg)', padding: '96px 0 110px', position: 'relative', overflow: 'hidden' }}
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

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}
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
              style={{ fontSize: 52, letterSpacing: -2.2, lineHeight: 1.08, color: 'var(--text-primary)' }}
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
            className="flex items-center font-body"
            style={{
              gap: 10,
              padding: '11px 22px',
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
          style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={featuredVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: 1 }}
          >
            <FeaturedCard card={FEATURED} onShowcase={showcaseHandler(FEATURED.slug)} />
          </motion.div>
          <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {SIDE_CARDS.map((card, i) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 40 }}
                animate={featuredVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: (i + 1) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ flex: 1 }}
              >
                <Card card={card} imgHeight={200} onShowcase={showcaseHandler(card.slug)} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grid row */}
        <div style={{ display: 'flex', gap: 20 }}>
          {GRID_CARDS.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ flex: 1 }}
            >
              <Card card={card} imgHeight={240} onShowcase={showcaseHandler(card.slug)} />
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
