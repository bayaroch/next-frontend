import React from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

const AutomationListHeader: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation()

  if (isMobile) {
    return null // Don't render the header on mobile
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
        color: '#999',
      }}
    >
      <Box sx={{ flex: 2 }}>
        <Typography variant="body2">{t('SYSCOMMON.name')}</Typography>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body2">{t('SYSCOMMON.status')}</Typography>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body2">{t('AUTOMATION.responses')}</Typography>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="body2" sx={{ pr: 8 }}>
          {t('AUTOMATION.last_modified')}
        </Typography>
      </Box>
    </Box>
  )
}

export default AutomationListHeader
