import React from 'react'
import {
  Grid2 as Grid,
  Button,
  Stack,
  Box,
  Card,
  CardContent,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@layouts/Shared/Header/LanguageSwitcher'
import { Languages } from '@constants/common.constants'

interface CheckoutLayoutProps {
  children: React.ReactNode
  infoComponent: React.ReactNode
  infoMobileComponent: React.ReactNode
  logout: () => void
  lang: string
  changeLanguage: (lang: string) => void
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({
  children,
  infoComponent,
  infoMobileComponent,
  logout,
  lang,
  changeLanguage,
}) => {
  const { t } = useTranslation()

  return (
    <Grid
      container
      sx={{
        pt: 8,
        height: {
          xs: '100%',
          sm: 'calc(100dvh - var(--template-frame-height, 0px))',
        },
        mt: {
          xs: 4,
          sm: 0,
        },
      }}
    >
      <Grid
        size={{ sm: 12, md: 4, lg: 4 }}
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          backgroundColor: 'background.paper',
          borderRight: { sm: 'none', md: '1px solid' },
          borderColor: { sm: 'none', md: 'divider' },
          alignItems: 'start',
          position: 'relative',
          pt: 16,
          px: { sm: 2, xs: 2, md: 2, lg: 10 },
          gap: 4,
        }}
      >
        {infoComponent}
        <Button
          variant="text"
          onClick={logout}
          sx={{ position: 'absolute', bottom: 0, mb: 4 }}
        >
          {t('SYSCOMMON.logout')}
        </Button>
      </Grid>
      <Grid
        size={{ sm: 12, md: 8, lg: 8 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          width: '100%',
          backgroundColor: { xs: 'transparent', sm: 'background.default' },
          alignItems: 'start',
          pt: { xs: 0, sm: 0, md: 14 },
          px: { xs: 2, sm: 10 },
          gap: { xs: 4, md: 8 },
        }}
      >
        <Stack
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            mt: { xs: 2, md: 2 },
            px: 2,
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            mr: 4,
          }}
        >
          <Box>
            <Button
              variant="text"
              sx={{ display: { xs: 'auto', md: 'none' } }}
              onClick={logout}
            >
              {t('SYSCOMMON.logout')}
            </Button>
          </Box>
          <Box>
            <LanguageSwitcher
              currentLang={lang}
              data={Languages}
              onSwitch={changeLanguage}
            />
          </Box>
        </Stack>
        <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
          <CardContent
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {infoMobileComponent}
          </CardContent>
        </Card>
        {children}
      </Grid>
    </Grid>
  )
}

export default CheckoutLayout
