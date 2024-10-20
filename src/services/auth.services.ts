import { URI } from '@constants/uri.constants'
import api from './api'

interface LoginPayload {
  fb_access_token: string
}

interface LoginResponse {
  access_token: string
}

export const loginService = async (
  params: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(URI.LOGIN, params)
  return data
}
