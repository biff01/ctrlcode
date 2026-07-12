'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Aperture, ArrowRight, Check, Eye, EyeOff } from 'lucide-react'
import { useLang } from './LanguageProvider'

const fieldBox: React.CSSProperties = {
  width: '100%',
  borderRadius: 10,
  background: 'var(--af-bg-field)',
  border: '1px solid var(--af-border)',
  paddingLeft: 16,
  paddingRight: 16,
  color: 'var(--af-text)',
  fontFamily: 'var(--font-inter)',
}

const fieldClass = 'af-field text-[16px] py-[12px] lg:text-[14px] lg:py-[12px]'

const fieldLabel: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: 1,
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-geist-mono)',
}

const sectionStyle: React.CSSProperties = {
  background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, var(--af-bg-page) 70%)',
  minHeight: 'calc(100vh - 90px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'clamp(40px, 8vw, 64px) clamp(16px, 3vw, 24px) clamp(64px, 12vw, 96px)',
}

const cardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: 440,
  background: 'var(--af-bg-card)',
  border: '1px solid var(--af-card-border)',
  borderRadius: 18,
  padding: 'clamp(24px, 7vw, 40px) clamp(24px, 5.5vw, 40px) clamp(24px, 5.5vw, 40px)',
  boxShadow: 'var(--card-shadow, 0 16px 48px rgba(0,0,0,0.4))',
}

