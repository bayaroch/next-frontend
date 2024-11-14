/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import {
  GetPostsResponse,
  GetPostsService,
  Post,
} from '@services/page.services'
import {
  AutomationDetailResponse,
  AutomationListResponse,
  AutomationService,
  CreateAutomationInput,
} from '@services/automation.services'
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
  Paper,
  styled,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ConnectedPage } from '@services/auth.services'
import _ from 'lodash'
import useAutomationCreateForm from './useAutomationCreateForm'
import Grid from '@mui/material/Grid2'
import { FieldValues } from 'react-hook-form'
import moment from 'moment'
import AutomationListItem from '@components/Automation/AutomationListItem'

const ITEMS_PER_PAGE = 10

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

const AutomationListPage: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [automationName, setAutomationName] = useState<string>('')
  const [selectedPostId, setSelectedPostId] = useState<string>('')
  const queryClient = useQueryClient()
  const initData = queryClient.getQueryData(['appInit'])
  const connectedPages: ConnectedPage[] = _.get(initData, 'connected_pages', [])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation()

  const navigate = useNavigate()

  const { Controller, methods } = useAutomationCreateForm()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = methods

  // Assume you have pageId from somewhere (e.g., from URL params or context)
  const pageId = connectedPages.find(
    (p: ConnectedPage) => p.is_default_page === true
  )?.fb_page_id

  const { data: automationsData, isLoading: isLoadingAutomations } = useQuery<
    AutomationListResponse,
    Error
  >(
    ['automations', pageId, page],
    () => {
      if (!pageId) throw new Error('Page ID is required')
      return AutomationService.getAutomationsByPage(pageId, ITEMS_PER_PAGE)
    },
    {
      retry: 1,
      enabled: !!pageId,
      refetchOnWindowFocus: false,
    }
  )

  const { data: posts, isLoading: isLoadingPosts } = useQuery<
    GetPostsResponse,
    Error
  >(
    ['posts', pageId],
    () => {
      if (!pageId) throw new Error('Page ID is required')
      return GetPostsService({ pageId, perPage: '10' })
    },
    {
      retry: 1,
      refetchOnWindowFocus: false,
      enabled: open,
      onError: (error) => {
        console.error('Error fetching posts:', error)
        // Handle the error appropriately
      },
    }
  )

  const createAutomationMutation = useMutation<
    AutomationDetailResponse,
    Error,
    { pageId: string; input: CreateAutomationInput }
  >(({ pageId, input }) => AutomationService.createAutomation(pageId, input), {
    onSuccess: () => {
      queryClient.invalidateQueries(['automations', pageId])
    },
  })

  const handleCreate = () => {
    if (automationName && selectedPostId && pageId) {
      createAutomationMutation.mutate(
        {
          pageId,
          input: {
            name: automationName,
            fb_page_post_id: selectedPostId,
          },
        },
        {
          onSuccess: (data) => {
            navigate(`/automation/${data.data.automation_id}`)
          },
        }
      )
    }
  }

  const handleClose = () => setOpen(false)

  const handleOpen = () => setOpen(true)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    console.log(data, pageId, data.fb_page_post_id)
    alert('aa')
    if (pageId && data.fb_page_post_id) {
      createAutomationMutation.mutate(
        {
          pageId,
          input: {
            name: data.name,
            fb_page_post_id: data.fb_page_post_id?.id,
          },
        },
        {
          onSuccess: (data) => {
            navigate(`/automation/${data.data.automation_id}`)
          },
        }
      )
    }
  }

  return (
    <Box sx={{ padding: 3, width: '100%' }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Automations</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create Automation
        </Button>
      </Box>
      <Paper elevation={2} sx={{ overflow: 'hidden' }}>
        <List sx={{ p: 0 }}>
          {automationsData?.data.map((automation) => (
            <AutomationListItem
              key={automation.automation_id}
              data={automation}
              onEdit={() => null}
              onDelete={() => null}
            />
          ))}
        </List>
      </Paper>

      {/* <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(
            (automationsData?.meta.total_count || 0) / ITEMS_PER_PAGE
          )}
          page={page}
          onChange={handlePageChange}
        />
      </Box> */}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Create Automation</DialogTitle>
          <DialogContent>
            <Controller
              name="name"
              control={control}
              render={({ field: { ref, ...rest } }: FieldValues) => (
                <FormGrid size={{ xs: 12, md: 12 }} sx={{ mb: 2 }}>
                  <FormLabel htmlFor="first-name" required>
                    Automation Name:
                  </FormLabel>
                  <OutlinedInput
                    {...rest}
                    error={!!errors?.name}
                    inputRef={ref}
                    placeholder="Give name"
                    autoComplete="Automation name"
                    required
                  />
                </FormGrid>
              )}
            />

            <Controller
              name="fb_page_post_id"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={posts?.data || []}
                  getOptionLabel={(option: Post) =>
                    option.message || 'No message'
                  }
                  renderInput={(params) => (
                    <FormControl fullWidth variant="outlined">
                      <FormLabel htmlFor="fb_page_post_id" required>
                        Choose Post:
                      </FormLabel>
                      <OutlinedInput
                        {...params.InputProps}
                        error={!!errors?.fb_page_post_id}
                        id="fb_page_post_id"
                        size="medium"
                        inputProps={{
                          ...params.inputProps,
                          placeholder: 'Select a post',
                        }}
                      />
                    </FormControl>
                  )}
                  onChange={(_, newValue) => {
                    onChange(newValue)
                  }}
                  value={value as any}
                  renderOption={(props, option) => (
                    <ListItem {...props} key={option.id}>
                      <ListItemAvatar sx={{ mr: 1 }}>
                        <Box
                          sx={{ width: 100, height: 40, background: '#eee' }}
                        >
                          {option.full_picture && (
                            <Box
                              component="img"
                              sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                              loading="lazy"
                              src={option.full_picture}
                            />
                          )}
                        </Box>
                      </ListItemAvatar>
                      <ListItemText
                        primary={option.message || 'No message'}
                        primaryTypographyProps={{ noWrap: true }}
                        secondary={moment(option.created_time).format(
                          'YYYY-MM-DD'
                        )}
                      />
                    </ListItem>
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value?.id
                  }
                  loading={isLoadingPosts}
                  loadingText="Loading posts..."
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleCreate}
              variant="contained"
              color="secondary"
              type="submit"
              disabled={!isValid}
            >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}

export default AutomationListPage
