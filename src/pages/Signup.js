import { useEffect, useState } from 'react';

// Components
import Alert from 'components/common/Alert';
import AuthenticationHeader from 'components/common/AuthenticationHeader';
import AuthenticationFooter from 'components/common/AuthenticationFooter';

// Constants
import routes from 'constants/routes';

// MUI
import { Box, Button, Container, Grid, TextField } from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// React Router
import { Navigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, createUser, clearData } from 'store/slices/userSlice';

export default function Signup() {
  const pageName = 'Sign up';
  document.title = pageName;

  const [showPassword, setShowPassword] = useState(false);
  const [isAlertShowing, setIsAlertShowing] = useState(false);

  const dispatch = useDispatch();
  const { data, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    dispatch(clearData());
    dispatch(signUpUser({ email, password }));
  };

  useEffect(() => {
    if (error) {
      setIsAlertShowing(true);
      setTimeout(() => {
        dispatch(clearData());
        setIsAlertShowing(false);
      }, 5000);
    }
  }, [error]);

  useEffect(() => {
    if (data?.uid) {
      const { email, legalName } = getValues();
      dispatch(createUser({ email, uid: data.uid, legalName }));
    }
  }, [data]);

  if (isAuthenticated) {
    const { uid } = data;
    return <Navigate to={routes.HOME} replace />;
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <AuthenticationHeader title={pageName} />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label='First Name'
              {...register('legalName.firstName', { required: true })}
              error={errors.legalName?.firstName?.type === 'required'}
              helperText={
                errors.legalName?.firstName?.type === 'required' &&
                'First name is required'
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Last Name'
              {...register('legalName.lastName', { required: true })}
              error={errors.legalName?.lastName?.type === 'required'}
              helperText={
                errors.legalName?.lastName?.type === 'required' &&
                'Last name is required'
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Email'
              fullWidth
              {...register('email', { required: true })}
              error={errors.email?.type === 'required'}
              helperText={
                errors.email?.type === 'required' && 'Email is required'
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Password'
              type={showPassword ? 'text' : 'password'}
              fullWidth
              {...register('password', { required: true })}
              error={errors.password?.type === 'required'}
              helperText={
                errors.password?.type === 'required' && 'Password is required'
              }
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
              type='password'
              fullWidth
              {...register('confirmPassword', { required: true })}
              error={errors.confirmPassword?.type === 'required'}
              helperText={
                errors.confirmPassword?.type === 'required' &&
                'Confirm password is required'
              }
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
