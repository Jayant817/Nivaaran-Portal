import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import '../styles/Navbar.css'

function Navbar() {
  const { token, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-logo">⚖️</span>
        Nivaaran Portal
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/add-complaint">Add Complaint</Link>
            <Link to="/complaints">Complaints</Link>
            <Link to="/update-status">Update Status</Link>
            <Link to="/ai-analysis">AI Analysis</Link>
            <button
              id="navbar-logout-btn"
              className="navbar-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="navbar-signup-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar