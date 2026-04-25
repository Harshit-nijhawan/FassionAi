// AuthContext.js
// Login/Logout ka state poori app mein share karne ke liye
// Bilkul CartContext jaisa — par user ke liye

import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export function AuthProvider({ children }) {

  // user = logged in user ki info, null matlab logged out
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // App start hote hi check karo — pehle se login hai kya?
  // Token localStorage mein save hota hai
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('fashionai_user')
      const savedToken = localStorage.getItem('fashionai_token')
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      // Agar localStorage data corrupt ho toh clear karo — app crash mat karo
      console.warn('AuthContext: localStorage data corrupt tha, clear kar diya:', error.message)
      localStorage.removeItem('fashionai_user')
      localStorage.removeItem('fashionai_token')
    } finally {
      setLoading(false)
    }
  }, [])

  // ── SIGNUP ──────────────────────────────────────────
  const register = async (name, email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()

      if (data.success) {
        // Token aur user info save karo
        localStorage.setItem('fashionai_token', data.token)
        localStorage.setItem('fashionai_user', JSON.stringify(data.user))
        setUser(data.user)
        toast.success(data.message)
        return { success: true }
      } else {
        toast.error(data.message)
        return { success: false }
      }
    } catch (error) {
      toast.error('Server se connect nahi ho pa raha!')
      return { success: false }
    }
  }

  // ── LOGIN ───────────────────────────────────────────
  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()

      if (data.success) {
        localStorage.setItem('fashionai_token', data.token)
        localStorage.setItem('fashionai_user', JSON.stringify(data.user))
        setUser(data.user)
        toast.success(data.message)
        return { success: true }
      } else {
        toast.error(data.message)
        return { success: false }
      }
    } catch (error) {
      toast.error('Server se connect nahi ho pa raha!')
      return { success: false }
    }
  }

  // ── LOGOUT ──────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem('fashionai_token')
    localStorage.removeItem('fashionai_user')
    setUser(null)
    toast.success('Logout ho gaye! 👋')
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext)
}