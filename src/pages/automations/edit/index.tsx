import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import {
  Automation,
  AutomationDetailResponse,
  AutomationService,
  UpdateAutomationInput,
  UpdateStatusInput,
} from '@services/automation.services'
import {
  Box,
  Stack,
  Typography,
  Chip,
  IconButton,
  TextField,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ConnectedPage } from '@services/auth.services'
import _ from 'lodash'
import useAutomationEditForm from './useAutomationEditForm'
import { Controller, useWatch } from 'react-hook-form'
import {
  Edit,
  PauseCircleOutlineOutlined,
  PauseOutlined,
  PlayArrowOutlined,
} from '@mui/icons-material'
import ResponseCreateForm from './ResponseCreateForm'
import FormField from '@components/@material-extend/FormField'
import { ResponseField } from '@components/Automation/ResponseItem'
import { useToast } from '@components/ToastProvider'
import { useConfirm } from '@components/Confirm'
import { Identifier } from '@constants/common.constants'
import AutomationFlow from '@containers/AutomationFlow'
import { FormProvider } from '@containers/AutoationForms/FormProvider'
import GeneralInfo from '@containers/AutoationForms/GeneralInfo'
import NestedLayout from '@layouts/NestedLayout'
import { useAuth } from '@global/AuthContext'
import AiResponsesForm from '@containers/AutoationForms/AiResponsesForm'
import InstantResponseForm from '@containers/AutoationForms/InstantResponseForm'

