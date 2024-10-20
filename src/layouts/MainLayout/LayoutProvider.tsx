import { useMediaQuery } from '@mui/material'
import theme from '@theme/index'
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react'

interface LayoutContextProps {
  isSidebarOpen: boolean
  toggleSidebar: (state: boolean) => void
}

const defaultValue: LayoutContextProps = {
  isSidebarOpen: false,
  toggleSidebar: () => null,
}

const LayoutContext = createContext<LayoutContextProps>(defaultValue)

const LayoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const toggleSidebar = (state: boolean) => {
    setSidebarOpen(state)
  }

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [isMobile])

  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(true)
    }
  }, [])

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export { LayoutContext, LayoutProvider }
