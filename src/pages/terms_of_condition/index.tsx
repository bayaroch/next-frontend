import HeaderHome, { headerHeight } from '@components/@landing-page/HeaderHome'
import PublicFooter from '@layouts/Shared/Header/PublicFooter'
import { Container, Paper } from '@mui/material'
import { Box } from '@mui/system'

const TermsOfConditionPage = () => {
  return (
    <Box sx={{ pt: `${headerHeight}px` }}>
      <HeaderHome />
      <Container maxWidth={'lg'}>
        <Paper sx={{ p: { xl: 4, sm: 2 }, mt: 4, mb: 4 }}>sadasd</Paper>
      </Container>
      <PublicFooter />
    </Box>
  )
}

export default TermsOfConditionPage
