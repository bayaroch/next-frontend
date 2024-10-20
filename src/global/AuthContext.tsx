import React, {
  createContext,
  useContext,
  useState,
  useEffect,
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

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const useProvideAuth = (): AuthContextType => {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
  })

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      setState({ isLoggedIn: true })
    }
  }, [])

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
