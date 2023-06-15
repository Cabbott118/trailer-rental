import { useEffect, useState } from 'react';

// Constants
import routes from 'constants/routes';

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// MUI
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  useTheme,
} from '@mui/material';

// React Router
import { Link, Outlet } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

export default function Navbar() {
  const theme = useTheme();
  const { data } = useSelector((state) => state.user);
  const [navLinks, setNavLinks] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setNavLinks([
          {
            name: 'Dashboard',
            route: `${routes.USER}/${user?.uid}/dashboard`,
          },
        ]);
      } else {
        setNavLinks([
          {
            name: 'Login',
            route: routes.LOGIN,
          },
          {
            name: 'Signup',
            route: routes.SIGNUP,
          },
        ]);
      }
    });
  }, [onAuthStateChanged]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth='md'>
          <AppBar
            position='static'
            color='transparent'
            sx={{ boxShadow: 'none' }}
          >
            <Toolbar>
              <Link to={routes.HOME} style={{ flexGrow: 1 }}>
                <Button
                  sx={{
                    textTransform: 'none',
                    color: theme.palette.secondary.dark,
                  }}
                >
                  Home
                </Button>
              </Link>

              {navLinks.map((navLink) => (
                <Link key={navLink.name} to={navLink.route}>
                  <Button
                    sx={{
                      textTransform: 'none',
                      color: theme.palette.secondary.dark,
                    }}
                  >
                    {navLink.name}
                  </Button>
                </Link>
              ))}
            </Toolbar>
          </AppBar>
        </Container>
      </Box>
      <Outlet />
    </>
  );
}
