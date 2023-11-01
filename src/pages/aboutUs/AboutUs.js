// MUI
import { Container, Paper, Typography } from '@mui/material';

const AboutUs = () => {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant='h4' gutterBottom>
          About Us
        </Typography>
        <Typography variant='body1'>
          Welcome to our company! We are a team of passionate individuals
          dedicated to providing the best solutions for our customers.
        </Typography>
        <Typography variant='body1'>
          Our mission is to deliver high-quality products and services that meet
          and exceed your expectations.
        </Typography>
        <Typography variant='body1'>
          Please feel free to contact us if you have any questions or need
          assistance. We're here to help.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutUs;