type Mode = 'login' | 'register'
type Errors = Partial<Record<'name' | 'email' | 'password' | 'confirm', string>>

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter()
  const { t } = useLang()
  const isRegister = mode === 'register'

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout)
  }, [])

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field as keyof Errors]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function validate(): Errors {
    const next: Errors = {}
    if (isRegister && !form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (!form.password) next.password = 'Password is required.'
    else if (form.password.length < 6) next.password = 'At least 6 characters.'
    if (isRegister && form.confirm !== form.password) next.confirm = 'Passwords do not match.'
    return next
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const found = validate()
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }
    setLoading(true)
    const t1 = setTimeout(() => {
      setLoading(false)
      setDone(true)
      const t2 = setTimeout(() => router.push('/'), 900)
      timersRef.current.push(t2)
    }, 700)
    timersRef.current.push(t1)
  }

  return (
    <section style={sectionStyle}>
      <style>{`
        :root {
          --af-bg-page: #0a0a0a;
          --af-bg-card: #111111;
          --af-bg-field: #0A0A0C;
          --af-border: rgba(255,255,255,0.11);
          --af-card-border: #2A2A2A;
          --af-text: #fff;
          --af-text-sub: #8E9FC0;
          --text-muted: #666666;
          --color-error: rgb(255,140,140);
          --color-error-border: rgba(255,120,120,0.6);
        }
        @media (prefers-color-scheme: light) {
          :root {
            --af-bg-page: #f5f5f5;
            --af-bg-card: #fff;
            --af-bg-field: #f9f9f9;
            --af-border: rgba(0,0,0,0.12);
            --af-card-border: rgba(0,0,0,0.1);
            --af-text: #0a0a0a;
            --af-text-sub: #4a5568;
            --text-muted: #666;
            --color-error: rgb(180,50,50);
            --color-error-border: rgba(200,60,60,0.6);
          }
        }
        :root[data-theme="light"] {
          --af-bg-page: #f5f5f5;
          --af-bg-card: #fff;
          --af-bg-field: #f9f9f9;
          --af-border: rgba(0,0,0,0.12);
          --af-card-border: rgba(0,0,0,0.1);
          --af-text: #0a0a0a;
          --af-text-sub: #4a5568;
          --text-muted: #666;
          --color-error: rgb(180,50,50);
          --color-error-border: rgba(200,60,60,0.6);
        }
        :root[data-theme="dark"] {
          --af-bg-page: #0a0a0a;
          --af-bg-card: #111111;
          --af-bg-field: #0A0A0C;
          --af-border: rgba(255,255,255,0.11);
          --af-card-border: #2A2A2A;
          --af-text: #fff;
          --af-text-sub: #8E9FC0;
          --text-muted: #666666;
          --color-error: rgb(255,140,140);
          --color-error-border: rgba(255,120,120,0.6);
        }
        .af-field::placeholder { color: var(--text-muted); opacity: 1; }
        .af-field { transition: border-color 0.15s ease, box-shadow 0.15s ease; }
        .af-field:focus { border-color: rgba(255,255,255,0.35) !important; box-shadow: 0 0 0 3px rgba(255,255,255,0.06); outline: none; }
        .af-field:focus-visible { outline: none; border-color: rgba(255,255,255,0.4) !important; box-shadow: 0 0 0 3px rgba(255,255,255,0.07); }
        @keyframes af-spin { to { transform: rotate(360deg); } }
        .af-spin { animation: af-spin 0.7s linear infinite; }
        .af-auth-link:hover { text-decoration: underline; }
        .af-logo-link { transition: opacity 0.2s; }
        .af-logo-link:hover { opacity: 0.8; }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={cardStyle}
      >
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, padding: '24px 0' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
                style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Check style={{ width: 26, height: 26, color: 'var(--af-text)' }} />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="font-display"
                style={{ fontSize: 24, fontWeight: 600, color: 'var(--af-text)', margin: 0 }}
              >
                {isRegister ? t('Account created') : t('Welcome back')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="font-body"
                style={{ fontSize: 15, color: 'var(--af-text-sub)', margin: 0 }}
              >
                {t('Taking you to your dashboard…')}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Logo */}
              <Link href="/" className="af-logo-link flex items-center gap-[10px] group" style={{ marginBottom: 24, textDecoration: 'none' }}>
                <Aperture className="transition-transform duration-500 ease-out group-hover:rotate-90" style={{ width: 26, height: 26, color: 'var(--af-text)' }} />
                <span className="font-display font-semibold" style={{ fontSize: 18, color: 'var(--af-text)', letterSpacing: -0.3 }}>
                  Ctrl Code
                </span>
              </Link>

              <h1 className="font-display" style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 600, letterSpacing: -0.8, color: 'var(--af-text)', margin: '0 0 8px' }}>
                {isRegister ? t('Create your account') : t('Sign in')}
              </h1>
              <p className="font-body" style={{ fontSize: 14, color: 'var(--af-text-sub)', margin: '0 0 24px' }}>
                {isRegister ? t('Start your project with Ctrl Code.') : t('Welcome back — log in to continue.')}
              </p>

              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {isRegister && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="af-name" style={fieldLabel}>{t('FULL NAME')}</label>
                    <input
                      id="af-name"
                      className={fieldClass}
                      style={{ ...fieldBox, ...(errors.name ? { borderColor: 'var(--color-error-border)' } : {}) }}
                      placeholder={t('John Smith')}
                      value={form.name}
                      autoComplete="name"
                      onChange={(e) => update('name', e.target.value)}
                    />
                    <AnimatePresence mode="wait">
                      {errors.name && <ErrorText key="name-err">{t(errors.name)}</ErrorText>}
                    </AnimatePresence>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label htmlFor="af-email" style={fieldLabel}>{t('EMAIL')}</label>
                  <input
                    id="af-email"
                    className={fieldClass}
                    type="email"
                    style={{ ...fieldBox, ...(errors.email ? { borderColor: 'var(--color-error-border)' } : {}) }}
                    placeholder={t('you@example.com')}
                    value={form.email}
                    autoComplete="email"
                    onChange={(e) => update('email', e.target.value)}
                  />
                  <AnimatePresence mode="wait">
                    {errors.email && <ErrorText key="email-err">{t(errors.email)}</ErrorText>}
                  </AnimatePresence>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label htmlFor="af-password" style={fieldLabel}>{t('PASSWORD')}</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="af-password"
                      className={fieldClass}
                      type={showPw ? 'text' : 'password'}
                      style={{ ...fieldBox, paddingRight: 44, ...(errors.password ? { borderColor: 'var(--color-error-border)' } : {}) }}
                      placeholder="••••••••"
                      value={form.password}
                      autoComplete={isRegister ? 'new-password' : 'current-password'}
                      onChange={(e) => update('password', e.target.value)}
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      aria-label={showPw ? t('Hide password') : t('Show password')}
                      whileHover={{ color: 'var(--af-text-sub)' }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}
                    >
                      {showPw ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                    </motion.button>
                  </div>
                  <AnimatePresence mode="wait">
                    {errors.password && <ErrorText key="password-err">{t(errors.password)}</ErrorText>}
                  </AnimatePresence>
                </div>

                {isRegister && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="af-confirm" style={fieldLabel}>{t('CONFIRM PASSWORD')}</label>
                    <input
                      id="af-confirm"
                      className={fieldClass}
                      type={showPw ? 'text' : 'password'}
                      style={{ ...fieldBox, ...(errors.confirm ? { borderColor: 'var(--color-error-border)' } : {}) }}
                      placeholder="••••••••"
                      value={form.confirm}
                      autoComplete="new-password"
                      onChange={(e) => update('confirm', e.target.value)}
                    />
                    <AnimatePresence mode="wait">
                      {errors.confirm && <ErrorText key="confirm-err">{t(errors.confirm)}</ErrorText>}
                    </AnimatePresence>
                  </div>
                )}

                {!isRegister && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <motion.button
                      type="button"
                      onClick={() => { /* TODO: forgot password flow */ }}
                      className="font-body max-lg:py-3.5 max-lg:-my-3.5 max-lg:px-2 max-lg:-mx-2"
                      whileHover={{ opacity: 0.65, transition: { duration: 0.15 } }}
                      whileTap={{ scale: 0.97 }}
                      style={{ fontSize: 13, color: 'var(--af-text-sub)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      {t('Forgot password?')}
                    </motion.button>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className="font-body font-semibold btn-lift press group"
                  whileHover={{ scale: 1.015, boxShadow: '0 8px 32px rgba(255,255,255,0.22)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    width: '100%', background: 'var(--af-text)', color: 'var(--af-bg-card)', fontSize: 15,
                    padding: '14px 0', borderRadius: 8, border: 'none',
                    cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1,
                    boxShadow: 'var(--btn-primary-shadow, 0 4px 16px rgba(0,0,0,0.2))', marginTop: 8,
                    transition: 'opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="af-spin" style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" />
                      </svg>
                      {t('Please wait…')}
                    </>
                  ) : (
                    <>
                      {isRegister ? t('Create account') : t('Sign in')}
                      <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1">
                        <ArrowRight style={{ width: 16, height: 16 }} />
                      </span>
                    </>
                  )}
                </motion.button>
              </form>

              <p className="font-body" style={{ fontSize: 14, color: 'var(--af-text-sub)', textAlign: 'center', marginTop: 24 }}>
                {isRegister ? t('Already have an account? ') : t("Don't have an account? ")}
                <Link
                  href={isRegister ? '/login' : '/register'}
                  className="af-auth-link max-lg:inline-block max-lg:p-3 max-lg:-m-3 transition-opacity duration-150 hover:opacity-60"
                  style={{ color: 'var(--af-text)', fontWeight: 500, textDecoration: 'none' }}
                >
                  {isRegister ? t('Sign in') : t('Sign up')}
                </Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.18 }}
      role="alert"
      className="font-body"
      style={{ fontSize: 13, color: 'var(--color-error)', display: 'block' }}
    >
      {children}
    </motion.span>
  )
}
