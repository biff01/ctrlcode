import ContactHero from '@/components/ContactHero'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <ContactHero />
      <ContactForm />
      <Footer />
    </main>
  )
}
