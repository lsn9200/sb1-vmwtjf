import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from '../components/LoginHeader';
import LoginFooter from '../components/LoginFooter';
import { dbService } from '../db/database';

export default function PinRecoveryPage() {
  const [username, setUsername] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [recoveredPin, setRecoveredPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setRecoveredPin('');
    setLoading(true);

    try {
      // First validate admin credentials
      const adminUser = await dbService.validateUser({
        username: 'admin',
        pin: adminPin
      });

      if (!adminUser?.isAdmin) {
        throw new Error('Invalid admin credentials');
      }

      // Get user's PIN
      const user = await dbService.getUserByUsername(username);
      if (!user) {
        throw new Error('User not found');
      }

      if (user.isAdmin) {
        throw new Error('Cannot recover admin PIN');
      }

      setRecoveredPin(user.pin);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoginHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-purple-800 mb-6">
            PIN Recovery - Admin Only
          </h1>

          <form onSubmit={handleRecovery} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin PIN
              </label>
              <input
                type="password"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User's Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-800 text-white py-3 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Recovering...' : 'Recover PIN'}
            </button>
          </form>

          {recoveredPin && (
            <div className="mt-6 p-4 bg-green-50 rounded-md">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                Recovered PIN
              </h2>
              <p className="text-green-700">
                The user's PIN is: <strong>{recoveredPin}</strong>
              </p>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={() => navigate('/admin')}
              className="text-purple-800 hover:underline"
              disabled={loading}
            >
              &larr; Back to Admin Dashboard
            </button>
          </div>
        </div>
      </main>

      <LoginFooter />
    </div>
  );
}