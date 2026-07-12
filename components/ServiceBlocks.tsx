'use client'

import { useState, useEffect, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { useLang } from './LanguageProvider'

const EASE = [0.22, 1, 0.36, 1] as const
const BRAND_BLUE = '#3452CA'

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

// ─── ANIMATED SERVICE VISUALS ─────────────────────────────────────────────────

// Static data outside components to avoid recreation on every render

const WEB_SCHEMES = [
  { bg: '#0d2e2e', accent: '#2dd4bf', blockCol: '#a7f3d0' },
  { bg: '#060d21', accent: BRAND_BLUE, blockCol: '#93c5fd' },
  { bg: '#f5f4ff', accent: '#7c3aed', blockCol: '#7c3aed' },
] as const

const CRM_BARS = [65, 80, 50, 90, 70, 85]

const AI_PARTICLES = [
  { left: '14%', top: '18%', delay: 0 },
  { left: '76%', top: '14%', delay: 0.6 },
  { left: '84%', top: '62%', delay: 1.1 },
  { left: '18%', top: '72%', delay: 1.6 },
  { left: '50%', top: '84%', delay: 0.9 },
  { left: '62%', top: '34%', delay: 0.35 },
  { left: '32%', top: '46%', delay: 1.3 },
]

const AI_BUBBLES = ['Processing request…', 'Analyzing data…', 'Done — here is your result.']

const BRAND_LOGO_LABELS = ['Geometric', 'Initial Mark', 'Minimal']
const BRAND_LOGO_COLORS = [BRAND_BLUE, '#7c3aed', '#2dd4bf']

// 1. Web Platform — browser chrome cycling through 3 color schemes
function WebPlatformVisual() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % WEB_SCHEMES.length), 3000)
    return () => clearInterval(id)
  }, [])

  const s = WEB_SCHEMES[current]

  return (
    <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', flexDirection: 'column' }}>
      {/* Browser chrome */}
      <div style={{
        background: '#1c1c1c',
        padding: '7px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
        borderBottom: '1px solid #2a2a2a',
      }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {(['#FF5F57', '#FFBD2E', '#28C840'] as const).map(col => (
            <div key={col} style={{ width: 8, height: 8, borderRadius: '50%', background: col }} />
          ))}
        </div>
        <div style={{
          flex: 1,
          background: '#2a2a2a',
          borderRadius: 4,
          height: 16,
          display: 'flex',
          alignItems: 'center',
          padding: '0 6px',
          gap: 4,
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#555' }} />
          <div style={{ width: '50%', height: 3, background: '#444', borderRadius: 2 }} />
        </div>
      </div>

      {/* Site mockup area — crossfades between schemes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42 }}
          style={{ flex: 1, background: s.bg, padding: '10px 12px', overflow: 'hidden' }}
        >
          {/* Nav bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ width: 40, height: 8, background: s.accent, borderRadius: 3, opacity: 0.9 }} />
            <div style={{ display: 'flex', gap: 6 }}>
              {[30, 22, 22].map((w, i) => (
                <div key={i} style={{ width: w, height: 5, background: s.accent, borderRadius: 2, opacity: 0.35 }} />
              ))}
            </div>
          </div>

          {/* Hero headline blocks */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ width: '72%', height: 11, background: s.accent, borderRadius: 3, opacity: 0.85, marginBottom: 5 }} />
            <div style={{ width: '55%', height: 7, background: s.blockCol, borderRadius: 2, opacity: 0.4, marginBottom: 4 }} />
            <div style={{ width: '44%', height: 7, background: s.blockCol, borderRadius: 2, opacity: 0.28, marginBottom: 10 }} />
            {/* CTA pill */}
            <div style={{ width: 54, height: 14, background: s.accent, borderRadius: 5, opacity: 0.88 }} />
          </div>

          {/* Feature cards */}
          <div style={{ display: 'flex', gap: 6 }}>
            {[0.16, 0.24, 0.32].map((op, i) => (
              <div key={i} style={{ flex: 1, height: 30, background: s.accent, borderRadius: 4, opacity: op }} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// 2. Mobile Apps — phone silhouette with 2 app screen designs cycling
function MobileAppsVisual() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % 2), 3500)
    return () => clearInterval(id)
  }, [])

  const ringCircumference = 2 * Math.PI * 20

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Phone shell */}
      <div style={{
        width: 92,
        height: 164,
        border: '2px solid #2e2e2e',
        borderRadius: 18,
        overflow: 'hidden',
        background: '#111',
        position: 'relative',
        boxShadow: '0 10px 28px rgba(0,0,0,0.55)',
        flexShrink: 0,
      }}>
        {/* Dynamic island / notch */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 30,
          height: 7,
          background: '#0a0a0a',
          borderRadius: '0 0 5px 5px',
          zIndex: 3,
        }} />

        <AnimatePresence mode="wait">
          {current === 0 ? (
            // Fitness tracker UI
            <motion.div
              key="fitness"
              initial={{ x: 92, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -92, opacity: 0 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', height: '100%', background: '#08122a', padding: '12px 8px 8px' }}
            >
              {/* App label */}
              <div style={{ height: 6, width: '52%', background: BRAND_BLUE, borderRadius: 3, opacity: 0.5, marginBottom: 8 }} />

              {/* Progress ring */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                <svg width="52" height="52" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="20" fill="none" stroke="#0d1f40" strokeWidth="4" />
                  <g transform="rotate(-90 25 25)">
                    <motion.circle
                      cx="25" cy="25" r="20"
                      fill="none"
                      stroke={BRAND_BLUE}
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={ringCircumference}
                      initial={{ strokeDashoffset: ringCircumference }}
                      animate={{ strokeDashoffset: ringCircumference * 0.28 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </g>
                  <text x="25" y="29" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">72%</text>
                </svg>
              </div>

              {/* Stat chips */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                {[['2.4k', 'steps'], ['320', 'kcal']].map(([val, label]) => (
                  <div key={label} style={{ flex: 1, background: '#0d1f40', borderRadius: 5, padding: '4px 4px' }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: BRAND_BLUE, fontFamily: 'monospace' }}>{val}</div>
                    <div style={{ fontSize: 7, color: '#3a5a8a', fontFamily: 'monospace' }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Mini bar chart */}
              <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 22 }}>
                {[55, 75, 48, 88, 66, 82, 60].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.35 }}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      background: i === 5 ? BRAND_BLUE : '#1a3560',
                      borderRadius: '2px 2px 0 0',
                      transformOrigin: 'bottom',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            // E-commerce UI
            <motion.div
              key="ecommerce"
              initial={{ x: 92, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -92, opacity: 0 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', height: '100%', background: '#0c0c12', padding: '12px 8px 8px' }}
            >
              {/* Search bar */}
              <div style={{ height: 10, background: '#1c1c28', borderRadius: 5, marginBottom: 8 }} />

              {/* Product grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 7 }}>
                {[
                  { bg: '#160a2e', accent: '#7c3aed' },
                  { bg: '#0a1a0a', accent: '#22c55e' },
                  { bg: '#1a0a0c', accent: '#f43f5e' },
                  { bg: '#080d20', accent: BRAND_BLUE },
                ].map((card, i) => (
                  <div key={i} style={{ background: card.bg, borderRadius: 5, padding: '6px 5px', height: 38 }}>
                    <div style={{ height: 18, background: card.accent, borderRadius: 3, opacity: 0.28, marginBottom: 4 }} />
                    <div style={{ height: 4, background: card.accent, borderRadius: 2, opacity: 0.55, width: '68%' }} />
                  </div>
                ))}
              </div>

              {/* Checkout button */}
              <div style={{ height: 14, background: '#7c3aed', borderRadius: 5, opacity: 0.82 }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// 3. CRM & ERP — animated bar chart, metric cards, donut ring
function CRMDashboardVisual() {
  const circumference = 2 * Math.PI * 16

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#07101e',
      padding: '12px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      overflow: 'hidden',
    }}>
      {/* Metric cards row */}
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        {[
          { label: 'Revenue', value: '$124k', col: BRAND_BLUE },
          { label: 'Leads',   value: '847',   col: '#22c55e' },
          { label: 'Tasks',   value: '32',    col: '#f59e0b' },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.38 }}
            style={{
              flex: 1,
              background: '#0e1a2e',
              borderRadius: 5,
              padding: '5px 6px',
              border: `1px solid ${card.col}1a`,
            }}
          >
            <div style={{ fontSize: 8, color: '#3a4e6a', fontFamily: 'monospace', marginBottom: 2 }}>{card.label}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: card.col, fontFamily: 'monospace' }}>{card.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart row: bars left, donut right */}
      <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
        {/* Bar chart */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ fontSize: 8, color: '#253545', fontFamily: 'monospace', marginBottom: 4, flexShrink: 0 }}>
            Monthly Sales
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 4, minHeight: 0 }}>
            {CRM_BARS.map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18 + i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background: i === 3 ? BRAND_BLUE : '#152035',
                  borderRadius: '2px 2px 0 0',
                  transformOrigin: 'bottom',
                }}
              />
            ))}
          </div>
        </div>

        {/* Donut ring + legend */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, flexShrink: 0 }}>
          <div style={{ fontSize: 8, color: '#253545', fontFamily: 'monospace' }}>Quota</div>
          <svg width="46" height="46" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="16" fill="none" stroke="#0e1a2e" strokeWidth="4.5" />
            <g transform="rotate(-90 22 22)">
              <motion.circle
                cx="22" cy="22" r="16"
                fill="none"
                stroke={BRAND_BLUE}
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: circumference * 0.32 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              />
            </g>
            <text x="22" y="26" textAnchor="middle" fill="#e2e8f0" fontSize="7" fontWeight="bold">68%</text>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[['Won', BRAND_BLUE], ['Open', '#152035']].map(([label, col]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: col }} />
                <span style={{ fontSize: 7, color: '#3a4e6a', fontFamily: 'monospace' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 4. AI Solutions — floating neural-net particles, pulsing center node, cycling chat bubble
function AISolutionsVisual() {
  const [chatIndex, setChatIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setChatIndex(c => (c + 1) % AI_BUBBLES.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', background: '#05050e', position: 'relative', overflow: 'hidden' }}>
      {/* Connection lines */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {AI_PARTICLES.map((p, i) => (
          <line
            key={i}
            x1={p.left} y1={p.top}
            x2="50%" y2="50%"
            stroke={BRAND_BLUE}
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Floating particle dots */}
      {AI_PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: BRAND_BLUE,
            boxShadow: `0 0 8px ${BRAND_BLUE}aa`,
          }}
          animate={{
            y: [0, -12, 5, -7, 0],
            x: [0, 7, -5, 4, 0],
            opacity: [0.55, 1, 0.65, 0.9, 0.55],
          }}
          transition={{
            duration: 4.2 + i * 0.45,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Central AI node with ripple */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        {/* Ripple ring */}
        <motion.div
          animate={{ scale: [1, 2.0], opacity: [0.35, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: `1.5px solid ${BRAND_BLUE}`,
          }}
        />
        {/* Core node */}
        <motion.div
          animate={{ scale: [1, 1.16, 1], opacity: [0.82, 1, 0.82] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${BRAND_BLUE}cc 0%, ${BRAND_BLUE}33 100%)`,
            border: `1.5px solid ${BRAND_BLUE}`,
            boxShadow: `0 0 22px ${BRAND_BLUE}55`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff', opacity: 0.92 }} />
        </motion.div>
      </div>

      {/* Cycling chat bubble */}
      <div style={{
        position: 'absolute',
        bottom: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '78%',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={chatIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.28 }}
            style={{
              background: '#0c1225',
              border: `1px solid ${BRAND_BLUE}38`,
              borderRadius: 8,
              padding: '5px 8px',
              fontSize: 9,
              color: '#7a99cc',
              fontFamily: 'monospace',
              textAlign: 'center',
              letterSpacing: 0.2,
            }}
          >
            {AI_BUBBLES[chatIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// 5. Creative & Branding — 3 logo mark SVGs cycling with crossfade
function CreativeBrandingVisual() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % 3), 2500)
    return () => clearInterval(id)
  }, [])

  const logoMarks = [
    // Logo 1: Geometric hexagon mark
    <svg key="hex" width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="38,4 68,21 68,55 38,72 8,55 8,21"
        fill="none"
        stroke={BRAND_BLUE}
        strokeWidth="2"
      />
      <polygon
        points="38,17 56,27 56,49 38,59 20,49 20,27"
        fill={BRAND_BLUE}
        opacity="0.18"
        stroke={BRAND_BLUE}
        strokeWidth="1.5"
      />
      {[
        ['38,4', '38,17'],
        ['68,21', '56,27'],
        ['68,55', '56,49'],
        ['38,72', '38,59'],
        ['8,55', '20,49'],
        ['8,21', '20,27'],
      ].map(([p1, p2], i) => {
        const [x1, y1] = p1.split(',')
        const [x2, y2] = p2.split(',')
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={BRAND_BLUE}
            strokeWidth="1.5"
            opacity="0.45"
          />
        )
      })}
      <circle cx="38" cy="38" r="5" fill={BRAND_BLUE} opacity="0.7" />
    </svg>,

    // Logo 2: Abstract letter initial (stylized C in a circle)
    <svg key="initial" width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="38" cy="38" r="32" stroke={BRAND_BLUE} strokeWidth="2" />
      <circle cx="38" cy="38" r="24" stroke={BRAND_BLUE} strokeWidth="1" opacity="0.2" />
      <path
        d="M 51 24 A 18 18 0 1 0 51 52"
        stroke={BRAND_BLUE}
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="38" cy="38" r="4" fill={BRAND_BLUE} opacity="0.55" />
    </svg>,

    // Logo 3: Minimal icon mark — two offset rounded squares
    <svg key="icon" width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="12" width="36" height="36" rx="9" stroke={BRAND_BLUE} strokeWidth="2" />
      <rect x="28" y="28" width="36" height="36" rx="9" fill={BRAND_BLUE} opacity="0.22" stroke={BRAND_BLUE} strokeWidth="2" />
      <rect x="20" y="20" width="22" height="22" rx="5" fill={BRAND_BLUE} opacity="0.14" />
      <rect x="34" y="34" width="22" height="22" rx="5" fill={BRAND_BLUE} opacity="0.14" />
    </svg>,
  ]

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#060610',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    }}>
      {/* Logo carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          {logoMarks[current]}
          <span style={{
            fontSize: 9,
            color: BRAND_LOGO_COLORS[current],
            fontFamily: 'monospace',
            letterSpacing: '0.18em',
            opacity: 0.75,
            textTransform: 'uppercase',
          }}>
            {BRAND_LOGO_LABELS[current]}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 6 }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{
              width: i === current ? 18 : 6,
              background: i === current ? BRAND_BLUE : '#222232',
            }}
            transition={{ duration: 0.3 }}
            style={{ height: 5, borderRadius: 3 }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────

function ServiceCard({
  image,
  visual,
  category,
  title,
  date,
  slug,
  priority = false,
}: {
  image?: string
  visual?: ReactNode
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
      {/* Visual area — animated component or fallback image */}
      <div
        style={{
          position: 'relative',
          height: 'clamp(160px, 30vw, 240px)',
          overflow: 'hidden',
          flexShrink: 0,
          background: visual ? '#0f0f0f' : 'var(--surface-2)',
        }}
      >
        {visual ? (
          visual
        ) : image ? (
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
        ) : null}
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

// ─── ACCORDION ROW ────────────────────────────────────────────────────────────

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

// ─── SERVICE TEXT BLOCK ───────────────────────────────────────────────────────

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

// ─── ANIMATED VISUAL MAP ──────────────────────────────────────────────────────

// One visual per service, matched positionally to SERVICES array
const SERVICE_VISUALS: ReactNode[] = [
  <WebPlatformVisual key="web" />,
  <MobileAppsVisual key="mobile" />,
  <CRMDashboardVisual key="crm" />,
  <AISolutionsVisual key="ai" />,
  <CreativeBrandingVisual key="brand" />,
]

// ─── PAGE SECTION ─────────────────────────────────────────────────────────────

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
              visual={SERVICE_VISUALS[i]}
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
