import { useState } from 'react'
import './ComplaintForm.css'

const CATEGORIES = [
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

function ComplaintForm({ onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    description: '',
    category: '',
    location: '',
    status: 'Pending'
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email address'
    if (!formData.title.trim()) e.title = 'Complaint title is required'
    if (!formData.description.trim()) e.description = 'Description is required'
    if (!formData.category) e.category = 'Please select a category'
    if (!formData.location.trim()) e.location = 'Location is required'
    return e
  }

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' })
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    onSubmit(formData)
  }

  return (
    <form className="complaint-form" onSubmit={handleSubmit} noValidate>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cf-name">Full Name *</label>
          <input
            id="cf-name"
            type="text"
            name="name"
            placeholder="e.g. Rahul Kumar"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cf-email">Email Address *</label>
          <input
            id="cf-email"
            type="email"
            name="email"
            placeholder="e.g. rahul@gmail.com"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cf-title">Complaint Title *</label>
        <input
          id="cf-title"
          type="text"
          name="title"
          placeholder="Brief title of your complaint"
          value={formData.title}
          onChange={handleChange}
          disabled={loading}
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="cf-description">Complaint Description *</label>
        <textarea
          id="cf-description"
          name="description"
          placeholder="Describe your complaint in detail..."
          value={formData.description}
          onChange={handleChange}
          disabled={loading}
          rows={4}
          className={errors.description ? 'input-error' : ''}
        />
        {errors.description && <span className="field-error">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cf-category">Complaint Category *</label>
          <select
            id="cf-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
            className={errors.category ? 'input-error' : ''}
          >
            <option value="">-- Select Category --</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span className="field-error">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cf-location">Location *</label>
          <input
            id="cf-location"
            type="text"
            name="location"
            placeholder="e.g. Ghaziabad"
            value={formData.location}
            onChange={handleChange}
            disabled={loading}
            className={errors.location ? 'input-error' : ''}
          />
          {errors.location && <span className="field-error">{errors.location}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cf-status">Complaint Status</label>
        <select
          id="cf-status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={loading}
        >
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <button
        id="cf-submit-btn"
        type="submit"
        className="cf-submit-btn"
        disabled={loading}
      >
        {loading ? (
          <span className="btn-loading">
            <span className="spinner"></span> Submitting...
          </span>
        ) : '🚀 Submit Complaint'}
      </button>

    </form>
  )
}

export default ComplaintForm