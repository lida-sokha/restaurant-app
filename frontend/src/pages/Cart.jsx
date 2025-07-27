import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  const cartItems = Object.values(cart);

  const totalPrice = cartItems.reduce((sum, { item, quantity }) => {
    const price = Number(item.price) || 0;
    return sum + price * quantity;
  }, 0);

  if (cartItems.length === 0) {
    return <p className="text-center mt-20 text-xl">Your cart is empty.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
      <ul className="space-y-4">
        {cartItems.map(({ item, quantity }) => (
          <li
            key={item.item_id || item.id || item.name}
            className="flex justify-between items-center border p-4 rounded"
          >
            <div>
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p>Price: ${Number(item.price).toFixed(2)}</p>
              <p>Quantity: {quantity}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeFromCart(item)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                -
              </button>
              <button
                onClick={() => addToCart(item)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-right font-bold text-xl">
        Total: ${totalPrice.toFixed(2)}
      </div>
      <button
        onClick={clearCart}
        className="mt-6 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
      >
        Clear Cart
      </button>
    </div>
  );
}
