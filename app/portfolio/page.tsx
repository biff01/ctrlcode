import PortfolioDesign from '@/components/PortfolioDesign'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Work — Ctrl Code',
  description: 'A collection of products, platforms, and digital systems built with clarity, speed, and purpose.',
}

export default function Portfolio() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <PortfolioDesign />
      <Footer />
    </main>
  )
}
