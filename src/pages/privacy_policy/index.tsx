import HeaderHome, { headerHeight } from '@components/@landing-page/HeaderHome'
import PublicFooter from '@layouts/Shared/Header/PublicFooter'
import { Paper } from '@mui/material'
import { Box, Container } from '@mui/system'

const PrivacyPolicyPage = () => {
  return (
    <Box sx={{ pt: `${headerHeight}px` }}>
      <HeaderHome />
      <Container maxWidth={'lg'}>
        <Paper sx={{ p: { xl: 4, sm: 2 }, mt: 4, mb: 4 }}>asdasd</Paper>
      </Container>
      <PublicFooter />
    </Box>
  )
}

export default PrivacyPolicyPage
