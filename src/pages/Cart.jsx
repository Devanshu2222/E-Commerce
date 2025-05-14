import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import './Cart.css'

// Replace with your Stripe publishable key
const stripePromise = loadStripe('your_publishable_key')

const Cart = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Classic White Shirt',
      price: 49.99,
      quantity: 1,
      size: 'M',
      color: 'White',
      image: '/placeholder-shirt-1.jpg'
    }
  ])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise
      
      // Create a checkout session on your server
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
        }),
      })

      const session = await response.json()

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        console.error(result.error)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="continue-shopping">
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Size: {item.size}</p>
              <p>Color: {item.color}</p>
              <p className="price">${item.price}</p>
            </div>

            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>

            <div className="item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              className="remove-item"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${getTotal().toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${getTotal().toFixed(2)}</span>
        </div>

        <button
          className="checkout-button"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart 