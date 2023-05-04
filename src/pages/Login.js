import React, { useEffect, useState } from 'react';

// React-Router
import { useNavigate } from 'react-router-dom';

// Firebase
import { auth } from '../utility/firebase';
import { loginWithEmailAndPassword } from '../functions/auth/loginWithEmailAndPassword';
import { signInWithGoogle } from '../functions/auth/signInWithGoogle';

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

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [alertType, setAlertType] = useState(null);

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) navigate('/profile');
  }, [user, loading]);

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
    loginWithEmailAndPassword(formState.email, formState.password);
    if (formState.email.length && formState.password.length === 0) {
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
          Login{' '}
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            value={formState.email}
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='password'
            label='Password'
            name='password'
            type='password'
            autoComplete='current-password'
            value={formState.password}
            onChange={handleInputChange}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2, textTransform: 'none' }}
          >
            Login
          </Button>
          {alertType ? (
            <Alert
              alertType={alertType}
              alertContent='Please enter all required fields'
            />
          ) : null}
          <Grid container>
            <Grid item xs>
              <Link href='/forgot-password' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/signup' variant='body2'>
                Don't have an account? Sign Up
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
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default LoginPage;
