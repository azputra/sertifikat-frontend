import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyPage = () => {
  const [barcode, setBarcode] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (barcode.trim()) {
      navigate(`/verify/${barcode}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Decorative background network graphic */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-contain bg-no-repeat bg-right-bottom"
           style={{ backgroundImage: 'url(/network-graphic.svg)' }}>
      </div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-[#5FAD41] mb-1">SECUONE</h1>
            <p className="text-[#335C81] text-sm mb-4">TAKE SECURITY SERIOUSLY</p>
            <h2 className="text-2xl font-semibold text-[#4472C4]">
              Certificate Verification
            </h2>
          </div>
          
          <p className="text-gray-600 mb-8 text-center">
            Enter the certificate barcode or scan the QR code to verify the authenticity of your SECUONE AIOT certificate.
          </p>
          
          <form onSubmit={handleSubmit} className="relative">
            <div className="mb-6">
              <label className="block text-[#4472C4] text-sm font-bold mb-2" htmlFor="barcode">
                Certificate Barcode
              </label>
              <input
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent transition"
                id="barcode"
                type="text"
                placeholder="Enter barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                required
              />
            </div>
            
            <div className="flex items-center justify-center">
              <button
                className="bg-[#5FAD41] hover:bg-[#4c8a34] text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5FAD41] w-full transition"
                type="submit"
              >
                Verify Certificate
              </button>
            </div>
          </form>
          
          {/* Decorative elements */}
          <div className="mt-10 flex justify-end space-x-2">
            <div className="w-16 h-3 bg-[#5FAD41] rounded-full"></div>
            <div className="w-16 h-3 bg-[#4472C4] rounded-full"></div>
            <div className="w-16 h-3 bg-[#5FAD41] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;