const Complaint = require('../models/Complaint')

// POST /api/complaints
const addComplaint = async (req, res, next) => {
  try {
    const complaint = new Complaint(req.body)
    await complaint.save()
    res.status(201).json({
      message: 'Complaint Added Successfully',
      complaint
    })
  } catch (error) {
    next(error)
  }
}

// GET /api/complaints  (supports ?category= filter)
const getComplaints = async (req, res, next) => {
  try {
    const filter = {}
    if (req.query.category) {
      filter.category = req.query.category
    }
    const complaints = await Complaint.find(filter).sort({ createdAt: -1 })
    res.status(200).json(complaints)
  } catch (error) {
    next(error)
  }
}

// PUT /api/complaints/:id
const updateComplaintStatus = async (req, res, next) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    )
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint Not Found' })
    }
    res.status(200).json(complaint)
  } catch (error) {
    next(error)
  }
}

// GET /api/complaints/search?location=Ghaziabad
const searchComplaint = async (req, res, next) => {
  try {
    const { location } = req.query
    if (!location) {
      return res.status(400).json({ message: 'Location query parameter is required' })
    }
    const complaints = await Complaint.find({
      location: { $regex: location, $options: 'i' }
    }).sort({ createdAt: -1 })
    res.status(200).json(complaints)
  } catch (error) {
    next(error)
  }
}

// DELETE /api/complaints/:id
const deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id)
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint Not Found' })
    }
    res.status(200).json({ message: 'Complaint Deleted Successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addComplaint,
  getComplaints,
  updateComplaintStatus,
  searchComplaint,
  deleteComplaint
}