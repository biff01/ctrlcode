'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X, Monitor, Smartphone, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import type { Showcase } from '@/lib/projects'
import { useLang } from './LanguageProvider'
import { useBreakpoint } from '@/lib/useBreakpoint'

type Device = 'desktop' | 'mobile'

interface Props {
  name: string
  showcase: Showcase
  liveUrl?: string
  onClose: () => void
}

/* The captured strips are full-page, so the frame shows a window onto them and the
 * visitor scrolls. Frame viewport heights live in the responsive classes below. */
const DESKTOP_FRAME_W = 1100

function ToggleButton({ active, onClick, icon: Icon, label, grow }: {
  active: boolean; onClick: () => void; icon: typeof Monitor; label: string; grow?: boolean
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="font-body flex items-center min-h-[44px] lg:min-h-0 press"
      style={{
        gap: 8,
        padding: '8px 12px',
        borderRadius: 8,
        fontSize: 12,
        cursor: 'pointer',
        border: `1px solid ${active ? 'var(--border)' : 'transparent'}`,
        background: active ? 'var(--btn-secondary-bg)' : 'transparent',
        color: active ? 'var(--text-primary)' : 'var(--text-tertiary)',
        flex: grow ? 1 : undefined,
        justifyContent: grow ? 'center' : undefined,
      }}
    >
      <Icon aria-hidden={true} style={{ width: 14, height: 14 }} /> {label}
    </button>
  )
}

