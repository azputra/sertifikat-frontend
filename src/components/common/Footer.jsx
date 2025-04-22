// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-secuone.png';

const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Address - Left side */}
          <div>
            <img src={logo} alt="SecuOne Logo" className="h-8 mb-4" />
            <p className="text-gray-600 text-sm font-normal">
              Jl. Pantai Indah Selatan C19<br />
              Kapuk Muara, Penjaringan<br />
              Jakarta Utara<br />
              14470
            </p>
          </div>
          
          {/* Right side links container */}
          <div className="flex space-x-16 mt-6 md:mt-0">
            {/* Useful Links */}
            <div>
              <h3 className="text-gray-400 font-bold mb-4">Useful links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-gray-500 hover:text-gray-700">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about-us" className="text-gray-500 hover:text-gray-700">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-500 hover:text-gray-700">
                    Products
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-gray-400 font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://wa.me/yourphonenumber" className="text-gray-500 hover:text-gray-700">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="mailto:contact@secuone.com" className="text-gray-500 hover:text-gray-700">
                    Email
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/secuone" className="text-gray-500 hover:text-gray-700">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-6 text-center text-gray-400 text-sm border-t border-gray-100">
          <p>Copyright © 2025 Secuone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;