import * as React from 'react'
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'
import MuiToolbar from '@mui/material/Toolbar'
import { tabsClasses } from '@mui/material/Tabs'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import MenuButton from '../MenuButton'
import SideMenuMobile from '../SideMenuMobile'
import { AppInitResponse } from '@services/auth.services'
import SitemarkIcon from '@components/@public/SitemarkIcon'
import MobileBackButton from '../MobileBackButton'

const Toolbar = styled(MuiToolbar)({
  width: '100%',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
})
interface AppNavbarProps {
  initData?: AppInitResponse
  onLogout: () => void
  isSidebarOpen: boolean
  toggleSidebar: (v: boolean) => void
}

const AppNavbar: React.FC<AppNavbarProps> = ({
  initData,
  isSidebarOpen,
  toggleSidebar,
  onLogout,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        display: { xs: 'auto', md: 'none' },
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        top: 'var(--template-frame-height, 0px)',
      }}
    >
      <Toolbar variant="regular">
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            flexGrow: 1,
            width: '100%',
            gap: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: 'center', mr: 'auto' }}
          >
            <MobileBackButton />
            <SitemarkIcon />
          </Stack>
          <MenuButton aria-label="menu" onClick={() => toggleSidebar(true)}>
            <MenuRoundedIcon />
          </MenuButton>
          {initData && (
            <SideMenuMobile
              open={isSidebarOpen}
              initData={initData}
              toggleDrawer={toggleSidebar}
              onLogout={onLogout}
            />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default AppNavbar
