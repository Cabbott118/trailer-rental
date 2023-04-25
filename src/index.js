import React from 'react';
import ReactDOM from 'react-dom/client';

// React-Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import ErrorPage from './pages/Error';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Home from './pages/Home';

// Components
import Navbar from '../src/components/Navbar';

// MUI
import { ThemeProvider } from '@emotion/react';
import theme from './utility/theme';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
