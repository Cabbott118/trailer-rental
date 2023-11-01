import { useEffect } from 'react';

// MUI
import { Box, Container, Typography, useTheme } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';

export default function Home() {
  document.title = 'Home';

  const theme = useTheme();

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (data && data.userId) {
      dispatch(fetchUser(data.userId));
    }
  }, []);

  const headingStyle = {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: '4rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  };

  const subHeadingStyle = {
    color: theme.palette.primary.contrastText,
    my: '1.5rem',
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        minHeight: '15rem',
        py: '3rem',
        backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
      }}
    >
      <Container maxWidth='md'>
        {data?.fullName?.firstName ? (
          <Typography
            variant='h6'
            component='h1'
            align='center'
            sx={{ color: theme.palette.primary.contrastText }}
          >
            Welcome, <i>{data?.fullName?.firstName}</i>
          </Typography>
        ) : null}
        <Typography
          variant='h1'
          component='h1'
          align='center'
          color='primary'
          sx={headingStyle}
        >
          This is a template
        </Typography>
        <Typography
          variant='h4'
          component='h4'
          align='center'
          sx={subHeadingStyle}
        >
          Created by <b>Caleb Abbott</b>, this template is intended to be cloned
          to quickly develop web apps using the following techs:
        </Typography>
        <Typography color='primary'>
          <code>
            React, Firebase (Hosting, Firestore, & Authentication), Material-UI
            (MUI), Redux & Redux-Toolkit, React-rotuer, Axios, and Dotenv
          </code>
        </Typography>
      </Container>
    </Box>
  );
}
