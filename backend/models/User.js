// models/User.js
// Ye define karta hai ki MongoDB mein ek User ka data kaisa dikhega

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Schema = blueprint — user ke andar kya kya hoga
const userSchema = new mongoose.Schema({
  
  name: {
    type: String,      // Text value
    required: true     // Ye field zaroori hai
  },
  
  email: {
    type: String,
    required: true,
    unique: true,       // Do users ka same email nahi ho sakta
    lowercase: true     // Hamesha lowercase mein save karo
  },
  
  password: {
    type: String,
    required: true,
    minlength: 6        // Kam se kam 6 characters
  },
  
  // Avatar related data — AI feature ke liye
  avatar: {
    photoUrl: String,         // User ki original photo
    avatarUrl: String,        // Generated avatar ki photo
    bodyMeasurements: {
      height: Number,         // Cms mein
      weight: Number,
      bodyType: String        // 'slim', 'athletic', 'fat', 'average'
    }
  },
  
  // User ki khud ki uploaded clothes
  myWardrobe: [{
    imageUrl: String,         // Kapde ki photo
    category: String,         // 'tshirt', 'jeans', 'shirt' etc
    color: String,
    uploadedAt: Date
  }],
  
  // Wishlist — pasand aaye products
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,  // Product ka ID store hoga
    ref: 'Product'                          // Product model se connected hai
  }]

}, { 
  timestamps: true   // Automatically createdAt aur updatedAt add hoga
})

// Password save karne se PEHLE encrypt karo
// 'pre' hook = save se pehle ye function chalo
userSchema.pre('save', async function(next) {
  // Agar password change nahi hua toh encrypt mat karo
  if (!this.isModified('password')) return next()
  
  // bcrypt se encrypt karo — 12 = encryption strength
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Login ke time password check karne ka method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)