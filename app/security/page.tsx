import SecurityPage from '@/components/SecurityPage'
import ConsultStrip from '@/components/ConsultStrip'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Security — Ctrl Code',
  description: 'How Ctrl Code protects your data, your users, and your product with end-to-end security practices.',
}

export default function Security() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <SecurityPage />
      <ConsultStrip />
      <Footer />
    </main>
  )
}
