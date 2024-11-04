import { URI } from '@constants/uri.constants'
import { api } from './api'

export interface LoginPayload {
  fb_access_token: string
}

export interface LoginResponse {
  access_token: string
}

export interface UserInput {
  user_id: string
  email: string
  first_name: string
  last_name: string
  fb_name: string
  exp: number
  fb_id: string
  has_used_free_trail: boolean
  has_filled_poll: boolean
  poll_responses: any
  updated_at: string
  created_at: string
}

export interface AppInitResponse {
  page_info: {
    name: string
    fb_page_id: string
    fb_page_category: string
    fb_page_url: string
    fb_profile_image: string
    fb_cover_image: string
    fb_fan_count: number
    fb_followers_count: number
  } | null
  rate_limits: {
    page_rate_limit: number
  } | null
  user_info: UserInput
  connected_pages: {
    fb_page_id: string
    fb_name: string
  }[]
}

export const loginService = async (
  params: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(URI.LOGIN, params)
  return data
}

export const initializeAppService = async (): Promise<AppInitResponse> => {
  const { data } = await api.get<AppInitResponse>(URI.INIT)
  return data
}
