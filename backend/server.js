// server.js
// Ye poore backend ka starting point hai
// Jab "npm run dev" chalate ho toh ye file pehle run hoti hai

const express = require('express')      // Express framework load karo
const mongoose = require('mongoose')    // MongoDB connection ke liye
const cors = require('cors')            // Frontend se baat karne ke liye
const dotenv = require('dotenv')        // .env file ki values load karo

dotenv.config()  // .env file padho — PORT, MONGO_URI etc available ho jayenge

const app = express()  // Express app banao

// ─── MIDDLEWARE ────────────────────────────────────────────
// Middleware matlab — har request aane se pehle ye code chalega

app.use(cors({
  origin: 'http://localhost:3000',  // Sirf React app se requests allow karo
  credentials: true                  // Cookies bhi allow karo
}))

app.use(express.json({ limit: "50mb" }))                              // JSON body parse karo (POST request ka data)
app.use(express.urlencoded({ extended: true, limit: "50mb" }))  // URL encoded / Form data parse karo

// Uploaded files serve karo — koi /uploads/xyz.jpg maange toh de do
app.use('/uploads', express.static('uploads'))

// ─── ROUTES ────────────────────────────────────────────────
// Routes matlab — kaunsi URL pe kya kaam hoga

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const avatarRoutes = require('./routes/avatarRoutes')   // AI feature

app.use('/api/products', productRoutes)  // /api/products pe product wale kaam
app.use('/api/users', userRoutes)         // /api/users pe login/signup
app.use('/api/orders', orderRoutes)       // /api/orders pe order wale kaam
app.use('/api/avatar', avatarRoutes)      // /api/avatar pe AI wale kaam

// Test route — server chal raha hai ya nahi check karo
app.get('/', (req, res) => {
  res.json({ message: 'FashionAI Server chal raha hai! 🚀' })
})

// ─── DATABASE CONNECTION ────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB se connect ho gaya!')
    // DB connect hone ke baad hi server start karo
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server port ${process.env.PORT} pe chal raha hai`)
    })
  })
  .catch((error) => {
    console.log('❌ MongoDB connection fail:', error.message)
  })