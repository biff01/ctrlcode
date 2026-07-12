'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, MapPin, Phone, Clock4, ChevronDown, ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import { useLang } from './LanguageProvider'

const INFO = [
  { icon: Mail, label: 'EMAIL', value: 'info@ctrlcode.uz', href: 'mailto:info@ctrlcode.uz' },
  { icon: Phone, label: 'PHONE', value: '+998 77 000 78 78', href: 'tel:+998770007878' },
  { icon: MapPin, label: 'OFFICE', value: 'Tashkent, Shahribod 50', href: null },
  { icon: Clock4, label: 'HOURS', value: 'Mon–Sat, 10:00 – 19:00', href: null },
]

const SERVICES = ['Web development', 'Mobile app', 'CRM system', 'AI product', 'Branding & design', 'Other']
const BUDGETS = ['$1,500 – $3,500', '$3,500 – $7,000', '$7,000 – $15,000', '$15,000+']

const ACCENT = 'var(--accent, #3B5CE4)'

const fieldBox: React.CSSProperties = {
  width: '100%',
  borderRadius: 10,
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-inter)',
}

const fieldClass = 'cf-field px-4 py-[15px] lg:py-[13px] text-[16px] lg:text-[14px]'

const fieldLabel: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: 1,
  color: 'var(--text-tertiary)',
  fontFamily: 'var(--font-geist-mono)',
}

