import React, { useEffect, useState } from 'react';

// Firebase
import { auth } from '../utility/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// Components
import Spinner from './Spinner';

// MUI
import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import Toolbar from '@mui/material/Toolbar';

const Navbar = () => {
  const theme = useTheme();

  const [navItems, setNavItems] = useState([]);
  const [authUser, loading, error] = useAuthState(auth);
  const authNavItems = [
    {
      name: 'Home',
      route: '/',
    },
    {
      name: 'Profile',
      route: '/profile',
    },
    {
      name: 'Items',
      route: '/item-list',
    },
    {
      name: 'Add Item',
      route: '/add-item',
    },
  ];

  const unAuthItems = [
    {
      name: 'Home',
      route: '/',
    },
    {
      name: 'Login',
      route: '/login',
    },
    { name: 'Sign Up', route: '/signup' },
  ];

  useEffect(() => {
    if (loading) setNavItems([]);
    if (!loading && authUser) {
      setNavItems(authNavItems);
    } else {
      setNavItems(unAuthItems);
    }
  }, [authUser, loading]);

  const loadingSpinner = (
    <Spinner
      loading={loading}
      color={theme.palette.primary.main}
      size={10}
      type='propogate'
    />
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Container maxWidth='lg'>
        <AppBar
          component='nav'
          color='transparent'
          position='static'
          sx={{ boxShadow: 'none' }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'right' }}>
            <Box
              sx={{
                display: {
                  sm: 'block',
                },
              }}
            >
              {loading
                ? loadingSpinner
                : navItems.map((page) => (
                    <Button
                      key={page.name}
                      href={page.route}
                      sx={{
                        color: theme.palette.text.primary,
                        textTransform: 'none',
                      }}
                    >
                      {page.name}
                    </Button>
                  ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  );
};

export default Navbar;
