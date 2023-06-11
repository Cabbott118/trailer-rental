import { useState } from 'react';

// Components
import Alert from 'components/common/Alert';
import AuthenticationHeader from 'components/common/AuthenticationHeader';
import AuthenticationFooter from 'components/common/AuthenticationFooter';

// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth, useSigninCheck } from 'reactfire';

// MUI
import { Box, Button, Container, Grid, TextField } from '@mui/material';

// React Router
import { Navigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  authenticateUser,
  authenticateUserSuccess,
  authenticateUserFailure,
} from 'store/slices/userReducer';

export default function Login() {
  const pageName = 'Login';
  document.title = pageName;

  const auth = useAuth();
  const { data: signInCheckResult } = useSigninCheck();

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isAlertShowing, setIsAlertShowing] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(authenticateUser());
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        const userData = {
          email: user.user.email,
          userId: user.user.uid,
        };
        dispatch(authenticateUserSuccess(userData));
      })
      .catch((error) => {
        dispatch(authenticateUserFailure(true));
        setError(error);
        setIsAlertShowing(true);
        setTimeout(() => {
          setIsAlertShowing(false);
        }, 5000);
      });
  };

  const { user, signedIn } = signInCheckResult ?? {};
  if (signedIn) {
    const { uid } = user;
    return <Navigate to={`/user/${uid}/dashboard`} replace />;
  }

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Container maxWidth='xs'>
        <AuthenticationHeader title={pageName} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label='Email'
              variant='outlined'
              fullWidth
              value={email}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Password'
              variant='outlined'
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={password}
              onChange={handlePasswordChange}
            />
          </Grid>
          {isAlertShowing ? (
            <Grid item xs={12}>
              <Alert text='Invalid email or password' severity='error' />
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleClickShowPassword}
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              {!showPassword ? 'Show' : 'Hide'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant='contained'
              type='submit'
              fullWidth
              disabled={loading}
              sx={{ textTransform: 'none' }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
        <AuthenticationFooter type={pageName} />
      </Container>
    </Box>
  );
}
