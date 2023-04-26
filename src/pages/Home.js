import React from 'react';

// Firebase
import { auth } from '../utility/base';

// MUI
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const HomePage = () => {
  const theme = useTheme();

  const handleLogout = () => {
    auth
      .signOut()
      .then(function () {
        console.log('Logged out');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        backgroundColor: {
          xs: theme.palette.primary.main,
          sm: 'purple',
          md: 'green',
          lg: 'blue',
        },
      }}
    >
      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  );
};
export default HomePage;
