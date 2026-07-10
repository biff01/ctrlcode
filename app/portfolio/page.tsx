import PortfolioPageClient from '@/components/PortfolioPageClient'
import FeaturedCaseStudy from '@/components/FeaturedCaseStudy'
import WorkShowcase from '@/components/WorkShowcase'
import BookACall from '@/components/BookACall'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Portfolio — Ctrl Code',
  description: 'Browse 48+ projects across web, mobile, SaaS, and brand design built by Ctrl Code.',
}

export default function Portfolio() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <PortfolioPageClient />
      <FeaturedCaseStudy />
      <WorkShowcase />
      <BookACall />
      <FinalCTA />
      <Footer />
    </main>
  )
}
