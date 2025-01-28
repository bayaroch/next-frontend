import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Card, Stack, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import FormField from '@components/@material-extend/FormField'
import { useFormContext } from './FormProvider'

interface InstantResponseFormProps {
  onSubmit: (v: any) => void
}

const InstantResponseForm: React.FC<InstantResponseFormProps> = ({
  onSubmit,
}) => {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useFormContext<{
    instant_response: {
      content: string
      chat: string
    }
  }>()

  return (
    <>
      <Stack
        direction={'row'}
        width={'100%'}
        mb={2}
        justifyContent={'space-between'}
      >
        <Box>
          <Typography variant="h6">
            {t('AUTOMATION.instant_response')}
          </Typography>
        </Box>
      </Stack>
      <Card
        sx={{
          boxShadow: 2,
          position: 'relative',
          mb: 1,
          p: 2,
          background: '#fff',
        }}
      >
        <Controller
          name="instant_response.content"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <FormField
              label={t('AUTOMATION.content')}
              fullWidth
              required
              onBlur={() => handleSubmit(onSubmit)()}
              errors={errors.instant_response?.content?.message}
            >
              <TextField
                {...rest}
                multiline
                fullWidth
                variant="outlined"
                inputRef={ref}
                minRows={3}
                placeholder={t('AUTOMATION.content')}
                slotProps={{
                  input: {
                    sx: {
                      padding: '8px',
                      height: '100%',
                      overflow: 'auto',
                      maxHeight: '80px',
                    },
                  },
                }}
              />
            </FormField>
          )}
        />

        <Controller
          name="instant_response.chat"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <FormField
              label={t('AUTOMATION.chat')}
              sx={{ mt: 1 }}
              fullWidth
              onBlur={() => handleSubmit(onSubmit)()}
              required
              helpContent={t('AUTOMATION.chat_help')}
              errors={errors.instant_response?.chat?.message}
            >
              <TextField
                {...rest}
                multiline
                fullWidth
                variant="outlined"
                inputRef={ref}
                minRows={3}
                placeholder={t('AUTOMATION.chat')}
                slotProps={{
                  input: {
                    sx: {
                      padding: '8px',
                      height: '100%',
                      overflow: 'auto',
                      maxHeight: '80px',
                    },
                  },
                }}
              />
            </FormField>
          )}
        />
      </Card>
    </>
  )
}

export default InstantResponseForm
