// MUI
import { useTheme } from '@mui/material';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Copyright = (props) => {
  const theme = useTheme();

  return (
    <Typography
      variant='body2'
      color={theme.palette.text.secondary}
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='/'>
        Caleb Abbott
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
