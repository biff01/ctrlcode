'use client'

import { useState, useRef, useEffect, useMemo, CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { useLang } from './LanguageProvider'
import { useTheme } from './ThemeProvider'
import { BlurIn } from './ui/blur-in'

/* ------------------------------------------------------------------ *
 * Rebuilt from the Pencil "Work Page" design (node EKef0).
 * Theme-aware (light/dark via CSS vars) and fully translated (uz/ru/en).
 * ------------------------------------------------------------------ */

const BG = 'var(--bg)'
const TEXT = 'var(--text-primary)'
const SUB = 'var(--text-secondary)'
const KICKER = 'var(--text-tertiary)'
const LINE = 'var(--border)'
const CHIP_BG = 'var(--btn-secondary-bg)'
const CHIP_BORDER = 'var(--border)'
const ACTIVE_BG = 'var(--nav-active-bg)'
const ACTIVE_TEXT = 'var(--nav-active-color)'

const GLASS_MASK = 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 42%, rgba(0,0,0,1) 100%)'
const OVERLAY = 'linear-gradient(180deg, transparent 0%, transparent 32%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.58) 68%, rgba(0,0,0,0.84) 84%, rgba(0,0,0,0.96) 100%)'
const CARD_TITLE = '#FFFFFF'
const CARD_NUM = 'var(--card-num-color)'

const FILTERS = ['All', 'Websites', 'CRM Systems', 'Dashboards', 'Mobile Apps', 'Automation', 'E-commerce']

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
  tags: string[]
}

interface Step {
  num: string
  title: string
  desc: string
  details: string[]
}

const PROJECTS: Project[] = [
  { name: 'Nano Medical', category: 'Healthcare', num: '01', image: IMG('photo-1738778578755-87e3caccd36d'), slug: 'healthcare-website', tags: ['Websites', 'Dashboards'] },
  { name: 'UZAUTO Motors', category: 'Automotive', num: '02', image: SHOT('real-estate-platform'), bgPosition: 'top center', slug: 'real-estate-platform', tags: ['Websites', 'E-commerce'] },
  { name: 'Darsly', category: 'E-Learning', num: '03', image: SHOT('darsly'), bgPosition: 'top center', slug: 'darsly', tags: ['Websites', 'Mobile Apps'] },
  { name: 'Education Platform', category: 'E-Commerce', num: '04', image: SHOT('education-platform'), bgPosition: 'top center', slug: 'education-platform', tags: ['Websites', 'E-commerce'] },
  { name: 'SOFTMS', category: 'CRM', num: '05', image: SHOT('logistics-management'), bgPosition: 'top center', slug: 'logistics-management', tags: ['CRM Systems', 'Dashboards'] },
  { name: 'Sello Brand', category: 'Branding', num: '06', image: IMG('photo-1718670013988-c6e3edb92345'), slug: 'brand-identity', tags: ['Websites'] },
]

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Research & Discovery',
    desc: 'Stakeholder interviews, competitive analysis, technical scoping, and goal alignment.',
    details: [
      '1:1 stakeholder interviews to extract real requirements, not assumptions',
      'Competitor landscape audit — UX patterns, feature gaps, positioning',
      'Technical feasibility review and stack recommendation',
      'Project scope document, timeline, and success metrics agreed upfront',
      'Risk identification and mitigation planning before a line of code is written',
    ],
  },
  {
    num: '02',
    title: 'UI/UX Design',
    desc: 'Wireframes, interactive prototypes, and pixel-perfect designs anchored in user behavior.',
    details: [
      'Low-fidelity wireframes iterated until information architecture is solid',
      'Interactive Figma prototype for user testing and stakeholder sign-off',
      'Design system — typography, colors, spacing, and component library',
      'Accessibility review baked in from the first frame (WCAG 2.1 AA)',
      'Handoff package with tokens, specs, and annotated screens for engineers',
    ],
  },
  {
    num: '03',
    title: 'Engineering',
    desc: 'Clean, scalable architecture. Agile sprints with regular demos and fast iteration cycles.',
    details: [
      'Two-week sprints with a working demo at the end of each cycle',
      'Modern stack: Next.js, TypeScript, REST/GraphQL APIs, cloud-native infra',
      'Code reviews on every PR — no cowboy commits to main',
      'Feature flags for safe rollouts without full redeployments',
      'Performance budget tracked from day one (Core Web Vitals targets set)',
    ],
  },
  {
    num: '04',
    title: 'QA & Testing',
    desc: 'End-to-end coverage: unit tests, integration, accessibility audits, performance benchmarks.',
    details: [
      'Unit and integration test suites covering critical business logic',
      'End-to-end browser tests (Playwright) for every primary user flow',
      'Load and stress testing to validate the system under real traffic',
      'Cross-browser and cross-device verification matrix',
      'Accessibility audit — screen readers, keyboard navigation, color contrast',
    ],
  },
  {
    num: '05',
    title: 'Launch',
    desc: 'Zero-downtime deployment, monitoring setup, SEO configuration, and stakeholder handoff.',
    details: [
      'Blue-green or canary deployment — zero downtime, instant rollback capability',
      'Monitoring and alerting configured before go-live (uptime, error rate, latency)',
      'SEO meta tags, sitemap, robots.txt, and structured data validated',
      'Analytics events verified end-to-end in production',
      'Full documentation and knowledge transfer to the client team',
    ],
  },
  {
    num: '06',
    title: 'Growth & Support',
    desc: 'Ongoing maintenance, feature evolution, and performance optimization post-launch.',
    details: [
      'Monthly performance reports — traffic, conversions, Core Web Vitals',
      'Proactive dependency updates and security patch cycles',
      'Feature backlog groomed and prioritized with the product team quarterly',
      '24/7 uptime monitoring with on-call escalation for critical incidents',
      'Data-driven iteration: A/B tests, heatmaps, and user feedback loops',
    ],
  },
]

