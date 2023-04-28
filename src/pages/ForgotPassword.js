import React, { useState } from 'react';

// React-Router
import { useNavigate } from 'react-router-dom';

// Components
import Alert from '../components/Alert';

// MUI
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Firebase
import { sendPasswordReset } from '../utility/firebase';

const ForgotPasswordPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: '',
  });
  const [alertType, setAlertType] = useState(null);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handlePasswordReset = async () => {
    if (formState.email.length === 0) {
      setAlertType('error');
    } else {
      sendPasswordReset(formState.email).then(() => {
        navigate('/forgotPasswordConfirmation');
      });
    }
  };

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
          Reset your password
        </Typography>
        <Typography
          variant='body1'
          sx={{ color: theme.palette.text.secondary, marginBottom: '2rem' }}
        >
          Enter the email address associated with your account and we'll send
          you a link to reset your password.
        </Typography>
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          value={formState.email}
          onChange={handleInputChange}
          autoFocus
        />
        <Button
          onClick={handlePasswordReset}
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2, textTransform: 'none' }}
        >
          Send Email
        </Button>
        {alertType ? (
          <Alert
            alertType={alertType}
            alertContent='Please enter an email address'
          />
        ) : null}
        <Link href='/signup' variant='body2'>
          Don't have an account? Sign Up
        </Link>
      </Container>
    </Box>
  );
};
export default ForgotPasswordPage;
