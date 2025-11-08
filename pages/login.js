// pages/login.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Email atau password salah.')
      setLoading(false)
      return
    }

    // ambil profile user dari tabel profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, kelas')
      .eq('id', data.user.id)
      .single()

    if (profile) {
      localStorage.setItem('role', profile.role)
      localStorage.setItem('kelas', profile.kelas || '')
      if (profile.role === 'admin') router.push('/dashboard')
      else if (profile.role === 'guru') router.push('/dashboard')
      else router.push('/')
    } else {
      setError('Profil pengguna tidak ditemukan.')
    }
    setLoading(false)
  }

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Login Guru / Admin</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Masuk...' : 'Login'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <hr />
      <p>👨‍👩‍👧 Untuk Orang Tua, klik di bawah ini:</p>
      <a href="/ortu-login">➡️ Login Orang Tua (pakai NISN & Tanggal Lahir)</a>
    </main>
  )
}
