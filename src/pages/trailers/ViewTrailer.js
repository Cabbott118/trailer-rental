import { useEffect } from 'react';

// Components
import BreadcrumbNavigator from 'components/common/BreadcrumbNavigator';

// Constants
import ROUTES from 'resources/routes-constants';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';
import getUserInitials from 'services/helpers/getUserInitials';

// MUI
import {
  Avatar,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// React Router
import { useLocation } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrailer } from 'store/slices/trailerSlice';

const ViewTrailer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { selectedTrailer, loading } = useSelector((state) => state.trailer);

  const trailer = location.state.trailer;

  const previousPages = [
    {
      name: 'Find trailers',
      route: ROUTES.FIND_TRAILERS,
    },
  ];

  useEffect(() => {
    dispatch(fetchTrailer(trailer?.trailerId));
  }, [dispatch, trailer?.trailerId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container
        maxWidth='md'
        sx={{
          pt: isMobile ? 10 : 20,
          bgcolor: theme.palette.background.default,
        }}
      >
        <BreadcrumbNavigator
          previousPages={previousPages}
          currentPage={selectedTrailer?.type}
          sx={{
            color: theme.palette.primary.contrastText,
          }}
        />
      </Container>
      <Container
        maxWidth='md'
        sx={{
          minHeight: '100vh',
          pt: 3,
          bgcolor: theme.palette.background.default,
        }}
      >
        <CardMedia
          component='img'
          image={selectedTrailer?.imageURL}
          alt={selectedTrailer?.type}
          sx={{ maxWidth: '100%', borderRadius: 3 }}
        />
        <Grid container sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography variant='h3' component='h1' color='text.primary'>
              {selectedTrailer?.type}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color='text.secondary'>
              5 stars | 100 reviews
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color='text.secondary'>
              Polk City, Florida, United States
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container>
          <Grid item xs={12}>
            <Typography color='text.primary'>
              <b>This trailer is a great value.</b> Some additional info about
              values.
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={10}>
            <Typography variant='h5' color='text.primary'>
              Trailer posted by {selectedTrailer?.owner.ownerName.firstName}
            </Typography>
            <Typography color='text.secondary'>
              {formatCreatedAt(selectedTrailer?.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                color: 'text.primary',
              }}
            >
              {getUserInitials(selectedTrailer?.owner.ownerName)}
            </Avatar>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ViewTrailer;
