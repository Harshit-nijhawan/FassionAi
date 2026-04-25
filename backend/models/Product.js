// models/Product.js
// Website pe jo kapde dikhenge unka blueprint

const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  
  name: { type: String, required: true },     // Kapde ka naam
  brand: { type: String, required: true },    // Brand name
  
  description: String,                         // Detail description
  
  price: { 
    type: Number, 
    required: true 
  },
  
  originalPrice: Number,   // Pehle kitne ka tha — discount show karne ke liye
  
  category: {
    type: String,
    enum: ['tshirt', 'shirt', 'jeans', 'dress', 'jacket', 'shoes', 'kurta'],
    required: true
  },
  
  gender: {
    type: String,
    enum: ['men', 'women', 'unisex']
  },
  
  // Multiple images — front, back, side
  images: [String],
  
  // AI try-on ke liye transparent background wali image
  tryOnImage: String,
  
  sizes: [String],    // ['S', 'M', 'L', 'XL', 'XXL']
  
  colors: [String],   // ['red', 'blue', 'black']
  
  stock: { type: Number, default: 0 },
  
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  
  tags: [String]    // Search ke liye: ['casual', 'summer', 'cotton']

}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)