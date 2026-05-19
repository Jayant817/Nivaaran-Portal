import { useState } from 'react'
import Navbar from '../components/Navbar'
import { updateComplaintStatus } from '../api/complaintApi'
import './UpdateStatus.css'

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Resolved', 'Rejected']

function UpdateStatus() {
  const [complaintId, setComplaintId] = useState('')
  const [status, setStatus] = useState('Pending')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)

    if (!complaintId.trim()) {
      setError('Please enter a valid Complaint ID.')
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const res = await updateComplaintStatus(complaintId.trim(), status, token)
      setResult(res.data)
    } catch (err) {
      const msg = err.response?.data?.message || 'Update failed. Please check the Complaint ID.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const STATUS_COLORS = {
    Pending: '#eab308',
    'In Progress': '#3b82f6',
    Resolved: '#22c55e',
    Rejected: '#ef4444'
  }

  return (
    <div>
      <Navbar />

      <div className="page-container">
        <div className="page-header">
          <h1>🔄 Update Complaint Status</h1>
          <p>Enter the complaint ID and select the new status to update it.</p>
        </div>

        <div className="update-card">
          {error && <div className="alert alert-error">⚠️ {error}</div>}

          <form onSubmit={handleSubmit} className="update-form">

            <div className="form-group">
              <label htmlFor="complaint-id">Complaint ID *</label>
              <input
                id="complaint-id"
                type="text"
                placeholder="Enter MongoDB complaint ID"
                value={complaintId}
                onChange={(e) => {
                  setError('')
                  setComplaintId(e.target.value)
                }}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-status">New Status *</label>
              <select
                id="new-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={loading}
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <button
              id="update-status-btn"
              type="submit"
              className="update-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span> Updating...
                </span>
              ) : '✅ Update Status'}
            </button>

          </form>

          {result && (
            <div className="update-result" style={{ borderLeftColor: STATUS_COLORS[result.status] }}>
              <h3>✅ Status Updated Successfully</h3>
              <div className="result-grid">
                <div><span>Title</span><strong>{result.title}</strong></div>
                <div><span>Location</span><strong>{result.location}</strong></div>
                <div><span>Category</span><strong>{result.category}</strong></div>
                <div>
                  <span>New Status</span>
                  <strong style={{ color: STATUS_COLORS[result.status] }}>{result.status}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UpdateStatus