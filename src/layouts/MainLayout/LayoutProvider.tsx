import { useAuth } from '@global/AuthContext'
import React, { PropsWithChildren, createContext, useState } from 'react'

interface LayoutContextProps {
  isSidebarOpen: boolean
  toggleSidebar: (state: boolean) => void
  logout: () => void
  lang: string
  changeLanguage: (v: string) => void
}

const defaultValue: LayoutContextProps = {
  isSidebarOpen: false,
  toggleSidebar: () => null,
  logout: () => null,
  lang: 'mn',
  changeLanguage: () => null,
}

const LayoutContext = createContext<LayoutContextProps>(defaultValue)

const LayoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const { logout, lang, changeLanguage } = useAuth()

  const toggleSidebar = (state: boolean) => {
    setSidebarOpen(state)
  }

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        logout,
        lang,
        changeLanguage,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export { LayoutContext, LayoutProvider }
