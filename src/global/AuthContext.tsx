/* eslint-disable no-console */
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'

interface AuthState {
  isLoggedIn: boolean
}

interface AuthContextType extends AuthState {
  setToken: (token: string) => void
  logout: () => void
}

const getInitialAuthState = (): AuthState => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  return {
    isLoggedIn: !!token,
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const useProvideAuth = (): AuthContextType => {
  const [state, setState] = useState<AuthState>(getInitialAuthState)

  console.log('state', state)
  const setToken = useCallback((token: string) => {
    localStorage.setItem('auth_token', token)
    setState({ isLoggedIn: true })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token')
    setState({ isLoggedIn: false })
  }, [])

  return {
    ...state,
    setToken,
    logout,
  }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
