import { Container, Grid, Link, Typography } from '@mui/material';

const Error = () => {
  return (
    <Container maxWidth='sm' sx={{ pt: 30 }}>
      <Grid container spacing={3}>
        <Grid item>
          <Typography
            variant='h1'
            component='h1'
            color='text.primary'
            align='center'
          >
            An unexpected error has occurred
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1' color='text.primary' align='center'>
            Please try again later. If this problem persists, log a bug on the{' '}
            <Link
              href='https://dev.azure.com/trailer-rental/Trailer%20Rental/_boards/board/t/Trailer%20Rental%20Team/Stories'
              target='_blank'
              rel='noopener noreferrer'
            >
              Trailer Rental ADO Board
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Error;
