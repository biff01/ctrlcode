'use client'

import { useState } from 'react'
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
// ERP and AI Solutions have no such project yet, so their cards fall back to the
// portfolio index.

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

function ServiceCard({ image, category, title, date, slug }: {
  image: string
  category: string
  title: string
  date: string
  slug?: string
}) {
  const { t } = useLang()
  return (
    <Link
      href={slug ? `/portfolio/${slug}` : '/portfolio'}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 16,
        overflow: 'hidden',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: 'var(--card-shadow)',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div
        style={{
          height: 240,
          borderRadius: 10,
          backgroundImage: `url('${image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexShrink: 0,
        }}
      />

      {/* Card Body */}
      <div
        style={{
          padding: 28,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 16,
          flex: 1,
        }}
      >
        {/* Card Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="font-body" style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
            {t(category)}
          </span>
          <span
            className="font-display"
            style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4, lineHeight: 1.1, color: 'var(--text-primary)' }}
          >
            {t(title)}
          </span>
          <div
            style={{
              display: 'inline-flex',
              padding: '6px 14px',
              background: 'var(--pill-bg)',
              border: '1px solid var(--pill-border)',
              borderRadius: 40,
            }}
          >
            <span className="font-body" style={{ fontSize: 12, color: 'var(--pill-text)' }}>{date}</span>
          </div>
        </div>

        {/* Arrow Button */}
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: 14,
            background: 'var(--pill-bg)',
            border: '1px solid var(--card-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <ArrowUpRight style={{ width: 24, height: 24, color: 'var(--text-primary)' }} />
        </div>
      </div>
    </Link>
  )
}

function AccordionRow({ item, open, onToggle }: {
  item: AccordionItem
  open: boolean
  onToggle: () => void
}) {
  const { t } = useLang()
  return (
    <div>
      <div style={{ height: 1, background: 'var(--accordion-line)' }} />
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '18px 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span className="font-body" style={{ fontSize: 16, color: 'var(--text-primary)' }}>{t(item.label)}</span>
        <ChevronDown
          style={{
            width: 18,
            height: 18,
            color: open ? 'var(--text-primary)' : 'var(--text-tertiary)',
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.28s cubic-bezier(0.22,1,0.36,1), color 0.2s ease',
          }}
        />
      </button>
      {/* Animate the measured height rather than a fixed max-height: the detail
          copy wraps differently per language, and a guessed cap either clips it
          or leaves the transition idling before it snaps shut. */}
      <motion.div
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
          style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0, maxWidth: 540, paddingBottom: 20 }}
        >
          {t(item.detail)}
        </p>
      </motion.div>
    </div>
  )
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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Num + Price Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span className="font-mono" style={{ fontSize: 13, color: '#4E6A99', letterSpacing: 2 }}>
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
          <span className="font-mono" style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{price}</span>
        </div>
      </div>

      {/* Title */}
      <h2
        className="font-display"
        style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1.5, color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}
      >
        {t(title)}
      </h2>

      {/* Desc */}
      <p className="font-body" style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0 }}>
        {t(desc)}
      </p>

      {/* Accordion — opt out of scroll anchoring so the browser doesn't correct
          scroll position on every frame of the height animation. */}
      <div style={{ paddingTop: 20, overflowAnchor: 'none' }}>
        {accordion.map((item, i) => (
          <AccordionRow
            key={item.label}
            item={item}
            open={openIndex === i}
            onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
          />
        ))}
        <div style={{ height: 1, background: 'var(--accordion-line)' }} />
      </div>
    </div>
  )
}

export default function ServiceBlocks() {
  return (
    <section style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 96px' }}>
      {/* Top border */}
      <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: 0 }} />

      {SERVICES.map((svc) => (
        <div key={svc.num}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 72, padding: '72px 0' }}>
            {svc.cardLeft ? (
              <>
                <ServiceCard
                  image={svc.image}
                  category={svc.cardCategory}
                  title={svc.cardTitle}
                  date={svc.cardDate}
                  slug={svc.cardSlug}
                />
                <ServiceText
                  num={svc.num}
                  price={svc.price}
                  title={svc.title}
                  desc={svc.desc}
                  accordion={svc.accordion}
                />
              </>
            ) : (
              <>
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
                />
              </>
            )}
          </div>
          {/* Divider between blocks */}
          <div style={{ height: 1, background: 'var(--border-subtle)' }} />
        </div>
      ))}
      </div>
    </section>
  )
}
