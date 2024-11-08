import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react'
import MuiAlert, { AlertColor } from '@mui/material/Alert'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import password from 'secure-random-password'

// Types
export type Toast = {
  message: string
  severity?: AlertColor
  uuid: string
  anchorOrigin?: SnackbarOrigin
  autoHideDuration?: number | null
}

type ToastState = {
  toasts: Toast[]
}

type ToastAction =
  | { type: 'ADD_TOAST'; payload: Omit<Toast, 'uuid'> }
  | { type: 'REMOVE_TOAST'; payload: string }

// Context
type ToastContextType = {
  showToast: (
    message: string,
    options?: {
      severity?: AlertColor
      anchorOrigin?: SnackbarOrigin
      autoHideDuration?: number
    }
  ) => void
  removeToast: (uuid: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

// Reducer
const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [
          ...state.toasts,
          {
            ...action.payload,
            uuid: password.randomPassword({
              length: 12,
              characters: [
                password.lower,
                password.upper,
                password.digits,
                password.symbols,
              ],
            }),
          },
        ],
      }
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.uuid !== action.payload),
      }
    default:
      return state
  }
}

// Toast Provider Component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] })

  const showToast = useCallback(
    (
      message: string,
      options?: {
        severity?: AlertColor
        anchorOrigin?: SnackbarOrigin
        autoHideDuration?: number
      }
    ) => {
      dispatch({
        type: 'ADD_TOAST',
        payload: {
          message,
          ...options,
        },
      })
    },
    []
  )

  const removeToast = useCallback((uuid: string) => {
    dispatch({ type: 'REMOVE_TOAST', payload: uuid })
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {state.toasts.map((toast, idx) => (
        <Snackbar
          key={idx}
          open={true}
          anchorOrigin={
            toast.anchorOrigin ?? { vertical: 'top', horizontal: 'right' }
          }
          autoHideDuration={toast.autoHideDuration ?? 2000}
          onClose={() => removeToast(toast.uuid)}
        >
          <MuiAlert
            elevation={2}
            sx={{
              lineHeight: 1.8,
              '& .MuiButtonBase-root': {
                border: '0 none',
              },
            }}
            onClose={() => removeToast(toast.uuid)}
            severity={toast.severity}
          >
            {toast.message}
          </MuiAlert>
        </Snackbar>
      ))}
    </ToastContext.Provider>
  )
}

// Custom hook for using toasts
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
