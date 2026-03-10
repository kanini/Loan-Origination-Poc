import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Upload as UploadIcon, FileText, X } from 'lucide-react'
import './Upload.css'

export default function Upload({ setUploadedDoc }) {
  const navigate = useNavigate()
  const loanInputRef = useRef(null)
  const taxInputRef = useRef(null)
  const [loanFile, setLoanFile] = useState(null)
  const [taxFile, setTaxFile] = useState(null)
  const [selectedModel, setSelectedModel] = useState('openai')
  const [dragOverLoan, setDragOverLoan] = useState(false)
  const [dragOverTax, setDragOverTax] = useState(false)
  const [error, setError] = useState('')

  const handleFileSelect = (selectedFile, type) => {
    setError('')
    if (!selectedFile) return

    if (selectedFile.type !== 'application/pdf') {
      setError(`${type === 'loan' ? 'Loan' : 'Tax'} file type not supported. Please upload a PDF file.`)
      return
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError(`${type === 'loan' ? 'Loan' : 'Tax'} file size exceeds 10MB limit.`)
      return
    }

    if (type === 'loan') {
      setLoanFile(selectedFile)
    } else {
      setTaxFile(selectedFile)
    }
  }

  const handleDrop = (e, type) => {
    e.preventDefault()
    if (type === 'loan') {
      setDragOverLoan(false)
    } else {
      setDragOverTax(false)
    }
    const droppedFile = e.dataTransfer.files[0]
    handleFileSelect(droppedFile, type)
  }

  const handleDragOver = (e, type) => {
    e.preventDefault()
    if (type === 'loan') {
      setDragOverLoan(true)
    } else {
      setDragOverTax(true)
    }
  }

  const handleDragLeave = (type) => {
    if (type === 'loan') {
      setDragOverLoan(false)
    } else {
      setDragOverTax(false)
    }
  }

  const handleRemoveFile = (type) => {
    if (type === 'loan') {
      setLoanFile(null)
      if (loanInputRef.current) loanInputRef.current.value = ''
    } else {
      setTaxFile(null)
      if (taxInputRef.current) taxInputRef.current.value = ''
    }
    setError('')
  }

  const handleExtract = () => {
    if (!loanFile || !taxFile) {
      setError('Please upload both loan application and tax return documents.')
      return
    }
    setUploadedDoc({ 
      loanFile, 
      taxFile, 
      model: selectedModel 
    })
    navigate('/processing')
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const currentStep = (loanFile && taxFile) ? 3 : (loanFile || taxFile) ? 2 : 1

  return (
    <>
      <div className="breadcrumb">
        <div className="breadcrumb-list">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span>Upload Documents</span>
        </div>
      </div>

      <main className="upload-page">
        <h1>Upload Loan & Tax Documents</h1>
        <p className="page-subtitle">Upload both your loan application and tax return for comprehensive analysis</p>

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

        <div className="dual-upload-container">
          {/* Loan Application Upload */}
          <div className="upload-section">
            <h3 className="upload-section-title">
              <span className="doc-badge loan">1</span>
              Loan Application
            </h3>
            <div
              className={`drop-zone compact ${dragOverLoan ? 'drag-over' : ''} ${loanFile ? 'has-file' : ''}`}
              onDrop={(e) => handleDrop(e, 'loan')}
              onDragOver={(e) => handleDragOver(e, 'loan')}
              onDragLeave={() => handleDragLeave('loan')}
              onClick={() => loanInputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Upload loan application PDF"
            >
              {!loanFile ? (
                <>
                  <UploadIcon size={32} className="upload-icon" />
                  <div className="drop-zone-text">Drop loan application here</div>
                  <div className="drop-zone-subtext">or click to browse (Max 10MB)</div>
                </>
              ) : (
                <div className="file-preview-inline">
                  <FileText size={32} className="file-icon" />
                  <div className="file-info">
                    <div className="file-name">{loanFile.name}</div>
                    <div className="file-size">{formatFileSize(loanFile.size)}</div>
                  </div>
                  <button 
                    className="remove-button-inline" 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveFile('loan')
                    }} 
                    aria-label="Remove loan file"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
              <input
                ref={loanInputRef}
                type="file"
                accept=".pdf"
                style={{ display: 'none' }}
                onChange={(e) => handleFileSelect(e.target.files[0], 'loan')}
              />
            </div>
          </div>

          {/* Tax Return Upload */}
          <div className="upload-section">
            <h3 className="upload-section-title">
              <span className="doc-badge tax">2</span>
              Tax Return Form
            </h3>
            <div
              className={`drop-zone compact ${dragOverTax ? 'drag-over' : ''} ${taxFile ? 'has-file' : ''}`}
              onDrop={(e) => handleDrop(e, 'tax')}
              onDragOver={(e) => handleDragOver(e, 'tax')}
              onDragLeave={() => handleDragLeave('tax')}
              onClick={() => taxInputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Upload tax return PDF"
            >
              {!taxFile ? (
                <>
                  <UploadIcon size={32} className="upload-icon" />
                  <div className="drop-zone-text">Drop tax return here</div>
                  <div className="drop-zone-subtext">or click to browse (Max 10MB)</div>
                </>
              ) : (
                <div className="file-preview-inline">
                  <FileText size={32} className="file-icon" />
                  <div className="file-info">
                    <div className="file-name">{taxFile.name}</div>
                    <div className="file-size">{formatFileSize(taxFile.size)}</div>
                  </div>
                  <button 
                    className="remove-button-inline" 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveFile('tax')
                    }} 
                    aria-label="Remove tax file"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
              <input
                ref={taxInputRef}
                type="file"
                accept=".pdf"
                style={{ display: 'none' }}
                onChange={(e) => handleFileSelect(e.target.files[0], 'tax')}
              />
            </div>
          </div>
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
          <button className="button button-secondary" onClick={() => navigate('/')}>Cancel</button>
          <button
            className="button button-primary"
            disabled={!loanFile || !taxFile}
            onClick={handleExtract}
          >
            Extract Entities
          </button>
        </div>
      </main>
    </>
  )
}