type Errors = Partial<Record<'name' | 'phone' | 'message', string>>

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', budget: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const { t } = useLang()

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field as keyof Errors]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function validate(): Errors {
    const next: Errors = {}
    if (!form.name.trim()) next.name = 'Please tell us your name.'
    if (!form.phone.trim()) next.phone = 'A phone or Telegram is required.'
    if (!form.message.trim()) next.message = 'Tell us a little about your project.'
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const found = validate()
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }
    setLoading(true)
    setSubmitError('')
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSent(true)
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={{ background: 'var(--bg)', paddingBottom: 'clamp(64px, 12vw, 104px)' }}>
      <style>{`
        .cf-field::placeholder{color:var(--text-tertiary);opacity:1}
        .cf-field{outline:none}
        .cf-field:focus{border-color:var(--accent,#3B5CE4)!important;box-shadow:0 0 0 3px rgba(59,92,228,0.15)!important;transition:border-color 0.2s cubic-bezier(0.4,0,0.2,1),box-shadow 0.2s cubic-bezier(0.4,0,0.2,1)}
        .cf-submit:disabled{opacity:.7;cursor:not-allowed}
        @keyframes cf-spin{to{transform:rotate(360deg)}}
        .info-icon-box{transition:transform 0.22s cubic-bezier(0.22,1,0.36,1),background 0.2s cubic-bezier(0.4,0,0.2,1)}
        .info-link:hover .info-icon-box{transform:scale(1.12);background:var(--pill-border)}
        .btn-arrow{display:flex;align-items:center;transition:transform 0.22s cubic-bezier(0.22,1,0.36,1)}
        .btn-lift:hover .btn-arrow{transform:translateX(4px)}
        .btn-lift:active .btn-arrow{transform:translateX(1px)}
        @keyframes img-reveal{from{opacity:0;filter:brightness(0.4)}to{opacity:1;filter:brightness(1)}}
        .contact-img-reveal{animation:img-reveal 0.9s ease 0.3s both;background-color:var(--border-subtle)}
        .cf-select-option:focus-visible{outline:none;box-shadow:0 0 0 2px var(--accent,#3B5CE4) inset}
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '8px clamp(20px, 5vw, 24px) 0' }}>
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-[72px]">
          {/* Left — Contact Info */}
          <div
            className="w-full lg:w-[420px] order-2 lg:order-1"
            style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 32 }}
          >
            {INFO.map(({ icon: Icon, label, value, href }, index) => {
              const inner = (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div
                    className="info-icon-box"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: 'var(--pill-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon aria-hidden="true" style={{ width: 19, height: 19, color: 'var(--text-primary)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={fieldLabel}>{t(label)}</span>
                    <span className="font-body" style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-primary)' }}>
                      {t(value)}
                    </span>
                  </div>
                </div>
              )
              return href ? (
                <motion.a
                  key={label}
                  href={href}
                  className="info-link nav-link"
                  style={{ textDecoration: 'none' }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                >
                  {inner}
                </motion.a>
              ) : (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                >
                  {inner}
                </motion.div>
              )
            })}

            {/* 3D Contact Shape */}
            <motion.div
              className="h-[240px] lg:h-[300px] contact-img-reveal"
              style={{
                width: '100%',
                borderRadius: 16,
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                position: 'relative',
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.36 }}
            >
              <Image src="/contact-3d.png" alt="" fill style={{ objectFit: 'cover' }} />
            </motion.div>
          </div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-full order-1 lg:order-2"
            style={{
              flex: 1,
              minWidth: 0,
              padding: 'clamp(20px, 5vw, 36px) clamp(20px, 5vw, 36px) clamp(24px, 6vw, 40px)',
              borderRadius: 16,
              background: 'var(--featured-card)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 16,
                    padding: '40px 0',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.15 }}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'var(--pill-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Check aria-hidden="true" style={{ width: 26, height: 26, color: 'var(--text-primary)' }} />
                  </motion.div>
                  <h3
                    className="font-display"
                    style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--text-primary)', margin: 0 }}
                  >
                    {t('Request received.')}
                  </h3>
                  <p className="font-body" style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 380, margin: 0 }}>
                    {t('Thanks,')} {form.name.split(' ')[0] || t('there')} {t("— we'll reply within 24 hours.")}
                  </p>
                  <button
                    onClick={() => {
                      setForm({ name: '', phone: '', service: '', budget: '', message: '' })
                      setSent(false)
                    }}
                    className="font-body font-medium px-[22px] py-3.5 lg:py-[11px] btn-fade press"
                    style={{
                      marginTop: 8,
                      borderRadius: 8,
                      background: 'var(--pill-bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      fontSize: 14,
                      cursor: 'pointer',
                    }}
                  >
                    {t('Send another request')}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  noValidate
                  style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                >
                  <motion.h2
                    className="font-display"
                    style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--text-primary)', margin: 0 }}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  >
                    {t('Start your project')}
                  </motion.h2>

                  {/* Name Row */}
                  <motion.div
                    className="flex flex-col md:flex-row"
                    style={{ gap: 16 }}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
                  >
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label htmlFor="cf-name" style={fieldLabel}>{t('YOUR NAME')}</label>
                      <input
                        id="cf-name"
                        className={fieldClass}
                        style={{ ...fieldBox, borderColor: errors.name ? 'var(--error-border, rgba(255,120,120,0.6))' : 'var(--border)' }}
                        placeholder={t('John Smith')}
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                      />
                      {errors.name && <ErrorText>{t(errors.name)}</ErrorText>}
                    </div>
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label htmlFor="cf-phone" style={fieldLabel}>{t('PHONE OR TELEGRAM')}</label>
                      <input
                        id="cf-phone"
                        type="tel"
                        className={fieldClass}
                        style={{ ...fieldBox, borderColor: errors.phone ? 'var(--error-border, rgba(255,120,120,0.6))' : 'var(--border)' }}
                        placeholder="+998 __ ___ __ __"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                      />
                      {errors.phone && <ErrorText>{t(errors.phone)}</ErrorText>}
                    </div>
                  </motion.div>

                  {/* Service */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.29 }}
                  >
                    <SelectField
                      id="cf-service"
                      label={t('SERVICE')}
                      placeholder={t('Web development')}
                      options={SERVICES}
                      value={form.service}
                      onChange={(v) => update('service', v)}
                    />
                  </motion.div>

                  {/* Budget */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.36 }}
                  >
                    <SelectField
                      id="cf-budget"
                      label={t('BUDGET')}
                      placeholder="$1,500 – $3,500"
                      options={BUDGETS}
                      value={form.budget}
                      onChange={(v) => update('budget', v)}
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.43 }}
                  >
                    <label htmlFor="cf-message" style={fieldLabel}>{t('ABOUT YOUR PROJECT')}</label>
                    <textarea
                      id="cf-message"
                      className={fieldClass}
                      style={{
                        ...fieldBox,
                        height: 110,
                        resize: 'vertical',
                        lineHeight: 1.55,
                        borderColor: errors.message ? 'var(--error-border, rgba(255,120,120,0.6))' : 'var(--border)',
                      }}
                      placeholder={t('A few sentences about your idea, timeline and goals…')}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                    />
                    {errors.message && <ErrorText>{t(errors.message)}</ErrorText>}
                  </motion.div>

                  {/* Submit */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                  >
                    <button
                      type="submit"
                      disabled={loading}
                      aria-busy={loading}
                      className="font-body btn-lift press cf-submit"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        width: '100%',
                        background: 'var(--btn-primary-bg)',
                        color: 'var(--btn-primary-color)',
                        fontSize: 15,
                        fontWeight: 600,
                        padding: '15px 0',
                        borderRadius: 8,
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: 'var(--btn-primary-shadow, none)',
                        opacity: loading ? 0.7 : 1,
                      }}
                    >
                      {loading ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          style={{ animation: 'cf-spin 0.75s linear infinite' }}
                          aria-hidden="true"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="28"
                            strokeDashoffset="10"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <>
                          {t('Send request')}
                          <span className="btn-arrow">
                            <ArrowRight aria-hidden="true" style={{ width: 16, height: 16 }} />
                          </span>
                        </>
                      )}
                    </button>
                  </motion.div>

                  {submitError && <ErrorText>{submitError}</ErrorText>}

                  {/* Note */}
                  <motion.p
                    className="font-body"
                    style={{ fontSize: 12, color: 'var(--text-tertiary)', textAlign: 'center', margin: 0 }}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.54 }}
                  >
                    {t('Free consultation · NDA on request · Reply within 24 hours')}
                  </motion.p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SelectField({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  id: string
  label: string
  placeholder: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [focusedIdx, setFocusedIdx] = useState(-1)
  const [hoveredOpt, setHoveredOpt] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function handleTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(true)
        setFocusedIdx(0)
        setTimeout(() => optionRefs.current[0]?.focus(), 0)
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.min(focusedIdx + 1, options.length - 1)
      setFocusedIdx(next)
      optionRefs.current[next]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = Math.max(focusedIdx - 1, 0)
      setFocusedIdx(prev)
      optionRefs.current[prev]?.focus()
    } else if (e.key === 'Escape') {
      setOpen(false)
      triggerRef.current?.focus()
    }
  }

  function handleOptionKeyDown(e: React.KeyboardEvent<HTMLDivElement>, i: number, o: string) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.min(i + 1, options.length - 1)
      setFocusedIdx(next)
      optionRefs.current[next]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (i === 0) {
        triggerRef.current?.focus()
      } else {
        const prev = i - 1
        setFocusedIdx(prev)
        optionRefs.current[prev]?.focus()
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onChange(o)
      setOpen(false)
      triggerRef.current?.focus()
    } else if (e.key === 'Escape') {
      setOpen(false)
      triggerRef.current?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      setFocusedIdx(0)
      optionRefs.current[0]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      const last = options.length - 1
      setFocusedIdx(last)
      optionRefs.current[last]?.focus()
    }
  }

  const labelId = `${id}-label`
  const listboxId = `${id}-listbox`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label id={labelId} htmlFor={id} style={fieldLabel}>{label}</label>
      <div ref={ref} style={{ position: 'relative' }}>
        <motion.button
          ref={triggerRef}
          id={id}
          type="button"
          onClick={() => {
            setOpen((o) => !o)
            if (!open) setFocusedIdx(-1)
          }}
          onKeyDown={handleTriggerKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={labelId}
          aria-controls={listboxId}
          className={fieldClass}
          whileTap={{ scale: 0.99 }}
          style={{
            ...fieldBox,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            cursor: 'pointer',
            textAlign: 'left',
            color: value ? 'var(--text-primary)' : 'var(--text-tertiary)',
            borderColor: open ? ACCENT : 'var(--border)',
            boxShadow: open ? '0 0 0 3px rgba(59,92,228,0.15)' : 'none',
            transition: 'border-color 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {value ? t(value) : placeholder}
          </span>
          <ChevronDown
            aria-hidden="true"
            style={{
              width: 15,
              height: 15,
              flexShrink: 0,
              color: 'var(--text-tertiary)',
              transform: open ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              id={listboxId}
              role="listbox"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                zIndex: 40,
                borderRadius: 12,
                transformOrigin: 'top',
                background: 'var(--surface-elevated, var(--card-bg, var(--featured-card)))',
                border: '1px solid var(--border)',
                boxShadow: 'var(--dropdown-shadow, 0 20px 56px rgba(0,0,0,0.45), 0 6px 16px rgba(0,0,0,0.3))',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                padding: 6,
                maxHeight: 264,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {options.map((o, i) => {
                const selected = o === value
                return (
                  <div
                    key={o}
                    ref={(el) => { optionRefs.current[i] = el }}
                    role="option"
                    aria-selected={selected}
                    tabIndex={-1}
                    onClick={() => {
                      onChange(o)
                      setOpen(false)
                      triggerRef.current?.focus()
                    }}
                    onKeyDown={(e) => handleOptionKeyDown(e, i, o)}
                    onMouseEnter={() => setHoveredOpt(o)}
                    onMouseLeave={() => setHoveredOpt(null)}
                    className="px-3.5 py-[13px] lg:py-[11px] text-[15px] lg:text-[14px] cf-select-option"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                      borderRadius: 8,
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-inter)',
                      textAlign: 'left',
                      color: selected ? 'var(--on-accent, #fff)' : 'var(--text-primary)',
                      background: selected
                        ? ACCENT
                        : hoveredOpt === o
                        ? 'var(--surface-hover, var(--pill-bg))'
                        : 'transparent',
                      transition: 'background 0.15s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  >
                    {t(o)}
                    {selected && <Check aria-hidden="true" style={{ width: 15, height: 15, flexShrink: 0 }} />}
                  </div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="font-body"
      style={{ fontSize: 12, color: 'var(--error-text, rgb(255,140,140))', display: 'block' }}
    >
      {children}
    </motion.span>
  )
}
