import { Box, Paper, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const NoSubscriptionMessage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Paper
      elevation={0}
      sx={{
        borderColor: 'divider',
        height: '100%',
        pt: 4,
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" component="h2" color="primary.main">
          {t('NO_SUBSCRIPTION.title')}
        </Typography>

        <Box>
          <Typography variant="body1" color="text.primary" gutterBottom>
            {t('NO_SUBSCRIPTION.description')}
          </Typography>

          <Typography variant="body1" color="text.primary" gutterBottom>
            {t('NO_SUBSCRIPTION.action')}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {t('NO_SUBSCRIPTION.benefits')}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  )
}

export default NoSubscriptionMessage
