import { useState } from 'react';

import { Container, Typography } from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch } from 'react-redux';

const AboutUs = () => {
  return (
    <Container maxWidth='md' sx={{ pt: 8 }}>
      <Typography
        variant='h1'
        align='center'
        color='text.primary'
        sx={{ my: 3 }}
      >
        About us
      </Typography>
      <Typography
        variant='body1'
        color='text.secondary'
        sx={{ pb: 3, fontSize: 20 }}
      >
        Welcome to Trailer Rental! We're your go-to platform for hassle-free
        trailer rentals, connecting trailer owners with renters across the
        globe.
      </Typography>
      <Typography
        variant='body1'
        color='text.secondary'
        sx={{ pb: 3, fontSize: 20 }}
      >
        Our mission is to provide a seamless rental experience, offering a
        diverse selection of trailers to suit every need, whether it's for
        hauling cargo, moving, camping, or road trips.
      </Typography>
      <Typography
        variant='body1'
        color='text.secondary'
        sx={{ pb: 3, fontSize: 20 }}
      >
        Need assistance or have questions? Our dedicated team is here to help.
        Feel free to reach out to us anytime.
      </Typography>
    </Container>
  );
};

export default AboutUs;
