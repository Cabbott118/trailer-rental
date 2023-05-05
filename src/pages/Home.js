import React from 'react';

// React-Router
import { useNavigate } from 'react-router-dom';

// MUI
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Content
import { websiteTitle, websiteTagline } from '../content/content';

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth='sm'
        sx={{
          minHeight: '100vh',
          // backgroundColor: {
          //   xs: theme.palette.primary.main,
          //   sm: 'purple',
          //   md: 'green',
          //   lg: 'blue',
          // },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant='h1' sx={{ fontSize: '1.5rem', mb: '2rem' }}>
              {websiteTitle}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {' '}
            <Typography
              variant='body1'
              sx={{ color: theme.palette.text.secondary, mb: '2rem' }}
            >
              {websiteTagline}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default HomePage;
