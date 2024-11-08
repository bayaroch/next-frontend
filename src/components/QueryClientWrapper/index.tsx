import { useToast } from '@components/ToastProvider'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from 'react-query'

type ApiError = {
  code: string
  message: string
}

function isApiErrorResponse(res: any): res is ApiError {
  return res && 'code' in res && 'message' in res
}

export const handleErrorMessage = (error: unknown) => {
  if (!axios.isAxiosError(error)) {
    return 'Unknown error'
  }

  if (!error.response) {
    return error.message
  }

  if (!isApiErrorResponse(error.response.data)) {
    return error.message
  }

  return error.response.data.code
}

const QueryWrapper = ({ children }: { children: React.ReactNode }) => {
  const { showToast } = useToast()

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        onError: (error) => {
          showToast(
            handleErrorMessage(error) || 'An unexpected error occurred',
            {
              severity: 'error',
              autoHideDuration: 3000,
            }
          )
        },
      },
      mutations: {
        onError: (error) => {
          // eslint-disable-next-line no-console
          console.log(handleErrorMessage(error), error)
          showToast(
            handleErrorMessage(error) || 'An unexpected error occurred',
            {
              severity: 'error',
              autoHideDuration: 3000,
            }
          )
        },
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
export default QueryWrapper
