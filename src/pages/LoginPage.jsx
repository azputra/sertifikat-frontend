import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await login(username, password);
      toast.success('Login berhasil!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login gagal');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background network graphic */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-contain bg-no-repeat bg-right-bottom"
           style={{ backgroundImage: 'url(/network-graphic.svg)' }}>
      </div>
      
      <div className="max-w-md w-full space-y-6 bg-white p-10 rounded-lg shadow-md border border-gray-200 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#5FAD41] mb-1">SECUONE</h1>
          <p className="text-[#335C81] text-sm mb-4">TAKE SECURITY SERIOUSLY</p>
          <h2 className="text-2xl font-semibold text-[#4472C4]">
            Admin Login
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#4472C4] mb-1">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent transition"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#4472C4] mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent transition"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#5FAD41] hover:bg-[#4c8a34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5FAD41] transition"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : 'Login'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <Link to="/" className="font-medium text-[#4472C4] hover:text-[#385da2] transition">
            Kembali ke Beranda
          </Link>
        </div>
        
        {/* Decorative elements */}
        <div className="mt-6 flex justify-end space-x-2">
          <div className="w-16 h-3 bg-[#5FAD41] rounded-full"></div>
          <div className="w-16 h-3 bg-[#4472C4] rounded-full"></div>
          <div className="w-16 h-3 bg-[#5FAD41] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;