/* eslint-disable @typescript-eslint/no-unused-vars */
import PublicFooter from '@layouts/Shared/Header/PublicFooter'
import { Paper } from '@mui/material'
import { Box, Container } from '@mui/system'

const ContactPage = () => {
  return (
    <Box>
      <Container maxWidth={'lg'}>
        <Paper
          sx={{
            p: { xl: 4, sm: 2 },
            mt: 4,
            mb: 4,
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