export default function ProjectShowcase({ name, showcase, liveUrl, onClose }: Props) {
  const { t } = useLang()
  const [device, setDevice] = useState<Device>('desktop')
  const [mounted, setMounted] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  // The modal only mounts after a click, so the breakpoint is already hydrated — no desktop flash.
  const compact = useBreakpoint() === 'mobile'

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

  useEffect(() => {
    const dialog = document.querySelector('[role="dialog"]') as HTMLElement | null
    if (!dialog) return
    const getFocusable = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ))
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = getFocusable()
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', trap)
    return () => document.removeEventListener('keydown', trap)
  }, [])

  useEffect(() => setImgLoaded(false), [device])

  if (!mounted) return null

  const isDesktop = device === 'desktop'

  const deviceToggle = (
    <div
      className="flex items-center gap-2 lg:gap-1"
      style={{ padding: 4, borderRadius: 10, background: 'var(--pill-bg)', border: '1px solid var(--card-border)', flex: compact ? 1 : undefined }}
    >
      <ToggleButton active={isDesktop} onClick={() => setDevice('desktop')} icon={Monitor} label={t('Desktop view')} grow={compact} />
      <ToggleButton active={!isDesktop} onClick={() => setDevice('mobile')} icon={Smartphone} label={t('Mobile view')} grow={compact} />
    </div>
  )

  const openOriginal = liveUrl ? (
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="font-body flex items-center min-h-[44px] lg:min-h-0 btn-fade press"
      style={{
        gap: 8, padding: '8px 12px', borderRadius: 8, fontSize: 12,
        background: 'var(--btn-secondary-bg)', border: '1px solid var(--border)',
        color: 'var(--text-primary)', textDecoration: 'none',
      }}
    >
      {t('Open original')} <ExternalLink aria-hidden={true} style={{ width: 12, height: 12 }} />
    </a>
  ) : null

  const closeButton = (
    <button
      ref={closeRef}
      onClick={onClose}
      aria-label={t('Close showcase')}
      className="flex items-center justify-center flex-shrink-0 w-11 h-11 lg:w-9 lg:h-9 btn-fade press"
      style={{
        borderRadius: 8, cursor: 'pointer',
        background: 'var(--pill-bg)', border: '1px solid var(--card-border)',
        color: 'var(--text-primary)',
      }}
    >
      <X style={{ width: 16, height: 16 }} />
    </button>
  )

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${name} — ${t('Interactive showcase')}`}
      aria-describedby="showcase-desc"
      className="p-3 md:px-4 md:py-6"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'var(--overlay-bg)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
      }}
    >
      {/* Toolbar — on phones the title + close get their own row so close stays reachable */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-between"
        style={{
          width: '100%',
          maxWidth: DESKTOP_FRAME_W,
          marginBottom: compact ? 12 : 16,
          gap: compact ? 8 : 16,
          flexWrap: 'wrap',
        }}
      >
        {compact ? (
          <>
            <div className="flex items-center justify-between" style={{ width: '100%', gap: 12 }}>
              <span
                className="font-display font-bold"
                style={{ fontSize: 18, color: 'var(--text-on-overlay)', letterSpacing: -0.4, minWidth: 0 }}
              >
                {t(name)}
              </span>
              {closeButton}
            </div>
            <div className="flex items-center" style={{ width: '100%', gap: 8, flexWrap: 'wrap' }}>
              {deviceToggle}
              {openOriginal}
            </div>
          </>
        ) : (
          <>
            <span
              className="font-display font-bold"
              style={{ fontSize: 20, color: 'var(--text-on-overlay)', letterSpacing: -0.4 }}
            >
              {t(name)}
            </span>
            <div className="flex items-center" style={{ gap: 8 }}>
              {deviceToggle}
              {openOriginal}
              {closeButton}
            </div>
          </>
        )}
      </div>

      {/* Device frame */}
      <motion.div
        key={device}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full lg:w-auto"
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
              style={{ gap: 8, padding: '8px 12px', borderBottom: '1px solid var(--card-border)', background: 'var(--pill-bg)' }}
            >
              <div className="flex" style={{ gap: 8 }}>
                {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                  <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div
                className="font-mono"
                style={{
                  flex: 1, textAlign: 'center', fontSize: 11, color: 'var(--text-tertiary)',
                  background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                  borderRadius: 6, padding: '4px 8px',
                }}
              >
                {showcase.siteLabel}
              </div>
              <div style={{ width: 44 }} />
            </div>

            <div
              className="h-[calc(100dvh-230px)] min-h-[280px] lg:h-[68vh] lg:min-h-[380px]"
              style={{ overflowY: 'auto', background: 'var(--showcase-canvas, #fff)' }}
            >
              <div style={{ position: 'relative' }}>
                {!imgLoaded && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'var(--card-border)',
                    opacity: 0.4,
                  }} />
                )}
                <Image
                  src={showcase.desktop}
                  alt={`${name} — ${t('desktop design')}`}
                  width={1100}
                  height={4000}
                  style={{
                    display: 'block', width: '100%', height: 'auto',
                    opacity: imgLoaded ? 1 : 0,
                    transition: 'opacity 0.35s ease',
                  }}
                  onLoad={() => setImgLoaded(true)}
                  unoptimized
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            className="w-[min(320px,calc(100vw-24px))] lg:w-[320px]"
            style={{
              borderRadius: 38,
              padding: 8,
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
            <div
              className="h-[min(660px,calc(100dvh-220px))] lg:h-[660px]"
              style={{ borderRadius: 30, overflowY: 'auto', overflowX: 'hidden', background: 'var(--showcase-canvas, #fff)' }}
            >
              <div style={{ position: 'relative' }}>
                {!imgLoaded && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'var(--card-border)',
                    opacity: 0.4,
                  }} />
                )}
                <Image
                  src={showcase.mobile}
                  alt={`${name} — ${t('mobile design')}`}
                  width={320}
                  height={4000}
                  style={{
                    display: 'block', width: '100%', height: 'auto',
                    opacity: imgLoaded ? 1 : 0,
                    transition: 'opacity 0.35s ease',
                  }}
                  onLoad={() => setImgLoaded(true)}
                  unoptimized
                />
              </div>
            </div>
          </div>
        )}

        <span id="showcase-desc" className="font-body" style={{ fontSize: 11, color: 'var(--text-on-overlay-muted)' }}>
          {t('Scroll inside the frame to explore')}
        </span>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
