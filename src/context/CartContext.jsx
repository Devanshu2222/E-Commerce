import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(
        item => item.id === product.id && 
        item.selectedSize === product.selectedSize && 
        item.selectedColor === product.selectedColor
      );

      if (existingItem) {
        // Update quantity if item exists
        return prevItems.map(item =>
          item.id === product.id && 
          item.selectedSize === product.selectedSize && 
          item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, product];
      }
    });
  };

  const removeFromCart = (itemId, selectedSize, selectedColor) => {
    setCartItems(prevItems =>
      prevItems.filter(
        item => !(item.id === itemId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor)
      )
    );
  };

  const updateQuantity = (itemId, selectedSize, selectedColor, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 