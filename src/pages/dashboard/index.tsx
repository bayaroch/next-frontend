import DataLoading from '@components/DataLoading'
import { DashboardOutlined } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const DashboardPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <Box>
      <Typography variant="h5"> {t('SYSCOMMON.dashboard')}</Typography>
      <DataLoading
        isLoading={false}
        resource={t('SYSCOMMON.reports')}
        emptyDesc={t('SYSCOMMON.no_data')}
        isEmptyData={true}
        icon={<DashboardOutlined />}
        emptyAction={
          <Button variant="outlined" onClick={() => navigate('/automation')}>
            {t('SYSCOMMON.go_to_automation')}
          </Button>
        }
      />
    </Box>
  )
}

export default DashboardPage
