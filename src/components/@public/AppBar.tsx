import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Sitemark from './SitemarkIcon'
import { Link as MuiLink } from '@mui/material'
import { Link } from 'react-router-dom'
import { homeMenuItems } from '@constants/homemenu'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@global/AuthContext'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}))

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false)
  const { isLoggedIn } = useAuth()

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }
  const { t } = useTranslation()

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: { md: 10, sm: 2.5, xs: 2.5 },
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}
          >
            <Sitemark />

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {homeMenuItems.map((item, index) => (
                <Button
                  key={index}
                  LinkComponent={Link}
                  variant="text"
                  color="info"
                  size="small"
                >
                  {t(item.label)}
                </Button>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Box>
              {!isLoggedIn ? (
                <Button component={Link} to={'/login'} variant="contained">
                  {t('HOME.sign_in')}
                </Button>
              ) : (
                <Button
                  component={Link}
                  to={'/'}
                  variant="contained"
                  color="secondary"
                >
                  {t('HOME.go_to_app')}
                </Button>
              )}
            </Box>
          </Box>
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                {homeMenuItems.map((item, index) => (
                  <MenuItem key={index}>
                    <MuiLink
                      sx={{ textDecoration: 'none' }}
                      component={Link}
                      to={item.link}
                    >
                      {t(item.label)}
                    </MuiLink>
                  </MenuItem>
                ))}
                <MenuItem>
                  {!isLoggedIn ? (
                    <Button
                      component={Link}
                      to={'/login'}
                      fullWidth
                      variant="contained"
                    >
                      {t('HOME.sign_in')}
                    </Button>
                  ) : (
                    <Button
                      component={Link}
                      to={'/'}
                      fullWidth
                      variant="contained"
                      color="secondary"
                    >
                      {t('HOME.go_to_app')}
                    </Button>
                  )}
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  )
}
