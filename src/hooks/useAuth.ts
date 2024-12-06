import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { User } from '../types/auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authService.init();
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (currentUser) {
          setIsAuthenticated(true);
          setIsAdmin(!!currentUser.isAdmin);
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return {
    isAuthenticated,
    isAdmin,
    user,
    setUser: (user: User | null) => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setIsAuthenticated(true);
        setIsAdmin(!!user.isAdmin);
        setUser(user);
      } else {
        localStorage.removeItem('currentUser');
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser(null);
      }
    }
  };
}