import { HEADER, SIDEBAR } from '@constants/layouts.constants'
import generateMenus, { MenuItemChildren } from '@constants/menu'
import Header from '@layouts/Shared/Header'
import SideBar from '@layouts/Shared/SideBar'
import NavCollapseItem from '@layouts/Shared/SideBar/NavCollapseItem'
import NavItem from '@layouts/Shared/SideBar/NavItem'
import {
  Box,
  CssBaseline,
  List,
  ListSubheader,
  useMediaQuery,
} from '@mui/material'
import theme from '@theme/index'
import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutContext } from './LayoutProvider'

interface LayoutProps extends PropsWithChildren {
  noSpacing?: boolean
  footerDisabled?: boolean
}

const MainLayout: React.FC<LayoutProps> = ({
  noSpacing = true,
  footerDisabled = false,
}) => {
  const { isSidebarOpen, toggleSidebar } = useContext(LayoutContext)
  const location = useLocation()
  const navigate = useNavigate()

  const menus = generateMenus()

  const onLogout = () => {
    navigate('/logout')
  }
  const { t } = useTranslation()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    // execute on location change
    if (isMobile) {
      toggleSidebar(false)
    }
  }, [location])

  const renderNavs = (menus: MenuItemChildren[]) => {
    return (
      <>
        {menus.map((menu: MenuItemChildren) => {
          return menu.type !== 'collapsible' ? (
            <NavItem item={menu} key={menu.label} />
          ) : menu.type === 'collapsible' ? (
            <NavCollapseItem item={menu} key={menu.label} />
          ) : null
        })}
      </>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        minWidth: 0,
        minHeight: '100%',
        flexDirection: 'column',
      }}
    >
      <CssBaseline />
      <Header
        onLogout={onLogout}
        setSideOpen={toggleSidebar}
        open={isSidebarOpen}
      />
      <SideBar open={isSidebarOpen} setSideOpen={toggleSidebar}>
        <List
          disablePadding
          sx={{
            mr: 2,
            pb: 2,
          }}
        >
          {menus.map((item) => {
            return (
              <Box key={item.label}>
                <ListSubheader
                  component="li"
                  disableSticky
                  sx={{
                    fontSize: '80%',
                    fontWeight: '400',
                    lineHeight: 'normal',
                    textTransform: 'uppercase',
                    bgcolor: 'transparent',
                    p: (theme) => theme.spacing(2.75, 3.75, 1.875),
                  }}
                >
                  {item.label}
                </ListSubheader>
                {item.children ? renderNavs(item.children) : null}
              </Box>
            )
          })}
        </List>
      </SideBar>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minWidth: 0,
          position: 'relative',
        }}
        className="wrapper"
      >
        <Box
          sx={{
            display: 'flex',
            minWidth: 0,
            flex: 1,
            flexDirection: 'column',
            minHeight: '100%',

            marginLeft: isSidebarOpen
              ? {
                  md: `${SIDEBAR.width}px`,
                  sm: 0,
                }
              : 0,
            transition: (theme) => theme.transitions.create(['margin-left']),
            willChange: 'width, margin',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              minWidth: 0,
              flex: 1,
              flexDirection: 'column',
              py: noSpacing ? 0 : { lg: 4, xs: 2 },
              px: noSpacing ? 0 : { lg: 4, xs: 2 },
              mt: noSpacing ? 0 : `${HEADER.height}px`,
              minHeight: `calc(100vh - ${HEADER.height}px)`,
            }}
            className="content"
          >
            <Outlet />
          </Box>
          {!footerDisabled && (
            <Box
              sx={{
                py: 1.5,
                px: 2,
                textAlign: 'center',
                background: '#fff',
                borderTop: '2px solid #eee',
              }}
            >
              {t('SYSCOMMON.copyright')}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout
