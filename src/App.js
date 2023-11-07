// Constants
import routes from 'constants/routes';

// Components
import Navbar from 'components/layout/Navbar';

// MUI
import { Box, Container, Typography, ThemeProvider } from '@mui/material';
import theme from './styles/theme';

// Pages
import Login from 'pages/auth/Login';
import Signup from 'pages/auth/Signup';
import Home from 'pages/home/Home';
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
import ViewTrailers from 'pages/trailers/ViewTrailers';
import ViewTrailer from 'pages/trailers/ViewTrailer';
import RequireAuth from 'routes/requireAuth';

// React Router
import { Outlet, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.HOME} element={<Navbar />}>
            <Route index element={<Home />} />
            <Route
              path={routes.DASHBOARD}
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              <Route index path='' element={<Dashboard />} />
              <Route index path={routes.PROFILE} element={<Profile />} />
              <Route
                index
                path={routes.VERIFY_IDENTITY}
                element={<VerifyIdentity />}
              />
              <Route
                index
                path={routes.VERIFY_EMAIL}
                element={<VerifyEmail />}
              />
              <Route
                index
                path={routes.ADD_BANK_ACCOUNT}
                element={<AddBankAccount />}
              />
            </Route>
            <Route
              path={routes.TRAILERS}
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              <Route index path={routes.ADD_TRAILER} element={<AddTrailer />} />
              <Route
                index
                path={routes.ADD_TRAILER_SUCCESS}
                element={<AddTrailerSuccess />}
              />
              <Route
                index
                path={routes.VIEW_TRAILERS}
                element={<ViewTrailers />}
              />
              <Route
                index
                path={routes.VIEW_TRAILER}
                element={<ViewTrailer />}
              />
            </Route>
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/contact-us' element={<ContactUs />} />
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
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route
            path='/forgot-password-confirmation'
            element={<ForgotPasswordConfirmation />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
