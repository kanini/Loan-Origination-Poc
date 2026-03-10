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
      const { file, ...serializableDoc } = uploadedDoc
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

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Layout onLogout={handleLogout} uploadedDoc={uploadedDoc}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/upload"
          element={<Upload setUploadedDoc={setUploadedDoc} />}
        />
        <Route
          path="/processing"
          element={<Processing uploadedDoc={uploadedDoc} setUploadedDoc={setUploadedDoc} />}
        />
        <Route
          path="/results"
          element={<Results uploadedDoc={uploadedDoc} />}
        />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
