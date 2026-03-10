import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Eye, Trash2, Search, Grid, List } from 'lucide-react'
import './History.css'

const MOCK_DOCUMENTS = [
  { id: 1, name: '1003-URLA-Lender-Loan-Information.pdf', date: 'Mar 9, 2026', model: 'OpenAI GPT', status: 'success' },
  { id: 2, name: '4506-C-Request-for-Transcript.pdf', date: 'Mar 8, 2026', model: 'Google Gemini', status: 'success' },
  { id: 3, name: 'Loan-Application-Form-2026.pdf', date: 'Mar 7, 2026', model: 'OpenAI GPT', status: 'processing' },
  { id: 4, name: 'Borrower-Details-March-2026.pdf', date: 'Mar 6, 2026', model: 'Google Gemini', status: 'success' },
  { id: 5, name: 'Property-Appraisal-Report.pdf', date: 'Mar 5, 2026', model: 'OpenAI GPT', status: 'failed' },
  { id: 6, name: 'Income-Verification-Statement.pdf', date: 'Mar 4, 2026', model: 'Google Gemini', status: 'success' },
]

export default function History() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [modelFilter, setModelFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = MOCK_DOCUMENTS.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter
    const matchesModel = modelFilter === 'all' || doc.model === modelFilter
    return matchesSearch && matchesStatus && matchesModel
  })

  const badgeClass = (status) => {
    switch (status) {
      case 'success': return 'badge badge-success'
      case 'processing': return 'badge badge-processing'
      case 'failed': return 'badge badge-failed'
      default: return 'badge'
    }
  }

  return (
    <main className="history-page">
      <h1>Document History</h1>

      <div className="filter-bar">
        <div className="search-input">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by filename..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="processing">Processing</option>
        </select>
        <select
          className="filter-select"
          value={modelFilter}
          onChange={(e) => setModelFilter(e.target.value)}
        >
          <option value="all">All Models</option>
          <option value="OpenAI GPT">OpenAI GPT</option>
          <option value="Google Gemini">Google Gemini</option>
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
          <div className="empty-description">Try adjusting your search or filters</div>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'document-grid' : 'document-list'}>
          {filtered.map((doc) => (
            <div key={doc.id} className="hist-document-card" onClick={() => navigate('/results')}>
              <div className="hist-document-thumbnail">
                <FileText size={48} color="#6B7280" />
              </div>
              <div className="hist-document-name">{doc.name}</div>
              <div className="hist-document-meta">{doc.date} &bull; {doc.model}</div>
              <div className="hist-document-footer">
                <span className={badgeClass(doc.status)}>{doc.status}</span>
                <div className="hist-document-actions">
                  <button className="action-icon-btn" aria-label="View" onClick={(e) => { e.stopPropagation(); navigate('/results') }}>
                    <Eye size={16} />
                  </button>
                  <button className="action-icon-btn delete" aria-label="Delete" onClick={(e) => e.stopPropagation()}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <div className="pagination-info">Showing 1-{filtered.length} of {filtered.length} documents</div>
        <div className="pagination-controls">
          <button className="page-button" disabled>&larr;</button>
          <button className="page-button active">1</button>
          <button className="page-button">&rarr;</button>
        </div>
      </div>
    </main>
  )
}
