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
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      
      <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
      <ul className="space-y-2">
        <li>
          <Link
            to="/admin/select-table"
            className="text-blue-600 hover:underline"
          >
            Select Table
          </Link>
        </li>
        <li>
          <Link
            to="/admin/menu"
            className="text-blue-600 hover:underline"
          >
            Admin Menu
          </Link>
        </li>
        <li>
          <Link
            to="/admin/cart"
            className="text-blue-600 hover:underline"
          >
            Cart
          </Link>
        </li>
      </ul>
    </div>
  );
}
