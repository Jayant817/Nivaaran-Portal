const { analyzeComplaintWithAI } = require('../services/aiService')

const analyzeComplaint = async (req, res) => {

  try {

    const { description } = req.body

    if (!description || description.trim() === '') {
      return res.status(400).json({
        message: 'Complaint description is required'
      })
    }

    const {
      priority,
      department,
      summary,
      responseMessage
    } = await analyzeComplaintWithAI(description)

    res.status(200).json({
      priority,
      department,
      summary,
      responseMessage
    })

  } catch (error) {

    console.error('AI Analysis Error:', error.message)

    res.status(500).json({
      message: 'Failed to analyze complaint with AI',
      error: error.message
    })
  }
}

module.exports = {
  analyzeComplaint
}