import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';

export default function Cart() {
  const { cartItems, addToCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const tableNumber = searchParams.get('table'); 

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
const orderNow = async () => {
  // prepare order object
  const order = {
    tableNumber,
    items: cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: Number(item.price) || 0,
    })),
    totalPrice,
  };

  try {
    // send order to backend
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    if (!response.ok) throw new Error('Failed to place order');

    const savedOrderResponse = await response.json();

    clearCart();

    // Normalize keys from snake_case to camelCase
    const orderFromBackend = savedOrderResponse.order;
    const normalizedOrder = {
      ...orderFromBackend,
      tableNumber: orderFromBackend.table_number,
      totalPrice: orderFromBackend.total_price,
      items: orderFromBackend.items || [],
    };

    // Navigate and pass the normalized order object
    navigate('/order-success', { state: { order: normalizedOrder } });
  } catch (error) {
    console.error('Error placing order:', error);
    alert('Failed to place order. Please try again.');
  }
};


return (
  <div className="min-h-screen bg-gray-50 pt-20">
  <div className="p-4 sm:p-6 pt-40">
    {/* Cart Header */}
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 ">Your Order</h1>
      <div className="mb-4 text-lg font-semibold text-gray-700">
  Table Number: {tableNumber ?? 'Not selected'}
  </div>

      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
      </span>
    </div>

    {/* Cart Items */}
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
      {cartItems.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/admin/menu')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-100">
            {cartItems.map((item) => (
              <li key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <div className="mt-1 flex flex-wrap gap-x-4 text-sm text-gray-600">
                      <p>${Number(item.price).toFixed(2)} each</p>
                      <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => updateQuantity(item, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        item.quantity <= 1 ? 'bg-gray-100 text-gray-400' : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                      aria-label={`Remove one ${item.name}`}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                      aria-label={`Add one ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Total:</span>
              <span className="font-bold text-lg text-gray-900">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>

    {/* Action Buttons */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <button
        onClick={() => navigate('/admin/menu')}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
      >
        Continue Shopping
      </button>
      <button
        onClick={clearCart}
        className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
      >
        Clear Cart
      </button>
      <button
        onClick={orderNow}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Checkout
      </button>
    </div>
  </div>
  </div>
);
}
