import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import { Link as MuiLink } from '@mui/material'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import SitemarkIcon from './SitemarkIcon'
import { Link } from 'react-router-dom'
import { Facebook, Instagram } from '@mui/icons-material'

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
  return (
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
            <Typography
              variant="body2"
              gutterBottom
              sx={{ fontWeight: 600, mt: 2 }}
            >
              Join the newsletter
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Subscribe for weekly updates. No spams ever!
            </Typography>
            <InputLabel htmlFor="email-newsletter">Email</InputLabel>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="email-newsletter"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label="Enter your email address"
                placeholder="Your email address"
                slotProps={{
                  htmlInput: {
                    autoComplete: 'off',
                    'aria-label': 'Enter your email address',
                  },
                }}
                sx={{ width: '250px' }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ flexShrink: 0 }}
              >
                Subscribe
              </Button>
            </Stack>
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
            Product
          </Typography>
          <MuiLink
            component={Link}
            to="/features"
            color="text.secondary"
            variant="body2"
          >
            Features
          </MuiLink>
          <MuiLink
            component={Link}
            to="/pricing"
            color="text.secondary"
            variant="body2"
          >
            Pricing
          </MuiLink>
          <MuiLink
            component={Link}
            to="/faq"
            color="text.secondary"
            variant="body2"
          >
            FAQs
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
            Company
          </Typography>
          <MuiLink
            component={Link}
            to="/about"
            color="text.secondary"
            variant="body2"
          >
            About us
          </MuiLink>
          <MuiLink
            component={Link}
            to="/blog"
            color="text.secondary"
            variant="body2"
          >
            Blog
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
            Legal
          </Typography>
          <MuiLink
            component={Link}
            to="/terms"
            color="text.secondary"
            variant="body2"
          >
            Terms
          </MuiLink>
          <MuiLink
            component={Link}
            to="/privacy"
            color="text.secondary"
            variant="body2"
          >
            Privacy
          </MuiLink>
          <MuiLink
            component={Link}
            to="/contact"
            color="text.secondary"
            variant="body2"
          >
            Contact
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
            Privacy Policy
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
            Terms of Service
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
            href="#"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="#"
            aria-label="X"
            sx={{ alignSelf: 'center' }}
          >
            <Instagram />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  )
}