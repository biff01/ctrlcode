'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Monitor, Smartphone, ExternalLink } from 'lucide-react'
import type { Showcase } from '@/lib/projects'
import { useLang } from './LanguageProvider'

type Device = 'desktop' | 'mobile'

interface Props {
  name: string
  showcase: Showcase
  liveUrl?: string
  onClose: () => void
}

/* The captured strips are full-page, so the frame shows a window onto them and the
 * visitor scrolls. Heights below are the frame viewport, not the image. */
const DESKTOP_FRAME_W = 1100
const MOBILE_FRAME_W = 320
const MOBILE_FRAME_H = 660

function ToggleButton({ active, onClick, icon: Icon, label }: {
  active: boolean; onClick: () => void; icon: typeof Monitor; label: string
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="font-body flex items-center"
      style={{
        gap: 7,
        padding: '7px 14px',
        borderRadius: 8,
        fontSize: 12,
        cursor: 'pointer',
        border: `1px solid ${active ? 'var(--border)' : 'transparent'}`,
        background: active ? 'var(--btn-secondary-bg)' : 'transparent',
        color: active ? 'var(--text-primary)' : 'var(--text-tertiary)',
      }}
    >
      <Icon style={{ width: 14, height: 14 }} /> {label}
    </button>
  )
}

export default function ProjectShowcase({ name, showcase, liveUrl, onClose }: Props) {
  const { t } = useLang()
  const [device, setDevice] = useState<Device>('desktop')
  const [mounted, setMounted] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  // Close on Escape, and lock background scroll while the modal owns the viewport.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  if (!mounted) return null

  const isDesktop = device === 'desktop'

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${name} — ${t('Interactive showcase')}`}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          background: 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px 16px',
          overflowY: 'auto',
        }}
      >
        {/* Toolbar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-between"
          style={{
            width: '100%',
            maxWidth: DESKTOP_FRAME_W,
            marginBottom: 18,
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <span
            className="font-display font-bold"
            style={{ fontSize: 20, color: '#fff', letterSpacing: -0.4 }}
          >
            {t(name)}
          </span>

          <div className="flex items-center" style={{ gap: 8 }}>
            <div
              className="flex items-center"
              style={{ gap: 4, padding: 4, borderRadius: 10, background: 'var(--pill-bg)', border: '1px solid var(--card-border)' }}
            >
              <ToggleButton active={isDesktop} onClick={() => setDevice('desktop')} icon={Monitor} label={t('Desktop view')} />
              <ToggleButton active={!isDesktop} onClick={() => setDevice('mobile')} icon={Smartphone} label={t('Mobile view')} />
            </div>

            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body flex items-center"
                style={{
                  gap: 6, padding: '8px 14px', borderRadius: 8, fontSize: 12,
                  background: 'var(--btn-secondary-bg)', border: '1px solid var(--border)',
                  color: 'var(--text-primary)', textDecoration: 'none',
                }}
              >
                {t('Open original')} <ExternalLink style={{ width: 12, height: 12 }} />
              </a>
            )}

            <button
              ref={closeRef}
              onClick={onClose}
              aria-label={t('Close showcase')}
              className="flex items-center justify-center"
              style={{
                width: 36, height: 36, borderRadius: 8, cursor: 'pointer',
                background: 'var(--pill-bg)', border: '1px solid var(--card-border)',
                color: 'var(--text-primary)',
              }}
            >
              <X style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>

        {/* Device frame */}
        <motion.div
          key={device}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
        >
          {isDesktop ? (
            <div
              style={{
                width: '100%',
                maxWidth: DESKTOP_FRAME_W,
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid var(--card-border)',
                background: 'var(--card-bg)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.55)',
              }}
            >
              {/* Browser chrome */}
              <div
                className="flex items-center"
                style={{ gap: 10, padding: '10px 14px', borderBottom: '1px solid var(--card-border)', background: 'var(--pill-bg)' }}
              >
                <div className="flex" style={{ gap: 6 }}>
                  {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                    <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div
                  className="font-mono"
                  style={{
                    flex: 1, textAlign: 'center', fontSize: 11, color: 'var(--text-tertiary)',
                    background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                    borderRadius: 6, padding: '4px 10px',
                  }}
                >
                  {showcase.siteLabel}
                </div>
                <div style={{ width: 44 }} />
              </div>

              <div style={{ height: '68vh', minHeight: 380, overflowY: 'auto', background: '#fff' }}>
                <img
                  src={showcase.desktop}
                  alt={`${name} — desktop design`}
                  style={{ display: 'block', width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                width: MOBILE_FRAME_W,
                borderRadius: 38,
                padding: 10,
                background: '#0d0d0d',
                border: '1px solid var(--card-border)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.55)',
                position: 'relative',
              }}
            >
              {/* Notch */}
              <div
                style={{
                  position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)',
                  width: 96, height: 20, borderRadius: 12, background: '#0d0d0d', zIndex: 2,
                }}
              />
              <div style={{ height: MOBILE_FRAME_H, borderRadius: 30, overflowY: 'auto', overflowX: 'hidden', background: '#fff' }}>
                <img
                  src={showcase.mobile}
                  alt={`${name} — mobile design`}
                  style={{ display: 'block', width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          )}

          <span className="font-body" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
            {t('Scroll inside the frame to explore')}
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
