// Constants
import ROUTES from 'resources/routes-constants';

// MUI
import { Box, Button, Container, Grid, TextField } from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// React Router
import { Navigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'store/slices/userSlice';

const VerifyIdentity = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);
  const userId = data?.userId;

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
    <Box sx={{ bgcolor: '#eee', minHeight: '80vh', py: 12 }}>
      <Container maxWidth='sm'>Verify Identity</Container>
    </Box>
  );
};

export default VerifyIdentity;
