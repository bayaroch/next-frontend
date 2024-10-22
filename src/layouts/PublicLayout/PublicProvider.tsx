import React, { PropsWithChildren, createContext, useState } from 'react'

interface LayoutContextProps {
  menuOpen: boolean
  setMenuOpen: (state: boolean) => void
}

const defaultValue: LayoutContextProps = {
  menuOpen: false,
  setMenuOpen: () => null,
}

const PublicLayoutContext = createContext<LayoutContextProps>(defaultValue)

const PublicLayoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  return (
    <PublicLayoutContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
      }}
    >
      {children}
    </PublicLayoutContext.Provider>
  )
}

export { PublicLayoutContext, PublicLayoutProvider }
