// MUI
import { Button, Divider } from '@mui/material';

// React Router
import { useNavigate, useLocation } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { clearUserData, logoutUser } from 'store/slices/userSlice';

// Routes
import routes from 'constants/routes';

export default function Logout({ variant }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout(event) {
    event.preventDefault();
    dispatch(logoutUser());
    dispatch(clearUserData());
    navigate(routes.LOGIN, { state: { from: location } });
  }

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
