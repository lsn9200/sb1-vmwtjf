import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginHeader from '../components/LoginHeader';
import LoginFooter from '../components/LoginFooter';
import LoginForm from '../components/LoginForm';
import { User, Monitor } from 'lucide-react';

export default function LoginPage() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const handleLoginClick = (newUser: boolean) => {
    setIsNewUser(newUser);
    setShowLoginForm(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoginHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-purple-800 mb-6">
            Welcome to Employee Online
          </h1>
          
          <p className="text-gray-700 mb-8">
            Log in now to manage your WALMART INC. account online.
          </p>

          {!showLoginForm ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-center">
                <User size={64} className="text-purple-800 mb-4" />
                <p className="text-gray-700 mb-4">
                  If you are a returning user who has previously created a username, login here.
                </p>
                <button 
                  onClick={() => handleLoginClick(false)}
                  className="w-full bg-purple-800 text-white py-3 rounded-md hover:bg-purple-700 transition-colors"
                >
                  LOGIN WITH USERNAME
                </button>
              </div>

              <div className="flex flex-col items-center text-center">
                <Monitor size={64} className="text-purple-800 mb-4" />
                <p className="text-gray-700 mb-4">
                  If you are new or returning user who has never created a username previously, login here.
                </p>
                <button 
                  onClick={() => handleLoginClick(true)}
                  className="w-full bg-purple-800 text-white py-3 rounded-md hover:bg-purple-700 transition-colors"
                >
                  LOGIN AND CREATE USERNAME
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => setShowLoginForm(false)}
                className="text-purple-800 mb-6 hover:underline"
              >
                &larr; Back to options
              </button>
              <LoginForm isNewUser={isNewUser} />
            </>
          )}

          <div className="mt-8 space-y-2">
            <div>
              <Link to="/forgot-pin" className="text-purple-800 hover:underline">
                Forgotten PIN?
              </Link>
            </div>
            <div>
              <Link to="/forgot-username" className="text-purple-800 hover:underline">
                Forgotten Username?
              </Link>
            </div>
            <div>
              <Link to="/" className="text-purple-800 hover:underline">
                Return to Company Search
              </Link>
            </div>
          </div>
        </div>
      </main>

      <LoginFooter />
    </div>
  );
}