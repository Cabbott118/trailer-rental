import { useEffect, useState } from 'react';

// Components
import Logout from 'components/common/Logout';

// Helpers
import getUserInitials from 'services/helpers/getUserInitials';

// MUI
import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUser,
  deleteUser,
  deleteUserRecord,
  clearData,
} from 'store/slices/userSlice';

export default function Dashboard() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.user);

  document.title = `${data?.legalName?.firstName}'s Dashboard`;

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (data && data.uid) {
      dispatch(fetchUser(data.uid));
    }
  }, []);

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleDeleteAccount = () => {
    dispatch(deleteUser())
      .then(() => {
        dispatch(deleteUserRecord(data.uid));
      })
      .catch((error) => {
        console.log('Error deleting user:', error);
      });
  };

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
          <Grid item sx={{ m: '3rem 0 1rem' }}>
            <Button
              fullWidth
              color='error'
              onClick={handleClickOpenDialog}
              sx={{ textTransform: 'none' }}
            >
              Delete Account
            </Button>
            <Dialog
              open={dialogOpen}
              onClose={handleCloseDialog}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>
                {'Are you sure?'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  If you delete your account, you will lose all your stuff, bro.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseDialog}
                  sx={{ textTransform: 'none' }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  sx={{ textTransform: 'none' }}
                  autoFocus
                >
                  Delete Account
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
