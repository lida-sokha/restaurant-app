import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await axios.post(
      'http://localhost:5000/api/login',
      { 
        email: email.trim(),
        password: password
      },
      {
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true,
        timeout: 8000
      }
    );

    if (!response.data.token) {
      throw new Error('Authentication failed - no token received');
    }

    localStorage.setItem('token', response.data.token);

    // Check if user is admin and navigate accordingly
    if (response.data.user.is_admin) {
      navigate('/adminDashboard', { replace: true });
    } else {
      navigate('/admin/dashboard', { replace: true }); // normal user landing page
    }
  } catch (error) {
    // error handling (same as before)
    console.error('Login error details:', error);
    setError('Login failed: ' + (error.response?.data?.message || error.message));
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="/image/Home.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay to darken the image */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Login</h1>

          {error && (
            <div className="mb-4 text-red-600 text-sm bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          {location.state?.tokenExpired && (
            <div className="mb-4 text-yellow-600 text-sm bg-yellow-100 p-2 rounded">
              Session expired. Please log in again.
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md mt-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mt-1 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-700">
            Don’t have an account?{' '}
            <button
              onClick={() => navigate('/Register')}
              className="text-blue-600 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
