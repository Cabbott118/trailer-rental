import React from 'react';

// Components
import Navbar from './components/Navbar';

// Utility
import { router } from './routes/root';

// MUI
import { ThemeProvider } from '@emotion/react';
import theme from './utility/theme';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// React-Router
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
