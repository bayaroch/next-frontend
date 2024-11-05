import { URI } from '@constants/uri.constants'
import { api } from './api'

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
  cover: {
    cover_id: string
    offset_x: number
    offset_y: number
    source: string
    id: string
  }
  fan_count: number
  followers_count: number
}

export type PagesListResponse = {
  data: FacebookPage[]
  paging: {
    cursors: { before: string; after: string }
  }
}

export const AdminPagesService = async (): Promise<PagesListResponse> => {
  const { data } = await api.get<PagesListResponse>(URI.ADMIN_PAGES)
  return data
}

export interface PageConnetPayload {
  fb_page_id: number
}

export const PageConnectService = async (
  payload: PageConnetPayload
): Promise<any> => {
  const { data } = await api.post<any>(URI.ADMIN_PAGES, payload)
  return data
}
