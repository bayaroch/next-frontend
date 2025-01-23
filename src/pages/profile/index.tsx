/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid2 as Grid,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useMutation, useQuery } from 'react-query'
import { Profile, SubStatus } from '@services/auth.services'
import {
  AccessTime,
  EditOutlined,
  Email,
  ShoppingCart,
  Token,
  WorkOutline,
} from '@mui/icons-material'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
import FormField from '@components/@material-extend/FormField'
import useProfileForm from './useProfileForm'
import { Controller } from 'react-hook-form'
import {
  getProfileService,
  ProfileParams,
  updateProfileService,
} from '@services/user.services'
import { useToast } from '@components/ToastProvider'

const ProfilePage = () => {
  // basic use query and with options
  const { data, isLoading } = useQuery('profile', getProfileService, {
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const { t } = useTranslation()

  const [isEditing, setIsEditing] = useState(false)

  const { showToast } = useToast()

  //create updateProfileService mutation
  const profileUpdateMutation = useMutation<Profile, Error, ProfileParams>(
    (input) => updateProfileService(input),
    {
      onSuccess: (data) => {
        showToast('Profile updated successfully', { severity: 'success' })
        setIsEditing(false)
        //
      },
      onError: (err: any) => {
        if (err.code && err) {
          showToast(t(`ERROR.${err.code}`), { severity: 'error' })
        }
      },
    }
  )

  const methods = useProfileForm()
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = methods

  useEffect(() => {
    if (data) {
      reset({
        first_name: data.first_name,
        last_name: data.last_name || '',
        phone_number: data.phone_number || '',
        email: data.email,
      })
    }
  }, [data, reset])

  const onSubmit = (formData: any) => {
    // eslint-disable-next-line no-console
    console.log(formData)
    // Implement your update logic here
    profileUpdateMutation.mutate(formData)
  }

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
            {data && (
              <Stack spacing={2} alignItems="center">
                <Chip
                  label={data?.role.toUpperCase()}
                  color="primary"
                  variant="outlined"
                />
                <Avatar
                  sx={{ width: 120, height: 120, boxShadow: 4 }}
                  src={`https://graph.facebook.com/${data.fb_id}/picture?type=large`}
                />
                <Typography variant="h5">
                  {data?.fb_name || data?.first_name}
                </Typography>

                {data?.subscription && (
                  <Card sx={{ boxShadow: 2 }}>
                    <Box display="flex" alignItems="center" gap={1} pb={1}>
                      <ShoppingCart color="action" fontSize="small" />

                      <Typography>
                        <Typography component={'span'}>
                          {data?.subscription.product?.name}
                        </Typography>
                        <Chip
                          label={data.subscription.status}
                          color={getSubscriptionStatusColor(
                            data.subscription.status
                          )}
                          sx={{ width: 'fit-content', ml: 1 }}
                        />
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} pb={1}>
                      <AccessTime color="action" fontSize="small" />
                      <Typography>
                        {t('SYSCOMMON.valid_until')}:{' '}
                        {moment(data.subscription.end_at).format('LL')}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Token color="primary" fontSize="small" />
                      <Typography>
                        {data.subscription.remaining_token}
                      </Typography>
                    </Box>
                  </Card>
                )}
              </Stack>
            )}
          </Paper>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 7, lg: 8, xl: 9 }}>
        <Card sx={{ boxShadow: 2, p: 0 }}>
          <CardHeader
            title={t('SYSCOMMON.profile')}
            action={
              <Button
                startIcon={<EditOutlined />}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? t('SYSCOMMON.cancel') : t('SYSCOMMON.edit')}
              </Button>
            }
            sx={{ borderBottom: '1px solid #ccc', p: 1 }}
          />
          <CardContent sx={{ p: 1, paddingBottom: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <Controller
                    name="first_name"
                    control={control}
                    render={({ field }) => (
                      <FormField
                        fullWidth
                        errors={errors.first_name?.message}
                        label={t('PROFILE.first_name')}
                        required
                      >
                        <OutlinedInput
                          {...field}
                          fullWidth
                          placeholder={t('PROFILE.first_name')}
                          disabled={!isEditing}
                        />
                      </FormField>
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <Controller
                    name="last_name"
                    control={control}
                    render={({ field }) => (
                      <FormField
                        fullWidth
                        errors={errors.last_name?.message}
                        label={t('PROFILE.last_name')}
                        required
                      >
                        <OutlinedInput
                          {...field}
                          fullWidth
                          placeholder={t('PROFILE.last_name')}
                          disabled={!isEditing}
                        />
                      </FormField>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <Controller
                    name="phone_number"
                    control={control}
                    render={({ field }) => (
                      <FormField
                        fullWidth
                        errors={errors.phone_number?.message}
                        label={t('PROFILE.phone_number')}
                      >
                        <OutlinedInput
                          {...field}
                          fullWidth
                          placeholder={t('PROFILE.phone_number')}
                          disabled={!isEditing}
                        />
                      </FormField>
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <FormField
                        fullWidth
                        errors={errors.email?.message}
                        label={t('PROFILE.email')}
                        required
                      >
                        <OutlinedInput
                          {...field}
                          fullWidth
                          placeholder={t('PROFILE.email')}
                          disabled={!isEditing}
                        />
                      </FormField>
                    )}
                  />
                </Grid>
              </Grid>

              {isEditing && (
                <Stack
                  direction={'row'}
                  width="100%"
                  justifyContent={'space-between'}
                  mt={2}
                  mb={1}
                >
                  <Button variant="outlined">{t('SYSCOMMON.cancel')}</Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                    loading={isLoading}
                  >
                    {t('SYSCOMMON.save')}
                  </LoadingButton>
                </Stack>
              )}
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProfilePage
