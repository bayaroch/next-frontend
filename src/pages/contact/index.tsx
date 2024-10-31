import ContactForm from '@components/ContactForm'
import {
  Breadcrumbs,
  Container,
  Typography,
  Link as Muilink,
} from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ContactPage = () => {
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
      {t('HOME.contact')}
    </Typography>,
  ]

  const [formData, setFormData] = useState<any | null>(null)

  useEffect(() => {
    const fetchForm = async () => {
      try {
        // const form = await googleFormsToJson(
        //   '1FAIpQLSdKfKtjUoJW9kq3yXQ2Fj3Wq2ZJ2p1Z8Q4Z7E3Q6Q'
        // )
        setFormData(null)
      } catch (error) {
        console.error('Error fetching form data:', error)
      }
    }
    fetchForm()
  }, [])

  return (
    <Box>
      <Container maxWidth={'lg'}>
        <Box sx={{ mt: 16, mb: 4 }}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
          <Typography mt={4} mb={2} variant="h2">
            {t('HOME.contact')}
          </Typography>
          <Box className="content">
            {!formData ? (
              <div>Loading...</div>
            ) : (
              <ContactForm form={formData} />
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default ContactPage
