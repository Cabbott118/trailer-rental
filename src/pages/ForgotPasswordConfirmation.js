import React from 'react';

// MUI
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const ForgotPasswordConfirmationPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container maxWidth='xs'>
        <Typography
          variant='h1'
          sx={{ fontSize: '1.5rem', marginBottom: '2rem' }}
        >
          Check your inbox
        </Typography>
        <Typography
          variant='body1'
          sx={{ color: theme.palette.text.secondary, marginBottom: '2rem' }}
        >
          We've sent an email containing a link to reset your password.
        </Typography>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 2, mb: 2, textTransform: 'none' }}
        >
          Back to Login
        </Button>
      </Container>
    </Box>
  );
};

export default ForgotPasswordConfirmationPage;
