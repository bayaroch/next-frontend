import React from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import useSurveyForm from './useSurveyForm'
import FormField from '@components/@material-extend/FormField'
import { useMutation, useQueryClient } from 'react-query'
import {
  AppInitResponse,
  SurvePayload,
  surveyUpdateService,
} from '@services/auth.services'
import _ from 'lodash'
import { LoadingButton } from '@mui/lab'

interface SurveyPagesProps {
  initData: AppInitResponse
}

interface Option {
  value: string
  label: string
}

const COMPANY_TYPE_OPTIONS: Option[] = [
  { value: 'IT field', label: 'IT Field' },
  { value: 'digital_agency', label: 'Digital Agency' },
  { value: 'software_development', label: 'Software Development' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'media', label: 'Media & Entertainment' },
  { value: 'telecom', label: 'Telecommunications' },
  { value: 'logistics', label: 'Logistics & Transportation' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'other', label: 'Other' },
]

const ROLE_OPTIONS: Option[] = [
  { value: 'Marketing Manager', label: 'Marketing Manager' },
  { value: 'CEO', label: 'CEO/Founder' },
  { value: 'Project Manager', label: 'Project Manager' },
  { value: 'Product Manager', label: 'Product Manager' },
  { value: 'CTO', label: 'CTO' },
  { value: 'Developer', label: 'Developer' },
  { value: 'Designer', label: 'Designer' },
  { value: 'Sales Manager', label: 'Sales Manager' },
  { value: 'HR Manager', label: 'HR Manager' },
  { value: 'Operations Manager', label: 'Operations Manager' },
  { value: 'Team Lead', label: 'Team Lead' },
  { value: 'Business Analyst', label: 'Business Analyst' },
  { value: 'Content Manager', label: 'Content Manager' },
  { value: 'QA Engineer', label: 'QA Engineer' },
  { value: 'Other', label: 'Other' },
]

const AGENCY_SIZE_OPTIONS: Option[] = [
  { value: '0-7', label: '0-7 employees' },
  { value: '8-15', label: '8-15 employees' },
  { value: '16-30', label: '16-30 employees' },
  { value: '31-50', label: '31-50 employees' },
  { value: '51-100', label: '51-100 employees' },
  { value: '101-200', label: '101-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '500+', label: '500+ employees' },
]

const SurveyPages: React.FC<SurveyPagesProps> = ({ initData }) => {
  const { t } = useTranslation()
  const { Controller, methods } = useSurveyForm()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = methods

  const queryClient = useQueryClient()

  const userId = _.get(initData, 'user_info.fb_id')

  const updateSurvey = useMutation<any, Error, SurvePayload>(
    (params) => surveyUpdateService(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('appInit')
      },
    }
  )

  const onSubmit = (data: any) => {
    if (userId) {
      const payload = {
        params: data,
        id: userId,
      }
      updateSurvey.mutate(payload)
    }
  }

  const handleSkip = () => {
    if (userId) {
      const payload = {
        params: {
          company_type: '',
          role: '',
          agency_size: '',
        },
        id: userId,
      }
      updateSurvey.mutate(payload)
    }
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        {t('SYSCOMMON.survey')}
      </Typography>

      <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ height: '100%', width: '100%' }}>
          <Controller
            name="company_type"
            control={control}
            render={({ field: { onChange, value, ref, ...rest } }) => (
              <FormField
                sx={{ mb: 1 }}
                fullWidth
                errors={errors?.company_type?.message}
                label={t('SURVEY.company_type')}
                desc={t('SURVEY.company_type_desc')}
                required
              >
                <Autocomplete
                  {...rest}
                  value={
                    COMPANY_TYPE_OPTIONS.find(
                      (option) => option.value === value
                    ) || null
                  }
                  onChange={(_, newValue: Option | null) => {
                    onChange(newValue ? newValue.value : null)
                  }}
                  options={COMPANY_TYPE_OPTIONS}
                  getOptionLabel={(option: Option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputRef={ref}
                      error={!!errors?.company_type}
                      helperText={errors?.company_type?.message}
                      variant="outlined"
                      fullWidth
                      placeholder={t('Select company type')}
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                />
              </FormField>
            )}
          />
          <Controller
            name="role"
            control={control}
            render={({ field: { onChange, value, ref, ...rest } }) => (
              <FormField
                sx={{ mb: 1 }}
                fullWidth
                errors={errors?.role?.message}
                label={t('SURVEY.role')}
                desc={t('SURVEY.role_desc')}
                required
              >
                <Autocomplete
                  {...rest}
                  value={
                    ROLE_OPTIONS.find((option) => option.value === value) ||
                    null
                  }
                  onChange={(_, newValue: Option | null) => {
                    onChange(newValue ? newValue.value : null)
                  }}
                  options={ROLE_OPTIONS}
                  getOptionLabel={(option: Option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputRef={ref}
                      error={!!errors?.role}
                      helperText={errors?.role?.message}
                      variant="outlined"
                      fullWidth
                      placeholder={t('Select role')}
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                />
              </FormField>
            )}
          />
          <Controller
            name="agency_size"
            control={control}
            render={({ field: { onChange, value, ref, ...rest } }) => (
              <FormField
                sx={{ mb: 1 }}
                fullWidth
                errors={errors?.agency_size?.message}
                label={t('SURVEY.agency_size')}
                desc={t('SURVEY.agency_size_desc')}
                required
              >
                <Autocomplete
                  {...rest}
                  value={
                    AGENCY_SIZE_OPTIONS.find(
                      (option) => option.value === value
                    ) || null
                  }
                  onChange={(_, newValue: Option | null) => {
                    onChange(newValue ? newValue.value : null)
                  }}
                  options={AGENCY_SIZE_OPTIONS}
                  getOptionLabel={(option: Option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputRef={ref}
                      error={!!errors?.agency_size}
                      helperText={errors?.agency_size?.message}
                      variant="outlined"
                      fullWidth
                      placeholder={t('Select company size')}
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                />
              </FormField>
            )}
          />
        </Box>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Button variant="text" onClick={() => handleSkip()}>
            {t('SYSCOMMON.skip')}
          </Button>
          <LoadingButton
            loading={updateSurvey.isLoading}
            variant="contained"
            color="primary"
            disabled={!isValid}
            type="submit"
          >
            {t('SYSCOMMON.next')}
          </LoadingButton>
        </Stack>
      </form>
    </>
  )
}

export default SurveyPages