const AutomationEditPage: React.FC = () => {
  const [isEditingName, setIsEditingName] = useState(false)
  const { init } = useAuth()
  const [open, setOpen] = useState(false)
  const [selectedResponses, setSelectedResponses] = useState<string[]>([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { t } = useTranslation()
  const [focused, setFocused] = useState<{
    active: string
    fields: ResponseField[]
  } | null>(null)

  const { id } = useParams()
  const automationId = id ? id : ''
  const queryClient = useQueryClient()
  const initData = queryClient.getQueryData(['appInit'])
  const connectedPages: ConnectedPage[] = _.get(initData, 'connected_pages', [])
  const { showToast } = useToast()
  const confirm = useConfirm()
  const { control, handleSubmit, formState, fields, reset, append, setValue } =
    useAutomationEditForm()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const { errors } = formState

  const currentGlobal = _.get(init, 'page_info.is_global_automation_exists')

  const formData = useWatch({ control })

  const { is_global, only_instant } = formData

  const isGlobal = is_global
  const instantOnly = only_instant

  const isGlobalEditable = _.isEmpty(currentGlobal)

  const isAiActive =
    _.get(initData, 'subscription.product.identifier') ===
      Identifier.AI_PRODUCT &&
    _.get(initData, 'subscription.status') === 'active'

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

  useEffect(() => {
    if (automation && automation.is_global) {
      queryClient.invalidateQueries(['appInit'])
    }
  }, [automation?.is_global])

  useEffect(() => {
    if (automationsData) {
      reset(
        {
          name: automation?.name,
          fb_page_post_id: automation?.fb_page_post_id,
          comment_responses: automation?.comment_responses,
          is_private_response: automation?.is_private_response,
          is_global: automation?.is_global,
          ignore_global: automation?.ignore_global,
          only_instant: automation?.only_instant,
          instant_response: automation?.instant_response,
        },
        { keepDirtyValues: false }
      )
    }
  }, [automationsData, reset])

  const updateAutomationMutation = useMutation(
    (input: UpdateAutomationInput) =>
      AutomationService.updateAutomation(pageId as string, automationId, input),
    {
      onSuccess: (result, variables) => {
        queryClient.setQueryData(
          ['automation_details', pageId, id],
          (old: any) => ({
            ...old,
            data: {
              ...old.data,
              automation: {
                ...old.data.automation,
                ...variables,
              },
            },
          })
        )
        setFocused(null)
      },
      onError: () => {
        showToast(t('TOASTS.fail_automation'), { severity: 'error' })
      },
    }
  )

  const isUpdating = updateAutomationMutation.isLoading

  // const isNameChange =
  //   !!dirtyFields.name && isValid && !isUpdating && !isValidating

  const onSubmit = (data: any) => {
    updateAutomationMutation.mutate(data)
  }

  const onSubmitCreate = (data: any) => {
    append(data)
    handleSubmit(onSubmit)()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEdit = (index: number, data: any) => {
    handleSubmit(onSubmit)()
    setFocused(null)
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

  const updateStatusAutomationMutation = useMutation(
    (input: UpdateStatusInput) =>
      AutomationService.updateStatus(
        input.pageId,
        input.automationId,
        input.input
      ),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['automation_details', pageId])
        // You can add a success message or redirect here
      },
      onError: () => {
        showToast(t('TOASTS.fail_automation'), { severity: 'error' })
      },
    }
  )

  const handleStatus = (data: Automation) => {
    if (pageId) {
      confirm({
        title: data.is_active
          ? t('AUTOMATION.pause_title')
          : t('AUTOMATION.resume_title'),
        description: data.is_active
          ? t('AUTOMATION.pause_desc')
          : t('AUTOMATION.resume_desc'),
        additional_confirmation: data.is_active ? 'pause' : 'resume',
      })
        .then(() => {
          updateStatusAutomationMutation.mutate({
            pageId: pageId,
            automationId: data.automation_id,
            input: {
              is_active: !data.is_active,
            },
          })
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log('Cancel')
        })
    }
  }

  if (isLoadingAutomations) {
    return <Box sx={{ padding: 3, width: '100%' }}>Loading...</Box>
  }

  if (!automationsData) {
    return <Box sx={{ padding: 3, width: '100%' }}>No data available</Box>
  }

  return (
    <>
      {automation && (
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormProvider
              value={{
                control,
                handleSubmit,
                errors,
                fields,
                reset,
                append,
                setValue,
                formState,
              }}
            >
              <NestedLayout
                isSaving={isUpdating}
                header={
                  <Stack
                    sx={{ width: '100%' }}
                    direction={'row'}
                    justifyContent={' space-between'}
                    alignItems={'center'}
                  >
                    <Box sx={{ width: { xs: 200, sm: 200, md: 200, lg: 500 } }}>
                      {isEditingName ? (
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="outlined"
                              autoFocus
                              onBlur={() => {
                                setIsEditingName(false)
                                handleSubmit(onSubmit)()
                              }}
                            />
                          )}
                        />
                      ) : (
                        <Typography
                          variant="h6"
                          noWrap
                          sx={{
                            mb: 0,
                            fontSize: 14,
                            lineHeight: 1.2,
                            cursor: 'pointer',
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{ mr: 1 }}
                            onClick={() => setIsEditingName(true)}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          {automation.name}
                        </Typography>
                      )}
                    </Box>
                    <FormField label="" helpContent={false}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{ mt: 0.5, mr: 1 }}
                        spacing={2}
                      >
                        <Chip
                          icon={
                            automation.is_active ? (
                              <PlayArrowOutlined />
                            ) : (
                              <PauseOutlined />
                            )
                          }
                          label={automation.is_active ? 'Active' : 'Paused'}
                          color={automation.is_active ? 'success' : 'default'}
                          variant="outlined"
                          size="medium"
                        />
                        <IconButton onClick={() => handleStatus(automation)}>
                          {automation.is_active ? (
                            <PauseCircleOutlineOutlined fontSize="small" />
                          ) : (
                            <PlayArrowOutlined fontSize="small" />
                          )}
                        </IconButton>
                      </Stack>
                    </FormField>
                  </Stack>
                }
                leftChildren={
                  <GeneralInfo
                    isGlobal={isGlobal}
                    automationsData={automationsData}
                    isLoading={isLoadingAutomations}
                    onSubmit={onSubmit}
                    isUpdating={isUpdating}
                    isGlobalEditable={isGlobalEditable}
                    isAiActive={isAiActive}
                  />
                }
              >
                <Box sx={{ p: 4 }}>
                  {isAiActive && !instantOnly && (
                    <>
                      <AiResponsesForm
                        isAiActive={isAiActive}
                        instantOnly={instantOnly}
                        isLoadingAutomations={isLoadingAutomations}
                        automation={automation}
                        handleOpen={handleOpen}
                        handleDeleteMultiple={handleDeleteMultiple}
                        handleEdit={handleEdit}
                        selectedResponses={selectedResponses}
                        isUpdating={isUpdating}
                        setFocused={setFocused}
                        handleCheckResponse={handleCheckResponse}
                        focused={focused}
                      />
                    </>
                  )}
                  {!isAiActive ||
                    (isAiActive && only_instant && (
                      <InstantResponseForm onSubmit={onSubmit} />
                    ))}

                  <Box
                    className="flow-container"
                    sx={{
                      background: '#eee',
                      width: '100%',
                      position: 'relative',
                      pb: 2,
                      height: 400,
                      boxShadow: 2,
                      display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'none',
                        lg: 'block',
                        xl: 'block',
                      },
                    }}
                  >
                    <AutomationFlow isAiActive={isAiActive} />
                  </Box>
                </Box>
              </NestedLayout>
            </FormProvider>
          </form>
        </Box>
      )}

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
