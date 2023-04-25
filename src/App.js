// MUI
import { ThemeProvider } from '@emotion/react';
import theme from './utility/theme';
import { Typography } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Typography variant='h1' color='primary'>
          Hello world
        </Typography>
      </div>
    </ThemeProvider>
  );
}

export default App;
