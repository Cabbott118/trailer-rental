// MUI
import { Alert as MuiAlert } from '@mui/material';

// React Router
import { Link } from 'react-router-dom';

const Alert = ({ text, severity, route, ...rest }) => (
  <MuiAlert
    severity={severity}
    component={route ? Link : 'div'}
    to={route}
    {...rest}
  >
    {text}
  </MuiAlert>
);

export default Alert;
