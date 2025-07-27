import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';

export default function Cart() {
  const { cartItems, addToCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    return sum + price * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
        <p className="mt-20 text-xl">Your cart is empty.</p>
        <button
          onClick={() => navigate('/admin/menu')}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  // Handler for order now button
  const orderNow = () => {
    const order = {
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: Number(item.price) || 0,
      })),
      totalPrice,
    };

    clearCart(); // Clear the cart on ordering
    navigate('/order-success', { state: { order } }); // Navigate to order success page, passing order data
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.item_id || item.id || item.name}
            className="flex justify-between items-center border p-4 rounded"
          >
            <div>
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p>Price: ${Number(item.price).toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item, item.quantity - 1)}
                disabled={item.quantity <= 1}
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
      <div className="flex justify-between mt-6 gap-4">
        <button
          onClick={() => navigate('/admin/menu')}
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
        <button
          onClick={orderNow}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}
