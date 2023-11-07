import { useEffect } from 'react';

// Constants
import routes from 'constants/routes';

// MUI
import {
  Box,
  Button,
  Card,
  CardActions,
  Container,
  Typography,
} from '@mui/material';

// React Router
import { Link, Navigate, useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'store/slices/userSlice';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state.user);

  const handleVerifyEmailClick = () => {
    const userId = data?.userId;
    const updateData = {
      verified: {
        email: true,
        identity: data?.verified?.identity,
      },
    };
    dispatch(updateUser({ userId, updateData })).then(() => {
      navigate(routes.DASHBOARD);
    });
  };

  return (
    <Box sx={{ bgcolor: '#eee', minHeight: '80vh', py: 12 }}>
      <Container maxWidth='sm'>
        <Card sx={{ pt: 3, px: 3, pb: 1 }}>
          <Typography gutterBottom variant='h5' component='div'>
            Verify your email
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
            {data?.fullName?.firstName}, to fully use this app, you must verify
            your email address.
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
            We will never share your email address with anyone, unless you give
            us permission.
          </Typography>
          <CardActions>
            <Button
              fullWidth
              onClick={handleVerifyEmailClick}
              disabled={loading}
              sx={{ textTransform: 'none' }}
            >
              Verify email
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
};

export default VerifyEmail;
