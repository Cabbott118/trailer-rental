import { useEffect } from 'react';

// Constants
import ROUTES from 'resources/routes-constants';

// Components
import Navbar from 'components/layout/Navbar';
import PixelObiWan from 'components/common/pixelArt/obiWan/PixelObiWan';
import PixelDarthVader from 'components/common/pixelArt/darthVader/PixelDarthVader';

// Helpers
import RequireAuth from 'services/helpers/requireAuth';

// MUI
import { Container, Typography, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './styles/theme';

// Pages
import Login from 'features/authentication/pages/Login';
import Signup from 'features/authentication/pages/Signup';
import ForgotPassword from 'features/authentication/pages/ForgotPassword';
import ForgotPasswordConfirmation from 'features/authentication/pages/ForgotPasswordConfirmation';

import Home from 'features/home/pages/Home';
import AboutUs from 'features/experience/pages/AboutUs';
import ContactUs from 'features/experience/pages/ContactUs';

import Dashboard from 'features/dashboard/pages/Dashboard';
import VerifyIdentity from 'features/dashboard/subPages/VerifyIdentity';
import VerifyEmail from 'features/dashboard/subPages/VerifyEmail';
import AddBankAccount from 'features/dashboard/subPages/AddBankAccount';
import Profile from 'features/profile/pages/Profile';

import AddTrailer from 'features/listings/pages/AddTrailer';
import AddTrailerSuccess from 'features/listings/pages/AddTrailerSuccess';
import Search from 'features/search/pages/Search';
import ViewTrailer from 'features/listings/pages/ViewTrailer';

// React Router
import { Outlet, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

function App() {
  const { theme } = useSelector((state) => state.ui);

  function changeBackgroundColor(theme) {
    const backgroundColor =
      theme === 'dark'
        ? darkTheme.palette.background.default
        : lightTheme.palette.background.default;
    document.body.style.backgroundColor = backgroundColor;
  }

  useEffect(() => {
    changeBackgroundColor(theme);
  }, [theme]);

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
                  <Container sx={{ height: '90vh', pt: 20 }}>
                    <Typography
                      variant='h1'
                      align='center'
                      color='text.primary'
                      sx={{ fontSize: 36, fontWeight: 500 }}
                    >
                      404 Not Found
                    </Typography>
                    <Typography
                      variant='h6'
                      align='center'
                      color='text.primary'
                      sx={{ fontWeight: 400 }}
                    >
                      You must've fallen asleep at the Hyperdrive
                    </Typography>
                    {theme === 'light' ? <PixelObiWan /> : <PixelDarthVader />}
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
