import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Home.css'

function Home() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🚀 Welcome to Nivaaran Portal</div>
          <h1 className="hero-title">
            Smart Complaint Resolution, <br />
            <span className="text-gradient">Powered by AI</span>
          </h1>
          <p className="hero-subtitle">
            Experience the future of public grievance management. Register, track, and resolve issues faster with automated department routing and priority detection.
          </p>
          <div className="hero-buttons">
            <Link to="/add-complaint" className="btn-primary">
              Register Complaint
            </Link>
            <Link to="/ai-analysis" className="btn-secondary">
              Try AI Analyzer ✨
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2>Why Choose Nivaaran?</h2>
            <p>Our platform leverages cutting-edge technology to streamline the complaint resolution process.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon bg-purple">🧠</div>
              <h3>AI-Powered Analysis</h3>
              <p>Automatically detects the urgency of your complaint and assigns it to the most relevant department instantly.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon bg-blue">⚡</div>
              <h3>Fast & Seamless</h3>
              <p>A highly optimized, user-friendly interface that lets you register complaints in just a few clicks.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon bg-green">📊</div>
              <h3>Real-Time Tracking</h3>
              <p>Keep a close eye on your complaint's progress with real-time status updates and transparent processing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to make a difference?</h2>
          <p>Join thousands of citizens using Nivaaran Portal to improve their communities.</p>
          <Link to="/signup" className="btn-cta">
            Create an Account Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home