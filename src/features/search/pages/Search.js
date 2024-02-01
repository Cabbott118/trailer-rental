// Components
import FilterTrailers from 'features/search/components/FilterTrailers';

// Constants
import ROUTES from 'resources/routes-constants';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';

// MUI
import {
  CardMedia,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

export default function Search() {
  document.title = 'Trailer Rental';

  const { filteredList, searchedLocation, searchedType, loading } = useSelector(
    (state) => state.trailer
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleNavigateToTrailer = (trailer) => {
    navigate(ROUTES.VIEW_TRAILER.replace(':uid', trailer?.trailerId), {
      state: { trailer },
    });
  };

  return (
    <Container
      maxWidth='md'
      sx={{
        pt: isMobile ? 10 : 12,
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        component='h1'
        color={theme.palette.primary.contrastText}
      >
        Search Trailers
      </Typography>
      <FilterTrailers />
      {loading ? (
        <p>Loading..</p>
      ) : filteredList.length > 0 ? (
        <Grid container spacing={6}>
          {filteredList.map((trailer) => (
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
                      color='text.primary'
                      sx={{ fontWeight: 500 }}
                    >
                      {trailer?.type}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      align='right'
                      color='text.primary'
                      sx={{ pt: 1 }}
                    >
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
      ) : (
        <Grid container justifyContent='center'>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography
              variant='body1'
              component='h1'
              color='text.primary'
              sx={{ py: 3 }}
            >
              {searchedLocation
                ? "We couldn't find any trailers that matched your search"
                : ''}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
