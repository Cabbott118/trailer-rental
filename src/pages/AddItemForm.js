import React, { useState } from 'react';

// React-Router
import { useNavigate } from 'react-router-dom';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Functions
import { addItem } from '../functions/items/addItem';

const AddItemFormPage = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    title: '',
    description: '',
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

  const handleSubmit = (event) => {
    event.preventDefault();
    addItem(formState.title, formState.description);
    navigate('/profile');
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Typography component='h1' variant='h5'>
        Add New Item
      </Typography>
      <Box component='form' onSubmit={handleSubmit}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='title'
          label='Title'
          name='title'
          value={formState.title}
          onChange={handleInputChange}
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='description'
          label='Description'
          name='description'
          value={formState.description}
          onChange={handleInputChange}
          multiline
          rows={4}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          sx={{ mt: 3, mb: 2, textTransform: 'none' }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default AddItemFormPage;
