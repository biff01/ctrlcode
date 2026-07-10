import AuthForm from '@/components/AuthForm'
import Footer from '@/components/Footer'

export default function RegisterPage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <AuthForm mode="register" />
      <Footer />
    </main>
  )
}
