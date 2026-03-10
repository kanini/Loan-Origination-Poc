import { NavLink, useLocation } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Chatbot from './Chatbot'
import './Layout.css'

export default function Layout({ children, onLogout, uploadedDoc }) {
  const location = useLocation()

  return (
    <div className="layout">
      <header className="header">
        <NavLink to="/" className="logo">GenAI PDF Extractor</NavLink>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Dashboard
          </NavLink>
          <NavLink to="/upload" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Upload
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            History
          </NavLink>
        </nav>
        <button className="user-profile" onClick={onLogout} title="Logout">
          <LogOut size={16} />
        </button>
      </header>
      <div className="main-content">
        {children}
      </div>
      {uploadedDoc && <Chatbot documentText={uploadedDoc.extractedText || ''} />}
    </div>
  )
}
