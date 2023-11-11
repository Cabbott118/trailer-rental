import { useEffect, useState } from 'react';

// Assets
import image1 from 'assets/images/image1.jpg';
import image2 from 'assets/images/image2.jpg';
import image3 from 'assets/images/image3.jpg';
import image4 from 'assets/images/image4.jpg';

// Components
import Alert from 'components/common/Alert';

// Constants
import types from 'constants/trailer.json';

// Day JS
import dayjs from 'dayjs';

// MUI
import {
  Box,
  Button,
  CardMedia,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import theme from 'styles/theme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// React Hook Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';
import { searchTrailers } from 'store/slices/trailerSlice';

export default function Home() {
  document.title = 'Trailer Rental';

  const [pickUpDate, setPickUpDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [dateError, setDateError] = useState(false);

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.user);
  const { data: trailerData, loading: trailerLoading } = useSelector(
    (state) => state.trailer
  );

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { location, type } = data;
    console.log(pickUpDate < returnDate);
    if (pickUpDate <= returnDate) {
      dispatch(searchTrailers({ location, type, pickUpDate, returnDate }));
    } else {
      setDateError(true);
    }
  };

  useEffect(() => {
    if (data && data.userId) {
      dispatch(fetchUser(data.userId));
    }
  }, []);

  useEffect(() => {
    if (pickUpDate > returnDate && returnDate !== null) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  }, [pickUpDate, returnDate]);

  if (loading) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${image4})`,
        bgcolor: '#888',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth='sm' sx={{ pt: isMobile ? 15 : 20 }}>
        <Grid container component='form' onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12}>
            <Typography variant='h1' color='primary'>
              Trailer Rental
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6' color={theme.palette.primary.contrastText}>
              A modern solution for all your trailer rental needs
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            sx={{ bgcolor: '#fff', p: 3, mt: 3, borderRadius: 3 }}
          >
            <Grid item xs={12} sx={{ mb: 1 }}>
              <Typography variant='h6'>
                Where would you like to search?
              </Typography>
              <Typography variant='caption'>
                Our results will display trailers within a 50 mile radius
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <TextField
                label='Trailer location'
                fullWidth
                {...register('location', { required: true })}
                error={errors.location?.type === 'required'}
                helperText={
                  errors.location?.type === 'required' && 'Location is required'
                }
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <TextField
                label='Trailer type (optional)'
                select
                fullWidth
                defaultValue={''}
                {...register(
                  'type'
                  // { required: true }
                )}
                // error={errors.type === 'required'}
                // helperText={
                //   errors.type === 'required' && 'Trailer type is required'
                // }
              >
                {types.map((type) => (
                  <MenuItem key={type.name} value={type.name}>
                    {type.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <Typography variant='h6'>
                What dates are you looking to rent?
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ mb: 3, pr: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
                  value={dayjs(pickUpDate)} // Convert pickUpDate to Dayjs
                  onChange={(date) => setPickUpDate(date.toDate())} // Convert Dayjs back to JavaScript Date
                  label='Pick up date'
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} sx={{ mb: 3, pl: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
                  value={returnDate ? dayjs(returnDate) : null} // Convert returnDate to Dayjs
                  onChange={(date) =>
                    setReturnDate(date ? date.toDate() : null)
                  } // Convert Dayjs back to JavaScript Date
                  label='Return date'
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Grid>
            {dateError && (
              <Grid item xs={12} sx={{ mb: 3 }}>
                <Alert
                  text='Pick up date must be a date before or equal to Return date'
                  severity='error'
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                sx={{ textTransform: 'none', height: '100%' }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        {trailerData
          ? trailerData.map((trailer, index) => (
              <Paper key={index} elevation={3} sx={{ my: 1, p: 2 }}>
                <CardMedia
                  image={trailer.imageURL}
                  component='img'
                  height='300'
                  alt={trailer.type}
                  sx={{ borderRadius: 3 }}
                />
                {trailer.type}
              </Paper>
            ))
          : null}
      </Container>
    </Box>
  );
}
