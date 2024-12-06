import React, { useState, useEffect } from 'react';
import LoginHeader from '../components/LoginHeader';
import LoginFooter from '../components/LoginFooter';
import { CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = 'https://www.google.com';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <LoginHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-purple-800 mb-4">
            Security Verification Successful
          </h1>
          
          <p className="text-gray-700 mb-4">
            Your identity has been verified successfully. You will be redirected to continue in {countdown} seconds...
          </p>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(countdown / 5) * 100}%` }}
            />
          </div>

          <p className="text-sm text-gray-500">
            If you are not redirected automatically,{' '}
            <a 
              href="https://www.google.com"
              className="text-purple-800 hover:underline"
            >
              click here
            </a>
          </p>
        </div>
      </main>

      <LoginFooter />
    </div>
  );
}