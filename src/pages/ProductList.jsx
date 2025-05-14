import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import './ProductList.css'

const ProductList = () => {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Classic White Shirt',
      price: 49.99,
      image: '/placeholder-shirt-1.jpg',
      category: 'Casual',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Blue', 'Black']
    },
    {
      id: 2,
      name: 'Business Blue Shirt',
      price: 59.99,
      image: '/placeholder-shirt-2.jpg',
      category: 'Formal',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Blue', 'White']
    },
    {
      id: 3,
      name: 'Summer Linen Shirt',
      price: 45.99,
      image: '/placeholder-shirt-3.jpg',
      category: 'Casual',
      sizes: ['S', 'M', 'L'],
      colors: ['Beige', 'Light Blue']
    }
  ])

  const [filters, setFilters] = useState({
    priceRange: [0, 100],
    size: '',
    color: ''
  })

  const filteredProducts = products.filter(product => {
    if (category && product.category !== category) return false
    if (filters.size && !product.sizes.includes(filters.size)) return false
    if (filters.color && !product.colors.includes(filters.color)) return false
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false
    return true
  })

  return (
    <div className="product-list">
      <div className="filters">
        <h3>Filters</h3>
        <div className="filter-group">
          <label>Size:</label>
          <select
            value={filters.size}
            onChange={(e) => setFilters({ ...filters, size: e.target.value })}
          >
            <option value="">All Sizes</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">Extra Large</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Color:</label>
          <select
            value={filters.color}
            onChange={(e) => setFilters({ ...filters, color: e.target.value })}
          >
            <option value="">All Colors</option>
            <option value="White">White</option>
            <option value="Blue">Blue</option>
            <option value="Black">Black</option>
            <option value="Beige">Beige</option>
            <option value="Light Blue">Light Blue</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Price Range:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters({
              ...filters,
              priceRange: [filters.priceRange[0], parseInt(e.target.value)]
            })}
          />
          <span>${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <div className="product-details">
              <p>Category: {product.category}</p>
              <p>Sizes: {product.sizes.join(', ')}</p>
              <p>Colors: {product.colors.join(', ')}</p>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList 