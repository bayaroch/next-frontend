import Grid from '@mui/material/Grid2'
import SitemarkIcon from '@components/@public/SitemarkIcon'
import { Box, Typography, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ConnectPages from '@containers/ConnectPages'

const Connect = () => {
  const { t } = useTranslation()

  return (
    <div>
      <Grid
        container
        sx={{
          height: {
            xs: '100%',
            sm: 'calc(100dvh - var(--template-frame-height, 0px))',
          },
          mt: { xs: 4, sm: 0 },
        }}
      >
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRight: { sm: 'none', md: '1px solid' },
            borderColor: { sm: 'none', md: 'divider' },
            alignItems: 'start',
            pt: 16,
            px: 10,
            gap: 4,
          }}
        >
          <SitemarkIcon />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: 500,
              gap: 4,
            }}
          >
            <Stack spacing={3}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {t('SYSCOMMON.welcome')}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                {t('SYSCOMMON.description1')}
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            width: '100%',
            backgroundColor: { xs: 'transparent', sm: 'background.default' },
            alignItems: 'start',
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
              gap: 4,
            }}
          >
            <ConnectPages />
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default Connect
