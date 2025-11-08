import { useEffect, useState } from 'react'
import Link from 'next/link'
export default function Dashboard(){
  const [role,setRole]=useState(null)
  useEffect(()=> setRole(localStorage.getItem('role')), [])
  if(!role) return <p>Loading... (login dulu)</p>
  return (
    <main style={{padding:20,fontFamily:'sans-serif'}}>
      <h2>Dashboard ({role})</h2>
      <ul>
        <li><Link href="/dashboard/create-report">Buat Raport Baru</Link></li>
        <li><Link href="/dashboard/siswa-list">Daftar Siswa</Link></li>
      </ul>
    </main>
  )
}