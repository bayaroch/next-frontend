import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Typography,
  Hidden,
  IconButton,
  Drawer,
  useScrollTrigger,
} from '@mui/material'
import Logo from '@components/Logo'
import { homeMenuItems } from '@constants/homemenu'
import { Link } from 'react-router-dom'
import { Dashboard, Login } from '@mui/icons-material'
import Hamburger from './Hamburger'
import { use100vh } from 'react-div-100vh'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'global/AuthContext'

export const headerHeight = 60

const HeaderHome = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState<boolean>(false)
  const height = use100vh()
  const drawerHeight = height ? height - headerHeight : '100%'
  const { isLoggedIn } = useAuth()

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        background: '#fff',
        height: headerHeight,
        boxShadow: trigger ? '0 5px 10px rgba(0, 0, 0, 0.085)' : 0,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            '&': {
              minHeight: headerHeight,
            },
          }}
        >
          <Box
            component="div"
            sx={{
              flexGrow: 1,
              height: 35,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Hidden mdUp>
              <Box sx={{ mr: 2, mt: 0.2 }}>
                <Hamburger open={open} setOpen={setOpen} />
              </Box>
            </Hidden>
            <Box sx={{ width: 140, mt: 0.1 }}>
              <Logo
                sx={{
                  height: '100%',
                  '& a img': { width: '100%', height: 'auto' },
                  '& a': { height: '100%', width: '100%' },
                }}
              />
            </Box>
            <Hidden mdDown>
              <List
                component="nav"
                aria-label="main mailbox folders"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  ml: 2,
                }}
              >
                {homeMenuItems.map((item, index) => (
                  <ListItem sx={{ whiteSpace: 'nowrap' }} key={index}>
                    <MuiLink
                      sx={{ textDecoration: 'none' }}
                      component={Link}
                      to={item.link}
                    >
                      <ListItemText>
                        <Typography variant="h5" color={'secondary'}>
                          {t(item.label)}
                        </Typography>
                      </ListItemText>
                    </MuiLink>
                  </ListItem>
                ))}
              </List>
            </Hidden>
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Box sx={{ mr: 2 }}></Box>
            <Hidden mdDown>
              {!isLoggedIn ? (
                <Button component={Link} to={'/login'} variant="contained">
                  {t('HOME.sign_in')}
                </Button>
              ) : (
                <Button component={Link} to={'/'} variant="contained">
                  {t('HOME.go_to_dashboard')}
                </Button>
              )}
            </Hidden>
            <Hidden mdUp>
              {/* Display the menu icon for screens smaller than lg */}
              {!isLoggedIn ? (
                <IconButton
                  component={Link}
                  to={'/login'}
                  edge="start"
                  color="primary"
                  aria-label="menu"
                >
                  <Login />
                </IconButton>
              ) : (
                <>
                  <IconButton
                    component={Link}
                    to={'/'}
                    edge="start"
                    color="primary"
                    aria-label="menu"
                  >
                    <Dashboard />
                  </IconButton>
                </>
              )}
            </Hidden>
          </Box>
        </Toolbar>
      </Container>
      {/* Drawer */}
      <Hidden mdUp>
        <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              mt: `${headerHeight}px`,
              height: drawerHeight,
            }}
            role="presentation"
          >
            {/* Drawer Content */}
            <List sx={{ height: '100%', pt: 0 }}>
              {homeMenuItems.map((item, index) => (
                <ListItem key={index} sx={{ borderBottom: '1px solid #eee' }}>
                  <MuiLink
                    sx={{ textDecoration: 'none' }}
                    component={Link}
                    to={item.link}
                  >
                    <ListItemText>
                      <Typography variant="h5" color={'secondary'}>
                        {t(item.label)}
                      </Typography>
                    </ListItemText>
                  </MuiLink>
                </ListItem>
              ))}
            </List>

            {/* Other content at the bottom of the drawer */}
            <Box p={2}>
              {/* Add any additional content here */}
              <Typography variant="body2" color="textSecondary">
                {t('HOME.additional_content')}
              </Typography>
            </Box>
          </Box>
        </Drawer>
      </Hidden>
    </AppBar>
  )
}

export default HeaderHome
