'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { useLang } from './LanguageProvider'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const { t } = useLang()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email.')
      return
    }
    setError('')
    setSent(true)
  }

  if (sent) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, height: 40 }}>
        <Check style={{ width: 16, height: 16, color: 'var(--footer-social-icon)' }} />
        <span className="font-body" style={{ fontSize: 13, color: 'var(--footer-text)' }}>
          {t("Thanks — you're subscribed.")}
        </span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (error) setError('') }}
          placeholder={t('Email address')}
          style={{
            flex: 1,
            minWidth: 0,
            height: 40,
            borderRadius: 8,
            background: 'var(--footer-input-bg)',
            border: `1px solid ${error ? 'rgba(255,120,120,0.6)' : 'var(--footer-input-border)'}`,
            padding: '0 14px',
            fontSize: 12.5,
            color: 'var(--footer-input-text)',
            outline: 'none',
            fontFamily: 'var(--font-inter)',
          }}
        />
        <button
          type="submit"
          className="font-body font-medium"
          style={{
            height: 40,
            padding: '0 18px',
            borderRadius: 8,
            background: 'var(--footer-btn-bg)',
            color: 'var(--footer-btn-color)',
            fontSize: 13,
            flexShrink: 0,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {t('Subscribe')}
        </button>
      </div>
      {error && <span className="font-body" style={{ fontSize: 12, color: 'rgb(255,150,150)' }}>{t(error)}</span>}
    </form>
  )
}
