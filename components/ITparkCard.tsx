'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, Download, ExternalLink, Award } from 'lucide-react'
import { useLang } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

function ITParkLogo({ dark, size = 80 }: { dark: boolean; size?: number }) {
  const s = size / 80
  return (
    <div style={{
      width: size, height: size, borderRadius: Math.round(14 * s),
      background: 'linear-gradient(150deg, #5abf5a 0%, #2e8b2e 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, position: 'relative',
      padding: `${Math.round(10 * s)}px ${Math.round(8 * s)}px`, gap: Math.round(3 * s),
    }}>
      <svg width={Math.round(36 * s)} height={Math.round(26 * s)} viewBox="0 0 36 26" fill="none" aria-hidden="true">
        <circle cx="18" cy="5" r="4.5" fill="white" />
        <path d="M9 13 C9 13 9 22 18 22 C27 22 27 13 27 13" fill="white" />
        <rect x="7" y="11.5" width="22" height="3" rx="1.5" fill="white" />
      </svg>
      <span style={{ fontSize: Math.round(7.5 * s * 10) / 10, fontWeight: 800, color: 'white', letterSpacing: 1.2 * s, lineHeight: 1 }}>IT PARK</span>
      <span style={{ fontSize: Math.round(5 * s * 10) / 10, color: 'rgba(255,255,255,0.72)', letterSpacing: 0.4, lineHeight: 1 }}>START local &amp; GO global</span>

      {/* Orange verified badge */}
      <div style={{
        position: 'absolute', top: Math.round(-7 * s), right: Math.round(-7 * s),
        width: Math.round(24 * s), height: Math.round(24 * s), borderRadius: '50%',
        background: 'linear-gradient(135deg, #f5a623, #e8820c)',
        border: `2.5px solid ${dark ? '#0a0a12' : '#f0f1f8'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(230,120,10,0.5)',
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 6 L5 9 L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

function CertModal({ onClose, dark }: { onClose: () => void; dark: boolean }) {
  const { t } = useLang()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const BULLETS = [
    t("Compliance with Uzbekistan IT legislation and international business standards"),
    t("Tax optimisation that lets us offer competitive rates without compromising quality"),
    t("Access to state-backed dispute resolution and client protection mechanisms"),
    t("Proven credibility verified by Uzbekistan's official technology authority"),
  ]

  const modalBg = dark ? '#0f0f17' : '#ffffff'
  const modalBorder = dark ? 'rgba(255,255,255,0.08)' : 'rgba(13,27,75,0.1)'
  const modalShadow = dark
    ? '0 32px 80px rgba(0,0,0,0.7)'
    : '0 8px 40px rgba(13,27,75,0.14), 0 2px 8px rgba(13,27,75,0.06)'
  const headingColor = dark ? '#ffffff' : '#0D1B4B'
  const subtitleColor = dark ? 'rgba(255,255,255,0.45)' : 'rgba(13,27,75,0.5)'
  const bodyColor = dark ? 'rgba(255,255,255,0.55)' : 'rgba(13,27,75,0.65)'
  const bulletColor = dark ? 'rgba(255,255,255,0.6)' : 'rgba(13,27,75,0.7)'
  const mutedColor = dark ? 'rgba(255,255,255,0.35)' : 'rgba(13,27,75,0.4)'
  const closeBg = dark ? 'rgba(255,255,255,0.07)' : 'rgba(13,27,75,0.05)'
  const closeBorder = dark ? 'rgba(255,255,255,0.1)' : 'rgba(13,27,75,0.1)'
  const closeColor = dark ? 'rgba(255,255,255,0.6)' : 'rgba(13,27,75,0.5)'
  const downloadBg = dark ? 'rgba(255,255,255,0.06)' : 'rgba(13,27,75,0.04)'
  const downloadBorder = dark ? 'rgba(255,255,255,0.1)' : 'rgba(13,27,75,0.12)'
  const downloadColor = dark ? 'rgba(255,255,255,0.75)' : 'rgba(13,27,75,0.7)'
  const dividerColor = dark ? 'rgba(255,255,255,0.06)' : 'rgba(13,27,75,0.08)'
  const certBorder = dark ? 'rgba(255,255,255,0.08)' : 'rgba(13,27,75,0.1)'

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(12px, 4vw, 32px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: modalBg,
          borderRadius: 20,
          border: `1px solid ${modalBorder}`,
          boxShadow: modalShadow,
          maxWidth: 860,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 'clamp(20px, 4vw, 36px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between" style={{ gap: 16 }}>
          <div className="flex items-center" style={{ gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'linear-gradient(135deg, #f5a623, #e8820c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" /><path d="M4 20v-1a8 8 0 0 1 16 0v1" /><polyline points="9 11 12 14 22 4" />
              </svg>
            </div>
            <div>
              <h2 className="font-display font-semibold" style={{ fontSize: 'clamp(16px, 3vw, 20px)', color: headingColor, margin: 0 }}>
                {t('IT Park Official Certificate')}
              </h2>
              <p className="font-body" style={{ fontSize: 13, color: subtitleColor, margin: 0, marginTop: 2 }}>
                {t('State-certified technology partner')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: closeBg, border: `1px solid ${closeBorder}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: closeColor,
            }}
          >
            <X style={{ width: 16, height: 16 }} />
          </button>
        </div>

        {/* Content: cert image + info */}
        <div className="flex flex-col lg:flex-row" style={{ gap: 24 }}>

          {/* Certificate image */}
          <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              borderRadius: 14, overflow: 'hidden',
              border: `1px solid ${certBorder}`,
              background: '#fff',
              maxWidth: 360, width: '100%',
            }}>
              <Image
                src="/certificate.png"
                alt={t('IT Park Official Certificate')}
                width={720}
                height={509}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority
              />
            </div>
            <a
              href="/certificate.png"
              download="itpark-certificate.png"
              className="flex items-center font-body"
              style={{
                gap: 8, padding: '10px 20px', borderRadius: 10,
                background: downloadBg,
                border: `1px solid ${downloadBorder}`,
                color: downloadColor, fontSize: 14,
                textDecoration: 'none', justifyContent: 'center',
              }}
            >
              <Download style={{ width: 16, height: 16 }} />
              {t('Download Certificate')}
            </a>
          </div>

          {/* Info panel */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>

            {/* Verified badge */}
            <div className="flex items-center" style={{
              gap: 8, padding: '8px 16px', borderRadius: 99, width: 'fit-content',
              background: 'rgba(76,175,80,0.12)',
              border: '1px solid rgba(76,175,80,0.3)',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="6.5" stroke="#4caf50" /><path d="M4 7L6.2 9.2L10 5" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-body" style={{ fontSize: 12, color: '#4caf50', fontWeight: 600 }}>
                {t('Verified and Authenticated')}
              </span>
            </div>

            <div>
              <h3 className="font-display font-semibold" style={{ fontSize: 'clamp(17px, 2.5vw, 22px)', color: headingColor, margin: '0 0 10px' }}>
                {t('Your Trusted Technology Partner')}
              </h3>
              <p className="font-body" style={{ fontSize: 14, color: bodyColor, lineHeight: 1.65, margin: 0 }}>
                {t('This certificate confirms that Ctrl Code LLC is an officially registered resident of IT Park Uzbekistan — the leading technology park in the country.')}
              </p>
            </div>

            {/* Bullet list */}
            <div>
              <p className="font-mono" style={{ fontSize: 10, letterSpacing: 2, color: 'rgba(245,166,35,0.85)', textTransform: 'uppercase', marginBottom: 14 }}>
                {t('What this means for you')}
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {BULLETS.map((b, i) => (
                  <li key={i} className="flex items-start" style={{ gap: 10 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                      background: 'rgba(245,166,35,0.12)',
                      border: '1px solid rgba(245,166,35,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M2 5L4 7L8 3" stroke="#f5a623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-body" style={{ fontSize: 13, color: bulletColor, lineHeight: 1.55 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer note */}
            <div className="flex items-center" style={{ gap: 8, marginTop: 'auto', paddingTop: 8, borderTop: `1px solid ${dividerColor}` }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                background: 'rgba(76,175,80,0.15)',
                border: '1px solid rgba(76,175,80,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M2 5L4 7L8 3" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-body" style={{ fontSize: 12, color: mutedColor }}>
                {t('Issued by IT Park Uzbekistan')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ITparkCard() {
  const [modalOpen, setModalOpen] = useState(false)
  const { t } = useLang()
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const openModal = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  const cardBg = dark ? 'rgba(255,255,255,0.04)' : 'rgba(13,27,75,0.03)'
  const cardBorder = dark ? 'rgba(255,255,255,0.07)' : 'rgba(13,27,75,0.09)'
  const descColor = dark ? 'rgba(255,255,255,0.42)' : 'rgba(13,27,75,0.5)'
  const linkBg = dark ? 'rgba(255,255,255,0.06)' : 'rgba(13,27,75,0.05)'
  const linkBorder = dark ? 'rgba(255,255,255,0.1)' : 'rgba(13,27,75,0.1)'
  const linkColor = dark ? 'rgba(255,255,255,0.5)' : 'rgba(13,27,75,0.4)'

  return (
    <>
      {/* Card */}
      <div style={{
        borderRadius: 16,
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        boxShadow: 'var(--card-shadow)',
        padding: 'clamp(16px, 3vw, 20px) clamp(16px, 3.5vw, 24px)',
        display: 'flex', alignItems: 'center',
        gap: 'clamp(12px, 3vw, 20px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Amber bottom glow */}
        <div style={{
          position: 'absolute', bottom: 0, left: '5%', right: '5%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(230,120,10,0.65), transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 20,
          background: 'radial-gradient(ellipse at 50% 100%, rgba(230,120,10,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Logo — 56px on mobile, 80px on sm+ */}
        <div className="hidden sm:block flex-shrink-0">
          <ITParkLogo dark={dark} size={80} />
        </div>
        <div className="sm:hidden flex-shrink-0">
          <ITParkLogo dark={dark} size={56} />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f5a623', flexShrink: 0 }} />
            <span className="font-mono" style={{ fontSize: 10, letterSpacing: 1.5, color: 'rgba(245,166,35,0.9)', textTransform: 'uppercase' }}>
              {t('Official Resident')}
            </span>
          </div>
          <h3 className="font-display font-semibold" style={{ fontSize: 'clamp(14px, 3vw, 20px)', color: 'var(--footer-heading)', margin: 0, letterSpacing: -0.3 }}>
            IT Park Uzbekistan
          </h3>
          {/* Description — hidden on mobile to keep the card compact */}
          <p className="font-body hidden sm:block" style={{ fontSize: 'clamp(12px, 1.8vw, 13.5px)', color: descColor, margin: 0, lineHeight: 1.5 }}>
            {t('Ctrl Code is an official resident of IT Park — the leading technology park of Uzbekistan.')}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center flex-shrink-0" style={{ gap: 8 }}>
          <button
            onClick={openModal}
            className="flex items-center font-body font-semibold"
            style={{
              gap: 8,
              padding: '10px 18px',
              borderRadius: 10, border: 'none',
              background: 'linear-gradient(135deg, #f5a623 0%, #e8820c 100%)',
              color: 'white', fontSize: 14,
              cursor: 'pointer', whiteSpace: 'nowrap',
              boxShadow: '0 4px 18px rgba(230,120,10,0.35)',
            }}
          >
            <Award style={{ width: 14, height: 14 }} aria-hidden="true" />
            {/* Label hidden on mobile, shown on sm+ */}
            <span className="hidden sm:inline">{t('Certificate')}</span>
          </button>
          <a
            href="https://it-park.uz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="IT Park website"
            style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: linkBg,
              border: `1px solid ${linkBorder}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: linkColor, textDecoration: 'none',
            }}
          >
            <ExternalLink style={{ width: 15, height: 15 }} />
          </a>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && <CertModal onClose={closeModal} dark={dark} />}
    </>
  )
}
