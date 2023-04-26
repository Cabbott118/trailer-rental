import React from 'react';
import ReactDOM from 'react-dom/client';

// React-Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import ErrorPage from './pages/Error';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import HomePage from './pages/Home';

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

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();
let uid;
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    console.log(user);
  } else {
    console.log('User is not logged in');
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
