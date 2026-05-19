import { useState } from 'react'
import Navbar from '../components/Navbar'
import ComplaintForm from '../components/ComplaintForm'
import { addComplaint } from '../api/complaintApi'
import { analyzeComplaint } from '../api/aiApi'
import './AddComplaint.css'

function AddComplaint() {
  const [submitting, setSubmitting] = useState(false)
  const [aiResult, setAiResult] = useState(null)
  const [complaintError, setComplaintError] = useState('')
  const [aiError, setAiError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (data) => {
    setSubmitting(true)
    setComplaintError('')
    setAiError('')
    setAiResult(null)
    setSuccess(false)

    const token = localStorage.getItem('token')

    // Step 1: Submit complaint (must succeed)
    try {
      await addComplaint(data, token)
      setSuccess(true)
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit complaint. Please try again.'
      setComplaintError(msg)
      setSubmitting(false)
      return // Stop if complaint itself failed
    }

    // Step 2: AI analysis (independent — failure doesn't undo the complaint)
    try {
      const aiRes = await analyzeComplaint({ description: data.description })
      setAiResult(aiRes.data)
    } catch (err) {
      setAiError('Complaint registered ✅ but AI analysis is temporarily unavailable.')
    } finally {
      setSubmitting(false)
    }
  }

  const priorityColor = {
    Critical: '#ef4444',
    High: '#f97316',
    Medium: '#eab308',
    Low: '#22c55e'
  }

  return (
    <div>
      <Navbar />

      <div className="page-container">
        <div className="page-header">
          <h1>📋 Register a Complaint</h1>
          <p>Fill in the details below. Our AI will analyze your complaint instantly.</p>
        </div>

        {complaintError && (
          <div className="alert alert-error">⚠️ {complaintError}</div>
        )}

        {success && !aiResult && !aiError && (
          <div className="alert alert-success">✅ Complaint submitted! Running AI analysis...</div>
        )}

        {aiError && (
          <div className="alert alert-warning">ℹ️ {aiError}</div>
        )}

        <ComplaintForm onSubmit={handleSubmit} loading={submitting} />

        {aiResult && (
          <div className="ai-result-card">
            <div className="ai-result-header">
              <span className="ai-badge">🤖 AI Analysis</span>
              <h2>Complaint Analysis Result</h2>
            </div>

            <div className="ai-result-grid">
              <div className="ai-result-item">
                <span className="ai-label">Priority</span>
                <span
                  className="ai-value priority-badge"
                  style={{ background: priorityColor[aiResult.priority] || '#6b7280' }}
                >
                  {aiResult.priority}
                </span>
              </div>

              <div className="ai-result-item">
                <span className="ai-label">Responsible Department</span>
                <span className="ai-value dept-value">🏛️ {aiResult.department}</span>
              </div>

              <div className="ai-result-item full-width">
                <span className="ai-label">📝 AI Summary</span>
                <span className="ai-value summary-value">{aiResult.summary}</span>
              </div>

              <div className="ai-result-item full-width">
                <span className="ai-label">💬 Automated Response</span>
                <p className="ai-response-msg">{aiResult.responseMessage}</p>
              </div>
            </div>

            <div className="ai-success-banner">
              ✅ Your complaint has been registered and forwarded to the {aiResult.department}.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddComplaint