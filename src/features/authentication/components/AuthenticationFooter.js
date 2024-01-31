// Constants
import ROUTES from 'resources/routes-constants';

// MUI
import { Grid, useTheme } from '@mui/material';

// React Router
import { Link } from 'react-router-dom';

const AuthenticationFooter = ({ type }) => {
  const theme = useTheme();
  const linkStyles = {
    color: theme.palette.primary.contrastText,
    fontSize: '.9rem',
  };

  switch (type) {
    case 'Login':
      return (
        <Grid container sx={{ mt: '1rem' }}>
          <Grid item xs>
            <Link to='/forgot-password' style={linkStyles}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to={ROUTES.SIGNUP} style={linkStyles}>
              Don't have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      );

    case 'Sign up':
      return (
        <Grid container justifyContent='flex-end' sx={{ mt: '1rem' }}>
          <Grid item>
            <Link to={ROUTES.LOGIN} style={linkStyles}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      );

    default:
      return;
  }
};

export default AuthenticationFooter;
