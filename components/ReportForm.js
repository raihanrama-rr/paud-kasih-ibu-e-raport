import { useState } from 'react'
export default function ReportForm(){
  const [aspects, setAspects] = useState([{aspek:'Agama & Budi Pekerti', deskripsi:''}])
  const add = ()=> setAspects([...aspects, {aspek:'', deskripsi:''}])
  const upd = (i, key, val)=> {
    const s = [...aspects]; s[i][key]=val; setAspects(s)
  }
  return (
    <div>
      <p>Form raport (demo). Isi deskripsi per aspek.</p>
      {aspects.map((a,i)=>(
        <div key={i} style={{marginBottom:10}}>
          <input value={a.aspek} onChange={e=>upd(i,'aspek',e.target.value)} placeholder="Aspek" />
          <br/>
          <textarea value={a.deskripsi} onChange={e=>upd(i,'deskripsi',e.target.value)} placeholder="Deskripsi" rows={3} cols={60} />
        </div>
      ))}
      <button onClick={add}>Tambah Aspek</button>
      <hr/>
      <button onClick={()=>alert('Simpan (demo)')}>Simpan Draft</button>
      <button onClick={()=>alert('Finalisasi (demo)')}>Finalisasi</button>
    </div>
  )
}