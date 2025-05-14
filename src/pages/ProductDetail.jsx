import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  useEffect(() => {
    // Simulate fetching product data
    // In a real app, this would be an API call
    setProduct({
      id: id,
      name: "Classic White Shirt",
      price: 49.99,
      description: "A timeless white shirt made from premium cotton. Perfect for any occasion, this versatile piece features a classic fit and button-down collar.",
      image: "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      category: "shirts",
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Black", "Blue"],
      details: [
        "100% Premium Cotton",
        "Button-down collar",
        "Classic fit",
        "Machine washable",
        "Model is 6'2\" and wearing size M"
      ]
    })
  }, [id])

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setError('Please select a size')
      return
    }
    if (!selectedColor) {
      setError('Please select a color')
      return
    }

    setError('')
    setIsAddingToCart(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      addToCart({
        ...product,
        selectedSize,
        selectedColor,
        quantity
      })
      
      // Navigate to cart page
      navigate('/cart')
    } catch (err) {
      setError('Failed to add item to cart. Please try again.')
    } finally {
      setIsAddingToCart(false)
    }
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color mx-auto mb-4"></div>
          <p className="text-secondary-color">Loading product...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      
      <div className="product-info">
        <h1>{product.name}</h1>
        <div className="price">${product.price.toFixed(2)}</div>
        <p className="description">{product.description}</p>

        <div className="product-options">
          <div className="option-group">
            <label>Size</label>
            <div className="size-options">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                  aria-label={`Select size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <label>Color</label>
            <div className="color-options">
              {product.colors.map(color => (
                <button
                  key={color}
                  className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select color ${color}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <label>Quantity</label>
            <div className="quantity-selector">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          className="add-to-cart-button" 
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Adding to Cart...
            </>
          ) : (
            'Add to Cart'
          )}
        </button>

        <div className="product-details">
          <h2>Product Details</h2>
          <ul>
            {product.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 