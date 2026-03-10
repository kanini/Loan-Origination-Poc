import { NavLink, useLocation } from 'react-router-dom'
import { LogOut, LayoutDashboard, Upload } from 'lucide-react'
import Chatbot from './Chatbot'
import './Layout.css'

export default function Layout({ children, onLogout, uploadedDoc }) {
  const location = useLocation()
  const showSidebar = ['/dashboard', '/upload'].includes(location.pathname)
  const showChatbot = location.pathname === '/results' && uploadedDoc

  return (
    <div className="layout">
      <header className="header">
        <NavLink to="/dashboard" className="logo">Intelligent Loan Processing</NavLink>
        <nav className="nav">
        </nav>
        <button className="user-profile" onClick={onLogout} title="Logout">
          <LogOut size={16} />
        </button>
      </header>
      <div className={`main-area ${showSidebar ? 'with-sidebar' : ''}`}>
        {showSidebar && (
          <aside className="sidebar">
            <nav className="sidebar-nav">
              <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/upload" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Upload size={18} />
                <span>Upload</span>
              </NavLink>
            </nav>
          </aside>
        )}
        <div className="main-content">
          {children}
        </div>
      </div>
      {showChatbot && (
        <Chatbot 
          documentText={uploadedDoc.extractedText || ''} 
          loanText={uploadedDoc.loanText || ''}
          taxText={uploadedDoc.taxText || ''}
        />
      )}
    </div>
  )
}
