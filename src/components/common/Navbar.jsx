// Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import keyLogo from '../../assets/key-logo.png';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Check if current user is admin
  const userDataFromStorage = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')) 
    : null;
  const isAdmin = userDataFromStorage?.isAdmin === true;
  
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Check if we're on an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home' && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      // If not on homepage, navigate to homepage then scroll
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={keyLogo} alt="keyLogo" className="h-8" />
          </Link>
        {/* {isAdminRoute ? (
        ) : (
          <Link to="/" className="flex items-center">
            <img src={logo} alt="SecuOne Logo" className="h-8" />
          </Link>
        )} */}
        {/* Navigation Links - positioned at the right */}
        <div className="flex items-center">
          {isAdminRoute ? (
            // Only show Dashboard link on admin routes
            <div className="mr-6">
              <Link 
                to="/admin/dashboard" 
                className="text-gray-700 hover:text-green-500 font-medium"
              >
                Admin Dashboard
              </Link>
            </div>
          ) : (
            // Normal navigation menu for non-admin routes with scroll functionality
            <div className="hidden md:flex items-center space-x-8 mr-6">
              <button 
                onClick={() => scrollToSection('home')}
                className={`${activeSection === 'home' ? 'text-green-500' : 'text-gray-700'} hover:text-green-500 font-medium`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`${activeSection === 'about' ? 'text-green-500' : 'text-gray-700'} hover:text-green-500 font-medium`}
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className={`${activeSection === 'products' ? 'text-green-500' : 'text-gray-700'} hover:text-green-500 font-medium`}
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`${activeSection === 'contact' ? 'text-green-500' : 'text-gray-700'} hover:text-green-500 font-medium`}
              >
                Contact Us
              </button>
            </div>
          )}
          
          {/* User Profile / Login */}
          {user && (
            <div className="relative">
              <button 
                onClick={toggleProfileMenu}
                className="flex items-center focus:outline-none text-gray-700"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </button>
              
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
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;