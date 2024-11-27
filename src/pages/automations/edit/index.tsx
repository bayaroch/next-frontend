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
  OutlinedInput,
  styled,
  Typography,
  Stack,
  TextField,
  Paper,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ConnectedPage } from '@services/auth.services'
import _ from 'lodash'
import Grid from '@mui/material/Grid2'
import useAutomationEditForm from './useAutomationEditForm'
import { FieldValues } from 'react-hook-form'
import { Add, Delete } from '@mui/icons-material'
import ResponseCreateForm from './ResponseCreateForm'
import FormField from '@components/@material-extend/FormField'
import ResponseItem, {
  ResponseField,
} from '@components/Automation/ResponseItem'
import { LoadingButton } from '@mui/lab'
import { useToast } from '@components/ToastProvider'
import AutomationPostItem from '@components/Automation/AutomationPostItem'
import { useConfirm } from '@components/Confirm'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(1),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}))

const AutomationEditPage: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [selectedResponses, setSelectedResponses] = useState<string[]>([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { t } = useTranslation()
  const [focused, setFocused] = useState<{
    active: string
    fields: ResponseField[]
  } | null>(null)
  // can automation detail service using react query
  //   const queryClient = useQueryClient()
  // find id from url params using react router
  const { id } = useParams()
  const automationId = id ? id : ''
  const queryClient = useQueryClient()
  const initData = queryClient.getQueryData(['appInit'])
  const connectedPages: ConnectedPage[] = _.get(initData, 'connected_pages', [])
  const { showToast } = useToast()
  const confirm = useConfirm()
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    fields,
    reset,
    Controller,
    append,
    setValue,
    // remove,
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
      reset(
        {
          name: automation?.name,
          fb_page_post_id: automation?.fb_page_post_id,
          comment_responses: automation?.comment_responses,
        },
        { keepDirtyValues: false }
      )
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
        setFocused(null)
        showToast(t('TOASTS.success_automation'), { severity: 'success' })
      },
      onError: () => {
        showToast(t('TOASTS.fail_automation'), { severity: 'error' })
      },
    }
  )

  const isUpdating =
    updateAutomationMutation.isLoading && !updateAutomationMutation.isSuccess

  // const isNameChange =
  //   !!dirtyFields.name && isValid && !isUpdating && !isValidating

  const onSubmit = (data: any) => {
    updateAutomationMutation.mutate(data)
  }
  const onSubmitCreate = (data: any) => {
    append(data)
    handleSubmit(onSubmit)()
  }

  useEffect(() => {
    if (dirtyFields.name && isValid && !errors?.name) {
      handleSubmit(onSubmit)()
    }
  }, [dirtyFields.name, isValid, errors?.name])
  // const handleRemove = (index: number) => {
  //   confirm({
  //     title: t('SYSCOMMON.delete_title'),
  //     description: t('SYSCOMMON.delete_desc'),
  //     additional_confirmation: 'delete',
  //   })
  //     .then(() => {
  //       remove(index)
  //       handleSubmit(onSubmit)()
  //     })
  //     .catch(() => {
  //       // eslint-disable-next-line no-console
  //       console.log('Cancel')
  //     })
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEdit = (index: number, data: any) => {
    handleSubmit(onSubmit)()
  }

  const handleCheckResponse = (field: ResponseField) => {
    setSelectedResponses((prev) =>
      prev.includes(field.keyword)
        ? prev.filter((keyword) => keyword !== field.keyword)
        : [...prev, field.keyword]
    )
  }

  const handleDeleteMultiple = () => {
    confirm({
      title: t('SYSCOMMON.delete_title'),
      description: t('SYSCOMMON.delete_desc'),
      additional_confirmation: 'delete',
    })
      .then(() => {
        const newFields = fields.filter(
          (field) => !selectedResponses.includes(field.keyword)
        )
        setValue('comment_responses', newFields, { shouldValidate: true })
        setSelectedResponses([])
        handleSubmit(onSubmit)()
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('Cancel')
      })
  }

  if (isLoadingAutomations) {
    return <Box sx={{ padding: 3, width: '100%' }}>Loading...</Box>
  }

  if (!automationsData) {
    return <Box sx={{ padding: 3, width: '100%' }}>No data available</Box>
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component={Paper}
          elevation={2}
          sx={{ padding: 2, width: '100%', background: '#fff', mb: 4 }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field: { ref, ...rest } }: FieldValues) => (
              <FormField
                sx={{ mb: 2 }}
                fullWidth
                errors={errors?.name && errors.name.message}
                label={t('AUTOMATION.name')}
                desc={t('FORM_DESC.automation_name')}
                required
              >
                <OutlinedInput
                  {...rest}
                  fullWidth
                  error={!!errors?.name}
                  inputRef={ref}
                  placeholder={t('AUTOMATION.name')}
                  autoComplete={t('AUTOMATION.name')}
                  onBlur={() => {
                    if (dirtyFields.name && isValid && !errors?.name) {
                      handleSubmit(onSubmit)()
                    }
                  }}
                  required
                />
              </FormField>
            )}
          />

          <Controller
            name="fb_page_post_id"
            control={control}
            render={({ field: { ref, ...rest } }: FieldValues) => (
              <>
                <FormField
                  fullWidth
                  hidden
                  errors={
                    errors?.fb_page_post_id && errors.fb_page_post_id.message
                  }
                  label={t('AUTOMATION.post')}
                  desc={t('FORM_DESC.automation_post')}
                  required
                >
                  <OutlinedInput
                    {...rest}
                    hidden
                    error={!!errors?.fb_page_post_id}
                    disabled
                    fullWidth
                    sx={{ display: 'none' }}
                    inputRef={ref}
                    placeholder={t('AUTOMATION.post')}
                    required
                  />
                </FormField>
                {fbDetail && <AutomationPostItem data={fbDetail} />}
              </>
            )}
          />
        </Box>
        <Stack
          direction={'row'}
          width={'100%'}
          mb={2}
          justifyContent={'space-between'}
        >
          <Typography variant="h6">
            {t('AUTOMATION.comment_responses')}
          </Typography>
          <Stack direction="row" spacing={2}>
            {selectedResponses.length > 0 && (
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={handleDeleteMultiple}
                startIcon={<Delete />}
              >
                {t('SYSCOMMON.delete')} ({selectedResponses.length})
              </Button>
            )}
            <Button
              variant="contained"
              size="small"
              color={'primary'}
              onClick={handleOpen}
              endIcon={<Add />}
            >
              {t('SYSCOMMON.add')}
            </Button>
          </Stack>
        </Stack>
        {_.orderBy(fields, ['keyword'], ['asc']).map((field, index) => {
          const isActive = focused?.active === field.id
          return isActive ? (
            <Card key={field.id} sx={{ position: 'relative', mb: 1 }}>
              <Box sx={{ width: '100%' }}>
                <Grid sx={{ width: '100%' }} spacing={2} container>
                  <Controller
                    name={`comment_responses.${index}.keyword`}
                    control={control}
                    render={({ field: { ref, ...rest } }: FieldValues) => (
                      <FormField
                        label={t('AUTOMATION.keyword')}
                        required
                        helpContent={t('AUTOMATION.keyword_help')}
                        fullWidth
                        errors={
                          errors?.comment_responses?.[index]?.keyword?.message
                        }
                      >
                        <OutlinedInput
                          {...rest}
                          fullWidth
                          error={!!errors?.comment_responses?.[index]?.keyword}
                          inputRef={ref}
                          placeholder={t('AUTOMATION.keyword')}
                          required
                        />
                      </FormField>
                    )}
                  />

                  <Controller
                    name={`comment_responses.${index}.content`}
                    control={control}
                    render={({ field: { ref, ...rest } }: FieldValues) => (
                      <FormField
                        label={t('AUTOMATION.content')}
                        fullWidth
                        required
                        helpContent={t('AUTOMATION.content_help')}
                        errors={
                          errors?.comment_responses?.[index]?.content?.message
                        }
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
                </Grid>
                <Stack
                  direction={'row'}
                  spacing={2}
                  mt={1}
                  sx={{ width: '100%', justifyContent: 'flex-end' }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setValue('comment_responses', focused.fields, {
                        shouldValidate: true,
                      })
                      setFocused(null)
                    }}
                  >
                    {t('SYSCOMMON.cancel')}
                  </Button>
                  <LoadingButton
                    loading={isUpdating}
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEdit(index, field)}
                  >
                    {t('SYSCOMMON.save')}
                  </LoadingButton>
                </Stack>
              </Box>
            </Card>
          ) : (
            <ResponseItem
              isChecked={selectedResponses.includes(field.keyword)}
              onCheck={handleCheckResponse}
              key={field.id}
              onEdit={() => {
                setFocused({ active: field.id, fields: fields })
              }}
              response={field}
            />
          )
        })}
      </form>

      <ResponseCreateForm
        responses={fields}
        isLoading={isUpdating}
        onSubmit={onSubmitCreate}
        open={open}
        onClose={handleClose}
      />
    </>
  )
}

export default AutomationEditPage
