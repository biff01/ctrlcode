import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Work from '@/components/Work'
import Why from '@/components/Why'
import Pricing from '@/components/Pricing'
import BookACall from '@/components/BookACall'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Hero />
      <Services />
      <Work />
      <Why />
      <Pricing />
      <BookACall />
      <FinalCTA />
      <Footer />
    </main>
  )
}
