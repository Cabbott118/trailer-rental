import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#00C7E6',
      contrastText: '#000',
    },
    secondary: {
      main: '#F79B19',
      contrastText: '#fff',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#000',
    },
  },
  additionalPalette: {
    primary: '#F0F0F0',
    secondary: '#CCCCCC',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontWeight: 500,
      fontSize: 28,
      '@media (min-width:600px)': {
        fontSize: 34,
      },
      '@media (min-width:900px)': {
        fontSize: 40,
      },
      '@media (min-width:1200px)': {
        fontSize: 44,
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    paletteName: 'dark',
    primary: {
      main: '#00C7E6',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F79B19',
      contrastText: '#fff',
    },
    background: {
      default: '#212121',
    },
  },
  additionalPalette: {
    primary: '#102A43',
    secondary: '#0D1C2B',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontWeight: 500,
      fontSize: 28,
      '@media (min-width:600px)': {
        fontSize: 34,
      },
      '@media (min-width:900px)': {
        fontSize: 40,
      },
      '@media (min-width:1200px)': {
        fontSize: 44,
      },
    },
  },
});

export { lightTheme, darkTheme };
