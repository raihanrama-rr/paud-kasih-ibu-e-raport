// pages/ortu-login.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function OrtuLogin() {
  const [nisn, setNisn] = useState('')
  const [dob, setDob] = useState('')
  const [message, setMessage] = useState('')
  const [siswa, setSiswa] = useState(null)
  const [tahunList, setTahunList] = useState([])
  const [semesterList, setSemesterList] = useState([])
  const [selectedTahun, setSelectedTahun] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('')

  // Ambil daftar tahun ajaran dan semester dari database
  useEffect(() => {
    const fetchData = async () => {
      const { data: tahunData } = await supabase.from('tahun_ajaran').select('*').order('id', { ascending: false })
      setTahunList(tahunData || [])

      const { data: semesterData } = await supabase.from('semester').select('*')
      setSemesterList(semesterData || [])
    }
    fetchData()
  }, [])

  // Cari data siswa berdasarkan NISN & tanggal lahir
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
      setMessage('❌ Data tidak ditemukan. Periksa NISN dan tanggal lahir.')
    } else {
      setSiswa(data)
      setMessage('')
    }
  }

  // Simulasi buka raport (sementara)
  const handlePreview = async () => {
    if (!selectedTahun || !selectedSemester) {
      alert('Pilih tahun ajaran dan semester terlebih dahulu!')
      return
    }

    alert(
      `Menampilkan raport untuk:\n\nNama: ${siswa.nama}\nKelas: ${siswa.kelas}\nTahun Ajaran: ${selectedTahun}\nSemester: ${selectedSemester}`
    )

    // nanti dihubungkan ke halaman /preview sesuai data
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
          <label>Tanggal Lahir (YYYY-MM-DD):</label><br />
          <input value={dob} onChange={(e) => setDob(e.target.value)} required />
        </div>
        <button type="submit">Cari Siswa</button>
      </form>

      {message && <p>{message}</p>}

      {siswa && (
        <div style={{ marginTop: 20 }}>
          <h3>Data Siswa</h3>
          <p><strong>Nama:</strong> {siswa.nama}</p>
          <p><strong>Kelas:</strong> {siswa.kelas}</p>

          <div style={{ marginTop: 10 }}>
            <label><strong>Tahun Ajaran:</strong></label><br />
            <select value={selectedTahun} onChange={(e) => setSelectedTahun(e.target.value)}>
              <option value="">-- Pilih Tahun Ajaran --</option>
              {tahunList.map((t) => (
                <option key={t.id} value={t.label}>{t.label}</option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: 10 }}>
            <label><strong>Semester:</strong></label><br />
            <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
              <option value="">-- Pilih Semester --</option>
              {semesterList.map((s) => (
                <option key={s.id} value={s.nama}>{s.nama}</option>
              ))}
            </select>
          </div>

          <button style={{ marginTop: 10 }} onClick={handlePreview}>Lihat Raport</button>
        </div>
      )}
    </main>
  )
}
