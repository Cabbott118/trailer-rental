import { useEffect } from 'react';

// Components
import Alert from 'components/common/Alert';
import WelcomeCard from 'features/dashboard/components/dashboardCards/WelcomeCard';
import NotificationsCard from 'features/dashboard/components/dashboardCards/NotificationsCard';
import ListTrailerCard from 'features/dashboard/components/dashboardCards/ListTrailerCard';
import DeleteDialog from 'features/dashboard/components/DeleteDialog';

// Constants
import ROUTES from 'resources/routes-constants';

// MUI
import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchStripeAccount, fetchUser } from 'store/slices/userSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { data, stripe, loading } = useSelector((state) => state.user);

  document.title = data?.fullName?.firstName
    ? `${data.fullName.firstName}'s Dashboard`
    : 'Dashboard';

  useEffect(() => {
    if (data && data.userId) {
      dispatch(fetchUser(data?.userId));
      dispatch(fetchStripeAccount(data?.stripeAccountId));
    }
  }, [dispatch]);

  const renderAlert = (condition, severity, text, route) => {
    return condition ? (
      <Alert severity={severity} text={text} route={route} sx={{ my: 1 }} />
    ) : null;
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: '80vh',
        py: 10,
      }}
    >
      <Container maxWidth='lg'>
        {renderAlert(
          !data?.verified?.identity,
          'warning',
          'verifyIdentity',
          ROUTES.VERIFY_IDENTITY
        )}
        {renderAlert(
          !data?.verified?.email,
          'warning',
          'verifyEmail',
          ROUTES.VERIFY_EMAIL
        )}
        <Typography variant='h1' color='text.primary' sx={{ my: 3 }}>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <WelcomeCard userData={data} />
          <ListTrailerCard userData={data} />
          <NotificationsCard />
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ bgcolor: theme.palette.secondary.dark }}>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <TextField
                  label='User Data'
                  multiline
                  fullWidth
                  value={JSON.stringify(data, null, 2)} // Convert JSON to a formatted string
                  variant='outlined'
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ bgcolor: theme.palette.secondary.dark }}>
              {stripe ? (
                <TextField
                  label='Stripe Data'
                  multiline
                  fullWidth
                  value={JSON.stringify(stripe, null, 2)} // Convert JSON to a formatted string
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
      <DeleteDialog
        userId={data?.userId}
        stripeAccountId={data?.stripeAccountId}
      />
    </Box>
  );
}
