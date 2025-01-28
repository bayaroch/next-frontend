import React, { useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import { ChevronLeft as ChevronLeftIcon, MoreVert } from '@mui/icons-material'
import { styled, useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

const drawerWidth = 360

const NestedMain = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean
}>(() => ({
  flexGrow: 1,
  marginLeft: 0,
  minHeight: 'calc(100vh - 53px)',

  width: '100%',
}))

interface LayoutProps {
  children: React.ReactNode
  leftChildren: React.ReactNode
  header?: React.ReactNode
  isSaving: boolean
}

const NestedLayout: React.FC<LayoutProps> = ({
  children,
  leftChildren,
  isSaving,
  header,
}) => {
  const [open, setOpen] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useTranslation()

  useEffect(() => {
    if (isMobile) {
      setOpen(false)
    }
  }, [])

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const drawerContent = (
    <Box sx={{ position: 'relative' }}>
      <IconButton
        size="small"
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          height: 30,
          width: 30,
          background: 'transparent',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
          },
        }}
        onClick={toggleDrawer}
      >
        <ChevronLeftIcon sx={{ color: '#fff' }} />
      </IconButton>

      <Box>{leftChildren}</Box>
    </Box>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'absolute',
        width: '100%',
        overflow: 'hidden',
        left: 0,
        right: 0,
        top: 0,
      }}
    >
      {isMobile ? (
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: '100%',

              maxWidth: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          sx={{
            width: open ? drawerWidth : 0,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              position: 'relative',
              height: '100%',
              overflowX: 'hidden',
              border: '1px solid #eee',
              background: '#fff',
              boxShadow: 'rgba(132, 146, 166, 0.16) 12px 0px 24px -5px',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          {drawerContent}
        </Drawer>
      )}
      <NestedMain open={open}>
        <Box sx={{ position: 'relative' }}>
          {header && (
            <Box
              sx={{
                background: '#fff',
                borderBottom: '1px solid #ccc',
                height: 54,
                mb: 1,
                pl: open ? 1 : 7,
              }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  left: 10,
                  border: '0 none',
                  top: 8,
                  cursor: 'pointer',
                  zIndex: 100,
                  ...(open && !isMobile && { display: 'none' }),
                }}
                size="small"
                onClick={toggleDrawer}
              >
                <MoreVert />
              </IconButton>
              {header}
            </Box>
          )}

          <Box sx={{ position: 'relative' }}>
            {isSaving && (
              <Box
                sx={{ position: 'absolute', right: 6, top: 4, fontSize: 11 }}
              >
                <Box component={'span'} sx={{ mr: 0.5 }}>
                  <CircularProgress size={12} />
                </Box>
                {t('SYSCOMMON.saving')}
              </Box>
            )}
            {children}
          </Box>
        </Box>
      </NestedMain>
    </Box>
  )
}

export default NestedLayout
