import Link from 'next/link'
export default function SiswaList(){
  const demo = [
    {nisn:'001', nama:'Tuti Safira', kelas:'A'},
    {nisn:'002', nama:'Anak Dua', kelas:'B'}
  ]
  return (
    <main style={{padding:20,fontFamily:'sans-serif'}}>
      <h2>Daftar Siswa</h2>
      <ul>
        {demo.map(s=>(
          <li key={s.nisn}>{s.nisn} - {s.nama} ({s.kelas}) - <Link href={'/dashboard/siswa/'+s.nisn}>Lihat</Link></li>
        ))}
      </ul>
    </main>
  )
}