// pages/ortu-login.js
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function OrtuLogin() {
  const [nisn, setNisn] = useState('')
  const [dob, setDob] = useState('')
  const [message, setMessage] = useState('')
  const [siswa, setSiswa] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    setMessage('Mencari data...')
    setSiswa(null)

    const { data, error } = await supabase
      .from('siswa')
      .select('*')
      .eq('nisn', nisn)
      .eq('tanggal_lahir', dob)
      .single()

    if (error || !data) {
      setMessage('Data tidak ditemukan. Periksa NISN dan tanggal lahir.')
    } else {
      setSiswa(data)
      setMessage('')
    }
  }

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Login Orang Tua</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>NISN:</label><br />
          <input value={nisn} onChange={(e) => setNisn(e.target.value)} required />
        </div>
        <div>
          <label>Tanggal Lahir (format: YYYY-MM-DD):</label><br />
          <input value={dob} onChange={(e) => setDob(e.target.value)} required />
        </div>
        <button type="submit">Lihat Raport</button>
      </form>

      {message && <p>{message}</p>}

      {siswa && (
        <div style={{ marginTop: 20 }}>
          <h3>Data Siswa</h3>
          <p><strong>Nama:</strong> {siswa.nama}</p>
          <p><strong>Kelas:</strong> {siswa.kelas}</p>
          <p><strong>Tahun Ajaran:</strong> {siswa.tahun_ajaran}</p>
          <a href="/preview" style={{ color: 'blue' }}>Lihat / Unduh Raport</a>
        </div>
      )}
    </main>
  )
}
