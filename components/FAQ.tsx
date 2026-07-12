'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLang } from './LanguageProvider'

const FAQS = [
  {
    q: 'How do payments work?',
    a: '50% to start, 50% on delivery. Larger projects are split into milestone payments tied to demos you can actually see.',
  },
  {
    q: 'Do you provide support after launch?',
    a: 'Yes — every plan includes 30 days of free support. Ongoing care plans with monitoring and updates start at $200/mo.',
  },
  {
    q: 'Can you take over an existing project?',
    a: 'We start with a code and infrastructure audit, then propose an honest fix-or-rebuild plan with estimates for both.',
  },
  {
    q: 'How fast can we start?',
    a: 'Discovery call this week; the first sprint usually kicks off within 7–10 days of signing.',
  },
  {
    q: 'Do you sign NDAs and contracts?',
    a: 'Always. As an official IT Park Uzbekistan resident we work with formal contracts and e-invoicing.',
  },
]

const ROW_STYLE = { padding: '24px 0', borderTop: '1px solid var(--faq-border)' } as const

export default function FAQ() {
  const { t } = useLang()
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const listVisible = useInView(listRef, { once: true, margin: '-40px' })

  return (
    <section aria-labelledby="faq-heading" style={{ background: 'var(--bg)' }}>
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: 'clamp(64px, 9vw, 96px) 24px clamp(64px, 12vw, 112px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(32px, 6vw, 40px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <span className="font-mono" style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--kicker)' }}>
            {t('FAQ')}
          </span>
          <h2
            id="faq-heading"
            className="font-display font-semibold"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.03em', color: 'var(--text-primary)', margin: 0 }}
          >
            {t('Questions, answered.')}
          </h2>
        </motion.div>

        <div
          ref={listRef}
          style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--faq-border)' }}
        >
          {FAQS.map((item, idx) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              animate={listVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.09, ease: [0.22, 1, 0.36, 1] }}
              style={ROW_STYLE}
            >
              <motion.button
                aria-expanded={openIdx === idx}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                whileHover={{ x: 3, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
                whileTap={{ scale: 0.99 }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                  borderRadius: 4,
                }}
              >
                <h3
                  className="font-display md:min-w-[260px] md:max-w-[380px]"
                  style={{
                    flexShrink: 0,
                    fontSize: 'clamp(16px, 1.5vw, 20px)',
                    fontWeight: 600,
                    letterSpacing: -0.2,
                    lineHeight: 1.4,
                    color: 'var(--text-primary)',
                    margin: 0,
                  }}
                >
                  {t(item.q)}
                </h3>
                <motion.div
                  animate={{ rotate: openIdx === idx ? 180 : 0 }}
                  transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                  style={{ color: 'var(--text-secondary)', flexShrink: 0 }}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </motion.button>
              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      default: { ease: [0.4, 0, 0.2, 1], duration: 0.32 },
                      height: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.22, ease: 'linear', delay: 0.06 },
                    }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      className="font-body"
                      style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0, paddingTop: 12 }}
                    >
                      {t(item.a)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
