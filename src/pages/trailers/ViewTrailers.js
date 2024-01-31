import { useEffect } from 'react';

// Constants
import ROUTES from 'resources/routes-constants';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';

// MUI
import { CardMedia, Container, Grid, Typography } from '@mui/material';
// import StarIcon from '@mui/icons-material/Star';

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrailers } from 'store/slices/trailerSlice';

const ViewTrailers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { trailerList, loading } = useSelector((state) => state.trailer);

  useEffect(() => {
    dispatch(fetchTrailers());
  }, [dispatch]);

  const handleNavigateToTrailer = (trailer) => {
    navigate(ROUTES.VIEW_TRAILER, { state: { trailer } });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (trailerList && trailerList.length > 0) {
    return (
      <div>
        <Typography variant='h1' align='center' sx={{ my: 3 }}>
          View trailers
        </Typography>
        <Container maxWidth='md' sx={{ mb: 3 }}>
          <Grid container spacing={6}>
            {trailerList.map((trailer) => (
              <Grid item key={trailer?.trailerId} xs={12} md={6}>
                <Grid
                  container
                  spacing={1}
                  onClick={() => handleNavigateToTrailer(trailer)}
                  sx={{ cursor: 'pointer' }}
                >
                  <Grid item xs={12}>
                    <CardMedia
                      component='img'
                      height='300'
                      image={trailer.imageURL}
                      alt={trailer.type}
                      sx={{ borderRadius: 3 }}
                    />
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={10}>
                      <Typography
                        gutterBottom
                        variant='h5'
                        sx={{ fontWeight: 500 }}
                      >
                        {trailer?.type}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography align='right' sx={{ pt: 1 }}>
                        $499.00
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='body2' color='text.secondary'>
                        {trailer.owner.ownerName.firstName}{' '}
                        {trailer.owner.ownerName.lastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='body2' color='text.secondary'>
                        {formatCreatedAt(trailer?.createdAt)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <Typography
          variant='h4'
          component='h1'
          align='center'
          sx={{ py: 3, fontSize: 32 }}
        >
          No trailers found
        </Typography>
      </div>
    );
  }
};

export default ViewTrailers;
