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
  useTheme,
} from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';
import { searchTrailers } from 'store/slices/trailerSlice';

export default function Home() {
  document.title = 'Trailer Rental';

  const theme = useTheme();

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

  // const headingStyle = {
  //   textTransform: 'uppercase',
  //   fontWeight: '700',
  //   fontSize: '4rem',
  //   [theme.breakpoints.down('sm')]: {
  //     fontSize: '2rem',
  //   },
  // };

  // const subHeadingStyle = {
  //   color: theme.palette.primary.contrastText,
  //   my: '1.5rem',
  //   fontSize: '2rem',
  //   [theme.breakpoints.down('sm')]: {
  //     fontSize: '1.5rem',
  //   },
  // };

  if (loading) return <p>Loading...</p>;

  return (
    <Container maxWidth='md'>
      {/* <Box
        sx={{
          minHeight: '15rem',
          py: '3rem',
          backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
        }}
      >
        <Container maxWidth='md'>
          {data?.fullName?.firstName ? (
            <Typography
              variant='h6'
              component='h1'
              align='center'
              sx={{ color: theme.palette.primary.contrastText }}
            >
              Welcome, <i>{data?.fullName?.firstName}</i>
            </Typography>
          ) : null}
          <Typography
            variant='h1'
            component='h1'
            align='center'
            color='primary'
            sx={headingStyle}
          >
            This is a template
          </Typography>
          <Typography
            variant='h4'
            component='h4'
            align='center'
            sx={subHeadingStyle}
          >
            Created by <b>Caleb Abbott</b>, this template is intended to be
            cloned to quickly develop web apps using the following techs:
          </Typography>
          <Typography color='primary'>
            <code>
              React, Firebase (Hosting, Firestore, & Authentication),
              Material-UI (MUI), Redux & Redux-Toolkit, React-rotuer, Axios, and
              Dotenv
            </code>
          </Typography>
        </Container>
      </Box> */}
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
  );
}
