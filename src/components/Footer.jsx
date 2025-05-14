import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Harry Bai</h3>
          <p className="footer-description">
            Premium men's shirts for every occasion. Quality craftsmanship and timeless style.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/products" className="footer-link">Products</Link>
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact Us</h4>
          <div className="footer-contact">
            <p>Email: info@harrybai.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Address: 123 Fashion St, Style City</p>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Follow Us</h4>
          <div className="footer-social">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Harry Bai. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer 