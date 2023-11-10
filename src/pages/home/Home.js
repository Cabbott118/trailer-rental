import { useEffect, useState } from 'react';

// Assets
import image1 from 'assets/images/image1.jpg';
import image2 from 'assets/images/image2.jpg';
import image3 from 'assets/images/image3.jpg';
import image4 from 'assets/images/image4.jpg';

// MUI
import {
  Box,
  Button,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
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

  const [pickUpDate, setPickUpDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.user);
  const { data: trailerData, loading: trailerLoading } = useSelector(
    (state) => state.trailer
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { searchTerm } = data;
    dispatch(searchTrailers({ searchTerm, pickUpDate, returnDate }));
  };

  useEffect(() => {
    if (data && data.userId) {
      dispatch(fetchUser(data.userId));
    }
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${image4})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth='sm' sx={{ pt: 20 }}>
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
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Typography variant='h6' sx={{ mb: 2 }}>
                What are you looking for?
              </Typography>
              <TextField
                label='Trailer type / location'
                fullWidth
                {...register('searchTerm', { required: true })}
                error={errors.searchTerm?.type === 'required'}
                helperText={
                  errors.searchTerm?.type === 'required' &&
                  'Search term is required'
                }
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
                  value={pickUpDate}
                  onChange={setPickUpDate}
                  label='Pick up date (optional)'
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
                  value={returnDate}
                  onChange={setReturnDate}
                  label='Return date (optional)'
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Grid>
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
