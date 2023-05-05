import React, { useState } from 'react';

// React Query
import { useQuery } from 'react-query';

// React-Router
import { useNavigate } from 'react-router-dom';

// Functions
import { getUserDetails } from '../functions/users/getUserDetails';

// MUI
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

const HostRegistrationPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery('userDetails', getUserDetails);

  const [formState, setFormState] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
  };
  return (
    <Container component='main' maxWidth='sm'>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          margin='normal'
          required
          fullWidth
          id='address'
          label='Address'
          name='address'
          value={formState.address}
          onChange={handleInputChange}
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='city'
          label='City'
          name='city'
          value={formState.city}
          onChange={handleInputChange}
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='state'
          label='State'
          name='state'
          value={formState.state}
          onChange={handleInputChange}
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='zipCode'
          label='Zip Code'
          name='zipCode'
          value={formState.zipCode}
          onChange={handleInputChange}
          autoFocus
        />

        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2, textTransform: 'none' }}
        >
          Continue
        </Button>
      </Box>
    </Container>
  );
};

export default HostRegistrationPage;
