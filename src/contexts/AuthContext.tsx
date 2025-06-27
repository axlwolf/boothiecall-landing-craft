
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const authStatus = localStorage.getItem('boothie_admin_auth');
    const timestamp = localStorage.getItem('boothie_admin_timestamp');
    
    if (authStatus === 'true' && timestamp) {
      // Check if session is less than 24 hours old
      const sessionAge = Date.now() - parseInt(timestamp);
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (sessionAge < maxAge) {
        return true;
      } else {
        // Session expired, clear it
        localStorage.removeItem('boothie_admin_auth');
        localStorage.removeItem('boothie_admin_timestamp');
      }
    }
    return false;
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('boothie_admin_auth');
    localStorage.removeItem('boothie_admin_timestamp');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(checkAuth());
  }, []);

  const value = {
    isAuthenticated,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
