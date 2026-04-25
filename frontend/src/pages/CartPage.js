import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { cartItems, cartTotal, removeFromCart } = useCart()

  const handleCheckout = () => {
    toast.success('Order placed! Checkout feature coming soon 🛍️')
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#1a1a2e' }}>Your Cart 🛒</h1>
        <p style={{ color: '#888', marginBottom: '30px' }}>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
            <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '8px' }}>Cart khali hai!</p>
            <p style={{ color: '#888', marginBottom: '28px' }}>Kuch products add karo phir yahan aana.</p>
            <Link to="/products" style={{ backgroundColor: '#6c2bd9', color: 'white', padding: '14px 32px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>
              Shop Now →
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {cartItems.map(item => (
                <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  {/* Product Image */}
                  <img
                    src={item.images?.[0] || item.image || `https://placehold.co/80x100/f5f5f5/333?text=${encodeURIComponent(item.name?.charAt(0) || '?')}`}
                    alt={item.name}
                    style={{ width: '80px', height: '100px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }}
                  />
                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 'bold', fontSize: '16px', color: '#1a1a2e', marginBottom: '4px' }}>{item.name}</p>
                    <p style={{ color: '#888', fontSize: '13px', marginBottom: '6px' }}>{item.brand}{item.selectedSize ? ` · Size: ${item.selectedSize}` : ''}</p>
                    <p style={{ color: '#6c2bd9', fontWeight: 'bold' }}>₹{item.price} × {item.quantity} = <strong>₹{item.price * item.quantity}</strong></p>
                  </div>
                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{ backgroundColor: '#fff0f0', color: '#e53e3e', border: '1px solid #fed7d7', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', flexShrink: 0 }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '20px' }}>Order Summary</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#555' }}>
                <span>Subtotal ({cartItems.reduce((t, i) => t + i.quantity, 0)} items)</span>
                <span>₹{cartTotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#555' }}>
                <span>Delivery</span>
                <span style={{ color: '#22c55e', fontWeight: '600' }}>FREE</span>
              </div>
              <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '22px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '24px' }}>
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
              <button
                onClick={handleCheckout}
                style={{ width: '100%', padding: '18px', backgroundColor: '#6c2bd9', color: 'white', border: 'none', borderRadius: '14px', fontSize: '17px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '0.5px' }}
              >
                Proceed to Checkout →
              </button>
              <Link to="/products" style={{ display: 'block', textAlign: 'center', marginTop: '14px', color: '#6c2bd9', textDecoration: 'none', fontSize: '14px' }}>
                ← Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}