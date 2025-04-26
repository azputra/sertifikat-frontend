import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

const API_URL = 'https://sertifikat-backend.onrender.com/api/certificates';

const VerifyResultPage = () => {
  const { barcode } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  
  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/verify/${barcode}`);
        setResult(data);
        setLoading(false);
      } catch (err) {
        setError('Error verifying certificate. Please try again.');
        setLoading(false);
      }
    };
    
    verifyCertificate();
  }, [barcode]);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  
  const generatePDF = async () => {
    if (!result?.certificateData) return;
    
    try {
      setDownloading(true);
      
      const response = await axios.post(`${API_URL}/generate-pdf`, {
        certificateData: result.certificateData,
        barcode: barcode
      }, {
        responseType: 'blob'
      });
      
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = window.URL.createObjectURL(pdfBlob);
      
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = `SECUONE_AIOT_Certificate_${result.certificateData.licenseNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(pdfUrl);
      document.body.removeChild(a);
      
      setDownloading(false);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setDownloading(false);
      alert('Failed to generate certificate PDF. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5FAD41] mx-auto mb-4"></div>
          <p className="text-[#4472C4] font-medium">Verifying certificate...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-[#5FAD41] mb-1">SECUONE</h1>
            <p className="text-[#335C81] text-sm">TAKE SECURITY SERIOUSLY</p>
          </div>
          
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          
          <div className="mt-6 text-center">
            <Link 
              to="/verify" 
              className="bg-[#4472C4] text-white px-6 py-2 rounded-md hover:bg-[#385da2] transition inline-block"
            >
              Try Another Certificate
            </Link>
          </div>
          
          <div className="mt-10 flex justify-end space-x-2">
            <div className="w-16 h-3 bg-[#5FAD41] rounded-full"></div>
            <div className="w-16 h-3 bg-[#4472C4] rounded-full"></div>
            <div className="w-16 h-3 bg-[#5FAD41] rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background network graphic */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-contain bg-no-repeat bg-right-bottom"
           style={{ backgroundImage: 'url(/network-graphic.svg)' }}>
      </div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-[#5FAD41] mb-1">SECUONE</h1>
            <p className="text-[#335C81] text-sm mb-2">TAKE SECURITY SERIOUSLY</p>
            <h2 className="text-2xl font-semibold text-[#4472C4]">Certificate Verification Result</h2>
          </div>
          
          {result?.isValid ? (
            <>
              <div className="bg-[#e8f5e9] border border-[#5FAD41] text-[#2e7d32] px-4 py-4 rounded-md mb-6 text-center">
                <h3 className="text-2xl font-bold mb-1">Certificate Verified</h3>
                <p>This is an authentic SECUONE AIOT certificate.</p>
              </div>
              
              {result.certificateData && (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-[#4472C4] pb-2">Certificate Detail</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div className="border-l-4 border-[#5FAD41] pl-3">
                      <p className="text-[#4472C4] font-semibold">Program Name:</p>
                      <p className="text-gray-800">{result.certificateData.programName}</p>
                    </div>
                    <div className="border-l-4 border-[#5FAD41] pl-3">
                      <p className="text-[#4472C4] font-semibold">Issue Date:</p>
                      <p className="text-gray-800">{formatDate(result.certificateData.issueDate)}</p>
                    </div>
                    <div className="border-l-4 border-[#5FAD41] pl-3">
                      <p className="text-[#4472C4] font-semibold">License Number:</p>
                      <p className="text-gray-800">{result.certificateData.licenseNumber}</p>
                    </div>
                    <div className="border-l-4 border-[#5FAD41] pl-3">
                      <p className="text-[#4472C4] font-semibold">Customer Name:</p>
                      <p className="text-gray-800">{result.certificateData.endUserName}</p>
                    </div>
                    <div className="border-l-4 border-[#5FAD41] pl-3">
                      <p className="text-[#4472C4] font-semibold">Component:</p>
                      <p className="text-gray-800">{result.certificateData.component}</p>
                    </div>
                    <div className="mt-8 text-sm border-t pt-4 border-[#5FAD41]">
                      <p><strong className="text-[#4472C4]">Note:</strong></p>
                      {certificate.notes && (
                        <pre className="mt-2 whitespace-pre-wrap font-sans">
                          {certificate.notes}
                        </pre>
                      )}
                    </div>
                    <div className="border-l-4 border-[#5FAD41] pl-3">
                      <p className="text-[#4472C4] font-semibold">SKU Number:</p>
                      <p className="text-gray-800">{result.certificateData.skuNumber}</p>
                    </div>
                    <div className="border-l-4 border-[#5FAD41] pl-3">
                      <p className="text-[#4472C4] font-semibold">Quantity:</p>
                      <p className="text-gray-800">{result.certificateData.quantity}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <button
                      onClick={generatePDF}
                      disabled={downloading}
                      className={`bg-[#5FAD41] text-white px-6 py-3 rounded-md hover:bg-[#4c8a34] transition font-medium ${downloading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {downloading ? 'Generating PDF...' : 'Download Certificate'}
                    </button>
                    
                    <p className="text-gray-600 mt-5 mb-2">
                      This certificate confirms that the product meets SECUONE AIOT security standards.
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-4 rounded-md mb-6 text-center">
              <h3 className="text-2xl font-bold mb-1">Certificate Not Valid</h3>
              <p>
                {result?.message || 'This certificate could not be verified in our system.'}
              </p>
            </div>
          )}
          
          <div className="mt-8 text-center border-t pt-6">
            <Link 
              to="/verify" 
              className="text-[#4472C4] hover:text-[#385da2] font-medium transition"
            >
              Verify Another Certificate
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
    </div>
  );
};

export default VerifyResultPage;