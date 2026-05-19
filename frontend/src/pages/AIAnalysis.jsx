import { useState } from 'react'
import Navbar from '../components/Navbar'
import { analyzeComplaint } from '../api/aiApi'
import './AIAnalysis.css'

const PRIORITY_COLORS = {
  Critical: '#ef4444',
  High: '#f97316',
  Medium: '#eab308',
  Low: '#22c55e'
}

function AIAnalysis() {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleAnalyze = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)

    if (!description.trim() || description.trim().length < 10) {
      setError('Please enter a complaint description (minimum 10 characters).')
      return
    }

    setLoading(true)
    try {
      const res = await analyzeComplaint({ description: description.trim() })
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'AI analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />

      <div className="page-container">
        <div className="page-header">
          <h1>🤖 AI Complaint Analyzer</h1>
          <p>Enter a complaint description and our AI will detect urgency, suggest a department, and generate a response.</p>
        </div>

        <div className="ai-input-card">
          {error && <div className="alert alert-error">⚠️ {error}</div>}

          <form onSubmit={handleAnalyze}>
            <div className="form-group">
              <label htmlFor="ai-description">Complaint Description</label>
              <textarea
                id="ai-description"
                rows={5}
                placeholder="Describe the complaint in detail... (e.g. Water pipeline damaged near market area causing flooding on the main road)"
                value={description}
                onChange={(e) => {
                  setError('')
                  setDescription(e.target.value)
                }}
                disabled={loading}
              />
              <span className="char-count">{description.length} characters</span>
            </div>

            <button
              id="ai-analyze-btn"
              type="submit"
              className="ai-analyze-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span> Analyzing...
                </span>
              ) : '✨ Analyze with AI'}
            </button>
          </form>
        </div>

        {result && (
          <div className="ai-output-card">
            <div className="ai-output-header">
              <span className="ai-badge">🤖 AI Analysis Complete</span>
            </div>

            <div className="ai-output-grid">

              <div className="ai-output-item highlight">
                <div className="output-label">Urgency / Priority</div>
                <div
                  className="priority-pill"
                  style={{ background: PRIORITY_COLORS[result.priority] || '#6b7280' }}
                >
                  {result.priority}
                </div>
              </div>

              <div className="ai-output-item highlight">
                <div className="output-label">Responsible Department</div>
                <div className="output-value dept">🏛️ {result.department}</div>
              </div>

              <div className="ai-output-item wide">
                <div className="output-label">📝 Complaint Summary</div>
                <div className="output-value summary">"{result.summary}"</div>
              </div>

              <div className="ai-output-item wide response-box">
                <div className="output-label">💬 Auto-Generated Response</div>
                <div className="output-value response">{result.responseMessage}</div>
              </div>

            </div>

            <button
              className="reset-btn"
              onClick={() => { setResult(null); setDescription('') }}
            >
              🔄 Analyze Another
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AIAnalysis