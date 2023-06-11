import { useEffect, useState } from 'react';

// Constants
import routes from 'constants/routes';

// MUI
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';

// React Router
import { Link, Outlet } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

export default function Navbar() {
  const [navLinks, setNavLinks] = useState([]);
  const { data, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (data) {
      setNavLinks([
        {
          name: 'Dashboard',
          route: `${routes.USER}/${data.userId}/dashboard`,
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
  }, [data]);
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
                <Button sx={{ textTransform: 'none' }}>Home</Button>
              </Link>

              {navLinks.map((navLink, index) => (
                <Link key={index} to={navLink.route}>
                  <Button sx={{ textTransform: 'none' }}>{navLink.name}</Button>
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
