// ProductsPage.js — Saare products dikhenge yahan

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductsPage() {
  // products = backend se aane wala data
  const [products, setProducts] = useState([])
  // loading = data aa raha hai ya nahi
  const [loading, setLoading] = useState(true)

  const { addToCart } = useCart()

  // Page load hote hi products fetch karo
  useEffect(() => {
    fetchProducts()
  }, [])

 const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products')
      const data = await res.json()

      if (data.success) {
        setProducts(data.products)   // Real data set karo
      }
    } catch (error) {
      console.log('Backend se data nahi aaya, dummy use kar rahe hain')
      setProducts(dummyProducts)     // Fallback
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    toast.success(`${product.name} cart mein add ho gaya! 🛒`)
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={styles.center}>
          <p style={{ fontSize: '24px' }}>Products load ho rahe hain... ⏳</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>All Products 👕</h1>

        {/* Products Grid */}
        <div style={styles.grid}>
          {products.map(product => (
            <div key={product._id} style={styles.card}>
              
              {/* Product Image */}
              <Link to={`/products/${product._id}`}>
                <img
                  src={product.images?.[0] || product.image}
                  alt={product.name}
                  style={styles.image}
                />
              </Link>

              {/* Product Info */}
              <div style={styles.info}>
                <p style={styles.brand}>{product.brand}</p>
                <h3 style={styles.name}>{product.name}</h3>
                <p style={styles.price}>₹{product.price}</p>

                <button
                  style={styles.btn}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart 🛒
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Dummy data — jab tak backend ready nahi tab ye dikhega
const dummyProducts = [
  { _id: '1', name: 'Classic White T-Shirt', brand: 'H&M', price: 599, originalPrice: 999, images: ['https://placehold.co/300x400/f5f5f5/333?text=White+T-Shirt'] },
  { _id: '2', name: 'Blue Denim Jeans', brand: "Levi's", price: 1999, originalPrice: 3499, images: ['https://placehold.co/300x400/1a1a2e/fff?text=Blue+Jeans'] },
  { _id: '3', name: 'Black Hoodie', brand: 'Zara', price: 1499, originalPrice: 2499, images: ['https://placehold.co/300x400/222/fff?text=Black+Hoodie'] },
  { _id: '4', name: 'Floral Dress', brand: 'FabAlley', price: 899, originalPrice: 1499, images: ['https://placehold.co/300x400/f472b6/fff?text=Floral+Dress'] },
  { _id: '5', name: 'Sports Jacket', brand: 'Nike', price: 2999, originalPrice: 4999, images: ['https://placehold.co/300x400/6c2bd9/fff?text=Sports+Jacket'] },
  { _id: '6', name: 'Cotton Kurta', brand: 'FabIndia', price: 799, originalPrice: 1299, images: ['https://placehold.co/300x400/f59e0b/fff?text=Cotton+Kurta'] },
]

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' },
  title: { fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', color: '#1a1a2e' },
  center: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' },
  card: { backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
  image: { width: '100%', height: '300px', objectFit: 'cover' },
  info: { padding: '16px' },
  brand: { color: '#888', fontSize: '13px', marginBottom: '4px' },
  name: { fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#1a1a2e' },
  price: { fontSize: '20px', fontWeight: 'bold', color: '#6c2bd9', marginBottom: '12px' },
  btn: { width: '100%', padding: '10px', backgroundColor: '#6c2bd9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }
}