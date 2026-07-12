import AuthForm from '@/components/AuthForm'
import Footer from '@/components/Footer'

export default function RegisterPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <AuthForm mode="register" />
      <Footer />
    </main>
  )
}
