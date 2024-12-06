import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  note?: string;
  image: string;
  alt: string;
  loginUrl: string;
}

export default function ServiceCard({ 
  title, 
  subtitle, 
  description, 
  note, 
  image, 
  alt,
  loginUrl 
}: ServiceCardProps) {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    console.error(`Failed to load image: ${image}`);
    setImageError(true);
  };

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-card">
      <div className="relative h-48 overflow-hidden">
        {!imageError ? (
          <img 
            src={image}
            alt={alt}
            onError={handleImageError}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">Image not available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
        <p className="text-gray-600">{description}</p>
        {note && <p className="text-sm text-gray-500 mt-1">{note}</p>}
        <div className="mt-4 text-right">
          <Link 
            to={loginUrl}
            className="inline-block bg-[#7D236F] text-white px-8 py-2 rounded-full hover:bg-[#8D347F] transition-colors"
          >
            Login &gt;
          </Link>
        </div>
      </div>
    </div>
  );
}