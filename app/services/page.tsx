import ServicesHero from '@/components/ServicesHero'
import ServiceBlocks from '@/components/ServiceBlocks'
import ConsultStrip from '@/components/ConsultStrip'
import Footer from '@/components/Footer'

export default function ServicesPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <ServicesHero />
      <ServiceBlocks />
      <ConsultStrip />
      <Footer />
    </main>
  )
}
