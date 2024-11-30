import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, Dashboard } from '@mui/icons-material'

const MobileBackButton = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  const handleBack = () => {
    const pathArray = location.pathname.split('/').filter((x) => x)
    if (pathArray.length > 0) {
      // Remove the last segment and navigate to the parent route
      pathArray.pop()
      const parentPath = '/' + pathArray.join('/')
      navigate(parentPath)
    } else {
      // If we're already at root, do nothing or navigate to a default page
      navigate('/')
    }
  }

  // Check if we're on the root path
  const isRoot = location.pathname === '/'

  if (!isMobile || isRoot) {
    return (
      <IconButton
        aria-label={t('COMMON.back')}
        sx={{
          border: '0 none',
          p: 0,
          height: 34,
          width: 34,
          cursor: 'inherit',
        }}
      >
        <Dashboard />
      </IconButton>
    )
  }

  return (
    <IconButton
      aria-label={t('COMMON.back')}
      sx={{
        border: '0 none',
        p: 0,
        height: 34,
        width: 34,
      }}
    >
      <ChevronLeft onClick={handleBack} />
    </IconButton>
  )
}

export default MobileBackButton
