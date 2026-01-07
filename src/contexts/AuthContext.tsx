import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Admin } from '@/lib/types';
import { mockAdmin } from '@/lib/mockData';

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: Admin['role']) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulated authentication - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email && password.length >= 6) {
      setAdmin(mockAdmin);
      return true;
    }
    return false;
  };

  const signup = async (
    email: string, 
    password: string, 
    name: string, 
    role: Admin['role']
  ): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email && password.length >= 6 && name) {
      const newAdmin: Admin = {
        id: `admin-${Date.now()}`,
        email,
        name,
        role,
        issuesHandled: 0,
        averageResponseTime: 0,
        resolutionRate: 0
      };
      setAdmin(newAdmin);
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ 
      admin, 
      isAuthenticated: !!admin, 
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
