import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({}); 
  // cart shape: { key: { item, quantity } }

  const addToCart = (item) => {
    const key = item.item_id || item.id || item.name;
    setCart(prev => ({
      ...prev,
      [key]: {
        item,
        quantity: prev[key] ? prev[key].quantity + 1 : 1
      }
    }));
  };

  const removeFromCart = (item) => {
    const key = item.item_id || item.id || item.name;
    setCart(prev => {
      if (!prev[key]) return prev;
      const newQty = prev[key].quantity - 1;
      if (newQty <= 0) {
        const newCart = { ...prev };
        delete newCart[key];
        return newCart;
      }
      return {
        ...prev,
        [key]: { item, quantity: newQty }
      };
    });
  };

  const clearCart = () => setCart({});

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
