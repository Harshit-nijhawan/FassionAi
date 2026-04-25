// CartContext.js
// Ye file cart ka data poori app mein share karti hai
// Bina is ke har page pe alag alag cart manage karna padta

import { createContext, useContext, useState } from 'react'

// Context banao — ek global "dabba" jisme cart ka data rahega
const CartContext = createContext()

// CartProvider — ye poori app ko wrap karega
// Iske andar jo bhi component hoga usse cart ka data milega
export function CartProvider({ children }) {
  
  // cartItems = array of products jo cart mein hain
  const [cartItems, setCartItems] = useState([])

  // Cart mein item add karo
  const addToCart = (product) => {
    setCartItems(prev => {
      // Kya ye product pehle se cart mein hai?
      const exists = prev.find(item => item._id === product._id)
      if (exists) {
        // Hai toh quantity badha do
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      // Nahi hai toh naya add karo quantity 1 ke saath
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Cart se item hatao
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId))
  }

  // Total kitne items hain cart mein
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  // Total price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  )

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook — kisi bhi component mein cart use karne ke liye
// Usage: const { cartItems, addToCart } = useCart()
export function useCart() {
  return useContext(CartContext)
}