'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Clock4, ChevronDown, ArrowRight, Check } from 'lucide-react'
import { useLang } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

const INFO = [
  { icon: Mail, label: 'EMAIL', value: 'info@ctrlcode.uz', href: 'mailto:info@ctrlcode.uz' },
  { icon: Phone, label: 'PHONE', value: '+998 77 000 78 78', href: 'tel:+998770007878' },
  { icon: MapPin, label: 'OFFICE', value: 'Tashkent, Shahribod 50', href: null },
  { icon: Clock4, label: 'HOURS', value: 'Mon–Sat, 10:00 – 19:00', href: null },
]

const SERVICES = ['Web development', 'Mobile app', 'CRM system', 'AI product', 'Branding & design', 'Other']
const BUDGETS = ['$1,500 – $3,500', '$3,500 – $7,000', '$7,000 – $15,000', '$15,000+']

// Field box shared style (design: #0A0A0C bg, #FFFFFF1C border, r10, 13/16 padding)
// padding/fontSize live in fieldClass so mobile can go 16px text / 48px+ tall while desktop stays 14px / 13px pad
const fieldBox: React.CSSProperties = {
  width: '100%',
  borderRadius: 10,
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
  outline: 'none',
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const found = validate()
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }
    setSent(true)
  }

  return (
    <section style={{ background: 'var(--bg)', paddingBottom: 'clamp(64px, 12vw, 104px)' }}>
      {/* placeholder color to match design */}
      <style>{`.cf-field::placeholder{color:var(--text-tertiary);opacity:1}`}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '8px clamp(20px, 5vw, 24px) 0' }}>
        {/* stacks below lg: form first, info + 3D shape after */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-[72px]">
          {/* Left — Contact Info (node fVH7O) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[420px] order-2 lg:order-1"
            style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 28 }}
          >
            {INFO.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div
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
                    <Icon style={{ width: 19, height: 19, color: 'var(--text-primary)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={fieldLabel}>{t(label)}</span>
                    <span className="font-body" style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-primary)' }}>
                      {t(value)}
                    </span>
                  </div>
                </div>
              )
              return href ? (
                <a key={label} href={href} style={{ textDecoration: 'none' }}>
                  {inner}
                </a>
              ) : (
                <div key={label}>{inner}</div>
              )
            })}

            {/* 3D Contact Shape */}
            <div
              className="h-[240px] lg:h-[300px]"
              style={{
                width: '100%',
                borderRadius: 18,
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                backgroundImage: 'url(/contact-3d.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </motion.div>

          {/* Right — Contact Form (node Gzq51) */}
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
              borderRadius: 18,
              background: 'var(--featured-card)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {sent ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 16,
                  padding: '40px 0',
                }}
              >
                <div
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
                  <Check style={{ width: 26, height: 26, color: 'var(--text-primary)' }} />
                </div>
                <h3
                  className="font-display"
                  style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.6, color: 'var(--text-primary)', margin: 0 }}
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
                  className="font-body font-medium px-[22px] py-3.5 lg:py-[11px]"
                  style={{
                    marginTop: 8,
                    borderRadius: 10,
                    background: 'var(--pill-bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  {t('Send another request')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <h2
                  className="font-display"
                  style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5, color: 'var(--text-primary)', margin: 0 }}
                >
                  {t('Start your project')}
                </h2>

                {/* Name Row — single column on mobile */}
                <div className="flex flex-col md:flex-row" style={{ gap: 16 }}>
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={fieldLabel}>{t('YOUR NAME')}</label>
                    <input
                      className={fieldClass}
                      style={{ ...fieldBox, borderColor: errors.name ? 'rgba(255,120,120,0.6)' : 'var(--border)' }}
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                    />
                    {errors.name && <ErrorText>{t(errors.name)}</ErrorText>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={fieldLabel}>{t('PHONE OR TELEGRAM')}</label>
                    <input
                      className={fieldClass}
                      style={{ ...fieldBox, borderColor: errors.phone ? 'rgba(255,120,120,0.6)' : 'var(--border)' }}
                      placeholder="+998 __ ___ __ __"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                    />
                    {errors.phone && <ErrorText>{t(errors.phone)}</ErrorText>}
                  </div>
                </div>

                {/* Service */}
                <SelectField
                  label={t('SERVICE')}
                  placeholder={t('Web development')}
                  options={SERVICES}
                  value={form.service}
                  onChange={(v) => update('service', v)}
                />

                {/* Budget */}
                <SelectField
                  label={t('BUDGET')}
                  placeholder="$1,500 – $3,500"
                  options={BUDGETS}
                  value={form.budget}
                  onChange={(v) => update('budget', v)}
                />

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={fieldLabel}>{t('ABOUT YOUR PROJECT')}</label>
                  <textarea
                    className={fieldClass}
                    style={{
                      ...fieldBox,
                      height: 110,
                      resize: 'vertical',
                      lineHeight: 1.55,
                      borderColor: errors.message ? 'rgba(255,120,120,0.6)' : 'var(--border)',
                    }}
                    placeholder={t('A few sentences about your idea, timeline and goals…')}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                  />
                  {errors.message && <ErrorText>{t(errors.message)}</ErrorText>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="font-body"
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
                    borderRadius: 10,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 6px 24px rgba(255,255,255,0.13)',
                  }}
                >
                  {t('Send request')}
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </button>

                {/* Note */}
                <p
                  className="font-body"
                  style={{ fontSize: 12.5, color: 'var(--text-tertiary)', textAlign: 'center', margin: 0 }}
                >
                  {t('Free consultation · NDA on request · Reply within 24 hours')}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SelectField({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  const { t } = useLang()
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const ACCENT = '#3B5CE4'
  const optText = dark ? '#f4f4f7' : '#0D1B4B'
  const hoverBg = dark ? 'rgba(255,255,255,0.06)' : 'rgba(13,27,75,0.05)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={fieldLabel}>{label}</label>
      <div ref={ref} style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={fieldClass}
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
            boxShadow: open ? `0 0 0 3px rgba(59,92,228,0.15)` : 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {value ? t(value) : placeholder}
          </span>
          <ChevronDown
            style={{
              width: 15,
              height: 15,
              flexShrink: 0,
              color: 'var(--text-tertiary)',
              transform: open ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.22s ease',
            }}
          />
        </button>

        {open && (
          <div
            role="listbox"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              zIndex: 40,
              borderRadius: 12,
              background: dark ? 'rgba(20,20,26,0.92)' : 'rgba(255,255,255,0.96)',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(13,27,75,0.1)'}`,
              boxShadow: '0 20px 56px rgba(0,0,0,0.45), 0 6px 16px rgba(0,0,0,0.3)',
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
            {options.map((o) => {
              const selected = o === value
              return (
                <button
                  key={o}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(o)
                    setOpen(false)
                  }}
                  onMouseEnter={(e) => {
                    if (!selected) e.currentTarget.style.background = hoverBg
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) e.currentTarget.style.background = 'transparent'
                  }}
                  className="px-3.5 py-[13px] lg:py-[11px] text-[15px] lg:text-[14px]"
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
                    color: selected ? '#ffffff' : optText,
                    background: selected ? ACCENT : 'transparent',
                    transition: 'background 0.15s ease',
                  }}
                >
                  {t(o)}
                  {selected && <Check style={{ width: 15, height: 15, flexShrink: 0 }} />}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-body" style={{ fontSize: 12, color: 'rgb(255,140,140)', display: 'block' }}>
      {children}
    </span>
  )
}
