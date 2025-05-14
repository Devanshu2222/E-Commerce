import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: 1,
      name: 'Classic White Shirt',
      price: 49.99,
      image: '/placeholder-shirt-1.jpg',
      category: 'Casual'
    },
    {
      id: 2,
      name: 'Business Blue Shirt',
      price: 59.99,
      image: '/placeholder-shirt-2.jpg',
      category: 'Formal'
    },
    {
      id: 3,
      name: 'Summer Linen Shirt',
      price: 45.99,
      image: '/placeholder-shirt-3.jpg',
      category: 'Casual'
    }
  ])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Premium Men's Shirts</h1>
          <p>Discover our collection of high-quality shirts for every occasion</p>
          <Link to="/products" className="cta-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">
            <h3>Formal Shirts</h3>
            <Link to="/products?category=formal">View Collection</Link>
          </div>
          <div className="category-card">
            <h3>Casual Shirts</h3>
            <Link to="/products?category=casual">View Collection</Link>
          </div>
          <div className="category-card">
            <h3>Summer Collection</h3>
            <Link to="/products?category=summer">View Collection</Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <Link to={`/product/${product.id}`} className="view-product">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="special-offers">
        <div className="offer-card">
          <h2>Special Offer</h2>
          <p>Get 20% off on your first purchase</p>
          <Link to="/products" className="cta-button">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home 