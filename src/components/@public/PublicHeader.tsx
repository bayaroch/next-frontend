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
import { Link as MuiLink, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { homeMenuItems } from '@constants/homemenu'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@layouts/Shared/Header/LanguageSwitcher'
import { Languages } from '@constants/common.constants'

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

const PublicHeader: React.FC<{
  open: boolean
  setOpen: (v: boolean) => void
  isLoggedIn: boolean
  lang: string
  changeLanguage: (v: string) => void
}> = ({ open, setOpen, isLoggedIn, lang, changeLanguage }) => {
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
        mt: { md: 4, sm: 2.5, xs: 2.5 },
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}
          >
            <Link to="/" style={{ padding: 0, margin: 0, lineHeight: 0 }}>
              <Sitemark />
            </Link>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {homeMenuItems.map((item, index) => (
                <Link key={index} to={item.link}>
                  <Button variant="text" color="info" size="small">
                    {t(item.label)}
                  </Button>
                </Link>
              ))}
            </Box>
          </Box>
          <Box sx={{ mr: 1 }}>
            <LanguageSwitcher
              currentLang={lang}
              data={Languages}
              onSwitch={changeLanguage}
            />
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
                  {t('SYSCOMMON.login')}
                </Button>
              ) : (
                <Stack spacing={1} direction={'row'} display={'flex'}>
                  <Button
                    component={Link}
                    to={'/'}
                    variant="outlined"
                    color="secondary"
                  >
                    {t('SYSCOMMON.go_to_app')}
                  </Button>
                  <Button component={Link} to={'/logout'} variant="contained">
                    {t('SYSCOMMON.logout')}
                  </Button>
                </Stack>
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
                      {t('SYSCOMMON.login')}
                    </Button>
                  ) : (
                    <>
                      <Button
                        component={Link}
                        to={'/'}
                        fullWidth
                        variant="contained"
                        color="secondary"
                      >
                        {t('SYSCOMMON.go_to_app')}
                      </Button>
                      <Button
                        component={Link}
                        to={'/logout'}
                        fullWidth
                        variant="outlined"
                      >
                        {t('SYSCOMMON.logout')}
                      </Button>
                    </>
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
export default PublicHeader
