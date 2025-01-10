import { URI } from '@constants/uri.constants'
import { api } from './api'
import { Post } from './page.services'

export interface CommentResponse {
  keyword: string
  content: string
  chat?: string
  attachment?: string | null
}

export interface Automation {
  page_id: string
  sort_key: string
  automation_id: string
  user_id: string
  fb_page_post_id: string
  name: string
  comment_responses: CommentResponse[]
  updated_at: string
  created_at: string
  is_active: boolean
  is_private_response?: boolean
}

export interface CreateAutomationInput {
  name: string
  fb_page_post_id: string
  is_private_response?: boolean
  comment_responses?: CommentResponse[]
}

export interface UpdateAutomationInput {
  name?: string
  fb_page_post_id?: string
  is_private_response?: boolean
  comment_responses?: CommentResponse[]
}

export interface AutomationListResponse {
  data: Automation[]
  meta: {
    last_key: string | null
    total_count: number
  }
}

export interface AutomationDetailResponse {
  data: { automation: Automation; fb_detail: Post }
}

export interface AutomationCreateResponse {
  data: Automation
}

export interface UpdateStatusInput {
  pageId: string
  automationId: string
  input: {
    is_active: boolean
  }
}

export const AutomationService = {
  getAutomationsByPage: async (
    pageId: string,
    limit: number = 10,
    lastKey?: string
  ): Promise<AutomationListResponse> => {
    const { data } = await api.get<AutomationListResponse>(
      `${URI.PAGE}/${pageId}/${URI.AUTOMATIONS}`,
      {
        params: { limit, lastKey },
      }
    )
    return data
  },

  createAutomation: async (
    pageId: string,
    input: CreateAutomationInput
  ): Promise<AutomationCreateResponse> => {
    const { data } = await api.post<AutomationCreateResponse>(
      `${URI.PAGE}/${pageId}/${URI.AUTOMATIONS}`,
      input
    )
    return data
  },

  updateAutomation: async (
    pageId: string,
    automationId: string,
    input: UpdateAutomationInput
  ): Promise<AutomationCreateResponse> => {
    const { data } = await api.put<AutomationCreateResponse>(
      `${URI.PAGE}/${pageId}/${URI.AUTOMATIONS}/${automationId}`,
      input
    )
    return data
  },

  updateStatus: async (
    pageId: string,
    automationId: string,
    input: {
      is_active: boolean
    }
  ): Promise<AutomationCreateResponse> => {
    const { data } = await api.put<AutomationCreateResponse>(
      `${URI.PAGE}/${pageId}/${URI.AUTOMATIONS}/${automationId}/update-status`,
      input
    )
    return data
  },

  deleteAutomation: async (
    pageId: string,
    automationId: string
  ): Promise<void> => {
    await api.delete(`${URI.PAGE}/${pageId}/${URI.AUTOMATIONS}/${automationId}`)
  },

  getAutomationDetail: async (
    pageId: string,
    automationId: string
  ): Promise<AutomationDetailResponse> => {
    const { data } = await api.get<AutomationDetailResponse>(
      `${URI.PAGE}/${pageId}/${URI.AUTOMATIONS}/${automationId}`
    )
    return data
  },
}
