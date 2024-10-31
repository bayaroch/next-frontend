import WpBox from '@components/WpBox'
import { ContentPages, lang } from '@constants/content.constants'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 600,
  marginTop: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  // outline: '6px solid',
  // outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  // border: '1px solid',
  borderColor: theme.palette.grey[200],
  // boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: `url(${'/images/flow.png'})`,
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(4),
    height: 600,
  },
  ...theme.applyStyles('dark', {
    // boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: `url(${'/images/flow.png'})`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    // borderColor: theme.palette.grey[700],
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
          alignItems: 'center',
          pt: { xs: 14, sm: 24 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            {t('HOME.ai')} &nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
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
              width: { sm: '100%', md: '80%' },
            }}
          >
            {t('HOME.slogan_two')}
          </Typography>
        </Stack>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ minWidth: 'fit-content', mt: 2 }}
          >
            {t('HOME.start_now')}
          </Button>
        </Box>
        <Grid spacing={{ md: 2, lg: 4 }} container>
          <Grid size={{ md: 7, sm: 12 }}>
            <StyledBox id="image" />
          </Grid>
          <Grid size={{ md: 5, sm: 12 }}>
            <Box>
              <Typography variant="body1" sx={{ marginTop: 15, fontSize: 16 }}>
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
