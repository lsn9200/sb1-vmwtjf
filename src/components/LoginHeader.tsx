import React from 'react';
import { Globe, HelpCircle, Phone } from 'lucide-react';
import { LOGOS } from '../constants/logos';

export default function LoginHeader() {
  return (
    <header className="w-full">
      <div className="flex justify-end bg-white p-2 space-x-4 text-sm border-b">
        <div className="flex items-center space-x-2">
          <Globe size={16} />
          <span>English</span>
          <span>/</span>
          <a href="#" className="text-purple-800">Français</a>
        </div>
        <a href="#" className="flex items-center space-x-1 text-gray-600">
          <HelpCircle size={16} />
          <span>Help</span>
        </a>
        <a href="#" className="flex items-center space-x-1 text-gray-600">
          <Phone size={16} />
          <span>Contact Us</span>
        </a>
      </div>
      <div className="bg-purple-800 py-4">
        <div className="container mx-auto px-4">
          <img 
            src={LOGOS.computershare}
            alt="Computershare" 
            className="h-8"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.onerror = null;
              img.style.display = 'none';
              console.error('Failed to load Computershare logo');
            }}
          />
        </div>
      </div>
    </header>
  );
}