import { useEffect } from 'react';

// Components
import WriteReviewDialog from 'features/profile/components/WriteReviewDialog';

// Constants
import ROUTES from 'resources/routes-constants';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';
import getIdFromPath from 'services/helpers/getIdFromPath';

// MUI
import {
  Box,
  Container,
  Grid,
  Paper,
  Rating,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

// React Router
import { useLocation, useNavigate } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProfile,
  fetchTrailersOwnedBy,
  fetchReviewsWrittenFor,
} from 'store/slices/profileSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const { profile, trailers, reviews, loading, error } = useSelector(
    (state) => state.profile
  );

  const { user } = useSelector((state) => state.user);

  const { pathname } = location;

  useEffect(() => {
    dispatch(fetchProfile(getIdFromPath(pathname)));
    dispatch(fetchTrailersOwnedBy(getIdFromPath(pathname)));
    dispatch(fetchReviewsWrittenFor(getIdFromPath(pathname)));
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) {
    return navigate(ROUTES.ERROR);
  }

  return (
    <Box sx={{ minHeight: '80vh', py: 12 }}>
      <Container maxWidth='md'>
        <Typography variant='h6' component='h1' color='text.primary'>
          Profile
        </Typography>
        <Grid container spacing={1} sx={{ my: 3 }}>
          <Grid item xs={12}>
            <Typography variant='body1' color='text.primary'>
              {profile?.fullName?.firstName} {profile?.fullName?.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' color='text.primary'>
              {profile?.userType}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' color='text.primary'>
              Member since: {formatCreatedAt(profile?.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' color='text.primary'>
              Number of trailers listed: {trailers?.length}
            </Typography>
          </Grid>
          {reviews.list.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant='body1' color='text.primary'>
                {reviews.message}
              </Typography>
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                <Typography variant='body1' color='text.primary'>
                  Number of reviews: {reviews?.length}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='body1' color='text.primary'>
                  Average rating:{' '}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Rating
                  readOnly
                  name='simple-controlled'
                  precision={0.1}
                  value={reviews?.rating}
                  sx={{ color: theme.palette.primary.main }}
                />
              </Grid>
            </>
          )}
        </Grid>

        {getIdFromPath(pathname) !== user?.userId && (
          <WriteReviewDialog profileId={getIdFromPath(pathname)} />
        )}
      </Container>

      {/* Temporary display of reviews and trailers */}
      <Container maxWidth='sm' sx={{ pt: 10 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ bgcolor: theme.palette.secondary.dark }}>
              {reviews ? (
                <TextField
                  label='Reviews'
                  multiline
                  fullWidth
                  value={JSON.stringify(reviews, null, 2)} // Convert JSON to a formatted string
                  variant='outlined'
                  InputProps={{
                    readOnly: true,
                  }}
                />
              ) : null}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ bgcolor: theme.palette.secondary.dark }}>
              {trailers ? (
                <TextField
                  label='Trailers'
                  multiline
                  fullWidth
                  value={JSON.stringify(trailers, null, 2)} // Convert JSON to a formatted string
                  variant='outlined'
                  InputProps={{
                    readOnly: true,
                  }}
                />
              ) : null}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
