// routes/productRoutes.js
// Ye file batati hai ki /api/products pe aane wali
// requests kahan jaayengi

const express = require('express')
const router = express.Router()
const {
  getAllProducts,
  getProductById,
  createProduct
} = require('../controllers/productController')

// GET /api/products — saare products lao
router.get('/', getAllProducts)

// GET /api/products/123 — ek specific product lao
router.get('/:id', getProductById)

// POST /api/products — naya product add karo
router.post('/', createProduct)

module.exports = router