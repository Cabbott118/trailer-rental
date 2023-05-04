import React, { useEffect, useState } from 'react';

// React-Router
import { useNavigate } from 'react-router-dom';

// Firebase
import { auth } from '../utility/firebase';
import { signInWithGoogle } from '../functions/auth/signInWithGoogle';
import { registerWithEmailAndPassword } from '../functions/auth/registerWithEmailAndPassword';

import { useAuthState } from 'react-firebase-hooks/auth';

// Components
import Alert from '../components/Alert';
import Copyright from '../components/Copyright';

// MUI
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';

const SignupPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [alertType, setAlertType] = useState(null);

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) navigate('/profile');
  }, [user]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    registerWithEmailAndPassword(
      formState.firstName,
      formState.lastName,
      formState.email,
      formState.password
    );
    if (
      formState.firstName.length &&
      formState.lastName.length &&
      formState.email.length &&
      formState.password.length === 0
    ) {
      setAlertType('error');
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='firstName'
                label='First Name'
                name='firstName'
                value={formState.firstName}
                onChange={handleInputChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                value={formState.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                value={formState.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='password'
                label='Password'
                name='password'
                type='password'
                value={formState.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive marketing promotions and updates via email.'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            value='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2, textTransform: 'none' }}
          >
            Sign Up
          </Button>
          {alertType ? (
            <Alert
              alertType={alertType}
              alertContent='Please enter all required fields'
            />
          ) : null}
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Button
        onClick={signInWithGoogle}
        fullWidth
        variant='outlined'
        sx={{ mt: 3, mb: 2, textTransform: 'none' }}
      >
        <GoogleIcon sx={{ marginRight: '.5rem' }} />
        Continue with Google
      </Button>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default SignupPage;
