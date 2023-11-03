import { useEffect, useState } from 'react';

// Components
import DeleteDialog from 'pages/dashboard/components/DeleteDialog';
import UpdateDialog from 'pages/dashboard/components/UpdateDialog';
import Logout from 'components/common/Logout';

// Helpers
import getUserInitials from 'services/helpers/getUserInitials';

// MUI
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';

export default function Dashboard() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.user);

  document.title = data?.legalName?.firstName
    ? `${data.legalName.firstName}'s Dashboard`
    : 'Dashboard';

  useEffect(() => {
    if (data && data.userId) {
      dispatch(fetchUser(data.userId));
    }
  }, []);

  return (
    <Container maxWidth='sm'>
      <Paper>
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          sx={{ bgcolor: theme.palette.primary.light, borderRadius: '4px' }}
        >
          <Grid
            item
            sx={{
              my: '1rem',
            }}
          >
            <Avatar
              alt={data?.fullName?.firstName}
              sx={{
                width: 100,
                height: 100,
                bgcolor: theme.palette.primary.main,
                fontWeight: 500,
                fontSize: 30,
                mb: '-4rem',
              }}
            >
              {getUserInitials(data?.fullName)}
            </Avatar>
          </Grid>
        </Grid>
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          sx={{ mt: '3rem' }}
        >
          <Grid
            item
            sx={{
              mt: '1rem',
            }}
          >
            {!loading ? (
              <Typography variant='h1'>
                {data?.fullName?.firstName} {data?.fullName?.lastName}
              </Typography>
            ) : (
              <Skeleton variant='rounded' width='15rem' height='4rem' />
            )}
          </Grid>
          <Grid item>
            <Typography variant='p' component='p'>
              {data?.email}
            </Typography>
          </Grid>
          <Grid item sx={{ m: '3rem 0 1rem' }}>
            <UpdateDialog userId={data?.userId} />
          </Grid>
          <Grid item sx={{ m: '3rem 0 1rem' }}>
            <DeleteDialog userId={data?.userId} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
