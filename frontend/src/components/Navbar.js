import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { cartCount } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>FashionAI ✨</Link>

        <div style={styles.links}>
          <Link to="/products" style={styles.link}>Products</Link>
          <Link to="/avatar" style={styles.link}>Try On AI 🪄</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

          {/* Agar logged in hai toh naam dikha + logout button */}
          {user ? (
            <>
              <span style={{ color: 'white', fontSize: '14px' }}>
                Hi, {user?.name?.split(' ')?.[0] || 'User'}! 👋
              </span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={styles.loginBtn}>Login</Link>
          )}

          <Link to="/cart" style={styles.cartBtn}>
            🛒 Cart
            {cartCount > 0 && (
              <span style={styles.badge}>{cartCount}</span>
            )}
          </Link>

        </div>
      </div>
    </nav>
  )
}

const styles = {
  nav: { backgroundColor: '#6c2bd9', padding: '12px 0', position: 'sticky', top: 0, zIndex: 100 },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logo: { color: 'white', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none' },
  links: { display: 'flex', gap: '30px' },
  link: { color: 'white', textDecoration: 'none', fontSize: '16px' },
  loginBtn: { backgroundColor: 'white', color: '#6c2bd9', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' },
  logoutBtn: { backgroundColor: 'transparent', color: 'white', border: '1px solid white', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '14px' },
  cartBtn: { backgroundColor: 'white', color: '#6c2bd9', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontWeight: 'bold', position: 'relative' },
  badge: { backgroundColor: 'red', color: 'white', borderRadius: '50%', padding: '2px 7px', fontSize: '12px', marginLeft: '6px' }
}