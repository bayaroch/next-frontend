import { ConfirmProvider } from '@components/Confirm'
import { defaultConfirmationOptions } from '@constants/common.constants'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@theme/index'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { LayoutProvider } from '@layouts/MainLayout/LayoutProvider'
import '@locales/i18n'
import { AuthProvider } from 'global/AuthContext'
import { QueryClient, QueryClientProvider } from 'react-query'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient()

root.render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LayoutProvider>
          <ConfirmProvider defaultOptions={defaultConfirmationOptions}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <App />
          </ConfirmProvider>
        </LayoutProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
