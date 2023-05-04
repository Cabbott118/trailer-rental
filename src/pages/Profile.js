import React, { useEffect, useState } from 'react';

// React Query
// import { useQuery } from 'react-query'

// Components
import Spinner from '../components/Spinner';

// React-Router
import { useNavigate } from 'react-router-dom';

// Functions
import { getUserDetails } from '../functions/users/getUserDetails';
import { getUsersItems } from '../functions/items/getUsersItems';
import { logout } from '../functions/auth/logout';

// Firebase
import { auth } from '../utility/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// MUI
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const ProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authUser, loading, error] = useAuthState(auth);
  // const { data: user, isLoading, isError } = useQuery('userDetails', getUserDetails)

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    setIsLoading(true);
    if (authUser) {
      const { uid } = authUser.auth.currentUser;
      const fetchData = async () => {
        const userData = await getUserDetails(uid);
        const usersItems = await getUsersItems(uid);
        setUser(userData);
        setItems(usersItems);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [authUser]);

  if (isLoading) {
    return <Spinner loading={isLoading} color={theme.palette.primary.main} />;
  }

  return (
    <Container
      maxWidth='sm'
      sx={{
        minHeight: '100vh',
      }}
    >
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <Typography
          variant='h1'
          sx={{ fontSize: '1.5rem', marginBottom: '2rem' }}
        >
          {user.firstName} {user.lastName}
        </Typography>
        {items.map((item, key) => (
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
