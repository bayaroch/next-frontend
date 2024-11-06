/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from '@layouts/Shared/Header'
import { alpha, Box, CssBaseline, Stack } from '@mui/material'
import theme from '@theme/index'
import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { LayoutContext } from './LayoutProvider'
import SideMenu from '@layouts/Shared/SideMenu'
import AppNavbar from '@layouts/Shared/AppNavbar'

const MainLayout: React.FC<PropsWithChildren> = () => {
  const { isSidebarOpen, toggleSidebar, changeLanguage, lang, logout } =
    useContext(LayoutContext)

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: '100%',
          height: '100dvh',
        }}
      >
        <Box sx={{ display: 'flex', height: '100%' }}>
          <SideMenu />
          <AppNavbar />
          {/* Main content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                : alpha(theme.palette.background.default, 1),
              overflow: 'auto',
            })}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 },
              }}
            >
              <Header lang={lang} changeLanguage={changeLanguage} />
              <Box>
                <Outlet />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default MainLayout
