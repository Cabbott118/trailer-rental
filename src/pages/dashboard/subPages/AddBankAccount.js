import { useState } from 'react';

// Constants
import routes from 'constants/routes';
import states from 'constants/states.json';

// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// React Hook Form
import { useForm } from 'react-hook-form';

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'store/slices/userSlice';

const AddBankAccount = () => {
  const [value, setValue] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);
  const userId = data?.userId;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //   const handleDateChange = (date) => {
  //     setSelectedDate(date);
  //   };

  const onSubmit = (data) => {
    console.log(data);
    console.log(value);
    const {
      accountHolderName,
      accountNumber,
      accountRoutingNumber,
      billingAddress,
      billingCity,
      billingState,
      billingZipCode,
      lastFourOfSSN,
    } = data;
    const updateData = {};

    // dispatch(updateUser({ userId, updateData })).then(() => {
    //   navigate(routes.DASHBOARD);
    // });
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{ bgcolor: '#eee', minHeight: '80vh', py: 12 }}
    >
      <Container maxWidth='md'>
        <Typography variant='h1' sx={{ my: 1 }}>
          Add bank account
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant='h6'>Account information</Typography>
              <Typography variant='body2' color='textSecondary'>
                Provide details for the account you'd like money deposited to.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Account holder name'
                fullWidth
                {...register('accountHolderName', { required: true })}
                error={errors.accountHolderName?.type === 'required'}
                helperText={
                  errors.accountHolderName?.type === 'required' &&
                  'Account holder name is required'
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Account number'
                fullWidth
                {...register('accountNumber', { required: true })}
                error={errors.accountNumber?.type === 'required'}
                helperText={
                  errors.accountNumber?.type === 'required' &&
                  'Account number is required'
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Routing number'
                fullWidth
                {...register('accountRoutingNumber', { required: true })}
                error={errors.accountRoutingNumber?.type === 'required'}
                helperText={
                  errors.accountRoutingNumber?.type === 'required' &&
                  'Routing number is required'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Billing information</Typography>
              <Typography variant='body2' color='textSecondary'>
                Provide details for the billing address.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Address'
                fullWidth
                {...register('billingAddress', { required: true })}
                error={errors.billingAddress?.type === 'required'}
                helperText={
                  errors.billingAddress?.type === 'required' &&
                  'Billing address is required'
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='City'
                fullWidth
                {...register('billingCity', { required: true })}
                error={errors.billingCity?.type === 'required'}
                helperText={
                  errors.billingCity?.type === 'required' &&
                  'Billing city is required'
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='State'
                select
                fullWidth
                defaultValue={''}
                {...register('billingState', { required: true })}
                error={errors.billingState === 'required'}
                helperText={
                  errors.billingState === 'required' && 'State is required'
                }
              >
                {states.map((state) => (
                  <MenuItem key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Zip code'
                fullWidth
                {...register('billingZipCode', { required: true })}
                error={errors.billingZipCode?.type === 'required'}
                helperText={
                  errors.billingZipCode?.type === 'required' &&
                  'Billing zip code is required'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Additional information</Typography>
              <Typography variant='body2' color='textSecondary'>
                Our payment processing software requires a couple more items
                from you.
              </Typography>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                label='Date of birth'
                fullWidth
                {...register('dateOfBirth', { required: true })}
                error={errors.dateOfBirth?.type === 'required'}
                helperText={
                  errors.dateOfBirth?.type === 'required' &&
                  'Date of birth is required'
                }
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={value} onChange={setValue} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Last 4 digits of Social Security Number (SSN)'
                fullWidth
                {...register('lastFourOfSSN', {
                  required: 'The last 4 of your SSN is required',
                  pattern: {
                    value: /^\d{1,4}$/,
                    message: 'Enter a valid 4-digit number',
                  },
                })}
                error={errors.lastFourOfSSN ? true : false}
                helperText={errors.lastFourOfSSN?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                type='submit'
                disabled={loading}
                sx={{ textTransform: 'none' }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddBankAccount;
