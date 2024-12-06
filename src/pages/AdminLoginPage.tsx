import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from '../components/LoginHeader';
import LoginFooter from '../components/LoginFooter';
import { authService } from '../services/authService';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const isValid = await authService.validateAdmin({ username, pin });
      if (isValid) {
        navigate('/admin');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoginHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-purple-800 mb-6">
            Admin Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-800 text-white py-3 rounded-md hover:bg-purple-700 transition-colors"
            >
              Login as Admin
            </button>
          </form>

          <div className="mt-6">
            <a href="/" className="text-purple-800 hover:underline">
              &larr; Back to Home
            </a>
          </div>
        </div>
      </main>

      <LoginFooter />
    </div>
  );
}