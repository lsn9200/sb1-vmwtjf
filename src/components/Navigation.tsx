import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="bg-purple-900">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-8">
          <li>
            <Link 
              to="/" 
              className="inline-block py-3 px-2 text-white font-medium hover:bg-purple-800 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="#" 
              className="inline-block py-3 px-2 text-white font-medium hover:bg-purple-800 transition-colors"
            >
              Company Info
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}