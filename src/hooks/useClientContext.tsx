'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
}

interface ClientContextType extends AuthState {
  updateClientCtx: (newState: Partial<AuthState>) => void;
}

const ClientContext = createContext<ClientContextType>({
  isLoggedIn: false,
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateClientCtx: () => {},
});

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
  });

  const updateClientCtx = useCallback((newState: Partial<AuthState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  }, []);

  return (
    <ClientContext.Provider value={{ ...state, updateClientCtx }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext);
