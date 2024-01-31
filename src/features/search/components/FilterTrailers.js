import { useEffect } from 'react';

// Components
import FilterTrailersLoader from 'features/search/loaders/FilterTrailersLoader';

// Constants
import trailerTypes from 'constants/trailer.json';

// MUI
import { Button, Grid, MenuItem, TextField } from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { filterTrailers } from 'store/slices/trailerSlice';

export default function FilterTrailers() {
  const dispatch = useDispatch();

  const { searchedLocation, searchedType, loading } = useSelector(
    (state) => state.trailer
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { location, type } = data;
    dispatch(filterTrailers({ location, type }));
  };

  useEffect(() => {}, [searchedLocation, searchedType]);

  if (loading) return <FilterTrailersLoader />;

  return (
    <Grid
      container
      component='form'
      spacing={1}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ py: 3 }}
    >
      <Grid item xs={12}>
        <TextField
          label='Location'
          fullWidth
          defaultValue={searchedLocation}
          {...register('location', { required: true })}
          error={errors.location === 'required'}
          helperText={errors.location === 'required' && 'Location is required'}
          sx={{ my: 1 }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label='Trailer type'
          select
          fullWidth
          defaultValue={searchedType ? searchedType : ''}
          {...register('type')}
        >
          {trailerTypes.map((type) => (
            <MenuItem key={type.name} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 1, textTransform: 'none' }}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
