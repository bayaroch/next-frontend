import { URI } from '@constants/uri.constants'
import { api } from './api'
import { Profile } from './auth.services'

export type ProfileParams = {
  first_name?: string
  last_name?: string
  email?: string
  phone_number?: string
}

//write put service for profile
export const updateProfileService = async (
  params: ProfileParams
): Promise<Profile> => {
  const { data } = await api.put<Profile>(`${URI.USER}`, params)
  return data
}
// create new get service with path auth/profile and no params
export const getProfileService = async (): Promise<Profile> => {
  const { data } = await api.get<Profile>(URI.PROFILE)
  return data
}
