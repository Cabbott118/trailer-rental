import React, { useState } from 'react';

// Components
import Alert from 'components/common/Alert';

// Constants
import ROUTES from 'resources/routes-constants';

// Day JS
import dayjs from 'dayjs';

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

const blockedDates = [
  {
    startDate: '2024-02-02 05:00:00',
    endDate: '2024-02-04 05:00:00',
  },
  {
    startDate: '2024-02-06 05:00:00',
    endDate: '2024-02-10 05:00:00',
  },
];

const isDateBlocked = (date) => {
  if (blockedDates.length > 0) {
    // Convert the current date to a dayjs object for comparison
    const currentDate = dayjs(date);

    // Check if the current date falls within any of the blocked date ranges
    return blockedDates.some(({ startDate, endDate }) => {
      const start = dayjs(startDate);
      const end = dayjs(endDate);

      return currentDate.isBetween(start, end, null, '[]'); // Check if the date is between startDate and endDate inclusively
    });
  }

  return false;
};

const renderDay = (date, _value, dayComponent) => {
  const isBlocked = isDateBlocked(date);
  return React.cloneElement(dayComponent, {
    style: {
      ...(dayComponent.props.style || {}),
      color: isBlocked ? '#FF0000' : undefined, // Change color to red for blocked dates
    },
  });
};

const CreateReservationDialog = ({ trailerId, ownerId }) => {
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
    console.log('Trailer reserved');
    const formattedStartDate = startDate['$d']
      .toISOString()
      .slice(0, 19)
      .replace('T', ' '); // Convert to ISO string and slice to remove milliseconds
    const formattedEndDate = endDate['$d']
      .toISOString()
      .slice(0, 19)
      .replace('T', ' '); // Convert to ISO string and slice to remove milliseconds

    console.log(formattedStartDate);
    console.log(formattedEndDate);

    // dispatch(
    //   createReservation({
    //     trailerId,
    //     ownerId,
    //     renterId: user?.userId,
    //     startDate,
    //     endDate,
    //   })
    // ).then((action) => {
    //   if (action.error) {
    //     setIsAlertShowing(true);
    //   } else {
    //     setDialogOpen(false);
    //   }
    // });
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
        Reserve Trailer
      </Button>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          <Container maxWidth='xs'>
            <DialogTitle>{'Reserve Trailer'}</DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid item xs={12}>
                    <DatePicker
                      value={startDate || null}
                      onChange={handleStartDateChange}
                      disablePast
                      label='Start Date'
                      shouldDisableDate={isDateBlocked} // Disable blocked dates
                      renderInput={(props) => <TextField {...props} />}
                      renderDay={renderDay}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      value={endDate || null}
                      onChange={handleEndDateChange}
                      disablePast
                      label='Return Date'
                      shouldDisableDate={isDateBlocked} // Disable blocked dates
                      renderInput={(props) => <TextField {...props} />}
                      renderDay={renderDay}
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
                disabled={loading}
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
