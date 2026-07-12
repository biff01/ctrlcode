'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ShoppingBag, Plus, Minus, Check } from 'lucide-react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useLang } from './LanguageProvider'

type Product = { id: string; name: string; desc: string; price: number; tag: string }

const PRODUCTS: Product[] = [
  { id: 'landing', name: 'Landing Page Kit', desc: 'Ship a polished marketing site in a day — not a week.', price: 79, tag: 'TEMPLATE' },
  { id: 'dashboard', name: 'Admin Dashboard', desc: 'Full admin panel wired with auth and real-time charts, ready to brand.', price: 149, tag: 'TEMPLATE' },
  { id: 'design-system', name: 'Design System', desc: 'One source of truth for your brand — Figma and code always in sync.', price: 199, tag: 'SYSTEM' },
  { id: 'audit', name: 'Code Audit', desc: 'Know exactly what to fix, in order of impact, within 48 hours.', price: 350, tag: 'SERVICE' },
  { id: 'branding', name: 'Brand Starter', desc: 'A complete brand identity, delivered fast enough to use next week.', price: 250, tag: 'SERVICE' },
  { id: 'seo', name: 'SEO Boost', desc: 'Recover lost rankings and hit green Core Web Vitals — guaranteed.', price: 180, tag: 'SERVICE' },
]

const TAG_STYLES: Record<string, { background: string; color: string }> = {
  TEMPLATE: { background: 'rgba(74,111,165,0.1)', color: 'var(--kicker)' },
  SYSTEM:   { background: 'rgba(99,102,241,0.1)', color: '#6366F1' },
  SERVICE:  { background: 'rgba(16,185,129,0.1)', color: '#10B981' },
}

const EASE = [0.22, 1, 0.36, 1] as const

