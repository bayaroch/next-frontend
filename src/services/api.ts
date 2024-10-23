import axios from 'axios'
import { setupInterceptors } from './interceptor'

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

const publicApi = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL:
    'https://public-api.wordpress.com/rest/v1.1/sites/kommai.wordpress.com/',
})

setupInterceptors(api)

export { api, publicApi }
