import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { useReactToPrint } from 'react-to-print';
import useAuthStore from '../stores/useAuthStore';
import useCertificateStore from '../stores/useCertificateStore';

const ViewCertificatePage = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { certificate, getCertificateById, isLoading, error } = useCertificateStore();
  const navigate = useNavigate();
  const certificateRef = useRef();
  
  // Same functionality as before...
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#5FAD41]">Certificate Details</h1>
          <div className="flex space-x-2">
            <button
              onClick={handlePrint}
              className="bg-[#5FAD41] text-white px-4 py-2 rounded-md hover:bg-[#4c8a34] transition"
            >
              Print Certificate
            </button>
            <Link
              to={`/edit-certificate/${id}`}
              className="bg-[#4472C4] text-white px-4 py-2 rounded-md hover:bg-[#385da2] transition"
            >
              Edit Certificate
            </Link>
            <Link
              to="/dashboard"
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <div ref={certificateRef} className="p-8">
            {/* Certificate Template with updated styling */}
            <div className="border-2 border-gray-200 p-8 max-w-4xl mx-auto relative">
              {/* Background network graphic effect */}
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-contain bg-no-repeat bg-right-bottom" 
                   style={{ backgroundImage: 'url(/network-graphic.svg)' }}>
              </div>
              
              <div className="text-center relative z-10">
                <h1 className="text-5xl font-bold mb-2 text-[#5FAD41]">SECUONE</h1>
                <p className="text-[#335C81] text-sm mb-1">TAKE SECURITY SERIOUSLY</p>
                <h2 className="text-2xl font-semibold mb-6 text-[#4472C4]">AIOT LICENSE CERTIFICATE</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="col-span-2">
                  {/* Same certificate information fields as before */}
                </div>
                
                <div className="flex justify-center items-center">
                  <div className="p-2 bg-white border border-gray-200 shadow-sm">
                    <QRCode 
                      value={verificationUrl} 
                      size={150}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr className="bg-[#4472C4] text-white">
                      <th className="border border-gray-300 px-4 py-2 text-left font-bold">COMPONENT DESCRIPTION</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-bold">SKU NUMBER</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-bold">QUANTITY</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-bold">License Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">{certificate.component}</td>
                      <td className="border border-gray-300 px-4 py-2">{certificate.skuNumber}</td>
                      <td className="border border-gray-300 px-4 py-2">{certificate.quantity}</td>
                      <td className="border border-gray-300 px-4 py-2">{certificate.licenseNumber}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 text-sm border-t pt-4 border-[#5FAD41]">
                <p><strong className="text-[#4472C4]">Note:</strong></p>
                <p>- OS Version: {certificate.osVersion}</p>
                <p>- This license is valid for {certificate.validityYears} years starting from the date of BAST</p>
              </div>
              
              {/* Decorative elements to match the company profile */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <div className="w-16 h-3 bg-[#5FAD41] rounded-full"></div>
                <div className="w-16 h-3 bg-[#4472C4] rounded-full"></div>
                <div className="w-16 h-3 bg-[#5FAD41] rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2 text-[#4472C4]">Verification Link:</h3>
            <div className="flex items-center">
              <input
                type="text"
                value={verificationUrl}
                readOnly
                className="flex-1 border p-2 rounded-l mr-0 focus:outline-none focus:ring-1 focus:ring-[#5FAD41]"
              />
              <button
                onClick={() => navigator.clipboard.writeText(verificationUrl)}
                className="bg-[#5FAD41] text-white px-4 py-2 rounded-r hover:bg-[#4c8a34] transition"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCertificatePage;