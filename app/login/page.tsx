import AuthForm from '@/components/AuthForm'
import Footer from '@/components/Footer'

export default function LoginPage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <AuthForm mode="login" />
      <Footer />
    </main>
  )
}
