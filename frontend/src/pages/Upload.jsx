import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Upload as UploadIcon, FileText, X } from 'lucide-react'
import './Upload.css'

export default function Upload({ setUploadedDoc }) {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [files, setFiles] = useState([])
  const [selectedModel, setSelectedModel] = useState('openai')
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')

  const MAX_FILES = 10

  const addFiles = (newFiles) => {
    setError('')
    const incoming = Array.from(newFiles)
    const validFiles = []

    for (const f of incoming) {
      if (f.type !== 'application/pdf') {
        setError(`"${f.name}" is not a PDF. Only PDF files are supported.`)
        return
      }
      if (f.size > 10 * 1024 * 1024) {
        setError(`"${f.name}" exceeds the 10 MB size limit.`)
        return
      }
      // Skip duplicates by name
      if (files.some((existing) => existing.name === f.name)) continue
      validFiles.push(f)
    }

    const combined = [...files, ...validFiles]
    if (combined.length > MAX_FILES) {
      setError(`You can upload a maximum of ${MAX_FILES} documents.`)
      return
    }
    setFiles(combined)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    addFiles(e.dataTransfer.files)
  }

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setError('')
  }

  const handleExtract = () => {
    if (files.length < 2) {
      setError('Please upload at least two documents (loan application and tax return).')
      return
    }
    // Send the first file as loan and the second as tax for backend compatibility
    setUploadedDoc({
      loanFile: files[0],
      taxFile: files[1],
      model: selectedModel,
    })
    navigate('/processing')
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const currentStep = files.length >= 2 ? 3 : files.length >= 1 ? 2 : 1

  return (
    <>
      <div className="breadcrumb">
        <div className="breadcrumb-list">
          <Link to="/dashboard" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span>Upload Documents</span>
        </div>
      </div>

      <main className="upload-page">
        <h1>Upload Documents</h1>
        <p className="page-subtitle">Upload your loan application and tax return documents for comprehensive analysis</p>

        <div className="step-indicator">
          <div className="step">
            <div className={`step-number ${currentStep >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-label ${currentStep >= 1 ? 'active' : ''}`}>Upload Files</div>
          </div>
          <div className="step-arrow">&rarr;</div>
          <div className="step">
            <div className={`step-number ${currentStep >= 2 ? 'active' : ''}`}>2</div>
            <div className={`step-label ${currentStep >= 2 ? 'active' : ''}`}>Choose Model</div>
          </div>
          <div className="step-arrow">&rarr;</div>
          <div className="step">
            <div className={`step-number ${currentStep >= 3 ? 'active' : ''}`}>3</div>
            <div className={`step-label ${currentStep >= 3 ? 'active' : ''}`}>Confirm</div>
          </div>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <div className="single-upload-container">
          <div
            className={`drop-zone ${dragOver ? 'drag-over' : ''} ${files.length > 0 ? 'has-file' : ''}`}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload PDF documents"
          >
            <UploadIcon size={40} className="upload-icon" />
            <div className="drop-zone-text">Drop your documents here</div>
            <div className="drop-zone-subtext">or click to browse &middot; PDF only &middot; Max 10 MB each</div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              multiple
              style={{ display: 'none' }}
              onChange={(e) => { addFiles(e.target.files); e.target.value = '' }}
            />
          </div>

          {files.length > 0 && (
            <div className="file-list">
              {files.map((f, idx) => (
                <div key={idx} className="file-list-item">
                  <FileText size={24} className="file-icon" />
                  <div className="file-info">
                    <div className="file-name">{f.name}</div>
                    <div className="file-size">{formatFileSize(f.size)}</div>
                  </div>
                  <button
                    className="remove-button-inline"
                    onClick={() => handleRemoveFile(idx)}
                    aria-label={`Remove ${f.name}`}
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="model-selection">
          <h3>Choose LLM Model</h3>
          <div className="model-cards">
            <label className={`model-card ${selectedModel === 'openai' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="model"
                value="openai"
                checked={selectedModel === 'openai'}
                onChange={() => setSelectedModel('openai')}
              />
              <div className="model-name">OpenAI GPT</div>
              <div className="model-description">Fast and accurate for standard documents</div>
            </label>
            <label className={`model-card ${selectedModel === 'gemini' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="model"
                value="gemini"
                checked={selectedModel === 'gemini'}
                onChange={() => setSelectedModel('gemini')}
              />
              <div className="model-name">Google Gemini</div>
              <div className="model-description">Advanced processing for complex layouts</div>
            </label>
          </div>
        </div>

        <div className="action-buttons">
          <button className="button button-secondary" onClick={() => navigate('/dashboard')}>Cancel</button>
          <button
            className="button button-primary"
            disabled={files.length < 2}
            onClick={handleExtract}
          >
            Extract Entities
          </button>
        </div>
      </main>
    </>
  )
}
