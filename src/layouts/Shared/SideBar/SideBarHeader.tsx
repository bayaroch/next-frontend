import Logo from '@components/Logo'
import { Box, IconButton } from '@mui/material'
import React from 'react'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import theme from '@theme/index'
import { HEADER } from '@constants/layouts.constants'

interface SideBarHeaderProps {
  open: boolean
  setSideOpen: (open: boolean) => void
}

const SidebarHeader: React.FC<SideBarHeaderProps> = ({ setSideOpen }) => {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: theme.spacing(0.5, 3),
          justifyContent: 'space-between',
          minHeight: HEADER.height,
        }}
      >
        <Logo
          sx={{
            width: 140,
            '& img': {
              width: '100%',
              height: 'auto',
              top: 5,
              position: 'relative',
            },
          }}
        />

        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ ml: 0, mr: -1.5, mt: 0.2 }}
          onClick={() => setSideOpen(false)}
        >
          <MenuOpenIcon />
        </IconButton>
      </Box>
    </React.Fragment>
  )
}

export default SidebarHeader
