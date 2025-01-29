import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import {
  GetPostsResponse,
  GetPostsService,
  GetReelsResponse,
  GetReelsService,
} from '@services/page.services'
import {
  Automation,
  AutomationCreateResponse,
  AutomationListResponse,
  AutomationService,
  CreateAutomationInput,
  UpdateStatusInput,
} from '@services/automation.services'
import { Box, Button, List, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ConnectedPage } from '@services/auth.services'
import _ from 'lodash'
import AutomationListItem from '@components/Automation/AutomationListItem'
import CreateAutomationDialog from './CreateAutomationDialog'
import { useConfirm } from '@components/Confirm'
import { Add } from '@mui/icons-material'
import AutomationListHeader from '@components/Automation/AutomationListHeader'
import { useToast } from '@components/ToastProvider'
import DataLoading from '@components/DataLoading'
import { Identifier } from '@constants/common.constants'

const ITEMS_PER_PAGE = 100 // finish pagination there is error wrong total count

const AutomationListPage: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [page] = useState(1)
  const queryClient = useQueryClient()
  const initData = queryClient.getQueryData(['appInit'])
  const connectedPages: ConnectedPage[] = _.get(initData, 'connected_pages', [])
  const isAiActive =
    _.get(initData, 'subscription.product.identifier') ===
      Identifier.AI_PRODUCT &&
    _.get(initData, 'subscription.status') === 'active'

  const { showToast } = useToast()
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

  const { data: reels, isLoading: isLoadingReels } = useQuery<
    GetReelsResponse,
    Error
  >(
    ['reels', pageId],
    () => {
      if (!pageId) throw new Error('Page ID is required')
      return GetReelsService({ pageId, perPage: '50' })
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
        queryClient.invalidateQueries(['automations', pageId])
        // You can add a success message or redirect here
      },
      onError: () => {
        showToast(t('TOASTS.fail_automation'), { severity: 'error' })
      },
    }
  )

  const handleStatus = (v: Automation) => {
    if (pageId) {
      confirm({
        title: v.is_active
          ? t('AUTOMATION.pause_title')
          : t('AUTOMATION.resume_title'),
        description: v.is_active
          ? t('AUTOMATION.pause_desc')
          : t('AUTOMATION.resume_desc'),
        additional_confirmation: v.is_active ? 'pause' : 'resume',
      })
        .then(() => {
          updateStatusAutomationMutation.mutate({
            pageId: pageId,
            automationId: v.automation_id,
            input: {
              is_active: !v.is_active,
            },
          })
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log('Cancel')
        })
    }
  }

  const handleOpen = () => setOpen(true)

  const handleDelete = (automation: Automation) => {
    if (pageId) {
      confirm({
        title: t('AUTOMATION.delete_title'),
        description: t('AUTOMATION.delete_desc'),
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
    if (pageId) {
      createAutomationMutation.mutate(
        {
          pageId,
          input: {
            name: data.name,
            fb_page_post_id: data.fb_page_post_id,
            is_global: data.is_global === true ? true : undefined,
            post_type: data.post_type,
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
    <Box sx={{ width: '100%' }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5"> {t('SYSCOMMON.automations')}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          endIcon={<Add />}
        >
          {t('SYSCOMMON.create')}
        </Button>
      </Box>
      {<AutomationListHeader />}
      <List sx={{ p: 0 }}>
        {automationsData?.data.map((automation) => (
          <Paper
            key={automation.automation_id}
            sx={{
              overflow: 'hidden',
              boxShadow: '0 4px 8px #20222408,0 1px 2px #00000014',
              mb: 2,
            }}
          >
            <AutomationListItem
              isAiActive={isAiActive}
              data={automation}
              onEdit={() => navigate(`/automation/${automation.automation_id}`)}
              onDelete={() => handleDelete(automation)}
              onSetActive={(v) => handleStatus(v)}
            />
          </Paper>
        ))}
      </List>
      <DataLoading
        resource={t('SYSCOMMON.automation')}
        isLoading={isLoadingAutomations}
        isEmptyData={_.isEmpty(automationsData?.data)}
        emptyAction={
          <Button variant="outlined" onClick={handleOpen} endIcon={<Add />}>
            {t('SYSCOMMON.create')}
          </Button>
        }
      />

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
        isLoading={isLoadingPosts}
        isLoadingReels={isLoadingReels}
        reels={reels}
        isCreateLoading={createAutomationMutation.isLoading}
        onClose={() => setOpen(false)}
        posts={posts}
        onSubmit={handleSubmit}
      />
    </Box>
  )
}

export default AutomationListPage
