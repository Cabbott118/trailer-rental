import { useEffect } from 'react';

// Firebase
import { useAuth } from 'reactfire';

// MUI
import { Button, Typography } from '@mui/material';

// React Router
import { useNavigate, useLocation, useParams } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { clearData, fetchUser } from 'store/slices/userSlice';

// Routes
import routes from 'constants/routes';

export default function Dashboard() {
  document.title = 'Dashboard';

  const auth = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const { uid } = useParams();

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.user);
  console.log(uid);

  useEffect(() => {
    dispatch(fetchUser(uid));
  }, []);

  function handleSignOut(event) {
    event.preventDefault();
    auth.signOut().then(() => {
      dispatch(clearData());
      navigate(routes.LOGIN, { state: { from: location } });
    });
  }

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Typography variant='h4' component='h1'>
        Dashboard
      </Typography>
      <Typography variant='p'>You are signed in as {data?.email}</Typography>
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
