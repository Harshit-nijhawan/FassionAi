// ProductDetailPage.js
// Jab koi product card pe click kare toh ye page dikhega

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'   // URL se product ID lene ke liye
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductDetailPage() {
  const { id } = useParams()          // URL se :id le lo — /products/123 → id = 123
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const { addToCart } = useCart()

  const fetchProduct = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`)
      const data = await res.json()
      if (data.success) setProduct(data.product)
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Pehle size select karo!')
      return
    }
    addToCart({ ...product, selectedSize })
    toast.success('Cart mein add ho gaya! 🛒')
  }

  if (loading) return <div><Navbar /><p style={{padding:'40px', textAlign:'center'}}>Loading... ⏳</p></div>
  if (!product) return <div><Navbar /><p style={{padding:'40px', textAlign:'center'}}>Product nahi mila!</p></div>

  // Discount calculate karo
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar />

      <div style={styles.container}>

        {/* Left — Product Image */}
        <div style={styles.imageSection}>
          <img
            src={product.images?.[0] || product.image || `https://placehold.co/500x600/f5f5f5/333?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            style={styles.image}
          />
        </div>

        {/* Right — Product Info */}
        <div style={styles.infoSection}>

          <p style={styles.brand}>{product.brand}</p>
          <h1 style={styles.name}>{product.name}</h1>
          <p style={styles.description}>{product.description}</p>

          {/* Price */}
          <div style={styles.priceRow}>
            <span style={styles.price}>₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span style={styles.originalPrice}>₹{product.originalPrice}</span>
                <span style={styles.discount}>{discount}% OFF</span>
              </>
            )}
          </div>

          {/* Size Select */}
          <div style={styles.sizeSection}>
            <p style={styles.sizeLabel}>Size Select Karo:</p>
            <div style={styles.sizeRow}>
              {product.sizes?.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    ...styles.sizeBtn,
                    backgroundColor: selectedSize === size ? '#6c2bd9' : 'white',
                    color: selectedSize === size ? 'white' : '#333',
                    border: selectedSize === size ? '2px solid #6c2bd9' : '2px solid #ddd'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div style={styles.btnRow}>
            <button onClick={handleAddToCart} style={styles.cartBtn}>
              🛒 Add to Cart
            </button>
            <button
              onClick={() => toast.success('Try-On feature Week 2 mein aayega! 🪄')}
              style={styles.tryBtn}
            >
              🪄 Try On Avatar
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' },
  imageSection: {},
  image: { width: '100%', borderRadius: '20px', objectFit: 'cover' },
  infoSection: {},
  brand: { color: '#888', fontSize: '14px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' },
  name: { fontSize: '28px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '12px' },
  description: { color: '#555', lineHeight: '1.6', marginBottom: '20px' },
  priceRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' },
  price: { fontSize: '32px', fontWeight: 'bold', color: '#6c2bd9' },
  originalPrice: { fontSize: '20px', color: '#aaa', textDecoration: 'line-through' },
  discount: { backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px' },
  sizeSection: { marginBottom: '24px' },
  sizeLabel: { fontWeight: '600', marginBottom: '10px', color: '#1a1a2e' },
  sizeRow: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  sizeBtn: { padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: 'all 0.2s' },
  btnRow: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  cartBtn: { flex: 1, padding: '16px', backgroundColor: '#6c2bd9', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  tryBtn: { flex: 1, padding: '16px', backgroundColor: 'white', color: '#6c2bd9', border: '2px solid #6c2bd9', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }
}