import WpBox from '@components/WpBox'
import { ContentPages, lang } from '@constants/content.constants'
import {
  Breadcrumbs,
  Container,
  Typography,
  Link as Muilink,
} from '@mui/material'
import { Box } from '@mui/system'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  const { t } = useTranslation()
  const breadcrumbs = [
    <Muilink
      component={Link}
      underline="hover"
      key="1"
      color="inherit"
      to="/home"
    >
      {t('SYSCOMMON.home')}
    </Muilink>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t('HOME.about')}
    </Typography>,
  ]
  return (
    <Box>
      <Container maxWidth={'lg'}>
        <Box sx={{ mt: 16, mb: 4 }}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
          <Typography mt={4} mb={2} variant="h2">
            {t('HOME.about')}
          </Typography>
          <Box className="content">
            <WpBox
              lineCount={14}
              id={ContentPages.privacy[`${i18next.language as lang}`]}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default AboutPage
