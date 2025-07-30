import { useLocation } from 'react-router-dom';

export default function OrderSuccess() {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order || !order.items || !Array.isArray(order.items)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-red-600 font-semibold">No order information found.</p>
      </div>
    );
  }

  const now = new Date();
  const formattedDate = now.toLocaleDateString();
  const formattedTime = now.toLocaleTimeString();

  const calcSubtotal = (item) => (item.price * item.quantity).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100 pt-20 flex justify-center items-start">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 m-4 font-mono">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Golden Corral</h1>
          <p className="text-sm text-gray-600">Receipt</p>
          <p className="text-xs text-gray-500">{formattedDate} {formattedTime}</p>
        </div>

        {/* Table Number */}
        <div className="mb-4 text-gray-800">
          <span className="font-semibold">Table Number:</span>{' '}
          {order.tableNumber ? order.tableNumber : <span className="text-red-500">Not selected</span>}
        </div>

        {/* Order Summary Table */}
        <table className="w-full border-collapse border border-gray-300 text-left text-sm mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-3 py-1">Qty</th>
              <th className="border border-gray-300 px-3 py-1">Item</th>
              <th className="border border-gray-300 px-3 py-1 text-right">Unit Price</th>
              <th className="border border-gray-300 px-3 py-1 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={`${item.name}-${idx}`} className="even:bg-gray-50">
                <td className="border border-gray-300 px-3 py-1">{item.quantity}</td>
                <td className="border border-gray-300 px-3 py-1">{item.name}</td>
                <td className="border border-gray-300 px-3 py-1 text-right">${item.price.toFixed(2)}</td>
                <td className="border border-gray-300 px-3 py-1 text-right">${calcSubtotal(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="flex justify-between border-t border-gray-400 pt-3 text-lg font-bold text-gray-900">
          <span>Total:</span>
          <span>${order.totalPrice?.toFixed(2) ?? '0.00'}</span>
        </div>

        {/* Thank You */}
        <div className="mt-8 text-center text-gray-700 text-sm">
          Thank you for dining with us!<br />
          Please visit again.
        </div>
      </div>
    </div>
  );
}
