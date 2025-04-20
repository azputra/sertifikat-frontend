import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background network graphic */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-contain bg-no-repeat bg-right"
           style={{ backgroundImage: 'url(/network-graphic.svg)' }}>
      </div>
      
      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#4472C4] to-[#335C81] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-6">
                <h1 className="text-5xl font-bold text-white mb-2">SECUONE</h1>
                <p className="text-sm mb-4">TAKE SECURITY SERIOUSLY</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Sistem Sertifikasi Digital Terpercaya</h2>
              <p className="text-xl mb-8">
                Buat, verifikasi, dan kelola sertifikat digital dengan teknologi barcode untuk keamanan yang terjamin.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/verify"
                  className="bg-[#5FAD41] border-2 border-[#5FAD41] px-6 py-3 rounded-md font-medium hover:bg-[#4c8a34] hover:border-[#4c8a34] transition"
                >
                  Verifikasi Sertifikat
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="container mx-auto px-4">
              <div className="flex justify-end space-x-2 pb-4">
                <div className="w-24 h-3 bg-[#5FAD41] rounded-full"></div>
                <div className="w-24 h-3 bg-white opacity-70 rounded-full"></div>
                <div className="w-24 h-3 bg-[#5FAD41] rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2 text-[#5FAD41]">Fitur Unggulan</h2>
            <p className="text-[#4472C4] text-center mb-12">Sertifikasi AIOT dengan keamanan terpercaya</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 relative transition-all hover:shadow-lg">
                <div className="w-14 h-14 bg-[#e8f5e9] rounded-full flex items-center justify-center mb-6 absolute -top-6 left-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#5FAD41]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="mt-2">
                  <h3 className="text-xl font-semibold mb-3 text-[#4472C4]">Otentikasi Barcode</h3>
                  <p className="text-gray-600">Setiap sertifikat dilengkapi barcode unik untuk verifikasi otentisitas.</p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 relative transition-all hover:shadow-lg">
                <div className="w-14 h-14 bg-[#e8f5e9] rounded-full flex items-center justify-center mb-6 absolute -top-6 left-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#5FAD41]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="mt-2">
                  <h3 className="text-xl font-semibold mb-3 text-[#4472C4]">Pengelolaan Mudah</h3>
                  <p className="text-gray-600">Buat, edit, dan kelola sertifikat dengan cepat melalui dashboard admin.</p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 relative transition-all hover:shadow-lg">
                <div className="w-14 h-14 bg-[#e8f5e9] rounded-full flex items-center justify-center mb-6 absolute -top-6 left-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#5FAD41]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="mt-2">
                  <h3 className="text-xl font-semibold mb-3 text-[#4472C4]">Keamanan Terjamin</h3>
                  <p className="text-gray-600">Sistem verifikasi yang aman mencegah pemalsuan sertifikat.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-2 text-[#5FAD41]">Tentang Kami</h2>
              <p className="text-[#4472C4] text-center mb-8">SECUONE | TAKE SECURITY SERIOUSLY</p>
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                <p className="text-gray-600 mb-6">
                  Kami adalah penyedia layanan sertifikasi digital terpercaya dengan teknologi modern untuk memastikan keamanan dan otentisitas sertifikat Anda.
                </p>
                <p className="text-gray-600">
                  Dengan pengalaman bertahun-tahun dalam industri teknologi keamanan, kami berkomitmen menghadirkan solusi sertifikasi yang mudah digunakan, aman, dan dapat diandalkan.
                </p>
                
                {/* Decorative elements */}
                <div className="mt-8 flex justify-end space-x-2">
                  <div className="w-16 h-3 bg-[#5FAD41] rounded-full"></div>
                  <div className="w-16 h-3 bg-[#4472C4] rounded-full"></div>
                  <div className="w-16 h-3 bg-[#5FAD41] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;