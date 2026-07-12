'use client'

import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import NewsletterForm from './NewsletterForm'
import { useLang } from './LanguageProvider'

function LinkedinIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const IconInstagram = ({ size = 16 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const IconTelegram = ({ size = 16 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

const IconYoutube = ({ size = 16 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)

const NAV_LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Services',  href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Price',     href: '/pricing' },
  { label: 'Security',  href: '/security' },
  { label: 'Contact',   href: '/contact' },
]

const SOCIAL = [
  { icon: <Mail aria-hidden={true} style={{ width: 16, height: 16 }} />, href: 'mailto:info@ctrlcode.uz', label: 'Email' },
  { icon: <LinkedinIcon />, href: 'https://www.linkedin.com/', label: 'LinkedIn' },
  { icon: <IconInstagram size={16} />, href: 'https://instagram.com/', label: 'Instagram' },
  { icon: <IconTelegram size={16} />, href: 'https://t.me/ctrlcode', label: 'Telegram' },
  { icon: <IconYoutube size={16} />, href: 'https://youtube.com/', label: 'YouTube' },
]

const MotionLink = motion(Link)

const footerStyle = {
  background: 'var(--footer-bg)',
  borderRadius: 'var(--footer-radius)',
  position: 'relative' as const,
  overflow: 'hidden' as const,
  margin: '0 16px 16px',
  boxShadow: 'var(--footer-shadow)',
}

const containerStyle = {
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 clamp(24px, 4vw, 40px)',
  display: 'flex' as const,
  flexDirection: 'column' as const,
}

const ctaSectionStyle = {
  padding: 'clamp(32px, 6vw, 56px) 0 clamp(24px, 4vw, 48px)',
  display: 'flex' as const,
  flexDirection: 'column' as const,
  gap: 'clamp(12px, 3vw, 24px)',
}

const ctaHeadingStyle = {
  fontSize: 'clamp(24px, 6.5vw, 58px)',
  letterSpacing: 'clamp(-1.2px, -0.24vw, -0.9px)',
  lineHeight: 1.1,
  color: 'var(--footer-heading)',
  margin: 0,
}

const ctaButtonStyle = {
  background: 'var(--footer-btn-bg)',
  color: 'var(--footer-btn-color)',
  fontSize: 14,
  padding: '12px 24px',
  borderRadius: 8,
  textDecoration: 'none' as const,
}

const ctaArrowStyle = {
  width: 14,
  height: 14,
  transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1)',
}

const ctaInnerStyle = {
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  gap: 6,
}

const desktopColumnsStyle = {
  justifyContent: 'space-between' as const,
  gap: 32,
  paddingBottom: 48,
}

const newsletterColumnStyle = {
  minWidth: 200,
  maxWidth: 300,
  display: 'flex' as const,
  flexDirection: 'column' as const,
  gap: 12,
}

const newsletterDescStyle = {
  fontSize: 13,
  lineHeight: 1.6,
  color: 'var(--footer-text)',
  margin: 0,
}

const columnLabelStyle = {
  fontSize: 14,
  color: 'var(--footer-heading)',
}

const pagesColumnStyle = {
  display: 'flex' as const,
  flexDirection: 'column' as const,
  gap: 12,
  minWidth: 0,
}

const navLinkStyle = {
  fontSize: 14,
  color: 'var(--footer-link)',
  textDecoration: 'none' as const,
}

const contactColumnStyle = {
  display: 'flex' as const,
  flexDirection: 'column' as const,
  gap: 12,
  minWidth: 0,
}

const contactLinkStyle = {
  fontSize: 14,
  color: 'var(--footer-link)',
  textDecoration: 'none' as const,
}

const desktopSocialRowStyle = {
  display: 'flex' as const,
  gap: 8,
  marginTop: 8,
}

const desktopSocialIconStyle = {
  width: 44,
  height: 44,
  borderRadius: 8,
  background: 'var(--footer-social-bg)',
  display: 'flex' as const,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  color: 'var(--footer-social-icon)',
}

const mobileCompactStyle = {
  paddingBottom: 24,
  gap: 20,
}

const mobileNewsletterStyle = {
  display: 'flex' as const,
  flexDirection: 'column' as const,
  gap: 8,
}

const mobileNavLinksStyle = {
  display: 'flex' as const,
  flexWrap: 'wrap' as const,
  gap: '8px 24px',
}

const mobileSocialRowStyle = {
  display: 'flex' as const,
  gap: 8,
  flexWrap: 'wrap' as const,
}

const mobileSocialIconStyle = {
  width: 44,
  height: 44,
  borderRadius: 8,
  background: 'var(--footer-social-bg)',
  display: 'flex' as const,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  color: 'var(--footer-social-icon)',
}

const mobileContactLinkStyle = {
  fontSize: 13,
  color: 'var(--footer-link)',
  textDecoration: 'none' as const,
}

const copyrightBarStyle = {
  borderTop: '1px solid var(--footer-divider)',
  padding: '16px 0',
  display: 'flex' as const,
  justifyContent: 'space-between' as const,
  alignItems: 'center' as const,
  flexWrap: 'wrap' as const,
  gap: 8,
}

const copyrightTextStyle = {
  fontSize: 13,
  color: 'var(--footer-muted)',
}

const legalLinksRowStyle = {
  display: 'flex' as const,
  gap: 16,
}

const legalLinkStyle = {
  fontSize: 13,
  color: 'var(--footer-muted)',
  textDecoration: 'none' as const,
}

const revealTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
const revealTransitionBtn = { duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }

export default function Footer() {
  const { t } = useLang()
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* ── Top CTA ── */}
        <div style={ctaSectionStyle}>
          <motion.h2
            className="font-display font-semibold"
            style={ctaHeadingStyle}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={revealTransition}
          >
            {t('Ready to start building')}<br />{t('your next product?')}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={revealTransitionBtn}
            style={{ display: 'flex' }}
            className="max-md:self-stretch"
          >
            <MotionLink
              href="/contact"
              className="self-start max-md:self-stretch max-md:text-center font-body font-medium btn-lift press"
              style={ctaButtonStyle}
            >
              <span style={ctaInnerStyle}>
                {t('Contact us')}
                <ArrowRight className="cta-arrow" style={ctaArrowStyle} />
              </span>
            </MotionLink>
          </motion.div>
        </div>

        {/* ── Desktop columns (md+) ── */}
        <div
          className="max-md:hidden md:flex"
          style={desktopColumnsStyle}
        >
          {/* Newsletter */}
          <motion.div
            style={newsletterColumnStyle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-display font-semibold" style={columnLabelStyle}>
              {t('Newsletter')}
            </span>
            <p className="font-body" style={newsletterDescStyle}>
              {t('Monthly insights on design, code, and what we are building — delivered once a month.')}
            </p>
            <NewsletterForm />
          </motion.div>

          {/* Pages */}
          <motion.div
            style={pagesColumnStyle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-display font-semibold" style={columnLabelStyle}>
              {t('Pages')}
            </span>
            {NAV_LINKS.map(({ label, href }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={href}
                  className="font-body nav-link"
                  style={navLinkStyle}
                >
                  {t(label)}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact */}
          <motion.div
            style={contactColumnStyle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-display font-semibold" style={columnLabelStyle}>
              {t('Contact')}
            </span>
            <a href="mailto:info@ctrlcode.uz" className="font-body nav-link" style={contactLinkStyle}>
              info@ctrlcode.uz
            </a>
            <a href="tel:+998770007878" className="font-body nav-link" style={contactLinkStyle}>
              +998 77 000 78 78
            </a>
            <div style={desktopSocialRowStyle}>
              {SOCIAL.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={t(label)}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="btn-lift press"
                  style={desktopSocialIconStyle}
                >
                  <span className="social-icon-inner">{icon}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Mobile compact bottom (below md) ── */}
        <div
          className="md:hidden flex flex-col"
          style={mobileCompactStyle}
        >
          {/* Nav links — compact horizontal wrap */}
          <div style={mobileNavLinksStyle}>
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-body nav-link"
                style={{ fontSize: 13, color: 'var(--footer-link)', textDecoration: 'none' }}
              >
                {t(label)}
              </Link>
            ))}
          </div>

          {/* Newsletter on mobile */}
          <div style={mobileNewsletterStyle}>
            <span className="font-display font-semibold" style={columnLabelStyle}>
              {t('Newsletter')}
            </span>
            <NewsletterForm />
          </div>

          {/* Social icons */}
          <div style={mobileSocialRowStyle}>
            {SOCIAL.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={t(label)}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="btn-lift press"
                style={mobileSocialIconStyle}
              >
                <span className="social-icon-inner">{icon}</span>
              </a>
            ))}
          </div>

          {/* Phone contact on mobile */}
          <a href="tel:+998770007878" className="font-body nav-link" style={mobileContactLinkStyle}>
            +998 77 000 78 78
          </a>
        </div>

        {/* ── Copyright ── */}
        <div style={copyrightBarStyle}>
          <span className="font-body" style={copyrightTextStyle}>
            © {new Date().getFullYear()} Ctrl Code. {t('All rights reserved.')}
          </span>
          <div style={legalLinksRowStyle}>
            <Link href="/privacy" className="font-body nav-link" style={legalLinkStyle}>{t('Privacy')}</Link>
            <Link href="/terms" className="font-body nav-link" style={legalLinkStyle}>{t('Terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
