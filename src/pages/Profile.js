import React from 'react';

// React-Router
import { useNavigate } from 'react-router-dom';

// Firebase
import { logout, getUserDetails } from '../utility/firebase';

// MUI
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const ProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleQuery = () => {
    getUserDetails();
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth='sm'
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
        <Typography
          variant='h1'
          sx={{ fontSize: '1.5rem', marginBottom: '2rem' }}
        >
          Profile
        </Typography>
        <Button variant='contained' onClick={handleQuery}>
          Query
        </Button>
        <Button variant='contained' color='error' onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    </Box>
  );
};
export default ProfilePage;
