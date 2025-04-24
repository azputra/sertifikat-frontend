// Slideshow.jsx
import React, { useState, useEffect } from 'react';
import slideshow1 from '../assets/slideshow1.png';
import logo from '../assets/logo-secuone.png';
const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // For now, we only have one slide but this structure allows adding more
  const slides = [
    {
      image: slideshow1,
      title: "AI DRIVEN SECURITY FOR MODERN BUSINESSES",
      description: "Protect your premises with cutting-edge AI-powered CCTV and IoT solutions for real-time monitoring and intelligent decision-making."
    },
    {
      image: slideshow1,
      title: "AI DRIVEN SECURITY FOR MODERN BUSINESSES",
      description: "Protect your premises with cutting-edge AI-powered CCTV and IoT solutions for real-time monitoring and intelligent decision-making."
    },
    {
      image: slideshow1,
      title: "AI DRIVEN SECURITY FOR MODERN BUSINESSES",
      description: "Protect your premises with cutting-edge AI-powered CCTV and IoT solutions for real-time monitoring and intelligent decision-making."
    }
  ];

  // Auto rotate slides
  useEffect(() => {
    if (slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(current => (current + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  // Indicators for multiple slides
  const renderIndicators = () => {
    if (slides.length <= 1) return null;
    
    return (
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`h-3 w-3 mx-1 rounded-full ${currentSlide === index ? 'bg-[#8BC34A]' : 'bg-white bg-opacity-60'}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative h-screen w-full">
      {/* Current slide */}
      <div className="absolute inset-0">
        <img 
          src={slides[currentSlide].image} 
          alt="Security system" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-70 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl ml-16">
              <img src={logo} alt="SecuOne Logo" className="h-16" />
              <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                {slides[currentSlide].title.split(' FOR ')[0]}<br />
                FOR {slides[currentSlide].title.split(' FOR ')[1]}
              </h1>
              <p className="text-white text-lg mb-8 max-w-xl">
                {slides[currentSlide].description}
              </p>
              <button 
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#8BC34A] hover:bg-[#7CB342] text-white px-8 py-3 uppercase font-medium transition-colors"
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {renderIndicators()}
    </div>
  );
};

export default Slideshow;