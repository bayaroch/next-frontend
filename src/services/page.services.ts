import { URI } from '@constants/uri.constants'
import { api } from './api'

export enum PageStatus {
  connected = 'connected',
  not_connected = 'not_connected',
  used = 'used',
}

export interface FacebookPage {
  id: string
  name: string
  category: string
  picture: {
    data: {
      height: number
      is_silhouette: boolean
      url: string
      width: number
    }
  }
  cover?: {
    cover_id: string
    offset_x: number
    offset_y: number
    source: string
    id: string
  }
  fan_count: number
  followers_count: number
  status: PageStatus
  is_deleted?: boolean
}

export type PagesListResponse = {
  data: FacebookPage[]
  has_more: boolean
  pages_fetched: number
  total_count: number
}

export type PageConnectResponse = {
  created_at: number
  fb_cover_image: string
  fb_fan_count: number
  fb_followers_count: number
  fb_name: string
  fb_page_id: string
  fb_profile_image: string
  is_default_page: boolean
  sort_key: string
  updated_at: number
  user_id: string
}

export const AdminPagesService = async (): Promise<PagesListResponse> => {
  const { data } = await api.get<PagesListResponse>(URI.ADMIN_PAGES)
  return data
}

export interface Post {
  id: string
  full_picture: string
  message?: string
  story?: string
  created_time: string
  permalink: string
  likes?: {
    summary: { total_count: number; can_like: boolean; has_liked: boolean }
  }
  comments?: {
    summary: { total_count: number; can_comment: boolean }
  }
  shares?: { count: number }
  is_published: boolean
  is_used?: boolean
  icon?: string
  //add other graph api fields icon comments likes
}

export interface ResponseToGraphApi {
  keyword: string
  content: string
}

export enum JobStatus {
  pending = 'pending',
  pre_process = 'pre_process_error',
  process_error = 'process_error',
  completed = 'completed',
}

export interface CommentJobHistoryItem {
  page_id?: string
  comment_id: string
  comment: string
  response_to_graph_api: ResponseToGraphApi | null
  job_status: string
  is_sent: boolean
  error_type: JobStatus
  updated_at: string
  page_name?: string
  created_at: string
}

export interface GetPostsResponse {
  data: Post[]
}

export interface GetPostsParams {
  pageId: string
  perPage?: string
}

export type CommentJobHistoryResponse = {
  data: CommentJobHistoryItem[]
}

export const GetPostsService = async (
  params: GetPostsParams
): Promise<GetPostsResponse> => {
  const { pageId, perPage = '50' } = params
  const { data } = await api.get<GetPostsResponse>(
    `${URI.PAGE}/${pageId}/post`,
    {
      params: { perPage },
    }
  )
  return data
}

export interface PageConnetPayload {
  fb_page_id: string
}

export const PageConnectService = async (
  payload: PageConnetPayload
): Promise<PageConnectResponse> => {
  const { data } = await api.post<PageConnectResponse>(URI.CONNECT, payload)
  return data
}

export const PageDisconnectService = async (
  payload: PageConnetPayload
): Promise<PageConnectResponse> => {
  const { data } = await api.post<PageConnectResponse>(URI.DISCONNECT, payload)
  return data
}

export const PageSwitchService = async (
  payload: PageConnetPayload
): Promise<any> => {
  const { data } = await api.post<any>(URI.SWITCH, payload)
  return data
}

export type HistoryParams = {
  payload: { start_at: string; end_at: string }
  pageId: string
}

export const PageJobHistoryService = async (
  params: HistoryParams
): Promise<CommentJobHistoryResponse> => {
  const { data } = await api.get<CommentJobHistoryResponse>(
    `${URI.PAGE}/${params.pageId}/comment-job-history`,
    {
      params: params.payload,
    }
  )
  return data
}
