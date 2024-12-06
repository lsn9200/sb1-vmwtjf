import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ServiceCard from './components/ServiceCard';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AsppLoginPage from './pages/AsppLoginPage';
import AsdaLoginPage from './pages/AsdaLoginPage';
import DsppLoginPage from './pages/DsppLoginPage';
import AccountRecoveryPage from './pages/AccountRecoveryPage';
import PasswordResetPage from './pages/PasswordResetPage';
import ResetSuccessPage from './pages/ResetSuccessPage';
import { SERVICE_CARDS } from './constants/images';
import { authService } from './services/authService';

function HomePage() {
  return (
    <div className="min-h-screen bg-purple-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-card p-8 mb-8 relative">
          <div className="absolute top-0 right-0 p-4 text-gray-600">
            WALMART INC.
          </div>
          
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">
              Welcome to Walmart Shareholder Services
            </h1>
            <p className="text-gray-600">
              To access your holdings in Walmart Inc. please select from the options below:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_CARDS.map((service) => (
              <ServiceCard
                key={service.title}
                {...service}
              />
            ))}
          </div>
        </div>

        <div className="text-gray-300 text-sm">
          <p>
            Computershare - the leading global stock transfer agent and shareholder services provider - is Walmart's stock transfer agent and employee plans administrator.
          </p>
        </div>
      </main>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = authService.isLoggedIn();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAdmin = authService.isAdmin();
  return isAdmin ? <>{children}</> : <Navigate to="/admin-login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/aspp-login" element={<AsppLoginPage />} />
        <Route path="/asda-login" element={<AsdaLoginPage />} />
        <Route path="/dspp-login" element={<DsppLoginPage />} />
        <Route path="/account-recovery" element={<AccountRecoveryPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route path="/reset-success" element={<ResetSuccessPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <AdminProtectedRoute>
            <AdminPage />
          </AdminProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}