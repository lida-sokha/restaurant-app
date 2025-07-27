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
    <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3">
        Admin Dashboard
      </h1>

      {message && (
        <p className="mb-6 px-4 py-3 bg-green-100 border border-green-400 text-green-700 rounded shadow-sm">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-6 px-4 py-3 bg-red-100 border border-red-400 text-red-700 rounded shadow-sm">
          {error}
        </p>
      )}

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Links
        </h2>

        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/select-table"
              className="block px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Select Table
            </Link>
          </li>
          <li>
            <Link
              to="/admin/menu"
              className="block px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Admin Menu
            </Link>
          </li>
          <li>
            <Link
              to="/admin/cart"
              className="block px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Cart
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
