import WpBox from '@components/WpBox'
import { ContentPages, lang } from '@constants/content.constants'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400, // Reduced height for mobile
  marginTop: theme.spacing(2), // Reduced margin for mobile
  borderRadius: theme.shape.borderRadius,
  borderColor: theme.palette.grey[200],
  backgroundImage: `url(${'/images/home-pic.png'})`,
  backgroundSize: 'contain', // Changed to contain to prevent cropping
  backgroundPosition: 'center', // Center the background
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.up('sm')]: {
    height: 500,
    marginTop: theme.spacing(4),
  },
  ...theme.applyStyles('dark', {
    backgroundImage: `url(${'/images/flow.png'})`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
  }),
}))

export default function Hero() {
  const { t } = useTranslation()
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(301, 8%, 75%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(301, 8%, 75%), transparent)',
        }),
        '&:after': {
          background: "url('images/hero-illustration.svg') top right no-repeat",
          content: "''",
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: -1,
        },
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pt: { xs: 12, sm: 12, md: 20 },
          pb: { xs: 4, sm: 8, md: 12 },
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
            textAlign: 'center',
            fontWeight: 500,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: 1, sm: 2 },
            mb: { xs: 1, sm: 1 },
            mt: { sm: 4, md: 2 },
          }}
        >
          <span>{t('HOME.ai')}</span>
          <Typography
            component="span"
            sx={(theme) => ({
              fontSize: 'inherit',
              color: 'primary.main',
              fontWeight: 500,
              ...theme.applyStyles('dark', {
                color: 'primary.light',
              }),
            })}
          >
            {t('HOME.slogan_one')}
          </Typography>
        </Typography>

        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            width: '100%',
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
            maxWidth: { sm: '100%', md: '80%' },
            mb: { xs: 3, sm: 4 },
          }}
        >
          {t('HOME.slogan_two')}
        </Typography>
        <Link to="/login">
          <Button
            variant="contained"
            color="primary"
            sx={{
              minWidth: 'fit-content',
              mb: { xs: 2, sm: 4 },
            }}
          >
            {t('HOME.start_now')}
          </Button>
        </Link>

        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
          <Grid size={{ xs: 12, sm: 12, md: 8 }}>
            <StyledBox id="image" />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontSize: 16,
                  mt: { xs: 2, md: 15 },
                }}
              >
                <WpBox
                  lineCount={8}
                  id={ContentPages.description[`${i18next.language as lang}`]}
                />
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
