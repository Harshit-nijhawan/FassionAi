// controllers/productController.js
// Yahan actual LOGIC hai — database se data kaise laana hai

const Product = require('../models/Product')

// Saare products fetch karo
const getAllProducts = async (req, res) => {
  try {
    // req.query mein URL ke filters hote hain
    // jaise: /api/products?category=tshirt&gender=men
    const { category, gender, search, minPrice, maxPrice } = req.query
    
    // Filter object banao — jo diya wahi filter lagao
    let filter = {}
    if (category) filter.category = category
    if (gender) filter.gender = gender
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)  // Greater than equal
      if (maxPrice) filter.price.$lte = Number(maxPrice)  // Less than equal
    }
    if (search) {
      // Name ya brand mein search karo — case insensitive
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ]
    }
    
    const products = await Product.find(filter)
    
    res.json({
      success: true,
      count: products.length,
      products
    })
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Ek product fetch karo ID se
const getProductById = async (req, res) => {
  try {
    // req.params.id = URL mein jo id diya /:id pe
    const product = await Product.findById(req.params.id)
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product nahi mila!' 
      })
    }
    
    res.json({ success: true, product })
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Naya product add karo
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json({ success: true, product })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

module.exports = { getAllProducts, getProductById, createProduct }