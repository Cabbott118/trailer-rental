import 'components/common/pixelArt/obiWan/styles.css';

// MUI
import { Box, Container } from '@mui/material';

const PixelObiWan = () => {
  return (
    <Container className='pixel-block' maxWidth='sm' sx={{ mt: -20 }}>
      <Box className='pixelized--obiwan'></Box>
    </Container>
  );
};

export default PixelObiWan;
