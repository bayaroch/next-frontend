import { publicApi } from './api'

export type ContentResponse = {
  title: string
  content: string
}

export const getPageContent = async (id: string): Promise<any> => {
  const { data } = await publicApi.get<ContentResponse>(`/posts/${id}`)
  return data
}
