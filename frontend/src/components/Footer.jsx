import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-brand">
          ⚖️ <strong>Nivaaran Portal</strong>
        </span>

        <nav className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/add-complaint">Register</Link>
          <Link to="/complaints">Complaints</Link>
          <Link to="/ai-analysis">AI Analysis</Link>
        </nav>

        <span className="footer-copy">© {year} Nivaaran Portal</span>
      </div>
    </footer>
  )
}

export default Footer
