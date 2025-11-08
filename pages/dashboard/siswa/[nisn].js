import { useRouter } from 'next/router'
export default function SiswaPage(){
  const router = useRouter()
  const { nisn } = router.query
  return (
    <main style={{padding:20,fontFamily:'sans-serif'}}>
      <h2>Detail Siswa: {nisn}</h2>
      <p>Demo page. Nanti tampil data siswa & raport.</p>
    </main>
  )
}