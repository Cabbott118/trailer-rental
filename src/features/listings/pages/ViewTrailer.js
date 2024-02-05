import { useEffect } from 'react';

// Components
import BreadcrumbNavigator from 'components/common/BreadcrumbNavigator';
import CreateReservation from 'features/reservations/components/CreateReservationDialog';
import ViewTrailerLoader from 'features/listings/loaders/ViewTrailerLoader';

// Constants
import ROUTES from 'resources/routes-constants';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';
import getUserInitials from 'services/helpers/getUserInitials';
import getIdFromPath from 'services/helpers/getIdFromPath';

// MUI
import {
  Avatar,
  CardMedia,
  Container,
  Divider,
  Grid,
  Item,
  Link,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// React Router
import { useLocation, useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchReservationsAssignedToTrailer,
  fetchTrailer,
} from 'store/slices/trailerSlice';
import { fetchReviewsWrittenFor } from 'store/slices/reviewSlice';

const ViewTrailer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    selectedTrailer,
    loading: trailerLoading,
    error,
  } = useSelector((state) => state.trailer);

  const { reviews, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  const { pathname } = location;
  const previousPages = [
    {
      name: 'Find trailers',
      route: ROUTES.FIND_TRAILERS,
    },
  ];

  useEffect(() => {
    dispatch(fetchTrailer(getIdFromPath(pathname))).then((trailerAction) => {
      const trailer = trailerAction.payload;
      if (trailer) {
        dispatch(fetchReviewsWrittenFor(trailer?.owner?.ownerId));
        dispatch(fetchReservationsAssignedToTrailer(trailer?.trailerId));
      }
    });
  }, [dispatch, pathname]);

  if (trailerLoading || profileLoading) {
    return <ViewTrailerLoader />;
  }

  if (error) {
    return navigate(ROUTES.ERROR);
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
          sx={{
            maxWidth: '100%',
            height: isMobile ? '250px' : '300px',
            borderRadius: 3,
          }}
        />
        <Grid container sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography variant='h4' component='h1' color='text.primary'>
              {selectedTrailer?.type} trailer
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' color='text.secondary'>
              {selectedTrailer?.location?.city},{' '}
              {selectedTrailer?.location?.state}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
          >
            {reviews?.rating === null ? (
              <Typography variant='body1' color='text.secondary'>
                No rating yet
              </Typography>
            ) : (
              <>
                <Rating
                  readOnly
                  precision={0.1}
                  value={reviews?.rating}
                  size='small'
                  sx={{ color: theme.palette.primary.main, pr: 0.5 }}
                />
                <Typography variant='body1' color='text.secondary'>
                  {' | '} {reviews?.length}{' '}
                  {reviews?.length === 1 ? 'Review' : 'Reviews'}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='body1' color='text.primary'>
              <b>This trailer is a great value.</b> Some additional info about
              values.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CreateReservation
              trailerId={selectedTrailer?.trailerId}
              ownerId={selectedTrailer?.owner?.ownerId}
              reservations={selectedTrailer?.reservations}
              trailerLoading={trailerLoading}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={10}>
            <Typography variant='body1' color='text.primary'>
              Trailer posted by{' '}
              <Link
                href={ROUTES.PROFILE.replace(
                  ':uid',
                  selectedTrailer?.owner?.ownerId
                )}
              >
                {selectedTrailer?.owner.ownerName.firstName}
              </Link>
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Added on {formatCreatedAt(selectedTrailer?.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                color: '#fff',
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
