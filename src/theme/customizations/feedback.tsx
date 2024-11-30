import { Theme, Components } from '@mui/material/styles'
import { gray } from '../themePrimitives'

export const feedbackCustomizations: Components<Theme> = {
  MuiAlert: {
    styleOverrides: {
      standardSuccess: {
        backgroundColor: '#4caf50', // green
        color: '#fff',
      },
      standardError: {
        backgroundColor: '#f44336', // red
        color: '#fff',
      },
      standardWarning: {
        backgroundColor: '#ff9800', // orange
        color: '#fff',
      },
      standardInfo: {
        backgroundColor: '#2196f3', // blue
        color: '#fff',
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          border: '1px solid',
          borderColor: theme.palette.divider,
          backgroundColor: '#fff',
        },
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 8,
        backgroundColor: gray[200],
        ...theme.applyStyles('dark', {
          backgroundColor: gray[800],
        }),
      }),
    },
  },
}
