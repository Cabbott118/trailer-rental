import { useEffect, useState } from 'react';

// Components
import Alert from 'components/common/Alert';
import WelcomeTile from 'pages/dashboard/components/WelcomeTile';
import NotificationsTile from 'pages/dashboard/components/NotificationsTile';
import CreateTrailerTile from 'pages/dashboard/components/CreateTrailerTile';
import DeleteDialog from 'pages/dashboard/components/DeleteDialog';
import UpdateDialog from 'pages/dashboard/components/UpdateDialog';

// Constants
import routes from 'constants/routes';
import { verifyEmail, verifyIdentity } from 'constants/alertContent';

// Helpers
import getUserInitials from 'services/helpers/getUserInitials';

// MUI
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';

// React Router
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchStripeAccount, fetchUser } from 'store/slices/userSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
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
    <Box sx={{ bgcolor: '#eee', minHeight: '80vh', py: 12 }}>
      <Container maxWidth='lg'>
        {renderAlert(
          !data?.verified?.identity,
          'warning',
          verifyIdentity,
          routes.VERIFY_IDENTITY
        )}
        {renderAlert(
          !data?.verified?.email,
          'warning',
          verifyEmail,
          routes.VERIFY_EMAIL
        )}
        <Typography variant='h1' sx={{ my: 1 }}>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <WelcomeTile userData={data} />
          <CreateTrailerTile userData={data} />
          <NotificationsTile />
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ bgcolor: '#ggg' }}>
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
            <Paper elevation={0} sx={{ bgcolor: '#ggg' }}>
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
