import { useEffect, useState } from 'react';

// Components
import Alert from 'components/common/Alert';
import AuthenticationHeader from 'pages/auth/components/AuthenticationHeader';
import AuthenticationFooter from 'pages/auth/components/AuthenticationFooter';

// Constants
import routes from 'constants/routes';
import types from 'constants/user';

// Helpers
import passwordMatch from 'services/helpers/passwordMatch';
import errorTransformer from 'constants/errorTransformer';

// MUI
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import theme from 'styles/theme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// MUI Tel Input
import { MuiTelInput } from 'mui-tel-input';

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
  const [userType, setUserType] = useState(types.RENTER);
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

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

  if (data) {
    return <Navigate to={routes.HOME} replace />;
  }

  const renderUserTypeContent = () => {
    if (userType === types.RENTER) {
      return (
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: '#eee' }}>
            <Typography>Renter</Typography>
          </Paper>
        </Grid>
      );
    } else if (userType === types.HOST) {
      return (
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: '#eee' }}>
            <Typography>Host</Typography>
          </Paper>
        </Grid>
      );
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
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
              <ToggleButton value={types.RENTER} sx={{ textTransform: 'none' }}>
                Renter
              </ToggleButton>
              <ToggleButton value={types.HOST} sx={{ textTransform: 'none' }}>
                Host
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {renderUserTypeContent()}
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
