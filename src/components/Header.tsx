import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGOS } from '../constants/logos';

export default function Header() {
  const [imageError, setImageError] = useState(false);

  return (
    <header className="w-full">
      <div className="bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex-shrink-0">
            {!imageError ? (
              <img 
                src={LOGOS.computershare}
                alt="Computershare"
                className="h-8 w-auto"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="text-[#7D236F] font-bold text-2xl">
                Computershare
              </div>
            )}
          </div>
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <span>English</span>
              <span>/</span>
              <a 
                href="#" 
                className="text-[#7D236F] hover:text-[#8D347F] transition-colors"
                aria-label="Switch to French"
              >
                Français
              </a>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <a 
              href="#" 
              className="hover:text-gray-800 transition-colors"
              aria-label="Get help"
            >
              Help
            </a>
            <div className="h-4 w-px bg-gray-300"></div>
            <a 
              href="#" 
              className="hover:text-gray-800 transition-colors"
              aria-label="Contact support"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <nav className="bg-[#7D236F]">
        <div className="container mx-auto px-4">
          <div className="flex">
            <Link 
              to="/" 
              className="text-white py-3 px-6 font-medium hover:bg-[#8D347F] transition-colors"
            >
              Home
            </Link>
            <Link 
              to="#" 
              className="text-white py-3 px-6 font-medium hover:bg-[#8D347F] transition-colors"
            >
              Company Info
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}