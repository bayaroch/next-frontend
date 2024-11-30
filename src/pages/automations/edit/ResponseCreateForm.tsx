import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
} from '@mui/material'

import { FieldValues } from 'react-hook-form'
import useResponseCreateForm from './useResponseCreateForm'
import { CommentResponse } from '@services/automation.services'
import FormField from '@components/@material-extend/FormField'
import { LoadingButton } from '@mui/lab'

interface CreateFormProps {
  responses: CommentResponse[]
  onSubmit: (data: CommentResponse) => void
  open: boolean
  onClose: () => void
  isLoading?: boolean
}

const ResponseCreateForm: React.FC<CreateFormProps> = ({
  responses,
  onSubmit,
  open,
  onClose,
  isLoading,
}) => {
  const { t } = useTranslation()
  const { Controller, methods } = useResponseCreateForm(responses)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = methods

  useEffect(() => {
    if (!open) {
      reset({
        keyword: '',
        content: '',
      })
    }
  }, [open])

  const handleFormSubmit = (data: CommentResponse) => {
    onSubmit(data)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('AUTOMATION.create_response')}</DialogTitle>
      <form id="create-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ width: '100%' }}>
            <Controller
              name="keyword"
              control={control}
              render={({ field: { ref, ...rest } }: FieldValues) => (
                <FormField
                  sx={{ mb: 2 }}
                  helpContent={t('AUTOMATION.keyword_help')}
                  fullWidth
                  errors={errors?.keyword?.message}
                  label={t('AUTOMATION.keyword')}
                  required
                >
                  <OutlinedInput
                    {...rest}
                    fullWidth
                    error={!!errors?.keyword}
                    inputRef={ref}
                    placeholder={t('AUTOMATION.keyword')}
                  />
                </FormField>
              )}
            />
            <Controller
              name="content"
              control={control}
              render={({ field: { ref, ...rest } }: FieldValues) => (
                <FormField
                  fullWidth
                  formLabelProps={{ sx: { pb: 0.3 } }}
                  helpContent={t('AUTOMATION.content_help')}
                  label={t('AUTOMATION.content')}
                  required
                  errors={errors?.content?.message}
                >
                  <TextField
                    {...rest}
                    multiline
                    fullWidth
                    variant="outlined"
                    inputRef={ref}
                    minRows={4}
                    placeholder={t('AUTOMATION.content')}
                    slotProps={{
                      input: {
                        sx: {
                          padding: '8px',
                          height: '100%',
                          overflow: 'auto',
                          maxHeight: '100px',
                        },
                      },
                    }}
                  />
                </FormField>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t('SYSCOMMON.cancel')}</Button>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoading}
            disabled={!isValid}
          >
            {t('AUTOMATION.add_response')}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ResponseCreateForm
