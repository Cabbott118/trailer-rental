import { useRouteError } from 'react-router-dom';

import Typography from '@mui/material/Typography';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id='error-page'>
      <Typography variant='h1'>Oops!</Typography>
      <Typography variant='body1'>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant='body2'>
        <i>{error.statusText || error.message}</i>
      </Typography>
    </div>
  );
};

export default ErrorPage;
