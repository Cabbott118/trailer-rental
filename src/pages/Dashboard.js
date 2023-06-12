// Firebase
import { useUser, useAuth } from 'reactfire';

// MUI
import { Button, Typography } from '@mui/material';

// React Router
import { useNavigate, useLocation } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { clearData } from 'store/slices/userSlice';

export default function Dashboard() {
  document.title = 'Dashboard';
  const { data: user } = useUser();

  const auth = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  function handleSignOut(event) {
    event.preventDefault();
    auth.signOut().then(() => {
      dispatch(clearData());
      navigate('/login', { state: { from: location } });
    });
  }

  return (
    <>
      <Typography variant='h4' component='h1'>
        Dashboard
      </Typography>
      <Typography variant='p'>You are signed in as {user.email}</Typography>
      <Button
        variant='contained'
        onClick={handleSignOut}
        sx={{ textTransform: 'none' }}
      >
        Logout
      </Button>
    </>
  );
}
