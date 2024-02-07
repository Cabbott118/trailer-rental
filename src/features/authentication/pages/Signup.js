import { useState } from 'react';

// Components
import Alert from 'components/common/Alert';
import AuthenticationHeader from 'features/authentication/components/AuthenticationHeader';
import AuthenticationFooter from 'features/authentication/components/AuthenticationFooter';

// Constants
import ROUTES from 'resources/routes-constants';
import { USER_TYPE } from 'constants/types';

// Helpers
import passwordMatch from 'services/helpers/passwordMatch';
import errorTransformer from 'constants/errorTransformer';

// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// React Hook Form
import { useForm } from 'react-hook-form';

// React Router
import { Navigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, createUser, clearUserData } from 'store/slices/userSlice';

export default function Signup() {
  const pageName = 'Sign up';
  document.title = pageName;

  const [showPassword, setShowPassword] = useState(false);
  const [passwordMissmatch, setPasswordMissmatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAlertShowing, setIsAlertShowing] = useState(false);
  const [userType, setUserType] = useState(USER_TYPE.RENTER);
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const theme = useTheme();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.user);

  const toggleUserType = (event, newUserType) => {
    if (newUserType === null) {
      setUserType(userType);
    } else {
      setUserType(newUserType);
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const {
      email,
      phoneNumber,
      firstName,
      lastName,
      password,
      confirmPassword,
    } = data;
    if (passwordMatch(password, confirmPassword)) {
      dispatch(clearUserData());
      dispatch(signUpUser({ email, password })).then((action) => {
        if (!action.payload.uid) {
          setErrorMessage(errorTransformer(action.payload));
          setIsAlertShowing(true);
          setTimeout(() => {
            dispatch(clearUserData());
            setIsAlertShowing(false);
          }, 5000);
        } else {
          dispatch(
            createUser({
              email,
              userId: action.payload.uid,
              firstName,
              lastName,
              phoneNumber,
              day: dateOfBirth.$D,
              month: dateOfBirth.$M + 1, // We add one because months are an array
              year: dateOfBirth.$y,
              userType,
            })
          );
        }
      });
    } else {
      setPasswordMissmatch(true);
    }
  };

  if (user) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}
    >
      <Container maxWidth='xs'>
        <AuthenticationHeader title={pageName} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ToggleButtonGroup
              fullWidth
              color='primary'
              value={userType}
              exclusive
              onChange={toggleUserType}
            >
              <ToggleButton
                value={USER_TYPE.RENTER}
                sx={{ textTransform: 'none' }}
              >
                Renter
              </ToggleButton>
              <ToggleButton
                value={USER_TYPE.HOST}
                sx={{ textTransform: 'none' }}
              >
                Host
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              label='First name'
              {...register('firstName', { required: true })}
              error={errors.firstName?.type === 'required'}
              helperText={
                errors.firstName?.type === 'required' &&
                'First name is required'
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Last name'
              {...register('lastName', { required: true })}
              error={errors.lastName?.type === 'required'}
              helperText={
                errors.lastName?.type === 'required' && 'Last name is required'
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type='tel'
              label='Phone number'
              fullWidth
              {...register('phoneNumber', { required: true })}
              error={errors.phoneNumber?.type === 'required'}
              helperText={
                errors.phoneNumber?.type === 'required' &&
                'Phone number is required'
              }
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dateOfBirth}
                onChange={setDateOfBirth}
                label='Date of birth'
              />
            </LocalizationProvider>
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
              error={errors.password?.type === 'required' || passwordMissmatch}
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
              label='Confirm password'
              type='password'
              fullWidth
              {...register('confirmPassword', { required: true })}
              error={
                errors.confirmPassword?.type === 'required' || passwordMissmatch
              }
              helperText={
                (errors.confirmPassword?.type === 'required' &&
                  'Confirm password is required') ||
                (passwordMissmatch === true && 'Passwords do not match')
              }
            />
          </Grid>
          {isAlertShowing && (
            <Grid item xs={12}>
              <Alert text={errorMessage} severity='error' />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              variant='contained'
              type='submit'
              fullWidth
              disabled={loading}
              sx={{
                textTransform: 'none',
                color: theme.palette.secondary.contrastText,
              }}
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
