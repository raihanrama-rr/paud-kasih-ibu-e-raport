import dynamic from 'next/dynamic'
import ReportForm from '../../components/ReportForm'
export default function CreateReport(){
  return (
    <main style={{padding:20,fontFamily:'sans-serif'}}>
      <h2>Buat Raport Baru</h2>
      <ReportForm />
    </main>
  )
}