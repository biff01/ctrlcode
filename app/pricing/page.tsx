import PricingHero from '@/components/PricingHero'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function PricingPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <PricingHero />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
