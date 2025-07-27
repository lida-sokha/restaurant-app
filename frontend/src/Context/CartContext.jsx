import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevCart => {
      const existingItem = prevCart.find(ci => ci.item_id === item.item_id);

      if (existingItem) {
        return prevCart.map(ci =>
          ci.item_id === item.item_id
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (item, quantity) => {
    setCartItems(prevCart =>
      prevCart.map(ci =>
        ci.item_id === item.item_id
          ? { ...ci, quantity }
          : ci
      ).filter(ci => ci.quantity > 0)
    );
  };

  const removeFromCart = (item) => {
    setCartItems(prevCart =>
      prevCart.filter(ci => ci.item_id !== item.item_id)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
