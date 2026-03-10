import { useState } from 'react'
import { FileText, Lock, User, Shield, Zap, BarChart3 } from 'lucide-react'
import './Login.css'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim() && password.trim()) {
      onLogin()
    }
  }

  return (
    <div className="landing-page">
      <div className="landing-left">
        <div className="landing-brand">
          <div className="landing-logo">
            <FileText size={40} color="#ffffff" />
          </div>
          <h1 className="landing-title">Intelligent Loan Processing System</h1>
          <p className="landing-description">
            AI-powered document extraction and entity recognition for streamlined loan origination.
          </p>
        </div>
        <div className="landing-features">
          <div className="landing-feature">
            <Zap size={24} color="#60A5FA" />
            <div>
              <h3>Fast Processing</h3>
              <p>Extract entities from loan documents in seconds using advanced AI models.</p>
            </div>
          </div>
          <div className="landing-feature">
            <Shield size={24} color="#60A5FA" />
            <div>
              <h3>Secure & Reliable</h3>
              <p>Enterprise-grade security for sensitive financial documents.</p>
            </div>
          </div>
          <div className="landing-feature">
            <BarChart3 size={24} color="#60A5FA" />
            <div>
              <h3>Batch Processing</h3>
              <p>Upload and process multiple documents simultaneously.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="landing-right">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-title">Sign In</h2>
            <p className="login-subtitle">Access your loan processing dashboard</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  id="username"
                  type="text"
                  className="form-input"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>
            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
