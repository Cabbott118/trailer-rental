// Constants
import ROUTES from 'resources/routes-constants';

// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// React Router
import { Navigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'store/slices/userSlice';

const VerifyIdentity = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const userId = user?.userId;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    const updateData = {};
    dispatch(updateUser({ userId, updateData }));
  };

  return (
    <Box sx={{ minHeight: '80vh', py: 12 }}>
      <Container maxWidth='sm'>
        <Typography variant='h4' component='h1' color='text.primary'>
          Verify Identity
        </Typography>
      </Container>
    </Box>
  );
};

export default VerifyIdentity;
