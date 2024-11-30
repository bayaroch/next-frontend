/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from '@layouts/Shared/Header'
import { alpha, Box, CssBaseline, Stack } from '@mui/material'
import theme from '@theme/index'
import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { LayoutContext } from './LayoutProvider'
import SideMenu from '@layouts/Shared/SideMenu'
import AppNavbar from '@layouts/Shared/AppNavbar'
import { useQueryClient } from 'react-query'
import { AppInitResponse } from '@services/auth.services'
import DynamicBreadcrumbs from '@layouts/Shared/DynamicBreadcrumbs'

const MainLayout: React.FC<PropsWithChildren> = () => {
  const { isSidebarOpen, toggleSidebar, changeLanguage, lang, logout } =
    useContext(LayoutContext)

  const queryClient = useQueryClient()
  const initData: AppInitResponse | undefined = queryClient.getQueryData([
    'appInit',
  ])

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
          <SideMenu initData={initData} onLogout={logout} />
          <AppNavbar
            initData={initData}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            onLogout={logout}
          />
          {/* Main content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                : alpha(theme.palette.background.default, 1),
              overflow: 'auto',
              p: 0,
              pt: { xs: '64px', md: '0px' },
            })}
          >
            <Header lang={lang} changeLanguage={changeLanguage} />
            <Box sx={{ width: '100%', p: { xs: 2, md: 4 } }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default MainLayout
