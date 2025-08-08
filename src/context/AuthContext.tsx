import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getAuthToken, getCurrentUser, logoutUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: any | null;
  token: string | null;
  login: (token: string, user: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const savedToken = getAuthToken();
    const savedUser = getCurrentUser();
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
  }, []);

  const login = (token: string, user: any) => {
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    logoutUser();
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: Boolean(token) }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
