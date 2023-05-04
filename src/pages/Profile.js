import React, { useEffect, useState } from 'react';

// React-Router
import { useNavigate } from 'react-router-dom';

// Functions
import { getUserDetails } from '../functions/users/getUserDetails';
import { getUsersItems } from '../functions/items/getUsersItems';
import { logout } from '../functions/auth/logout';

// MUI
// import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const ProfilePage = () => {
  // const theme = useTheme();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userData = await getUserDetails();
      const usersItems = await getUsersItems();
      setUser(userData);
      setItems(usersItems);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
      </Container>
    </Box>
  );
};
export default ProfilePage;
