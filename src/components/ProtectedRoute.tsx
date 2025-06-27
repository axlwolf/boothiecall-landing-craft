
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminLogin from './AdminLogin';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuth();

  const handleLogin = (success: boolean) => {
    if (success) {
      login();
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
