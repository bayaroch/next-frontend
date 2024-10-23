import { useAuth } from '@global/AuthContext'
import React, { PropsWithChildren, createContext, useState } from 'react'

interface LayoutContextProps {
  menuOpen: boolean
  setMenuOpen: (state: boolean) => void
  logout: () => void
  isLoggedIn: boolean
  lang: string
  changeLanguage: (v: string) => void
}

const defaultValue: LayoutContextProps = {
  menuOpen: false,
  setMenuOpen: () => null,
  logout: () => null,
  isLoggedIn: false,
  lang: 'mn',
  changeLanguage: () => null,
}

const PublicLayoutContext = createContext<LayoutContextProps>(defaultValue)

const PublicLayoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const { isLoggedIn, logout, lang, changeLanguage } = useAuth()

  return (
    <PublicLayoutContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        isLoggedIn,
        logout,
        lang,
        changeLanguage,
      }}
    >
      {children}
    </PublicLayoutContext.Provider>
  )
}

export { PublicLayoutContext, PublicLayoutProvider }