export default function ShopClient() {
  const [cart, setCart] = useState<Record<string, number>>({})
  const { t, lang } = useLang()

  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const gridInView = useInView(gridRef, { once: true, margin: '-80px' })

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }))
  const remove = (id: string) =>
    setCart((c) => {
      const n = (c[id] || 0) - 1
      const next = { ...c }
      if (n <= 0) delete next[id]
      else next[id] = n
      return next
    })

  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const total = PRODUCTS.reduce((sum, p) => sum + (cart[p.id] || 0) * p.price, 0)

  const ruPlural = (n: number) =>
    n % 10 === 1 && n % 100 !== 11
      ? 'товар'
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
        ? 'товара'
        : 'товаров'

  return (
    <section style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 24px) clamp(64px, 10vw, 96px)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 'clamp(24px, 6vw, 40px)' }}>
          <motion.div ref={headerRef} style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, ease: EASE }}
              className="font-mono"
              style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--kicker)' }}
            >
              {t('STORE')}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.07, ease: EASE }}
              className="font-display"
              style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 600, letterSpacing: 'clamp(-2px, -0.2vw, -1px)', lineHeight: 1.05, color: 'var(--text-primary)', margin: 0 }}
            >
              {t('Templates & services.')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.14, ease: EASE }}
              className="font-body"
              style={{ fontSize: 'clamp(15px, 4.2vw, 17px)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 520, margin: 0 }}
            >
              {t('Ready-made kits and fixed-scope services you can buy today.')}
            </motion.p>
          </motion.div>

          {/* Cart summary — full-width row below the title on mobile/tablet */}
          <div
            className={`max-lg:w-full max-lg:justify-between transition-all duration-300${count > 0 ? ' shadow-[0_0_0_1px_var(--btn-primary-bg)_inset]' : ''}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
              background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 14,
              padding: '12px 20px', boxShadow: 'var(--card-shadow)', minWidth: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <motion.span
                key={count}
                animate={count > 0 ? { scale: [1, 1.25, 1] } : {}}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <ShoppingBag aria-hidden="true" style={{ width: 18, height: 18, color: count > 0 ? 'var(--kicker)' : 'var(--text-primary)' }} />
              </motion.span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={count}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="font-body"
                  style={{ fontSize: 15, color: 'var(--text-primary)' }}
                >
                  {count}{' '}
                  {lang === 'ru' ? ruPlural(count) : t(count === 1 ? 'item' : 'items')}
                </motion.span>
              </AnimatePresence>
            </div>
            <div style={{ width: 1, height: 24, background: 'var(--border-subtle)' }} />
            <AnimatePresence mode="popLayout">
              <motion.span
                key={total}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
                className="font-display font-semibold"
                style={{ fontSize: 20, color: 'var(--text-primary)' }}
              >
                ${total}
              </motion.span>
            </AnimatePresence>
            <Link
              href="/contact"
              className="font-body font-semibold px-4 py-3 lg:py-2 transition-all duration-150 active:scale-[0.97] hover:scale-[1.02]"
              tabIndex={count ? 0 : -1}
              aria-disabled={!count}
              aria-label={count === 0 ? t('Add items to enable checkout') : t('Checkout')}
              onClick={count ? undefined : (e) => e.preventDefault()}
              style={{
                background: count ? 'var(--btn-primary-bg)' : 'var(--pill-bg)',
                color: count ? 'var(--btn-primary-color)' : 'var(--text-tertiary)',
                fontSize: 13, borderRadius: 9999,
                pointerEvents: count ? 'auto' : 'none', textDecoration: 'none',
                opacity: count ? 1 : 0.5,
                cursor: count ? 'pointer' : 'not-allowed',
                transition: 'background 0.2s ease, color 0.2s ease, opacity 0.2s ease, transform 0.1s ease',
              }}
            >
              {t('Checkout')}
            </Link>
          </div>
        </div>

        {count === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-body"
            style={{ fontSize: 12, color: 'var(--text-tertiary)', textAlign: 'right', marginTop: 6, width: '100%' }}
          >
            {t('Add at least one item to continue.')}
          </motion.p>
        )}

        {/* Grid — 1 col mobile, 2 tablet, desktop keeps its auto-fill layout */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]"
          style={{ gap: 16 }}
        >
          {PRODUCTS.map((p, i) => {
            const qty = cart[p.id] || 0
            const tagStyle = TAG_STYLES[p.tag] ?? { background: 'rgba(74,111,165,0.1)', color: 'var(--kicker)' }
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.09, ease: EASE }}
                whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.35)', transition: { duration: 0.25, ease: EASE } }}
                whileTap={{ scale: 0.98, transition: { duration: 0.12 } }}
                className="group"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 'clamp(18px, 5vw, 24px)', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: 'var(--card-shadow)', cursor: 'pointer' }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: 11, letterSpacing: 1, ...tagStyle, borderRadius: 4, padding: '2px 7px', alignSelf: 'flex-start' }}
                >
                  {t(p.tag)}
                </span>
                <h3 className="font-display font-semibold" style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', color: 'var(--text-primary)', margin: 0 }}>{t(p.name)}</h3>
                <p className="font-body" style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0, flex: 1 }}>{t(p.desc)}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, flexWrap: 'wrap', gap: 8 }}>
                  <span
                    className="font-display"
                    style={{ fontSize: 'clamp(28px, 7.5vw, 34px)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}
                  >
                    ${p.price}
                  </span>
                  <AnimatePresence mode="wait">
                    {qty === 0 ? (
                      <motion.button
                        key="add"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.18, ease: EASE }}
                        onClick={() => add(p.id)}
                        aria-label={`Add ${p.name} to cart`}
                        className="font-body font-semibold py-3 lg:py-2 btn-lift press transition-all duration-150 hover:opacity-90 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--btn-primary-bg)]"
                        style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-color)', fontSize: 14, paddingLeft: 16, paddingRight: 16, borderRadius: 9999, border: 'none', cursor: 'pointer' }}
                      >
                        <Plus aria-hidden="true" style={{ width: 15, height: 15 }} /> {t('Add')}
                      </motion.button>
                    ) : (
                      <motion.div
                        key="stepper"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.18, ease: EASE }}
                        className="py-2"
                        style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--surface-3)', border: '1px solid var(--border-subtle)', borderRadius: 9999, paddingLeft: 8, paddingRight: 8 }}
                      >
                        {/* padding + negative margin grow the +/- hit areas to ~44px on touch without moving the layout */}
                        <button
                          onClick={() => remove(p.id)}
                          aria-label={`${t('Remove one')} ${p.name}`}
                          className="max-lg:p-3.5 max-lg:-m-2.5 flex rounded-full transition-colors duration-150 hover:bg-[var(--surface-2)] active:scale-90 focus-visible:outline-2 focus-visible:outline-[var(--text-primary)]"
                          style={{ display: 'flex', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', transition: 'background 0.15s ease, transform 0.1s ease' }}
                        >
                          <Minus aria-hidden="true" style={{ width: 16, height: 16 }} />
                        </button>
                        <span className="font-body" style={{ fontSize: 15, color: 'var(--text-primary)', minWidth: 16, textAlign: 'center' }}>{qty}</span>
                        <button
                          onClick={() => add(p.id)}
                          aria-label={`${t('Add one')} ${p.name}`}
                          className="max-lg:p-3.5 max-lg:-m-2.5 flex rounded-full transition-colors duration-150 hover:bg-[var(--surface-2)] active:scale-90 focus-visible:outline-2 focus-visible:outline-[var(--text-primary)]"
                          style={{ display: 'flex', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', transition: 'background 0.15s ease, transform 0.1s ease' }}
                        >
                          <Plus aria-hidden="true" style={{ width: 16, height: 16 }} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {qty > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                      <Check aria-hidden="true" style={{ width: 13, height: 13, color: 'var(--kicker)' }} />
                      <span className="font-body" style={{ fontSize: 13, color: 'var(--kicker)' }}>{t('In cart')}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
