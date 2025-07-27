import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const cartItems = Object.values(cart);

  const totalPrice = cartItems.reduce((sum, { item, quantity }) => {
    const price = Number(item.price) || 0;
    return sum + price * quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
        <p className="mt-20 text-xl">Your cart is empty.</p>
        <button
          onClick={() => navigate('/adminMenu')}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Menu
        </button>
      </div>
    );
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
                aria-label={`Remove one ${item.name}`}
              >
                -
              </button>
              <button
                onClick={() => addToCart(item)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                aria-label={`Add one ${item.name}`}
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
      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate('/adminMenu')}
          className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Back to Menu
        </button>
        <button
          onClick={clearCart}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
