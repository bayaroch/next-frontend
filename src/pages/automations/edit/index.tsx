/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
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
import { Box, Button, List, Paper, styled, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ConnectedPage } from '@services/auth.services'
import _ from 'lodash'
import Grid from '@mui/material/Grid2'
import AutomationListItem from '@components/Automation/AutomationListItem'

const ITEMS_PER_PAGE = 10

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

const AutomationEditPage: React.FC = () => {
  const { t } = useTranslation()
  // can automation detail service using react query
  //   const queryClient = useQueryClient()
  // find id from url params using react router
  const { id } = useParams()
  const automationId = id ? id : ''
  const queryClient = useQueryClient()
  const initData = queryClient.getQueryData(['appInit'])
  const connectedPages: ConnectedPage[] = _.get(initData, 'connected_pages', [])
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

  return (
    <Box sx={{ padding: 3, width: '100%' }}>
      {JSON.stringify(automationsData)}
    </Box>
  )
}

export default AutomationEditPage
