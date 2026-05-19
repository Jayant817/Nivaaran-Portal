import { useState, useContext } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { loginUser } from '../api/authApi'
import { AuthContext } from '../context/AuthContext'
import './Auth.css'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Show success message if redirected from signup
  const successMessage = location.state?.message || ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    setLoading(true)

    try {
      const res = await loginUser({ email, password })
      login(res.data.token)
      navigate('/dashboard')
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <div className="auth-icon">🔐</div>
          <h1>Welcome Back</h1>
          <p>Log in to your account</p>
        </div>

        {successMessage && (
          <div className="auth-success">
            ✅ {successMessage}
          </div>
        )}

        {error && (
          <div className="auth-error">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">

          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setError('')
                setEmail(e.target.value)
              }}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setError('')
                setPassword(e.target.value)
              }}
              disabled={loading}
            />
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="btn-loading">
                <span className="spinner"></span> Logging in...
              </span>
            ) : 'Log In'}
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <Link to="/signup">Sign up here</Link>
        </p>

      </div>
    </div>
  )
}

export default Login