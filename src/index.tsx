import { ConfirmProvider } from '@components/Confirm'
import { defaultConfirmationOptions } from '@constants/common.constants'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material/styles'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { LayoutProvider } from '@layouts/MainLayout/LayoutProvider'
import '@locales/i18n'
import { AuthProvider } from 'global/AuthContext'
import getMainTheme from '@theme/getMainTheme'
import { PublicLayoutProvider } from '@layouts/PublicLayout/PublicProvider'
import { ToastProvider } from '@components/ToastProvider'
import QueryWrapper from '@components/QueryClientWrapper'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const mode: PaletteMode = 'light'
const theme = createTheme(getMainTheme(mode))

root.render(
  <GoogleOAuthProvider
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
  >
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <QueryWrapper>
          <ToastProvider>
            <PublicLayoutProvider>
              <LayoutProvider>
                <ConfirmProvider defaultOptions={defaultConfirmationOptions}>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline enableColorScheme />
                  <App />
                </ConfirmProvider>
              </LayoutProvider>
            </PublicLayoutProvider>
          </ToastProvider>
        </QueryWrapper>
      </AuthProvider>
    </ThemeProvider>
  </GoogleOAuthProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
