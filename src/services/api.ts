import axios from 'axios';

import { setupInterceptors } from './interceptor';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

setupInterceptors(api);
export default api;