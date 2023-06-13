import { useEffect, useState } from 'react';

// Components
import Alert from 'components/common/Alert';
import AuthenticationHeader from 'components/common/AuthenticationHeader';
import AuthenticationFooter from 'components/common/AuthenticationFooter';

// MUI
import { Box, Button, Container, Grid, TextField } from '@mui/material';

// React Router
import { Navigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, createUser, clearData } from 'store/slices/userSlice';

export default function Signup() {
  const pageName = 'Sign up';
  document.title = pageName;

  const dispatch = useDispatch();
  const { data, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAlertShowing, setIsAlertShowing] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLasttNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(clearData());
    dispatch(signUpUser({ email, password }));
  };

  useEffect(() => {
    if (error) {
      setIsAlertShowing(true);
      setTimeout(() => {
        setIsAlertShowing(false);
      }, 5000);
    }
  }, [error]);

  useEffect(() => {
    if (data?.uid) {
      const legalName = {
        firstName,
        lastName,
      };
      dispatch(createUser({ email, uid: data.uid, legalName }));
    }
  }, [data]);

  if (isAuthenticated) {
    console.log(data);
    const { uid } = data;
    return <Navigate to={`/user/${uid}/dashboard`} replace />;
  }

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Container maxWidth='xs'>
        <AuthenticationHeader title={pageName} />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              id='firstName'
              label='First Name'
              name='firstName'
              type='text'
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id='lastName'
              label='Last Name'
              name='lastName'
              type='text'
              value={lastName}
              onChange={handleLasttNameChange}
            />
          </Grid>

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
              InputProps={{
                endAdornment: (
                  <Button
                    variant='text'
                    color='secondary'
                    onClick={handleClickShowPassword}
                    sx={{ textTransform: 'none' }}
                  >
                    {!showPassword ? 'Show' : 'Hide'}
                  </Button>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Confirm Password'
              variant='outlined'
              type='password'
              fullWidth
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Grid>
          {isAlertShowing && (
            <Grid item xs={12}>
              <Alert text='Please fill out required fields' severity='error' />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              variant='contained'
              type='submit'
              fullWidth
              disabled={loading}
              sx={{ textTransform: 'none' }}
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
        <AuthenticationFooter type={pageName} />
      </Container>
    </Box>
  );
}
