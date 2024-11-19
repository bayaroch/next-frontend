import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Card,
  FormLabel,
  OutlinedInput,
  Box,
  styled,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { FieldValues } from 'react-hook-form'
import useResponseCreateForm from './useResponseCreateForm'
import { CommentResponse } from '@services/automation.services'

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

interface CreateFormProps {
  responses: CommentResponse[]
  onSubmit: (data: CommentResponse) => void
}

const ResponseCreateForm: React.FC<CreateFormProps> = ({
  responses,
  onSubmit,
}) => {
  const { t } = useTranslation()
  const { Controller, methods } = useResponseCreateForm(responses)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = methods

  return (
    <form id="create-form" onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ position: 'relative', overflow: 'inherit', mb: 2 }}>
        <Grid sx={{ width: '100%' }} spacing={2} container>
          <Controller
            name="keyword"
            control={control}
            render={({ field: { ref, ...rest } }: FieldValues) => (
              <FormGrid size={{ md: 3, xs: 12 }}>
                <FormLabel htmlFor="keyword" required>
                  {t('AUTOMATION.keyword')}
                </FormLabel>
                <OutlinedInput
                  {...rest}
                  fullWidth
                  error={!!errors?.keyword}
                  inputRef={ref}
                  placeholder={t('AUTOMATION.keyword')}
                  required
                />
                <FormLabel sx={{ fontSize: 11, mb: 0, pt: 0.5 }} error>
                  {errors?.keyword?.message}
                </FormLabel>
              </FormGrid>
            )}
          />

          <Controller
            name="content"
            control={control}
            render={({ field: { ref, ...rest } }: FieldValues) => (
              <FormGrid size={{ md: 9, xs: 12 }}>
                <Box sx={{ pr: '30px' }}>
                  <FormLabel htmlFor="content" required>
                    {t('AUTOMATION.content')}
                  </FormLabel>
                  <OutlinedInput
                    {...rest}
                    multiline
                    minRows={2}
                    fullWidth
                    error={!!errors?.content}
                    inputRef={ref}
                    placeholder={t('AUTOMATION.content')}
                    required
                  />
                  <FormLabel sx={{ fontSize: 11, mb: 0, pt: 0.5 }} error>
                    {errors?.content?.message}
                  </FormLabel>
                </Box>
              </FormGrid>
            )}
          />
        </Grid>
      </Card>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isValid}
      >
        {t('AUTOMATION.add_response')}
      </Button>
    </form>
  )
}

export default ResponseCreateForm
