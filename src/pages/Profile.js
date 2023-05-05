import React from 'react';

// React Query
import { useQuery } from 'react-query';

// Components
import Spinner from '../components/Spinner';
import ItemContainer from '../components/ItemContainer';
import RegisterAsHostBox from '../components/RegisterAsHostBox';

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

  if (isUserError) {
    return <div>Failed to load user details</div>;
  }

  if (isItemsError) {
    return <div>Failed to load user's items</div>;
  }

  const loadingSpinner = (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      sx={{
        minHeight: '75vh',
      }}
    >
      <Spinner
        loading={isItemsLoading}
        color={theme.palette.primary.main}
        size={30}
        type='grid'
      />
    </Grid>
  );

  const profileLayout = (
    <Container
      maxWidth='sm'
      sx={{
        minHeight: '100vh',
        mt: 8,
      }}
    >
      <Typography variant='h1' sx={{ fontSize: '1.5rem', mb: '2rem' }}>
        <b>Welcome, </b>
        {user?.firstName} {user?.lastName}
      </Typography>
      {items?.length !== 0 ? (
        <ItemContainer items={items} />
      ) : (
        <RegisterAsHostBox />
      )}
      <Button
        variant='contained'
        color='error'
        fullWidth
        onClick={handleLogout}
        sx={{
          my: '1rem',
          textTransform: 'none',
        }}
      >
        Logout
      </Button>
    </Container>
  );
  return isItemsLoading ? loadingSpinner : profileLayout;
};

export default ProfilePage;
