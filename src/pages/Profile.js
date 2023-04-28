import React from 'react';

// Firebase
import { logout } from '../utility/firebase';

// MUI
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const ProfilePage = () => {
  const theme = useTheme();

  const handleLogout = () => {
    logout();
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        // backgroundColor: {
        //   xs: theme.palette.primary.main,
        //   sm: 'purple',
        //   md: 'green',
        //   lg: 'blue',
        // },
      }}
    >
      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  );
};
export default ProfilePage;
