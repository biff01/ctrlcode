'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from './LanguageProvider'

const SMOOTH = [0.16, 1, 0.3, 1] as const

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.5, ease: SMOOTH } },
  tap: { scale: 0.98, transition: { duration: 0.15 } },
}

const arrowVariants = {
  rest: { x: 0, y: 0 },
  hover: { x: 2, y: -2, transition: { duration: 0.4, ease: SMOOTH } },
}

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400`

const SHOT = (slug: string) => `/showcase/${slug}-desktop.webp`

interface Project {
  name: string
  category: string
  date: string
  image: string
  bgPosition?: string
  slug: string
}

const PROJECTS: Project[] = [
  { name: 'Nano Medical',       category: 'Healthcare',  date: 'Feb 2025', image: IMG('photo-1738778578755-87e3caccd36d'),   slug: 'healthcare-website'   },
  { name: 'UZAUTO Motors',      category: 'Automotive',  date: 'Jun 2024', image: SHOT('real-estate-platform'), bgPosition: 'top center', slug: 'real-estate-platform'  },
  { name: 'Darsly',             category: 'E-Learning',  date: 'Nov 2024', image: SHOT('darsly'),               bgPosition: 'top center', slug: 'darsly'               },
  { name: 'Education Platform', category: 'E-Commerce',  date: 'Sep 2024', image: SHOT('education-platform'),   bgPosition: 'top center', slug: 'education-platform'   },
  { name: 'SOFTMS',             category: 'CRM',         date: 'Mar 2024', image: SHOT('logistics-management'), bgPosition: 'top center', slug: 'logistics-management' },
  { name: 'Sello Brand',        category: 'Branding',    date: 'Dec 2024', image: IMG('photo-1718670013988-c6e3edb92345'), slug: 'brand-identity'       },
]

function ProjectCard({
  project,
  imageHeight,
  titleSize,
  titleLs,
}: {
  project: Project
  imageHeight: string
  titleSize: number | string
  titleLs: number | string
}) {
  const { t } = useLang()
  return (
    <Link href={`/portfolio/${project.slug}`} style={{ display: 'block', textDecoration: 'none', height: '100%' }} aria-label={project.name}>
      <motion.div
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--card-shadow)',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Image — clean, no overlay */}
        <div style={{ position: 'relative', height: imageHeight, overflow: 'hidden', flexShrink: 0 }}>
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover', objectPosition: project.bgPosition ?? 'center' }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
            <span className="font-body" style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
              {t(project.category)}
            </span>
            <span
              className="font-display font-bold"
              style={{ fontSize: titleSize, letterSpacing: titleLs, color: 'var(--text-primary)', lineHeight: 1.15 }}
            >
              {t(project.name)}
            </span>
            <span
              className="font-body"
              style={{
                display: 'inline-block',
                alignSelf: 'flex-start',
                padding: '5px 14px',
                borderRadius: 100,
                background: 'var(--surface)',
                fontSize: 13,
                color: 'var(--text-secondary)',
              }}
            >
              {project.date}
            </span>
          </div>

          <motion.div
            variants={arrowVariants}
            className="flex items-center justify-center"
            style={{
              width: 68,
              height: 68,
              borderRadius: 12,
              background: 'var(--btn-secondary-bg)',
              border: '1px solid var(--card-border)',
              flexShrink: 0,
            }}
          >
            <ArrowUpRight style={{ width: 24, height: 24, color: 'var(--text-primary)' }} />
          </motion.div>
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
        style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 56 }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-0"
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

        {/* Row 1: featured left (780fr) + right column (400fr) with 2 stacked cards */}
        <div className="flex flex-col lg:flex-row" style={{ gap: 20 }}>
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: 780 }}
          >
            <ProjectCard
              project={PROJECTS[0]}
              imageHeight="clamp(220px, 45vw, 460px)"
              titleSize="clamp(22px, 3.5vw, 32px)"
              titleLs="clamp(-1.5px, -0.2vw, -0.75px)"
            />
          </motion.div>

          {/* Right column — 2 stacked cards */}
          <div className="flex flex-col" style={{ flex: 400, gap: 20 }}>
            {[PROJECTS[1], PROJECTS[2]].map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 lg:flex-none"
              >
                <ProjectCard
                  project={p}
                  imageHeight="clamp(160px, 30vw, 200px)"
                  titleSize="clamp(16px, 2.5vw, 20px)"
                  titleLs="clamp(-0.5px, -0.1vw, -0.4px)"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Row 2: three equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 20 }}>
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
                imageHeight="clamp(160px, 28vw, 240px)"
                titleSize="clamp(16px, 2vw, 18px)"
                titleLs="clamp(-0.5px, -0.1vw, -0.25px)"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
