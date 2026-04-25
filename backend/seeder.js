// seeder.js
// Ye file ek baar chalate hain — database mein sample products daal deta hai
// Command: node seeder.js

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('./models/Product')

dotenv.config()

// Sample products data
const products = [
  {
    name: 'Classic White T-Shirt',
    brand: 'H&M',
    description: 'Pure cotton comfortable t-shirt for everyday wear',
    price: 599,
    originalPrice: 999,
    category: 'tshirt',
    gender: 'men',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['white'],
    stock: 50,
    tags: ['casual', 'cotton', 'basic']
  },
  {
    name: 'Blue Slim Fit Jeans',
    brand: "Levi's",
    description: 'Classic slim fit denim jeans',
    price: 1999,
    originalPrice: 3499,
    category: 'jeans',
    gender: 'men',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400'],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['blue'],
    stock: 30,
    tags: ['denim', 'slim', 'casual']
  },
  {
    name: 'Black Hoodie',
    brand: 'Zara',
    description: 'Warm and stylish hoodie for winters',
    price: 1499,
    originalPrice: 2499,
    category: 'jacket',
    gender: 'unisex',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['black'],
    stock: 25,
    tags: ['winter', 'casual', 'hoodie']
  },
  {
    name: 'Floral Summer Dress',
    brand: 'FabAlley',
    description: 'Beautiful floral print dress for summers',
    price: 899,
    originalPrice: 1499,
    category: 'dress',
    gender: 'women',
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['multicolor'],
    stock: 20,
    tags: ['summer', 'floral', 'casual']
  },
  {
    name: 'Cotton Kurta',
    brand: 'FabIndia',
    description: 'Traditional cotton kurta for festive occasions',
    price: 799,
    originalPrice: 1299,
    category: 'kurta',
    gender: 'men',
    images: ['https://images.unsplash.com/photo-1612198273689-a9a09ce23a2f?w=400'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['white', 'blue', 'yellow'],
    stock: 40,
    tags: ['ethnic', 'festive', 'cotton']
  },
  {
    name: 'Sports Jacket',
    brand: 'Nike',
    description: 'Lightweight sports jacket for workouts',
    price: 2999,
    originalPrice: 4999,
    category: 'jacket',
    gender: 'men',
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['black', 'navy'],
    stock: 15,
    tags: ['sports', 'gym', 'workout']
  }
]

// Database se connect karo aur data daalo
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB connected!')

    // Pehle purane products delete karo
    await Product.deleteMany({})
    console.log('🗑️ Purane products delete ho gaye')

    // Naye products daalo
    await Product.insertMany(products)
    console.log('✅ Products database mein aa gaye!')

    process.exit(0)  // Script band karo

  } catch (error) {
    console.log('❌ Error:', error.message)
    process.exit(1)
  }
}

seedDatabase()