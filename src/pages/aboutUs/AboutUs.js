// MUI
import { Container, Paper, Typography } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth='md'>
      <Typography
        variant='h4'
        component='h1'
        align='center'
        sx={{ py: 3, fontSize: 32 }}
      >
        About us
      </Typography>
      <Typography variant='body1' sx={{ pb: 3, fontSize: 20 }}>
        Welcome to our company! We are a team of passionate individuals
        dedicated to providing the best solutions for our customers.
      </Typography>
      <Typography variant='body1' sx={{ pb: 3, fontSize: 20 }}>
        Our mission is to deliver high-quality products and services that meet
        and exceed your expectations.
      </Typography>
      <Typography variant='body1' sx={{ pb: 3, fontSize: 20 }}>
        Please feel free to contact us if you have any questions or need
        assistance. We're here to help.
      </Typography>
    </Container>
  );
};

export default AboutUs;
