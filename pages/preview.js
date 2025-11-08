import { useState } from 'react'
export default function Preview(){
  const [nisn,setNisn] = useState('')
  const [dob,setDob] = useState('')
  const [msg,setMsg] = useState('')
  const handle = async (e) => {
    e.preventDefault()
    setMsg('Mencari raport... (ini demo, belum terhubung ke server)')
  }
  return (
    <main style={{padding:20,fontFamily:'sans-serif'}}>
      <h2>Preview Raport (Orang Tua)</h2>
      <form onSubmit={handle}>
        <div>
          <label>NISN: <input value={nisn} onChange={e=>setNisn(e.target.value)} /></label>
        </div>
        <div>
          <label>Tanggal Lahir: <input placeholder="YYYY-MM-DD" value={dob} onChange={e=>setDob(e.target.value)} /></label>
        </div>
        <button type="submit">Preview</button>
      </form>
      <p>{msg}</p>
    </main>
  )
}