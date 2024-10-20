import { HEADER, SIDEBAR } from '@constants/layouts.constants'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import {
  AppBar,
  Box,
  IconButton,
  Slide,
  Toolbar,
  useMediaQuery,
} from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { Home } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  open: boolean
  setSideOpen: (open: boolean) => void
  onLogout: () => void
  isFull?: boolean
}

const Header: React.FC<HeaderProps> = ({
  open,
  setSideOpen,
  isFull = false,
}) => {
  const [dropdownSearchVisibility, setDropdownSearchVisibility] =
    React.useState(false)

  const showDropdownSearch = useMediaQuery('(max-width:575px)')

  const width = !isFull ? (open ? SIDEBAR.width : 0) : 0
  const navigate = useNavigate()

  // const currentLang = user ? user.language.toString() : undefined

  // TODO: language enum shiidegdher string bolgono

  return (
    <AppBar
      elevation={0}
      position={'fixed'}
      color="secondary"
      sx={{
        width: {
          sm: open ? `calc(100% - ${width}px)` : `calc(100% - ${width}px)`,
        },
        ml: { sm: !isFull ? (open ? `${width}px` : 0) : 0 },
        transition: (theme) => theme.transitions.create(['width']),
        willChange: 'width',
        minHeight: 40,
      }}
    >
      <Toolbar
        sx={{
          minHeight: {
            xs: HEADER.height,
            sm: HEADER.height,
          },
          px: { lg: 1, xs: 2 },
        }}
      >
        <React.Fragment>
          {!isFull ? (
            open ? (
              ''
            ) : (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{
                  ml: 0,
                }}
                onClick={() => setSideOpen(!open)}
              >
                {open ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>
            )
          ) : (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                ml: 0,
                mr: 3,
              }}
              onClick={() => navigate('/')}
            >
              {<Home />}
            </IconButton>
          )}

          {showDropdownSearch && (
            <Slide in={dropdownSearchVisibility}>
              <Box
                sx={{
                  zIndex: 5,
                  left: 0,
                  right: 0,
                  position: 'absolute',
                  height: '100%',
                }}
              >
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: 15,
                    top: '50%',
                    color: 'inherit',
                    transform: 'translateY(-50%)',
                  }}
                  onClick={() => setDropdownSearchVisibility(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Slide>
          )}
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 1, sm: 1, md: 2 }}
            sx={{ ml: 'auto' }}
          >
            ..
          </Stack>
        </React.Fragment>
      </Toolbar>
    </AppBar>
  )
}

export default Header
