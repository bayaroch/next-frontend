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
  Automation,
  AutomationCreateResponse,
  AutomationDetailResponse,
  AutomationListResponse,
  AutomationService,
  CreateAutomationInput,
} from '@services/automation.services'
import { Box, Button, List, Paper, styled, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ConnectedPage } from '@services/auth.services'
import _ from 'lodash'
import Grid from '@mui/material/Grid2'
import AutomationListItem from '@components/Automation/AutomationListItem'
import CreateAutomationDialog from './CreateAutomationDialog'
import { useConfirm } from '@components/Confirm'

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

  const confirm = useConfirm()

  const navigate = useNavigate()

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
      return GetPostsService({ pageId, perPage: '50' })
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
    AutomationCreateResponse,
    Error,
    { pageId: string; input: CreateAutomationInput }
  >(({ pageId, input }) => AutomationService.createAutomation(pageId, input), {
    onSuccess: () => {
      queryClient.invalidateQueries(['automations', pageId])
    },
  })

  const handleClose = () => setOpen(false)

  const handleOpen = () => setOpen(true)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  const handleDelete = (automation: Automation) => {
    if (pageId) {
      confirm({
        title: t('AUTOMATION.delete_title'),
        description: t('AAUTOMATION.delete_desc'),
        additional_confirmation: 'delete',
      })
        .then(() => {
          AutomationService.deleteAutomation(
            pageId,
            automation.automation_id
          ).then(() => {
            queryClient.invalidateQueries(['automations', pageId])
          })
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log('Cancel')
        })
    }
  }

  const handleSubmit = (data: any) => {
    if (pageId && data.fb_page_post_id) {
      createAutomationMutation.mutate(
        {
          pageId,
          input: {
            name: data.name,
            fb_page_post_id: data.fb_page_post_id,
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
              onEdit={() => navigate(`/automation/${automation.automation_id}`)}
              onDelete={() => handleDelete(automation)}
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

      <CreateAutomationDialog
        open={open}
        onClose={() => setOpen(false)}
        posts={posts}
        onSubmit={handleSubmit}
      />
    </Box>
  )
}

export default AutomationListPage
