import * as React from 'react'
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SelectContent from '../SelectContent'
import MenuContent from '../MenuContent'
import OptionsMenu from '../OptionsMenu'
import SitemarkIcon from '@components/@public/SitemarkIcon'
import { AppInitResponse } from '@services/auth.services'
import { Link } from 'react-router-dom'

const drawerWidth = 240

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
})

interface SideMenuProps {
  initData?: AppInitResponse
  onLogout: () => void
}

const SideMenu: React.FC<SideMenuProps> = ({ initData, onLogout }) => {
  const user = initData && initData.user_info

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          zIndex: 10,
          overflow: 'hidden',
          background: 'none',
          border: '0 none',
          '&:after': {
            content: '""',
            position: 'absolute',
            zIndex: 20,
            top: '-40px',
            bottom: '-40px',
            left: '100%',
            width: '100%',
            boxShadow: '-12px 0 24px -5px rgba(132, 146, 166, .16)',
            pointerEvents: 'none',
          },
        },
      }}
      sx={{
        position: 'relative',
        zIndex: 10,
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Box sx={{ pt: 1, pb: 0.5, px: 2, borderBottom: '1px solid #e1e5ea' }}>
        <Link to="/">
          <SitemarkIcon />
        </Link>
      </Box>
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        <SelectContent />
      </Box>
      <Divider />
      <MenuContent />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt={user?.first_name}
          src={undefined}
          sx={{ width: 36, height: 36 }}
        />
        {user && (
          <Box sx={{ mr: 'auto' }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: '16px' }}
            >
              {user?.first_name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {user?.email}
            </Typography>
          </Box>
        )}
        <OptionsMenu onLogout={onLogout} />
      </Stack>
    </Drawer>
  )
}
export default SideMenu
