import { useEffect } from 'react';

// Constants
import ROUTES from 'resources/routes-constants';

// Components
import Navbar from 'components/layout/Navbar';

// Helpers
import RequireAuth from 'services/helpers/requireAuth';

// MUI
import { Container, Typography, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './styles/theme';

// Pages
import Login from 'pages/auth/Login';
import Signup from 'pages/auth/Signup';
// import Home from 'pages/home/Home';
import Home from 'features/home/pages/Home';
import AboutUs from 'pages/aboutUs/AboutUs';
import ContactUs from 'pages/contactUs/ContactUs';
import ForgotPassword from 'pages/forgotPassword/ForgotPassword';
import ForgotPasswordConfirmation from 'pages/forgotPassword/ForgotPasswordConfirmation';
import Dashboard from 'pages/dashboard/Dashboard';
import VerifyIdentity from 'pages/dashboard/subPages/VerifyIdentity';
import VerifyEmail from 'pages/dashboard/subPages/VerifyEmail';
import AddBankAccount from 'pages/dashboard/subPages/AddBankAccount';
import Profile from 'pages/dashboard/profile/Profile';
import AddTrailer from 'pages/trailers/AddTrailer';
import AddTrailerSuccess from 'pages/trailers/AddTrailerSuccess';
// import ViewTrailers from 'pages/trailers/ViewTrailers';
import Search from 'features/search/pages/Search';
import ViewTrailer from 'pages/trailers/ViewTrailer';

// React Router
import { Outlet, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

function App() {
  const { theme } = useSelector((state) => state.ui);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Development');
    } else if (process.env.NODE_ENV === 'production') {
      console.log('Production');
    } else {
      console.log('Unknown environment');
    }
  }, []);

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Navbar />}>
            <Route index element={<Home />} />
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              <Route index path='' element={<Dashboard />} />
              <Route index path={ROUTES.PROFILE} element={<Profile />} />
              <Route
                index
                path={ROUTES.VERIFY_IDENTITY}
                element={<VerifyIdentity />}
              />
              <Route
                index
                path={ROUTES.VERIFY_EMAIL}
                element={<VerifyEmail />}
              />
              <Route
                index
                path={ROUTES.ADD_BANK_ACCOUNT}
                element={<AddBankAccount />}
              />
            </Route>
            <Route
              path={ROUTES.TRAILERS}
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              <Route index path={ROUTES.ADD_TRAILER} element={<AddTrailer />} />
              <Route
                index
                path={ROUTES.ADD_TRAILER_SUCCESS}
                element={<AddTrailerSuccess />}
              />
              <Route index path={ROUTES.FIND_TRAILERS} element={<Search />} />
              <Route
                index
                path={ROUTES.VIEW_TRAILER}
                element={<ViewTrailer />}
              />
            </Route>
            <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
            <Route path={ROUTES.CONTACT_US} element={<ContactUs />} />
            <Route
              path='*'
              element={
                <>
                  <Container sx={{ height: '90vh', pt: '30vh' }}>
                    <Typography
                      variant='h1'
                      align='center'
                      sx={{ fontSize: 36, fontWeight: 500 }}
                    >
                      404 Not Found
                    </Typography>
                    <Typography
                      variant='h6'
                      align='center'
                      sx={{ fontWeight: 400 }}
                    >
                      You'll have to journey elsewhere.
                    </Typography>
                  </Container>
                </>
              }
            />
          </Route>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route
            path={ROUTES.FORGOT_PASSWORD_CONFRIMATION}
            element={<ForgotPasswordConfirmation />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
