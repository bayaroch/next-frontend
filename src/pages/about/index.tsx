import { Paper } from '@mui/material'
import { Box, Container } from '@mui/system'

const AboutPage = () => {
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
          about
        </Paper>
      </Container>
    </Box>
  )
}

export default AboutPage
