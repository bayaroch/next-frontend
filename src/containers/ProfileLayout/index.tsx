import React from 'react'
import {
  Avatar,
  Box,
  Chip,
  Grid2 as Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import {
  AccessTime,
  AccountBoxOutlined,
  CreditCardOutlined,
  KeyboardArrowRight,
  ReceiptOutlined,
  ShoppingCart,
  Token,
} from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { Profile, SubStatus } from '@services/auth.services'

interface ProfileLayoutProps {
  children: React.ReactNode
  profile: Profile
}

const MENU_ITEMS = [
  {
    icon: <AccountBoxOutlined />,
    label: 'SYSCOMMON.profile',
    path: '/profile',
  },
  {
    icon: <CreditCardOutlined />,
    label: 'SYSCOMMON.subscriptions',
    path: '/profile/subscriptions',
  },
  {
    icon: <ReceiptOutlined />,
    label: 'SYSCOMMON.transactions',
    path: '/profile/transactions',
  },
]

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children, profile }) => {
  const { t } = useTranslation()
  const location = useLocation()

  const getSubscriptionStatusColor = (status?: SubStatus) => {
    switch (status) {
      case SubStatus.ACTIVE:
        return 'success'
      case SubStatus.CANCEL:
        return 'error'
      case SubStatus.EXPIRED:
        return 'warning'
      default:
        return 'default'
    }
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        '.MuiGrid-item': { paddingTop: '8px' },
      }}
    >
      <Grid size={{ xs: 12, sm: 12, md: 5, lg: 4, xl: 3 }}>
        <Box>
          <Paper
            sx={{
              mt: 0,
              overflow: 'hidden',
              flex: 1,
              p: 2,
            }}
          >
            <Stack spacing={2} alignItems="center">
              <Chip
                label={profile?.role.toUpperCase()}
                color="primary"
                variant="outlined"
              />
              <Avatar
                sx={{ width: 120, height: 120, boxShadow: 4 }}
                src={`https://graph.facebook.com/${profile.fb_id}/picture?type=large`}
              />
              <Typography variant="h5">
                {profile?.fb_name || profile?.first_name}
              </Typography>

              {profile?.subscription && (
                <Box sx={{ boxShadow: 2, p: 2, width: '100%' }}>
                  <Box display="flex" alignItems="center" gap={1} pb={1}>
                    <ShoppingCart color="action" fontSize="small" />
                    <Typography>
                      <Typography component={'span'}>
                        {profile?.subscription.product?.name}
                      </Typography>
                      <Chip
                        label={profile.subscription.status}
                        color={getSubscriptionStatusColor(
                          profile.subscription.status
                        )}
                        sx={{ width: 'fit-content', ml: 1 }}
                      />
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} pb={1}>
                    <AccessTime color="action" fontSize="small" />
                    <Typography>
                      {t('SYSCOMMON.valid_until')}:{' '}
                      {moment(profile.subscription.end_at).format('LL')}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Token color="primary" fontSize="small" />
                    <Typography>
                      {profile.subscription.remaining_token}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Stack>
            <List>
              {MENU_ITEMS.map((item) => (
                <ListItem
                  key={item.path}
                  component={Link}
                  to={item.path}
                  disablePadding
                  sx={{
                    display: 'block',
                    color: 'inherit',
                    mb: 1,
                  }}
                  secondaryAction={<KeyboardArrowRight sx={{ mt: 1 }} />}
                >
                  <ListItemButton
                    selected={location.pathname === item.path}
                    sx={{
                      color: '#555',
                      '&.Mui-selected': {
                        color: (theme) => theme.palette.primary.main,
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={t(item.label)} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 7, lg: 8, xl: 9 }}>{children}</Grid>
    </Grid>
  )
}

export default ProfileLayout
