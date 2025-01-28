/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Controller, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  OutlinedInput,
  CircularProgress,
  Chip,
  Box,
  FormControlLabel,
  Divider,
} from '@mui/material'
import FormField from '@components/@material-extend/FormField'
import AutomationPostItem from '@components/Automation/AutomationPostItem'
import { AutomationDetailResponse } from '@services/automation.services'
import { useFormContext } from './FormProvider'
import { IOSSwitch } from '@components/@material-extend/IOSSwitch'

interface AutomationFormType extends FieldValues {
  name: string
  fb_page_post_id: string
  is_active: boolean
  is_global: boolean

  // Add other fields as needed
}

interface GeneralInfoProps {
  onSubmit: (v: AutomationFormType) => void
  automationsData: AutomationDetailResponse | undefined
  isLoading: boolean
  isUpdating: boolean
  isGlobalEditable?: boolean
  isAiActive?: boolean
  isGlobal?: boolean
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({
  onSubmit,
  isLoading: isLoadingAutomations,
  automationsData,
  isGlobalEditable,
  isAiActive,
  isGlobal,
  isUpdating,
}) => {
  const {
    control,
    formState: { errors, dirtyFields, isDirty, isValid },
    handleSubmit,
  } = useFormContext<AutomationFormType>()
  const { t } = useTranslation()

  const automation = automationsData?.data.automation
  const fbDetail = automationsData?.data.fb_detail

  if (isLoadingAutomations) {
    return <CircularProgress />
  }

  return (
    <Box sx={{ pt: 0 }}>
      <Box
        sx={{
          height: 52,
          p: 1,
          pl: 2,
          display: 'flex',
          alignItems: 'center',
          background: (theme) => theme.palette.primary.main,
          color: '#fff',
        }}
      >
        {t('PRODUCT.additional_settings')}
      </Box>
      <Box sx={{ p: { xs: 1, md: 2 } }}>
        {automation?.is_global ? (
          <Chip color="primary" label={t('AUTOMATION.global_automation')} />
        ) : (
          <Controller
            name="fb_page_post_id"
            control={control}
            render={({ field }) => (
              <>
                <FormField
                  fullWidth
                  hidden
                  errors={errors.fb_page_post_id?.message}
                  label={t('AUTOMATION.post')}
                  desc={t('FORM_DESC.automation_post')}
                  required
                >
                  <OutlinedInput
                    {...field}
                    hidden
                    error={!!errors.fb_page_post_id}
                    disabled
                    fullWidth
                    sx={{ display: 'none' }}
                    placeholder={t('AUTOMATION.post')}
                    required
                  />
                </FormField>
                {fbDetail && <AutomationPostItem data={fbDetail} />}
              </>
            )}
          />
        )}
        <Divider sx={{ mb: 1 }} />
        <Box
          sx={{
            width: '100%',
            mb: 2,
            display: isGlobalEditable ? 'block' : 'none',
          }}
        >
          <Controller
            name="is_global"
            control={control}
            render={({ field }: FieldValues) => (
              <FormField
                fullWidth
                disabled={!isGlobalEditable}
                showTyping={false}
                onBlur={() => handleSubmit(onSubmit)()}
                errors={errors?.is_global && errors.is_global.message}
                label={t('AUTOMATION.is_global')}
                desc={t('FORM_DESC.is_global')}
                required
              >
                <Box sx={{ ml: 1 }}>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        checked={field.value === true}
                        onChange={(e) =>
                          field.onChange(e.target.checked ? true : false)
                        }
                      />
                    }
                    label={field.value ? t('SYSCOMMON.yes') : t('SYSCOMMON.no')}
                  />
                </Box>
              </FormField>
            )}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            mb: 2,
            display: !isGlobal && isAiActive ? 'block' : 'none',
          }}
        >
          <Controller
            name="ignore_global"
            control={control}
            render={({ field }: FieldValues) => (
              <FormField
                fullWidth
                onBlur={() => handleSubmit(onSubmit)()}
                hidden={!isGlobalEditable}
                showTyping={false}
                errors={errors?.is_global && errors.is_global.message}
                label={t('AUTOMATION.ignore_global')}
                desc={t('FORM_DESC.ignore_global')}
                required
              >
                <Box sx={{ ml: 1 }}>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        checked={field.value === true}
                        onChange={(e) =>
                          field.onChange(e.target.checked ? true : false)
                        }
                      />
                    }
                    label={field.value ? t('SYSCOMMON.yes') : t('SYSCOMMON.no')}
                  />
                </Box>
              </FormField>
            )}
          />
        </Box>

        <Box
          sx={{
            width: '100%',
            mb: 2,
            display: isAiActive ? 'block' : 'none',
          }}
        >
          <Controller
            name="only_instant"
            control={control}
            render={({ field }: FieldValues) => (
              <FormField
                fullWidth
                hidden={!isGlobalEditable}
                showTyping={false}
                errors={errors?.is_global && errors.is_global.message}
                label={t('AUTOMATION.only_instant')}
                desc={t('FORM_DESC.only_instant')}
                onBlur={() => handleSubmit(onSubmit)()}
                required
              >
                <Box sx={{ ml: 1 }}>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        checked={field.value === true}
                        onChange={(e) =>
                          field.onChange(e.target.checked ? true : false)
                        }
                      />
                    }
                    label={field.value ? t('SYSCOMMON.yes') : t('SYSCOMMON.no')}
                  />
                </Box>
              </FormField>
            )}
          />
        </Box>

        <Box
          sx={{
            width: '100%',
            mb: 2,
          }}
        >
          <Controller
            name="is_private_response"
            control={control}
            render={({ field }: FieldValues) => (
              <FormField
                fullWidth
                hidden={!isGlobalEditable}
                showTyping={false}
                errors={errors?.is_global && errors.is_global.message}
                label={t('AUTOMATION.is_private_response')}
                desc={t('AUTOMATION.is_private_response_desc')}
                onBlur={() => handleSubmit(onSubmit)()}
                required
              >
                <Box sx={{ ml: 1 }}>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        checked={field.value === true}
                        onChange={(e) =>
                          field.onChange(e.target.checked ? true : false)
                        }
                      />
                    }
                    label={field.value ? t('SYSCOMMON.yes') : t('SYSCOMMON.no')}
                  />
                </Box>
              </FormField>
            )}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default GeneralInfo
