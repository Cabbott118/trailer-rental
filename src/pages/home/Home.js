import { useEffect, useState } from 'react';

// Assets
import image1 from 'assets/images/image1.jpg';
import image2 from 'assets/images/image2.jpg';
import image3 from 'assets/images/image3.jpg';

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
    dispatch(searchTrailers(searchTerm));
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
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: `url(${image2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(50%)',
        }}
      />
      <Container maxWidth='md' sx={{ pt: 30, position: 'relative' }}>
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
