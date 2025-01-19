import { URI } from '@constants/uri.constants'
import { api } from './api'
import { Product } from './payment.services'

export interface LoginPayload {
  fb_access_token: string
}

export interface LoginResponse {
  access_token: string
}
export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
  SELLER = 'seller',
}

export interface UserInput {
  email: string
  first_name: string
  fb_name: string
  exp: number
  fb_id: number
  role: ROLE
  iat: number
  is_seller_confirmed: boolean
  survey_responses: {
    [key: string]: any
  }
  free_plan_available?: boolean
}

//extend UserInput

export interface Profile extends UserInput {
  connected_pages: ConnectedPage[]
  subscription: Subscription
}

export interface ConnectedPage {
  fb_page_id: string
  fb_name: string
  is_default_page: boolean
}

export enum SubStatus {
  ACTIVE = 'active',
  CANCEL = 'cancel',
  EXPIRED = 'expired',
}

export interface Subscription {
  product?: Omit<
    Product,
    'product_id' | 'is_active' | 'created_at' | 'updated_at'
  >
  status?: SubStatus
  start_at?: Date
  end_at?: Date
  remaining_token?: number
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
  connected_pages: ConnectedPage[]
  subscription?: {
    product?: Omit<
      Product,
      'product_id' | 'is_active' | 'created_at' | 'updated_at'
    >
    status?: SubStatus
    start_at?: Date
    end_at?: Date
    remaining_token?: number
  }
}

export interface SurveyFields {
  company_type: string
  role: string
  agency_size: string
}
export interface SurvePayload {
  id: number
  params: SurveyFields
}

export interface GoogleLoginParams {
  google_access_token: string
}

export const loginService = async (
  params: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(URI.LOGIN, params)
  return data
}

export const loginGoogleService = async (
  params: GoogleLoginParams
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(URI.GOOGLE_LOGIN, params)
  return data
}

export const initializeAppService = async (): Promise<AppInitResponse> => {
  const { data } = await api.get<AppInitResponse>(URI.INIT)
  return data
}

export const surveyUpdateService = async (
  params: SurvePayload
): Promise<LoginResponse> => {
  const { data } = await api.put<LoginResponse>(
    `${URI.SURVEY.replace(/:id/gi, params.id.toString())}`,
    params.params
  )
  return data
}

// create new get service with path auth/profile and no params
export const getProfileService = async (): Promise<Profile> => {
  const { data } = await api.get<Profile>(URI.PROFILE)
  return data
}
