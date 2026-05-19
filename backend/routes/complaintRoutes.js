const express = require('express')
const router = express.Router()

const {
  addComplaint,
  getComplaints,
  updateComplaintStatus,
  searchComplaint,
  deleteComplaint
} = require('../controllers/complaintController')

const authMiddleware = require('../middleware/authMiddleware')
const validateMiddleware = require('../middleware/validateMiddleware')
const validateComplaint = require('../validators/complaintValidator')

// IMPORTANT: /search must be before /:id to avoid route conflict
router.get('/search', searchComplaint)

router.post('/', authMiddleware, validateMiddleware(validateComplaint), addComplaint)

router.get('/', getComplaints)

router.put('/:id', authMiddleware, updateComplaintStatus)

router.delete('/:id', authMiddleware, deleteComplaint)

module.exports = router