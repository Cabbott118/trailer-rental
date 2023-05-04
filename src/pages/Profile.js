import React from 'react';

// React Query
import { useQuery } from 'react-query';

// Components
import Spinner from '../components/Spinner';

// React-Router
import { useNavigate } from 'react-router-dom';

// Functions
import { getUserDetails } from '../functions/users/getUserDetails';
import { getUsersItems } from '../functions/items/getUsersItems';
import { logout } from '../functions/auth/logout';

// MUI
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const ProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery('userDetails', getUserDetails);

  const {
    data: items,
    isLoading: isItemsLoading,
    isError: isItemsError,
  } = useQuery('usersItems', async () => {
    const usersItems = await getUsersItems();
    return usersItems;
  });

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const loadingSpinner = (
    <Spinner
      loading={isUserLoading || isItemsLoading}
      color={theme.palette.primary.main}
      size={30}
      type='clip'
    />
  );

  if (isUserError) {
    return <div>Failed to load user details</div>;
  }

  if (isItemsError) {
    return <div>Failed to load user's items</div>;
  }

  return (
    <Container
      maxWidth='sm'
      sx={{
        minHeight: '100vh',
        marginTop: 8,
      }}
    >
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        {loadingSpinner}
        <Typography
          variant='h1'
          sx={{ fontSize: '1.5rem', marginBottom: '2rem' }}
        >
          {user?.firstName} {user?.lastName}
        </Typography>
        {items?.map((item, key) => (
          <Typography
            key={key}
            variant='h1'
            sx={{ fontSize: '1rem', marginBottom: '1rem' }}
          >
            {item.title}
          </Typography>
        ))}
        <Button variant='contained' color='error' onClick={handleLogout}>
          Logout
        </Button>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
