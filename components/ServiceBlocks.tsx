'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { useLang } from './LanguageProvider'

const EASE = [0.22, 1, 0.36, 1] as const

interface AccordionItem {
  label: string
  detail: string
}

// cardSlug names the project in lib/projects.ts that showcases the service. CRM &
// ERP and AI Solutions have no such project yet, so their cards render in a
// disabled state rather than linking to the portfolio index.

const SERVICES = [
  {
    num: '01',
    price: 'from $1,500',
    title: 'Web Development',
    desc: 'Corporate websites, e-commerce and complex web applications on modern stacks. Fast to load, easy to manage, built to convert.',
    accordion: [
      { label: 'Corporate websites & landing pages', detail: 'Conversion-focused sites with a CMS your team can update without a developer.' },
      { label: 'E-commerce with local payments', detail: 'Full storefronts wired to Payme, Click and Uzum, with inventory and order management.' },
      { label: 'Complex web applications', detail: 'Dashboards, portals and SaaS products built on React, Next.js and robust APIs.' },
      { label: 'Performance & SEO optimization', detail: 'Core Web Vitals, structured data and clean markup so you rank well and load fast.' },
    ] as AccordionItem[],
    image: 'https://images.unsplash.com/photo-1632045927895-d336d181e5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    cardCategory: 'WEB',
    cardTitle: 'Web Platform',
    cardDate: 'Jan 2025',
    cardSlug: 'darsly',
    cardLeft: true,
  },
  {
    num: '02',
    price: 'from $3,500',
    title: 'Mobile Apps',
    desc: 'Native-quality apps for iOS and Android from a single codebase — designed for retention and shipped to both stores.',
    accordion: [
      { label: 'Flutter & React Native', detail: 'One codebase, two native apps — faster to build and cheaper to maintain.' },
      { label: 'App Store / Play Market publishing', detail: 'We handle store setup, review guidelines and release management end to end.' },
      { label: 'Push, analytics & payments', detail: 'Engagement, event tracking and in-app purchases wired in from day one.' },
      { label: 'Offline-first architecture', detail: 'Local caching and sync so the app stays usable even with no connection.' },
    ] as AccordionItem[],
    image: 'https://images.unsplash.com/photo-1609409601885-e01c8ff48d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    cardCategory: 'MOBILE',
    cardTitle: 'Mobile App',
    cardDate: 'Mar 2025',
    cardSlug: 'mobile-application',
    cardLeft: false,
  },
  {
    num: '03',
    price: 'from $5,000',
    title: 'CRM & ERP Systems',
    desc: 'Custom internal systems that mirror how your business actually works — sales, warehouse, finance and telephony in one place.',
    accordion: [
      { label: 'Sales & lead management', detail: 'Pipelines, tasks and automations that mirror how your sales team actually sells.' },
      { label: 'Warehouse and finance modules', detail: 'Stock, invoicing and reporting unified inside one internal system.' },
      { label: 'Telephony & Telegram integrations', detail: 'Calls, messages and notifications connected to the records they belong to.' },
      { label: 'Role-based dashboards', detail: 'Each role sees exactly what it needs — nothing more, nothing less.' },
    ] as AccordionItem[],
    image: 'https://images.unsplash.com/photo-1678809768466-43d610e470b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    cardCategory: 'SYSTEMS',
    cardTitle: 'CRM System',
    cardDate: 'Feb 2025',
    cardSlug: undefined,
    cardLeft: true,
  },
  {
    num: '04',
    price: 'from $2,000',
    title: 'AI Solutions',
    desc: 'Practical AI that removes repetitive work: assistants, document automation and integrations with the models you already trust.',
    accordion: [
      { label: 'Custom chatbots & assistants', detail: 'Assistants trained on your data that handle support and internal questions.' },
      { label: 'Document & data automation', detail: 'Extract, classify and route documents without manual data entry.' },
      { label: 'Speech and vision integrations', detail: 'Transcription, OCR and image understanding built into your workflows.' },
      { label: 'LLM API integrations', detail: 'We connect the models you trust — Claude, OpenAI and others — securely.' },
    ] as AccordionItem[],
    image: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    cardCategory: 'AI',
    cardTitle: 'AI Platform',
    cardDate: 'Apr 2025',
    cardSlug: undefined,
    cardLeft: false,
  },
  {
    num: '05',
    price: 'from $800',
    title: 'Creative & Branding',
    desc: 'Identity, product design and motion that make your company look as good as it works.',
    accordion: [
      { label: 'Logo & brand identity', detail: 'A complete identity system: logo, colors, type and usage guidelines.' },
      { label: 'UI/UX design systems', detail: 'Reusable components and tokens that keep every screen consistent.' },
      { label: 'Motion & 3D visuals', detail: 'Animations and 3D that make your product feel alive and premium.' },
      { label: 'Marketing creatives', detail: 'Social, ad and campaign assets designed to convert, not just decorate.' },
    ] as AccordionItem[],
    image: 'https://images.unsplash.com/photo-1779189329505-36ad3cf838d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    cardCategory: 'DESIGN',
    cardTitle: 'Brand Design',
    cardDate: 'Jun 2025',
    cardSlug: 'brand-identity',
    cardLeft: true,
  },
]

