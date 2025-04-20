import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SertifikasiApp</h3>
            <p className="text-gray-400">
              Sistem verifikasi sertifikat digital dengan teknologi barcode untuk memastikan keaslian sertifikat Anda.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/verify" className="text-gray-400 hover:text-white">
                  Verifikasi Sertifikat
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white">
                  Login Admin
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Kontak</h3>
            <p className="text-gray-400 mb-2">
              Email: info@sertifikasiapp.com
            </p>
            <p className="text-gray-400">
              Telepon: +62 123 4567 890
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} SertifikasiApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;