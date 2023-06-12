import { useEffect, useState } from 'react';

// Constants
import routes from 'constants/routes';

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
  const { data, isAuthenticated } = useSelector((state) => state.user);
  const [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
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
    } else {
      setNavLinks([
        {
          name: 'Dashboard',
          route: `${routes.USER}/${data.uid}/dashboard`,
        },
      ]);
    }
  }, [isAuthenticated]);

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