function ServiceCard({ image, category, title, date, slug, priority = false }: {
  image: string
  category: string
  title: string
  date: string
  slug?: string
  priority?: boolean
}) {
  const { t } = useLang()
  const [hovered, setHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const innerStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    background: 'var(--card-bg)',
    border: '1px solid var(--card-border)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    textDecoration: 'none',
    cursor: slug ? 'pointer' : 'default',
  }

  const cardContent = (
    <>
      {/* Image */}
      <div
        style={{
          position: 'relative',
          height: 'clamp(160px, 30vw, 240px)',
          overflow: 'hidden',
          flexShrink: 0,
          background: 'var(--surface-2)',
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          style={{
            objectFit: 'cover',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: 'clamp(20px, 4vw, 32px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 16,
          flex: 1,
        }}
      >
        {/* Card Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span className="font-body" style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
            {t(category)}
          </span>
          <span
            className="font-display"
            style={{ fontSize: 'clamp(18px, 2.4vw, 22px)', fontWeight: 700, letterSpacing: -0.4, lineHeight: 1.1, color: 'var(--text-primary)' }}
          >
            {t(title)}
          </span>
          <div
            style={{
              display: 'inline-flex',
              padding: '6px 14px',
              background: 'var(--pill-bg)',
              border: '1px solid var(--pill-border)',
              borderRadius: 9999,
            }}
          >
            <span className="font-body" style={{ fontSize: 12, color: 'var(--pill-text)' }}>{t(date)}</span>
          </div>
        </div>

        {/* Arrow Button */}
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: 14,
            background: hovered ? 'var(--text-primary)' : 'var(--pill-bg)',
            border: '1px solid var(--card-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.22s ease, border-color 0.22s ease',
            opacity: slug ? 1 : 0.4,
          }}
        >
          <ArrowUpRight
            style={{
              width: 24,
              height: 24,
              color: hovered ? 'var(--bg)' : 'var(--text-primary)',
              transform: hovered ? 'rotate(45deg) translate(1px,-1px)' : 'none',
              transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1), color 0.22s ease',
            }}
          />
        </div>
      </div>
    </>
  )

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 2px 0 rgba(255,255,255,0.06), 0 12px 40px rgba(0,0,0,0.38)', transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      whileTap={{ scale: 0.98, transition: { duration: 0.12, ease: [0.22, 1, 0.36, 1] } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="max-md:w-full md:flex-1"
      style={{
        display: 'flex',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 2px 0 rgba(255,255,255,0), 0 12px 40px rgba(0,0,0,0)',
      }}
    >
      {slug ? (
        <Link href={`/portfolio/${slug}`} style={innerStyle}>
          {cardContent}
        </Link>
      ) : (
        <div style={innerStyle}>
          {cardContent}
        </div>
      )}
    </motion.div>
  )
}

