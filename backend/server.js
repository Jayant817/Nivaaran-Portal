const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const complaintRoutes = require('./routes/complaintRoutes')
const authRoutes = require('./routes/authRoutes')
const aiRoutes = require('./routes/aiRoutes')
const errorMiddleware = require('./middleware/errorMiddleware')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/complaints', complaintRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/ai', aiRoutes)

// Basic root route
app.get('/', (req, res) => {
  res.json({ message: 'Nivaaran Portal API is running successfully!' })
})

// Global error handler (must be last)
app.use(errorMiddleware)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB Connected')
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Running On Port ${process.env.PORT || 5000}`)
  })
})
.catch((error) => {
  console.log(error)
})