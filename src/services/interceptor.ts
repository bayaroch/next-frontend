import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

export const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token')
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean
      }

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true

        try {
          const refreshToken = localStorage.getItem('refresh_token')
          if (!refreshToken) {
            throw new Error('No refresh token available')
          }

          const response = await api.post('/v1/refresh_token', {
            refreshToken,
          })
          const { accessToken } = response.data

          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', accessToken)
          }

          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
          }

          return api(originalRequest)
        } catch (refreshError) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('refresh_token')
            window.location.href = '/login'
          }
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error.response?.data)
    }
  )
}
