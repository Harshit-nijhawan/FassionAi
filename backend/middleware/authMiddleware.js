// authMiddleware.js
// Ye check karta hai ki user logged in hai ya nahi
// Protected routes pe ye pehle chalta hai

const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  try {
    let token

    // Request ke header mein token dhundo
    // Frontend har request mein bhejta hai: "Bearer eyJhbGc..."
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]  // "Bearer TOKEN" → TOKEN
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Pehle login karo!'
      })
    }

    // Token verify karo — koi tamper toh nahi kiya?
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Token se user ID nikalo aur user dhundo
    req.user = await User.findById(decoded.id).select('-password')

    next()  // Sab theek hai — aage badho

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token invalid hai — dobara login karo!'
    })
  }
}

module.exports = { protect }