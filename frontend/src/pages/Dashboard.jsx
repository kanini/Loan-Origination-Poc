import { useNavigate } from 'react-router-dom'
import { Upload } from 'lucide-react'
import './Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <main className="dashboard">
      <div className="hero">
        <h1>Intelligent Loan Processing System</h1>
        <button className="cta-button" onClick={() => navigate('/upload')}>
          <Upload size={20} />
          Upload New Document
        </button>
      </div>
    </main>
  )
}
