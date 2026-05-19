const bcrypt =
require('bcryptjs')

const jwt =
require('jsonwebtoken')

const User =
require('../models/User')

const signup =
async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body

    const existingUser =
    await User.findOne({ email })

    if (existingUser) {

      return res.status(400).json({
        message:
        'User Already Exists'
      })
    }

    const hashedPassword =
    await bcrypt.hash(password, 10)

    const user = new User({

      name,
      email,

      password:
      hashedPassword
    })

    await user.save()

    res.status(201).json({
      message:
      'Signup Successful'
    })

  } catch (error) {

    res.status(500).json({
      message: 'Server Error'
    })
  }
}

const login =
async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body

    const user =
    await User.findOne({ email })

    if (!user) {

      return res.status(400).json({
        message:
        'Invalid Credentials'
      })
    }

    const isMatch =
    await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {

      return res.status(400).json({
        message:
        'Invalid Credentials'
      })
    }

    const token =
    jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: '1d'
      }
    )

    res.status(200).json({
      token
    })

  } catch (error) {

    res.status(500).json({
      message: 'Server Error'
    })
  }
}

module.exports = {
  signup,
  login
}