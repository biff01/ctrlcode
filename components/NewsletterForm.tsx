'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { useLang } from './LanguageProvider'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useLang()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }), headers: { 'Content-Type': 'application/json' } })
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{'.nf-email{outline:none}.nf-email:focus-visible{border-color:var(--footer-btn-bg)!important;box-shadow:0 0 0 2px rgba(255,255,255,0.18)!important}'}</style>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, height: 40 }}
          >
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 16, delay: 0.12 }}
              style={{ display: 'flex' }}
            >
              <Check aria-hidden="true" style={{ width: 16, height: 16, color: 'var(--footer-social-icon)' }} />
            </motion.span>
            <span className="font-body" style={{ fontSize: 13, color: 'var(--footer-text)' }}>
              {t("Thanks — you're subscribed.")}
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}
            exit={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-md:flex-col" style={{ display: 'flex', gap: 8 }}>
              <label htmlFor="nl-email" className="sr-only">{t('Email address')}</label>
              <input
                id="nl-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError('') }}
                placeholder={t('Email address')}
                aria-label={t('Email address')}
                disabled={loading}
                className="flex-none md:flex-1 max-lg:h-12 max-lg:text-base lg:h-10 lg:text-[13px] nf-email"
                style={{
                  minWidth: 0,
                  borderRadius: 8,
                  background: 'var(--footer-input-bg)',
                  border: `1px solid ${error ? 'var(--error-border)' : 'var(--footer-input-border)'}`,
                  padding: '0 12px',
                  color: 'var(--footer-input-text)',
                  fontFamily: 'var(--font-inter)',
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="font-body font-medium max-lg:h-12 lg:h-10 btn-fade press"
                style={{
                  padding: '0 18px',
                  borderRadius: 8,
                  background: 'var(--footer-btn-bg)',
                  color: 'var(--footer-btn-color)',
                  fontSize: 13,
                  flexShrink: 0,
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.65 : 1,
                }}
              >
                {loading ? '…' : t('Subscribe')}
              </button>
            </div>
            {error && <span className="font-body" style={{ fontSize: 12, color: 'var(--error-text)' }}>{t(error)}</span>}
          </motion.form>
        )}
      </AnimatePresence>
    </>
  )
}
