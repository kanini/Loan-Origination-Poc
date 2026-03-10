import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { XCircle } from 'lucide-react'
import axios from 'axios'
import './Processing.css'

export default function Processing({ uploadedDoc, setUploadedDoc }) {
  const navigate = useNavigate()
  const [state, setState] = useState('loading')
  const [errorMsg, setErrorMsg] = useState('')
  const [processingStep, setProcessingStep] = useState('')

  // Check if dual upload
  const isDualUpload = uploadedDoc?.loanFile && uploadedDoc?.taxFile

  useEffect(() => {
    // Check for both single and dual upload
    if (!uploadedDoc?.file && !isDualUpload) {
      navigate('/upload')
      return
    }

    let cancelled = false

    const processDocument = async () => {
      try {
        if (isDualUpload) {
          setProcessingStep('Processing both documents...')
          const formData = new FormData()
          formData.append('loan_file', uploadedDoc.loanFile)
          formData.append('tax_file', uploadedDoc.taxFile)
          formData.append('model', uploadedDoc.model)

          const response = await axios.post('/api/extract/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })

          if (cancelled) return

          setUploadedDoc((prev) => ({
            ...prev,
            result: response.data,
            loanText: response.data.documents?.loan?.extracted_text || '',
            taxText: response.data.documents?.tax?.extracted_text || '',
          }))

          setState('success')
          setTimeout(() => navigate('/results'), 1500)
        } else {
          const formData = new FormData()
          formData.append('pdf_file', uploadedDoc.file)
          formData.append('model', uploadedDoc.model)

          const response = await axios.post('/api/extract/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })

          if (cancelled) return

          setUploadedDoc((prev) => ({
            ...prev,
            result: response.data,
            extractedText: response.data.extracted_text || '',
          }))

          setState('success')
          setTimeout(() => navigate('/results'), 1500)
        }
      } catch (err) {
        if (cancelled) return
        setState('error')
        const msg = err.response?.data?.error || err.message || 'Unknown error occurred'
        setErrorMsg(msg)
      }
    }

    processDocument()

    return () => { cancelled = true }
  }, [])

  const handleRetry = () => {
    setState('loading')
    setErrorMsg('')
    setProcessingStep('')
    
    if (isDualUpload) {
      const formData = new FormData()
      formData.append('loan_file', uploadedDoc.loanFile)
      formData.append('tax_file', uploadedDoc.taxFile)
      formData.append('model', uploadedDoc.model)

      axios
        .post('/api/extract/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          setUploadedDoc((prev) => ({
            ...prev,
            result: response.data,
            loanText: response.data.documents?.loan?.extracted_text || '',
            taxText: response.data.documents?.tax?.extracted_text || '',
          }))
          setState('success')
          setTimeout(() => navigate('/results'), 1500)
        })
        .catch((err) => {
          setState('error')
          const msg = err.response?.data?.error || err.message || 'Unknown error occurred'
          setErrorMsg(msg)
        })
    } else {
      const formData = new FormData()
      formData.append('pdf_file', uploadedDoc.file)
      formData.append('model', uploadedDoc.model)

      axios
        .post('/api/extract/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          setUploadedDoc((prev) => ({
            ...prev,
            result: response.data,
            extractedText: response.data.extracted_text || '',
          }))
          setState('success')
          setTimeout(() => navigate('/results'), 1500)
        })
        .catch((err) => {
          setState('error')
          const msg = err.response?.data?.error || err.message || 'Unknown error occurred'
          setErrorMsg(msg)
        })
    }
  }

  const modelLabel = uploadedDoc?.model === 'gemini' ? 'Google Gemini' : 'OpenAI GPT'

  return (
    <>
      <div className="breadcrumb">
        <div className="breadcrumb-list">
          <Link to="/dashboard" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/upload" className="breadcrumb-link">Upload Document</Link>
          <span className="breadcrumb-separator">/</span>
          <span>Processing</span>
        </div>
      </div>

      {state === 'loading' && (
        <main className="processing-main">
          <div className="spinner"></div>
          <h2>{isDualUpload ? 'Processing your documents...' : 'Processing your document...'}</h2>
          {processingStep && <p className="processing-step">{processingStep}</p>}
          <div className="processing-details">
            {isDualUpload ? (
              <>
                <div className="detail-row">
                  <span className="detail-label">Loan Application</span>
                  <span className="detail-value">{uploadedDoc?.loanFile?.name || 'N/A'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Tax Return</span>
                  <span className="detail-value">{uploadedDoc?.taxFile?.name || 'N/A'}</span>
                </div>
              </>
            ) : (
              <div className="detail-row">
                <span className="detail-label">Filename</span>
                <span className="detail-value">{uploadedDoc?.file?.name || 'N/A'}</span>
              </div>
            )}
            <div className="detail-row">
              <span className="detail-label">Model</span>
              <span className="detail-value">{modelLabel}</span>
            </div>
          </div>
          <p className="subtext">This may take {isDualUpload ? '30-60' : '10-30'} seconds depending on document complexity</p>
        </main>
      )}

      {state === 'error' && (
        <main className="processing-main">
          <XCircle size={80} className="error-icon" />
          <h2>Processing failed</h2>
          <p className="error-message-text">Please try again or select a different model.</p>
          <div className="error-details">
            <strong>Error Details:</strong> {errorMsg}
          </div>
          <div className="proc-action-buttons">
            <button className="button button-primary" onClick={handleRetry}>Retry</button>
            <button className="button button-secondary" onClick={() => navigate('/upload')}>Change Model</button>
            <button className="button button-tertiary" onClick={() => navigate('/dashboard')}>Cancel</button>
          </div>
        </main>
      )}

      {state === 'success' && (
        <main className="processing-main">
          <svg className="success-icon" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="9 12 11 14 15 10"></polyline>
          </svg>
          <h2>Processing complete!</h2>
          <p className="subtext">Redirecting to results...</p>
        </main>
      )}
    </>
  )
}