const CTA_DARK_BG: CSSProperties = {
  background: '#000000',
  backgroundImage: 'linear-gradient(-90deg, var(--cta-dark-from) 0%, var(--cta-dark-to) 100%), radial-gradient(ellipse 75% 85% at 70% 55%, #454545db 0%, #040404db 5%)',
  backgroundRepeat: 'no-repeat, no-repeat',
  backgroundSize: '100% 100%, 100% 100%',
}
const CTA_LIGHT_BG: CSSProperties = { background: 'var(--cta-bg)' }

const MotionLink = motion(Link)

/* ---------------------------- Project card variants ---------------------- */

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

/* ---------------------------- Project card --------------------------- */

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
        style={{
          position: 'relative',
          borderRadius: 16,
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover', objectPosition: project.bgPosition ?? 'center' }}
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            maskImage: GLASS_MASK,
            WebkitMaskImage: GLASS_MASK,
            background: 'rgba(255,255,255,0.04)',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: OVERLAY, zIndex: 0 }} />

        <div style={{ position: 'absolute', left: pad, top: pad, padding: '8px 16px', borderRadius: 100, background: 'rgba(0,0,0,0.55)', zIndex: 1 }}>
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
            {project.name}
          </span>
        </div>
      </motion.div>
    </Link>
  )
}

/* ------------------------------ Header ------------------------------ */

