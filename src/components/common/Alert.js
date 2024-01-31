// MUI
import { Alert as MuiAlert } from '@mui/material';

// React Router
import { Link } from 'react-router-dom';

const Alert = ({ text, severity, route, ...rest }) => {
  let message = '';

  if (text === 'verifyEmail') {
    message = 'Your email has not been verified.';
  } else if (text === 'verifyIdentity') {
    message = 'Your identity has not been verified.';
  } else if (text === 'verifyBankDetails') {
    message = 'Add a bank account before listing your trailer.';
  } else {
    // Default message if text prop doesn't match any of the expected values
    message = 'Unknown message';
  }

  return (
    <MuiAlert
      severity={severity}
      component={route ? Link : 'div'}
      to={route}
      {...rest}
    >
      {message}
    </MuiAlert>
  );
};

export default Alert;
