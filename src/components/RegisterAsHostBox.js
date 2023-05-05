import React from 'react';

// React-Router
import { useNavigate } from 'react-router-dom';

// MUI
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const RegisterAsHostBox = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleRegisterAsHost = async () => {
    await navigate('/begin-host-registration');
  };

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: '.5rem' }}>
        Finish setting up your account
      </Typography>
      <Typography variant='body1' sx={{ color: theme.palette.text.secondary }}>
        In order to start renting out your <i>items</i>, you'll need to become a
        host.
      </Typography>
      <Typography variant='body1' sx={{ color: theme.palette.text.secondary }}>
        It's a quick and painless process. All we'll need is a bit more
        information about you.
      </Typography>

      <Button
        variant='contained'
        color='primary'
        fullWidth
        onClick={handleRegisterAsHost}
        sx={{
          mt: '2rem',
          textTransform: 'none',
        }}
      >
        Become a Host
      </Button>
    </Box>
  );
};
export default RegisterAsHostBox;
