// avatarRoutes.js

const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { generateAvatar, virtualTryOn, uploadMyCloth } = require('../controllers/avatarController')

// ── Multer Setup (File Upload) ───────────────────────────────
// Multer = file upload handle karne wali library

// Files kahan save hongi?
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 'uploads/' folder mein — pehle ye folder banao!
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    // File ka unique naam — timestamp + original naam
    // Example: 1703123456789-myphoto.jpg
    const uniqueName = Date.now() + '-' + file.originalname
    cb(null, uniqueName)
  }
})

// Sirf images allow karo
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (allowed.includes(file.mimetype)) {
    cb(null, true)   // Allow karo
  } else {
    cb(new Error('Sirf JPG, PNG, WEBP images allowed hain!'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }  // Max 50MB
})

// ── Routes ───────────────────────────────────────────────────

// Photo upload karo + avatar generate karo
router.post('/generate', upload.single('photo'), generateAvatar)

// Virtual try-on
router.post('/tryon', virtualTryOn)

// Apna kapda upload karo
router.post('/upload-cloth', upload.single('cloth'), uploadMyCloth)

module.exports = router