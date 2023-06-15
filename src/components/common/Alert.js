import { Alert as MuiAlert } from '@mui/material';

const Alert = ({ text, severity, ...rest }) => (
  <MuiAlert severity={severity} {...rest}>
    {text}
  </MuiAlert>
);

export default Alert;
