import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid2 as Grid,
  OutlinedInput,
  Stack,
} from '@mui/material'
import { useMutation, useQuery } from 'react-query'
import { Profile } from '@services/auth.services'
import { EditOutlined } from '@mui/icons-material'
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
import ProfileLayout from '@containers/ProfileLayout'

const ProfilePage: React.FC = () => {
  const { data } = useQuery('profile', getProfileService, {
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const { showToast } = useToast()

  const profileUpdateMutation = useMutation<Profile, Error, ProfileParams>(
    (input) => updateProfileService(input),
    {
      onSuccess: () => {
        showToast('Profile updated successfully', { severity: 'success' })
        setIsEditing(false)
      },
      onError: (err: any) => {
        if (err.code && err) {
          showToast(t(`ERROR.\${err.code}`), { severity: 'error' })
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
    profileUpdateMutation.mutate(formData)
  }

  if (!data) {
    return null // or a loading spinner
  }

  return (
    <ProfileLayout profile={data}>
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
              <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ mb: 2 }}>
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
                <Button variant="outlined" onClick={() => setIsEditing(false)}>
                  {t('SYSCOMMON.cancel')}
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isValid}
                  loading={profileUpdateMutation.isLoading}
                >
                  {t('SYSCOMMON.save')}
                </LoadingButton>
              </Stack>
            )}
          </form>
        </CardContent>
      </Card>
    </ProfileLayout>
  )
}

export default ProfilePage
