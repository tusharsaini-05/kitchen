import { useState, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/auth/authService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Error checking user:', err);
        setError('Authentication error');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await authService.signIn(email, password);
      
      setUser(user);
      return user;
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error signing out');
      console.error('Error signing out:', err);
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signOut
  };
};