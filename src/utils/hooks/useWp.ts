import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getPageContent, ContentResponse } from '@services/wp.services'

interface ReturnType {
  data: ContentResponse | undefined
  isLoading: boolean
  isError: boolean
  fetchPage: (id: string) => void
  clear: () => void
}

const useWp = (hookId: string): ReturnType => {
  const queryClient = useQueryClient()
  const queryKey = ['pageContent', hookId]

  const {
    data,
    isLoading: isQueryLoading,
    isError,
  } = useQuery<ContentResponse, Error>(
    queryKey,
    () => getPageContent('defaultId'),
    {
      enabled: false,
    }
  )

  const fetchPageMutation = useMutation((id: string) => getPageContent(id), {
    onSuccess: (newData) => {
      queryClient.setQueryData(queryKey, newData)
    },
  })

  const fetchPage = (id: string) => {
    fetchPageMutation.mutate(id)
  }

  const clear = () => {
    queryClient.setQueryData(queryKey, null)
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
