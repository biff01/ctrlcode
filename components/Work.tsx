'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from './LanguageProvider'

/* ---------- identical constants to PortfolioDesign ---------- */

const OVERLAY = 'linear-gradient(180deg, transparent 0%, transparent 32%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.58) 68%, rgba(0,0,0,0.84) 84%, rgba(0,0,0,0.96) 100%)'
const CARD_TITLE = '#FFFFFF'
const CARD_NUM = 'var(--card-num-color)'

const SMOOTH = [0.16, 1, 0.3, 1] as const

const cardVariants = {
  rest: { y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.08)' },
  hover: { y: -4, boxShadow: '0 4px 16px rgba(0,0,0,0.18), 0 12px 40px rgba(0,0,0,0.14)', transition: { duration: 0.5, ease: SMOOTH } },
  tap: { scale: 0.97, transition: { duration: 0.15 } },
}

const arrowVariants = {
  rest: { x: 0, y: 0, background: '#FFFFFF0A' },
  hover: { x: 1, y: -1, background: '#FFFFFF18', transition: { duration: 0.4, ease: SMOOTH } },
}

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400`

const SHOT = (slug: string) => `/showcase/${slug}-desktop.webp`

interface Project {
  name: string
  category: string
  num: string
  image: string
  bgPosition?: string
  slug: string
}

/* Same 6 projects as the Portfolio page — single source of truth */
const PROJECTS: Project[] = [
  { name: 'Nano Medical',       category: 'Healthcare',  num: '01', image: IMG('photo-1738778578755-87e3caccd36d'),  slug: 'healthcare-website' },
  { name: 'UZAUTO Motors',      category: 'Automotive',  num: '02', image: SHOT('real-estate-platform'), bgPosition: 'top center', slug: 'real-estate-platform' },
  { name: 'Darsly',             category: 'E-Learning',  num: '03', image: SHOT('darsly'),              bgPosition: 'top center', slug: 'darsly' },
  { name: 'Education Platform', category: 'E-Commerce',  num: '04', image: SHOT('education-platform'),  bgPosition: 'top center', slug: 'education-platform' },
  { name: 'SOFTMS',             category: 'CRM',         num: '05', image: SHOT('logistics-management'), bgPosition: 'top center', slug: 'logistics-management' },
  { name: 'Sello Brand',        category: 'Branding',    num: '06', image: IMG('photo-1718670013988-c6e3edb92345'), slug: 'brand-identity' },
]

/* ---------- identical ProjectCard to PortfolioDesign ---------- */

function ProjectCard({
  project,
  heightClass,
  pad,
  titleSize,
  titleLs,
  numSize,
}: {
  project: Project
  heightClass: string
  pad: number | string
  titleSize: number | string
  titleLs: number | string
  numSize: number
}) {
  const { t } = useLang()
  return (
    <Link href={`/portfolio/${project.slug}`} style={{ display: 'block', textDecoration: 'none' }} aria-label={project.name}>
      <motion.div
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        className={heightClass}
        style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}
      >
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover', objectPosition: project.bgPosition ?? 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: OVERLAY, zIndex: 0 }} />

        {/* Category chip — glassmorphism only here */}
        <div style={{ position: 'absolute', left: pad, top: pad, padding: '8px 16px', borderRadius: 100, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', zIndex: 1 }}>
          <span className="font-body" style={{ fontSize: 14, color: CARD_TITLE }}>{t(project.category)}</span>
        </div>

        <motion.div
          variants={arrowVariants}
          className="flex items-center justify-center"
          style={{ position: 'absolute', right: pad, top: pad, width: 48, height: 48, borderRadius: 10, border: '1px solid #FFFFFF22', zIndex: 2 }}
        >
          <ArrowUpRight aria-hidden={true} style={{ width: 16, height: 16, color: '#FFFFFF' }} />
        </motion.div>

        <div style={{ position: 'absolute', left: pad, bottom: pad, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 3 }}>
          <span className="font-mono" style={{ fontSize: numSize, color: CARD_NUM, letterSpacing: 2 }}>{project.num}</span>
          <span className="font-display font-bold" style={{ fontSize: titleSize, letterSpacing: titleLs, color: CARD_TITLE, lineHeight: 1.05 }}>
            {t(project.name)}
          </span>
        </div>
      </motion.div>
    </Link>
  )
}

/* ---------- Work section ---------- */

export default function Work() {
  const { t } = useLang()

  return (
    <section
      style={{
        background: 'var(--bg)',
        padding: 'clamp(56px, 10vw, 96px) 0 clamp(64px, 11vw, 110px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          background: 'radial-gradient(ellipse, var(--glow-radial, rgba(255,255,255,0.04)) 0%, transparent 70%)',
          width: 1280, height: 960, left: 80, top: 200,
          pointerEvents: 'none',
          filter: 'blur(140px)',
        }}
      />

      <div
        className="px-5 md:px-8 lg:px-0"
        style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 4vw, 24px)' }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-0"
          style={{ marginBottom: 8 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className="font-mono" style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text-tertiary)' }}>
              {t('SELECTED WORK')}
            </span>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(28px, 6vw, 52px)', letterSpacing: 'clamp(-2.2px, -0.22vw, -1.1px)', lineHeight: 1.08, color: 'var(--text-primary)' }}
            >
              {t('Work that speaks for itself.')}
            </h2>
            <p className="font-body" style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: 520 }}>
              {t('A collection of products, platforms, and digital systems built with clarity, speed, and precision.')}
            </p>
          </div>
          <Link
            href="/portfolio"
            className="group flex items-center justify-center w-full min-h-[44px] lg:w-auto lg:min-h-0 font-body btn-fade press focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kicker)]"
            style={{ gap: 10, padding: '12px 22px', borderRadius: 8, background: 'var(--btn-secondary-bg)', border: '1px solid var(--border)', color: 'var(--pill-text)', fontSize: 13, textDecoration: 'none' }}
          >
            {t('All projects')}
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight aria-hidden={true} style={{ width: 15, height: 15 }} />
            </span>
          </Link>
        </motion.div>

        {/* Row 1 — featured (PROJECTS[0]) */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProjectCard
            project={PROJECTS[0]}
            heightClass="aspect-[4/3] md:aspect-auto md:h-[420px] lg:h-[460px]"
            pad="clamp(16px, 3vw, 24px)"
            titleSize="clamp(28px, 7vw, 44px)"
            titleLs="clamp(-1.5px, -0.25vw, -0.75px)"
            numSize={12}
          />
        </motion.div>

        {/* Row 2 — two columns (PROJECTS[1], [2]) */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
          {[PROJECTS[1], PROJECTS[2]].map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard
                project={p}
                heightClass="aspect-[4/3] md:aspect-auto md:h-[320px] lg:h-[340px]"
                pad="clamp(14px, 2.6vw, 20px)"
                titleSize="clamp(24px, 6vw, 34px)"
                titleLs="clamp(-1px, -0.18vw, -0.5px)"
                numSize={12}
              />
            </motion.div>
          ))}
        </div>

        {/* Row 3 — three columns (PROJECTS[3], [4], [5]) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 16 }}>
          {[PROJECTS[3], PROJECTS[4], PROJECTS[5]].map((p, i) => (
            <motion.div
              key={p.name}
              className={i === 2 ? 'md:max-lg:col-span-2' : undefined}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard
                project={p}
                heightClass="aspect-[4/3] md:aspect-auto md:h-[300px]"
                pad={16}
                titleSize="clamp(20px, 5vw, 22px)"
                titleLs="clamp(-0.5px, -0.1vw, -0.25px)"
                numSize={11}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
