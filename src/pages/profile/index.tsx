import React from 'react'
import {
  Avatar,
  Box,
  Chip,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useQuery } from 'react-query'
import { getProfileService, SubStatus } from '@services/auth.services'
import { AccessTime, Email, Token, WorkOutline } from '@mui/icons-material'
import moment from 'moment'

const ProfilePage = () => {
  // basic use query and with options
  const { data, isLoading } = useQuery('profile', getProfileService, {
    refetchOnWindowFocus: false,
    retry: 1,
  })

  // eslint-disable-next-line no-console
  console.log(data, isLoading)

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
      <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5, xl: 4 }}>
        <Box>
          <Paper
            sx={{
              mt: 0,
              boxShadow: 2,
              overflow: 'hidden',
              flex: 1,
              p: 2,
            }}
          >
            {data && (
              <Stack spacing={2} alignItems="center">
                <Avatar
                  sx={{ width: 120, height: 120 }}
                  src={`https://graph.facebook.com/${data.fb_id}/picture?type=large`}
                />
                <Typography variant="h5">{data?.fb_name}</Typography>
                <Chip
                  label={data?.role.toUpperCase()}
                  color="primary"
                  variant="outlined"
                />
                <Box display="flex" alignItems="center" gap={1}>
                  <Email color="action" />
                  <Typography>{data.email}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <WorkOutline color="action" />
                  <Typography>{data.first_name}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTime color="action" />
                  <Typography>
                    Valid until: {moment(data.subscription.end_at).format('LL')}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Token color="action" />
                  <Typography>
                    Remaining tokens: {data.subscription.remaining_token}
                  </Typography>
                </Box>
                <Chip
                  label={data.subscription.status}
                  color={getSubscriptionStatusColor(data.subscription.status)}
                  sx={{ width: 'fit-content' }}
                />
              </Stack>
            )}
          </Paper>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7, xl: 8 }}>Tabs</Grid>
    </Grid>
  )
}

export default ProfilePage
