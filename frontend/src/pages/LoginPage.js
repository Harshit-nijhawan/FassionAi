// LoginPage.js
// Login aur Signup dono ek hi page pe — tabs se switch karenge

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

export default function LoginPage() {
  // 'login' ya 'signup' — kaunsa tab active hai
  const [activeTab, setActiveTab] = useState('login')

  // Form fields ka data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [submitting, setSubmitting] = useState(false)
  const { login, register } = useAuth()
  const navigate = useNavigate()   // Page change karne ke liye

  // Input change hone pe formData update karo
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault()   // Page reload mat karo
    setSubmitting(true)

    let result
    if (activeTab === 'login') {
      result = await login(formData.email, formData.password)
    } else {
      result = await register(formData.name, formData.email, formData.password)
    }

    setSubmitting(false)

    // Success hone pe home page pe bhejo
    if (result.success) navigate('/')
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar />

      <div style={styles.wrapper}>
        <div style={styles.card}>

          {/* Heading */}
          <h1 style={styles.heading}>
            {activeTab === 'login' ? 'Welcome Back! 👋' : 'Join FashionAI! ✨'}
          </h1>

          {/* Tabs */}
          <div style={styles.tabs}>
            <button
              style={{
                ...styles.tab,
                backgroundColor: activeTab === 'login' ? '#6c2bd9' : 'transparent',
                color: activeTab === 'login' ? 'white' : '#888'
              }}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              style={{
                ...styles.tab,
                backgroundColor: activeTab === 'signup' ? '#6c2bd9' : 'transparent',
                color: activeTab === 'signup' ? 'white' : '#888'
              }}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={styles.form}>

            {/* Name field — sirf signup mein */}
            {activeTab === 'signup' && (
              <div style={styles.field}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Apna naam daalo"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            )}

            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                ...styles.submitBtn,
                opacity: submitting ? 0.7 : 1
              }}
            >
              {submitting
                ? 'Please wait...'
                : activeTab === 'login' ? 'Login Karo 🚀' : 'Account Banao 🎉'
              }
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' },
  card: { backgroundColor: 'white', borderRadius: '24px', padding: '48px', width: '100%', maxWidth: '440px', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' },
  heading: { fontSize: '28px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '24px', textAlign: 'center' },
  tabs: { display: 'flex', backgroundColor: '#f0f0f0', borderRadius: '12px', padding: '4px', marginBottom: '32px' },
  tab: { flex: 1, padding: '10px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '15px', transition: 'all 0.2s' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '14px', fontWeight: '600', color: '#333' },
  input: { padding: '14px 16px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '16px', outline: 'none', transition: 'border 0.2s' },
  submitBtn: { padding: '16px', backgroundColor: '#6c2bd9', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }
}