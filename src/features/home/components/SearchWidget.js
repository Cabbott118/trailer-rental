import { useEffect, useState } from 'react';

// Constants
import ROUTES from 'resources/routes-constants';

// MUI
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// React Router
import { Navigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrailers, filterTrailers } from 'store/slices/trailerSlice';

export default function SearchWidget() {
  document.title = 'Trailer Rental';

  const [inputValue, setInputValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const theme = useTheme();
  const dispatch = useDispatch();

  const { fullTrailerList, loading } = useSelector((state) => state.trailer);

  useEffect(() => {
    if (!fullTrailerList || fullTrailerList.length === 0) {
      dispatch(fetchTrailers());
    }
  }, []);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const options = fullTrailerList
    .map((trailer) => trailer.location.city)
    .filter((city, index, self) => self.indexOf(city) === index);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { location } = data;
    dispatch(filterTrailers({ location }));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <Navigate to={ROUTES.FIND_TRAILERS} />;
  }

  return (
    <Grid
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      item
      xs={12}
      container
      sx={{
        bgcolor: theme.additionalPalette.primary,
        p: 3,
        mt: 3,
        borderRadius: 3,
      }}
    >
      <Grid item xs={12} sx={{ mb: 1 }}>
        <Typography variant='h6' color={theme.palette.primary.contrastText}>
          Where would you like to search?
        </Typography>
        <Typography
          variant='caption'
          color={theme.palette.primary.contrastText}
        >
          Our results will display trailers within a 50 mile radius
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: 3 }}>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Trailer location'
              fullWidth
              {...register('location', { required: true })}
              error={errors.location?.type === 'required'}
              helperText={
                errors.location?.type === 'required' && 'Location is required'
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          type='submit'
          variant='contained'
          fullWidth
          sx={{
            textTransform: 'none',
            height: '100%',
            color: theme.palette.secondary.contrastText,
          }}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
