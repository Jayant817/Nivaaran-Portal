function ComplaintCard({ complaint }) {
  return (
    <div className="card">
      <h3>{complaint.title}</h3>

      <p>{complaint.description}</p>

      <p>
        <strong>Category:</strong> {complaint.category}
      </p>

      <p>
        <strong>Location:</strong> {complaint.location}
      </p>

      <p>
        <strong>Status:</strong> {complaint.status}
      </p>
    </div>
  )
}

export default ComplaintCard