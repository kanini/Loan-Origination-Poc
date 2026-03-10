import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Eye, Trash2, Search, Grid, List, Loader } from 'lucide-react'
import axios from 'axios'
import './History.css'

const ITEMS_PER_PAGE = 12

export default function History() {
  const navigate = useNavigate()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [modelFilter, setModelFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/history/')
      setDocuments(response.data.documents || [])
    } catch {
      setError('Failed to load document history.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (e, docId) => {
    e.stopPropagation()
    try {
      await axios.delete(`/api/history/${docId}/`)
      setDocuments((prev) => prev.filter((d) => d.id !== docId))
    } catch {
      // silently ignore
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const filtered = documents.filter((doc) => {
    const matchesSearch = doc.file_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter
    const matchesModel = modelFilter === 'all' || doc.model_used === modelFilter
    return matchesSearch && matchesStatus && matchesModel
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const badgeClass = (status) => {
    switch (status) {
      case 'success': return 'badge badge-success'
      case 'processing': return 'badge badge-processing'
      case 'failed': return 'badge badge-failed'
      default: return 'badge'
    }
  }

  const modelOptions = [...new Set(documents.map((d) => d.model_used))].filter(Boolean)

  if (loading) {
    return (
      <main className="history-page">
        <h1>Document History</h1>
        <div className="empty-state">
          <Loader size={48} className="empty-icon spin" />
          <div className="empty-heading">Loading documents...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="history-page">
      <h1>Document History</h1>

      {error && <div className="history-error">{error}</div>}

      <div className="filter-bar">
        <div className="search-input">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by filename..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
          />
        </div>
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1) }}
        >
          <option value="all">All Status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="processing">Processing</option>
        </select>
        <select
          className="filter-select"
          value={modelFilter}
          onChange={(e) => { setModelFilter(e.target.value); setCurrentPage(1) }}
        >
          <option value="all">All Models</option>
          {modelOptions.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <div className="hist-view-toggle">
          <button
            className={`hist-toggle-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <Grid size={20} />
          </button>
          <button
            className={`hist-toggle-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <FileText size={64} className="empty-icon" />
          <div className="empty-heading">No documents found</div>
          <div className="empty-description">
            {documents.length === 0
              ? 'No documents have been processed yet. Upload a document to get started.'
              : 'Try adjusting your search or filters'}
          </div>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'document-grid' : 'document-list'}>
          {paginated.map((doc) => (
            <div key={doc.id} className="hist-document-card" onClick={() => navigate('/results')}>
              <div className="hist-document-thumbnail">
                <FileText size={48} color="#6B7280" />
              </div>
              <div className="hist-document-name">{doc.file_name}</div>
              <div className="hist-document-meta">{formatDate(doc.created_at)} &bull; {doc.model_used}</div>
              <div className="hist-document-footer">
                <span className={badgeClass(doc.status)}>{doc.status}</span>
                <div className="hist-document-actions">
                  <button className="action-icon-btn" aria-label="View" onClick={(e) => { e.stopPropagation(); navigate('/results') }}>
                    <Eye size={16} />
                  </button>
                  <button className="action-icon-btn delete" aria-label="Delete" onClick={(e) => handleDelete(e, doc.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} documents
          </div>
          <div className="pagination-controls">
            <button
              className="page-button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >&larr;</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`page-button ${page === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >{page}</button>
            ))}
            <button
              className="page-button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >&rarr;</button>
          </div>
        </div>
      )}
    </main>
  )
}
