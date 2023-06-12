import { useEffect } from 'react';

// Components
import Logout from 'components/common/Logout';

// Helpers
import getUserInitials from 'services/helpers/getUserInitials';

// MUI
import {
  Avatar,
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

  document.title = `${data?.legalName?.firstName}'s Dashboard`;

  useEffect(() => {
    if (data && data.uid) {
      dispatch(fetchUser(data.uid));
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
              alt={data?.legalName?.firstName}
              sx={{
                width: 100,
                height: 100,
                bgcolor: theme.palette.primary.main,
                mb: '-4rem',
              }}
            >
              {getUserInitials(data?.legalName)}
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
              <Typography
                variant='h4'
                component='h1'
                sx={{ color: theme.palette.secondary.dark }}
              >
                {data?.legalName?.firstName} {data?.legalName?.lastName}
              </Typography>
            ) : (
              <Skeleton variant='rounded' width='15rem' height='4rem' />
            )}
          </Grid>
          <Grid item>
            <Typography
              variant='p'
              component='p'
              sx={{ color: theme.palette.secondary.main }}
            >
              {data?.email}
            </Typography>
          </Grid>
          <Grid item sx={{ m: '3rem 0 1rem' }}>
            <Logout />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
