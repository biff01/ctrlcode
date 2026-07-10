'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Plus, Minus, Check } from 'lucide-react'
import { useLang } from './LanguageProvider'

type Product = { id: string; name: string; desc: string; price: number; tag: string }

const PRODUCTS: Product[] = [
  { id: 'landing', name: 'Landing Page Kit', desc: 'Production-ready Next.js landing template with animations.', price: 79, tag: 'TEMPLATE' },
  { id: 'dashboard', name: 'Admin Dashboard', desc: 'React + TypeScript dashboard with charts and auth flows.', price: 149, tag: 'TEMPLATE' },
  { id: 'design-system', name: 'Design System', desc: 'Figma + code tokens, components and documentation.', price: 199, tag: 'SYSTEM' },
  { id: 'audit', name: 'Code Audit', desc: '48-hour review of your codebase with a prioritized report.', price: 350, tag: 'SERVICE' },
  { id: 'branding', name: 'Brand Starter', desc: 'Logo, palette, typography and a one-page brand guide.', price: 250, tag: 'SERVICE' },
  { id: 'seo', name: 'SEO Boost', desc: 'Technical SEO pass, performance tuning and Core Web Vitals.', price: 180, tag: 'SERVICE' },
]

export default function ShopClient() {
  const [cart, setCart] = useState<Record<string, number>>({})
  const { t } = useLang()

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

  return (
    <section style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 96px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span className="font-mono" style={{ fontSize: 12, letterSpacing: 1.5, color: '#4A6FA5' }}>{t('STORE')}</span>
            <h1 className="font-display" style={{ fontSize: 56, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05, color: 'var(--text-primary)', margin: 0 }}>
              {t('Templates & services.')}
            </h1>
            <p className="font-body" style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 520, margin: 0 }}>
              {t('Ready-made kits and fixed-scope services you can buy today.')}
            </p>
          </div>

          {/* Cart summary */}
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '14px 20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ShoppingBag style={{ width: 18, height: 18, color: 'var(--text-primary)' }} />
              <span className="font-body" style={{ fontSize: 14, color: 'var(--text-primary)' }}>
                {count} {t(count === 1 ? 'item' : 'items')}
              </span>
            </div>
            <div style={{ width: 1, height: 22, background: 'var(--border-subtle)' }} />
            <span className="font-display font-semibold" style={{ fontSize: 20, color: 'var(--text-primary)' }}>${total}</span>
            <Link
              href="/contact"
              className="font-body font-semibold"
              style={{
                background: count ? 'var(--btn-primary-bg)' : 'var(--pill-bg)',
                color: count ? 'var(--btn-primary-color)' : 'var(--text-tertiary)',
                fontSize: 13, padding: '9px 18px', borderRadius: 99,
                pointerEvents: count ? 'auto' : 'none', textDecoration: 'none',
              }}
            >
              {t('Checkout')}
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {PRODUCTS.map((p) => {
            const qty = cart[p.id] || 0
            return (
              <div key={p.id} style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: 24, display: 'flex', flexDirection: 'column', gap: 14, boxShadow: 'var(--card-shadow)' }}>
                <span className="font-mono" style={{ fontSize: 11, letterSpacing: 1, color: '#4A6FA5' }}>{t(p.tag)}</span>
                <h3 className="font-display font-semibold" style={{ fontSize: 22, color: 'var(--text-primary)', margin: 0 }}>{t(p.name)}</h3>
                <p className="font-body" style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0, flex: 1 }}>{t(p.desc)}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                  <span className="font-display font-light" style={{ fontSize: 34, color: 'var(--text-primary)' }}>${p.price}</span>
                  {qty === 0 ? (
                    <button
                      onClick={() => add(p.id)}
                      className="font-body font-semibold"
                      style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-color)', fontSize: 14, padding: '10px 18px', borderRadius: 99, border: 'none', cursor: 'pointer' }}
                    >
                      <Plus style={{ width: 15, height: 15 }} /> {t('Add')}
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--surface-3)', border: '1px solid var(--border-subtle)', borderRadius: 99, padding: '6px 10px' }}>
                      <button onClick={() => remove(p.id)} aria-label="Remove one" style={{ display: 'flex', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
                        <Minus style={{ width: 16, height: 16 }} />
                      </button>
                      <span className="font-body" style={{ fontSize: 15, color: 'var(--text-primary)', minWidth: 16, textAlign: 'center' }}>{qty}</span>
                      <button onClick={() => add(p.id)} aria-label="Add one" style={{ display: 'flex', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
                        <Plus style={{ width: 16, height: 16 }} />
                      </button>
                    </div>
                  )}
                </div>
                {qty > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Check style={{ width: 13, height: 13, color: '#4A6FA5' }} />
                    <span className="font-body" style={{ fontSize: 12.5, color: '#4A6FA5' }}>{t('In cart')}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
