import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import LoginHeader from '../components/LoginHeader';
import LoginFooter from '../components/LoginFooter';
import { authService } from '../services/authService';
import { PasswordResetSchema } from '../types/auth';

export default function PasswordResetPage() {
  const [formData, setFormData] = useState({
    username: '',
    oldPin: '',
    email: '',
    newPin: '',
    confirmNewPin: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Validate passwords match
      if (formData.newPin !== formData.confirmNewPin) {
        throw new Error('New PINs do not match');
      }

      // Validate form data
      const validatedData = PasswordResetSchema.parse({
        username: formData.username,
        oldPin: formData.oldPin,
        email: formData.email,
        newPin: formData.newPin
      });

      await authService.resetPassword(validatedData);
      navigate('/reset-success');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during password reset');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoginHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-purple-800 mb-6">
            Reset Your PIN
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
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current PIN
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={formData.oldPin}
                  onChange={(e) => setFormData({ ...formData, oldPin: e.target.value })}
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  minLength={5}
                  maxLength={11}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New PIN
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={formData.newPin}
                  onChange={(e) => setFormData({ ...formData, newPin: e.target.value })}
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  minLength={5}
                  maxLength={11}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New PIN
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={formData.confirmNewPin}
                  onChange={(e) => setFormData({ ...formData, confirmNewPin: e.target.value })}
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  minLength={5}
                  maxLength={11}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-800 text-white py-3 rounded-md hover:bg-purple-700 transition-colors"
            >
              Reset PIN
            </button>
          </form>
        </div>
      </main>

      <LoginFooter />
    </div>
  );
}