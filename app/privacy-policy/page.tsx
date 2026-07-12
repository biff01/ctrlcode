import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy — Ctrl Code',
  description: 'Learn how Ctrl Code collects, uses, and protects your personal information.',
}

export default function PrivacyPolicy() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section
        style={{
          background: 'var(--section-alt)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: 'clamp(72px, 10vw, 120px) 0 clamp(48px, 6vw, 72px)',
        }}
      >
        <div
          className="max-lg:px-6"
          style={{ maxWidth: 800, margin: '0 auto' }}
        >
          <span
            className="font-mono"
            style={{
              display: 'block',
              fontSize: 11,
              letterSpacing: 2,
              color: 'var(--text-tertiary)',
              marginBottom: 16,
              textTransform: 'uppercase',
            }}
          >
            Legal
          </span>
          <h1
            className="font-display font-semibold"
            style={{
              fontSize: 'clamp(36px, 6vw, 56px)',
              letterSpacing: 'clamp(-2px, -0.25vw, -1px)',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              margin: '0 0 20px',
            }}
          >
            Privacy Policy
          </h1>
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(15px, 1.4vw, 17px)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              maxWidth: 580,
              margin: 0,
            }}
          >
            This policy explains what information we collect, how we use it, and the choices you have regarding your data.
          </p>
          <p
            className="font-mono"
            style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              marginTop: 24,
              marginBottom: 0,
            }}
          >
            Last updated: July 2026
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section
        style={{
          padding: 'clamp(48px, 7vw, 80px) 0 clamp(64px, 9vw, 96px)',
        }}
      >
        <div
          className="max-lg:px-6"
          style={{ maxWidth: 800, margin: '0 auto' }}
        >
          {/* Section styles reused via inline style objects */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 5vw, 56px)' }}>

            {/* 1. Introduction */}
            <div>
              <h2
                className="font-display font-semibold"
                style={{
                  fontSize: 'clamp(20px, 2.4vw, 26px)',
                  color: 'var(--text-primary)',
                  letterSpacing: -0.3,
                  marginBottom: 16,
                }}
              >
                1. Introduction
              </h2>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', margin: 0 }}
              >
                Ctrl Code (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at ctrlcode.uz or contact us about our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of the site.
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border-subtle)' }} />

            {/* 2. Information We Collect */}
            <div>
              <h2
                className="font-display font-semibold"
                style={{
                  fontSize: 'clamp(20px, 2.4vw, 26px)',
                  color: 'var(--text-primary)',
                  letterSpacing: -0.3,
                  marginBottom: 16,
                }}
              >
                2. Information We Collect
              </h2>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: 16 }}
              >
                We may collect the following types of personal information when you interact with us:
              </p>
              <ul
                className="font-body"
                style={{
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: 'var(--text-secondary)',
                  margin: 0,
                  paddingLeft: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <li><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Contact details</strong> — your name, email address, and phone number submitted via our contact or enquiry forms.</li>
                <li><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Project information</strong> — details about your business, project scope, budget range, and timeline that you share with us voluntarily.</li>
                <li><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Technical data</strong> — IP address, browser type, device identifiers, and pages visited, collected automatically when you browse our site.</li>
                <li><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Communications</strong> — the content of emails or messages you send to us.</li>
              </ul>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', margin: '16px 0 0' }}
              >
                We do not knowingly collect information from children under the age of 16. If you believe a child has provided us with personal data, please contact us so we can delete it.
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border-subtle)' }} />

            {/* 3. How We Use Your Information */}
            <div>
              <h2
                className="font-display font-semibold"
                style={{
                  fontSize: 'clamp(20px, 2.4vw, 26px)',
                  color: 'var(--text-primary)',
                  letterSpacing: -0.3,
                  marginBottom: 16,
                }}
              >
                3. How We Use Your Information
              </h2>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: 16 }}
              >
                The information we collect is used to:
              </p>
              <ul
                className="font-body"
                style={{
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: 'var(--text-secondary)',
                  margin: 0,
                  paddingLeft: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <li>Respond to your enquiries, proposals, and consultation requests.</li>
                <li>Deliver, manage, and improve the services we provide to you.</li>
                <li>Send project updates, invoices, and support communications.</li>
                <li>Send our newsletter if you have subscribed (you may unsubscribe at any time).</li>
                <li>Analyse website usage to improve performance, content, and user experience.</li>
                <li>Comply with applicable legal obligations.</li>
              </ul>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', margin: '16px 0 0' }}
              >
                We will never sell your personal data to third parties or use it for purposes incompatible with those stated above.
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border-subtle)' }} />

            {/* 4. Cookies and Analytics */}
            <div>
              <h2
                className="font-display font-semibold"
                style={{
                  fontSize: 'clamp(20px, 2.4vw, 26px)',
                  color: 'var(--text-primary)',
                  letterSpacing: -0.3,
                  marginBottom: 16,
                }}
              >
                4. Cookies and Analytics
              </h2>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: 16 }}
              >
                Our website uses the following types of cookies:
              </p>
              <ul
                className="font-body"
                style={{
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: 'var(--text-secondary)',
                  margin: 0,
                  paddingLeft: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <li><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Necessary cookies</strong> — required for the site to function, such as remembering your language and theme preference. These cannot be disabled.</li>
                <li><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Analytics cookies</strong> — we use Google Analytics to understand how visitors interact with the site. Data is aggregated and anonymised where possible. You may opt out via your browser settings or Google&apos;s opt-out tools.</li>
              </ul>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', margin: '16px 0 0' }}
              >
                You can control cookies through your browser preferences. Disabling certain cookies may affect the functionality of the site.
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border-subtle)' }} />

            {/* 5. Third-Party Services */}
            <div>
              <h2
                className="font-display font-semibold"
                style={{
                  fontSize: 'clamp(20px, 2.4vw, 26px)',
                  color: 'var(--text-primary)',
                  letterSpacing: -0.3,
                  marginBottom: 16,
                }}
              >
                5. Third-Party Services
              </h2>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: 16 }}
              >
                We rely on trusted third-party providers to operate our website and deliver our services. These may include:
              </p>
              <ul
                className="font-body"
                style={{
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: 'var(--text-secondary)',
                  margin: 0,
                  paddingLeft: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <li><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Hosting providers</strong> — our infrastructure is hosted on cloud platforms that may process data on our behalf under strict data processing agreements.</li>
                <li><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Analytics</strong> — Google Analytics (Alphabet Inc.) processes anonymised usage data under their own privacy policy.</li>
                <li><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Email services</strong> — we may use transactional email providers to deliver notifications and newsletters.</li>
              </ul>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', margin: '16px 0 0' }}
              >
                All third-party providers are selected for compliance with applicable data protection laws and are contractually bound to handle your data securely.
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border-subtle)' }} />

            {/* 6. Data Security */}
            <div>
              <h2
                className="font-display font-semibold"
                style={{
                  fontSize: 'clamp(20px, 2.4vw, 26px)',
                  color: 'var(--text-primary)',
                  letterSpacing: -0.3,
                  marginBottom: 16,
                }}
              >
                6. Data Security
              </h2>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', margin: 0 }}
              >
                We implement industry-standard technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These include encrypted data transmission (TLS), access controls, and regular security reviews. While we take every reasonable precaution, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border-subtle)' }} />

            {/* 7. Your Rights */}
            <div>
              <h2
                className="font-display font-semibold"
                style={{
                  fontSize: 'clamp(20px, 2.4vw, 26px)',
                  color: 'var(--text-primary)',
                  letterSpacing: -0.3,
                  marginBottom: 16,
                }}
              >
                7. Your Rights
              </h2>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: 16 }}
              >
                Under the General Data Protection Regulation (GDPR) and applicable local laws, you have the following rights regarding your personal data:
              </p>
              <ul
                className="font-body"
                style={{
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: 'var(--text-secondary)',
                  margin: 0,
                  paddingLeft: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <li><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Right of access</strong> — request a copy of the personal data we hold about you.</li>
                <li><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Right to rectification</strong> — ask us to correct inaccurate or incomplete data.</li>
                <li><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Right to erasure</strong> — request that we delete your personal data where there is no lawful basis for retaining it.</li>
                <li><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Right to data portability</strong> — receive your data in a structured, machine-readable format.</li>
                <li><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Right to restrict processing</strong> — ask us to pause the processing of your data in certain circumstances.</li>
                <li><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Right to object</strong> — object to the processing of your data for direct marketing or where we rely on legitimate interests.</li>
              </ul>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', margin: '16px 0 0' }}
              >
                To exercise any of these rights, please contact us at the address below. We will respond within 30 days. You also have the right to lodge a complaint with your local data protection authority.
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border-subtle)' }} />

            {/* 8. Contact Information */}
            <div>
              <h2
                className="font-display font-semibold"
                style={{
                  fontSize: 'clamp(20px, 2.4vw, 26px)',
                  color: 'var(--text-primary)',
                  letterSpacing: -0.3,
                  marginBottom: 16,
                }}
              >
                8. Contact Information
              </h2>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: 16 }}
              >
                If you have any questions, requests, or concerns about this Privacy Policy or the way we handle your data, please contact us:
              </p>
              <div
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 12,
                  padding: 'clamp(20px, 3vw, 28px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <p className="font-body" style={{ fontSize: 15, color: 'var(--text-primary)', fontWeight: 600, margin: 0 }}>Ctrl Code</p>
                <p className="font-body" style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>IT Park Uzbekistan Resident</p>
                <a
                  href="mailto:info@ctrlcode.uz"
                  className="font-body"
                  style={{ fontSize: 14, color: 'var(--kicker)', textDecoration: 'none' }}
                >
                  info@ctrlcode.uz
                </a>
                <a
                  href="tel:+998770007878"
                  className="font-body"
                  style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}
                >
                  +998 77 000 78 78
                </a>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border-subtle)' }} />

            {/* 9. Changes to This Policy */}
            <div>
              <h2
                className="font-display font-semibold"
                style={{
                  fontSize: 'clamp(20px, 2.4vw, 26px)',
                  color: 'var(--text-primary)',
                  letterSpacing: -0.3,
                  marginBottom: 16,
                }}
              >
                9. Changes to This Policy
              </h2>
              <p
                className="font-body"
                style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', margin: 0 }}
              >
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we do, we will revise the &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review this policy periodically. Your continued use of our website after any changes constitutes acceptance of the revised policy.
              </p>
            </div>

            {/* Back link */}
            <div style={{ paddingTop: 8 }}>
              <Link
                href="/"
                className="font-body"
                style={{
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span aria-hidden="true" style={{ fontSize: 16 }}>&larr;</span>
                Back to homepage
              </Link>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
