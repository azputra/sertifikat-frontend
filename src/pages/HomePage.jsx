import React from 'react';
import slideshow1 from '../assets/slideshow1.png';
import camera from '../assets/camera.png';
import whyUs from '../assets/why-us.png';
import Slideshow from '../components/Slideshow';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero/Slideshow Section */}
      <section id="home">
        <Slideshow />
      </section>

      {/* About Company Section */}
      <section id="about" className="py-16 scroll-mt-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2196F3] text-center mb-10">ABOUT OUR COMPANY</h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-center">
            Founded in 2018, Secuone specializes in providing advanced hardware and software systems that
            leverage surveillance and AI technology. Our products are TKDN certified, ensuring quality and local
            compliance. Secuone delivers security solutions to multiple sectors, including government and 
            private sectors, addressing a wide range of organizational needs.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 scroll-mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2196F3] text-center mb-12">EXPLORE OUR KEY PRODUCTS</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="bg-gray-50 p-6">
              <div className="mb-6 flex justify-center">
                <img src={camera} alt="CCTV Camera" className="h-48 object-contain" />
              </div>
              <h3 className="font-bold mb-2">CCTV Systems</h3>
              <p className="text-gray-700 text-sm">
                High-Resolution Cameras for Complete Surveillance
              </p>
            </div>
            
            {/* Product 2 */}
            <div className="bg-gray-50 p-6">
              <div className="mb-6 flex justify-center">
                <img src={camera} alt="AIoT Integration" className="h-48 object-contain" />
              </div>
              <h3 className="font-bold mb-2">AIoT Integration</h3>
              <p className="text-gray-700 text-sm">
                Intelligent Video Analytics and IoT Security
              </p>
            </div>
            
            {/* Product 3 */}
            <div className="bg-gray-50 p-6">
              <div className="mb-6 flex justify-center">
                <img src={camera} alt="Interactive Panels" className="h-48 object-contain" />
              </div>
              <h3 className="font-bold mb-2">Interactive Panels</h3>
              <p className="text-gray-700 text-sm">
                Replace Whiteboards with Smart Interactive Displays
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why SecuOne Section */}
      <section id="contact" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <img src={whyUs} alt="Security professional" className="w-full rounded-lg" />
            </div>
            
            <div className="md:w-2/3 md:pl-10">
              <h2 className="text-3xl font-bold text-[#2196F3] mb-8">Why Secuone?</h2>
              
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Reason 1 */}
                <div>
                  <h3 className="font-bold mb-2 flex items-center text-gray-800">
                    <span className="text-[#2196F3] text-2xl font-bold mr-2">01</span>
                    Real-Time Monitoring
                  </h3>
                  <p className="text-gray-700 text-sm ml-9 max-w-2xs">
                    Stay connected with your premises 24/7, no matter where you are
                  </p>
                </div>
                
                {/* Reason 2 */}
                <div>
                  <h3 className="font-bold mb-2 flex items-center text-gray-800">
                    <span className="text-[#2196F3] text-2xl font-bold mr-2">02</span>
                    AI-Enhanced Security
                  </h3>
                  <p className="text-gray-700 text-sm ml-9 max-w-2xs">
                    Leverage AI to automatically detect threats and optimize your security system
                  </p>
                </div>
                
                {/* Reason 3 */}
                <div>
                  <h3 className="font-bold mb-2 flex items-center text-gray-800">
                    <span className="text-[#2196F3] text-2xl font-bold mr-2">03</span>
                    Easy Integration
                  </h3>
                  <p className="text-gray-700 text-sm ml-9 max-w-2xs">
                    Our systems easily integrate with your existing infrastructure, reducing the setup hassle
                  </p>
                </div>
                
                {/* Reason 4 */}
                <div>
                  <h3 className="font-bold mb-2 flex items-center text-gray-800">
                    <span className="text-[#2196F3] text-2xl font-bold mr-2">04</span>
                    Durable & Reliable
                  </h3>
                  <p className="text-gray-700 text-sm ml-9 max-w-2xs">
                    Built to withstand extreme conditions, our products are designed for long-term performance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;