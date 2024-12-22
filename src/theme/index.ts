import { createTheme } from '@mui/material/styles'

export const themeValue = {
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 576,
  //     md: 768,
  //     lg: 992,
  //     xl: 1200,
  //   },
  // },

  palette: {
    primary: {
      main: '#8B5FEFff',
      light: '#8B5FEFff',
      dark: '#8B5FEFff',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#272626',
      light: '#3c3c3b',
      dark: '#1a1a19',
      contrastText: '#FFF',
    },
    // primary: {
    //   main: '#c72c00',
    //   light: '#ff4d57',
    //   dark: '#a6000e',
    //   contrastText: '#FFF',
    // },
    // secondary: {
    //   main: '#222',
    //   light: '#444',
    //   dark: '#000',
    //   contrastText: '#FFF',
    // },
    error: {
      main: '#E73145',
      light: '#FF6A70',
      dark: '#AD001E',
      contrastText: '#FFF',
    },
    warning: {
      main: '#F39711',
      light: '#FFC84C',
      dark: '#BB6900',
      contrastText: '#FFF',
    },
    info: {
      main: '#2EB5C9',
      light: '#6FE7FC',
      dark: '#008598',
      contrastText: '#FFF',
    },
    success: {
      main: '#3BD2A2',
      light: '#78FFD3',
      dark: '#00A073',
      contrastText: '#FFF',
    },
    text: {
      primary: '#475259',
      secondary: '#8595A6',
      disabled: '#A2B2C3',
    },
    divider: '#DEE2E6',
    background: {
      paper: '#FFFFFF',
      default: '#F5F7FA',
    },
    action: {
      active: '#475259',
      hover: '#F5F7FA',
    },
  },
  typography: {
    fontFamily: 'NoirPro,   Arial, sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '1.5rem',
      lineHeight: 1.2,
      fontWeight: 400,
      color: '#37373C',
      margin: '0 0 .5rem',
    },
    h2: {
      fontSize: '1.4rem',
      lineHeight: 1.2,
      fontWeight: 400,
      color: '#37373C',
      margin: '0 0 .5rem',
    },
    h3: {
      '&:not(.MuiPickersToolbarText-root)': {
        fontWeight: 400,
        margin: '0 0 .5rem',
        fontSize: '1.25rem',
        lineHeight: 1.2,
      },
    },
    h4: {
      fontSize: '1.1rem',
      lineHeight: 1.2,
      fontWeight: 400,
      color: '#37373C',
      margin: '0 0 .5rem',
    },
    h5: {
      fontSize: '1rem',
      lineHeight: 1.2,
      fontWeight: 400,
      color: '#37373C',
      margin: '0 0 .5rem',
    },
    h6: {
      fontSize: '.875rem',
      lineHeight: 1.2,
      fontWeight: 400,
      color: '#37373C',
      margin: '0 0 .5rem',
    },
    body1: {
      fontSize: '.875rem',
    },
  },
  components: {
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
  },
}

const theme = createTheme(themeValue as any)

export default theme