function Header({ active, onChange }: { active: string; onChange: (f: string) => void }) {
  const { t } = useLang()
  return (
    <section style={{ background: BG, padding: 'clamp(56px, 9vw, 80px) 0 clamp(40px, 7vw, 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 1200, maxWidth: '100%', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'clamp(24px, 4vw, 40px)', flexWrap: 'wrap' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0, maxWidth: '100%' }}
          >
            <span className="font-mono" style={{ fontSize: 11, color: KICKER, letterSpacing: 1.5 }}>{t('SELECTED WORK')}</span>
            <BlurIn className="font-display font-bold" style={{ fontSize: 'clamp(32px, 8vw, 72px)', lineHeight: 'clamp(34px, 8.4vw, 75px)', letterSpacing: 'clamp(-1.5px, -0.3vw, -1px)', color: TEXT, overflowWrap: 'break-word', wordBreak: 'break-word' }} duration={0.9}>
              {t('Work that speaks')}<br />{t('for itself.')}
            </BlurIn>
            <p className="font-body" style={{ fontSize: 15, lineHeight: 1.6, color: SUB, width: 520, maxWidth: '100%' }}>
              {t('A collection of products, platforms, and digital systems built with clarity, speed, and purpose.')}
            </p>
          </motion.div>

          <MotionLink
            href="/portfolio"
            className="flex items-center max-lg:min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--text-primary)] rounded-lg"
            whileHover="hovered"
            whileTap={{ scale: 0.97 }}
            style={{ gap: 10, padding: '11px 22px', borderRadius: 8, background: CHIP_BG, border: `1px solid ${CHIP_BORDER}`, textDecoration: 'none' }}
          >
            <span className="font-body" style={{ fontSize: 13, color: SUB }}>{t('All projects')}</span>
            <motion.span
              variants={{ hovered: { x: 2, y: -2 } }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArrowUpRight aria-hidden={true} style={{ width: 15, height: 15, color: SUB }} />
            </motion.span>
          </MotionLink>
        </div>

        <div
          className="no-scrollbar flex flex-nowrap overflow-x-auto max-md:-mx-6 max-md:px-6 md:flex-wrap md:overflow-x-visible"
          style={{ gap: 8, paddingTop: 32 }}
        >
          {FILTERS.map((f) => {
            const on = active === f
            return (
              <motion.button
                key={f}
                type="button"
                onClick={() => onChange(f)}
                className="font-body max-lg:min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--text-primary)]"
                animate={{
                  background: on ? ACTIVE_BG : CHIP_BG,
                  color: on ? ACTIVE_TEXT : SUB,
                  fontWeight: on ? 600 : 400,
                }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  padding: '8px 16px',
                  borderRadius: 100,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  fontSize: 13,
                  border: on ? `1px solid ${ACTIVE_BG}` : `1px solid ${CHIP_BORDER}`,
                  cursor: 'pointer',
                }}
                whileHover={on ? undefined : { opacity: 0.8 }}
                whileTap={{ scale: 0.97 }}
              >
                {t(f)}
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------- Grid ------------------------------- */

function Grid({ active, onReset }: { active: string; onReset: () => void }) {
  const { t } = useLang()
  const isAll = active === 'All'
  const filtered = useMemo(
    () => (isAll ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active))),
    [active, isAll]
  )

  return (
    <section style={{ background: BG, padding: '0 0 clamp(56px, 8vw, 80px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 1200, maxWidth: '100%', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 4vw, 40px)' }}>
        {isAll ? (
          <>
            <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <ProjectCard
                project={PROJECTS[0]}
                heightClass="aspect-[4/3] md:aspect-auto md:h-[420px] lg:h-[460px]"
                pad="clamp(16px, 3vw, 24px)"
                titleSize="clamp(28px, 7vw, 44px)"
                titleLs="clamp(-1.5px, -0.25vw, -0.75px)"
                numSize={12}
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
              {[PROJECTS[1], PROJECTS[2]].map((p, i) => (
                <motion.div key={p.name} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 16 }}>
              {[PROJECTS[3], PROJECTS[4], PROJECTS[5]].map((p, i) => (
                <motion.div key={p.name} className={i === 2 ? 'md:max-lg:col-span-2' : undefined} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
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
          </>
        ) : filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {filtered.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}>
                <ProjectCard
                  project={p}
                  heightClass="aspect-[4/3] md:aspect-auto md:h-[320px] lg:h-[340px]"
                  pad="clamp(14px, 2.6vw, 20px)"
                  titleSize="clamp(24px, 6vw, 30px)"
                  titleLs="clamp(-1px, -0.18vw, -0.5px)"
                  numSize={12}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" stroke={KICKER} strokeWidth="1.5" strokeDasharray="4 3" />
              <path d="M14 20h12M20 14v12" stroke={KICKER} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="font-body" style={{ fontSize: 15, color: SUB }}>{t('No projects in this category yet.')}</p>
            <button
              type="button"
              onClick={onReset}
              className="font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--text-primary)]"
              style={{ padding: '9px 20px', borderRadius: 8, background: CHIP_BG, border: `1px solid ${CHIP_BORDER}`, fontSize: 13, color: SUB, cursor: 'pointer' }}
            >
              {t('Browse all projects')}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

/* ----------------------------- Process ------------------------------ */

const Divider = () => <div style={{ width: '100%', height: 1, background: LINE }} />

function ProcessStep({ s, isOpen, onToggle }: { s: Step; isOpen: boolean; onToggle: () => void }) {
  const { t } = useLang()
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`process-panel-${s.num}`}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--text-primary)] rounded-sm"
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
      >
        <div
          className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 lg:flex lg:justify-between lg:gap-8"
          style={{ padding: 'clamp(20px, 3.5vw, 28px) 0' }}
        >
          <span className="font-mono" style={{ fontSize: 13, color: KICKER, letterSpacing: 2, width: 40, flexShrink: 0 }}>{s.num}</span>
          <span className="font-display font-bold lg:min-w-[200px] lg:max-w-[280px]" style={{ fontSize: 'clamp(22px, 4.5vw, 28px)', letterSpacing: -0.5, color: TEXT }}>{t(s.title)}</span>
          <p className="font-body col-span-2 lg:min-w-0 lg:flex-1" style={{ fontSize: 15, lineHeight: 1.64, color: SUB }}>{t(s.desc)}</p>
          <motion.div
            animate={{
              rotate: isOpen ? 90 : 0,
              background: isOpen ? TEXT : CHIP_BG,
              borderColor: isOpen ? TEXT : CHIP_BORDER,
            }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
            style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 10, border: '1px solid' }}
          >
            <motion.span animate={{ color: isOpen ? BG : KICKER }} transition={{ duration: 0.25 }}>
              <ArrowRight aria-hidden={true} style={{ width: 16, height: 16 }} />
            </motion.span>
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`process-panel-${s.num}`}
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="lg:ml-[calc(40px+1rem)]"
              style={{
                display: 'flex', flexDirection: 'column', gap: 10,
                padding: 'clamp(16px, 3vw, 24px)',
                marginBottom: 'clamp(16px, 3vw, 24px)',
                borderRadius: 12,
                background: CHIP_BG,
                border: `1px solid ${CHIP_BORDER}`,
              }}
            >
              {s.details.map((bullet, i) => (
                <motion.div
                  key={bullet}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: KICKER, flexShrink: 0, marginTop: 8 }} />
                  <span className="font-body" style={{ fontSize: 14, lineHeight: 1.57, color: SUB }}>{t(bullet)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Divider />
    </div>
  )
}

function Process() {
  const { t } = useLang()
  const [openStep, setOpenStep] = useState<string | null>(null)

  return (
    <section style={{ background: 'var(--surface)', padding: 'clamp(64px, 10vw, 96px) 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 64 }}>
      <div style={{ width: 1200, maxWidth: '100%', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 56px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <span className="font-mono" style={{ fontSize: 11, color: KICKER, letterSpacing: 1.5 }}>{t('OUR PROCESS')}</span>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 6vw, 52px)', letterSpacing: 'clamp(-2px, -0.3vw, -1px)', color: TEXT, lineHeight: 1.05 }}>{t('How we build.')}</h2>
          <p className="font-body" style={{ fontSize: 15, lineHeight: 1.6, color: SUB, width: 460, maxWidth: '100%' }}>
            {t("Six deliberate stages — each one sharpening the product until it's ready to scale.")}
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Divider />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProcessStep
                s={s}
                isOpen={openStep === s.num}
                onToggle={() => setOpenStep(openStep === s.num ? null : s.num)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------- CTA -------------------------------- */

function CTA() {
  const { t } = useLang()
  const { theme } = useTheme()

  return (
    <section
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'clamp(80px, 12vw, 120px) 0 clamp(96px, 14vw, 140px)', ...(theme === 'light' ? CTA_LIGHT_BG : CTA_DARK_BG) }}
    >
      <div style={{ width: 1200, maxWidth: '100%', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(28px, 5vw, 40px)' }}>
        <motion.span
          className="font-mono"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 11, color: KICKER, letterSpacing: 1.5, textAlign: 'center' }}
        >
          {t('READY TO BUILD')}
        </motion.span>
        <motion.h2
          className="font-display font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(34px, 8vw, 64px)', lineHeight: 1, letterSpacing: 'clamp(-2.5px, -0.4vw, -1.2px)', color: TEXT, textAlign: 'center' }}
        >
          {t('Have a project in mind?')}
        </motion.h2>
        <motion.p
          className="font-body"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(15px, 4vw, 17px)', lineHeight: 'clamp(25px, 4.6vw, 28px)', color: SUB, width: 540, maxWidth: '100%', textAlign: 'center' }}
        >
          {t("Let's build a scalable digital product for your business.")}<br />
          {t('We move fast, we care deeply, and we ship.')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full max-w-[360px] flex-col md:w-auto md:max-w-none md:flex-row md:flex-wrap md:justify-center"
          style={{ gap: 16 }}
        >
          <MotionLink
            href="/contact"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.35, ease: SMOOTH }}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--text-primary)]"
            style={{ padding: '16px 32px', borderRadius: 8, background: 'var(--btn-primary-bg)', textDecoration: 'none', textAlign: 'center', display: 'block' }}
          >
            <span className="font-body" style={{ fontSize: 14, fontWeight: 600, color: 'var(--btn-primary-color)' }}>{t('Start a Project')}</span>
          </MotionLink>
          <MotionLink
            href="/contact"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.35, ease: SMOOTH }}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--text-primary)]"
            style={{ padding: '16px 32px', borderRadius: 8, background: CHIP_BG, border: `1px solid ${CHIP_BORDER}`, textDecoration: 'none', textAlign: 'center', display: 'block', transition: 'background 0.18s ease, border-color 0.18s ease' }}
          >
            <span className="font-body" style={{ fontSize: 14, fontWeight: 500, color: SUB }}>{t('Contact Us')}</span>
          </MotionLink>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center"
          style={{ gap: '8px 16px' }}
        >
          {[
            t('No commitment required'),
            t('Free 30-min strategy call'),
            t('Response within 24 hours'),
          ].map((label, i) => (
            <span key={i} className="font-body" style={{ fontSize: 14, color: SUB, display: 'flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: KICKER, display: 'inline-block' }} />}
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* --------------------------- Hero Row art --------------------------- */

const WAVES = [
  { d: 'M0 190c31-72 63-72 94 0 31 72 63 72 94 0 31-72 62-72 94 0 31 72 62 72 93 0', stroke: '#3838CC', w: 1.5, o: 0.88 },
  { d: 'M0 182c31-54 63-54 94 0 31 54 63 54 94 0 31-54 62-54 94 0 31 54 62 54 93 0', stroke: '#4848D8', w: 1.5, o: 0.72 },
  { d: 'M0 200c31-88 63-88 94 0 31 88 63 88 94 0 31-88 62-88 94 0 31 88 62 88 93 0', stroke: '#2C2CBB', w: 1.5, o: 0.55 },
  { d: 'M0 194c31-42 63-42 94 0 31 42 63 42 94 0 31-42 62-42 94 0 31 42 62 42 93 0', stroke: '#5555D5', w: 1, o: 0.45 },
  { d: 'M0 186c31-105 63-105 94 0 31 105 63 105 94 0 31-105 62-105 94 0 31 105 62 105 93 0', stroke: '#1E1EAA', w: 2, o: 0.3 },
]

const CONNECTORS = [
  'M280 310c40 0 40-70 80-70m-7-4l7 4-7 4',
  'M280 310c40 0 40 68 80 68m-7-4l7 4-7 4',
  'M280 384c40 0 40-2 80-2m-7-4l7 4-7 4',
  'M280 384c40 0 40 136 80 136m-7-4l7 4-7 4',
]

const ISSUES = [
  { code: 'ENG-2991', title: 'Ride status fails to update', top: 180, status: 'half' },
  { code: 'ENG-2843', title: 'App shows incorrect pickup location', top: 320, status: 'orange' },
  { code: 'FEA-2018', title: 'Improve explanations for tax feature', top: 460, status: 'empty' },
]

const WS_EASE = [0.22, 1, 0.36, 1] as const

function WorkHero({ dark, show }: { dark: boolean; show: boolean }) {
  return (
    <div style={{ position: 'relative', width: 720, height: 760, background: 'var(--hero-band-bg)', overflow: 'hidden', flexShrink: 0, transform: 'scale(min(1, calc(100vw / 720px)))', transformOrigin: 'top left' }}>
      <motion.div
        style={{ position: 'absolute', left: 185, top: 230, width: 350, height: 300, filter: 'blur(50px)', borderRadius: '50%', background: 'radial-gradient(ellipse 50% 50% at 50% 50%, #2828BC14 0%, #00000000 100%)' }}
        initial={{ opacity: 0 }}
        animate={show ? { opacity: [0.55, 1, 0.7, 1] } : { opacity: 0 }}
        transition={{ opacity: { duration: 9, times: [0, 0.2, 0.6, 1], repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' } }}
      />
      <div style={{ position: 'absolute', left: 50, top: 190, width: 620, height: 380 }}>
        <motion.div
          style={{ position: 'absolute', inset: 0, transformOrigin: '60px 190px' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={show ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 130, damping: 20, mass: 0.9, delay: 0.05 }}
        >
          <div style={{ position: 'absolute', left: -6, top: 124, width: 132, height: 132, borderRadius: '50%', border: '1px solid #FFFFFF0B' }} />
          <motion.div
            whileHover={{ scale: 1.06, boxShadow: '0 14px 56px rgba(0,0,0,0.6)', transition: { duration: 0.5, ease: SMOOTH } }}
            style={{ position: 'absolute', left: 0, top: 130, width: 120, height: 120, borderRadius: 60, background: '#0F0F1B', border: '1px solid #FFFFFF14', boxShadow: '0 10px 50px rgba(0,0,0,0.33)', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', left: 10, top: 10, width: 100, height: 100, borderRadius: '50%', background: '#0A0A15' }} />
            <motion.div
              style={{ position: 'absolute', left: 27, top: 27, width: 66, height: 66 }}
              animate={show ? { rotate: 360 } : {}}
              transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
              whileHover={{ scale: 1.14, transition: { duration: 0.5, ease: SMOOTH } }}
            >
              <svg viewBox="0 0 110 110" style={{ display: 'block', width: 66, height: 66, overflow: 'visible' }}>
                <path d="M55 0l8.4 34.7 30.5-18.6-18.6 30.5 34.7 8.4-34.7 8.4 18.6 30.5-30.5-18.6-8.4 34.7-8.4-34.7-30.5 18.6 18.6-30.5-34.7-8.4 34.7-8.4-18.6-30.5 30.5 18.6z" fill="#FFFFFF" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ position: 'absolute', left: 125, top: 0, width: 375, height: 380, transformOrigin: '50% 50%' }}
          animate={show ? { scaleY: [1, 1.06, 1] } : {}}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {WAVES.map((w, i) => (
            <svg key={w.stroke} viewBox="0 0 375 380" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, top: 0, width: 375, height: 380, opacity: w.o, overflow: 'visible' }}>
              <motion.path
                d={w.d} fill="none" stroke={w.stroke} strokeWidth={w.w} strokeLinecap="round" vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={show ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.5, delay: 0.3 + i * 0.12, ease: WS_EASE }}
              />
              {i < 4 && (
                <motion.path
                  d={w.d} fill="none" stroke={dark ? '#b4b4ff' : '#6a6aff'} strokeWidth={w.w + 1} strokeLinecap="round" vectorEffect="non-scaling-stroke"
                  strokeDasharray="22 3000"
                  initial={{ strokeDashoffset: 0, opacity: 0 }}
                  animate={show ? { strokeDashoffset: [0, -280, -560, -850], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
                  transition={{ duration: 2.4, times: [0, 0.1, 0.9, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4, delay: 1.7 + i * 0.55 }}
                />
              )}
            </svg>
          ))}
        </motion.div>

        <motion.div
          style={{ position: 'absolute', inset: 0, transformOrigin: '560px 190px' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={show ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 130, damping: 20, mass: 0.9, delay: 0.5 }}
        >
          <div style={{ position: 'absolute', left: 494, top: 124, width: 132, height: 132, borderRadius: '50%', border: '1px solid #FFFFFF0B' }} />
          <motion.div
            whileHover={{ scale: 1.06, filter: 'brightness(1.14)', boxShadow: '0 14px 56px rgba(0,0,0,0.6)', transition: { duration: 0.5, ease: SMOOTH } }}
            style={{ position: 'absolute', left: 500, top: 130, width: 120, height: 120, borderRadius: 60, background: '#0F0F1B', border: '1px solid #FFFFFF14', boxShadow: '0 10px 50px rgba(0,0,0,0.33)', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', left: 20, top: 20, width: 80, height: 80, borderRadius: 40, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(ellipse 50% 50% at 36% 30%, #E0E0E0 0%, #ABABAB 55%, #676767 100%)' }} />
              {[-12, 10, 32, 54, 76].map((l, i) => (
                <div key={i} style={{ position: 'absolute', left: l, top: -15, width: 12, height: 120, background: '#0F0F1B', transform: 'rotate(42deg)', transformOrigin: 'top left' }} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

function StatusDot({ kind }: { kind: string }) {
  if (kind === 'half') {
    return (
      <div style={{ position: 'relative', width: 22, height: 22, borderRadius: '50%', background: '#2E2E2E', overflow: 'hidden', flexShrink: 0 }}>
        <svg viewBox="0 0 22 22" style={{ position: 'absolute', left: 0, top: 0, width: 22, height: 22 }}>
          <path d="M11 0a11 11 0 0 1 0 22z" fill="var(--status-amber)" />
        </svg>
      </div>
    )
  }
  if (kind === 'orange') {
    return <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--status-orange)', flexShrink: 0 }} />
  }
  return <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'transparent', border: '2px solid #555555', flexShrink: 0 }} />
}

function WorkShowcase({ dark, show }: { dark: boolean; show: boolean }) {
  const { t } = useLang()
  const connectorStroke = dark ? '#3C3C3C' : '#C8D0E8'
  return (
    <div style={{ position: 'relative', width: 720, height: 760, background: 'var(--hero-band-bg)', overflow: 'hidden', flexShrink: 0 }}>
      {CONNECTORS.map((d, i) => (
        <svg key={i} viewBox="0 0 720 760" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, top: 0, width: 720, height: 760, overflow: 'visible', zIndex: 0 }}>
          <motion.path
            d={d} fill="none" stroke={connectorStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={show ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.7, delay: 1.1 + i * 0.11, ease: WS_EASE }}
          />
          <motion.path
            d={d} fill="none" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
            style={{ stroke: 'var(--accent-indigo)' }}
            strokeDasharray="11 3000"
            initial={{ strokeDashoffset: 0, opacity: 0 }}
            animate={show ? { strokeDashoffset: [0, -60, -130, -175], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
            transition={{ duration: 1.2, times: [0, 0.2, 0.8, 1], ease: WS_EASE, repeat: Infinity, repeatDelay: 2.0, delay: 2.0 + i * 0.16 }}
          />
        </svg>
      ))}

      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
        transition={{ duration: 0.7, delay: 0.85, ease: WS_EASE }}
        style={{ position: 'absolute', left: 40, top: 260, width: 240, display: 'flex', flexDirection: 'column', gap: 14, padding: 20, background: '#181818', border: '1px solid #2A2A2A', borderRadius: 18, zIndex: 1 }}
      >
        {[
          { label: 'New Issue', glyph: <path d="M2 2l16 0 0 3-11 10 11 0 0 3-16 0 0-3 11-10-11 0z" fill="#FFFFFF" /> },
          { label: 'Create Issue', glyph: <path d="M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z" fill="#FFFFFF" /> },
        ].map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, y: 8 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5, delay: 0.98 + i * 0.1, ease: WS_EASE }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#222222', borderRadius: 10 }}
          >
            <div style={{ position: 'relative', width: 36, height: 36, background: '#111111', borderRadius: 8, flexShrink: 0 }}>
              <svg viewBox="0 0 20 20" style={{ position: 'absolute', left: 8, top: 8, width: 20, height: 20 }}>{r.glyph}</svg>
            </div>
            <span className="font-body" style={{ fontSize: 15, color: '#FFFFFF', fontWeight: 500 }}>{t(r.label)}</span>
          </motion.div>
        ))}
      </motion.div>

      {ISSUES.map((it, i) => (
        <motion.div
          key={it.code}
          initial={{ opacity: 0, x: 26, scale: 0.97 }}
          animate={show ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 26, scale: 0.97 }}
          transition={{ duration: 0.65, delay: 1.3 + i * 0.15, ease: WS_EASE }}
          style={{ position: 'absolute', left: 360, top: it.top, width: 300, display: 'flex', flexDirection: 'column', gap: 10, padding: '16px 20px', background: '#181818', border: '1px solid #282828', borderRadius: 14, overflow: 'hidden', zIndex: 2 }}
        >
          <span className="font-mono" style={{ fontSize: 12, color: '#555555', letterSpacing: 0.5 }}>{it.code}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <motion.div
              style={{ display: 'flex', flexShrink: 0 }}
              animate={show ? { scale: [1, 1.3, 1], filter: ['drop-shadow(0 0 0 rgba(99,102,241,0))', 'drop-shadow(0 0 6px rgba(99,102,241,0.6))', 'drop-shadow(0 0 0 rgba(99,102,241,0))'] } : {}}
              transition={{ duration: 0.9, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.3, delay: 3.0 + i * 0.16 }}
            >
              <StatusDot kind={it.status} />
            </motion.div>
            <span className="font-body" style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', color: '#CCCCCC' }}>{t(it.title)}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function HeroRow() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
        setShow(true)
        window.removeEventListener('scroll', check)
        return true
      }
      return false
    }
    if (check()) return
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])
  return (
    <div ref={ref} style={{ width: '100%', background: 'var(--hero-band-bg)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflow: 'hidden' }}>
      <div style={{ width: '100%', maxWidth: 720, aspectRatio: '720 / 760', overflow: 'hidden', flexShrink: 0 }}>
        <WorkHero dark={dark} show={show} />
      </div>
      <div className="max-lg:hidden" style={{ flexShrink: 0 }}>
        <WorkShowcase dark={dark} show={show} />
      </div>
    </div>
  )
}

/* ------------------------------ Page -------------------------------- */

export default function PortfolioDesign() {
  const [active, setActive] = useState('All')
  return (
    <div style={{ background: BG }}>
      <Header active={active} onChange={setActive} />
      <Grid active={active} onReset={() => setActive('All')} />
      <HeroRow />
      <Process />
      <CTA />
    </div>
  )
}
