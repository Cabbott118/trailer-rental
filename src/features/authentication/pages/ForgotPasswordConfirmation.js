import { useEffect, useState } from 'react';

// Constants
import ROUTES from 'resources/routes-constants';

// MUI
import { Box, Container, Typography, useTheme } from '@mui/material';

// React Router
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordConfirmation() {
  const [timer, setTimer] = useState(5);

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimeout(() => {
      navigate(ROUTES.LOGIN);
    }, 5000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  return (
    <Box
      sx={{
        pt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Container maxWidth='xs'>
        <Typography
          variant='h1'
          color='text.primary'
          sx={{ fontSize: '1.5rem', mb: '1rem' }}
        >
          Check your inbox
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ mb: '1rem' }}>
          We've sent an email containing a link to reset your password.
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ mb: '2rem' }}>
          You'll be automatically redirected to the Login Page in {timer} second
          {timer !== 1 && 's'}.
        </Typography>
      </Container>
    </Box>
  );
}