function AccordionRow({ item, open, onToggle }: {
  item: AccordionItem
  open: boolean
  onToggle: () => void
}) {
  const { t } = useLang()
  const [btnHovered, setBtnHovered] = useState(false)
  const panelId = `accordion-${item.label.replace(/\s+/g, '-')}`
  const btnId = `btn-${item.label.replace(/\s+/g, '-')}`
  return (
    <div>
      <div style={{ height: 1, background: 'var(--accordion-line)' }} />
      <motion.button
        id={btnId}
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        whileHover={{ x: 2, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '16px 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          className="font-body"
          style={{
            fontSize: 16,
            color: open ? 'var(--text-primary)' : btnHovered ? 'var(--text-secondary)' : 'var(--text-primary)',
            transition: 'color 0.18s ease',
          }}
        >
          {t(item.label)}
        </span>
        <ChevronDown
          style={{
            width: 18,
            height: 18,
            color: open ? 'var(--text-primary)' : 'var(--text-tertiary)',
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'none',
            opacity: btnHovered && !open ? 0.6 : 1,
            transition: 'transform 0.28s cubic-bezier(0.22,1,0.36,1), color 0.2s ease, opacity 0.18s ease',
          }}
        />
      </motion.button>
      {/* Animate the measured height rather than a fixed max-height: the detail
          copy wraps differently per language, and a guessed cap either clips it
          or leaves the transition idling before it snaps shut. */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{
          height: { duration: 0.34, ease: EASE },
          opacity: { duration: open ? 0.24 : 0.16, ease: 'easeOut' },
        }}
        style={{ overflow: 'hidden' }}
      >
        <p
          className="font-body"
          style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0, maxWidth: 540, paddingBottom: 20 }}
        >
          {t(item.detail)}
        </p>
      </motion.div>
    </div>
  )
}

const FADE_UP = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
}

function ServiceText({ num, price, title, desc, accordion }: {
  num: string
  price: string
  title: string
  desc: string
  accordion: AccordionItem[]
}) {
  const { t } = useLang()
  // Only one row per service block is open; clicking the open row closes it.
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <motion.div
      className="max-md:w-full md:flex-1"
      variants={{ hidden: { opacity: 1 }, visible: { transition: { staggerChildren: 0.08 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {/* Num + Price Row */}
      <motion.div variants={FADE_UP} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span className="font-mono" style={{ fontSize: 13, color: 'var(--kicker)', letterSpacing: 2 }}>
          {num}
        </span>
        <div
          style={{
            display: 'inline-flex',
            padding: '4px 12px',
            background: 'var(--badge-bg)',
            border: '1px solid var(--badge-border)',
            borderRadius: 100,
          }}
        >
          <span className="font-mono" style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t(price)}</span>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div variants={FADE_UP}>
        <h2
          className="font-display"
          style={{ fontSize: 'clamp(30px, 7.5vw, 40px)', fontWeight: 700, letterSpacing: 'clamp(-1.5px, -0.15vw, -0.8px)', color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}
        >
          {t(title)}
        </h2>
      </motion.div>

      {/* Desc */}
      <motion.div variants={FADE_UP}>
        <p className="font-body" style={{ fontSize: 'clamp(14px, 1.3vw, 16px)', lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0 }}>
          {t(desc)}
        </p>
      </motion.div>

      {/* Accordion — opt out of scroll anchoring so the browser doesn't correct
          scroll position on every frame of the height animation. */}
      <motion.div variants={FADE_UP}>
        <div style={{ paddingTop: 20, overflowAnchor: 'none' }}>
          {accordion.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <AccordionRow
                item={item}
                open={openIndex === i}
                onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
              />
            </motion.div>
          ))}
          <div style={{ height: 1, background: 'var(--accordion-line)' }} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ServiceBlocks() {
  return (
    <section style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px clamp(64px, 10vw, 96px)' }}>
      {/* Top border */}
      <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: 0 }} />

      {SERVICES.map((svc, i) => (
        <motion.div
          key={svc.num}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Text always leads in the DOM so the stacked mobile layout reads
              copy first; md:flex-row-reverse restores the alternating desktop
              order for the cardLeft blocks. */}
          <div
            className={svc.cardLeft
              ? 'flex flex-col gap-10 md:flex-row-reverse md:items-center lg:gap-[72px]'
              : 'flex flex-col gap-10 md:flex-row md:items-center lg:gap-[72px]'}
            style={{ padding: 'clamp(48px, 8vw, 72px) 0' }}
          >
            <ServiceText
              num={svc.num}
              price={svc.price}
              title={svc.title}
              desc={svc.desc}
              accordion={svc.accordion}
            />
            <ServiceCard
              image={svc.image}
              category={svc.cardCategory}
              title={svc.cardTitle}
              date={svc.cardDate}
              slug={svc.cardSlug}
              priority={i === 0}
            />
          </div>
          {/* Divider between blocks */}
          <div style={{ height: 1, background: 'var(--border-subtle)' }} />
        </motion.div>
      ))}
      </div>
    </section>
  )
}
