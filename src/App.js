import { useEffect } from 'react';

// Components
import Navbar from 'components/layout/Navbar';

// Firebase
import { useSigninCheck } from 'reactfire';

// MUI
import { ThemeProvider } from '@mui/material';
import theme from './styles/theme';

// Pages
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import Home from 'pages/Home';
import RequireAuth from 'routes/requireAuth';

// React Router
import { Outlet, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import {
  authenticateUser,
  authenticateUserSuccess,
} from 'store/slices/userReducer';

function App() {
  const { data: signInCheckResult } = useSigninCheck();
  const dispatch = useDispatch();

  useEffect(() => {
    if (signInCheckResult?.signedIn) {
      dispatch(authenticateUser());
      const userData = {
        email: signInCheckResult.user.email,
        userId: signInCheckResult.user.uid,
      };
      dispatch(authenticateUserSuccess(userData));
    }
  }, [signInCheckResult, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route
              index // Equivalent to saying the page content for '/'
              element={<Home />}
            />
            <Route
              path='user' // place all routes that need user logged in under /user/
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              {/* Place your 'authenticated routes in here! They can be referenced by /user/<route> */}
              <Route index path=':uid/dashboard' element={<Dashboard />} />
            </Route>
            <Route
              path='*' // Providing a 404 page for '/' and thus the whole site.
              element={
                <>
                  <h1>404 Not Found</h1>
                  <p>You'll have to journey elsewhere.</p>
                </>
              }
            />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
