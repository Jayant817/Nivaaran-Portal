import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getComplaints } from '../api/complaintApi'
import './Dashboard.css'

function Dashboard() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 })

  const fetchData = async () => {
    try {
      const res = await getComplaints()
      const data = res.data
      setComplaints(data)

      // Calculate stats
      setStats({
        total: data.length,
        pending: data.filter(c => c.status === 'Pending').length,
        inProgress: data.filter(c => c.status === 'In Progress').length,
        resolved: data.filter(c => c.status === 'Resolved').length
      })
    } catch (err) {
      console.error("Failed to fetch complaints", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
  }, [])

  // Get recent 5 complaints
  const recentComplaints = complaints.slice(0, 5)

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="page-container">
        <div className="dashboard-header">
          <div>
            <h1>👋 Welcome back!</h1>
            <p>Here is an overview of the complaint system's current status.</p>
          </div>
          <div className="header-actions">
            <Link to="/add-complaint" className="btn-dash-primary">
              + New Complaint
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card stat-total">
            <div className="stat-icon">📁</div>
            <div className="stat-info">
              <h3>Total Complaints</h3>
              <h2>{loading ? '...' : stats.total}</h2>
            </div>
          </div>
          <div className="stat-card stat-pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>Pending</h3>
              <h2>{loading ? '...' : stats.pending}</h2>
            </div>
          </div>
          <div className="stat-card stat-progress">
            <div className="stat-icon">🔄</div>
            <div className="stat-info">
              <h3>In Progress</h3>
              <h2>{loading ? '...' : stats.inProgress}</h2>
            </div>
          </div>
          <div className="stat-card stat-resolved">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>Resolved</h3>
              <h2>{loading ? '...' : stats.resolved}</h2>
            </div>
          </div>
        </div>

        <div className="dashboard-content-grid">
          {/* Recent Activity */}
          <div className="dash-section recent-activity">
            <div className="section-title">
              <h2>Recent Complaints</h2>
              <Link to="/complaints" className="view-all-link">View All →</Link>
            </div>
            
            {loading ? (
              <div className="dash-loading">Loading data...</div>
            ) : recentComplaints.length === 0 ? (
              <div className="dash-empty">No complaints registered yet.</div>
            ) : (
              <div className="recent-list">
                {recentComplaints.map(c => (
                  <div key={c._id} className="recent-item">
                    <div className="recent-item-main">
                      <h4>{c.title}</h4>
                      <span>📍 {c.location} | 🗂️ {c.category}</span>
                    </div>
                    <div className={`status-pill status-${c.status.replace(' ', '').toLowerCase()}`}>
                      {c.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="dash-section quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <Link to="/ai-analysis" className="action-btn">
                <span className="action-icon">🤖</span>
                <div className="action-text">
                  <h4>AI Analyzer</h4>
                  <p>Test complaint routing</p>
                </div>
              </Link>
              
              <Link to="/update-status" className="action-btn">
                <span className="action-icon">🔄</span>
                <div className="action-text">
                  <h4>Update Status</h4>
                  <p>Change complaint state</p>
                </div>
              </Link>

              <Link to="/complaints" className="action-btn">
                <span className="action-icon">🔍</span>
                <div className="action-text">
                  <h4>Search & Filter</h4>
                  <p>Find specific complaints</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard