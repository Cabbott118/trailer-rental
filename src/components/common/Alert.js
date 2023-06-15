import { Alert as MuiAlert } from '@mui/material';

const Alert = ({ text, severity, ...rest }) => (
  <MuiAlert
    severity={severity}
    sx={
      {
        // bgcolor: '#830B0B',
        // color: '#fff',
      }
    }
    {...rest}
  >
    {text}
  </MuiAlert>
);

export default Alert;
