import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import Processing from './pages/Processing'
import Results from './pages/Results'
import History from './pages/History'
import Layout from './components/Layout'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('authenticated') === 'true'
  )
  const [uploadedDoc, setUploadedDoc] = useState(() => {
    const saved = sessionStorage.getItem('uploadedDoc')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (uploadedDoc) {
      const { file, loanFile, taxFile, ...serializableDoc } = uploadedDoc
      sessionStorage.setItem('uploadedDoc', JSON.stringify(serializableDoc))
    } else {
      sessionStorage.removeItem('uploadedDoc')
    }
  }, [uploadedDoc])

  const handleLogin = () => {
    sessionStorage.setItem('authenticated', 'true')
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('authenticated')
    setIsAuthenticated(false)
    setUploadedDoc(null)
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Layout onLogout={handleLogout} uploadedDoc={uploadedDoc}>
              <Dashboard />
            </Layout>
          ) : <Navigate to="/" replace />
        }
      />
      <Route
        path="/upload"
        element={
          isAuthenticated ? (
            <Layout onLogout={handleLogout} uploadedDoc={uploadedDoc}>
              <Upload setUploadedDoc={setUploadedDoc} />
            </Layout>
          ) : <Navigate to="/" replace />
        }
      />
      <Route
        path="/processing"
        element={
          isAuthenticated ? (
            <Layout onLogout={handleLogout} uploadedDoc={uploadedDoc}>
              <Processing uploadedDoc={uploadedDoc} setUploadedDoc={setUploadedDoc} />
            </Layout>
          ) : <Navigate to="/" replace />
        }
      />
      <Route
        path="/results"
        element={
          isAuthenticated ? (
            <Layout onLogout={handleLogout} uploadedDoc={uploadedDoc}>
              <Results uploadedDoc={uploadedDoc} />
            </Layout>
          ) : <Navigate to="/" replace />
        }
      />
      <Route
        path="/history"
        element={
          isAuthenticated ? (
            <Layout onLogout={handleLogout} uploadedDoc={uploadedDoc}>
              <History />
            </Layout>
          ) : <Navigate to="/" replace />
        }
      />
      <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/'} replace />} />
    </Routes>
  )
}

export default App
