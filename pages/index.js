import Link from 'next/link'
export default function Home(){
  return (
    <main style={{padding:20,fontFamily:'sans-serif'}}>
      <h1>PAUD Kasih Ibu — e-Raport</h1>
      <p>Halaman publik: orang tua bisa preview & download raport.</p>
      <ul>
        <li><Link href="/preview">Preview / Download (ortu)</Link></li>
        <li><Link href="/login">Login (admin/guru)</Link></li>
      </ul>
    </main>
  )
}