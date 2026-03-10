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
  const [activeDoc, setActiveDoc] = useState('loan') // 'loan' or 'tax'

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
  
  // Check if this is dual document result
  const isDualDoc = result.documents && result.documents.loan && result.documents.tax
  
  // Get entities based on document type
  let entities, fileName, fileUrl, modelLabel
  
  if (isDualDoc) {
    const docData = result.documents[activeDoc]
    entities = docData?.entities || {}
    fileName = docData?.file_name || (activeDoc === 'loan' ? 'Loan Application' : 'Tax Return')
    fileUrl = docData?.file_url
    modelLabel = result.model === 'gemini' ? 'Google Gemini' : 'OpenAI GPT'
  } else {
    entities = result.entities || {}
    fileName = result.file_name
    fileUrl = result.file_url
    modelLabel = result.model === 'gemini' ? 'Google Gemini' : 'OpenAI GPT'
  }

  const handleExport = () => {
    const exportData = isDualDoc ? result.documents : entities
    const dataStr = JSON.stringify(exportData, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = isDualDoc ? 'dual_documents_extracted.json' : `${fileName}_extracted.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Helper: render a value that could be a primitive, array, or nested object
  const renderValue = (value) => {
    if (value === null || value === undefined) return 'N/A'
    if (typeof value !== 'object') return String(value)
    if (Array.isArray(value)) {
      // Array of primitives (e.g. ["12/31/2021", "12/31/2020"])
      if (value.length === 0) return 'N/A'
      if (typeof value[0] !== 'object') return value.join(', ')
      // Array of objects – render nothing here (handled by renderArrayOfObjects)
      return null
    }
    // Nested object – return null to indicate it needs special handling
    return null
  }

  // Helper: render a nested object as a subsection with field-value pairs
  const renderNestedObject = (obj, sectionTitle) => {
    return (
      <div className="nested-section">
        <div className="nested-section-title">{sectionTitle}</div>
        <div className="field-grid">
          {Object.entries(obj).map(([key, value]) => {
            const renderedValue = renderValue(value)
            // Skip if value is a nested object (would need recursive handling)
            if (renderedValue === null && typeof value === 'object' && !Array.isArray(value)) {
              return null
            }
            return (
              <div key={key} className="field-row">
                <div className="field-label">{formatFieldName(key)}</div>
                <div className={`field-value ${!value && value !== 0 ? 'empty' : ''}`}>
                  {renderedValue || 'N/A'}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Helper: render an array of objects as sub-cards with index labels
  const renderArrayOfObjects = (arr, parentLabel) => {
    return arr.map((item, idx) => {
      // For taxpayer-related data, always use numbered format (Taxpayer 1, Taxpayer 2, etc.)
      // For other data, try to find a meaningful name if available
      const isTaxpayerLabel = parentLabel.toLowerCase().includes('taxpayer')
      let displayLabel
      
      if (isTaxpayerLabel) {
        // Always use numbered format for taxpayers
        displayLabel = `Taxpayer ${idx + 1}`
      } else {
        // For other data, try to find a meaningful name
        const nameField = item.taxpayer_name || item.name || item.taxpayer || 
                         item.borrower_name || item.borrower || null
        displayLabel = nameField || `${parentLabel} ${idx + 1}`
      }
      
      return (
        <div key={idx} className="entity-sub-card">
          <div className="sub-card-label">{displayLabel}</div>
          <div className="field-grid">
            {Object.entries(item).map(([key, value]) => (
              <div key={key} className="field-row">
                <div className="field-label">{formatFieldName(key)}</div>
                <div className={`field-value ${!value && value !== 0 ? 'empty' : ''}`}>
                  {renderValue(value) || 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    })
  }

  // Categorize entity entries into nested objects, arrays-of-objects, and flat values
  const categorizeEntries = () => {
    const nestedEntries = []       // { key: { ... } }
    const arrayObjEntries = []     // { key: [ {...}, {...} ] }
    const flatEntries = []         // key: primitive or primitive-array
    Object.entries(entities).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
        arrayObjEntries.push([key, value])
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        nestedEntries.push([key, value])
      } else {
        flatEntries.push([key, value])
      }
    })
    return { nestedEntries, arrayObjEntries, flatEntries }
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

    if (!entities || Object.keys(entities).length === 0) {
      return (
        <div className="entity-card">
          <div className="card-title">No Entities Found</div>
          <p style={{ color: '#6B7280', padding: '16px' }}>No structured data could be extracted from this document.</p>
        </div>
      )
    }

    const { nestedEntries, arrayObjEntries, flatEntries } = categorizeEntries()

    return (
      <>
        {/* Flat key-value pairs */}
        {flatEntries.length > 0 && (
          <div className="entity-card">
            <div className="card-title">Extracted Information</div>
            <div className="field-grid">
              {flatEntries.map(([key, value]) => (
                <div key={key} className="field-row">
                  <div className="field-label">{formatFieldName(key)}</div>
                  <div className={`field-value ${!value && value !== 0 ? 'empty' : ''}`}>
                    {renderValue(value) || 'N/A'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Nested category objects */}
        {nestedEntries.map(([category, fields]) => (
          <div key={category} className="entity-card">
            <div className="card-title">{category}</div>
            <div className="field-grid">
              {Object.entries(fields).map(([key, value]) => {
                // If this nested field itself is an array of objects, render sub-cards
                if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
                  return (
                    <div key={key} className="field-row-full">
                      {renderArrayOfObjects(value, formatFieldName(key))}
                    </div>
                  )
                }
                return (
                  <div key={key} className="field-row">
                    <div className="field-label">{formatFieldName(key)}</div>
                    <div className={`field-value ${!value && value !== 0 ? 'empty' : ''}`}>
                      {renderValue(value) || 'N/A'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        {/* Array-of-objects entries (e.g. Taxpayer Information: [{...}, {...}]) */}
        {arrayObjEntries.map(([category, arr]) => (
          <>
            {arr.map((item, idx) => {
              // For taxpayer-related categories, always use numbered format (Taxpayer 1, Taxpayer 2, etc.)
              // For other categories, try to use a meaningful name if available
              const isTaxpayerCategory = category.toLowerCase().includes('taxpayer')
              let displayTitle
              
              if (isTaxpayerCategory) {
                // Always use numbered format for taxpayers
                displayTitle = `Taxpayer ${idx + 1}`
              } else {
                // For other categories, try to find a meaningful name
                const nameField = item.taxpayer_name || item.name || item.taxpayer || 
                                 item.borrower_name || item.borrower || null
                displayTitle = nameField || `${formatFieldName(category).replace(/s$/, '')} ${idx + 1}`
              }
              
              return (
                <div key={`${category}-${idx}`} className="entity-card">
                  <div className="card-title">{displayTitle}</div>
                  {Object.entries(item).map(([key, value]) => {
                    // If value is a nested object, render it as a subsection
                    if (value && typeof value === 'object' && !Array.isArray(value)) {
                      return (
                        <div key={key}>
                          {renderNestedObject(value, formatFieldName(key))}
                        </div>
                      )
                    }
                    // Otherwise, render as a regular field-value pair
                    const renderedValue = renderValue(value)
                    if (renderedValue === null) return null
                    return (
                      <div key={key} className="field-row-standalone">
                        <div className="field-label">{formatFieldName(key)}</div>
                        <div className={`field-value ${!value && value !== 0 ? 'empty' : ''}`}>
                          {renderedValue || 'N/A'}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </>
        ))}
      </>
    )
  }

  const renderTable = () => {
    if (entities.raw_output) {
      return (
        <div className="entity-card">
          <pre className="raw-output">{entities.raw_output}</pre>
        </div>
      )
    }

    if (!entities || Object.keys(entities).length === 0) {
      return (
        <div className="entity-card">
          <p style={{ color: '#6B7280', padding: '16px' }}>No structured data could be extracted.</p>
        </div>
      )
    }

    // Flatten all entities into table rows: { category, field, value }
    const rows = []
    const { nestedEntries, arrayObjEntries, flatEntries } = categorizeEntries()

    if (flatEntries.length > 0) {
      flatEntries.forEach(([key, value]) => {
        rows.push({ category: 'General', field: key, value: renderValue(value) || 'N/A' })
      })
    }

    nestedEntries.forEach(([category, fields]) => {
      Object.entries(fields).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
          value.forEach((item, idx) => {
            Object.entries(item).forEach(([k, v]) => {
              rows.push({ category: `${category} - ${formatFieldName(key)} ${idx + 1}`, field: k, value: renderValue(v) || 'N/A' })
            })
          })
        } else {
          rows.push({ category, field: key, value: renderValue(value) || 'N/A' })
        }
      })
    })

    arrayObjEntries.forEach(([category, arr]) => {
      arr.forEach((item, idx) => {
        Object.entries(item).forEach(([key, value]) => {
          rows.push({ category: `${category} ${idx + 1}`, field: key, value: renderValue(value) || 'N/A' })
        })
      })
    })

    // Group rows by category for rowSpan
    const grouped = []
    let lastCat = null
    rows.forEach((row) => {
      if (row.category !== lastCat) {
        grouped.push({ ...row, span: rows.filter(r => r.category === row.category).length, showCat: true })
        lastCat = row.category
      } else {
        grouped.push({ ...row, showCat: false })
      }
    })

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
            {grouped.map((row, idx) => (
              <tr key={idx}>
                {row.showCat && (
                  <td rowSpan={row.span} className="category-cell">{row.category}</td>
                )}
                <td>{formatFieldName(row.field)}</td>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <>
      <div className="breadcrumb">
        <div className="breadcrumb-list">
          <Link to="/dashboard" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span>Results</span>
          {!isDualDoc && (
            <>
              <span className="breadcrumb-separator">/</span>
              <span>{fileName}</span>
            </>
          )}
        </div>
      </div>

      <div className="document-header">
        <div className="document-title">
          <h1>{isDualDoc ? 'Dual Document Analysis' : fileName}</h1>
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

      {isDualDoc && (
        <div className="document-tabs">
          <button
            className={`doc-tab ${activeDoc === 'loan' ? 'active' : ''}`}
            onClick={() => setActiveDoc('loan')}
          >
            <span className="doc-tab-icon loan">1</span>
            <span className="doc-tab-label">
              <div className="doc-tab-title">Loan Application</div>
              <div className="doc-tab-subtitle">{result.documents.loan.file_name}</div>
            </span>
          </button>
          <button
            className={`doc-tab ${activeDoc === 'tax' ? 'active' : ''}`}
            onClick={() => setActiveDoc('tax')}
          >
            <span className="doc-tab-icon tax">2</span>
            <span className="doc-tab-label">
              <div className="doc-tab-title">Tax Return</div>
              <div className="doc-tab-subtitle">{result.documents.tax.file_name}</div>
            </span>
          </button>
        </div>
      )}

      <main className="results-main">
        <div className="entity-panel">
          <div className="panel-header">
            <h2>Details</h2>
          </div>

          <div className="entity-cards">
            {renderEntities()}
          </div>
        </div>

        <div className="pdf-panel">
          <div className="pdf-controls">
            <div className="page-info">{isDualDoc ? (activeDoc === 'loan' ? 'Loan Document Preview' : 'Tax Document Preview') : 'Document Preview'}</div>
          </div>
          <div className="pdf-viewer">
            {fileUrl ? (
              <iframe
                src={fileUrl}
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
