import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Download, Trash2, Edit } from 'lucide-react'
import './Results.css'

const formatFieldName = (fieldName) => {
  return fieldName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function Results({ uploadedDoc }) {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState('card')

  if (!uploadedDoc?.result) {
    return (
      <main className="results-empty">
        <h2>No results available</h2>
        <p>Please upload and process a document first.</p>
        <button className="button button-primary" onClick={() => navigate('/upload')}>
          Upload Document
        </button>
      </main>
    )
  }

  const { result } = uploadedDoc
  const entities = result.entities || {}
  const modelLabel = result.model === 'gemini' ? 'Google Gemini' : 'OpenAI GPT'

  const handleExport = () => {
    const dataStr = JSON.stringify(entities, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${result.file_name || 'entities'}_extracted.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const renderEntities = () => {
    if (entities.raw_output) {
      return (
        <div className="entity-card">
          <div className="card-title">Extracted Data</div>
          <pre className="raw-output">{entities.raw_output}</pre>
        </div>
      )
    }

    return Object.entries(entities).map(([category, fields]) => {
      if (typeof fields !== 'object' || fields === null) return null
      return (
        <div key={category} className="entity-card">
          <div className="card-title">{category}</div>
          <div className="field-grid">
            {Object.entries(fields).map(([key, value]) => (
              <div key={key} className="field-row">
                <div className="field-label">{formatFieldName(key)}</div>
                <div className={`field-value ${!value ? 'empty' : ''}`}>
                  {value || 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    })
  }

  const renderTable = () => {
    if (entities.raw_output) {
      return (
        <div className="entity-card">
          <pre className="raw-output">{entities.raw_output}</pre>
        </div>
      )
    }

    return (
      <div className="entity-card">
        <table className="entity-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(entities).map(([category, fields]) => {
              if (typeof fields !== 'object' || fields === null) return null
              return Object.entries(fields).map(([key, value], idx) => (
                <tr key={`${category}-${key}`}>
                  {idx === 0 && (
                    <td rowSpan={Object.keys(fields).length} className="category-cell">
                      {category}
                    </td>
                  )}
                  <td>{formatFieldName(key)}</td>
                  <td>{value || 'N/A'}</td>
                </tr>
              ))
            })}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <>
      <div className="breadcrumb">
        <div className="breadcrumb-list">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span>Results</span>
          <span className="breadcrumb-separator">/</span>
          <span>{result.file_name}</span>
        </div>
      </div>

      <div className="document-header">
        <div className="document-title">
          <h1>{result.file_name}</h1>
          <div className="document-meta">
            Processed with {modelLabel}
          </div>
        </div>
        <div className="document-actions">
          <button className="icon-button" aria-label="Edit">
            <Edit size={20} />
          </button>
          <button className="button-primary-sm" onClick={handleExport}>
            <Download size={16} />
            Export
          </button>
          <button className="icon-button" aria-label="Delete" onClick={() => navigate('/upload')}>
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <main className="results-main">
        <div className="entity-panel">
          <div className="panel-header">
            <h2>Extracted Entities</h2>
            <div className="view-toggle">
              <button
                className={`toggle-button ${viewMode === 'card' ? 'active' : ''}`}
                onClick={() => setViewMode('card')}
              >
                Card View
              </button>
              <button
                className={`toggle-button ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
              >
                Table View
              </button>
            </div>
          </div>

          <div className="entity-cards">
            {viewMode === 'card' ? renderEntities() : renderTable()}
          </div>
        </div>

        <div className="pdf-panel">
          <div className="pdf-controls">
            <div className="page-info">Document Preview</div>
          </div>
          <div className="pdf-viewer">
            {result.file_url ? (
              <iframe
                src={result.file_url}
                title="PDF Viewer"
                className="pdf-iframe"
              />
            ) : (
              <span>PDF Preview Unavailable</span>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
