// MUI
import { Button, Divider } from '@mui/material';

// React Router
import { useNavigate, useLocation } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { clearUserData, logoutUser } from 'store/slices/userSlice';
import { clearTrailerData } from 'store/slices/trailerSlice';

// Routes
import routes from 'constants/routes';

export default function Logout({ variant }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async (event) => {
    event.preventDefault();
    await Promise.all([
      dispatch(logoutUser()),
      dispatch(clearUserData()),
      dispatch(clearTrailerData()),
    ]);
    navigate(routes.LOGIN, { state: { from: location } });
  };

  return (
    <>
      <Divider light variant='middle' />
      <Button
        color='error'
        variant={variant}
        fullWidth
        onClick={handleLogout}
        sx={{ textTransform: 'none' }}
      >
        Logout
      </Button>
    </>
  );
}
