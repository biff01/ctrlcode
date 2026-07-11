'use client'

import Link from 'next/link'
import { Mail } from 'lucide-react'
import NewsletterForm from './NewsletterForm'
import { useLang } from './LanguageProvider'

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const FOOTER_HREF: Record<string, string> = {
  Benefits: '/#why',
  Features: '/services',
  Solution: '/services',
  Overview: '/services',
  Portfolio: '/portfolio',
  Connectors: '/services',
  Security: '/security',
  'Contact Us': '/contact',
}

export default function Footer() {
  const { t } = useLang()
  return (
    <footer
      style={{
        background: 'var(--footer-bg)',
        borderRadius: 36,
        position: 'relative',
        overflow: 'hidden',
        margin: '0 16px 16px',
        boxShadow: 'var(--footer-shadow)',
      }}
    >

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          padding: '0 40px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top CTA */}
        <div style={{ padding: '56px 0 48px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h2
            className="font-display font-light"
            style={{ fontSize: 58, letterSpacing: -1.8, lineHeight: 1.1, color: 'var(--footer-heading)' }}
          >
            {t('Ready to start building')}<br />{t('your next product?')}
          </h2>
          <Link
            href="/contact"
            className="self-start font-body font-medium"
            style={{
              background: 'var(--footer-btn-bg)',
              color: 'var(--footer-btn-color)',
              fontSize: 14.5,
              padding: '12px 24px',
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            {t('Contact us')}
          </Link>
        </div>

        {/* Footer columns */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: 48,
            gap: 32,
          }}
        >
          {/* Newsletter */}
          <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className="font-body font-bold" style={{ fontSize: 14, color: 'var(--footer-heading)' }}>
              {t('Newsletter')}
            </span>
            <p
              className="font-body"
              style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--footer-text)' }}
            >
              {t("We'd love to share our love for craft with you in our monthly newsletter.")}
            </p>
            <NewsletterForm />
          </div>

          {/* Home */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="font-body font-bold" style={{ fontSize: 14, color: 'var(--footer-heading)' }}>
              {t('Home')}
            </span>
            {['Benefits', 'Features'].map((l) => (
              <Link
                key={l}
                href={FOOTER_HREF[l] || '/'}
                className="font-body"
                style={{ fontSize: 13.5, color: 'var(--footer-link)', cursor: 'pointer', textDecoration: 'none' }}
              >
                {t(l)}
              </Link>
            ))}
          </div>

          {/* Platform */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="font-body font-bold" style={{ fontSize: 14, color: 'var(--footer-heading)' }}>
              {t('Platform')}
            </span>
            {['Solution', 'Overview', 'Portfolio'].map((l) => (
              <Link
                key={l}
                href={FOOTER_HREF[l] || '/'}
                className="font-body"
                style={{ fontSize: 13.5, color: 'var(--footer-link)', cursor: 'pointer', textDecoration: 'none' }}
              >
                {t(l)}
              </Link>
            ))}
          </div>

          {/* About Us */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="font-body font-bold" style={{ fontSize: 14, color: 'var(--footer-heading)' }}>
              {t('About us')}
            </span>
            {['Connectors', 'Security', 'Contact Us'].map((l) => (
              <Link
                key={l}
                href={FOOTER_HREF[l] || '/'}
                className="font-body"
                style={{ fontSize: 13.5, color: 'var(--footer-link)', cursor: 'pointer', textDecoration: 'none' }}
              >
                {t(l)}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              {[
                { icon: <Mail key="mail" style={{ width: 17, height: 17, color: 'var(--footer-social-icon)' }} />, href: 'mailto:info@ctrlcode.uz', label: 'Email' },
                { icon: <LinkedinIcon key="li" />, href: 'https://www.linkedin.com/', label: 'LinkedIn' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: 'var(--footer-social-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--footer-social-icon)',
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: '1px solid var(--footer-divider)',
            padding: '16px 0',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <span className="font-body" style={{ fontSize: 12.5, color: 'var(--footer-muted)' }}>
            {t('© 2025 Ctrl Code. All rights reserved.')}
          </span>
        </div>
      </div>
    </footer>
  )
}
