// HomePage.js — Main landing page

import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function HomePage() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Try Before You Buy 🪄</h1>
        <p style={styles.heroSub}>
          Apni photo daalo → AI Avatar banao → Koi bhi kapda try karo!
        </p>
        <div style={styles.btnRow}>
          <Link to="/avatar" style={styles.btnPrimary}>
            Create My Avatar 🪄
          </Link>
          <Link to="/products" style={styles.btnSecondary}>
            Shop Now →
          </Link>
        </div>
      </div>

      {/* Features */}
      <div style={styles.features}>
        <h2 style={styles.featTitle}>Kyu Choose Karein FashionAI?</h2>
        <div style={styles.cards}>
          
          <div style={styles.card}>
            <div style={styles.cardIcon}>🪄</div>
            <h3>AI Avatar</h3>
            <p>Apni photo se bilkul identical avatar banao!</p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcon}>👕</div>
            <h3>Virtual Try-On</h3>
            <p>Koi bhi kapda avatar pe try karo!</p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcon}>🎯</div>
            <h3>Smart Matching</h3>
            <p>AI batayega best outfit combination!</p>
          </div>

        </div>
      </div>
    </div>
  )
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #6c2bd9, #ec4899)',
    color: 'white',
    minHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '40px 20px'
  },
  heroTitle: { fontSize: '60px', fontWeight: 'bold', marginBottom: '20px' },
  heroSub: { fontSize: '22px', marginBottom: '40px', opacity: 0.9 },
  btnRow: { display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' },
  btnPrimary: {
    backgroundColor: 'white',
    color: '#6c2bd9',
    padding: '16px 32px',
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '18px'
  },
  btnSecondary: {
    border: '2px solid white',
    color: 'white',
    padding: '16px 32px',
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '18px'
  },
  features: { padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' },
  featTitle: { textAlign: 'center', fontSize: '32px', marginBottom: '50px', color: '#1a1a2e' },
  cards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s'
  },
  cardIcon: { fontSize: '50px', marginBottom: '16px' }
}