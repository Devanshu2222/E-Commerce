import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Navbar.css'

function Navbar() {
  const { cartItems } = useCart()
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          <img src="/images/logo.svg" alt="Harry Bai Logo" className="logo-image" />
          <span>Harry Bai</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <Link to="/cart" className="nav-cart">
          <img src="/images/cart-icon.svg" alt="Cart" className="cart-icon" />
          {itemCount > 0 && (
            <span className="cart-count">{itemCount}</span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar 