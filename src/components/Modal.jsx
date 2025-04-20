import React, { useEffect } from 'react';

const Modal = ({ children, title, onClose }) => {
  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when modal is closed
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto border border-gray-200">
        {/* Header */}
        <div className="sticky top-0 bg-[#4472C4] z-10 flex justify-between items-center p-4">
          {typeof title === 'string' ? (
            <h2 className="text-xl font-semibold text-white">{title}</h2>
          ) : (
            title
          )}
          <button
            onClick={onClose}
            className="text-white hover:bg-[#385da2] rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 bg-gray-50 relative">
          {/* Background network graphic */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-contain bg-no-repeat bg-right-bottom"
               style={{ backgroundImage: 'url(/network-graphic.svg)' }}>
          </div>
          
          <div className="relative z-10">
            {children}
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-2 right-4 flex space-x-1 opacity-50">
            <div className="w-12 h-2 bg-[#5FAD41] rounded-full"></div>
            <div className="w-12 h-2 bg-[#4472C4] rounded-full"></div>
            <div className="w-12 h-2 bg-[#5FAD41] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;