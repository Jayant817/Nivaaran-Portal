import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getComplaints, searchComplaints, deleteComplaint } from '../api/complaintApi'
import { updateComplaintStatus } from '../api/complaintApi'
import './ComplaintList.css'

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

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(complaint._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>

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