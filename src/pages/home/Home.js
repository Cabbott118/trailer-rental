import { useEffect } from 'react';

// Assets
// import image from 'assets/images/image1.jpg';
// import image from 'assets/images/image2.jpg';
// import image from 'assets/images/image3.jpg';
import image from 'assets/images/image4.jpg';

// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import theme from 'styles/theme';

// React Hook Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';
import { searchTrailers } from 'store/slices/trailerSlice';

export default function Home() {
  document.title = 'Trailer Rental';

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.user);
  const { searchedList } = useSelector((state) => state.trailer);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { location } = data;
    dispatch(searchTrailers({ location }));
  };

  const getSearchLabel = () => {
    if (searchedList.length > 1) {
      return `Found ${searchedList.length} trailers`;
    } else if (searchedList.length === 0) {
      return 'No trailers found';
    } else {
      return 'Found nothing';
    }
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
        backgroundImage: `url(${image})`,
        bgcolor: '#888',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Negative margin is to offset the Navbar margin
        mt: -12,
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
        <Paper elevation={0} sx={{ bgcolor: '#ggg' }}>
          {(searchedList.length !== 0 ||
            (searchedList.message && searchedList.message.trim() !== '')) && (
            <TextField
              label={getSearchLabel()}
              multiline
              fullWidth
              value={JSON.stringify(searchedList, null, 2)}
              variant='outlined'
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        </Paper>
      </Container>
    </Box>
  );
}
