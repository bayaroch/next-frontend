import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import { Link as MuiLink } from '@mui/material'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SitemarkIcon from './SitemarkIcon'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, YouTube } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import DiscordIcon from './DiscordIcon'

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <MuiLink component={Link} to="/" color="text.secondary">
        Kommai
      </MuiLink>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  )
}

export default function Footer() {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        width: '100%',
        mt: 10,
        borderTop: '1px solid #ddd',
        background: '#fefefe',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <SitemarkIcon />
              <Typography variant="body2" sx={{ mb: 2 }}>
                {t('HOME.slogan_two')}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Company
            </Typography>
            <MuiLink
              component={Link}
              to="/about"
              color="text.secondary"
              variant="body2"
            >
              {t('HOME.about')}
            </MuiLink>
            <MuiLink
              component={Link}
              to="/blog"
              color="text.secondary"
              variant="body2"
            >
              {t('HOME.blog')}
            </MuiLink>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              {t('HOME.support')}
            </Typography>
            <MuiLink
              component={Link}
              to="/terms"
              color="text.secondary"
              variant="body2"
            >
              {t('HOME.wiki_how')}
            </MuiLink>
            <MuiLink
              component={Link}
              to="https://forms.gle/AVB5X3WMkRfALrjf8"
              color="text.secondary"
              target="_blank"
              variant="body2"
            >
              {t('HOME.feedback')}
            </MuiLink>
            <MuiLink
              component={Link}
              to="#"
              color="text.secondary"
              target="_blank"
              variant="body2"
            >
              {t('HOME.bug_report')}
            </MuiLink>
            <MuiLink
              component={Link}
              to="https://forms.gle/oobKiwZW8sdkriE59"
              target="_blank"
              color="text.secondary"
              variant="body2"
            >
              {t('HOME.contact')}
            </MuiLink>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            <MuiLink
              component={Link}
              to="/privacy"
              color="text.secondary"
              variant="body2"
            >
              {t('HOME.privacy')}
            </MuiLink>
            <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <MuiLink
              component={Link}
              to="/terms"
              color="text.secondary"
              variant="body2"
            >
              {t('HOME.terms')}
            </MuiLink>
            <Copyright />
          </div>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: 'left', color: 'text.secondary' }}
          >
            <IconButton
              color="inherit"
              size="small"
              href="https://www.facebook.com/kommaiapp"
              aria-label="Facebook"
              target="_blank"
              sx={{ alignSelf: 'center' }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              target="_blank"
              href="https://www.instagram.com/kommaiapp/"
              aria-label="Instagram"
              sx={{ alignSelf: 'center' }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              color="inherit"
              target="_blank"
              size="small"
              href="https://www.youtube.com/@kommai"
              aria-label="Youtube"
              sx={{ alignSelf: 'center' }}
            >
              <YouTube />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              target="_blank"
              href="https://discord.gg/guzTcsPW"
              aria-label="Discord"
              sx={{ alignSelf: 'center' }}
            >
              <DiscordIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
