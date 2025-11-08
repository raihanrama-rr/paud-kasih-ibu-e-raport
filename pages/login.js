import { useRouter } from 'next/router'
import { useState } from 'react'
// Dummy login for starter: use email 'admin@paud.test' or 'ecih@paud.test' with password 'password123'
export default function Login(){
  const [email,setEmail]=useState('')
  const [pw,setPw]=useState('')
  const router = useRouter()
  const handle = (e)=>{
    e.preventDefault()
    if ((email==='admin@paud.test' || email==='ecih@paud.test' || email==='novita@paud.test') && pw==='password123'){
      // store role in localStorage for demo
      if(email==='admin@paud.test') localStorage.setItem('role','admin')
      else localStorage.setItem('role','guru')
      router.push('/dashboard')
    } else {
      alert('Login demo gagal. Gunakan akun demo: admin@paud.test / password123')
    }
  }
  return (
    <main style={{padding:20,fontFamily:'sans-serif'}}>
      <h2>Login (Demo)</h2>
      <form onSubmit={handle}>
        <div><input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><input placeholder="password" type="password" value={pw} onChange={e=>setPw(e.target.value)} /></div>
        <button type="submit">Login</button>
      </form>
      <p>Demo accounts: admin@paud.test (admin), ecih@paud.test (guru A), novita@paud.test (guru B). Password: password123</p>
    </main>
  )
}