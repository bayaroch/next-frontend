/* eslint-disable no-console */
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getPageContent, ContentResponse } from '@services/wp.services'

interface ReturnType {
  data: ContentResponse | undefined
  isLoading: boolean
  isError: boolean
  fetchPage: (id: string) => void
  clear: () => void
}

interface ReturnType {
  data: ContentResponse | undefined
  isLoading: boolean
  isError: boolean
  fetchPage: (id: string) => void
  clear: () => void
}

const useWp = (): ReturnType => {
  const queryClient = useQueryClient()

  const {
    data,
    isLoading: isQueryLoading,
    isError,
  } = useQuery<ContentResponse, Error>(
    'pageContent',
    () => getPageContent('defaultId'),
    {
      enabled: false,
    }
  )

  const fetchPageMutation = useMutation((id: string) => getPageContent(id), {
    onSuccess: (newData) => {
      queryClient.setQueryData('pageContent', newData)
    },
  })

  const fetchPage = (id: string) => {
    fetchPageMutation.mutate(id)
  }

  const clear = () => {
    queryClient.setQueryData('pageContent', null)
  }

  // Combine loading states from both query and mutation
  const isLoading = isQueryLoading || fetchPageMutation.isLoading

  return {
    data,
    isLoading,
    isError,
    fetchPage,
    clear,
  }
}
export default useWp
