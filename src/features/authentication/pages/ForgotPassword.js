import { useState } from 'react';

// Constants
import ROUTES from 'resources/routes-constants';

// Firebase
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

// MUI
import {
  Button,
  Box,
  Container,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// React Router
import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const auth = getAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);

  const linkStyles = {
    color: theme.palette.primary.contrastText,
    fontSize: '.9rem',
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    setIsError(false);
    try {
      await sendPasswordResetEmail(auth, data.email);
      navigate(ROUTES.FORGOT_PASSWORD_CONFRIMATION);
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        pt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Container maxWidth='xs'>
        <Typography
          variant='h1'
          color='text.primary'
          sx={{ fontSize: '1.5rem', marginBottom: '1rem' }}
        >
          Reset your password
        </Typography>
        <Typography
          variant='body1'
          sx={{ color: theme.palette.text.secondary, mb: '2rem' }}
        >
          Enter the email address associated with your account and we'll send
          you a link to reset your password.
        </Typography>
        <TextField
          label='Email Address'
          type='email'
          fullWidth
          autoFocus
          {...register('email', { required: true })}
          error={errors.email?.type === 'required' || isError}
          helperText={
            (errors.email?.type === 'required' && 'Email is required') ||
            (isError ? 'This email address was not found' : null)
          }
        />
        <Button
          variant='contained'
          type='submit'
          fullWidth
          sx={{
            mt: 3,
            mb: 2,
            textTransform: 'none',
            color: theme.palette.secondary.contrastText,
          }}
        >
          Send Email
        </Button>
        <Link
          to={ROUTES.SIGNUP}
          style={linkStyles}
          sx={{ color: 'text.primary' }}
        >
          Don't have an account? Sign up
        </Link>
      </Container>
    </Box>
  );
}
