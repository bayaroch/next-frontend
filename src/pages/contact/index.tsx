/* eslint-disable @typescript-eslint/no-unused-vars */
import HeaderHome, { headerHeight } from '@components/@landing-page/HeaderHome'
import PublicFooter from '@layouts/Shared/Header/PublicFooter'
import { Paper } from '@mui/material'
import { Box, Container } from '@mui/system'
import i18next from 'i18next'
import { use100vh } from 'react-div-100vh'

const ContactPage = () => {
  const height = use100vh()
  const minHeight = height ? height - 389 : 400
  return (
    <Box sx={{ pt: `${headerHeight}px` }}>
      <HeaderHome />
      <Container maxWidth={'lg'}>
        <Paper
          sx={{
            p: { xl: 4, sm: 2 },
            mt: 4,
            mb: 4,
            minHeight: { sm: 'auto', md: minHeight },
          }}
        >
          {/* <HelpContent id={HelpPage.support[i18next.language as lang]} /> */}
          Coming soon..
        </Paper>
      </Container>
      <PublicFooter />
    </Box>
  )
}

export default ContactPage