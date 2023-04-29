import { createBrowserRouter } from 'react-router-dom';

// Pages
import ErrorPage from '../pages/Error';
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';
import HomePage from '../pages/Home';
import ProfilePage from '../pages/Profile';
import ForgotPasswordPage from '../pages/ForgotPassword';
import ForgotPasswordConfirmationPage from '../pages/ForgotPasswordConfirmation';

export const router = createBrowserRouter([
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
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/forgot-password/confirmation',
    element: <ForgotPasswordConfirmationPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
]);
