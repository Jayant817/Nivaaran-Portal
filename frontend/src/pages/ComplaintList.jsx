import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getComplaints, searchComplaints, deleteComplaint } from '../api/complaintApi'
import { updateComplaintStatus } from '../api/complaintApi'
import { analyzeComplaint } from '../api/aiApi'
import './ComplaintList.css'

const PRIORITY_COLORS = {
  Critical: '#ef4444',
  High: '#f97316',
  Medium: '#eab308',
  Low: '#22c55e'
}

const CATEGORIES = [
  'All',
  'Water Supply',
  'Electricity',
  'Roads & Infrastructure',
  'Sanitation',
  'Public Safety',
  'Parks & Recreation',
  'General Administration',
  'Other'
]

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Resolved', 'Rejected']

const STATUS_COLORS = {
  Pending: { bg: '#fef3c7', color: '#92400e' },
  'In Progress': { bg: '#dbeafe', color: '#1e40af' },
  Resolved: { bg: '#dcfce7', color: '#166534' },
  Rejected: { bg: '#fee2e2', color: '#991b1b' }
}

function ComplaintList() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [locationSearch, setLocationSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [updatingId, setUpdatingId] = useState(null)
  const [error, setError] = useState('')
  const [aiLoading, setAiLoading] = useState({})
  const [aiResults, setAiResults] = useState({})
  const [aiErrors, setAiErrors] = useState({})

  const handleAIAnalyze = async (id, description) => {
    setAiLoading(prev => ({ ...prev, [id]: true }))
    setAiErrors(prev => ({ ...prev, [id]: '' }))
    try {
      const res = await analyzeComplaint({ description })
      setAiResults(prev => ({ ...prev, [id]: res.data }))
    } catch (err) {
      const errMsg = err.response?.data?.message || 'AI analysis failed. Please try again.'
      setAiErrors(prev => ({ ...prev, [id]: errMsg }))
    } finally {
      setAiLoading(prev => ({ ...prev, [id]: false }))
    }
  }

  const fetchComplaints = async () => {
    setLoading(true)
    setError('')
    try {
      const cat = selectedCategory === 'All' ? '' : selectedCategory
      const res = await getComplaints(cat)
      setComplaints(res.data)
    } catch {
      setError('Failed to load complaints.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchComplaints()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchInput.trim()) {
      fetchComplaints()
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await searchComplaints(searchInput.trim())
      setComplaints(res.data)
      setLocationSearch(searchInput.trim())
    } catch {
      setError('Search failed.')
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setSearchInput('')
    setLocationSearch('')
    fetchComplaints()
  }

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id)
    try {
      const token = localStorage.getItem('token')
      const res = await updateComplaintStatus(id, newStatus, token)
      setComplaints(complaints.map(c => c._id === id ? res.data : c))
    } catch {
      alert('Failed to update status.')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this complaint?')) return
    try {
      const token = localStorage.getItem('token')
      await deleteComplaint(id, token)
      setComplaints(complaints.filter(c => c._id !== id))
    } catch {
      alert('Failed to delete complaint.')
    }
  }

  return (
    <div>
      <Navbar />

      <div className="page-container">

        <div className="page-header">
          <h1>📂 All Complaints</h1>
          <p>{complaints.length} complaint{complaints.length !== 1 ? 's' : ''} found
            {locationSearch ? ` in "${locationSearch}"` : ''}
          </p>
        </div>

        {/* Filters Row */}
        <div className="filters-row">
          {/* Category Filter */}
          <div className="filter-group">
            <label htmlFor="category-filter">Filter by Category</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setLocationSearch('')
                setSearchInput('')
              }}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Location Search */}
          <form className="search-form" onSubmit={handleSearch}>
            <div className="filter-group">
              <label htmlFor="location-search">Search by Location</label>
              <div className="search-input-row">
                <input
                  id="location-search"
                  type="text"
                  placeholder="e.g. Ghaziabad"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit" className="search-btn">🔍</button>
                {locationSearch && (
                  <button type="button" className="clear-btn" onClick={clearSearch}>✕</button>
                )}
              </div>
            </div>
          </form>
        </div>

        {error && <div className="alert alert-error">⚠️ {error}</div>}

        {loading ? (
          <div className="loading-state">
            <div className="loader-ring"></div>
            <p>Loading complaints...</p>
          </div>
        ) : complaints.length === 0 ? (
          <div className="empty-state">
            <span>📭</span>
            <p>No complaints found.</p>
          </div>
        ) : (
          <div className="complaints-list">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="complaint-card">

                <div className="card-header">
                  <div>
                    <h3>{complaint.title}</h3>
                    <div className="card-meta">
                      <span>👤 {complaint.name}</span>
                      <span>📧 {complaint.email}</span>
                      <span>📍 {complaint.location}</span>
                      <span>🗂️ {complaint.category}</span>
                    </div>
                  </div>

                  <span
                    className="status-badge"
                    style={STATUS_COLORS[complaint.status] || { bg: '#f3f4f6', color: '#374151' }}
                  >
                    {complaint.status}
                  </span>
                </div>

                <p className="card-description">{complaint.description}</p>

                <div className="card-footer">
                  <div className="status-update-row">
                    <label>Update Status:</label>
                    <select
                      value={complaint.status}
                      onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                      disabled={updatingId === complaint._id}
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {updatingId === complaint._id && <span className="updating-text">Updating...</span>}
                  </div>

                  <div className="card-action-buttons">
                    <button
                      className="ai-analyze-action-btn"
                      onClick={() => handleAIAnalyze(complaint._id, complaint.description)}
                      disabled={aiLoading[complaint._id]}
                    >
                      {aiLoading[complaint._id] ? (
                        <>
                          <span className="spinner-inline"></span> Analyzing...
                        </>
                      ) : '✨ AI Analyze'}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(complaint._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>

                {/* AI Analysis Result Panel */}
                {(aiLoading[complaint._id] || aiResults[complaint._id] || aiErrors[complaint._id]) && (
                  <div className="inline-ai-analysis animate-fade-in">
                    {aiLoading[complaint._id] && (
                      <div className="ai-inline-loading">
                        <span className="spinner-inline"></span> Analyzing complaint with AI agent...
                      </div>
                    )}

                    {aiErrors[complaint._id] && (
                      <div className="ai-inline-error">
                        ⚠️ {aiErrors[complaint._id]}
                      </div>
                    )}

                    {aiResults[complaint._id] && (
                      <div className="ai-inline-result">
                        <div className="ai-inline-header">
                          <span className="ai-inline-badge">🤖 AI Agent Feedback</span>
                        </div>
                        <div className="ai-inline-grid">
                          <div className="ai-inline-item">
                            <span className="ai-inline-label">Priority / Urgency</span>
                            <span
                              className="ai-inline-priority"
                              style={{ background: PRIORITY_COLORS[aiResults[complaint._id].priority] || '#6b7280' }}
                            >
                              {aiResults[complaint._id].priority}
                            </span>
                          </div>
                          <div className="ai-inline-item">
                            <span className="ai-inline-label">Suggested Department</span>
                            <span className="ai-inline-val dept-val">🏛️ {aiResults[complaint._id].department}</span>
                          </div>
                          <div className="ai-inline-item full">
                            <span className="ai-inline-label">AI Summarized Incident</span>
                            <span className="ai-inline-val summary-val">"{aiResults[complaint._id].summary}"</span>
                          </div>
                          <div className="ai-inline-item full ai-inline-response">
                            <span className="ai-inline-label">Auto-Generated Response Message</span>
                            <p className="ai-inline-text">"{aiResults[complaint._id].responseMessage}"</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="card-date">
                  {complaint.createdAt
                    ? new Date(complaint.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })
                    : ''}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ComplaintList