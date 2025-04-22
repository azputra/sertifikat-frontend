import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Properly check if current user is admin
  const userDataFromStorage = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')) 
    : null;
  const isAdmin = userDataFromStorage?.isAdmin === true;
  
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link to="/" className="text-green-500">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
            </svg>
          </Link>
          
          {/* Main Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="font-bold text-green-400">Branda</Link>
            {/* <Link to="/verify" className="text-gray-300 hover:text-green-400">Verifikasi</Link> */}
            {isAdmin && (
              <Link to="/admin/dashboard" className="text-gray-300 hover:text-green-400">
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          {/* <button className="text-blue-400 hover:text-blue-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button> */}
          
          {/* Profile Menu / Login Button */}
          {user ? (
            <div className="relative">
              <button 
                onClick={toggleProfileMenu}
                className="flex items-center focus:outline-none"
              >
                {/* User Icon instead of Profile Picture */}
                <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </button>
              
              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;