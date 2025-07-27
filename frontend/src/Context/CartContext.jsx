import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (item, quantity) => {
    setCartItems(prev =>
      quantity > 0
        ? prev.map(i =>
            i.id === item.id ? { ...i, quantity } : i
          )
        : prev.filter(i => i.id !== item.id)
    );
  };

  const removeFromCart = (item) => {
    setCartItems(prev => prev.filter(i => i.id !== item.id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
