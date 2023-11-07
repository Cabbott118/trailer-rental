import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00C7E6',
      contrastText: '#fff',
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
  },
});

theme.typography.h1 = {
  fontWeight: 500,
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
  ],
  [theme.breakpoints.up('xs')]: {
    fontSize: 24,
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: 32, // Font size for small screens and larger
  },
  [theme.breakpoints.up('md')]: {
    fontSize: 40,
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: 44,
  },
};

export default theme;
