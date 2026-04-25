// userController.js
// Yahan login aur signup ki poori logic hai

const User = require('../models/User')
const jwt = require('jsonwebtoken')

// ── Token banane ka function ──────────────────────────
// JWT token = ek encrypted string jisme user ka id hota hai
// Ye token frontend ko dete hain — har request mein ye bhejta hai
// Server check karta hai — token sahi hai toh user logged in hai
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },                    // Token mein kya store karo
    process.env.JWT_SECRET,            // Secret key se encrypt karo
    { expiresIn: '30d' }               // 30 din baad expire hoga
  )
}

// ── SIGNUP ────────────────────────────────────────────
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validation — kya sab fields diye hain?
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email aur password zaroori hain!'
      })
    }

    // Kya ye email pehle se registered hai?
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Ye email pehle se registered hai!'
      })
    }

    // Naya user banao — password Model mein automatically encrypt hoga
    const user = await User.create({ name, email, password })

    // Token banao aur bhejo
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      message: 'Account ban gaya! 🎉',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ── LOGIN ─────────────────────────────────────────────
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email aur password daalo!'
      })
    }

    // User dhundo email se
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ya password galat hai!'
      })
    }

    // Password check karo — Model ka comparePassword method use karo
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Email ya password galat hai!'
      })
    }

    // Sab sahi hai — token bhejo
    const token = generateToken(user._id)

    res.json({
      success: true,
      message: `Welcome back, ${user.name}! 👋`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ── PROFILE GET ───────────────────────────────────────
const getProfile = async (req, res) => {
  try {
    // req.user middleware se aata hai — protected route mein
    const user = await User.findById(req.user.id).select('-password')
    res.json({ success: true, user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { registerUser, loginUser, getProfile }