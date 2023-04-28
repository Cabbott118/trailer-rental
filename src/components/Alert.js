import React from 'react';

import MuiAlert from '@mui/material/Alert';

const Alert = ({ alertType, alertContent }) => {
  return (
    <MuiAlert sx={{ margin: '1rem 0' }} severity={alertType}>
      {alertContent}
    </MuiAlert>
  );
};

export default Alert;
