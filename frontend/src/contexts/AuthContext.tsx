import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/services/api';  // Use updated api.ts exports
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access');  // Fix: Use 'access' to match backend
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await authAPI.profile();  // Use api.ts export
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      localStorage.removeItem('access');  // Fix: Use 'access'
      localStorage.removeItem('refresh');  // Fix: Use 'refresh'
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Sending login request:', { email, password });  // Debug: Log request data
      const response = await authAPI.login({ email, password });

      console.log('Login response:', response);
      
      localStorage.setItem('access', response.data.access);  // Fix: Store as 'access'
      localStorage.setItem('refresh', response.data.refresh);  // Fix: Store as 'refresh'
      
      await fetchUserProfile();
      
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      });
    } catch (error: unknown) {
      console.error('Login error:', error);  // Debug: Log error
      throw error;  // Re-throw for Auth.tsx to handle
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await authAPI.register(data);  // Use api.ts export
      
      toast({
        title: 'Success',
        description: 'Account created successfully. Please login.',
      });
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Registration failed',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access');  // Fix: Use 'access'
    localStorage.removeItem('refresh');  // Fix: Use 'refresh'
    setUser(null);
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};