import { useEffect } from 'react';

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
    <Container maxWidth='md' sx={{ pt: 10 }}>
      <Grid container component='form' onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={8}>
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
        <Grid item xs={4}>
          <Button
            type='submit'
            variant='outlined'
            fullWidth
            sx={{ textTransform: 'none', height: '100%' }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {/* <Divider sx={{ my: 3 }} />
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
        : null} */}
    </Container>
  );
}
