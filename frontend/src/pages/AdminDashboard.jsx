import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
  const token = localStorage.getItem('token'); // Or sessionStorage if you stored it there

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
    <div className="p-6">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <h1>hello</h1>
    </div>
  );
}
