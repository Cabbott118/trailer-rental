import React, { useState } from 'react';

// Components
import Alert from 'components/common/Alert';

// Day JS
import dayjs from 'dayjs';

// Helpers
import { isDateBlocked, renderDay } from 'services/helpers/dateBlocker';

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
  Rating,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// React Hook Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createReservation, clearErrors } from 'store/slices/reservationSlice';

const CreateReservationDialog = ({
  trailerId,
  ownerId,
  reservations,
  trailerLoading,
}) => {
  const [isAlertShowing, setIsAlertShowing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
  };

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
    // const { startDate, endDate } = data;
    const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
    const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');
    dispatch(
      createReservation({
        trailerId,
        ownerId,
        renterId: user?.userId,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      })
    ).then((action) => {
      if (action.error) {
        console.log(action.error);
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
        disabled={trailerLoading}
        sx={{
          textTransform: 'none',
          color: theme.palette.secondary.contrastText,
        }}
      >
        Reserve Trailer
      </Button>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          <Container maxWidth='xs'>
            <DialogTitle>{'Reserve Trailer'}</DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Typography variant='body2' color='red'>
                  TODO: Add additional fields
                </Typography>
                <Typography variant='body2' color='red'>
                  TODO: Push new reservations to list after creation to blockout
                  dates (Low Prio)
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid item xs={12}>
                    <DatePicker
                      value={startDate || null}
                      onChange={handleStartDateChange}
                      disablePast
                      label='Start Date'
                      shouldDisableDate={(date) =>
                        isDateBlocked(date, reservations?.reservations)
                      } // Pass reservations to isDateBlocked
                      renderInput={(props) => <TextField {...props} />}
                      renderDay={(date, value, dayComponent) =>
                        renderDay(
                          date,
                          value,
                          dayComponent,
                          reservations?.reservations
                        )
                      } // Pass reservations to renderDay
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      value={endDate || null}
                      onChange={handleEndDateChange}
                      disablePast
                      label='Return Date'
                      shouldDisableDate={(date) =>
                        isDateBlocked(date, reservations?.reservations)
                      } // Pass reservations to isDateBlocked
                      renderInput={(props) => <TextField {...props} />}
                      renderDay={(date, value, dayComponent) =>
                        renderDay(
                          date,
                          value,
                          dayComponent,
                          reservations?.reservations
                        )
                      } // Pass reservations to renderDay
                    />
                  </Grid>
                </LocalizationProvider>
                <Grid item xs={12}></Grid>
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
                disabled={startDate > endDate}
                sx={{
                  textTransform: 'none',
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Reserve
              </Button>
            </DialogActions>
          </Container>
        </Box>
      </Dialog>
    </>
  );
};

export default CreateReservationDialog;
