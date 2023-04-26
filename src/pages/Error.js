import { useRouteError } from 'react-router-dom';

// MUI
import { useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const ErrorPage = () => {
  const theme = useTheme();
  const error = useRouteError();
  console.error(error);

  return (
    <Container>
      <Typography
        variant='h2'
        sx={{
          color: theme.palette.primary.main,
        }}
      >
        Oops!
      </Typography>
      <Typography variant='body1'>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography
        variant='body2'
        sx={{
          color: theme.palette.text.secondary,
        }}
      >
        Error: {error.statusText || error.message}
      </Typography>
    </Container>
  );
};

export default ErrorPage;
