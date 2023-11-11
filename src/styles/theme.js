// import { createTheme } from '@mui/material/styles';
// import { getFirestore, getDoc, doc } from 'firebase/firestore';
// import { firebaseApp } from 'providers/firebase'; // Adjust the path accordingly

// async function fetchColors() {
//   const firestore = getFirestore(firebaseApp);

//   // Assume you have a Firebase collection named 'colors' with documents 'primary' and 'secondary'
//   const primaryColorDoc = await getDoc(doc(firestore, 'colors', 'primary'));
//   const secondaryColorDoc = await getDoc(doc(firestore, 'colors', 'secondary'));

//   return {
//     primary: primaryColorDoc.data().color,
//     secondary: secondaryColorDoc.data().color,
//   };
// }

// const colors = await fetchColors();

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: colors.primary,
//       contrastText: '#fff',
//     },
//     secondary: {
//       main: colors.secondary,
//       contrastText: '#fff',
//     },
//     background: {
//       default: '#ffffff',
//     },
//     text: {
//       primary: '#000',
//     },
//   },
//   additionalPalette: {
//     primary: '#F0F0F0',
//     secondary: '#CCCCCC',
//   },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
//   typography: {
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//   },
// });

// theme.typography.h1 = {
//   fontWeight: 500,
//   // fontFamily: [
//   //   '-apple-system',
//   //   'BlinkMacSystemFont',
//   //   '"Segoe UI"',
//   //   'Roboto',
//   //   '"Helvetica Neue"',
//   //   'Arial',
//   //   'sans-serif',
//   //   '"Apple Color Emoji"',
//   //   '"Segoe UI Emoji"',
//   //   '"Segoe UI Symbol"',
//   // ],
//   [theme.breakpoints.up('xs')]: {
//     fontSize: 24,
//   },
//   [theme.breakpoints.up('sm')]: {
//     fontSize: 32, // Font size for small screens and larger
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: 40,
//   },
//   [theme.breakpoints.up('lg')]: {
//     fontSize: 44,
//   },
// };

// export default theme;

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
  // fontFamily: [
  //   '-apple-system',
  //   'BlinkMacSystemFont',
  //   '"Segoe UI"',
  //   'Roboto',
  //   '"Helvetica Neue"',
  //   'Arial',
  //   'sans-serif',
  //   '"Apple Color Emoji"',
  //   '"Segoe UI Emoji"',
  //   '"Segoe UI Symbol"',
  // ],
  [theme.breakpoints.up('xs')]: {
    fontSize: 28,
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: 34, // Font size for small screens and larger
  },
  [theme.breakpoints.up('md')]: {
    fontSize: 40,
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: 44,
  },
};

export default theme;
