'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Aperture, ArrowRight, Check, Eye, EyeOff } from 'lucide-react'
import { useLang } from './LanguageProvider'

// Vertical padding + font size live in the input className (16px on mobile prevents iOS zoom).
const fieldBox: React.CSSProperties = {
  width: '100%',
  borderRadius: 10,
  background: '#0A0A0C',
  border: '1px solid rgba(255,255,255,0.11)',
  paddingLeft: 16,
  paddingRight: 16,
  color: '#fff',
  outline: 'none',
  fontFamily: 'var(--font-inter)',
}

const fieldClass = 'af-field text-[16px] py-[14px] lg:text-[14px] lg:py-[13px]'

const fieldLabel: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: 1,
  color: '#666666',
  fontFamily: 'var(--font-geist-mono)',
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
    // Simulated auth — no backend. Redirect home after a beat.
    setTimeout(() => {
      setLoading(false)
      setDone(true)
      setTimeout(() => router.push('/'), 900)
    }, 700)
  }

  return (
    <section style={{ background: '#0a0a0a', minHeight: 'calc(100vh - 90px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(40px, 8vw, 64px) clamp(20px, 3vw, 24px) clamp(64px, 12vw, 96px)' }}>
      <style>{`.af-field::placeholder{color:#666666;opacity:1}`}</style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          maxWidth: 440,
          background: '#111111',
          border: '1px solid #2A2A2A',
          borderRadius: 20,
          padding: 'clamp(26px, 7vw, 40px) clamp(20px, 5.5vw, 36px) clamp(24px, 5.5vw, 36px)',
        }}
      >
        {done ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, padding: '24px 0' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check style={{ width: 26, height: 26, color: '#fff' }} />
            </div>
            <h2 className="font-display" style={{ fontSize: 22, fontWeight: 600, color: '#fff', margin: 0 }}>
              {isRegister ? t('Account created') : t('Welcome back')}
            </h2>
            <p className="font-body" style={{ fontSize: 14, color: '#aaa', margin: 0 }}>
              {t('Taking you to your dashboard…')}
            </p>
          </div>
        ) : (
          <>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-[10px]" style={{ marginBottom: 26, textDecoration: 'none' }}>
              <Aperture style={{ width: 26, height: 26, color: '#fff' }} />
              <span className="font-display font-semibold" style={{ fontSize: 18, color: '#fff', letterSpacing: -0.3 }}>
                Ctrl Code
              </span>
            </Link>

            <h1 className="font-display" style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.8, color: '#fff', margin: '0 0 6px' }}>
              {isRegister ? t('Create your account') : t('Sign in')}
            </h1>
            <p className="font-body" style={{ fontSize: 14, color: '#8E9FC0', margin: '0 0 28px' }}>
              {isRegister ? t('Start your project with Ctrl Code.') : t('Welcome back — log in to continue.')}
            </p>

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {isRegister && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={fieldLabel}>{t('FULL NAME')}</label>
                  <input
                    className={fieldClass}
                    style={{ ...fieldBox, borderColor: errors.name ? 'rgba(255,120,120,0.6)' : 'rgba(255,255,255,0.11)' }}
                    placeholder="John Smith"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                  />
                  {errors.name && <ErrorText>{t(errors.name)}</ErrorText>}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={fieldLabel}>{t('EMAIL')}</label>
                <input
                  className={fieldClass}
                  type="email"
                  style={{ ...fieldBox, borderColor: errors.email ? 'rgba(255,120,120,0.6)' : 'rgba(255,255,255,0.11)' }}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                />
                {errors.email && <ErrorText>{t(errors.email)}</ErrorText>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={fieldLabel}>{t('PASSWORD')}</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className={fieldClass}
                    type={showPw ? 'text' : 'password'}
                    style={{ ...fieldBox, paddingRight: 44, borderColor: errors.password ? 'rgba(255,120,120,0.6)' : 'rgba(255,255,255,0.11)' }}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                  />
                  {/* 14px padding grows the toggle hit area to 44x44 while the icon stays at right:12 */}
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                    style={{ position: 'absolute', right: -2, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 14 }}
                  >
                    {showPw ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                  </button>
                </div>
                {errors.password && <ErrorText>{t(errors.password)}</ErrorText>}
              </div>

              {isRegister && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={fieldLabel}>{t('CONFIRM PASSWORD')}</label>
                  <input
                    className={fieldClass}
                    type={showPw ? 'text' : 'password'}
                    style={{ ...fieldBox, borderColor: errors.confirm ? 'rgba(255,120,120,0.6)' : 'rgba(255,255,255,0.11)' }}
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={(e) => update('confirm', e.target.value)}
                  />
                  {errors.confirm && <ErrorText>{t(errors.confirm)}</ErrorText>}
                </div>
              )}

              {!isRegister && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -4 }}>
                  <span className="font-body max-lg:py-3.5 max-lg:-my-3.5 max-lg:px-2 max-lg:-mx-2" style={{ fontSize: 13, color: '#8E9FC0', cursor: 'pointer' }}>
                    {t('Forgot password?')}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="font-body font-semibold"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', background: '#fff', color: '#000', fontSize: 15,
                  padding: '14px 0', borderRadius: 10, border: 'none',
                  cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1,
                  boxShadow: '0 6px 24px rgba(255,255,255,0.13)', marginTop: 4,
                }}
              >
                {loading ? t('Please wait…') : isRegister ? t('Create account') : t('Sign in')}
                {!loading && <ArrowRight style={{ width: 16, height: 16 }} />}
              </button>
            </form>

            <p className="font-body" style={{ fontSize: 14, color: '#8E9FC0', textAlign: 'center', marginTop: 24 }}>
              {isRegister ? t('Already have an account? ') : t("Don't have an account? ")}
              <Link href={isRegister ? '/login' : '/register'} className="max-lg:inline-block max-lg:p-3 max-lg:-m-3" style={{ color: '#fff', fontWeight: 500 }}>
                {isRegister ? t('Sign in') : t('Sign up')}
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </section>
  )
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-body" style={{ fontSize: 12.5, color: 'rgb(255,140,140)' }}>
      {children}
    </span>
  )
}
