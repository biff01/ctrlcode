import ShopClient from '@/components/ShopClient'
import Footer from '@/components/Footer'

export default function ShopPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <ShopClient />
      <Footer />
    </main>
  )
}
