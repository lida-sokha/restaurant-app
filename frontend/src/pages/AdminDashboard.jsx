import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:5000/api/admin/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setMessage(res.data.message);
    })
    .catch((err) => {
      console.error('Admin Dashboard Error:', err);
      setError(err.response?.data?.error || 'Access denied');
    });
  }, []);

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <p className="bg-green-100 text-green-800 border border-green-300 rounded-md px-4 py-3">
          Welcome Admin, this is the dashboard
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Links</h2>

      <ul className="space-y-4">
        {[
          { to: '/admin/select-table', label: 'Select Table' },
          { to: '/admin/menu', label: 'Admin Menu' },
          { to: '/admin/cart', label: 'Cart' },
        ].map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8">
          <Link
            to="/admin/reservations"
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-3 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Reservations
          </Link>
        </div>
    </div>
  </div>
);

}
