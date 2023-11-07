import { useEffect, useState } from 'react';

// Constants
import routes from 'constants/routes';

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
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import theme from 'styles/theme';

// React Router
import { Link } from 'react-router-dom';

const WelcomeTile = ({ userData }) => {
  return (
    <Grid item xs={12} md={6}>
      <Paper variant='outlined' sx={{ minHeight: '200px' }}>
        <Grid container>
          <Grid
            item
            container
            xs={12}
            sx={{ p: 3, bgcolor: theme.palette.primary.light, borderRadius: 1 }}
          >
            <Grid item xs={12}>
              <Typography
                variant='h6'
                color={theme.palette.primary.contrastText}
              >
                Welcome, {userData?.fullName?.firstName}!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Avatar
                alt={userData?.fullName?.firstName}
                src={userData?.profileImage}
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: theme.palette.primary.dark,
                  fontWeight: 500,
                  fontSize: 30,
                  mb: '-4rem',
                }}
              >
                {getUserInitials(userData?.fullName)}
              </Avatar>
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={1} sx={{ p: 3, mt: 3 }}>
            <Grid item xs={12}>
              <Typography variant='h6' sx={{ fontWeight: 400 }}>
                {userData?.fullName?.firstName} {userData?.fullName?.lastName}
              </Typography>
              <Typography variant='body2'>
                {userData?.verified?.email ? (
                  <CheckCircleOutlineIcon
                    fontSize='small'
                    color='success'
                    sx={{ mb: -0.5, mr: 0.5 }}
                  />
                ) : null}
                {userData?.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='text'
                fullWidth
                component={Link}
                to={routes.PROFILE}
                sx={{ textTransform: 'none' }}
              >
                View profile{' '}
                <ArrowForwardIcon fontSize='small' sx={{ ml: 1 }} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default WelcomeTile;
