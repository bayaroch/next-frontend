/* eslint-disable no-console */
'use client';

import { useRouter } from 'next/navigation';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthState {
  isLoggedIn: boolean;
}

interface ClientContextType extends AuthState {
  setToken: (token: string) => void;
  logout: () => void;
}

const ClientContext = createContext<ClientContextType>({
  isLoggedIn: false,
  setToken: () => null,
  logout: () => null,
});

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setState({ isLoggedIn: true });
    }
  }, []);

  const setToken = useCallback((token: string) => {
    localStorage.setItem('auth_token', token);
    setState({ isLoggedIn: true });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    router.push('/login');
  }, [router]);

  return (
    <ClientContext.Provider value={{ ...state, setToken, logout }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext);
