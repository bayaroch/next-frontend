/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import {
  AutomationDetailResponse,
  AutomationService,
  UpdateAutomationInput,
} from '@services/automation.services'
import {
  Box,
  Button,
  Card as MuiCard,
  FormLabel,
  IconButton,
  OutlinedInput,
  styled,
  Typography,
  Stack,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ConnectedPage } from '@services/auth.services'
import _ from 'lodash'
import Grid from '@mui/material/Grid2'
import useAutomationEditForm from './useAutomationEditForm'
import { FieldValues } from 'react-hook-form'
import { Delete } from '@mui/icons-material'
import useResponseCreateForm from './useResponseCreateForm'
import ResponseCreateForm from './ResponseCreateForm'
import FormField from '@components/@material-extend/FormField'
import ResponseItem from '@components/Automation/ResponseItem'

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}))

const AutomationEditPage: React.FC = () => {
  const { t } = useTranslation()
  const [focused, setFocused] = useState<string | null>(null)
  // can automation detail service using react query
  //   const queryClient = useQueryClient()
  // find id from url params using react router
  const { id } = useParams()
  const automationId = id ? id : ''
  const queryClient = useQueryClient()
  const initData = queryClient.getQueryData(['appInit'])
  const connectedPages: ConnectedPage[] = _.get(initData, 'connected_pages', [])

  const {
    control,
    handleSubmit,
    formState: { errors },
    fields,
    reset,
    Controller,
    append,
    remove,
  } = useAutomationEditForm()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // Assume you have pageId from somewhere (e.g., from URL params or context)
  const pageId = connectedPages.find(
    (p: ConnectedPage) => p.is_default_page === true
  )?.fb_page_id

  // use this service getAutomationDetail and create react query
  const { data: automationsData, isLoading: isLoadingAutomations } = useQuery<
    AutomationDetailResponse,
    Error
  >(
    ['automation_details', pageId, id],
    () => {
      if (!pageId) throw new Error('Page ID is required')
      return AutomationService.getAutomationDetail(pageId, automationId) // fix
    },
    {
      retry: 1,
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  )

  const automation = automationsData?.data.automation
  const fbDetail = automationsData?.data.fb_detail

  useEffect(() => {
    if (automationsData) {
      reset({
        name: automation?.name,
        fb_page_post_id: automation?.fb_page_post_id,
        comment_responses: automation?.comment_responses,
      })
    }
  }, [automationsData, reset])

  const updateAutomationMutation = useMutation(
    (input: UpdateAutomationInput) =>
      AutomationService.updateAutomation(pageId as string, automationId, input),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['automation_details', pageId, id])
        // You can add a success message or redirect here
        alert('Automation updated successfully')
      },
      onError: (error) => {
        // Handle any errors here
        console.error('Error updating automation:', error)
        alert('Error updating automation')
      },
    }
  )

  const onSubmit = (data: any) => {
    updateAutomationMutation.mutate(data)
  }
  const onSubmitCreate = (data: any) => {
    append(data)
    handleSubmit(onSubmit)()
  }
  const handleRemove = (index: number) => {
    remove(index)
  }

  const handleEdit = (data: any) => {
    handleSubmit(onSubmit)()
  }

  // eslint-disable-next-line no-console
  console.log('FOCUSED', focused)

  return (
    <Box sx={{ padding: 3, width: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Controller
            name="name"
            control={control}
            render={({ field: { ref, ...rest } }: FieldValues) => (
              <FormGrid size={{ xs: 12, md: 12 }} sx={{ mb: 2 }}>
                <FormField
                  errors={errors?.name && errors.name.message}
                  label={t('AUTOMATION.name')}
                  desc="asdadasds sadasda"
                  helpContent="asdasdasd asdasd asda sadsadasdasdas"
                  required
                >
                  <OutlinedInput
                    {...rest}
                    error={!!errors?.name}
                    inputRef={ref}
                    placeholder={t('AUTOMATION.name')}
                    autoComplete={t('AUTOMATION.name')}
                    required
                  />
                </FormField>
              </FormGrid>
            )}
          />

          <Controller
            name="fb_page_post_id"
            control={control}
            render={({ field: { ref, ...rest } }: FieldValues) => (
              <FormGrid size={{ xs: 12, md: 12 }} sx={{ mb: 2 }}>
                <FormLabel htmlFor="fb_page_post_id" required>
                  {t('AUTOMATION.post')}
                </FormLabel>
                <OutlinedInput
                  {...rest}
                  error={!!errors?.fb_page_post_id}
                  disabled
                  inputRef={ref}
                  placeholder={t('AUTOMATION.post')}
                  required
                />
                <FormLabel sx={{ fontSize: 11, mb: 0, pt: 0.5 }} error>
                  {errors?.fb_page_post_id && errors.fb_page_post_id.message}
                </FormLabel>
              </FormGrid>
            )}
          />

          <Typography variant="h6">
            {t('AUTOMATION.comment_responses')}
          </Typography>
          {fields.map((field, index) => {
            const isActive = focused === field.id
            return isActive ? (
              <Card key={field.id} sx={{ position: 'relative' }}>
                <Grid sx={{ width: '100%' }} spacing={2} container>
                  <Controller
                    name={`comment_responses.${index}.keyword`}
                    control={control}
                    render={({ field: { ref, ...rest } }: FieldValues) => (
                      <FormGrid size={{ md: 3, xs: 12 }}>
                        <FormLabel htmlFor={`keyword-${index}`} required>
                          {t('AUTOMATION.keyword')}
                        </FormLabel>
                        <OutlinedInput
                          {...rest}
                          fullWidth
                          error={!!errors?.comment_responses?.[index]?.keyword}
                          inputRef={ref}
                          placeholder={t('AUTOMATION.keyword')}
                          required
                        />
                        <FormLabel sx={{ fontSize: 11, mb: 0, pt: 0.5 }} error>
                          {errors?.comment_responses?.[index]?.keyword?.message}
                        </FormLabel>
                      </FormGrid>
                    )}
                  />

                  <Controller
                    name={`comment_responses.${index}.content`}
                    control={control}
                    render={({ field: { ref, ...rest } }: FieldValues) => (
                      <FormGrid size={{ md: 9, xs: 12 }}>
                        <Box sx={{ pr: '30px' }}>
                          <FormLabel htmlFor={`content-${index}`} required>
                            {t('AUTOMATION.content')}
                          </FormLabel>
                          <OutlinedInput
                            {...rest}
                            multiline
                            minRows={2}
                            fullWidth
                            error={
                              !!errors?.comment_responses?.[index]?.content
                            }
                            inputRef={ref}
                            placeholder={t('AUTOMATION.content')}
                            required
                          />
                          <FormLabel
                            sx={{ fontSize: 11, mb: 0, pt: 0.5 }}
                            error
                          >
                            {
                              errors?.comment_responses?.[index]?.content
                                ?.message
                            }
                          </FormLabel>
                        </Box>
                      </FormGrid>
                    )}
                  />
                </Grid>
                <Stack>
                  <Button
                    onClick={() => {
                      setFocused(null)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => handleEdit(field)}>Save</Button>
                </Stack>
              </Card>
            ) : (
              <ResponseItem
                key={field.id}
                onDelete={() => handleRemove(index)}
                onEdit={(v) => setFocused(v.id)}
                response={field}
              />
            )
          })}
        </Grid>
      </form>
      <ResponseCreateForm responses={fields} onSubmit={onSubmitCreate} />
    </Box>
  )
}

export default AutomationEditPage
