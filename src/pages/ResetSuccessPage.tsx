import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import LoginHeader from '../components/LoginHeader';
import LoginFooter from '../components/LoginFooter';

export default function ResetSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <LoginHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-purple-800 mb-4">
            PIN Reset Successful
          </h1>
          
          <p className="text-gray-600 mb-8">
            Your PIN has been successfully reset. You can now log in with your new PIN.
          </p>

          <button
            onClick={() => navigate('/login')}
            className="w-full bg-purple-800 text-white py-3 rounded-md hover:bg-purple-700 transition-colors"
          >
            Return to Login
          </button>
        </div>
      </main>

      <LoginFooter />
    </div>
  );
}