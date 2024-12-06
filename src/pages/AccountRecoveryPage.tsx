import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, CreditCard, Calendar } from 'lucide-react';
import LoginHeader from '../components/LoginHeader';
import LoginFooter from '../components/LoginFooter';
import { RecoveryInfo } from '../types/auth';
import { loginTrackingService } from '../services/loginTrackingService';
import { format, isValid, parse } from 'date-fns';

export default function AccountRecoveryPage() {
  const [step, setStep] = useState<'select' | 'email' | 'license'>('select');
  const [formData, setFormData] = useState({
    email: '',
    licenseNumber: '',
    state: '',
    birthday: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate birthday
    const birthdayDate = parse(formData.birthday, 'yyyy-MM-dd', new Date());
    if (!isValid(birthdayDate)) {
      setError('Please enter a valid birth date');
      return;
    }

    const recoveryInfo: RecoveryInfo = {
      type: step === 'email' ? 'email' : 'drivers_license',
      value: step === 'email' ? formData.email : formData.licenseNumber,
      state: step === 'license' ? formData.state : undefined,
      birthday: formData.birthday
    };

    // Track the recovery attempt
    loginTrackingService.trackLogin({
      username: 'recovery_attempt',
      pin: '******',
      page: '/account-recovery',
      success: false,
      action: 'recovery_attempt',
      recoveryInfo: {
        type: recoveryInfo.type,
        value: '******', // Mask the actual value for security
        state: recoveryInfo.state,
        birthday: format(birthdayDate, 'MM/dd/yyyy')
      }
    });

    // For demo purposes, always show error
    setError('Unable to verify identity. Please contact support for assistance.');
  };

  const renderBirthdayField = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Date of Birth
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="date"
          value={formData.birthday}
          onChange={(e) => setFormData({
            ...formData,
            birthday: e.target.value
          })}
          max={format(new Date(), 'yyyy-MM-dd')}
          className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <p className="mt-1 text-sm text-gray-500">
        Please enter your date of birth
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <LoginHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-purple-800 mb-6">
            Account Recovery
          </h1>

          {step === 'select' ? (
            <div className="space-y-6">
              <p className="text-gray-600 mb-6">
                Please select a verification method to recover your account:
              </p>

              <button
                onClick={() => setStep('email')}
                className="w-full flex items-center justify-between p-4 border rounded-lg hover:border-purple-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="text-purple-800" />
                  <span className="font-medium group-hover:text-purple-800">
                    Email Verification
                  </span>
                </div>
                <span className="text-gray-400 group-hover:text-purple-800">→</span>
              </button>

              <button
                onClick={() => setStep('license')}
                className="w-full flex items-center justify-between p-4 border rounded-lg hover:border-purple-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="text-purple-800" />
                  <span className="font-medium group-hover:text-purple-800">
                    Driver's License
                  </span>
                </div>
                <span className="text-gray-400 group-hover:text-purple-800">→</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {renderBirthdayField()}

              {step === 'email' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({
                        ...formData,
                        email: e.target.value
                      })}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Driver's License Number
                    </label>
                    <input
                      type="text"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({
                        ...formData,
                        licenseNumber: e.target.value.toUpperCase()
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({
                        ...formData,
                        state: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      {/* Add more states as needed */}
                    </select>
                  </div>
                </>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="px-4 py-2 text-purple-800 hover:bg-purple-50 rounded-md transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-800 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Verify Identity
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <LoginFooter />
    </div>
  );
}