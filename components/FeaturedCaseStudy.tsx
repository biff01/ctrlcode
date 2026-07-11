'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { useLang } from './LanguageProvider'

const TECH = ['React', 'Node.js', 'AWS', 'PostgreSQL']

export default function FeaturedCaseStudy() {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--bg)', padding: '96px 0', borderTop: '1px solid var(--border-faint)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 40 }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <span className="font-mono" style={{ fontSize: 11, letterSpacing: 3, color: 'var(--text-muted)' }}>
            {t('FEATURED WORK')}
          </span>
          <Link
            href="/portfolio"
            className="flex items-center gap-2 font-body"
            style={{ fontSize: 13, color: 'var(--text-tertiary)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none' }}
          >
            {t('All projects')} <ArrowUpRight style={{ width: 14, height: 14 }} />
          </Link>
        </motion.div>

        {/* Feature card */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 p-6 md:p-10 lg:p-14"
          style={{
            background: 'var(--featured-card)',
            borderRadius: 20,
            border: '1px solid var(--featured-border)',
            overflow: 'hidden',
          }}
        >
          {/* Left — text */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
            {/* Badges */}
            <div style={{ display: 'flex', gap: 8 }}>
              {['SaaS Platform', 'Case Study'].map((badge) => (
                <span
                  key={badge}
                  className="font-body"
                  style={{
                    fontSize: 11,
                    padding: '4px 12px',
                    borderRadius: 99,
                    background: 'var(--badge-bg)',
                    border: '1px solid var(--badge-border)',
                    color: 'var(--badge-text)',
                    letterSpacing: 0.3,
                  }}
                >
                  {t(badge)}
                </span>
              ))}
            </div>

            {/* Headline */}
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(28px, 5.5vw, 38px)', letterSpacing: 'clamp(-1.4px, -0.14vw, -0.7px)', lineHeight: 1.15, color: 'var(--text-primary)' }}
            >
              {t('From idea to $1M ARR')}<br />{t('in 8 months.')}
            </h2>

            {/* Description */}
            <p className="font-body" style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              {t("We built NuroMedical's entire platform from scratch — analytics, user management, billing, and AI-powered clinical insights. The client went from 0 to $1M ARR within their first year of launch.")}
            </p>

            {/* Tech stack */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {TECH.map((t) => (
                <span
                  key={t}
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    padding: '5px 12px',
                    borderRadius: 6,
                    background: 'var(--tag-bg)',
                    border: '1px solid var(--tag-border)',
                    color: 'var(--tag-color)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/portfolio"
              className="flex items-center gap-2 font-body font-semibold"
              style={{
                alignSelf: 'flex-start',
                background: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-color)',
                fontSize: 14,
                padding: '12px 24px',
                borderRadius: 8,
                boxShadow: '0 4px 20px rgba(255,255,255,0.1)',
                textDecoration: 'none',
              }}
            >
              {t('Read Case Study')} <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
          </div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full aspect-[4/3] md:aspect-[16/9] lg:w-[480px] lg:aspect-auto lg:h-[380px] shrink-0"
            style={{
              position: 'relative',
              borderRadius: 14,
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=960&q=80"
              alt="NuroMedical analytics dashboard"
              fill
              sizes="(max-width: 1023px) 100vw, 480px"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
