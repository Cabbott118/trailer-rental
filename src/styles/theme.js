import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // primary: {
    //   main: '#0B7064',
    //   contrastText: '#DDE6ED',
    // },
    // secondary: {
    //   main: '#705900',
    //   contrastText: '#DDE6ED',
    // },
    primary: {
      main: '#00C7E6',
      contrastText: '#DDE6ED',
    },
    secondary: {
      main: '#F79B19',
    },
    background: {
      default: '#ffffff',
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
  },
});

export default theme;
