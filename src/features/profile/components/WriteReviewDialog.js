import { useState } from 'react';

// Components
import Alert from 'components/common/Alert';

// Constants
import ROUTES from 'resources/routes-constants';

// Helpers
import errorTransformer from 'constants/errorTransformer';

// MUI
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  useTheme,
} from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createReview, clearErrors } from 'store/slices/reviewSlice';

const WriteReviewDialog = ({ profileId }) => {
  const [isAlertShowing, setIsAlertShowing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const handleClickOpenDialog = () => {
    // dispatch(clearErrors());
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAlertShowing(false);
    dispatch(clearErrors());
    setDialogOpen(false);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { reviewBody, reviewRating } = data;

    dispatch(
      createReview({
        writtenById: user?.userId,
        writtenByFirstName: user?.fullName?.firstName,
        writtenByLastName: user?.fullName?.lastName,
        writtenFor: profileId,
        reviewBody,
        reviewRating,
      })
    ).then((action) => {
      if (action.error) {
        setIsAlertShowing(true);
      } else {
        setDialogOpen(false);
      }
    });
  };

  return (
    <>
      <Button
        fullWidth
        variant='contained'
        color='primary'
        onClick={handleClickOpenDialog}
        sx={{
          textTransform: 'none',
          color: theme.palette.secondary.contrastText,
        }}
      >
        Write a Review
      </Button>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          <Container maxWidth='xs'>
            <DialogTitle>{'Write a Review'}</DialogTitle>
            <DialogContent>
              Review for: {profileId}
              <Grid container sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField label='Rating' {...register('reviewRating')} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Review'
                    multiline
                    rows={4}
                    {...register('reviewBody')}
                  />
                </Grid>
                {isAlertShowing && (
                  <Grid item xs={12}>
                    <Alert text={error} severity='error' />
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions sx={{ pb: 3 }}>
              <Button
                onClick={handleCloseDialog}
                sx={{ textTransform: 'none' }}
              >
                Close
              </Button>
              <Button
                type='submit'
                variant='contained'
                disabled={loading}
                sx={{
                  textTransform: 'none',
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </Container>
        </Box>
      </Dialog>
    </>
  );
};

export default WriteReviewDialog;
