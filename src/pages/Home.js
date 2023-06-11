// MUI
import { Typography } from '@mui/material';

// React Router
import { Link } from 'react-router-dom';

export default function Home() {
  document.title = 'Home';

  return (
    <>
      <Typography variant='h4' component='h1'>
        Home
      </Typography>
      <Typography variant='p'>
        This is our homepage, go <Link to='/login'>here</Link> to login
      </Typography>
    </>
  );
}
