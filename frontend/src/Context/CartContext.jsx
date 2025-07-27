import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Helper to get unique key for an item
  const getKey = (item) => item.item_id ?? item.id ?? item.name;

  const addToCart = (item) => {
    const key = getKey(item);
    setCartItems(prevCart => {
      const existingItem = prevCart.find(ci => getKey(ci) === key);

      if (existingItem) {
        return prevCart.map(ci =>
          getKey(ci) === key
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (item, quantity) => {
    const key = getKey(item);
    setCartItems(prevCart =>
      prevCart
        .map(ci =>
          getKey(ci) === key
            ? { ...ci, quantity }
            : ci
        )
        .filter(ci => ci.quantity > 0)
    );
  };

  const removeFromCart = (item) => {
    const key = getKey(item);
    setCartItems(prevCart =>
      prevCart.filter(ci => getKey(ci) !== key)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
